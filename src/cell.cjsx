
  
React = require('react')
ReactDatum = require('react-datum')
PropTypes = require('prop-types')
Classnames = require('classnames')

dasherize = require('underscore.string/dasherize')
_ = require('underscore')

module.exports = class Cell extends React.Component
  
  @propTypes: 
    editing: PropTypes.bool
    rowData: PropTypes.object
    column: PropTypes.object
    datagrid: PropTypes.any    

    # called when user clicks edit icon
    onEdit: PropTypes.func
    
    # default styles to apply to cell
    defaultCellStyle: PropTypes.object
    

  render: -> 
    value = @props.value
    datumProps = _.extend {}, @props.column.datumProps,
      model: @getModel() 
      attr: @props.column.key
      column: @props.column
      ref: 'datum'
      inputMode: if @props.editing then 'edit' else 'readonly'
        
    datumProps = _.defaults datumProps,
      # default placement of popover in datagrid is top because that's the safest to not be 
      # cut off by a viewport edge
      rbOverlayProps: 
        trigger: ['hover','focus', 'click']
        placement: 'top'          
    
    datumComponent = @props.column.datum ? ReactDatum.Text
    value = React.createElement datumComponent, datumProps
    return @renderWrapped(value)
      
    
  
  renderWrapped: (value, options = {}) =>
    options = _.defaults options,
      title: null
      wrapperStyle: {}
      
    @setDatumErrors()

    canEditCell = @getDatagrid()?.canEditCell(@props.column, @getModel())
    wrapperStyle = $.extend(true, {}, options.wrapperStyle, @getCellStyle(canEditCell))

    className = @getCellClass(canEditCell)
    icon = @getPrimaryIcon(canEditCell)

    <div 
      data-attr-row={@props.rowIndex} 
      data-attr-col={@props.column.key} 
      className={className} 
      title={options.title}
      style={wrapperStyle} 
    >
      {icon}
      <span>{value}</span>
    </div>
    
  
  # doesn't need to be big but in the event of multiple cells posting saves at the near same time,
  # don't call forceUpdate for each one
  _debouncedForceUpdate: => _.debounce((=> @forceUpdate()), 50)
  
  # this is used when save success and errors need to be cleared
  _delayedForceUpdate: (delay = 5000) => _.delay @_debouncedForceUpdate, 5000
  
  
  onEditClick: (evt) =>
    _.defer => 
      if @props.onEdit? 
        @props.onEdit(this, evt)
      else
        @getDatagrid()?.editCurrentCell?()
  
  
  getModel: ->
    return @props.rowData
  
  
  getDatagrid: ->
    return @props.datagrid
  
  
  getCellClass: (canEditCell) ->
    model = @getModel()
    return Classnames(
      'rdd-cell', 
      "rdd-#{dasherize(@props.column.key)}-column no-help-icon",
      @getAdditionalElementClasses(),
      {'rdd-cell-error': @getDatagridSaveErrors()?.length > 0},
      {'rdd-cell-saved': @getDatagridSaveSuccess() == true},
      {'rdd-editable': canEditCell},
      # method provided by gridSelectMixin
      {'rdd-selected': @isSelected()}
    )
  
  
  # you should consider overriding getCellDefaultStyle() or getCellOverrideStyle()
  getCellStyle: (canEditCell)->
    model = @getModel()
    
    $.extend true, {}, 
      @getCellDefaultStyle(model),
      @props.column.cellStyle
      @getCellOverrideStyle(model)

  
  # override me to set inline styles that can be overriden by columnDef.cellStyle
  #  you should really call super if overriding and extend it's return value
  getCellDefaultStyle: (model)->
    cellStyle = _.extend {}, @props.defaultCellStyle ? {}
    if @props.column.rightAlign
      cellStyle.textAlign = 'right'
      cellStyle.paddingRight = 10
    else
      cellStyle.padding = 0
      cellStyle.margin = "5px 10px"
    
    cellStyle.display = 'flex'
    cellStyle.flexGrow = 1
      
    return cellStyle
            

  # override me to add inline styles that can NOT be overriden by columnDef.cellStyle
  getCellOverrideStyle: (model) ->
    # none for now, but it would be a good idea, if overriding this method, to call super.  
    return {}


  getPrimaryIcon: (canEditCell) ->
    icon = null
    model = @getModel()
    return null unless model?
    
    if @getDatagridSaving()
      icon = <i className="fa fa-spin fa-refresh rdd-icon rdd-icon-refresh" title="Saving update..."/>
    
    else if canEditCell && !@props.column.hideEditableIcon
      icon = <i className="fa fa-pencil rdd-icon rdd-icon-edit" onClick={this.onEditClick} 
        title="Click to edit this cell (or dbclick or enter)"
      />

    return icon


  # you can extend this formatter and add css classes to the wrapper element if needed
  getAdditionalElementClasses: ->
    return null 
      
      
  getDatagridSaveErrors: ->
    model = @getModel()
    model?.getDatagridSaveErrors?(@props.column.key) ? model?.__datagridSaveErrors?[@props.column.key] ? []
    
  
  getDatagridSaveSuccess: ->
    model = @getModel()
    model?.getDatagridSaveSuccess?(@props.column.key) ? model?.__datagridSaveSuccess?[@props.column.key] ? false
    
    
  setDatagridSaveSuccess: (trueOrFalse) ->
    model = @getModel()
    return unless model?
    
    if _.isFunction model.setDatagridSaveSuccess
      model.setDatagridSaveSuccess(@props.column.key, trueOrFalse)
    else
      model.__datagridSaveSuccess?[@props.column.key] = trueOrFalse
      
      
  getDatagridSaving: () ->
    model = @getModel()
    model?.getDatagridSaving?(@props.column.key) ? model?.__datagridSaving?[@props.column.key] ? false
    
      
  isSelected: ->
    @getDatagrid()?.isCellSelected?(@props.rowIndex, @props.column.key)
      
      
  setDatumErrors: ->
    model = @getModel()
    return unless model?
    
    # unlike success handler below, we leave the cell-error on until the next update
    saveErrorResp = @getDatagridSaveErrors()
    if saveErrorResp?.length > 0
      _.defer => 
        if @refs.datum?
          @refs.datum.clearErrors?()
          @refs.datum.onModelSaveError(@getModel(), saveErrorResp)

    if @getDatagridSaveSuccess()
      _.defer => 
        if @refs.datum?
          @refs.datum.clearErrors?()
        @setDatagridSaveSuccess(false)
      
      # force cell to rerender in 5 sec to clear the cell highlights
      @_delayedForceUpdate()   
      
  
    

      
