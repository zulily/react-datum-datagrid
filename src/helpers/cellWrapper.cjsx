
React = require 'react'
ReactDOM = require 'react-dom'
PropTypes = require 'prop-types'
Classnames = require 'classnames'
_ = require 'underscore'

# FontAwesomeIcon = require '@fortawesome/react-fontawesome'
# faCoffee = require '@fortawesome/fontawesome-free-solid/faCoffee'

EditableIndicator = require './editableIndicator'
SavingIndicator = require './savingIndicator'


Cell = require '../cell'
  
# CellWrapper owns the editing state and handles arrow key selection 
module.exports = class CellWrapper extends React.Component
  
  @props: 
    # This could be a Backbone Model instance or a plain js object
    model: PropTypes.any
    # The column definition for this cell.  see TODO 
    column: PropTypes.object
    # zero based row index being rendered
    rowIndex: PropTypes.number
    # zero based column index being rendered
    columnIndex: PropTypes.number
    # this is a controlled component - must pass a value
    value: PropTypes.any
    # The collection the datagrid is rendering
    collection: PropTypes.oneOfType([
      PropTypes.object
      PropTypes.array
    ])  
    # This is the cell component to use when the cellComponent attribute 
    # is not specified in in the column definition
    defaultCellComponent: PropTypes.any 
    # This is the cell style to use when the cellComponent attribute 
    # is not specified in in the column definition
    defaultCellStyle: PropTypes.object
    # This should be the style passed from RV Grid render callback
    style: PropTypes.object
    # true if cell is selected
    selected: PropTypes.bool
    # true if cell is in edit mode
    editing: PropTypes.bool
    # true if cell is editable
    editable: PropTypes.bool
    # This is called with (event, cell) 
    onMouseDown: PropTypes.function
    # This is called with (event, cell) 
    onMouseUp: PropTypes.function
    # This is called with (event, cell) 
    onMouseEnter: PropTypes.function
    # This is called with (event, cell) 
    onMouseLeave: PropTypes.function
    # This is called with (event, cell) 
    onKeyDown: PropTypes.function
    # This is called whenever the user enters a character when editing=true
    onChange: PropTypes.function
    
    
  @defaultProps:
    defaultCellComponent: Cell
    
    
  componentWillMount: ->
    @setState renderError: null
    
    
  componentDidCatch: (error, info)->
    @props.onRenderError?(error, info)
    console.error "react-datum-datagrid: Cell at #{rowIndex}, #{columnIndex} (#{column.key}) failed to render", error, info
    @setState renderError: {error: error, info: info}
    
  render: ->
    if @state.renderError?
      title = "This cell failed to render. Additional Details: #{JSON.stringify(@state.renderError)}"
      return <span title={title}>:(</span>
      
    dataProps = 
      'data-row': @props.rowIndex
      'data-col': @props.columnIndex
      
    classNames = Classnames 'rdd-cell-wrapper',
      'rdd-cell-selected': @isSelected(), 
      'rdd-cell-placeholder': @props.showPlaceholder
      'rdd-was-saved': @props.wasSaved
      'rdd-save-error': @props.saveErrors?.length > 0

    <div className={classNames}
        onMouseDown={@_onMouseDown}
        onMouseUp={@_onMouseUp}
        onMouseMove={@_onMouseMove}
        onMouseEnter={@_onMouseEnter}
        onMouseLeave={@_onMouseLeave}
        onKeyDown={@_onKeydown}
        onFocus={@_onFocus}
        onBlur={@_onBlur}
        onDoubleClick={@_onDoubleClick}
        style={@props.style}
        {... dataProps}
        
    >
      {@_renderIndicators()}
      {@_renderComponentOrPlaceholder()}
    </div>
    
    
  _renderComponentOrPlaceholder: () ->
    if @props.showPlaceholder 
        return <span>...</span> 

    # @props.column.formatter was from react-data-grid 
    # which copied slick-grid, we support both
    CellComponent = @props.column.cellComponent ? @props.column.formatter ? @props.defaultCellComponent

    <CellComponent 
      value={@props.value}
      selected={@props.selected}
      editable={@props.editable}
      editing={@props.editing}
      rowData={@props.model}
      rowIndex={@props.rowIndex}
      rowIdx={@props.rowIndex}
      column={@props.column}
      collection={@props.collection}
      defaultCellStyle={@props.defaultCellStyle}
      ref={'cellComponent'}
      onChange={@_onChange}
    />
    # rowIdx is for backward compat.
    
  _renderIndicators: () ->
    <div className="rdd-cell-indicators">
      {@_renderEditableIndicator()}
      {@_renderSavingIndicator()}
    </div>
    
    
  _renderEditableIndicator: ->
    return null unless @props.editable && !@props.saving && !@props.editing
    <EditableIndicator onClick={@_onEditIndicatorClick}/>
    
    
  _renderSavingIndicator: ->
    return null unless @props.saving
    <SavingIndicator/>


  focus: ->
    @refs?.cellComponent?.focus()


  isSelected: ->
    @props.selected


  _onMouseDown: (evt)=>
    @props.onMouseDown?(evt, @)
    
  
  _onMouseUp: (evt)=>
    @props.onMouseUp?(evt, @)
    
  
  _onMouseMove: (evt) =>
    @props.onMouseMove?(evt, @)
  
  
  _onMouseEnter: (evt)=>
    @props.onMouseEnter?(evt, @)
    
  
  _onMouseLeave: (evt)=>
    @props.onMouseLeave?(evt, @)
    
  
  _onFocus: (evt) =>
    @setState selected: true
    
    
  _onBlur: (evt) =>
    @props._onBlur?(evt, @)
  
  _onDoubleClick: (evt) =>
    @props.onDoubleClick(evt, @)
  
  _onEditIndicatorClick: (evt) =>
    @props.onEditIndicatorClick(evt, @)
    
  _onChange: (value) =>
    @props.onChange(value, @)

    
  
  