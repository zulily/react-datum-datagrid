(function() {
  var $, CompareObjects, CopyPasteFromExcel, GridSelect, ReactDOM, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ReactDOM = require('react-dom');

  $ = require('jquery');

  _ = require('underscore');

  CopyPasteFromExcel = require('./copyPasteFromExcel');

  CompareObjects = require('./compareObjects');


  /*
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
   */

  module.exports = GridSelect = (function() {
    function GridSelect() {
      this.__onDocumentPaste = bind(this.__onDocumentPaste, this);
      this.__onDocumentCopy = bind(this.__onDocumentCopy, this);
      this.__unbindEvents = bind(this.__unbindEvents, this);
      this.__bindEvents = bind(this.__bindEvents, this);
      this.isCellSelected = bind(this.isCellSelected, this);
      this.onCellKeyDown = bind(this.onCellKeyDown, this);
      this.onCellMouseMove = bind(this.onCellMouseMove, this);
      this.onCellMouseUp = bind(this.onCellMouseUp, this);
      this.onCellMouseDown = bind(this.onCellMouseDown, this);
      this.onCollectionReset = bind(this.onCollectionReset, this);
    }

    GridSelect.prototype.DOUBLE_CLICK_INTERVAL = 600;

    GridSelect.prototype.copyPasteHelper = new CopyPasteFromExcel();

    GridSelect.prototype.shouldEdit = false;

    GridSelect.prototype.modelKeyIndex = [];

    GridSelect.prototype.startSelPosition = null;

    GridSelect.prototype.componentWillMount = function() {
      if (typeof this.originalMethod === "function") {
        this.originalMethod();
      }
      return this.setState({
        selectedCells: []
      });
    };

    GridSelect.prototype.componentDidMount = function() {
      if (typeof this.originalMethod === "function") {
        this.originalMethod();
      }
      return this.__bindEvents();
    };

    GridSelect.prototype.componentWillUnmount = function() {
      if (typeof this.originalMethod === "function") {
        this.originalMethod();
      }
      return this.__unbindEvents();
    };

    GridSelect.prototype.onCollectionReset = function() {
      this.resetSelectedCells();
      return typeof this.originalMethod === "function" ? this.originalMethod() : void 0;
    };

    GridSelect.prototype.onCellMouseDown = function(evt, cell) {
      var thisClickPosition, thisClickTick;
      this._updateModelKeyIndex();
      thisClickPosition = this._getCellPosition(cell);
      if (thisClickPosition == null) {
        return;
      }
      thisClickTick = Date.now();
      if (thisClickTick - this.lastClickTick < this.DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, this.lastClickedPosition)) {
        this.__startEdit();
        return;
      }
      this.lastClickedPosition = thisClickPosition;
      this.lastClickTick = thisClickTick;
      if (evt.shiftKey) {
        if (this.startSelPosition != null) {
          return this.selectCellsBetween(this.startSelPosition, thisClickPosition);
        } else {
          this.selectCell(cell);
          return this.startSelPosition;
        }
      } else {
        return this.startSelPosition = thisClickPosition;
      }
    };

    GridSelect.prototype.onCellMouseUp = function(evt, cell) {
      var endSelPosition, rowModel, sameCellAsOrigin;
      if (this.startSelPosition != null) {
        endSelPosition = this._getCellPosition(cell);
        if (endSelPosition == null) {
          this.startSelPosition = null;
          return;
        }
        sameCellAsOrigin = endSelPosition.rowIndex === this.startSelPosition.rowIndex && endSelPosition.colKey === this.startSelPosition.colKey;
        rowModel = cell.props.model;
        if (evt.metaKey || evt.ctrKey) {
          if (sameCellAsOrigin) {
            if (this.isCellSelected(endSelPosition.rowIndex, endSelPosition.colKey)) {
              this.deselectCell(endSelPosition.rowIndex, endSelPosition.colKey);
            } else {
              this.selectCellPosition(endSelPosition);
            }
          }
        } else if (sameCellAsOrigin) {
          this.setSelectedCell(cell);
        }
      } else {
        this.setSelectedCell(cell);
      }
      return this.startSelPosition = null;
    };

    GridSelect.prototype.onCellMouseMove = function(evt, cell) {
      var thisCellPosition;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.metaKey || evt.ctrKey || evt.shiftKey) {
        return;
      }
      thisCellPosition = this._getCellPosition(cell);
      if ((this.startSelPosition != null) && !CompareObjects(this.startSelPosition, thisCellPosition)) {
        return this.selectCellsBetween(this.startSelPosition, thisCellPosition);
      }
    };

    GridSelect.prototype.onCellKeyDown = function(evt, cell) {
      var i, keyCode, results;
      keyCode = evt.keyCode;
      switch (false) {
        case !(((keyCode === 13 || keyCode === 32 || keyCode === 110) || indexOf.call((function() {
            results = [];
            for (i = 48; i <= 90; i++){ results.push(i); }
            return results;
          }).apply(this), keyCode) >= 0) && !(evt.ctrlKey || evt.metaKey)):
          return this.__startEdit();
        case keyCode !== 27:
          return this.resetSelectedCells();
        case keyCode !== 37 && keyCode !== 38 && keyCode !== 39 && keyCode !== 40:
          if (evt.shiftKey) {
            if (this.startSelPosition) {
              return this.selectCellsBetween(this.startSelPosition, this._getCellPosition(cell));
            } else {
              return this.selectCell(cell);
            }
          } else {
            this.startSelPosition = null;
            return this.selectCell(cell);
          }
      }
    };

    GridSelect.prototype._getCellsBetween = function(startRow, startCol, endRow, endCol) {
      var cols, deltaX, deltaY, i, j, modifierX, modifierY, ref, ref1, result, rows;
      result = [];
      deltaX = endRow - startRow;
      deltaY = endCol - startCol;
      modifierX = deltaX < 0 ? -1 : 1;
      modifierY = deltaY < 0 ? -1 : 1;
      for (rows = i = 0, ref = Math.abs(deltaX); 0 <= ref ? i <= ref : i >= ref; rows = 0 <= ref ? ++i : --i) {
        for (cols = j = 0, ref1 = Math.abs(deltaY); 0 <= ref1 ? j <= ref1 : j >= ref1; cols = 0 <= ref1 ? ++j : --j) {
          result.push({
            rowIndex: startRow + (rows * modifierX),
            colKey: this.modelKeyIndex[startCol + (cols * modifierY)],
            idx: startCol + (cols * modifierY)
          });
        }
      }
      return result;
    };

    GridSelect.prototype.getSelectedCell = function() {
      return this.state.selectedCells[0];
    };

    GridSelect.prototype.setSelectedCell = function(cell) {
      this.setState({
        selectedCells: [this._getCellPosition(cell)]
      });
      cell.focus();
      return this.onSelectedCellsChange();
    };

    GridSelect.prototype.isCellSelected = function(rowIndex, colKey) {
      var selectedCell;
      selectedCell = this.getSelectedCell();
      return selectedCell.rowIndex === rowIndex && selectedCell.colKey === colKey;
    };

    GridSelect.prototype.getSelectedColumn = function() {
      var colIndex, ref;
      colIndex = (ref = this.getSelectedCell()) != null ? ref.idx : void 0;
      if (colIndex == null) {
        return null;
      }
      return this.getColumn(colIndex);
    };

    GridSelect.prototype.resetSelectedCells = function() {
      return this.setState({
        selectedCells: []
      }, function() {
        return this.onSelectedCellsChange();
      });
    };

    GridSelect.prototype.selectCells = function(cellPositions) {
      var cellPosition, i, len;
      this.resetSelectedCells();
      for (i = 0, len = cellPositions.length; i < len; i++) {
        cellPosition = cellPositions[i];
        this.selectCellPosition(cellPosition);
      }
      return this.onSelectedCellsChange();
    };

    GridSelect.prototype.selectCellsBetween = function(startSelPosition, endSelPosition) {
      var cells;
      this.startSelPosition = startSelPosition;
      cells = this._getCellsBetween(this.startSelPosition.rowIndex, this.startSelPosition.idx, endSelPosition.rowIndex, endSelPosition.idx);
      return this.selectCells(cells);
    };

    GridSelect.prototype.selectCell = function(cell) {
      return this.selectCellPosition(this._getCellPosition(cell));
    };

    GridSelect.prototype.selectCellPosition = function(cellPosition, options) {
      var cell, selectedCells;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      if (cellPosition.rowIndex < 0 || this.modelKeyIndex.indexOf(cellPosition.colKey) < 0) {
        return;
      }
      cell = {
        rowIndex: cellPosition.rowIndex,
        colKey: cellPosition.colKey,
        idx: this.modelKeyIndex.indexOf(cellPosition.colKey)
      };
      if (!this.isCellSelected(cellPosition.rowIndex, cellPosition.colKey)) {
        selectedCells = this.state.selectedCells.slice(0);
        selectedCells.push(cellPosition);
        return this.setState({
          selectedCells: selectedCells
        }, function() {
          if (!options.silent) {
            return this.onSelectedCellsChange();
          }
        });
      }
    };

    GridSelect.prototype.isCellSelected = function(row, colKey) {
      return _.any(this.state.selectedCells, function(cell) {
        return cell.rowIndex === row && cell.colKey === colKey;
      });
    };

    GridSelect.prototype.deselectCell = function(rowIndex, colKey) {
      var newSelectedCells;
      newSelectedCells = _.filter(this.state.selectedCells, function(cell) {
        return !(cell.rowIndex === rowIndex && cell.colKey === colKey);
      });
      return this.setState({
        selectedCells: newSelectedCells
      }, function() {
        return this.onSelectedCellsChange();
      });
    };


    /*
      returns an array of selectedCells.  May be array of one - the highlighted cell
     */

    GridSelect.prototype.getSelectedCells = function() {
      var ref;
      return (ref = this.state.selectedCells) != null ? ref : [];
    };

    GridSelect.prototype.onSelectedCellsChange = function() {
      var base, ref;
      console.log("onSelectedCellsChange: selectedCells=", JSON.stringify(this.state.selectedCells));
      return typeof (base = this.props).onSelectedCellsChange === "function" ? base.onSelectedCellsChange(((ref = this.state.selectedCells) != null ? ref : []).slice(0)) : void 0;
    };

    GridSelect.prototype._updateModelKeyIndex = function() {
      return this.modelKeyIndex = _.map(this.getColumns(), function(columnDef) {
        return columnDef.key;
      });
    };

    GridSelect.prototype._getCellPosition = function(cell) {
      return {
        rowIndex: cell.props.rowIndex,
        colKey: cell.props.column.key,
        idx: cell.props.columnIndex
      };
    };

    GridSelect.prototype._getUpperLeftBound = function(cells) {
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

    GridSelect.prototype._getLowerRightBound = function(cells) {
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

    GridSelect.prototype.__bindEvents = function() {
      $(document).on('copy.GridSelect', (function(_this) {
        return function(evt) {
          return _this.__onDocumentCopy(evt);
        };
      })(this));
      return $(document).on('paste.GridSelect', (function(_this) {
        return function(evt) {
          return _this.__onDocumentPaste(evt);
        };
      })(this));
    };

    GridSelect.prototype.__unbindEvents = function() {
      $(document).off('copy.GridSelect');
      return $(document).off('paste.GridSelect');
    };

    GridSelect.prototype.__onDocumentCopy = function(e) {
      var cell, cells, cellsInRow, i, j, len, len1, ref, result, row, rowModel, rows, vals;
      if ($(e.target).closest('.datagrid-cell.editing').length > 0) {
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
      e.originalEvent.clipboardData.setData('text/plain', result.join("\n"));
      e.stopPropagation();
      return e.preventDefault();
    };

    GridSelect.prototype.__onDocumentPaste = function(e) {
      var $activeEl, cell, cellIdx, cellsInRow, highlightedCell, i, j, k, l, len, m, paste, pasteRow, ref, ref1, ref2, ref3, ref4, ref5, ref6, rowIndex, rowModel, start;
      paste = this.copyPasteHelper.processPaste(e);
      $activeEl = $(document.activeElement);
      if ($($activeEl).closest('.datagrid-cell.editing').length > 0 || $($activeEl).is('input,textarea')) {
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

    GridSelect.prototype.__startEdit = function() {
      this.startSelPosition = null;
      this.startKeySelPosition = null;
      this.resetSelectedCells();
      return this.shouldEdit = true;
    };

    GridSelect.prototype.__updateRowModelColumn = function(rowIndex, rowModel, columnKey, value) {
      var attribute, column, error, parsedJsonObj;
      if (rowModel == null) {
        return;
      }
      try {
        if (_.isString(value)) {
          parsedJsonObj = JSON.parse(value);
        }
      } catch (error) {

      }
      attribute = columnKey;
      column = this.getColumn(columnKey);
      if (this.canEditCell(column, rowModel)) {
        this.saveModel(rowModel, {
          cellKey: columnKey,
          rowIndex: rowIndex,
          updated: parsedJsonObj != null ? parsedJsonObj : value,
          key: "Paste"
        });
        return rowModel.trigger('invalidate');
      }
    };

    GridSelect.prototype.__isInOurDatagrid = function(element) {
      return $.contains(ReactDOM.findDOMNode(this), $(element)[0]);
    };

    return GridSelect;

  })();

}).call(this);
