(function() {
  var $, AutoSizer, CellWrapper, Datagrid, Grid, GridEdit, GridScroll, GridSelect, HeaderCell, Mixin, PropTypes, React, ReactDOM, ReactDatum, ReactStyles, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDOM = require('react-dom');

  ReactDatum = require('react-datum');

  PropTypes = require('prop-types');

  _ = require('underscore');

  $ = require('jquery');

  Mixin = require('./helpers/mixin');

  ReactStyles = require('./helpers/reactStyles');

  CellWrapper = require('./helpers/cellWrapper');

  GridEdit = require('./helpers/gridEdit');

  GridSelect = require('./helpers/gridSelect');

  GridScroll = require('./helpers/gridScroll');

  HeaderCell = require('./headerCell');

  Grid = require('react-virtualized/dist/commonjs/Grid/Grid')['default'];

  AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer/AutoSizer')['default'];


  /*
    This is react-datum-datagrid.   
    
    Example:
    TODO
   */

  module.exports = Datagrid = (function(superClass) {
    extend(Datagrid, superClass);

    function Datagrid() {
      this.getFreeColumnWidth = bind(this.getFreeColumnWidth, this);
      this.getLockedColumnWidth = bind(this.getLockedColumnWidth, this);
      this.freeCellRenderer = bind(this.freeCellRenderer, this);
      this.lockedCellRenderer = bind(this.lockedCellRenderer, this);
      return Datagrid.__super__.constructor.apply(this, arguments);
    }

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.propTypes = {
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      columns: PropTypes.array,
      orientation: PropTypes.oneOf(['landscape', 'portrait']),
      silentSaveErrors: PropTypes.bool,
      headerWidth: PropTypes.number,
      headerHeight: PropTypes.number,
      onHideColumn: PropTypes.func,
      onShowColumn: PropTypes.func,
      onSelectedCellsChange: PropTypes.func,
      defaultColumnDef: PropTypes.object
    };

    Datagrid.defaultProps = {
      headerWidth: 150,
      headerHeight: 60,
      orientation: 'landscape',
      defaultColumnDef: {
        width: 120
      }
    };

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
              display: 'inline-block',
              width: this._sumLockedColumnWidths()
            };
          } else {
            return {
              display: 'block',
              height: this._sumLockedColumnHeights()
            };
          }
        }
      },
      freeGrid: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        includes: function() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'inline-block',
              width: "calc(100% - " + (this._sumLockedColumnWidths()) + "px"
            };
          } else {
            return {
              display: 'block',
              height: "calc(100% - " + (this._sumLockedColumnHeights()) + "px"
            };
          }
        },
        overflow: 'hidden'
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

    Datagrid.prototype.style = function(name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    Datagrid.prototype.render = function() {
      var freeColumns, gridProps, lockedColumns;
      lockedColumns = this._getLockedColumns();
      freeColumns = this._getFreeColumns();
      gridProps = {
        className: "rdd-rv-grid",
        overscanRowCount: 20,
        overscanColCount: 5,
        rowHeight: this.props.rowHeight,
        rowCount: this.getRowCount(),
        datagridState: JSON.stringify(this.state)
      };
      return React.createElement("div", {
        "style": this.style('container'),
        "className": 'react-datum-datagrid'
      }, React.createElement("div", {
        "style": this.style('headers'),
        "className": 'rdd-headers'
      }, React.createElement("div", {
        "style": this.style('fixedHeaderCells'),
        "className": 'rdd-fixed-header-cells'
      }, this._renderHeaderCells(lockedColumns)), React.createElement("div", {
        "style": this.style('scrollingHeaderCells'),
        "className": 'rdd-scrolling-header-cells'
      }, this._renderHeaderCells(freeColumns))), React.createElement("div", {
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
          }, gridProps));
        };
      })(this)))), React.createElement("div", {
        "style": this.style('freeGrid'),
        "className": 'rdd-free-grid'
      }, React.createElement(AutoSizer, null, ((function(_this) {
        return function(arg) {
          var height, width;
          height = arg.height, width = arg.width;
          return React.createElement(Grid, Object.assign({
            "cellRenderer": _this.freeCellRenderer,
            "columnWidth": _this.getFreeColumnWidth,
            "columnCount": freeColumns.length,
            "height": height,
            "width": width
          }, gridProps));
        };
      })(this))))));
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
      var index;
      index = arg.index;
      return this.getColumnWidth(index, this._getLockedColumns());
    };

    Datagrid.prototype.getFreeColumnWidth = function(arg) {
      var index;
      index = arg.index;
      return this.getColumnWidth(index, this._getFreeColumns());
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
      Override me to conditionally enable editing on a per cell basis
     */

    Datagrid.prototype.canEditCell = function(col, rowModel) {
      var ref, ref1;
      if (!(col != null ? col.editable : void 0)) {
        return false;
      }
      if (col != null ? (ref = col.datum) != null ? (ref1 = ref.prototype) != null ? typeof ref1.isLocked === "function" ? ref1.isLocked(col, rowModel) : void 0 : void 0 : void 0 : void 0) {
        return false;
      }
      return true;
    };

    Datagrid.prototype.refresh = function() {
      var ref, ref1, ref2, ref3;
      if ((ref = this.refs.lockedGrid) != null) {
        if ((ref1 = ref.grid) != null) {
          ref1.refresh();
        }
      }
      if ((ref2 = this.refs.freeGrid) != null) {
        if ((ref3 = ref2.grid) != null) {
          ref3.refresh();
        }
      }
      this._onHeaderScroll();
      return _.defer((function(_this) {
        return function() {
          return _this._onHeaderScroll();
        };
      })(this));
    };

    Datagrid.prototype._renderHeaderCells = function(columnDefs) {
      var cells, columnDef, index;
      cells = (function() {
        var i, len, results;
        results = [];
        for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
          columnDef = columnDefs[index];
          results.push(this._renderHeaderCell(index, columnDef));
        }
        return results;
      }).call(this);
      return cells;
    };

    Datagrid.prototype._renderHeaderCell = function(index, columnDef) {
      var labelStyle, ref;
      if (columnDef == null) {
        return null;
      }
      labelStyle = $.extend(true, {}, this._getDefaultCellStyle(columnDef, true), (ref = columnDef.flipgrid) != null ? ref.labelStyle : void 0);
      return React.createElement(HeaderCell, {
        "key": index,
        "column": columnDef,
        "orientation": this.props.orientation,
        "datagrid": this,
        "defaultCellStyle": labelStyle,
        "onShowColumn": this.props.onShowColumn,
        "onHideColumn": this.props.onHideColumn
      });
    };

    Datagrid.prototype._renderDataCell = function(columnDef, model, columnIndex, rowIndex, key, style, showPlaceholder) {
      style = this._getCellWrapperStyle(style);
      return React.createElement(CellWrapper, {
        "key": key,
        "model": model,
        "column": columnDef,
        "rowIndex": rowIndex,
        "columnIndex": columnIndex,
        "style": style,
        "showPlaceholder": showPlaceholder,
        "datagrid": this,
        "defaultCellStyle": this._getDefaultCellStyle(columnDef),
        "selected": this.isCellSelected(rowIndex, columnDef.key),
        "onMouseDown": ((function(_this) {
          return function(evt, cell) {
            return _this.onCellMouseDown(evt, cell);
          };
        })(this)),
        "onMouseUp": ((function(_this) {
          return function(evt, cell) {
            return _this.onCellMouseUp(evt, cell);
          };
        })(this)),
        "onMouseMove": ((function(_this) {
          return function(evt, cell) {
            return _this.onCellMouseMove(evt, cell);
          };
        })(this))
      });
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
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
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

    Mixin(Datagrid, GridScroll);

    Mixin(Datagrid, GridEdit);

    Mixin(Datagrid, GridSelect);

    return Datagrid;

  })(React.Component);

}).call(this);
