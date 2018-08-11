(function() {
  var Cell, CellWrapper, Classnames, EditableIndicator, ErrorIndicator, PropTypes, Rd, React, ReactDOM, SavingIndicator, _, extend,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDOM = require('react-dom');

  PropTypes = require('prop-types');

  Classnames = require('classnames');

  Rd = require('react-datum');

  _ = require('underscore');

  extend = require('node.extend');

  EditableIndicator = require('./helpers/editableIndicator');

  SavingIndicator = require('./helpers/savingIndicator');

  ErrorIndicator = require('./helpers/errorIndicator');

  Cell = require('./cell');

  module.exports = CellWrapper = (function(superClass) {
    extend1(CellWrapper, superClass);

    function CellWrapper() {
      this._onChange = bind(this._onChange, this);
      this._onEditIndicatorClick = bind(this._onEditIndicatorClick, this);
      this._onDoubleClick = bind(this._onDoubleClick, this);
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
      value: PropTypes.any,
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      defaultCellComponent: PropTypes.any,
      defaultCellStyle: PropTypes.object,
      style: PropTypes.object,
      showPlaceholder: PropTypes.bool,
      editable: PropTypes.bool,
      hideEditableIcon: PropTypes.bool,
      stripColor: PropTypes.string,
      selected: PropTypes.bool,
      editing: PropTypes.bool,
      saving: PropTypes.bool,
      wasSaved: PropTypes.bool,
      saveErrors: PropTypes.array,
      onMouseDown: PropTypes["function"],
      onMouseUp: PropTypes["function"],
      onMouseEnter: PropTypes["function"],
      onMouseLeave: PropTypes["function"],
      onKeyDown: PropTypes["function"],
      onChange: PropTypes["function"]
    };

    CellWrapper.defaultProps = {
      defaultCellComponent: Cell,
      hideEditableIcon: false
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
      console.error("react-datum-datagrid: Cell at " + this.props.rowIndex + ", " + this.props.columnIndex + " (" + this.props.column.key + ") failed to render", error, info);
      return this.setState({
        renderError: {
          error: error,
          info: info
        }
      });
    };

    CellWrapper.prototype.render = function() {
      var classNames, dataProps, ref;
      if (this.state.renderError != null) {
        return React.createElement("span", {
          "title": "Cell failed to render: " + (JSON.stringify(this.state.renderError))
        });
      }
      dataProps = {
        'data-row': this.props.rowIndex,
        'data-col': this.props.columnIndex
      };
      classNames = Classnames('rdd-cell-wrapper', {
        'rdd-cell-row-odd': (this.props.rowIndex % 2) !== 0,
        'rdd-cell-selected': this.isSelected(),
        'rdd-cell-placeholder': this.props.showPlaceholder,
        'rdd-editable': this.props.editable,
        'rdd-was-saved': this.props.wasSaved,
        'rdd-save-error': ((ref = this.props.saveErrors) != null ? ref.length : void 0) > 0
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
      }, dataProps), this._renderIndicators(), this._renderComponentOrPlaceholder());
    };

    CellWrapper.prototype._renderComponentOrPlaceholder = function() {
      var CellComponent, ref, ref1;
      if (this.props.showPlaceholder || (this.props.model == null)) {
        return React.createElement("span", null, "...");
      }
      CellComponent = (ref = (ref1 = this.props.column.cellComponent) != null ? ref1 : this.props.column.formatter) != null ? ref : this.props.defaultCellComponent;
      return React.createElement(Rd.Model, {
        "model": this.props.model
      }, React.createElement(CellComponent, {
        "value": this.props.value,
        "selected": this.props.selected,
        "editable": this.props.editable,
        "editing": this.props.editing,
        "rowData": this.props.model,
        "rowIndex": this.props.rowIndex,
        "rowIdx": this.props.rowIndex,
        "column": this.props.column,
        "collection": this.props.collection,
        "defaultCellStyle": this.props.defaultCellStyle,
        "ref": 'cellComponent',
        "onChange": this._onChange
      }));
    };

    CellWrapper.prototype._renderIndicators = function() {
      return React.createElement("div", {
        "className": "rdd-cell-indicators"
      }, this._renderEditableIndicator(), this._renderSavingIndicator(), this._renderErrorIndicator());
    };

    CellWrapper.prototype._renderEditableIndicator = function() {
      var ref;
      if (!(this.props.editable && !this.props.saving && !this.props.editing && !((ref = this.props.column) != null ? ref.hideEditableIcon : void 0))) {
        return null;
      }
      return React.createElement(EditableIndicator, {
        "onClick": this._onEditIndicatorClick
      });
    };

    CellWrapper.prototype._renderSavingIndicator = function() {
      if (!this.props.saving) {
        return null;
      }
      return React.createElement(SavingIndicator, null);
    };

    CellWrapper.prototype._renderErrorIndicator = function() {
      var ref;
      if (!(((ref = this.props.saveErrors) != null ? ref.length : void 0) > 0)) {
        return null;
      }
      return React.createElement(ErrorIndicator, {
        "errors": this.props.saveErrors
      });
    };

    CellWrapper.prototype.focus = function() {
      var ref, ref1;
      return (ref = this.refs) != null ? (ref1 = ref.cellComponent) != null ? ref1.focus() : void 0 : void 0;
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

    CellWrapper.prototype._onDoubleClick = function(evt) {
      return this.props.onDoubleClick(evt, this);
    };

    CellWrapper.prototype._onEditIndicatorClick = function(evt) {
      return this.props.onEditIndicatorClick(evt, this);
    };

    CellWrapper.prototype._onChange = function(value) {
      return this.props.onChange(value, this);
    };

    return CellWrapper;

  })(React.Component);

}).call(this);
