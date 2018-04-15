
ReactDOM = require 'react-dom'
$ = require 'jquery'
_ = require 'underscore'


CopyPasteFromExcel = require './helpers/copyPasteFromExcel'
CompareObjects = require './helpers/compareObjects'

###
  These are the selection methods available on react-datum-datagrid
  
  @selectedCells
    An array of objects with the following definition
      {
        col: string      # Defines the model attribute associated with this cell
        rowIdx: number   # Defines the row index of the model this row represents
        idx: number      # Defines the column index. Not probably too useful outside this mixin
      } 
      
  getSelectedCells() method is added to datagrid class being mixed into.  It returns an array 
    of the selected cells.  Array may be just one member -> the currently highlighted cell 
      
  A typical use case would be to check if @selectedCells.length > 0, if so, use that.
  Otherwise, you can use getSelectedCell() to see if the user has just focused on a specific
  cell instead of selecting a range.  
  
  Addtional Props:
    onSelectedCellsChange - called with (@selectedCells) 
  
    
###
module.exports = class GridSelect
  
  DOUBLE_CLICK_INTERVAL: 600  # in ms - max time between clicks to consider double click 
  
  copyPasteHelper: new CopyPasteFromExcel()
  shouldEdit: false
  # The array of {row, col} which represent 
  # which cells are selected.
  selectedCells: []
  # A flattened list of model keys
  # needed to calculate the selection area
  # because math. 
  modelKeyIndex: []
  startSelPosition: null
  endSelPosition: null
  

  componentDidMount: ->
    @originalMethod?()
    @__bindEvents()
    
    
    # Hijack the canEdit method on the datagrid and insert our
    # own little code. We don't want to allow editing if
    # we are doing something selecty.
    wrap = (fn) =>
      return () =>
        return false unless @shouldEdit
        fn.apply(@refs.reactDataGrid, arguments)
        
    @refs.reactDataGrid?.canEdit = wrap(@refs.reactDataGrid?.canEdit)      
    


  componentWillUnmount: ->
    @originalMethod?()
    @__unbindEvents()
    
    
  onCollectionReset: =>
    @resetSelectedCells()
    @originalMethod?()
          
          
  getContainerStyle: ->
    style = @originalMethod?() ? @props.style
    style.userSelect = 'none'
    return style

          
  _getCellsBetween: (startRow, startCol, endRow, endCol) ->
    result = []
    deltaX = endRow - startRow
    deltaY = endCol - startCol
    modifierX = if deltaX < 0 then -1 else 1
    modifierY = if deltaY < 0 then -1 else 1
    for rows in [0 ..  Math.abs(deltaX)]
      for cols in [0 ..  Math.abs(deltaY)]
        result.push
          rowIdx: startRow + (rows * modifierX)
          col: @modelKeyIndex[startCol + (cols * modifierY)]
          idx: startCol + (cols * modifierY)
    return result
    
  
  # should return the {rowIdx: 0, col: columnKey, idx: 0} of highlighted or focused cell
  # idx = column index
  getSelectedCell: () ->
    unless @originalMethod?
      throw "The grid component that has GridSelect mixin must implement getSelectedCell()"
      
    @originalMethod.apply @, arguments
    
    
  setSelectedCell: (rowIndex, colIndex) ->
    unless @originalMethod?
      throw "The grid component that has GridSelect mixin must implement setSelectedCell()"
      
    @originalMethod.apply @, arguments
    
  
  unsetSelectedCell: () ->
    unless @originalMethod?
      throw "The grid component that has GridSelect mixin must implement unsetSelectedCell()"
      
    @originalMethod.apply @, arguments
    
    
  getSelectedColumn: () ->
    colIndex = @getSelectedCell()?.idx
    return null unless colIndex? 
    return @getColumn(colIndex)
    
    
  # Reset everything
  resetSelectedCells: ->
    collection = @getCollection()
    collection?.selectNone?()   # SelectableCollection
    
    selectedCells = @selectedCells
    @selectedCells = []
    for cell in selectedCells 
      @getModelAt(cell.rowIdx)?.trigger?('invalidate')
      
      
    # defer until datagrid handles change 
    _.defer =>
      highlightedCell = @getSelectedCell()
      if highlightedCell?
        collection?.selectModelByIndex?(highlightedCell.rowIdx)
    

  selectCells: (cells, options={}) ->
    @resetSelectedCells()
    
    for cell in cells
      @selectCell(cell.rowIdx, cell.col, options)
    
    @props.onSelectedCellsChange?(@selectedCells)
    
    
  selectCell: (rowIdx, colKey, options={}) ->
    return if rowIdx < 0 || @modelKeyIndex.indexOf(colKey) < 0
    rowModel = @getModelAt(rowIdx)
    cell = {rowIdx: rowIdx, col: colKey, idx: @modelKeyIndex.indexOf(colKey)}
    @selectedCells.push(cell) unless @isCellSelected(rowIdx, colKey)
    
    # this sets the model as selected in the collection, so other possessors of
    # the collection can ask the collection.getSelectedModels().  
    # This magic provided to you by SelectableCollection
    @getCollection?()?.selectModel?(rowModel, true, options)
    
    # this forces the row to rerender all cells so that highlights show up
    unless options.silent
      _.defer => rowModel.trigger('invalidate') 
    
  
  selectCurrentCell: () ->
    highlightedCell = @getSelectedCell()
    col = @getSelectedColumn()?.key
    return unless highlightedCell? and col?
    
    @selectCell(highlightedCell.rowIdx, col)
    
    
  isCellSelected: (row, colKey) =>
    return _.any(@selectedCells, (cell) -> cell.rowIdx == row && cell.col == colKey)
        
    
  deselectCell: (rowIdx, colKey) ->
    rowModel = @getModelAt(rowIdx)
    @selectedCells = _.filter @selectedCells, (cell) -> !(cell.rowIdx == rowIdx && cell.col == colKey)
    @getCollection?()?.selectModel?(rowModel, false)
    
  ###
    returns an array of selectedCells.  May be array of one - the highlighted cell 
  ###
  getSelectedCells: ->
    unless @selectedCells?.length > 0
      highlightedCell = @getSelectedCell()  # provided by widgets.react.Datagrid
      return [] unless highlightedCell?
      
      highlightedCell.col = @getSelectedColumn()?.key
      return [highlightedCell]
    
    return @selectedCells
    
    
  # Used to check which set of columns we have right now
  # and make an index for mathematic purposes.
  _updateModelKeyIndex: ->
    @modelKeyIndex = _.map @getColumns(), (col) -> col.key
    
    
  # Interrogate the jquery element
  # for the react-data-grid friendly row index
  # and column property.
  _getPositionByElement: (el) ->
    $cell = $(el).closest('.datagrid-cell')
    return null unless $cell.length > 0
    
    columnKey = $cell.attr("data-attr-col")
    rowIdx = parseInt($cell.attr("data-attr-row"))
    idx = @modelKeyIndex.indexOf(columnKey)
    
    return {
      rowIdx: rowIdx
      col: columnKey
      idx: idx
    }      
  
  
  _getUpperLeftBound: (cells=@selectedCells) ->
    return [] unless @selectedCells?
    top = _.min cells, (cell) -> cell.rowIdx
    cells = _.filter cells, (cell) -> cell.rowIdx == top.rowIdx
    left = _.min cells, (cell) -> cell.idx
    return {
      top: top.rowIdx
      left: left.idx
    }
  
  
  _getLowerRightBound: (cells=@selectedCells) ->
    return [] unless @selectedCells?
    bottom = _.max cells, (cell) -> cell.rowIdx
    cells = _.filter cells, (cell) -> cell.rowIdx == bottom.rowIdx
    right = _.max cells, (cell) -> cell.idx
    return {
      bottom: bottom.rowIdx
      right: right.idx
    }
  
  
  __bindEvents: =>
    # TODO look into why mixins have to bind methods like below, you cant pass a 
    #   mixin method directly to event handlers or the mixin wrapper get's no this context
    $(document).on 'copy.GridSelect', (evt) => @__onDocumentCopy(evt)
    $(document).on 'paste.GridSelect', (evt) => @__onDocumentPaste(evt)
    $(document).on 'keydown.GridSelect', (evt) => @__onDocumentKeyDown(evt)
    $(document).on 'mouseup.GridSelect', (evt) => @__onDocumentMouseUp(evt)
    $(document).on 'mousedown.GridSelect', '.datagrid-cell', (evt) => @__onDocumentMouseDown(evt)
    $(document).on 'mousemove.GridSelect', '.datagrid-cell', (evt) => @__onDocumentMouseMove(evt)
    
  
  __unbindEvents: =>
    $(document).off 'copy.GridSelect'
    $(document).off 'paste.GridSelect'
    $(document).off 'keydown.GridSelect'
    $(document).off 'mouseup.GridSelect'
    $(document).off 'mousedown.GridSelect'
    $(document).off 'mousemove.GridSelect'

  
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
    
    rows = _.uniq _.map cells, (cell) -> cell.rowIdx
    for row in rows
      rowModel = @getModelAt(row)
      continue unless rowModel?
      
      cellsInRow = _.filter cells, (cell) -> cell.rowIdx == row
      # Sort it so the paste is in the same order as the grid.
      cellsInRow = _.sortBy cellsInRow, 'idx'
      vals = []
      for cell in _.filter(cellsInRow, (cell) -> cell?)
        vals.push @getExportValue(rowModel, @getColumn(cell.col))
        
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
      if @selectedCells.length > 0
        start = @_getUpperLeftBound()
        for rowIdx in [start.top .. start.top + paste.length - 1]
          cellsInRow = _.filter @selectedCells, (cell) -> cell? && cell.rowIdx == rowIdx
          cellsInRow = _.sortBy cellsInRow, 'idx'
          continue if cellsInRow.length == 0
          pasteRow = paste[rowIdx - start.top]
          pasteRow = [pasteRow] unless Array.isArray(pasteRow)
          rowModel = @getModelAt(rowIdx)
          for cellIdx in [0 .. pasteRow.length - 1]
            continue if cellIdx >= cellsInRow.length
            @__updateRowModelColumn(rowIdx, rowModel, cellsInRow[cellIdx].col, pasteRow[cellIdx])
      else
        # We can create the shape
        highlightedCell = @getSelectedCell()
        if highlightedCell?
          start = {top: highlightedCell.rowIdx, left: highlightedCell.idx}
          for rowIdx in [start.top .. start.top + paste.length - 1]
            pasteRow = paste[rowIdx - start.top]
            pasteRow = [pasteRow] unless _.isArray(pasteRow)
            rowModel = @getModelAt(rowIdx)
            for cellIdx in [0 .. pasteRow.length - 1]
              @__updateRowModelColumn(rowIdx, rowModel, @modelKeyIndex[start.left + cellIdx], pasteRow[cellIdx])
    else
      # Single paste of a value. So fill it.
      for cell in @getSelectedCells()
        rowModel = @getModelAt(cell.rowIdx)
        @__updateRowModelColumn(cell.rowIdx, rowModel, cell.col, paste)            
        
    
    e.stopPropagation()
    e.preventDefault()
    
      
  __onDocumentMouseDown: (evt) =>
    el = $(evt.target)
    
    # don't handle click events inside of editing grid cells otherwise editing stops
    return if el.closest('.datagrid-cell.editing').length > 0 || !@__isInOurDatagrid(el)
    
    # DONT preventDefault - instead use styling {user-select: none} to block text selection.
    #     using prevent default prevents flipgrid from focusing the cell
    # prevents the browser from starting text selection highlighting
    # evt.preventDefault()

    # Check if we are trying to enter the edit-mode
    # NOTE: This should probably not be dependent on an icon class :P
    if el.hasClass("fa-pencil")
      @__startEdit()
      return
    
    @_updateModelKeyIndex()

    # second click on same cell triggers edit (workaround to double click to edit)
    thisClickPosition = @_getPositionByElement(el)
    return unless thisClickPosition?
    
    thisClickTick = Date.now()
    if thisClickTick - @lastClickTick < @DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, @lastClickedPosition) 
      @__startEdit()
      return       
      
    @lastClickedPosition = thisClickPosition
    @lastClickTick = thisClickTick
    
    if thisClickPosition?
      @setSelectedCell(thisClickPosition.rowIdx, thisClickPosition.idx)
    
    # Otherwise, we are not trying to edit. So prevent
    # react-data-grid from doing whatever it was going to do otherwise.
    @shouldEdit = false
    
    @startKeySelPosition = null   # reset starting point for keyboard selections
    
    if evt.shiftKey 
      _.defer => @__shiftKeyClickSelect(thisClickPosition)
    else        
      @startSelPosition = thisClickPosition


  __onDocumentKeyDown: (evt) =>
    return unless  @__isInOurDatagrid(evt.target)
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
          @selectCurrentCell()             # select currentCell (in case it isn't already) before datagrid changes it
          @startKeySelPosition ?= @getSelectedCell()
          _.defer =>                       # after the datagrid changes the currentCell
            return unless @startKeySelPosition?
            endCell = @getSelectedCell()
            cells = @_getCellsBetween(@startKeySelPosition.rowIdx, @startKeySelPosition.idx, endCell.rowIdx, endCell.idx)
            @selectCells(cells)          
        else
          @startKeySelPosition = null
          @resetSelectedCells()
          _.defer => @selectCurrentCell()
          
    
  __onDocumentMouseUp: (evt) =>
    # This is where we want to handle the 
    # finalization of selection and triggering of
    # events.
    el = $(evt.target)
    
    # don't handle click events inside of editing grid cells otherwise editing stops
    # when user clicks on input or on down caret of dropdown
    return if el.closest('.datagrid-cell.editing').length > 0
    
    
    # mouse up outside of the datagrid just stops selecting cells  
    if el.closest('.widgets-react-datagrid').length > 0 && !evt.shiftKey
      if @startSelPosition?
        @endSelPosition =  @_getPositionByElement(el)
        unless @endSelPosition?
          @startSelPosition = null
          return
          
        sameCellAsOrigin = @endSelPosition.rowIdx == @startSelPosition.rowIdx && @endSelPosition.col == @startSelPosition.col
        isSelectColumn = el.closest('.datagrid-cell.selected-column').length > 0
        rowModel = @getModelAt(@endSelPosition.rowIdx)
        # If they pressed command or control click
        # and we are looking at the same cell we started with
        # then toggle the selected cell.
        if evt.metaKey || evt.ctrKey || isSelectColumn
          if sameCellAsOrigin
            if @isCellSelected(@endSelPosition.rowIdx, @endSelPosition.col) || (isSelectColumn && rowModel.selected)
              @deselectCell(@endSelPosition.rowIdx, @endSelPosition.col)
            else
              @selectCell(@endSelPosition.rowIdx, @endSelPosition.col)
        else if sameCellAsOrigin
          @resetSelectedCells()
          _.defer => @selectCurrentCell()
      else 
        @resetSelectedCells()
        _.defer => @selectCurrentCell()

    @startSelPosition = null
    
    
  __onDocumentMouseMove: (evt) =>
    evt.preventDefault()
    evt.stopPropagation()
    # Don't doa nything if they are holding control or command.
    return if evt.metaKey || evt.ctrKey || evt.shiftKey
    el = $(evt.target)
    if @startSelPosition? && el.hasClass("datagrid-cell")
      @shouldEdit = false
      @endSelPosition = @_getPositionByElement(el)
      cells = @_getCellsBetween(@startSelPosition.rowIdx, @startSelPosition.idx, @endSelPosition.rowIdx, @endSelPosition.idx)
      @selectCells(cells)
              
              
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
        rowIdx: rowIndex
        updated: parsedJsonObj ? value
        key: "Paste"
        
      rowModel.trigger 'invalidate'


  __isInOurDatagrid: (element) ->
    return $.contains(ReactDOM.findDOMNode(this), $(element)[0])
  
  
  __shiftKeyClickSelect: (endSelPosition) ->
    upperLeftSel = @_getUpperLeftBound()
    lowerRightSel = @_getLowerRightBound()
    startingFrom = if endSelPosition.rowIdx <= upperLeftSel.top && endSelPosition.idx <= upperLeftSel.left
      {rowIdx: lowerRightSel.bottom, idx: lowerRightSel.right}
    else
      {rowIdx: upperLeftSel.top, idx: upperLeftSel.left}
    
    if startingFrom.rowIdx? && startingFrom.idx? 
      cells = @_getCellsBetween(startingFrom.rowIdx, startingFrom.idx, endSelPosition.rowIdx, endSelPosition.idx)
      @selectCells(cells)
    else
      @selectCurrentCell()
    
    
