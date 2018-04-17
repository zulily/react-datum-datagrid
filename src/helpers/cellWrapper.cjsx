
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
    
    
  @defaultProps:
    defaultCellComponent: Cell
    
    
  componentWillMount: ->
    @setState editing: false, selected: false, renderError: null
    
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
      
    classNames = Classnames 'rdd-cell-wrapper', selected: @isSelected(), placeholder: @props.showPlaceholder

    <div className={classNames}
        tabIndex={1}
        onKeyDown={@_onCellKeydown}
        onFocus={@_onCellFocus}
        onBlur={@_onCellBlur}
        onDoubleClick={@_onCellEdit}
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
      onEdit={@_onCellEdit}
    />
    

  edit: ->
    return unless @props.datagrid?.canEditCell?(@props.column, @props.model)
    @setState editing: true
    

  focus: ->
    ReactDOM.findDOMNode(@).focus()
    
  
  isSelected: ->
    @props.datagrid?.isCellSelected?(@props.rowIndex, @props.column.key)


  _onCellFocus: (evt) =>
    @setState selected: true
    
    
  _onCellBlur: (evt) =>
    # defer to give editing a chance to happen, and focus gets put on edit input
    _.defer =>
      unless $.contains(ReactDOM.findDOMNode(this), document.activeElement) 
        @setState selected: false, editing: false
    
  
  _onCellKeydown: (evt) =>
    #console.log 'rdd CellWrapper _onCellKeydown', evt.key
    switch evt.key
      when 'Enter'
        if @state.editing
          @_save()
          newCell = if evt.shiftKey
            @_focusUp()
          else
            @_focusDown()
          newCell.find('i.fa-pencil').trigger('click')
        else
          @edit()
      when 'Tab'
        evt.preventDefault()
        newCell = if evt.shiftKey
          @_focusLeft()
        else
          @_focusRight()

        if @state.editing
          @_save()
          # TODO : this is a hack we should probably comunicate this back up to
          #  datagrid and have it tell the adjacent cell to go into edit
          # I tried triggering dblclick on the newCell but that didn't do the thing
          _.defer => newCell.find('.rdd-icon-edit').trigger('click')
        
      when 'Escape' then @_cancel()
      when 'ArrowRight' then @_onArrowRight(evt)
      when 'ArrowLeft' then @_onArrowLeft(evt)
      when 'ArrowUp' then @_onArrowUp(evt)
      when 'ArrowDown' then @_onArrowDown(evt)
      
    
  _onCellEdit: =>
    @edit()
  
  
  _onArrowRight: (evt) =>
    evt.preventDefault()
    @_focusRight()  
    
    
  _onArrowLeft: (evt) =>
    evt.preventDefault()
    @_focusLeft()
    
      
  _onArrowUp: (evt) =>
    evt.preventDefault()
    @_focusUp()
    
      
  _onArrowDown: (evt) =>
    evt.preventDefault()
    @_focusDown()
    
      
    
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
    
    
  _cancel: ->
    @setState editing: false
    _.defer => @focus()
    
    
  _focusRight: ->
    @_focusOffset(0, 1)

  
  _focusLeft: ->
    @_focusOffset(0, -1)


  _focusUp: ->
    @_focusOffset(-1, 0)

  
  _focusDown: ->
    @_focusOffset(1, 0)

  
  _focusOffset: (colOffset, rowOffset)->
    # TODO : flip these when datagrid is upright
    columnIndex = @props.columnIndex + colOffset
    rowIndex = @props.rowIndex + rowOffset
    

    return $(React.findDOMNode(@props.datagrid))
    .find(".rdd-cell-wrapper[data-row=#{rowIndex}][data-col=#{columnIndex}]")
    .focus()
  
    
  
  