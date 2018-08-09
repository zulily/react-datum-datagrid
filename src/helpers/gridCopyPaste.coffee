
CopyPasteFromExcel = require './copyPasteFromExcel'
_ = require 'underscore'


module.exports = class GridCopyPaste

  copyPasteHelper: new CopyPasteFromExcel()


  GridCopyPaste_onDocumentCopy: (e) =>
    # return # No Copy Paste for Edit Pilot
    # don't handle copy paste events inside of editing grid cells let the input handle it
    return if e.target.closest('.rdd-cell-editing')?

    result = []
    cells = @getSelectedCells()

    rows = _.uniq _.map cells, (cell) -> cell.rowIndex
    for row in rows
      rowModel = @getModelAt(row)
      continue unless rowModel?

      cellsInRow = _.filter cells, (cell) -> cell.rowIndex == row
      # Sort it so the paste is in the same order as the grid.
      cellsInRow = _.sortBy cellsInRow, 'columnIndex'
      vals = []
      for cell in _.filter(cellsInRow, (cell) -> cell?)
        vals.push @getExportValue(rowModel, @getColumn(cell.colKey))

      # \t for excel compatibility
      result.push(vals.join("\t"))

    e.clipboardData.setData('text/plain', result.join("\n"))
    e.stopPropagation()
    e.preventDefault()


  GridCopyPaste_onDocumentPaste: (e) =>
    # return # No Copy Paste for Edit Pilot
    paste = @copyPasteHelper.processPaste(e)
    activeEl = document.activeElement
    # don't handle copy paste events inside of editing grid cells let the input handle it
    return if activeEl.closest('.rdd-cell-editing')? || activeEl.matches('input,textarea')

    # Small fix that doesn't catch rows that are only across.
    if !Array.isArray(paste) && paste.indexOf('\t') >= 0
      paste = [paste.split('\t')]

    if Array.isArray(paste)
      # We need to paste as a shape.
      if @state.selectedCells.length > 0
        start = @_getUpperLeftBound()
        for rowIndex in [start.top .. start.top + paste.length - 1]
          pasteRow = paste[rowIndex - start.top]
          pasteRow = [pasteRow] unless Array.isArray(pasteRow)
          rowModel = @getModelAt(rowIndex)
          for offset in [0 .. pasteRow.length - 1]
            columnIndex = start.left + offset
            continue if columnIndex >= @props.columns.length
            @updateCell(columnIndex, rowIndex, pasteRow[offset], silent: true)
    else
      # Single paste of a value. So fill it.
      for cell in @getSelectedCells()
        rowModel = @getModelAt(cell.rowIndex)
        @updateCell(cell.columnIndex, cell.rowIndex, paste, silent: true)

    # we silenced state changes in the updateCell calls above; apply them now
    #  so user sees saving indicators
    @forceUpdate()
    e.stopPropagation()
    e.preventDefault()


  _getUpperLeftBound: (cells=@state.selectedCells) ->
    return [] unless cells?
    top = _.min cells, (cell) -> cell.rowIndex
    cells = _.filter cells, (cell) -> cell.rowIndex == top.rowIndex
    left = _.min cells, (cell) -> cell.columnIndex
    return {
      top: top.rowIndex
      left: left.columnIndex
    }


  _getLowerRightBound: (cells=@state.selectedCells) ->
    return [] unless cells?
    bottom = _.max cells, (cell) -> cell.rowIndex
    cells = _.filter cells, (cell) -> cell.rowIndex == bottom.rowIndex
    right = _.max cells, (cell) -> cell.columnIndex
    return {
      bottom: bottom.rowIndex
      right: right.columnIndex
    }



