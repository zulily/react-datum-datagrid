
CopyPasteFromExcel = require './copyPasteFromExcel'


module.exports = class GridCopyPaste 
    
  copyPasteHelper: new CopyPasteFromExcel()
  
    
  GridCopyPaste_onDocumentCopy: (e) =>
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
    
    e.clipboardData.setData('text/plain', result.join("\n"))
    e.stopPropagation()
    e.preventDefault()
          

  GridCopyPaste_onDocumentPaste: (e) =>
    paste = @copyPasteHelper.processPaste(e)
    $activeEl = $(document.activeElement)
    # don't handle copy paste events inside of editing grid cells let the input handle it
    return if $($activeEl).closest('.datagrid-cell.editing').length > 0 || $($activeEl).is('input,textarea')     
    
    # Small fix that doesn't catch rows that are only across.
    if !Array.isArray(paste) && paste.indexOf('\t') >= 0
      paste = [paste.split('\t')]
    
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
  
    

      