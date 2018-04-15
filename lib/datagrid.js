(function() {
  var $, CellWrapper, Datagrid, GridEdit, GridSelect, LabelCell, Mixin, PropTypes, React, ReactDOM, ReactDatum, ReactStyles, _,
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

  CellWrapper = require('./cellWrapper');

  LabelCell = require('./labelCell');

  GridEdit = require('./gridEdit');

  GridSelect = require('./gridSelect');


  /*
    This is react-datum-datagrid.   
    
    Example:
    TODO
   */

  module.exports = Datagrid = (function(superClass) {
    extend(Datagrid, superClass);

    function Datagrid() {
      this._onLabelScroll = bind(this._onLabelScroll, this);
      this._onBottomGridScroll = bind(this._onBottomGridScroll, this);
      this._onTopGridScroll = bind(this._onTopGridScroll, this);
      return Datagrid.__super__.constructor.apply(this, arguments);
    }

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.DEFAULT_CELL_HEIGHT = 20;

    Datagrid.DEFAULT_CELL_BORDER_WIDTH = 1;

    Datagrid.DEFAULT_CELL_PADDING_HEIGHT = 5;

    Datagrid.DEFAULT_CELL_PADDING_WIDTH = 10;

    Datagrid.propTypes = {
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      columns: PropTypes.array,
      silentSaveErrors: PropTypes.bool,
      labelWidth: PropTypes.number,
      onHideColumn: PropTypes.func,
      onShowColumn: PropTypes.func
    };

    Datagrid.defaultProps = {
      labelWidth: 300
    };

    Datagrid.childContextTypes = {
      datagrid: PropTypes.instanceOf(Datagrid.constructor)
    };

    Datagrid.prototype.getChildContext = function() {
      return {
        datagrid: this
      };
    };

    Datagrid.prototype.styles = new ReactStyles({
      container: {
        includes: function() {
          return this.props.style;
        }
      },
      headers: {
        includes: function() {
          return {
            width: this.props.labelWidth
          };
        },
        display: 'inline-block',
        backgroundColor: '#eceff6',
        height: '100%',
        verticalAlign: 'top'
      },
      gridsContainer: {
        includes: function() {
          return {
            width: "calc(100% - " + this.props.labelWidth + "px)"
          };
        },
        display: 'inline-block',
        height: '100%'
      },
      topGrid: {
        includes: [
          'bottomDivider', (function() {
            return {
              height: this._getTopGridHeight()
            };
          })
        ],
        width: 'calc(100% - 13px)'
      },
      bottomGrid: {
        includes: function() {
          return {
            height: this._getBottomGridHeight()
          };
        },
        width: '100%'
      },
      fixedHeaderCells: {
        includes: [
          'bottomDivider', (function() {
            return {
              height: this._getTopGridHeight() + 1
            };
          })
        ],
        width: '100%'
      },
      scrollingHeaderCells: {
        includes: function() {
          return {
            height: "calc(100% - " + (this._getTopGridHeight() + 20) + "px)"
          };
        },
        width: '100%',
        marginTop: 1
      },
      scrollingHeaderCellsViewport: {
        height: '100%',
        overflowY: 'scroll'
      },
      styleImage: {
        width: 50,
        minHeight: 60
      },
      bottomDivider: {
        borderBottom: "3px solid #cccccc"
      }
    });

    Datagrid.prototype.componentDidMount = function() {
      this._initializeScrolling();
      return Datagrid.__super__.componentDidMount.apply(this, arguments);
    };

    Datagrid.prototype.style = function(name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    Datagrid.prototype.render = function() {
      var fixedColumns, scrollingColumns;
      fixedColumns = this._getFixedColumns();
      scrollingColumns = this._getScrollingColumns();
      return React.createElement("div", {
        "style": this.style('container'),
        "className": 'react-datum-datagrid'
      }, React.createElement("div", {
        "style": this.style('headers'),
        "className": 'rdd-headers'
      }, React.createElement("div", {
        "style": this.style('fixedHeaderCells'),
        "className": 'rdd-fixed-header-cells'
      }, this._renderHeaderCells(fixedColumns)), React.createElement("div", {
        "style": this.style('scrollingHeaderCells'),
        "className": 'rdd-scrolling-header-cells'
      }, React.createElement("div", {
        "style": this.style('scrollingHeaderCellsViewport')
      }, this._renderHeaderCells(scrollingColumns)))), React.createElement("div", {
        "style": this.style('gridsContainer')
      }, React.createElement("div", {
        "style": this.style('topGrid'),
        "className": 'rdd-top-grid'
      }, React.createElement(ReactGrid, {
        "collection": this.props.collection,
        "ref": 'topGrid',
        "gridSelectionClass": null,
        "gridOptions": {
          preloadCushion: 200,
          pageSize: 20
        }
      }, ((function(_this) {
        return function(model, rowIdx) {
          return _this._renderDataCells(_this._getFixedColumns(), model, rowIdx, 0);
        };
      })(this)))), React.createElement("div", {
        "style": this.style('bottomGrid'),
        "className": 'rdd-bottom-grid'
      }, React.createElement(ReactGrid, {
        "collection": this.props.collection,
        "ref": 'bottomGrid',
        "gridSelectionClass": null,
        "gridOptions": {
          preloadCushion: 200,
          pageSize: 20
        }
      }, ((function(_this) {
        return function(model, rowIdx) {
          return _this._renderDataCells(_this._getScrollingColumns(), model, rowIdx, _this._getFixedColumns().length);
        };
      })(this))))));
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

    Datagrid.prototype.getSelectedCell = function() {
      var $focusedCell, colIdx, columnDef, rowIdx;
      $focusedCell = $(ReactDOM.findDOMNode(this)).find('.rdd-cell-wrapper:focus');
      if (!(($focusedCell != null ? $focusedCell.length : void 0) > 0)) {
        return null;
      }
      rowIdx = ReactDatum.Number.safelyFloat($focusedCell.attr('data-row'));
      colIdx = ReactDatum.Number.safelyFloat($focusedCell.attr('data-col'));
      columnDef = this.getColumn(colIdx);
      return {
        rowIdx: rowIdx,
        idx: colIdx,
        col: columnDef.key
      };
    };

    Datagrid.prototype.setSelectedCell = function(rowIndex, colIndex) {
      var $requestedCell;
      $requestedCell = $(ReactDOM.findDOMNode(this)).find(".rdd-cell-wrapper[data-row=" + rowIndex + "][data-col=" + colIndex + "]");
      if (!(($requestedCell != null ? $requestedCell.length : void 0) > 0)) {
        return;
      }
      return $requestedCell.focus();
    };

    Datagrid.prototype.unsetSelectedCell = function() {
      if (this.getSelectedCell() != null) {
        return document.activeElement.blur();
      }
    };

    Datagrid.prototype.isCellSelected = function(rowIdx, colKey) {
      var selectedCell;
      selectedCell = this.getSelectedCell();
      return selectedCell.rowIdx === rowIdx && selectedCell.col === colKey;
    };

    Datagrid.prototype.refresh = function() {
      var ref, ref1, ref2, ref3;
      if ((ref = this.refs.topGrid) != null) {
        if ((ref1 = ref.grid) != null) {
          ref1.refresh();
        }
      }
      if ((ref2 = this.refs.bottomGrid) != null) {
        if ((ref3 = ref2.grid) != null) {
          ref3.refresh();
        }
      }
      this._onLabelScroll();
      return _.defer((function(_this) {
        return function() {
          return _this._onLabelScroll();
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
          results.push(this._renderLabelCell(index, columnDef));
        }
        return results;
      }).call(this);
      return cells;
    };

    Datagrid.prototype._renderLabelCell = function(index, columnDef) {
      var labelStyle, ref;
      if (columnDef == null) {
        return null;
      }
      labelStyle = $.extend(true, {}, this._getDefaultCellStyle(columnDef), (ref = columnDef.flipgrid) != null ? ref.labelStyle : void 0);
      return React.createElement(LabelCell, {
        "key": index,
        "column": columnDef,
        "datagrid": this,
        "defaultCellStyle": labelStyle,
        "onShowColumn": this.props.onShowColumn,
        "onHideColumn": this.props.onHideColumn
      });
    };

    Datagrid.prototype._renderDataCells = function(columnDefs, model, rowIdx, baseColumnIndex) {
      var cells, columnDef, index;
      return cells = (function() {
        var i, len, results;
        results = [];
        for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
          columnDef = columnDefs[index];
          results.push(this._renderDataCell(index, columnDef, model, rowIdx, baseColumnIndex));
        }
        return results;
      }).call(this);
    };

    Datagrid.prototype._renderDataCell = function(index, columnDef, model, rowIdx, baseColumnIndex) {
      return React.createElement(CellWrapper, {
        "model": model,
        "column": columnDef,
        "rowIdx": rowIdx,
        "colIdx": baseColumnIndex + index,
        "datagrid": this,
        "defaultCellStyle": this._getDefaultCellStyle(columnDef)
      });
    };

    Datagrid.prototype._getFixedColumns = function() {
      return _.filter(this.props.columns, function(columnDef) {
        return columnDef.locked;
      });
    };

    Datagrid.prototype._getScrollingColumns = function() {
      return _.filter(this.props.columns, function(columnDef) {
        return !columnDef.locked;
      });
    };

    Datagrid.prototype._initializeScrolling = function() {
      var bottomGridEl, scrollingLableCellsEl, topGridEl;
      topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid');
      bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
      topGridEl.addEventListener('scroll', this._onTopGridScroll);
      bottomGridEl.addEventListener('scroll', this._onBottomGridScroll);
      scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div');
      return scrollingLableCellsEl.addEventListener('scroll', this._onLabelScroll);
    };

    Datagrid.prototype._onTopGridScroll = function() {
      var bottomGridEl, topGridEl;
      if (!this._isBottomInitiatedScrolling) {
        this._isTopInitiatedScrolling = true;
        topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        bottomGridEl.scrollLeft = topGridEl.scrollLeft;
      }
      return this._isBottomInitiatedScrolling = false;
    };

    Datagrid.prototype._onBottomGridScroll = function() {
      var bottomGridEl, scrollingLableCellsEl, topGridEl;
      if (!(this._isTopInitiatedScrolling || this._isLabelInitiatedScrolling)) {
        this._isBottomInitiatedScrolling = true;
        topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        topGridEl.scrollLeft = bottomGridEl.scrollLeft;
      }
      this._isTopInitiatedScrolling = false;
      if (!this._isLabelInitiatedScrolling) {
        scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        scrollingLableCellsEl.scrollTop = bottomGridEl.scrollTop;
      }
      return this._isLabelInitiatedScrolling = false;
    };

    Datagrid.prototype._onLabelScroll = function() {
      var bottomGridEl, scrollingLableCellsEl;
      if (!this._isBottomInitiatedScrolling) {
        this._isLabelInitiatedScrolling = true;
        scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        bottomGridEl.scrollTop = scrollingLableCellsEl.scrollTop;
      }
      return this._isBottomInitiatedScrolling = false;
    };

    Datagrid.prototype._getTopGridHeight = function() {
      var col, heightOut, i, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
      heightOut = 0;
      ref = this._getFixedColumns();
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        heightOut += (ref1 = this._convertCssPx((ref2 = col.cellStyle) != null ? ref2.borderWidth : void 0)) != null ? ref1 : this.constructor.DEFAULT_CELL_BORDER_WIDTH;
        heightOut += (ref3 = col.height) != null ? ref3 : this.constructor.DEFAULT_CELL_HEIGHT;
        heightOut += (ref4 = this._convertCssPx((ref5 = col.cellStyle) != null ? ref5.paddingTop : void 0)) != null ? ref4 : this.constructor.DEFAULT_CELL_PADDING_HEIGHT;
        heightOut += (ref6 = this._convertCssPx((ref7 = col.cellStyle) != null ? ref7.paddingBottom : void 0)) != null ? ref6 : this.constructor.DEFAULT_CELL_PADDING_HEIGHT;
      }
      return heightOut;
    };

    Datagrid.prototype._getBottomGridHeight = function() {
      return "calc(100% - " + (this._getTopGridHeight() + 5) + "px)";
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

    Datagrid.prototype._getDefaultCellStyle = function(columnDef) {
      var cellStyle;
      cellStyle = {
        height: columnDef.height || this.constructor.DEFAULT_CELL_HEIGHT,
        borderColor: "#EFEFEF",
        borderStyle: 'solid',
        borderWidth: 0,
        borderBottomWidth: this.constructor.DEFAULT_CELL_BORDER_WIDTH,
        paddingTop: this.constructor.DEFAULT_CELL_PADDING_HEIGHT,
        paddingBottom: this.constructor.DEFAULT_CELL_PADDING_HEIGHT,
        paddingLeft: this.constructor.DEFAULT_CELL_PADDING_WIDTH,
        paddingRight: this.constructor.DEFAULT_CELL_PADDING_WIDTH
      };
      return cellStyle;
    };

    Mixin(Datagrid, GridEdit);

    Mixin(Datagrid, GridSelect);

    return Datagrid;

  })(React.Component);

}).call(this);
