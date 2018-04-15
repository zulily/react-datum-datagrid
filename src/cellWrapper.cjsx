
React = require 'react'
ReactDOM = require 'react-dom'
PropTypes = require 'prop-types'
Classnames = require 'classnames'
$ = require 'jquery'
_ = require 'underscore'

Cell = require './cell'
  
# CellWrapper owns the editing state and handles arrow key selection 
module.exports = class CellWrapper extends React.Component
  
  @props: 
    # This could be a Backbone Model instance or a plain js object
    model: React.PropTypes.any
    # The column definition for this cell.  see TODO 
    column: React.PropTypes.object
    # zero based row index being rendered
    rowIdx: React.PropTypes.number
    # zero based column index being rendered
    colIdx: React.PropTypes.number
    # reference to datagrid parent object
    datagrid: React.PropTypes.any
    # This is the cell component to use when the cellComponent attribute 
    # is not specified in in the column definition
    defaultCellComponent: React.PropTypes.any 
    # This is the cell style to use when the cellComponent attribute 
    # is not specified in in the column definition
    defaultCellStyle: React.PropTypes.object
    
  @defaultProps:
    defaultCellComponent: Cell
    
    
  componentWillMount: ->
    @setState editing: false, selected: false
    
    
  render: ->
    CellComponent = @props.column.cellComponent ? @props.defaultCellComponent
      
    dataProps = 
      'data-row': @props.rowIdx
      'data-col': @props.colIdx
      
    classNames = Classnames 'rdd-cell-wrapper', selected: @isSelected()

    <div className={classNames}
        tabIndex={1}
        onKeyDown={@_onCellKeydown}
        onFocus={@_onCellFocus}
        onBlur={@_onCellBlur}
        onDoubleClick={@_onCellEdit}
        {... dataProps}
        
    >
      <CellComponent 
        editing={@state.editing}
        rowData={@props.model}
        rowIdx={@props.rowIdx}
        column={@props.column}
        datagrid={@props.datagrid}
        defaultCellStyle={@props.defaultCellStyle}
        ref={'cellComponent'}
        onEdit={@_onCellEdit}
      />
    </div>
    

  edit: ->
    return unless @props.datagrid?.canEditCell?(@props.column, @props.model)
    @setState editing: true
    

  focus: ->
    ReactDOM.findDOMNode(@).focus()
    
  
  isSelected: ->
    @props.datagrid?.isCellSelected?(@props.rowIdx, @props.column.key)


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
      rowIdx: 0
      updated: "24"
    }
    datagrid ignores .key
  ###
  _save: ->
    rowEvt = 
      cellKey: @props.column.key
      key: "Other"
      rowIdx: @props.rowIdx
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
    colIdx = @props.colIdx + colOffset
    rowIdx = @props.rowIdx + rowOffset
    

    return $(React.findDOMNode(@props.datagrid))
    .find(".rdd-cell-wrapper[data-row=#{rowIdx}][data-col=#{colIdx}]")
    .focus()
  
    
  
  