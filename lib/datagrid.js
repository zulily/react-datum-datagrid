(function() {
  var AutoSizer, Cell, CellWrapper, Datagrid, Grid, GridCopyPaste, GridEdit, GridExport, GridScroll, GridSelect, GridSort, HeaderCell, Mixin, MultiGrid, PropTypes, React, ReactDOM, ReactDatum, ReactStyles, _, extend,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDOM = require('react-dom');

  ReactDatum = require('react-datum');

  PropTypes = require('prop-types');

  _ = require('underscore');

  extend = require('node.extend');

  Mixin = require('./helpers/mixin');

  ReactStyles = require('./helpers/reactStyles');

  CellWrapper = require('./helpers/cellWrapper');

  GridEdit = require('./helpers/gridEdit');

  GridSelect = require('./helpers/gridSelect');

  GridScroll = require('./helpers/gridScroll');

  GridCopyPaste = require('./helpers/gridCopyPaste');

  GridExport = require('./helpers/gridExport');

  GridSort = require('./helpers/gridSort');

  Cell = require('./cell');

  HeaderCell = require('./headerCell');

  Grid = require('react-virtualized/dist/commonjs/Grid/Grid')['default'];

  AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer/AutoSizer')['default'];

  MultiGrid = require('react-virtualized/dist/commonjs/MultiGrid/MultiGrid')['default'];

  require('./helpers/closestPolyfill');

  require('./helpers/matchesPolyfill');


  /*
    This is react-datum-datagrid.
  
    Example:
    TODO
   */

  module.exports = Datagrid = (function(superClass) {
    extend1(Datagrid, superClass);

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.propTypes = {
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      columns: PropTypes.array,
      orientation: PropTypes.oneOf(['landscape', 'portrait']),
      readOnly: PropTypes.bool,
      headerWidth: PropTypes.number,
      headerHeight: PropTypes.number,
      defaultColumnDef: PropTypes.object,
      defaultCellComponent: PropTypes.any,
      defaultHeaderComponent: PropTypes.any,
      disableUndo: PropTypes.bool,
      sortColumnIndex: PropTypes.number,
      sortDirection: PropTypes.oneOf(["ASC", "DESC"]),
      onSelectedCellsChange: PropTypes.func,
      onSort: PropTypes.func
    };

    Datagrid.defaultProps = {
      headerWidth: 150,
      headerHeight: 60,
      orientation: 'landscape',
      defaultHeaderComponent: HeaderCell,
      defaultCellComponent: Cell,
      defaultColumnDef: {
        width: 120
      }
    };

    Datagrid.LOG_UNDO_DEBOUNCE = 1;

    Datagrid.prototype.undo = {};

    Datagrid.prototype.undoIndex = 0;

    Datagrid.prototype.styles = new ReactStyles({
      container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              flexDirection: 'column'
            };
          } else {
            return {
              flexDirection: 'row'
            };
          }
        }
      },
      headers: {
        display: 'flex',
        flexGrow: 0,
        margin: 0,
        overflow: 'hidden',
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'block',
              width: '100%',
              height: this.props.headerHeight
            };
          } else {
            return {
              display: 'inline-block',
              width: this.props.headerWidth,
              height: '100%'
            };
          }
        }
      },
      gridsContainer: {
        position: "relative",
        display: "flex",
        flexGrow: 1,
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              flexDirection: 'row'
            };
          } else {
            return {
              flexDirection: 'column'
            };
          }
        }
      },
      lockedGrid: {
        flexGrow: 0,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              width: this._sumLockedColumnWidths()
            };
          } else {
            return {
              height: this._sumLockedColumnHeights()
            };
          }
        }
      },
      freeGrid: {
        flex: '1, 1, auto',
        margin: 0,
        padding: 0,
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              width: "calc(100% - " + (this._sumLockedColumnWidths()) + "px"
            };
          } else {
            return {
              height: "calc(100% - " + (this._sumLockedColumnHeights()) + "px"
            };
          }
        },
        overflow: 'visible'
      },
      fixedHeaderCells: {
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'inline-block',
              width: this._sumLockedColumnWidths(),
              height: this.props.headerHeight
            };
          } else {
            return {
              display: 'block',
              width: this.props.headerWidth,
              height: this._sumLockedColumnHeights()
            };
          }
        },
        verticalAlign: 'top'
      },
      scrollingHeaderCells: {
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'inline-block',
              width: "calc(100% - " + (this._sumLockedColumnWidths()) + "px)",
              height: this.props.headerHeight,
              overflowY: 'scroll'
            };
          } else {
            return {
              display: 'block',
              width: this.props.headerWidth,
              height: "calc(100% - " + (this._sumLockedColumnHeights()) + "px)",
              overflowX: 'scroll'
            };
          }
        },
        marginTop: 1,
        verticalAlign: 'top',
        whiteSpace: 'nowrap'
      }
    });

    function Datagrid() {
      this._onCollectionUpdate = bind(this._onCollectionUpdate, this);
      this._unbindCollectionEvents = bind(this._unbindCollectionEvents, this);
      this._bindCollectionEvents = bind(this._bindCollectionEvents, this);
      this._onDocumentKeyDown = bind(this._onDocumentKeyDown, this);
      this._onDocumentPaste = bind(this._onDocumentPaste, this);
      this._onDocumentCopy = bind(this._onDocumentCopy, this);
      this._unbindDocumentEvents = bind(this._unbindDocumentEvents, this);
      this._bindDocumentEvents = bind(this._bindDocumentEvents, this);
      this.getFreeColumnWidth = bind(this.getFreeColumnWidth, this);
      this.getLockedColumnWidth = bind(this.getLockedColumnWidth, this);
      this.freeCellRenderer = bind(this.freeCellRenderer, this);
      this.lockedCellRenderer = bind(this.lockedCellRenderer, this);
      this.state = {};
      Datagrid.__super__.constructor.apply(this, arguments);
      this._debouncedForceUpdate = _.debounce(((function(_this) {
        return function() {
          return _this.forceUpdate();
        };
      })(this)), 50);
    }

    Datagrid.prototype.style = function(name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    Datagrid.getDerivedStateFromProps = function(nextProps, prevState) {
      var newState;
      newState = {};
      if (nextProps.sortColumnIndex !== prevState._cachedSortColumnIndex) {
        newState.sortColumnIndex = newState._cachedSortColumnIndex = nextProps.sortColumnIndex;
      }
      if (nextProps.sortDirection !== prevState._cachedSortDirection) {
        newState.sortDirection = newState._cachedSortDirection = nextProps.sortDirection;
      }
      if (_.isEmpty(newState)) {
        return null;
      }
      return newstate;
    };

    Datagrid.prototype.componentDidMount = function() {
      this._bindDocumentEvents();
      return this._bindCollectionEvents();
    };

    Datagrid.prototype.componentDidUpdate = function(prevProps) {
      if (prevProps.collection !== this.props.collection) {
        this._unbindCollectionEvents(prevProps.collection);
        return this._bindCollectionEvents();
      }
    };

    Datagrid.prototype.componentWillUnmount = function() {
      this._unbindDocumentEvents();
      return this._unbindCollectionEvents();
    };

    Datagrid.prototype.render = function() {
      var freeColumns, freeGridProps, lastSelectedCellPosition, lockedColumns, lockedGridProps;
      lockedColumns = this._getLockedColumns();
      freeColumns = this._getFreeColumns();
      lockedGridProps = {
        className: "rdd-rv-grid",
        overscanRowCount: 20,
        overscanColCount: 5,
        rowHeight: this.props.rowHeight,
        rowCount: this.getRowCount(),
        datagridState: JSON.stringify(this.state)
      };
      freeGridProps = _.extend({}, lockedGridProps);
      lastSelectedCellPosition = this.getLastSelectedCellPosition();
      if (lastSelectedCellPosition != null) {
        freeGridProps.scrollToColumn = lastSelectedCellPosition.columnIndex - lockedColumns.length;
        lockedGridProps.scrollToRow = freeGridProps.scrollToRow = lastSelectedCellPosition.rowIndex;
      }
      return React.createElement("div", {
        "style": this.style('container'),
        "className": 'react-datum-datagrid beta'
      }, React.createElement("div", {
        "style": this.style('headers'),
        "className": 'rdd-headers'
      }, React.createElement("div", {
        "style": this.style('fixedHeaderCells'),
        "className": 'rdd-fixed-header-cells'
      }, this._renderHeaderCells(0, lockedColumns)), React.createElement("div", {
        "style": this.style('scrollingHeaderCells'),
        "className": 'rdd-scrolling-header-cells'
      }, this._renderHeaderCells(lockedColumns.length, freeColumns))), React.createElement("div", {
        "style": this.style('gridsContainer'),
        "className": 'rdd-grids-container'
      }, React.createElement("div", {
        "style": this.style('lockedGrid'),
        "className": 'rdd-locked-grid'
      }, React.createElement(AutoSizer, null, ((function(_this) {
        return function(arg) {
          var height, width;
          height = arg.height, width = arg.width;
          return React.createElement(Grid, Object.assign({
            "cellRenderer": _this.lockedCellRenderer,
            "columnWidth": _this.getLockedColumnWidth,
            "columnCount": lockedColumns.length,
            "height": height,
            "width": width
          }, lockedGridProps));
        };
      })(this)))), React.createElement("div", {
        "style": this.style('freeGrid'),
        "className": 'rdd-free-grid'
      }, React.createElement("div", null, React.createElement(AutoSizer, null, ((function(_this) {
        return function(arg) {
          var height, width;
          height = arg.height, width = arg.width;
          return React.createElement(Grid, Object.assign({
            "cellRenderer": _this.freeCellRenderer,
            "columnWidth": _this.getFreeColumnWidth,
            "columnCount": freeColumns.length,
            "height": height,
            "width": width
          }, freeGridProps));
        };
      })(this)))))));
    };

    Datagrid.prototype.lockedCellRenderer = function(arg) {
      var columnIndex, isScrolling, isVisible, key, rowIndex, style;
      rowIndex = arg.rowIndex, columnIndex = arg.columnIndex, key = arg.key, isScrolling = arg.isScrolling, isVisible = arg.isVisible, style = arg.style;
      return this.cellRenderer(this._getLockedColumns(), 0, columnIndex, rowIndex, key, isVisible, isScrolling, style);
    };

    Datagrid.prototype.freeCellRenderer = function(arg) {
      var baseColumnIndex, columnIndex, isScrolling, isVisible, key, rowIndex, style;
      rowIndex = arg.rowIndex, columnIndex = arg.columnIndex, key = arg.key, isScrolling = arg.isScrolling, isVisible = arg.isVisible, style = arg.style;
      baseColumnIndex = this._getLockedColumns().length;
      return this.cellRenderer(this._getFreeColumns(), baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style);
    };

    Datagrid.prototype.cellRenderer = function(columns, baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style) {
      var columnDef, model, showPlaceholder;
      showPlaceholder = false;
      columnDef = columns[columnIndex];
      model = this.getModelAt(rowIndex);
      return this._renderDataCell(columnDef, model, columnIndex + baseColumnIndex, rowIndex, key, style, showPlaceholder);
    };

    Datagrid.prototype.getLockedColumnWidth = function(arg) {
      var index, width;
      index = arg.index;
      width = this.getColumnWidth(index, this._getLockedColumns());
      return width;
    };

    Datagrid.prototype.getFreeColumnWidth = function(arg) {
      var index, width;
      index = arg.index;
      width = this.getColumnWidth(index, this._getFreeColumns());
      return width;
    };

    Datagrid.prototype.getColumnWidth = function(index, columns) {
      var ref;
      if (columns == null) {
        columns = this.props.columns;
      }
      return (ref = columns[index].width) != null ? ref : this.props.defaultColumnDef.width;
    };

    Datagrid.prototype.getRowCount = function() {
      var base, ref, ref1;
      if (this.props.collection == null) {
        return 0;
      }
      return (ref = (ref1 = typeof (base = this.props.collection).getLength === "function" ? base.getLength() : void 0) != null ? ref1 : this.props.collection.length) != null ? ref : 0;
    };


    /*
      Call this method to get a csv text representation of the grid
     */

    Datagrid.prototype.exportToCsv = function() {};

    Datagrid.prototype.getCollection = function() {
      return this.props.collection;
    };

    Datagrid.prototype._renderHeaderCells = function(baseIndex, columnDefs) {
      var cells, columnDef, index;
      cells = (function() {
        var i, len, results;
        results = [];
        for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
          columnDef = columnDefs[index];
          results.push(this._renderHeaderCell(baseIndex + index, columnDef));
        }
        return results;
      }).call(this);
      return cells;
    };

    Datagrid.prototype._renderHeaderCell = function(columnIndex, columnDef) {
      var HeaderCellComponent, isSelectingThisColumn, isSortedByUs, isSortingByUs, ref, ref1, sortDirection;
      if (columnDef == null) {
        return null;
      }
      columnDef = this.getColumnDefaults(columnDef);
      isSortedByUs = (this.state.sortColumnIndex != null) && this.state.sortColumnIndex === columnIndex;
      isSortingByUs = this.state.isSorting && isSortedByUs;
      sortDirection = isSortedByUs ? this.state.sortDirection : null;
      isSelectingThisColumn = this.state.selectingColumnIndex === columnIndex;
      HeaderCellComponent = (ref = (ref1 = columnDef.headerComponent) != null ? ref1 : columnDef.header) != null ? ref : this.props.defaultHeaderComponent;
      return React.createElement(HeaderCellComponent, {
        "key": columnIndex,
        "column": columnDef,
        "columnIndex": columnIndex,
        "collection": this.props.collection,
        "orientation": this.props.orientation,
        "isSorting": isSortingByUs,
        "sorted": sortDirection,
        "isSelecting": isSelectingThisColumn,
        "onSelectColumn": ((function(_this) {
          return function(evt, columnIndex) {
            return _this.onSelectColumn(evt, columnIndex);
          };
        })(this)),
        "onSort": ((function(_this) {
          return function(columnIndex, columnDef, direction) {
            return _this.onSortColumn(columnIndex, columnDef, direction);
          };
        })(this)),
        "width": this.props.headerWidth,
        "height": this.props.headerHeight
      });
    };

    Datagrid.prototype._renderDataCell = function(columnDef, model, columnIndex, rowIndex, key, style, showPlaceholder) {
      var editingOurselves, props, savingOurselves, value;
      style = this._getCellWrapperStyle(style);
      editingOurselves = this.isCellEditing(columnIndex, rowIndex);
      savingOurselves = this.isCellSaving(columnIndex, rowIndex);
      value = editingOurselves ? this.state.editingCell.value : this.getValueAt(columnIndex, rowIndex);
      props = {
        value: value,
        key: key,
        model: model,
        column: columnDef,
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        collection: this.props.collection,
        style: style,
        showPlaceholder: showPlaceholder,
        defaultCellStyle: this._getDefaultCellStyle(columnDef),
        defaultCellComponent: this.props.defaultCellComponent,
        editable: this.canEditCell(columnDef, model),
        selected: this.isCellSelected(rowIndex, columnDef.key),
        editing: editingOurselves,
        saving: savingOurselves,
        wasSaved: this.wasCellSaved(columnIndex, rowIndex),
        saveErrors: this.getSaveErrors(columnIndex, rowIndex),
        onMouseDown: (function(_this) {
          return function(evt, cell) {
            return _this.onCellMouseDown(evt, cell);
          };
        })(this),
        onMouseUp: (function(_this) {
          return function(evt, cell) {
            return _this.onCellMouseUp(evt, cell);
          };
        })(this),
        onMouseMove: (function(_this) {
          return function(evt, cell) {
            return _this.onCellMouseMove(evt, cell);
          };
        })(this),
        onDoubleClick: (function(_this) {
          return function(evt, cell) {
            return _this.onCellEdit(evt, columnDef, model, columnIndex, rowIndex);
          };
        })(this),
        onEditIndicatorClick: (function(_this) {
          return function(evt, cell) {
            return _this.onCellEdit(evt, columnDef, model, columnIndex, rowIndex);
          };
        })(this),
        onChange: (function(_this) {
          return function(value, cell) {
            return _this.onCellChange(value, columnDef, model, columnIndex, rowIndex);
          };
        })(this)
      };
      return React.createElement(CellWrapper, Object.assign({}, props));
    };

    Datagrid.prototype._getLockedColumns = function() {
      return _.filter(this.props.columns, function(columnDef) {
        return columnDef.locked;
      });
    };

    Datagrid.prototype._getFreeColumns = function() {
      return _.filter(this.props.columns, function(columnDef) {
        return !columnDef.locked;
      });
    };

    Datagrid.prototype._sumLockedColumnHeights = function() {
      var col, heightOut, i, len, ref, ref1, ref2, ref3, ref4;
      heightOut = 0;
      ref = this._getLockedColumns();
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        heightOut += this._convertCssPx((ref1 = col.cellStyle) != null ? ref1.borderWidth : void 0);
        heightOut += (ref2 = col.height) != null ? ref2 : this.props.defaultColumnDef.height;
        heightOut += this._convertCssPx((ref3 = col.cellStyle) != null ? ref3.paddingTop : void 0);
        heightOut += this._convertCssPx((ref4 = col.cellStyle) != null ? ref4.paddingBottom : void 0);
      }
      return heightOut;
    };

    Datagrid.prototype._sumLockedColumnWidths = function() {
      var col, i, len, ref, ref1, ref2, ref3, ref4, widthOut;
      widthOut = 0;
      ref = this._getLockedColumns();
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        widthOut += this._convertCssPx((ref1 = col.cellStyle) != null ? ref1.borderWidth : void 0);
        widthOut += (ref2 = col.width) != null ? ref2 : this.props.defaultColumnDef.width;
        widthOut += this._convertCssPx((ref3 = col.cellStyle) != null ? ref3.paddingTop : void 0);
        widthOut += this._convertCssPx((ref4 = col.cellStyle) != null ? ref4.paddingBottom : void 0);
        widthOut;
      }
      return widthOut;
    };

    Datagrid.prototype._getFreeGridHeight = function() {
      return 300;
    };

    Datagrid.prototype._getFreeGridWidth = function() {
      return 300;
    };

    Datagrid.prototype._convertCssPx = function(value) {
      var numerals, ref;
      if (value == null) {
        return null;
      }
      if (_.isString(value)) {
        numerals = (ref = value.match(/[^0-9\.]*([0-9\.]*).*/)) != null ? ref[1] : void 0;
        if (numerals == null) {
          return 0;
        }
        return parseInt(numerals);
      }
      return value;
    };

    Datagrid.prototype._getCellWrapperStyle = function(style) {
      return _.extend(style, {
        margin: 0,
        padding: 0
      });
    };

    Datagrid.prototype._getDefaultCellStyle = function(columnDef, isHeader) {
      var cellStyle, height, ref, ref1, width;
      if (isHeader == null) {
        isHeader = false;
      }
      if (isHeader) {
        if (this.props.orientation === 'landscape') {
          height = this.props.headerHeight;
          width = (ref = columnDef.width) != null ? ref : this.props.defaultColumnDef.width;
        } else {
          height = (ref1 = columnDef.height) != null ? ref1 : this.props.defaultColumnDef.height;
          width = this.props.headerWidth;
        }
      }
      cellStyle = {
        height: height,
        width: width
      };
      return cellStyle;
    };

    Datagrid.prototype._bindDocumentEvents = function() {
      document.addEventListener('copy', this._onDocumentCopy);
      document.addEventListener('paste', this._onDocumentPaste);
      return document.addEventListener('keydown', this._onDocumentKeyDown);
    };

    Datagrid.prototype._unbindDocumentEvents = function() {
      document.removeEventListener('copy', this._onDocumentCopy);
      document.removeEventListener('paste', this._onDocumentPaste);
      return document.removeEventListener('keydown', this._onDocumentKeyDown);
    };

    Datagrid.prototype._onDocumentCopy = function(evt) {
      return this.GridCopyPaste_onDocumentCopy(evt);
    };

    Datagrid.prototype._onDocumentPaste = function(evt) {
      return this.GridCopyPaste_onDocumentPaste(evt);
    };

    Datagrid.prototype._onDocumentKeyDown = function(evt) {
      return this.GridSelect_onDocumentKeyDown(evt);
    };

    Datagrid.prototype._bindCollectionEvents = function(collection) {
      if (collection == null) {
        collection = this.props.collection;
      }
      return collection != null ? typeof collection.on === "function" ? collection.on('reset add remove', this._onCollectionUpdate) : void 0 : void 0;
    };

    Datagrid.prototype._unbindCollectionEvents = function(collection) {
      if (collection == null) {
        collection = this.props.collection;
      }
      return collection != null ? typeof collection.off === "function" ? collection.off('reset add remove', this._onCollectionUpdate) : void 0 : void 0;
    };

    Datagrid.prototype._onCollectionUpdate = function() {
      return this._debouncedForceUpdate();
    };

    Mixin(Datagrid, 'GridScroll', GridScroll);

    Mixin(Datagrid, 'GridEdit', GridEdit);

    Mixin(Datagrid, 'GridSelect', GridSelect);

    Mixin(Datagrid, 'GridCopyPaste', GridCopyPaste);

    Mixin(Datagrid, 'GridExport', GridExport);

    Mixin(Datagrid, 'GridSort', GridSort);

    return Datagrid;

  })(React.Component);

}).call(this);
