(function() {
  var Cell, CellWrapper, Classnames, PropTypes, React, ReactDOM, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDOM = require('react-dom');

  PropTypes = require('prop-types');

  Classnames = require('classnames');

  _ = require('underscore');

  Cell = require('../cell');

  module.exports = CellWrapper = (function(superClass) {
    extend(CellWrapper, superClass);

    function CellWrapper() {
      this._onBlur = bind(this._onBlur, this);
      this._onFocus = bind(this._onFocus, this);
      this._onMouseLeave = bind(this._onMouseLeave, this);
      this._onMouseEnter = bind(this._onMouseEnter, this);
      this._onMouseMove = bind(this._onMouseMove, this);
      this._onMouseUp = bind(this._onMouseUp, this);
      this._onMouseDown = bind(this._onMouseDown, this);
      return CellWrapper.__super__.constructor.apply(this, arguments);
    }

    CellWrapper.props = {
      model: PropTypes.any,
      column: PropTypes.object,
      rowIndex: PropTypes.number,
      columnIndex: PropTypes.number,
      datagrid: PropTypes.any,
      defaultCellComponent: PropTypes.any,
      defaultCellStyle: PropTypes.object,
      style: PropTypes.object,
      selected: PropTypes.bool,
      editing: PropTypes.bool,
      onMouseDown: PropTypes["function"],
      onMouseUp: PropTypes["function"],
      onMouseEnter: PropTypes["function"],
      onMouseLeave: PropTypes["function"],
      onKeyDown: PropTypes["function"]
    };

    CellWrapper.defaultProps = {
      defaultCellComponent: Cell
    };

    CellWrapper.prototype.componentWillMount = function() {
      return this.setState({
        renderError: null
      });
    };

    CellWrapper.prototype.componentDidCatch = function(error, info) {
      var base;
      if (typeof (base = this.props).onRenderError === "function") {
        base.onRenderError(error, info);
      }
      console.error("react-datum-datagrid: Cell at " + rowIndex + ", " + columnIndex + " (" + column.key + ") failed to render", error, info);
      return this.setState({
        renderError: {
          error: error,
          info: info
        }
      });
    };

    CellWrapper.prototype.render = function() {
      var classNames, dataProps, title;
      if (this.state.renderError != null) {
        title = "This cell failed to render. Additional Details: " + (JSON.stringify(this.state.renderError));
        return React.createElement("span", {
          "title": title
        }, ":(");
      }
      dataProps = {
        'data-row': this.props.rowIndex,
        'data-col': this.props.columnIndex
      };
      classNames = Classnames('rdd-cell-wrapper', {
        'rdd-cell-selected': this.isSelected(),
        'rdd-cell-placeholder': this.props.showPlaceholder
      });
      return React.createElement("div", Object.assign({
        "className": classNames,
        "onMouseDown": this._onMouseDown,
        "onMouseUp": this._onMouseUp,
        "onMouseMove": this._onMouseMove,
        "onMouseEnter": this._onMouseEnter,
        "onMouseLeave": this._onMouseLeave,
        "onKeyDown": this._onKeydown,
        "onFocus": this._onFocus,
        "onBlur": this._onBlur,
        "onDoubleClick": this._onDoubleClick,
        "style": this.props.style
      }, dataProps), this._renderComponentOrPlaceholder());
    };

    CellWrapper.prototype._renderComponentOrPlaceholder = function() {
      var CellComponent, ref;
      if (this.props.showPlaceholder) {
        return React.createElement("span", null, "...");
      }
      CellComponent = (ref = this.props.column.cellComponent) != null ? ref : this.props.defaultCellComponent;
      return React.createElement(CellComponent, {
        "editing": this.state.editing,
        "rowData": this.props.model,
        "rowIndex": this.props.rowIndex,
        "column": this.props.column,
        "datagrid": this.props.datagrid,
        "defaultCellStyle": this.props.defaultCellStyle,
        "ref": 'cellComponent'
      });
    };

    CellWrapper.prototype.edit = function() {
      var ref;
      if (!((ref = this.props.datagrid) != null ? typeof ref.canEditCell === "function" ? ref.canEditCell(this.props.column, this.props.model) : void 0 : void 0)) {
        return;
      }
      return this.setState({
        editing: true
      });
    };

    CellWrapper.prototype.focus = function() {
      return ReactDOM.findDOMNode(this).focus();
    };

    CellWrapper.prototype.isSelected = function() {
      return this.props.selected;
    };

    CellWrapper.prototype._onMouseDown = function(evt) {
      var base;
      return typeof (base = this.props).onMouseDown === "function" ? base.onMouseDown(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseUp = function(evt) {
      var base;
      return typeof (base = this.props).onMouseUp === "function" ? base.onMouseUp(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseMove = function(evt) {
      var base;
      return typeof (base = this.props).onMouseMove === "function" ? base.onMouseMove(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseEnter = function(evt) {
      var base;
      return typeof (base = this.props).onMouseEnter === "function" ? base.onMouseEnter(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseLeave = function(evt) {
      var base;
      return typeof (base = this.props).onMouseLeave === "function" ? base.onMouseLeave(evt, this) : void 0;
    };

    CellWrapper.prototype._onFocus = function(evt) {
      return this.setState({
        selected: true
      });
    };

    CellWrapper.prototype._onBlur = function(evt) {
      var base;
      return typeof (base = this.props)._onBlur === "function" ? base._onBlur(evt, this) : void 0;
    };


    /*
      rowEvt from react-data-grid looks like this:
      {  
        cellKey: "costing.wholesaleCost.amount"
        key: "Enter"
        rowIndex: 0
        updated: "24"
      }
      datagrid ignores .key
     */

    CellWrapper.prototype._save = function() {
      var rowEvt;
      rowEvt = {
        cellKey: this.props.column.key,
        key: "Other",
        rowIndex: this.props.rowIndex,
        updated: this.refs.cellComponent.getValue()
      };
      this.props.datagrid.saveModel(this.props.model, rowEvt);
      return this.setState({
        editing: false
      });
    };

    return CellWrapper;

  })(React.Component);

}).call(this);
