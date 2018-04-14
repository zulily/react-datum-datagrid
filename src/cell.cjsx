
React = require('react')
PropTypes = require('prop-types')

###
  The Cell component is responsible for rendering a single cell.  
  
  You can extend this class component to alter the behavior and pass a different
  cellComponent prop to react-datum-datagrid
###
module.exports = class Cell extends React.Component
  
  @propTypes: 
    rowData: PropTypes.object
    column: PropTypes.object
    value: PropTypes.any
    # has precedence over context
    datagrid: PropTypes.any    

    # called when user clicks edit icon
    onEdit: PropTypes.func
    
    # set to true to make cell selected cell. also calls 
    #    datagrid.isCellSelected?(@props.rowIdx, @props.column.key)
    selected: PropTypes.bool
    
    # default styles to apply to cell
    defaultCellStyle: PropTypes.object
    
  @contextTypes:
    # see notes on prop above.  prop has precedence
    datagrid: PropTypes.any
    
    
  styles:
    icon:     
      color: App.lessVar('primary_action_color');
      cursor: 'pointer'
      float: 'right'
      marginLeft: App.lessVar('tiny_margin')
    editIcon:
      includes: 'icon'
      paddingTop: 2
      paddingLeft: 4
      paddingRight: 2
      paddingBottom: 2
      backgroundColor: 'rgba(224, 224, 224, 0.5)'
      display: 'inline-block'
      borderRadius: 10          
    refreshIcon:  
      includes: 'icon'
      color: App.lessVar('gray_tone3')
      cursor: 'none'
    warningBackground:
      background: '-webkit-linear-gradient(-45deg, ' + App.lessVar('warning_color') + ' 10px, rgba(0, 0, 0, 0) 10px)'
    errorBackground:
      background: '-webkit-linear-gradient(-45deg, ' + App.lessVar('error_color') + ' 10px, rgba(0, 0, 0, 0) 10px)'

  
  constructor: ->
    super
    
    
  componentDidMount: ->
    super
    
  
  render: -> 
    value = @props.value
    if @props.column.datum?
      datumProps = _.extend {}, @props.column.datumProps,
        model: @getModel() 
        attr: @props.column.key
        column: @props.column
        ref: 'datum'
        
      datumProps = _.defaults datumProps,
        # default placement of popover in datagrid is top because that's the safest to not be 
        # cut off by a viewport edge
        rbOverlayProps: 
          trigger: ['hover','focus', 'click']
          placement: 'top'          
        
      value = React.createElement @props.column.datum, datumProps
    else if _.isArray(value)
      value = value.join(', ')
    
    renderedCell = if @props.column.ellipsizeAt? && value? && !@props.column.datum?
      @renderWrapped(value.toString().elipsis(@props.column.ellipsizeAt), title: value)
    else
      @renderWrapped(value)
      
    return renderedCell
    
  
  renderWrapped: (value, options = {}) =>
    options = _.defaults options,
      title: null
      skipEditCell: false
    
    @setDatumErrors()

    canEditCell = !options.skipEditCell && @getDatagrid()?.canEditCell(@props.column, @getModel())
    auditErrorWarning = @getDatagrid()?.getAuditErrorWarnings(@props.column, @getModel())
    wrapperStyle = _.extend({}, options.wrapperStyle || {}, @getCellStyle(canEditCell))
    if auditErrorWarning
      wrapperStyle = _.extend(wrapperStyle, if auditErrorWarning.isError then @style('errorBackground') else @style('warningBackground'))

    className = @getCellClass(canEditCell)
    icon = @getPrimaryIcon(canEditCell)

    <div 
      data-attr-row={@props.rowIdx} 
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
    return @props.datagrid ? @context.datagrid
  
  
  getCellClass: (canEditCell) ->
    model = @getModel()
    return @conditionalClassNames(
      'datagrid-cell', 
      "#{@props.column.key.dasherize()}-column no-help-icon",
      @getAdditionalElementClasses(),
      {'cell-error': @getDatagridSaveErrors()?.length > 0},
      {'cell-saved': @getDatagridSaveSuccess() == true},
      {'editable': canEditCell},
      # method provided by gridSelectMixin
      {'selected': @isSelected()}
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
      icon = <i className="fa fa-spin fa-refresh" title="Saving update..." style={@style('refreshIcon')}/>
    
    else if canEditCell && !@props.column.hideEditableIcon
      icon = <i className="fa fa-pencil" onClick={this.onEditClick} 
        title="Click to edit this cell (or dbclick or enter)"
        style={@style('editIcon')}
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
    @props.selected || @getDatagrid()?.isCellSelected?(@props.rowIdx, @props.column.key)
      
      
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
      
  
    

      
