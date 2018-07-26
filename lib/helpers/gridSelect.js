(function() {
  var CompareObjects, GridSelect, ReactDOM, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ReactDOM = require('react-dom');

  _ = require('underscore');

  CompareObjects = require('./compareObjects');


  /*
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
   */

  module.exports = GridSelect = (function() {
    function GridSelect() {
      this.isCellSelected = bind(this.isCellSelected, this);
      this.GridSelect_onDocumentKeyDown = bind(this.GridSelect_onDocumentKeyDown, this);
      this.onCellMouseMove = bind(this.onCellMouseMove, this);
      this.onCellMouseUp = bind(this.onCellMouseUp, this);
      this.onCellMouseDown = bind(this.onCellMouseDown, this);
      this.onCollectionReset = bind(this.onCollectionReset, this);
    }

    GridSelect.prototype.DOUBLE_CLICK_INTERVAL = 600;

    GridSelect.prototype.modelKeyIndex = [];

    GridSelect.prototype.startSelPosition = null;

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
      if (this.isCellEditing(thisClickPosition.columnIndex, thisClickPosition.rowIndex)) {
        return;
      }
      if (this.isDatagridEditing()) {
        this.saveEditingCell();
      }
      thisClickTick = Date.now();
      if (thisClickTick - this.lastClickTick < this.DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, this.lastClickedPosition)) {
        this.onCellEdit(evt, cell.props.column, cell.props.model, cell.props.columnIndex, cell.props.rowIndex);
        return;
      }
      this.lastClickedPosition = thisClickPosition;
      this.lastClickTick = thisClickTick;
      if (!evt.shiftKey) {
        return this.startSelPosition = thisClickPosition;
      }
    };

    GridSelect.prototype.onCellMouseUp = function(evt, cell) {
      var endSelPosition, ref, rowModel, sameCellAsOrigin;
      endSelPosition = this._getCellPosition(cell);
      if (this.isCellEditing(endSelPosition.columnIndex, endSelPosition.rowIndex)) {
        return;
      }
      if (evt.shiftKey && ((ref = this.state.selectedCells) != null ? ref.length : void 0) > 0) {
        this.selectCellsBetween(this.getSelectedCell(), endSelPosition);
      } else if (this.startSelPosition != null) {
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

    GridSelect.prototype.onSelectColumn = function(evt, columnIndex) {
      var selectAllCells;
      evt.stopPropagation();
      this.setState({
        selectingColumnIndex: columnIndex
      });
      selectAllCells = (function(_this) {
        return function() {
          var column, i, index, len, model, models, ref, selectedCells, selectingColumnIndex;
          column = _this.getColumn(columnIndex);
          selectedCells = [];
          models = Array.isArray(_this.props.collection) ? _this.props.collection : (ref = _this.props.collection.models) != null ? ref : [];
          for (index = i = 0, len = models.length; i < len; index = ++i) {
            model = models[index];
            selectedCells.push({
              rowIndex: index,
              colKey: column.key,
              columnIndex: columnIndex
            });
          }
          selectingColumnIndex = _this.state.selectingColumnIndex === columnIndex ? null : _this.state.selectingColumnIndex;
          return _this.setState({
            selectedCells: selectedCells,
            selectingColumnIndex: selectingColumnIndex
          });
        };
      })(this);
      if (_.isFunction(this.props.collection.ensureAllRows)) {
        this.setState({
          selectedCells: [],
          selectingAll: true
        });
        return this.props.collection.ensureAllRows({
          success: selectAllCells
        });
      } else {
        return selectAllCells();
      }
    };

    GridSelect.prototype.GridSelect_onDocumentKeyDown = function(evt) {
      var cellPosition, columnIndex, i, keyCode, ref, ref1, ref2, ref3, results, rowIndex;
      if (!this.__isInOurDatagrid(evt.target)) {
        if (this.isDatagridEditing()) {
          this.cancelEditing();
        }
        this.resetSelectedCells();
      }
      keyCode = evt.keyCode;
      if (this.isDatagridEditing()) {
        switch (keyCode) {
          case 13:
          case 9:
            evt.preventDefault();
            cellPosition = this._getRelativeCellPosition(keyCode);
            this.saveEditingCell();
            if (cellPosition != null) {
              this.setSelectedCellAt(cellPosition);
              return this.editCellAt(evt, cellPosition.columnIndex, cellPosition.rowIndex);
            }
            break;
          case 27:
            return this.cancelEditing();
        }
      } else {
        switch (false) {
          case !(((keyCode === 13 || keyCode === 32 || keyCode === 110) || indexOf.call((function() {
              results = [];
              for (i = 48; i <= 90; i++){ results.push(i); }
              return results;
            }).apply(this), keyCode) >= 0) && !(evt.ctrlKey || evt.metaKey)):
            if (((ref = this.state.selectedCells) != null ? ref.length : void 0) > 0) {
              ref1 = this.getSelectedCell(), columnIndex = ref1.columnIndex, rowIndex = ref1.rowIndex;
              return this.editCellAt(evt, columnIndex, rowIndex);
            }
            break;
          case keyCode !== 27:
            return this.resetSelectedCells();
          case keyCode !== 37 && keyCode !== 38 && keyCode !== 39 && keyCode !== 40:
            evt.preventDefault();
            if (evt.shiftKey) {
              if (((ref2 = this.state.selectedCells) != null ? ref2.length : void 0) > 0) {
                return this.selectCellsBetween(this.getSelectedCell(), this._getRelativeCellPosition(keyCode));
              }
            } else if (((ref3 = this.state.selectedCells) != null ? ref3.length : void 0) > 0) {
              this.startSelPosition = null;
              cellPosition = this._getRelativeCellPosition(keyCode);
              if (cellPosition != null) {
                return this.setSelectedCellAt(cellPosition);
              }
            }
        }
      }
    };

    GridSelect.prototype._getRelativeCellPosition = function(keyCode) {
      var adjacentCell, lastSelectedCellPosition, ref;
      lastSelectedCellPosition = (ref = this.getLastSelectedCellPosition()) != null ? ref : this.getEditingCell();
      if (lastSelectedCellPosition == null) {
        return null;
      }
      adjacentCell = (function() {
        switch (keyCode) {
          case 37:
            if (lastSelectedCellPosition.columnIndex > 0) {
              return _.extend({}, lastSelectedCellPosition, {
                columnIndex: lastSelectedCellPosition.columnIndex - 1,
                colKey: this.props.columns[lastSelectedCellPosition.columnIndex - 1].key
              });
            }
            break;
          case 38:
            if (lastSelectedCellPosition.rowIndex > 0) {
              return _.extend({}, lastSelectedCellPosition, {
                rowIndex: lastSelectedCellPosition.rowIndex - 1
              });
            }
            break;
          case 39:
          case 9:
            if (lastSelectedCellPosition.columnIndex < this.props.columns.length - 1) {
              return _.extend({}, lastSelectedCellPosition, {
                columnIndex: lastSelectedCellPosition.columnIndex + 1,
                colKey: this.props.columns[lastSelectedCellPosition.columnIndex + 1].key
              });
            }
            break;
          case 40:
          case 13:
            if (lastSelectedCellPosition.rowIndex < this.getRowCount() - 1) {
              return _.extend({}, lastSelectedCellPosition, {
                rowIndex: lastSelectedCellPosition.rowIndex + 1
              });
            }
        }
      }).call(this);
      return adjacentCell;
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
            columnIndex: startCol + (cols * modifierY)
          });
        }
      }
      return result;
    };

    GridSelect.prototype.getSelectedCell = function() {
      var ref;
      return ((ref = this.state.selectedCells) != null ? ref[0] : void 0) || null;
    };

    GridSelect.prototype.setSelectedCell = function(cell) {
      return this.setSelectedCellAt(this._getCellPosition(cell));
    };

    GridSelect.prototype.setSelectedCellAt = function(cellPosition) {
      this.setState({
        selectedCells: [cellPosition]
      });
      return this.onSelectedCellsChange();
    };

    GridSelect.prototype.isCellSelected = function(rowIndex, colKey) {
      var selectedCell;
      selectedCell = this.getSelectedCell();
      return selectedCell.rowIndex === rowIndex && selectedCell.colKey === colKey;
    };

    GridSelect.prototype.getSelectedColumn = function() {
      var colIndex, ref;
      colIndex = (ref = this.getSelectedCell()) != null ? ref.columnIndex : void 0;
      if (colIndex == null) {
        return null;
      }
      return this.getColumn(colIndex);
    };

    GridSelect.prototype.resetSelectedCells = function(options) {
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      if (options.silent) {
        return this.state.selectedCells = [];
      } else {
        return this.setState({
          selectedCells: []
        }, function() {
          if (!options.silent) {
            return this.onSelectedCellsChange();
          }
        });
      }
    };

    GridSelect.prototype.selectCellPositions = function(cellPositions) {
      var cellPosition, i, len;
      this.resetSelectedCells({
        silent: true
      });
      for (i = 0, len = cellPositions.length; i < len; i++) {
        cellPosition = cellPositions[i];
        this.selectCellPosition(cellPosition, {
          silent: true
        });
      }
      return this.setState({
        selectedCells: this.state.selectedCells
      }, function() {
        return this.onSelectedCellsChange();
      });
    };

    GridSelect.prototype.selectCellsBetween = function(startSelPosition, endSelPosition) {
      var cells;
      this.startSelPosition = startSelPosition;
      cells = this._getCellsBetween(this.startSelPosition.rowIndex, this.startSelPosition.columnIndex, endSelPosition.rowIndex, endSelPosition.columnIndex);
      return this.selectCellPositions(cells);
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
        columnIndex: this.modelKeyIndex.indexOf(cellPosition.colKey)
      };
      if (!this.isCellSelected(cellPosition.rowIndex, cellPosition.colKey)) {
        selectedCells = this.state.selectedCells.slice(0);
        selectedCells.push(cellPosition);
        if (options.silent) {
          return this.state.selectedCells = selectedCells;
        } else {
          return this.setState({
            selectedCells: selectedCells
          }, function() {
            return this.onSelectedCellsChange();
          });
        }
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


    /*
      returns the cell position of the last cell selected by user
     */

    GridSelect.prototype.getLastSelectedCellPosition = function() {
      var ref;
      if (!(((ref = this.state.selectedCells) != null ? ref.length : void 0) > 0)) {
        return null;
      }
      return this.state.selectedCells.slice(-1)[0];
    };

    GridSelect.prototype.onSelectedCellsChange = function() {
      var base, ref;
      console.log("onSelectedCellsChange: selectedCells=", JSON.stringify(this.state.selectedCells));
      return typeof (base = this.props).onSelectedCellsChange === "function" ? base.onSelectedCellsChange(((ref = this.state.selectedCells) != null ? ref : []).slice(0)) : void 0;
    };

    GridSelect.prototype.onCellEdit = function(evt, columnDef, model, columnIndex, rowIndex) {
      this.startSelPosition = null;
      this.resetSelectedCells();
      return typeof this.originalMethod === "function" ? this.originalMethod(evt, columnDef, model, columnIndex, rowIndex) : void 0;
    };

    GridSelect.prototype._updateModelKeyIndex = function() {
      return this.modelKeyIndex = _.map(this.props.columns, function(columnDef) {
        return columnDef.key;
      });
    };

    GridSelect.prototype._getCellPosition = function(cell) {
      return {
        rowIndex: cell.props.rowIndex,
        colKey: cell.props.column.key,
        columnIndex: cell.props.columnIndex
      };
    };

    GridSelect.prototype.__isInOurDatagrid = function(element) {
      return ReactDOM.findDOMNode(this).contains(element);
    };

    return GridSelect;

  })();

}).call(this);
