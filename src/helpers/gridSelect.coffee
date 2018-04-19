
ReactDOM = require 'react-dom'
_ = require 'underscore'


CompareObjects = require './compareObjects'

###
  These are the selection methods available on react-datum-datagrid
  
  @state.selectedCells
    An array of objects with the following definition
      {
        colKey: string      # Defines the model attribute associated with this cell
        rowIndex: number   # Defines the row index of the model this row represents
        columnIndex: number      # Defines the column index. Not probably too useful outside this mixin
      } 
      
  getSelectedCells() method is added to datagrid class being mixed into.  It returns an array 
    of the selected cells.  Array may be just one member -> the currently highlighted cell 
      
  A typical use case would be to check if @state.selectedCells.length > 0, if so, use that.
  Otherwise, you can use getSelectedCell() to see if the user has just focused on a specific
  cell instead of selecting a range.  
  
  Addtional Props:
    onSelectedCellsChange - called with (@state.selectedCells) 
  
    
###
module.exports = class GridSelect
  
  DOUBLE_CLICK_INTERVAL: 600  # in ms - max time between clicks to consider double click 
  
  # A flattened list of model keys
  # needed to calculate the selection area
  # because math. 
  modelKeyIndex: []
  
  # TODO : should this be in @state?
  startSelPosition: null
  
  componentWillMount: ->  
    @originalMethod?()
    @setState
      # The array of {rowIndex, colKey} which represent which cells are selected.
      selectedCells: []


  onCollectionReset: =>
    @resetSelectedCells()
    @originalMethod?()
      
      
  onCellMouseDown: (evt, cell) =>
    # DONT preventDefault - instead use styling {user-select: none} to block text selection.
    #     using prevent default prevents grid from focusing the cell
    # prevents the browser from starting text selection highlighting
    # evt.preventDefault()

    @_updateModelKeyIndex()

    # second click on same cell triggers edit (workaround to double click to edit)
    thisClickPosition = @_getCellPosition(cell)
    return unless thisClickPosition?
    
    # we are editing this cell - do nothing on click
    return if @isCellEditing(thisClickPosition.columnIndex, thisClickPosition.rowIndex)
    # if we are editing another cell, save changes to that cell
    if @isDatagridEditing()
      @saveEditingCell()
    
    # effectively double click to edit
    thisClickTick = Date.now()
    if thisClickTick - @lastClickTick < @DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, @lastClickedPosition) 
      @onCellEdit(evt, cell.props.column, cell.props.model, cell.props.columnIndex, cell.props.rowIndex)
      return       
      
    @lastClickedPosition = thisClickPosition
    @lastClickTick = thisClickTick
    
    unless evt.shiftKey 
      @startSelPosition = thisClickPosition


  onCellMouseUp: (evt, cell) =>
    endSelPosition =  @_getCellPosition(cell)
    
    # we are editing this cell - do nothing on click
    return if @isCellEditing(endSelPosition.columnIndex, endSelPosition.rowIndex)
    
    if evt.shiftKey && @state.selectedCells?.length > 0
      @selectCellsBetween(@getSelectedCell(), endSelPosition)
    else if @startSelPosition?
      unless endSelPosition?
        @startSelPosition = null
        return
        
      sameCellAsOrigin = endSelPosition.rowIndex == @startSelPosition.rowIndex && endSelPosition.colKey == @startSelPosition.colKey
      rowModel = cell.props.model
      # If they pressed command or control click
      # and we are looking at the same cell we started with
      # then toggle the selected cell.
      if evt.metaKey || evt.ctrKey
        if sameCellAsOrigin
          if @isCellSelected(endSelPosition.rowIndex, endSelPosition.colKey) 
            @deselectCell(endSelPosition.rowIndex, endSelPosition.colKey)
          else
            @selectCellPosition(endSelPosition)
      else if sameCellAsOrigin
        @setSelectedCell(cell)
    else 
      @setSelectedCell(cell)
    
    @startSelPosition = null

    
  onCellMouseMove: (evt, cell) =>
    evt.preventDefault()
    evt.stopPropagation()
    # Don't do anything if they are holding control or command.
    return if evt.metaKey || evt.ctrKey || evt.shiftKey
    thisCellPosition = @_getCellPosition(cell)
    if @startSelPosition? && !CompareObjects(@startSelPosition, thisCellPosition) 
      @selectCellsBetween(@startSelPosition, thisCellPosition)


  GridSelect_onDocumentKeyDown: (evt) =>
    return unless @__isInOurDatagrid(evt.target)
    keyCode = evt.keyCode
    
    if @isDatagridEditing()
      switch keyCode
        when 13, 9             # enter and tab save current edits and go to next row or cell to right 
          evt.preventDefault()
          cellPosition = @_getRelativeCellPosition(keyCode)
          @saveEditingCell()
          if cellPosition?
            @setSelectedCellAt(cellPosition) 
            @editCellAt(evt, cellPosition.columnIndex, cellPosition.rowIndex)
        when 27
          @cancelEditing()
    
    else
      # TODO : we should think about adding this: https://github.com/kabirbaidhya/keycode-js#usage 
      #      instead of using the numeric values below
      switch 
        # editing should start on enter, space, decimal point, or alpha numeric key
        when (keyCode in [13, 32, 110] || keyCode in [48..90]) && !(evt.ctrlKey || evt.metaKey) 
          if @state.selectedCells?.length > 0
            {columnIndex, rowIndex} = @getSelectedCell()
            @editCellAt(evt, columnIndex, rowIndex)
        when keyCode == 27   # escape clears selections
          @resetSelectedCells()
        when keyCode in [37, 38, 39, 40] # left, up, right, down
          evt.preventDefault()
          if evt.shiftKey 
            if @state.selectedCells.length > 0
              @selectCellsBetween(@getSelectedCell(), @_getRelativeCellPosition(keyCode))
          else if @state.selectedCells.length > 0
            @startSelPosition = null
            cellPosition = @_getRelativeCellPosition(keyCode)
            @setSelectedCellAt(cellPosition) if cellPosition?
        
  
  # returns the cell adjacent to the last selected cell or editing cell by keycode
  _getRelativeCellPosition: (keyCode) ->
    lastSelectedCellPosition = @getLastSelectedCellPosition() ? @getEditingCell()
    return null unless lastSelectedCellPosition?
    
    adjacentCell = switch keyCode
      when 37    # left 
        if lastSelectedCellPosition.columnIndex > 0  
          _.extend {}, lastSelectedCellPosition, 
            columnIndex: lastSelectedCellPosition.columnIndex - 1
            colKey: @props.columns[lastSelectedCellPosition.columnIndex - 1].key
      when 38    # up 
        if lastSelectedCellPosition.rowIndex > 0 
          _.extend {}, lastSelectedCellPosition, 
            rowIndex: lastSelectedCellPosition.rowIndex - 1
      when 39, 9    # right or tab 
        if lastSelectedCellPosition.columnIndex < @props.columns.length - 1 
          _.extend {}, lastSelectedCellPosition, 
            columnIndex: lastSelectedCellPosition.columnIndex + 1
            colKey: @props.columns[lastSelectedCellPosition.columnIndex + 1].key
      when 40, 13    # down or enter 
        if lastSelectedCellPosition.rowIndex < @getRowCount() - 1
          _.extend {}, lastSelectedCellPosition, 
            rowIndex: lastSelectedCellPosition.rowIndex + 1
    
    return adjacentCell
    
          
  _getCellsBetween: (startRow, startCol, endRow, endCol) ->
    result = []
    deltaX = endRow - startRow
    deltaY = endCol - startCol
    modifierX = if deltaX < 0 then -1 else 1
    modifierY = if deltaY < 0 then -1 else 1
    for rows in [0 ..  Math.abs(deltaX)]
      for cols in [0 ..  Math.abs(deltaY)]
        result.push
          rowIndex: startRow + (rows * modifierX)
          colKey: @modelKeyIndex[startCol + (cols * modifierY)]
          columnIndex: startCol + (cols * modifierY)
    return result
    
    
  # this returns the anchor cell if multiple cells are selected
  getSelectedCell: () ->
    return @state.selectedCells[0]
    
    
  # this sets the cell at cellPosition as the only selected cell  
  setSelectedCell: (cell) ->
    @setSelectedCellAt @_getCellPosition(cell)
    
  
  setSelectedCellAt: (cellPosition) ->
    @setState 
      selectedCells: [cellPosition]
    @onSelectedCellsChange()

  
  
  # is this rowIndex, columnDef.key in the selected cells?
  isCellSelected: (rowIndex, colKey) ->
    selectedCell = @getSelectedCell()
    return selectedCell.rowIndex == rowIndex && selectedCell.colKey == colKey
        
        
  getSelectedColumn: () ->
    colIndex = @getSelectedCell()?.columnIndex
    return null unless colIndex? 
    return @getColumn(colIndex)
    
    
  # Reset everything
  resetSelectedCells: (options={}) ->
    options = _.defaults options,
      silent: false
      
    if options.silent 
      @state.selectedCells = []
    else
      @setState {selectedCells: []}, ->
        @onSelectedCellsChange() unless options.silent


  selectCellPositions: (cellPositions) ->
    @resetSelectedCells(silent: true)
    
    for cellPosition in cellPositions
      @selectCellPosition(cellPosition, silent: true)
    
    @setState {selectedCells: @state.selectedCells}, ->
      @onSelectedCellsChange()
    
    
  selectCellsBetween: (@startSelPosition, endSelPosition) ->
    cells = @_getCellsBetween(@startSelPosition.rowIndex, @startSelPosition.columnIndex, endSelPosition.rowIndex, endSelPosition.columnIndex)
    @selectCellPositions(cells)    
    
    
  selectCell: (cell) ->
    @selectCellPosition @_getCellPosition(cell)
    
    
  selectCellPosition: (cellPosition, options={}) ->
    options = _.defaults options,
      # set to true to not call @onSelectedCellsChange
      silent: false
      
    return if cellPosition.rowIndex < 0 || @modelKeyIndex.indexOf(cellPosition.colKey) < 0
    
    cell = {rowIndex: cellPosition.rowIndex, colKey: cellPosition.colKey, columnIndex: @modelKeyIndex.indexOf(cellPosition.colKey)}
    unless @isCellSelected(cellPosition.rowIndex, cellPosition.colKey)
      selectedCells = @state.selectedCells.slice(0)
      selectedCells.push(cellPosition)
      if options.silent
        @state.selectedCells = selectedCells
      else
        @setState {selectedCells: selectedCells}, ->
          @onSelectedCellsChange() 
  
  
  isCellSelected: (row, colKey) =>
    return _.any(@state.selectedCells, (cell) -> cell.rowIndex == row && cell.colKey == colKey)
        
    
  deselectCell: (rowIndex, colKey) ->
    newSelectedCells = _.filter @state.selectedCells, (cell) -> !(cell.rowIndex == rowIndex && cell.colKey == colKey)
    @setState {selectedCells: newSelectedCells}, ->
      @onSelectedCellsChange()
    
    
  ###
    returns an array of selectedCells.  May be array of one - the highlighted cell 
  ###
  getSelectedCells: ->
    return @state.selectedCells ? []
  
  
  ###
    returns the cell position of the last cell selected by user
  ###
  getLastSelectedCellPosition: ->
    return null unless @state.selectedCells?.length > 0
    
    return @state.selectedCells[-1..][0]
    
  
  onSelectedCellsChange: () ->
    # console.log "onSelectedCellsChange: selectedCells=", JSON.stringify(@state.selectedCells)
    @props.onSelectedCellsChange?((@state.selectedCells ? []).slice(0))
    
    
  onCellEdit:  (evt, columnDef, model, columnIndex, rowIndex) ->
    @startSelPosition = null
    @resetSelectedCells()
    
    @originalMethod?(evt, columnDef, model, columnIndex, rowIndex)   # ./gridEdit also extends this method
    
    
  # Used to check which set of columns we have right now
  # and make an index for mathematic purposes.
  _updateModelKeyIndex: ->
    @modelKeyIndex = _.map @props.columns, (columnDef) -> columnDef.key
    
    
  _getCellPosition: (cell) ->
    # see, ./helpers/cellWrapper
    return {
      rowIndex: cell.props.rowIndex
      colKey: cell.props.column.key
      columnIndex: cell.props.columnIndex
    }      


  
  __updateRowModelColumn: (rowIndex, rowModel, columnKey, value) ->
    return unless rowModel?
    
    try 
      parsedJsonObj = JSON.parse(value) if _.isString(value)
    catch
      # nbd, it's probably not json
    
    # if there is a datum instance associated with the model, use that as it provides validation
    attribute = columnKey
    column = @getColumn(columnKey)
    if @canEditCell(column, rowModel)
      # by going through the @saveModel on widgets.react.Datagrid, we get cell spinners and flash notification
      @saveModel rowModel, 
        cellKey: columnKey   # mimicks react-datagrid row event 
        rowIndex: rowIndex
        updated: parsedJsonObj ? value
        key: "Paste"
        
      rowModel.trigger 'invalidate'


  __isInOurDatagrid: (element) ->
    return ReactDOM.findDOMNode(@).contains(element)

    
