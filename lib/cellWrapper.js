(function() {
  var $, Cell, CellWrapper, Classnames, PropTypes, React, ReactDOM, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDOM = require('react-dom');

  PropTypes = require('prop-types');

  Classnames = require('classnames');

  $ = require('jquery');

  _ = require('underscore');

  Cell = require('./cell');

  module.exports = CellWrapper = (function(superClass) {
    extend(CellWrapper, superClass);

    function CellWrapper() {
      this._onArrowDown = bind(this._onArrowDown, this);
      this._onArrowUp = bind(this._onArrowUp, this);
      this._onArrowLeft = bind(this._onArrowLeft, this);
      this._onArrowRight = bind(this._onArrowRight, this);
      this._onCellEdit = bind(this._onCellEdit, this);
      this._onCellKeydown = bind(this._onCellKeydown, this);
      this._onCellBlur = bind(this._onCellBlur, this);
      this._onCellFocus = bind(this._onCellFocus, this);
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
      style: PropTypes.object
    };

    CellWrapper.defaultProps = {
      defaultCellComponent: Cell
    };

    CellWrapper.prototype.componentWillMount = function() {
      return this.setState({
        editing: false,
        selected: false,
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
        selected: this.isSelected(),
        placeholder: this.props.showPlaceholder
      });
      return React.createElement("div", Object.assign({
        "className": classNames,
        "tabIndex": 1.,
        "onKeyDown": this._onCellKeydown,
        "onFocus": this._onCellFocus,
        "onBlur": this._onCellBlur,
        "onDoubleClick": this._onCellEdit,
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
        "ref": 'cellComponent',
        "onEdit": this._onCellEdit
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
      var ref;
      return (ref = this.props.datagrid) != null ? typeof ref.isCellSelected === "function" ? ref.isCellSelected(this.props.rowIndex, this.props.column.key) : void 0 : void 0;
    };

    CellWrapper.prototype._onCellFocus = function(evt) {
      return this.setState({
        selected: true
      });
    };

    CellWrapper.prototype._onCellBlur = function(evt) {
      return _.defer((function(_this) {
        return function() {
          if (!$.contains(ReactDOM.findDOMNode(_this), document.activeElement)) {
            return _this.setState({
              selected: false,
              editing: false
            });
          }
        };
      })(this));
    };

    CellWrapper.prototype._onCellKeydown = function(evt) {
      var newCell;
      switch (evt.key) {
        case 'Enter':
          if (this.state.editing) {
            this._save();
            newCell = evt.shiftKey ? this._focusUp() : this._focusDown();
            return newCell.find('i.fa-pencil').trigger('click');
          } else {
            return this.edit();
          }
          break;
        case 'Tab':
          evt.preventDefault();
          newCell = evt.shiftKey ? this._focusLeft() : this._focusRight();
          if (this.state.editing) {
            this._save();
            return _.defer((function(_this) {
              return function() {
                return newCell.find('.rdd-icon-edit').trigger('click');
              };
            })(this));
          }
          break;
        case 'Escape':
          return this._cancel();
        case 'ArrowRight':
          return this._onArrowRight(evt);
        case 'ArrowLeft':
          return this._onArrowLeft(evt);
        case 'ArrowUp':
          return this._onArrowUp(evt);
        case 'ArrowDown':
          return this._onArrowDown(evt);
      }
    };

    CellWrapper.prototype._onCellEdit = function() {
      return this.edit();
    };

    CellWrapper.prototype._onArrowRight = function(evt) {
      evt.preventDefault();
      return this._focusRight();
    };

    CellWrapper.prototype._onArrowLeft = function(evt) {
      evt.preventDefault();
      return this._focusLeft();
    };

    CellWrapper.prototype._onArrowUp = function(evt) {
      evt.preventDefault();
      return this._focusUp();
    };

    CellWrapper.prototype._onArrowDown = function(evt) {
      evt.preventDefault();
      return this._focusDown();
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

    CellWrapper.prototype._cancel = function() {
      this.setState({
        editing: false
      });
      return _.defer((function(_this) {
        return function() {
          return _this.focus();
        };
      })(this));
    };

    CellWrapper.prototype._focusRight = function() {
      return this._focusOffset(0, 1);
    };

    CellWrapper.prototype._focusLeft = function() {
      return this._focusOffset(0, -1);
    };

    CellWrapper.prototype._focusUp = function() {
      return this._focusOffset(-1, 0);
    };

    CellWrapper.prototype._focusDown = function() {
      return this._focusOffset(1, 0);
    };

    CellWrapper.prototype._focusOffset = function(colOffset, rowOffset) {
      var columnIndex, rowIndex;
      columnIndex = this.props.columnIndex + colOffset;
      rowIndex = this.props.rowIndex + rowOffset;
      return $(React.findDOMNode(this.props.datagrid)).find(".rdd-cell-wrapper[data-row=" + rowIndex + "][data-col=" + columnIndex + "]").focus();
    };

    return CellWrapper;

  })(React.Component);

}).call(this);
