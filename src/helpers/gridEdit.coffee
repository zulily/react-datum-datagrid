
_ = require 'underscore'
Bstr = require 'bumble-strings'
Extend = require 'node.extend'
DeepGet = require './deepGet'

###

###
module.exports = class GridEdit
  
  
  ###
    Override me to conditionally enable editing on a per cell basis
  ###
  canEditCell: (column, model) ->
    return false if @props.readOnly
    
    if column?.datum?.prototype?.isLocked?(column, model)  
      return false
    
    if col?.datumProps?.shouldLock?(col, rowModel)
      return false
          
    return column.editable ? @props.defaultColumnDef.editable

    
  isCellEditing: (columnIndex, rowIndex) ->
    editCell = @state.editingCell
    return false unless editCell?
    
    return  editCell.rowIndex == rowIndex && editCell.columnIndex == columnIndex


  isCellSaving: (columnIndex, rowIndex) ->
    savingCells = @state.savingCells || {}
    return false unless _.keys(savingCells).length > 0
    
    return savingCells["#{columnIndex}_#{rowIndex}"] == true


  wasCellSaved: (columnIndex, rowIndex) ->
    savedCells = @state.savedCells || {}
    return false unless _.keys(savedCells).length > 0
    return savedCells["#{columnIndex}_#{rowIndex}"]
    

  getSaveErrors: (columnIndex, rowIndex) ->
    saveErrors = @state.saveErrors || {}
    return false unless _.keys(saveErrors).length > 0
    return saveErrors["#{columnIndex}_#{rowIndex}"]
    

  isDatagridEditing: () ->
    return @state.editingCell? && true || false
    
    
  editCellAt: (evt, columnIndex, rowIndex) ->
    return @onCellEdit(evt, @getColumn(columnIndex), @getModelAt(rowIndex), columnIndex, rowIndex)


  onCellEdit: (evt, columnDef, model, columnIndex, rowIndex) ->
    return false unless @canEditCell(columnDef, model)
    
    @setState editingCell: {
      columnIndex: columnIndex
      rowIndex: rowIndex, 
      value: @getValueAt(columnIndex, rowIndex)
    }
    @originalMethod?(evt, columnDef, model, columnIndex, rowIndex)


  onCellChange: (value, columnDef, model, columnIndex, rowIndex) ->
    return false unless @canEditCell(columnDef, model) && @isCellEditing(columnIndex, rowIndex)
    
    newState = _.extend {}, @state.editingCell, value: value
    @setState editingCell: newState
    
    
  getEditingCell: () ->
    return @state.editingCell
    
    
  saveEditingCell: () ->
    return false unless @state.editingCell?
    
    columnDef = @getColumn(@state.editingCell.columnIndex)
    model = @getModelAt(@state.editingCell.rowIndex)
    
    return false unless @canEditCell(columnDef, model)
    
    columnIndex = @state.editingCell.columnIndex
    rowIndex = @state.editingCell.rowIndex
    value = @state.editingCell.value?.value ? @state.editingCell.value ? null
      
    rowEvt = {  
      cellKey: columnDef.key
      key: "Enter"
      columnIndex: columnIndex
      rowIndex: rowIndex
      updated: value
    }
    @saveModel(model, rowEvt)
    @setState editingCell: null


  updateCell: (columnIndex, rowIndex, value, options={}) ->
    _.defaults options,
      silent: false
      
    model = @getModelAt(rowIndex)
    column = @getColumn(columnIndex)
    return unless model? && column?
    return false unless @canEditCell(column, model)
    
    try 
      parsedJsonObj = JSON.parse(value) if _.isString(value)
    catch
      # nbd, it's probably not json

    @saveModel model, {
      cellKey: column.key   # mimicks react-datagrid row event 
      rowIndex: rowIndex
      columnIndex: columnIndex
      updated: parsedJsonObj ? value
      key: "Paste"
    }, options
      
  
  cancelEditing: () ->
    @setState editingCell: null
    
    
  ###
    returns the current columns with defaults
  ###
  getColumns: () ->
    return [] unless @props.columns?.length > 0
    columns = @props.columns.slice(0)
    return (@getColumn(i) for i in [0..columns.length - 1])
    
    
  ###
    returns a column with defaulted attributes by key or index
  ###
  getColumn: (keyOrIndex) ->
    if @originalMethod?
      return @originalMethod()

    columnDef = if _.isString keyOrIndex
      _.find @props.columns, (c) -> c.key == keyOrIndex
    else
      @props.columns[keyOrIndex]
    
    return @getColumnDefaults(columnDef)
    
    
  getColumnDefaults: (columnDef) ->
    columnDef = Extend true, {}, @props.defaultColumnDef, columnDef
    columnDef.name ?= Bstr.titleize(Bstr.humanize(columnDef.key))
    columnDef.givenName = columnDef.name
    columnDef.exportable ?= true
    return columnDef
    
  
  getModelAt: (index) ->
    collection = @props.collection

    if collection?.ensureRows?
      # we need to ignore the collection add events that might come with this 
      collection.ensureRows Math.max(index - 25, 0), index + 25
    
    return switch      
      when not collection? then null
      when collection.getItem? then collection.getItem(index)
      when collection.at? then collection.at(index)
      else collection[index]     
        
  
  # we support arrays of objects as models also   
  getValueFromModel: (model, attr) ->
    model.get?(attr) ? model[attr]
        
  
  getValueAt: (colIndexOrKey, rowIndex) ->
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
      @props.columns?[colIndexOrKey]?.key
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
    return if @props.disableUndo
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
      @clearCellErrors(operation.model, operation.rowEvt)
      # We set the model here because @props.setOnUpdate may be false
      # but we definitely want the model to be set.  And it needs to 
      # be set such that it picks up all of things changed in the revPatch
      Extend true, operation.model.attributes, operation.revPatch
      @saveModel(operation.model, operation.rowEvt, {logUndo: false, setOnUpdate: false})
    delete @undo[bucketKey]
    
  
  logUndoDebounced: _.debounce @prototype._logUndo, @LOG_UNDO_DEBOUNCE
  
  
  ###
    TODO : rengineer this, everything else is more simply {columnIndex, rowIndex}
    
    we mimick rowEvt from react-data-grid which looked like this:
    {  
      cellKey: "costing.wholesaleCost.amount"
      key: "Enter"
      rowIndex: 0
      columnIndex: 0
      updated: "24"
    }
  ###
  saveModel: (model, rowEvt, options={})->
    options = _.defaults options, {
      logUndo: !@props.disableUndo
      setOnUpdate: true
      silent: false
    }
    
    attr = rowEvt.attribute ? rowEvt.cellKey
    
    oldValue = @getValueAt(rowEvt.cellKey, rowEvt.rowIndex)
    newValue = if rowEvt.updated?.toString().trim() != ''
      rowEvt.updated
    else
      null

    unless @props.setOnUpdate == false || options.setOnUpdate == false
      # returns false if validations fail
      # model must be set first in order to determine value of isDirty
      return unless @setValueOnModel(model, attr, newValue, saveOptions) 

    isDirty = if _.isFunction(model.isDirty) then model.isDirty() else true
    return unless isDirty
    # return unless oldValue || newValue 
    # return if JSON.stringify(oldValue) == JSON.stringify(newValue) 

    # optimistically clear errors on the cell while saving new value, prevents the error
    # icon from very briefly showing again after the spinner stops
    @clearCellErrors(model, rowEvt, options)  

    saveOptions = @getModelSaveOptions()
    saveOptions.__datagrid_rowEvt = rowEvt
    saveOptions.silent = options.silent

    revPatch = model.getReversePatchObject?()
    
    if options.logUndo
      @constructor._batchUndoRequests ?= []
      @constructor._batchUndoRequests.push {
        model: model
        attr: attr
        prevValue: revPatch ? oldValue
        rowEvt: rowEvt
      }
      @logUndoDebounced.apply @, arguments
    
    if @props.saveOnUpdate != false && isDirty
      @setSaving(model, rowEvt, true, options)
      (model.patch || model.save)({}, saveOptions)      
    

  # this clears the previous error conditions if the save being undone fails:
  clearCellErrors: (model, rowEvt, options={}) ->
    _.defaults options,
      silent: false
    
    saveErrors = if @state.saveErrors? then _.extend({}, @state.saveErrors) else {}
    delete saveErrors["#{rowEvt.columnIndex}_#{rowEvt.rowIndex}"]
    if options.silent
      @state.saveErrors = saveErrors
    else
      @setState saveErrors: saveErrors
  
  
  # this get's consumed by the DefaultFormatter
  setSaveSuccess: (model, rowEvt, trueOrFalse, options={}) ->
    model?.setDatagridSaveSuccess?(rowEvt.cellKey, trueOrFalse)
    
    lookupKey = "#{rowEvt.columnIndex}_#{rowEvt.rowIndex}"
    savedCells = if @state.savedCells? then _.extend({}, @state.savedCells) else {}
    savedCells[lookupKey] = trueOrFalse
    
    if options.silent
      @state.savedCells = savedCells
    else
      @setState savedCells: savedCells
    
    # if the cell save was successfull, only show the indication of sucess for 7 sec
    # if the save wasn't successful keep it showing indication of error until explicitly cleared
    if trueOrFalse  
      _.delay =>
        savedCells = _.extend {}, @state.savedCells
        delete savedCells[lookupKey]
        if options.silent
          @state.savedCells = savedCells
          @_debouncedForceUpdate()
        else
          @setState savedCells: savedCells
      , 5000
        

  setSaveErrors: (model, rowEvt, resp) ->
    model?.setDatagridSaveErrors?(rowEvt.cellKey, resp)
    
    lookupKey = "#{rowEvt.columnIndex}_#{rowEvt.rowIndex}"
    saveErrors = @state.saveErrors ? {}
    saveErrors[lookupKey] ?= [] 
    saveErrors[lookupKey].push resp
    @setState saveErrors: saveErrors

      
  setSaving: (model, rowEvt, trueOrFalse, options={}) ->
    _.defaults options,
      # if true, silently updates @state
      silent: false   
      
    savingCells = @state.savingCells || {}
    if trueOrFalse
      savingCells["#{rowEvt.columnIndex}_#{rowEvt.rowIndex}"] = true
    else
      delete savingCells["#{rowEvt.columnIndex}_#{rowEvt.rowIndex}"]
    
    if options.silent
      @state.savingCells = savingCells
    else
      @setState savingCells: savingCells
    

  onModelSaveSuccess: (model, resp, options) =>
    rowEvt = options?.__datagrid_rowEvt
    if rowEvt
      @setSaveSuccess(model, rowEvt, true, options)
      # clear previous errors on the whole row
      @clearCellErrors(model, rowEvt, options)

    @onModelSaveComplete(model, resp, options)
    
    
  onModelSaveError: (model, resp, options) =>
    rowEvt = options?.__datagrid_rowEvt
    if rowEvt?
      @setSaveErrors(model, rowEvt, resp)
    
    @onModelSaveComplete(model, resp, options)

    
  onModelSaveComplete: (model, resp, options) =>
    rowEvt = options?.__datagrid_rowEvt
    if rowEvt
      @setSaving(model, rowEvt, false, options)
    
    # if we've silenced backbone events and state changes, 
    # they need to be applied at some time
    @_debouncedForceUpdate() if options.silent
