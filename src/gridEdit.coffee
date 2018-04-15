
_ = require 'underscore'
$ = require 'jquery'

DeepGet = require './helpers/deepGet'

###

###
module.exports = class GridEdit
  
  getCollection: () ->
    if @originalMethod?
      return @originalMethod()
    
    return @state?.collection ? @props.collection ? @context?.collection ? @collection
    
    
  ###
    returns columns with a defaulted name, formatter, header component
  ###
  getColumns: (columns=null) ->
    if @originalMethod?
      return @originalMethod(columns)
      
    return columns ? @state?.columns ? @props.columns ? @columns


  ###
    returns a column by key or index
  ###
  getColumn: (keyOrIndex) ->
    if @originalMethod?
      return @originalMethod()

    columns = @getColumns()
    if _.isString keyOrIndex
      return _.find @getColumns(), (c) -> c.key == keyOrIndex
    else
      return columns[keyOrIndex]

  
  getModelAt: (index) ->
    collection = @getCollection()
    return switch      
      when not collection? then null
      when collection.getItem? then collection.getItem(index)
      when collection.at? then collection.at(index)
      else collection[index]     
        
  
  # we support arrays of objects as models also   
  getValueFromModel: (model, attr) ->
    model.get?(attr) ? model[attr]
        
  
  getValueAt: (rowIndex, colIndexOrKey) ->
    [model, columnKey, datum] = @getModelColumnKeyAt(rowIndex, colIndexOrKey)
    return null unless model? && columnKey?
    # also support arrays of objects as models (may not have .get())
    return @getValueFromModel(model, columnKey)
  
  
  ###
    returns the value to export to csv. Also used by gridSelect mixin for value to copy to clipboard

    NOTE that getExportValue is also used by copy/paste to get the value to copy to clipboard.
      you can use csvExportAttribute on the column to export a different attribute only when 
      exporting to CSV
    
  ###
  getExportValue: (model, column, options={}) ->
    options = _.defaults options,
      forCsv: false
      
    value = null  
    if column.exportFunction?
      value = column.exportFunction(model, column, @, options)
    else if options.forCsv && column.csvExportAttribute
      value = @getValueFromModel(model, column.csvExportAttribute)
    else if column.exportAttribute?
      value = @getValueFromModel(model, column.exportAttribute)
    else
      value = @getValueFromModel(model, column.key)  
    
    if options.forCsv && _.isArray(value)
      value = _.uniq(_.compact(value)).join(', ')
    else if _.isArray(value) || _.isObject(value)
      value = JSON.stringify(value)
    
    if _.isString(value) && options.forCsv
      # in csv, double quotes are escaped by two conseq double qoutes
      value = value.replace(/\"/g, '""') 

    return value


  getModelColumnKeyAt: (rowIndex, colIndexOrKey) ->
    model = @getModelAt(rowIndex)
    columnKey = if _.isNumber(colIndexOrKey) 
      @getColumns()?[colIndexOrKey]?.key
    else
      colIndexOrKey
    
    return [model, columnKey]
  
  
  setValueOnModel: (model, columnKey, value, saveOptions) ->
    attr = columnKey
    column = @getColumn(columnKey)
    return false unless column? && @validateCell(model, column, value, saveOptions)
    
    # we also support arrays of objects as models (may not have .set())    
    result = if _.isFunction(model.set)
      model.set(attr, value)
    else
      model[attr] = value

    return result
    
      
  setValueAt: (rowIndex, colIndexOrKey, value) ->
    [model, columnKey] = @getModelColumnKeyAt(rowIndex, colIndexOrKey)
    return null unless model? && columnKey?

    return @setValueOnModel(model, columnKey)


  validateCell: (model, column, value, saveOptions) ->
    validationErrors = []
    for validation in column.validations ? []
      validationResult = validation.apply @, [model, column, value]
      unless validationResult == true
        validationErrors.push validationResult
        
    if validationErrors.length > 0
      @onModelSaveError(model, validationErrors, saveOptions)
      return false
      
    return true

  ###
    returns the options used when saving a backbone model
  ###
  getModelSaveOptions: ->
    return {
      success: => @onModelSaveSuccess.apply(@, arguments)
      error: => @onModelSaveError.apply(@, arguments)
    }

  ###
  This method will log a batch of actions, relying on
  debounce to ensure the actions are collected properly.
  ###
  _logUndo: (model, rowEvt, options={}) ->
    return unless @props.enableUndo
    @undo[@undoIndex++] = @constructor._batchUndoRequests
    @constructor._batchUndoRequests = []
    
    
  resetUndo: ->
    delete @undo
    @undo = {}
    @undoIndex = 0
    
    
  ###
  This method will iterate over the properties of the @undo object
  and find the top-most item. Each property is an array of actions that
  occured within the same "batch" or "bucket". Once it finds the most recent
  batch, it will revert the operation by calling @saveModel.
  ###
  doUndo: ->
    keys = _.keys(@undo)
    return if keys.length == 0
    bucketKey = _.last(keys)
    operations = @undo[bucketKey]
    for operation in operations
      @clearCellErrors(operation.model, operation.attr)
      # We set the model here because @props.setOnUpdate may be false
      # but we definitely want the model to be set.  And it needs to 
      # be set such that it picks up all of things changed in the revPatch
      $.extend true, operation.model.attributes, operation.revPatch
      @saveModel(operation.model, operation.rowEvt, {logUndo: false, setOnUpdate: false})
    delete @undo[bucketKey]
    
  
  logUndoDebounced: _.debounce @prototype._logUndo, @LOG_UNDO_DEBOUNCE
  
  
  ###
    rowEvt from react-data-grid looks like this:
    {  
      cellKey: "costing.wholesaleCost.amount"
      key: "Enter"
      rowIdx: 0
      updated: "24"
    }
  ###
  saveModel: (model, rowEvt, options={})->
    options = _.defaults options, {
      logUndo: @props.enableUndo
      setOnUpdate: true
    }
    
    attr = rowEvt.attribute ? rowEvt.cellKey
    
    oldValue = DeepGet(model._lastSyncAttributes, attr)
    newValue = if rowEvt.updated?.toString().trim() != ''
      rowEvt.updated
    else
      null
    
    return unless oldValue || newValue 
    return if oldValue == newValue 

    # optimistically clear errors on the cell while saving new value, prevents the error
    # icon from very briefly showing again after the spinner stops
    @clearCellErrors(model, attr)  

    saveOptions = @getModelSaveOptions()
    saveOptions.__datagrid_rowEvt = rowEvt

    unless @props.setOnUpdate == false || options.setOnUpdate == false
      # returns false if validations fail
      return unless @setValueOnModel(model, attr, newValue, saveOptions) 

    revPatch = model.getReversePatchObject()
    
    # Fancy syntax to consider a bulk action as one
    # using debounce which is markedly different from
    # bucketing by time. Theoretically this is more
    # accurate.
    if options.logUndo != false && oldValue != newValue
      @constructor._batchUndoRequests ?= []
      @constructor._batchUndoRequests.push {
        model: model
        attr: attr
        revPatch: revPatch
        rowEvt: rowEvt
      }
      @logUndoDebounced.apply @, arguments
    
    isDirty = if _.isFunction(model.isDirty) then model.isDirty() else true
    if @props.saveOnUpdate != false && isDirty
      # __datagridSaving is used by DefaultFormatter to know when to display cell spinner
      @setSaving(model, rowEvt.cellKey, true)
      (model.patch || model.save)({}, saveOptions)      
    

  # this clears the previous error conditions if the save being undone fails:
  clearCellErrors: (model, columnKey) ->
    if _.isFunction model.setDatagridSaveErrors
      model.setDatagridSaveErrors(columnKey, null)
    else 
      model.__datagridSaveErrors ?= {}
      if columnKey?
        delete model.__datagridSaveErrors[columnKey]
      else
        model.__datagridSaveErrors = {}

  
  # this get's consumed by the DefaultFormatter
  setSaveSuccess: (model, attr, trueOrFalse) ->
    if _.isFunction model.setDatagridSaveSuccess
      model.setDatagridSaveSuccess(attr, trueOrFalse)
    else
      model.__datagridSaveSuccess ?= {}
      model.__datagridSaveSuccess[attr] = trueOrFalse
    

  setSaveErrors: (model, attr, resp) ->
    if _.isFunction model.setDatagridSaveErrors
      model.setDatagridSaveErrors(attr, resp)
    else
      model.__datagridSaveErrors ?= {}
      model.__datagridSaveErrors[attr] = resp
      
      
  setSaving: (model, attr, trueOrFalse) ->
    if _.isFunction model.setDatagridSaving
      model.setDatagridSaving(attr, trueOrFalse)
    else
      model.__datagridSaving ?= {}
      model.__datagridSaving[attr] = trueOrFalse
    

  onModelSaveSuccess: (model, resp, options) =>
    rowEvt = options?.__datagrid_rowEvt
    if rowEvt
      @setSaveSuccess(model, rowEvt.cellKey, true)
      # clear previous errors on the whole row
      @clearCellErrors(model)

    @onModelSaveComplete(model, resp, options)
    
    
  onModelSaveError: (model, resp, options) =>
    unless @props.silentSaveErrors
      throw "Unable to save changes<br><br>#{JSON.stringify(resp)}"
    
    rowEvt = options?.__datagrid_rowEvt
    if rowEvt?
      @setSaveErrors(model, rowEvt.cellKey, resp)
    
    @onModelSaveComplete(model, resp, options)

    
  onModelSaveComplete: (model, resp, options) =>
    rowEvt = options?.__datagrid_rowEvt
    if rowEvt
      @setSaving(model, rowEvt.cellKey, false)


