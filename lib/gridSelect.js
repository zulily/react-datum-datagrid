(function() {
  var $, CompareObjects, CopyPasteFromExcel, GridSelect, ReactDOM, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ReactDOM = require('react-dom');

  $ = require('jquery');

  _ = require('underscore');

  CopyPasteFromExcel = require('./helpers/copyPasteFromExcel');

  CompareObjects = require('./helpers/compareObjects');


  /*
    These are the selection methods available on react-datum-datagrid
    
    @selectedCells
      An array of objects with the following definition
        {
          col: string      # Defines the model attribute associated with this cell
          rowIndex: number   # Defines the row index of the model this row represents
          idx: number      # Defines the column index. Not probably too useful outside this mixin
        } 
        
    getSelectedCells() method is added to datagrid class being mixed into.  It returns an array 
      of the selected cells.  Array may be just one member -> the currently highlighted cell 
        
    A typical use case would be to check if @selectedCells.length > 0, if so, use that.
    Otherwise, you can use getSelectedCell() to see if the user has just focused on a specific
    cell instead of selecting a range.  
    
    Addtional Props:
      onSelectedCellsChange - called with (@selectedCells)
   */

  module.exports = GridSelect = (function() {
    function GridSelect() {
      this.__onDocumentMouseMove = bind(this.__onDocumentMouseMove, this);
      this.__onDocumentMouseUp = bind(this.__onDocumentMouseUp, this);
      this.__onDocumentKeyDown = bind(this.__onDocumentKeyDown, this);
      this.__onDocumentMouseDown = bind(this.__onDocumentMouseDown, this);
      this.__onDocumentPaste = bind(this.__onDocumentPaste, this);
      this.__onDocumentCopy = bind(this.__onDocumentCopy, this);
      this.__unbindEvents = bind(this.__unbindEvents, this);
      this.__bindEvents = bind(this.__bindEvents, this);
      this.isCellSelected = bind(this.isCellSelected, this);
      this.onCollectionReset = bind(this.onCollectionReset, this);
    }

    GridSelect.prototype.DOUBLE_CLICK_INTERVAL = 600;

    GridSelect.prototype.copyPasteHelper = new CopyPasteFromExcel();

    GridSelect.prototype.shouldEdit = false;

    GridSelect.prototype.selectedCells = [];

    GridSelect.prototype.modelKeyIndex = [];

    GridSelect.prototype.startSelPosition = null;

    GridSelect.prototype.endSelPosition = null;

    GridSelect.prototype.componentDidMount = function() {
      var ref, ref1, wrap;
      if (typeof this.originalMethod === "function") {
        this.originalMethod();
      }
      this.__bindEvents();
      wrap = (function(_this) {
        return function(fn) {
          return function() {
            if (!_this.shouldEdit) {
              return false;
            }
            return fn.apply(_this.refs.reactDataGrid, arguments);
          };
        };
      })(this);
      return (ref = this.refs.reactDataGrid) != null ? ref.canEdit = wrap((ref1 = this.refs.reactDataGrid) != null ? ref1.canEdit : void 0) : void 0;
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

    GridSelect.prototype.getContainerStyle = function() {
      var ref, style;
      style = (ref = typeof this.originalMethod === "function" ? this.originalMethod() : void 0) != null ? ref : this.props.style;
      style.userSelect = 'none';
      return style;
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
            col: this.modelKeyIndex[startCol + (cols * modifierY)],
            idx: startCol + (cols * modifierY)
          });
        }
      }
      return result;
    };

    GridSelect.prototype.getSelectedCell = function() {
      if (this.originalMethod == null) {
        throw "The grid component that has GridSelect mixin must implement getSelectedCell()";
      }
      return this.originalMethod.apply(this, arguments);
    };

    GridSelect.prototype.setSelectedCell = function(rowIndex, colIndex) {
      if (this.originalMethod == null) {
        throw "The grid component that has GridSelect mixin must implement setSelectedCell()";
      }
      return this.originalMethod.apply(this, arguments);
    };

    GridSelect.prototype.unsetSelectedCell = function() {
      if (this.originalMethod == null) {
        throw "The grid component that has GridSelect mixin must implement unsetSelectedCell()";
      }
      return this.originalMethod.apply(this, arguments);
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
      var cell, collection, i, len, ref, selectedCells;
      collection = this.getCollection();
      if (collection != null) {
        if (typeof collection.selectNone === "function") {
          collection.selectNone();
        }
      }
      selectedCells = this.selectedCells;
      this.selectedCells = [];
      for (i = 0, len = selectedCells.length; i < len; i++) {
        cell = selectedCells[i];
        if ((ref = this.getModelAt(cell.rowIndex)) != null) {
          if (typeof ref.trigger === "function") {
            ref.trigger('invalidate');
          }
        }
      }
      return _.defer((function(_this) {
        return function() {
          var highlightedCell;
          highlightedCell = _this.getSelectedCell();
          if (highlightedCell != null) {
            return collection != null ? typeof collection.selectModelByIndex === "function" ? collection.selectModelByIndex(highlightedCell.rowIndex) : void 0 : void 0;
          }
        };
      })(this));
    };

    GridSelect.prototype.selectCells = function(cells, options) {
      var base, cell, i, len;
      if (options == null) {
        options = {};
      }
      this.resetSelectedCells();
      for (i = 0, len = cells.length; i < len; i++) {
        cell = cells[i];
        this.selectCell(cell.rowIndex, cell.col, options);
      }
      return typeof (base = this.props).onSelectedCellsChange === "function" ? base.onSelectedCellsChange(this.selectedCells) : void 0;
    };

    GridSelect.prototype.selectCell = function(rowIndex, colKey, options) {
      var cell, ref, rowModel;
      if (options == null) {
        options = {};
      }
      if (rowIndex < 0 || this.modelKeyIndex.indexOf(colKey) < 0) {
        return;
      }
      rowModel = this.getModelAt(rowIndex);
      cell = {
        rowIndex: rowIndex,
        col: colKey,
        idx: this.modelKeyIndex.indexOf(colKey)
      };
      if (!this.isCellSelected(rowIndex, colKey)) {
        this.selectedCells.push(cell);
      }
      if (typeof this.getCollection === "function") {
        if ((ref = this.getCollection()) != null) {
          if (typeof ref.selectModel === "function") {
            ref.selectModel(rowModel, true, options);
          }
        }
      }
      if (!options.silent) {
        return _.defer((function(_this) {
          return function() {
            return rowModel.trigger('invalidate');
          };
        })(this));
      }
    };

    GridSelect.prototype.selectCurrentCell = function() {
      var col, highlightedCell, ref;
      highlightedCell = this.getSelectedCell();
      col = (ref = this.getSelectedColumn()) != null ? ref.key : void 0;
      if (!((highlightedCell != null) && (col != null))) {
        return;
      }
      return this.selectCell(highlightedCell.rowIndex, col);
    };

    GridSelect.prototype.isCellSelected = function(row, colKey) {
      return _.any(this.selectedCells, function(cell) {
        return cell.rowIndex === row && cell.col === colKey;
      });
    };

    GridSelect.prototype.deselectCell = function(rowIndex, colKey) {
      var ref, rowModel;
      rowModel = this.getModelAt(rowIndex);
      this.selectedCells = _.filter(this.selectedCells, function(cell) {
        return !(cell.rowIndex === rowIndex && cell.col === colKey);
      });
      return typeof this.getCollection === "function" ? (ref = this.getCollection()) != null ? typeof ref.selectModel === "function" ? ref.selectModel(rowModel, false) : void 0 : void 0 : void 0;
    };


    /*
      returns an array of selectedCells.  May be array of one - the highlighted cell
     */

    GridSelect.prototype.getSelectedCells = function() {
      var highlightedCell, ref, ref1;
      if (!(((ref = this.selectedCells) != null ? ref.length : void 0) > 0)) {
        highlightedCell = this.getSelectedCell();
        if (highlightedCell == null) {
          return [];
        }
        highlightedCell.col = (ref1 = this.getSelectedColumn()) != null ? ref1.key : void 0;
        return [highlightedCell];
      }
      return this.selectedCells;
    };

    GridSelect.prototype._updateModelKeyIndex = function() {
      return this.modelKeyIndex = _.map(this.getColumns(), function(col) {
        return col.key;
      });
    };

    GridSelect.prototype._getPositionByElement = function(el) {
      var $cell, columnKey, idx, rowIndex;
      $cell = $(el).closest('.datagrid-cell');
      if (!($cell.length > 0)) {
        return null;
      }
      columnKey = $cell.attr("data-attr-col");
      rowIndex = parseInt($cell.attr("data-attr-row"));
      idx = this.modelKeyIndex.indexOf(columnKey);
      return {
        rowIndex: rowIndex,
        col: columnKey,
        idx: idx
      };
    };

    GridSelect.prototype._getUpperLeftBound = function(cells) {
      var left, top;
      if (cells == null) {
        cells = this.selectedCells;
      }
      if (this.selectedCells == null) {
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
        cells = this.selectedCells;
      }
      if (this.selectedCells == null) {
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
      $(document).on('paste.GridSelect', (function(_this) {
        return function(evt) {
          return _this.__onDocumentPaste(evt);
        };
      })(this));
      $(document).on('keydown.GridSelect', (function(_this) {
        return function(evt) {
          return _this.__onDocumentKeyDown(evt);
        };
      })(this));
      $(document).on('mouseup.GridSelect', (function(_this) {
        return function(evt) {
          return _this.__onDocumentMouseUp(evt);
        };
      })(this));
      $(document).on('mousedown.GridSelect', '.datagrid-cell', (function(_this) {
        return function(evt) {
          return _this.__onDocumentMouseDown(evt);
        };
      })(this));
      return $(document).on('mousemove.GridSelect', '.datagrid-cell', (function(_this) {
        return function(evt) {
          return _this.__onDocumentMouseMove(evt);
        };
      })(this));
    };

    GridSelect.prototype.__unbindEvents = function() {
      $(document).off('copy.GridSelect');
      $(document).off('paste.GridSelect');
      $(document).off('keydown.GridSelect');
      $(document).off('mouseup.GridSelect');
      $(document).off('mousedown.GridSelect');
      return $(document).off('mousemove.GridSelect');
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
          vals.push(this.getExportValue(rowModel, this.getColumn(cell.col)));
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
        if (this.selectedCells.length > 0) {
          start = this._getUpperLeftBound();
          for (rowIndex = i = ref = start.top, ref1 = start.top + paste.length - 1; ref <= ref1 ? i <= ref1 : i >= ref1; rowIndex = ref <= ref1 ? ++i : --i) {
            cellsInRow = _.filter(this.selectedCells, function(cell) {
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
              this.__updateRowModelColumn(rowIndex, rowModel, cellsInRow[cellIdx].col, pasteRow[cellIdx]);
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
          this.__updateRowModelColumn(cell.rowIndex, rowModel, cell.col, paste);
        }
      }
      e.stopPropagation();
      return e.preventDefault();
    };

    GridSelect.prototype.__onDocumentMouseDown = function(evt) {
      var el, thisClickPosition, thisClickTick;
      el = $(evt.target);
      if (el.closest('.datagrid-cell.editing').length > 0 || !this.__isInOurDatagrid(el)) {
        return;
      }
      if (el.hasClass("fa-pencil")) {
        this.__startEdit();
        return;
      }
      this._updateModelKeyIndex();
      thisClickPosition = this._getPositionByElement(el);
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
      if (thisClickPosition != null) {
        this.setSelectedCell(thisClickPosition.rowIndex, thisClickPosition.idx);
      }
      this.shouldEdit = false;
      this.startKeySelPosition = null;
      if (evt.shiftKey) {
        return _.defer((function(_this) {
          return function() {
            return _this.__shiftKeyClickSelect(thisClickPosition);
          };
        })(this));
      } else {
        return this.startSelPosition = thisClickPosition;
      }
    };

    GridSelect.prototype.__onDocumentKeyDown = function(evt) {
      var i, keyCode, results;
      if (!this.__isInOurDatagrid(evt.target)) {
        return;
      }
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
            this.selectCurrentCell();
            if (this.startKeySelPosition == null) {
              this.startKeySelPosition = this.getSelectedCell();
            }
            return _.defer((function(_this) {
              return function() {
                var cells, endCell;
                if (_this.startKeySelPosition == null) {
                  return;
                }
                endCell = _this.getSelectedCell();
                cells = _this._getCellsBetween(_this.startKeySelPosition.rowIndex, _this.startKeySelPosition.idx, endCell.rowIndex, endCell.idx);
                return _this.selectCells(cells);
              };
            })(this));
          } else {
            this.startKeySelPosition = null;
            this.resetSelectedCells();
            return _.defer((function(_this) {
              return function() {
                return _this.selectCurrentCell();
              };
            })(this));
          }
      }
    };

    GridSelect.prototype.__onDocumentMouseUp = function(evt) {
      var el, isSelectColumn, rowModel, sameCellAsOrigin;
      el = $(evt.target);
      if (el.closest('.datagrid-cell.editing').length > 0) {
        return;
      }
      if (el.closest('.widgets-react-datagrid').length > 0 && !evt.shiftKey) {
        if (this.startSelPosition != null) {
          this.endSelPosition = this._getPositionByElement(el);
          if (this.endSelPosition == null) {
            this.startSelPosition = null;
            return;
          }
          sameCellAsOrigin = this.endSelPosition.rowIndex === this.startSelPosition.rowIndex && this.endSelPosition.col === this.startSelPosition.col;
          isSelectColumn = el.closest('.datagrid-cell.selected-column').length > 0;
          rowModel = this.getModelAt(this.endSelPosition.rowIndex);
          if (evt.metaKey || evt.ctrKey || isSelectColumn) {
            if (sameCellAsOrigin) {
              if (this.isCellSelected(this.endSelPosition.rowIndex, this.endSelPosition.col) || (isSelectColumn && rowModel.selected)) {
                this.deselectCell(this.endSelPosition.rowIndex, this.endSelPosition.col);
              } else {
                this.selectCell(this.endSelPosition.rowIndex, this.endSelPosition.col);
              }
            }
          } else if (sameCellAsOrigin) {
            this.resetSelectedCells();
            _.defer((function(_this) {
              return function() {
                return _this.selectCurrentCell();
              };
            })(this));
          }
        } else {
          this.resetSelectedCells();
          _.defer((function(_this) {
            return function() {
              return _this.selectCurrentCell();
            };
          })(this));
        }
      }
      return this.startSelPosition = null;
    };

    GridSelect.prototype.__onDocumentMouseMove = function(evt) {
      var cells, el;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.metaKey || evt.ctrKey || evt.shiftKey) {
        return;
      }
      el = $(evt.target);
      if ((this.startSelPosition != null) && el.hasClass("datagrid-cell")) {
        this.shouldEdit = false;
        this.endSelPosition = this._getPositionByElement(el);
        cells = this._getCellsBetween(this.startSelPosition.rowIndex, this.startSelPosition.idx, this.endSelPosition.rowIndex, this.endSelPosition.idx);
        return this.selectCells(cells);
      }
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

    GridSelect.prototype.__shiftKeyClickSelect = function(endSelPosition) {
      var cells, lowerRightSel, startingFrom, upperLeftSel;
      upperLeftSel = this._getUpperLeftBound();
      lowerRightSel = this._getLowerRightBound();
      startingFrom = endSelPosition.rowIndex <= upperLeftSel.top && endSelPosition.idx <= upperLeftSel.left ? {
        rowIndex: lowerRightSel.bottom,
        idx: lowerRightSel.right
      } : {
        rowIndex: upperLeftSel.top,
        idx: upperLeftSel.left
      };
      if ((startingFrom.rowIndex != null) && (startingFrom.idx != null)) {
        cells = this._getCellsBetween(startingFrom.rowIndex, startingFrom.idx, endSelPosition.rowIndex, endSelPosition.idx);
        return this.selectCells(cells);
      } else {
        return this.selectCurrentCell();
      }
    };

    return GridSelect;

  })();

}).call(this);
