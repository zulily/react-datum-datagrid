
ReactDOM = require 'react-dom'
$ = require 'jquery'
_ = require 'underscore'


CopyPasteFromExcel = require './copyPasteFromExcel'
CompareObjects = require './compareObjects'

###
  These are the selection methods available on react-datum-datagrid
  
  @state.selectedCells
    An array of objects with the following definition
      {
        colKey: string      # Defines the model attribute associated with this cell
        rowIndex: number   # Defines the row index of the model this row represents
        idx: number      # Defines the column index. Not probably too useful outside this mixin
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
  
  copyPasteHelper: new CopyPasteFromExcel()
  shouldEdit: false
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

  componentDidMount: ->
    @originalMethod?()
    @__bindEvents()
    
    
  componentWillUnmount: ->
    @originalMethod?()
    @__unbindEvents()
    
    
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
    
    # effectively double click to edit
    thisClickTick = Date.now()
    if thisClickTick - @lastClickTick < @DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, @lastClickedPosition) 
      @__startEdit()
      return       
      
    @lastClickedPosition = thisClickPosition
    @lastClickTick = thisClickTick
    
    unless evt.shiftKey 
      @startSelPosition = thisClickPosition


  onCellMouseUp: (evt, cell) =>
    endSelPosition =  @_getCellPosition(cell)
    if evt.shiftKey && @state.selectedCells?.length > 0
      @selectCellsBetween(@state.selectedCells[0], endSelPosition)
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


  onCellKeyDown: (evt, cell) =>
    keyCode = evt.keyCode
    
    # TODO : we should think about adding this: https://github.com/kabirbaidhya/keycode-js#usage 
    #      instead of using the numeric values below
    switch 
      # editing should start on enter, space, decimal point, or alpha numeric key
      when (keyCode in [13, 32, 110] || keyCode in [48..90]) && !(evt.ctrlKey || evt.metaKey) 
        @__startEdit()
      when keyCode == 27   # escape clears selections
        @resetSelectedCells()
      when keyCode in [37, 38, 39, 40] # left, up, right, down
        if evt.shiftKey  
          if @startSelPosition
            @selectCellsBetween(@startSelPosition, @_getCellPosition(cell))
          else
            @selectCell(cell)
        else
          @startSelPosition = null
          @selectCell(cell)
          
          
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
          idx: startCol + (cols * modifierY)
    return result
    
    
  # this returns the anchor cell if multiple cells are selected
  getSelectedCell: () ->
    return @state.selectedCells[0]
    
    
  # this sets the cell at cellPosition as the only selected cell  
  setSelectedCell: (cell) ->
    @setState 
      selectedCells: [@_getCellPosition(cell)]
    cell.focus()
    @onSelectedCellsChange()
    
  
  # is this rowIndex, columnDef.key in the selected cells?
  isCellSelected: (rowIndex, colKey) ->
    selectedCell = @getSelectedCell()
    return selectedCell.rowIndex == rowIndex && selectedCell.colKey == colKey
        
        
  getSelectedColumn: () ->
    colIndex = @getSelectedCell()?.idx
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
    cells = @_getCellsBetween(@startSelPosition.rowIndex, @startSelPosition.idx, endSelPosition.rowIndex, endSelPosition.idx)
    @selectCellPositions(cells)    
    
    
  selectCell: (cell) ->
    @selectCellPosition @_getCellPosition(cell)
    
    
  selectCellPosition: (cellPosition, options={}) ->
    options = _.defaults options,
      # set to true to not call @onSelectedCellsChange
      silent: false
      
    return if cellPosition.rowIndex < 0 || @modelKeyIndex.indexOf(cellPosition.colKey) < 0
    
    cell = {rowIndex: cellPosition.rowIndex, colKey: cellPosition.colKey, idx: @modelKeyIndex.indexOf(cellPosition.colKey)}
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
  
  
  onSelectedCellsChange: () ->
    console.log "onSelectedCellsChange: selectedCells=", JSON.stringify(@state.selectedCells)
    @props.onSelectedCellsChange?((@state.selectedCells ? []).slice(0))
    
    
  # Used to check which set of columns we have right now
  # and make an index for mathematic purposes.
  _updateModelKeyIndex: ->
    @modelKeyIndex = _.map @getColumns(), (columnDef) -> columnDef.key
    
    
  _getCellPosition: (cell) ->
    # see, ./helpers/cellWrapper
    return {
      rowIndex: cell.props.rowIndex
      colKey: cell.props.column.key
      idx: cell.props.columnIndex
    }      
  
  
  _getUpperLeftBound: (cells=@state.selectedCells) ->
    return [] unless cells?
    top = _.min cells, (cell) -> cell.rowIndex
    cells = _.filter cells, (cell) -> cell.rowIndex == top.rowIndex
    left = _.min cells, (cell) -> cell.idx
    return {
      top: top.rowIndex
      left: left.idx
    }
  
  
  _getLowerRightBound: (cells=@state.selectedCells) ->
    return [] unless cells?
    bottom = _.max cells, (cell) -> cell.rowIndex
    cells = _.filter cells, (cell) -> cell.rowIndex == bottom.rowIndex
    right = _.max cells, (cell) -> cell.idx
    return {
      bottom: bottom.rowIndex
      right: right.idx
    }
  
  
  __bindEvents: =>
    # TODO look into why mixins have to bind methods like below, you cant pass a 
    #   mixin method directly to event handlers or the mixin wrapper get's no this context
    $(document).on 'copy.GridSelect', (evt) => @__onDocumentCopy(evt)
    $(document).on 'paste.GridSelect', (evt) => @__onDocumentPaste(evt)
    
  
  __unbindEvents: =>
    $(document).off 'copy.GridSelect'
    $(document).off 'paste.GridSelect'

  
  __onDocumentCopy: (e) =>
    # ************
    # Handle the copy operation and override
    # whatever it thought was selected with the actual
    # values inside the grid. 
    # ************
    
    # don't handle copy paste events inside of editing grid cells let the input handle it
    return if $(e.target).closest('.datagrid-cell.editing').length > 0 
    
    result = []
    cells = @getSelectedCells()
    
    rows = _.uniq _.map cells, (cell) -> cell.rowIndex
    for row in rows
      rowModel = @getModelAt(row)
      continue unless rowModel?
      
      cellsInRow = _.filter cells, (cell) -> cell.rowIndex == row
      # Sort it so the paste is in the same order as the grid.
      cellsInRow = _.sortBy cellsInRow, 'idx'
      vals = []
      for cell in _.filter(cellsInRow, (cell) -> cell?)
        vals.push @getExportValue(rowModel, @getColumn(cell.colKey))
        
      # \t for excel compatibility
      result.push(vals.join("\t"))
    
    e.originalEvent.clipboardData.setData('text/plain', result.join("\n"))
    e.stopPropagation()
    e.preventDefault()
          

  __onDocumentPaste: (e) =>
    paste = @copyPasteHelper.processPaste(e)
    $activeEl = $(document.activeElement)
    # don't handle copy paste events inside of editing grid cells let the input handle it
    return if $($activeEl).closest('.datagrid-cell.editing').length > 0 || $($activeEl).is('input,textarea')     
    
    # Small fix that doesn't catch rows that are only across.
    if !Array.isArray(paste) && paste.indexOf('\t') >= 0
      paste = [paste.split('\t')]
    
    # else if !Array.isArray(paste[0])
    #   # If it is an array of a single cell, we
    #   # still need everything to be in a 2d array format
    #   # so fix the object accordingly.
    #   result = []
    #   for row in paste
    #     result.push [row]
    #   paste = result
      
    if Array.isArray(paste)
      # We need to paste as a shape.
      if @state.selectedCells.length > 0
        start = @_getUpperLeftBound()
        for rowIndex in [start.top .. start.top + paste.length - 1]
          cellsInRow = _.filter @state.selectedCells, (cell) -> cell? && cell.rowIndex == rowIndex
          cellsInRow = _.sortBy cellsInRow, 'idx'
          continue if cellsInRow.length == 0
          pasteRow = paste[rowIndex - start.top]
          pasteRow = [pasteRow] unless Array.isArray(pasteRow)
          rowModel = @getModelAt(rowIndex)
          for cellIdx in [0 .. pasteRow.length - 1]
            continue if cellIdx >= cellsInRow.length
            @__updateRowModelColumn(rowIndex, rowModel, cellsInRow[cellIdx].colKey, pasteRow[cellIdx])
      else
        # We can create the shape
        highlightedCell = @getSelectedCell()
        if highlightedCell?
          start = {top: highlightedCell.rowIndex, left: highlightedCell.idx}
          for rowIndex in [start.top .. start.top + paste.length - 1]
            pasteRow = paste[rowIndex - start.top]
            pasteRow = [pasteRow] unless _.isArray(pasteRow)
            rowModel = @getModelAt(rowIndex)
            for cellIdx in [0 .. pasteRow.length - 1]
              @__updateRowModelColumn(rowIndex, rowModel, @modelKeyIndex[start.left + cellIdx], pasteRow[cellIdx])
    else
      # Single paste of a value. So fill it.
      for cell in @getSelectedCells()
        rowModel = @getModelAt(cell.rowIndex)
        @__updateRowModelColumn(cell.rowIndex, rowModel, cell.colKey, paste)            
        
    
    e.stopPropagation()
    e.preventDefault()
    
      
    
              
  __startEdit: ->
    @startSelPosition = null
    @startKeySelPosition = null
    @resetSelectedCells()
    @shouldEdit = true   
    
              
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



    
