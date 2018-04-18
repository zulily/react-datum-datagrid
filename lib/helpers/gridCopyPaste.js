(function() {
  var CopyPasteFromExcel, GridCopyPaste,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CopyPasteFromExcel = require('./copyPasteFromExcel');

  module.exports = GridCopyPaste = (function() {
    function GridCopyPaste() {
      this.GridCopyPaste_onDocumentPaste = bind(this.GridCopyPaste_onDocumentPaste, this);
      this.GridCopyPaste_onDocumentCopy = bind(this.GridCopyPaste_onDocumentCopy, this);
    }

    GridCopyPaste.prototype.copyPasteHelper = new CopyPasteFromExcel();

    GridCopyPaste.prototype.GridCopyPaste_onDocumentCopy = function(e) {
      var cell, cells, cellsInRow, i, j, len, len1, ref, result, row, rowModel, rows, vals;
      if (e.target.closest('.rdd-cell-editing') != null) {
        return;
      }
      result = [];
      cells = this.getSelectedCells();
      rows = _.uniq(_.map(cells, function(cell) {
        return cell.rowIndex;
      }));
      for (i = 0, len = rows.length; i < len; i++) {
        row = rows[i];
        rowModel = this.getModelAt(row);
        if (rowModel == null) {
          continue;
        }
        cellsInRow = _.filter(cells, function(cell) {
          return cell.rowIndex === row;
        });
        cellsInRow = _.sortBy(cellsInRow, 'idx');
        vals = [];
        ref = _.filter(cellsInRow, function(cell) {
          return cell != null;
        });
        for (j = 0, len1 = ref.length; j < len1; j++) {
          cell = ref[j];
          vals.push(this.getExportValue(rowModel, this.getColumn(cell.colKey)));
        }
        result.push(vals.join("\t"));
      }
      e.clipboardData.setData('text/plain', result.join("\n"));
      e.stopPropagation();
      return e.preventDefault();
    };

    GridCopyPaste.prototype.GridCopyPaste_onDocumentPaste = function(e) {
      var activeEl, cell, cellIdx, cellsInRow, highlightedCell, i, j, k, l, len, m, paste, pasteRow, ref, ref1, ref2, ref3, ref4, ref5, ref6, rowIndex, rowModel, start;
      paste = this.copyPasteHelper.processPaste(e);
      activeEl = document.activeElement;
      if (activeEl.closest('.rdd-cell-editing').length > 0 || activeEl.matches('input,textarea')) {
        return;
      }
      if (!Array.isArray(paste) && paste.indexOf('\t') >= 0) {
        paste = [paste.split('\t')];
      }
      if (Array.isArray(paste)) {
        if (this.state.selectedCells.length > 0) {
          start = this._getUpperLeftBound();
          for (rowIndex = i = ref = start.top, ref1 = start.top + paste.length - 1; ref <= ref1 ? i <= ref1 : i >= ref1; rowIndex = ref <= ref1 ? ++i : --i) {
            cellsInRow = _.filter(this.state.selectedCells, function(cell) {
              return (cell != null) && cell.rowIndex === rowIndex;
            });
            cellsInRow = _.sortBy(cellsInRow, 'idx');
            if (cellsInRow.length === 0) {
              continue;
            }
            pasteRow = paste[rowIndex - start.top];
            if (!Array.isArray(pasteRow)) {
              pasteRow = [pasteRow];
            }
            rowModel = this.getModelAt(rowIndex);
            for (cellIdx = j = 0, ref2 = pasteRow.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; cellIdx = 0 <= ref2 ? ++j : --j) {
              if (cellIdx >= cellsInRow.length) {
                continue;
              }
              this.__updateRowModelColumn(rowIndex, rowModel, cellsInRow[cellIdx].colKey, pasteRow[cellIdx]);
            }
          }
        } else {
          highlightedCell = this.getSelectedCell();
          if (highlightedCell != null) {
            start = {
              top: highlightedCell.rowIndex,
              left: highlightedCell.idx
            };
            for (rowIndex = k = ref3 = start.top, ref4 = start.top + paste.length - 1; ref3 <= ref4 ? k <= ref4 : k >= ref4; rowIndex = ref3 <= ref4 ? ++k : --k) {
              pasteRow = paste[rowIndex - start.top];
              if (!_.isArray(pasteRow)) {
                pasteRow = [pasteRow];
              }
              rowModel = this.getModelAt(rowIndex);
              for (cellIdx = l = 0, ref5 = pasteRow.length - 1; 0 <= ref5 ? l <= ref5 : l >= ref5; cellIdx = 0 <= ref5 ? ++l : --l) {
                this.__updateRowModelColumn(rowIndex, rowModel, this.modelKeyIndex[start.left + cellIdx], pasteRow[cellIdx]);
              }
            }
          }
        }
      } else {
        ref6 = this.getSelectedCells();
        for (m = 0, len = ref6.length; m < len; m++) {
          cell = ref6[m];
          rowModel = this.getModelAt(cell.rowIndex);
          this.__updateRowModelColumn(cell.rowIndex, rowModel, cell.colKey, paste);
        }
      }
      e.stopPropagation();
      return e.preventDefault();
    };

    GridCopyPaste.prototype._getUpperLeftBound = function(cells) {
      var left, top;
      if (cells == null) {
        cells = this.state.selectedCells;
      }
      if (cells == null) {
        return [];
      }
      top = _.min(cells, function(cell) {
        return cell.rowIndex;
      });
      cells = _.filter(cells, function(cell) {
        return cell.rowIndex === top.rowIndex;
      });
      left = _.min(cells, function(cell) {
        return cell.idx;
      });
      return {
        top: top.rowIndex,
        left: left.idx
      };
    };

    GridCopyPaste.prototype._getLowerRightBound = function(cells) {
      var bottom, right;
      if (cells == null) {
        cells = this.state.selectedCells;
      }
      if (cells == null) {
        return [];
      }
      bottom = _.max(cells, function(cell) {
        return cell.rowIndex;
      });
      cells = _.filter(cells, function(cell) {
        return cell.rowIndex === bottom.rowIndex;
      });
      right = _.max(cells, function(cell) {
        return cell.idx;
      });
      return {
        bottom: bottom.rowIndex,
        right: right.idx
      };
    };

    return GridCopyPaste;

  })();

}).call(this);
