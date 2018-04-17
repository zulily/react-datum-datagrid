
React = require 'react'
ReactDOM = require 'react-dom'
PropTypes = require 'prop-types'
Classnames = require 'classnames'
$ = require 'jquery'
_ = require 'underscore'

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
    # reference to datagrid parent object
    datagrid: PropTypes.any
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

    <div className={classNames}
        tabIndex={1}
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
      {@_renderComponentOrPlaceholder()}
    </div>
    
    
  _renderComponentOrPlaceholder: () ->
    if @props.showPlaceholder 
        return <span>...</span> 

    CellComponent = @props.column.cellComponent ? @props.defaultCellComponent

    <CellComponent 
      editing={@state.editing}
      rowData={@props.model}
      rowIndex={@props.rowIndex}
      column={@props.column}
      datagrid={@props.datagrid}
      defaultCellStyle={@props.defaultCellStyle}
      ref={'cellComponent'}
    />
    

  edit: ->
    return unless @props.datagrid?.canEditCell?(@props.column, @props.model)
    @setState editing: true
    

  focus: ->
    ReactDOM.findDOMNode(@).focus()
    
  
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
  
  
  _onKeydown: (evt) =>
    @props.onKeyDown?(evt, @)      
    
    
  _onDoubleClick: =>
    @props.onDoubleClick?(evt, @)
  
    
  ###
    rowEvt from react-data-grid looks like this:
    {  
      cellKey: "costing.wholesaleCost.amount"
      key: "Enter"
      rowIndex: 0
      updated: "24"
    }
    datagrid ignores .key
  ###
  _save: ->
    rowEvt = 
      cellKey: @props.column.key
      key: "Other"
      rowIndex: @props.rowIndex
      # cell component must have a getValue method. See DefaultEditor
      updated: @refs.cellComponent.getValue()
    @props.datagrid.saveModel(@props.model, rowEvt)
    @setState editing: false
    
    
    
  
  