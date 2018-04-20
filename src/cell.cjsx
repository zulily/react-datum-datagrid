
  
React = require('react')
ReactDatum = require('react-datum')
PropTypes = require('prop-types')
Classnames = require('classnames')

dasherize = require('underscore.string/dasherize')
_ = require('underscore')
extend = require('node.extend')

module.exports = class Cell extends React.Component
  
  @propTypes: 
    selected: PropTypes.bool
    editing: PropTypes.bool
    editable: PropTypes.bool
    rowData: PropTypes.object
    column: PropTypes.object
    datagrid: PropTypes.any   
    
    # this component and the underlying Datum are controlled components
    # the value of the cell will not update until the value prop is passed in
    value: PropTypes.any
    onChange: PropTypes.func 

    # called when user clicks edit icon
    onEdit: PropTypes.func
    
    # default styles to apply to cell
    defaultCellStyle: PropTypes.object
    
    
  componentDidUpdate: (prevProps, prevState) ->
    @setDatumErrors()
    
    if @props.editing && !prevProps.editing
      @refs?.datum?.focus()
      
    # force cell to rerender in 5 sec to clear the cell highlights
    # @_delayedForceUpdate()   


  render: -> 
    value = @props.value
    datumProps = _.extend {}, @props.column.datumProps,
      model: @getModel() 
      attr: @props.column.key
      column: @props.column
      ref: 'datum'
      inputMode: if @props.editing then 'edit' else 'readonly'
      stateless: true
      value: value
      onChange: @props.onChange
        
        
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
      
    

    wrapperStyle = extend(true, {}, options.wrapperStyle, @getCellStyle())

    <div 
      data-attr-row={@props.rowIndex} 
      data-attr-col={@props.column.key} 
      className={@getCellClass()} 
      title={options.title}
      style={wrapperStyle} 
    >
      {value}
    </div>
    
  
  getModel: ->
    return @props.rowData
  
  
  getCellClass: () ->
    model = @getModel()
    return Classnames(
      'rdd-cell', 
      "rdd-#{dasherize(@props.column.key)}-column no-help-icon",
      @getAdditionalElementClasses(),
      {'rdd-cell-error': @getDatagridSaveErrors()?.length > 0},
      {'rdd-cell-saved': @getDatagridSaveSuccess() == true},
      {'rdd-editable': @props.editable},
      # method provided by gridSelectMixin
      {'rdd-selected': @props.selected}
    )
  
  
  # you should consider overriding getCellDefaultStyle() or getCellOverrideStyle()
  getCellStyle: ()->
    model = @getModel()
    
    extend true, {}, 
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
      cellStyle.padding = 5
      cellStyle.margin = 0
    
    # cellStyle.display = 'flex'
    # cellStyle.flexGrow = 1
      
    return cellStyle
            

  # override me to add inline styles that can NOT be overriden by columnDef.cellStyle
  getCellOverrideStyle: (model) ->
    # none for now, but it would be a good idea, if overriding this method, to call super.  
    return {}


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
    
      
  setDatumErrors: ->
    model = @getModel()
    return unless model?
    
    # unlike success handler below, we leave the cell-error on until the next update
    saveErrorResp = @getDatagridSaveErrors()
    if saveErrorResp?.length > 0
      if @refs.datum?
        @refs.datum.clearErrors?()
        @refs.datum.onModelSaveError(@getModel(), saveErrorResp)

    if @getDatagridSaveSuccess()
      @refs.datum?.clearErrors?()
      @setDatagridSaveSuccess(false)
      
      
  focusInput: ->
    if @props.editing
      @refs.datum?.focus()
    

      
