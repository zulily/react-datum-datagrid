
  
React = require('react')
ReactDatum = require('react-datum')
PropTypes = require('prop-types')
Classnames = require('classnames')
Bstr = require('bumble-strings')

_ = require('underscore')
extend = require('node.extend')

###
  Cell is the controlled component rendered by default in each cell.
   
###
module.exports = class Cell extends React.Component
  
  @propTypes: 
    # is this cell selected
    selected: PropTypes.bool
    # is this cell currently being edited
    editing: PropTypes.bool
    # is this cell able to be edited
    editable: PropTypes.bool
    # backbone model or object 
    rowData: PropTypes.object
    # row index of row being rendered
    rowIndex: PropTypes.number
    # column defition object
    column: PropTypes.object
    # The collection the datagrid is rendering
    collection: PropTypes.oneOfType([
      PropTypes.object
      PropTypes.array
    ])  
    # this component and the underlying Datum are controlled components
    # the value of the cell will not update until the value prop is passed in
    value: PropTypes.any
    onChange: PropTypes.func 
    # called when user clicks edit icon
    onEdit: PropTypes.func
    # default styles to apply to cell
    defaultCellStyle: PropTypes.object
    
    
  componentDidUpdate: (prevProps, prevState) ->
    if @props.editing && !prevProps.editing
      @refs?.datum?.focus()
      
    # force cell to rerender in 5 sec to clear the cell highlights
    # @_delayedForceUpdate()   


  render: -> 
    value = @props.value
    datumProps = @getDatumProps(value)
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
  
  
  ###
    You can override or extend this method to change the props passed to 
    the datum at runtime
  ###
  getDatumProps: (value) ->
    datumProps = extend true, {}, @props.column.datumProps,
      model: @getModel() 
      attr: @props.column.key
      column: @props.column
      ref: 'datum'
      inputMode: if @props.editing then 'edit' else 'readonly'
      stateless: true
      value: value
      setOnChange: false
      setOnBlur: false
      saveOnSet: false
      onChange: @props.onChange
        
        
    datumProps = _.defaults datumProps,
      # default placement of popover in datagrid is top because that's the safest to not be 
      # cut off by a viewport edge
      rbOverlayProps: 
        trigger: ['hover','focus', 'click']
        placement: 'top'          
    
    return datumProps
    
  
  getCellClass: () ->
    model = @getModel()
    return Classnames(
      'rdd-cell', 
      "rdd-#{Bstr.dasherize(@props.column.key)}-column no-help-icon",
      @getAdditionalElementClasses(),
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
      
      
  focusInput: ->
    if @props.editing
      @refs.datum?.focus()
    

      
