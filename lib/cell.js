(function() {
  var Cell, Classnames, PropTypes, React, ReactDatum, _, dasherize,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDatum = require('react-datum');

  PropTypes = require('prop-types');

  Classnames = require('classnames');

  dasherize = require('underscore.string/dasherize');

  _ = require('underscore');

  module.exports = Cell = (function(superClass) {
    extend(Cell, superClass);

    function Cell() {
      this.onEditClick = bind(this.onEditClick, this);
      this._delayedForceUpdate = bind(this._delayedForceUpdate, this);
      this._debouncedForceUpdate = bind(this._debouncedForceUpdate, this);
      this.renderWrapped = bind(this.renderWrapped, this);
      return Cell.__super__.constructor.apply(this, arguments);
    }

    Cell.propTypes = {
      editing: PropTypes.bool,
      rowData: PropTypes.object,
      column: PropTypes.object,
      datagrid: PropTypes.any,
      onEdit: PropTypes.func,
      defaultCellStyle: PropTypes.object
    };

    Cell.prototype.render = function() {
      var datumComponent, datumProps, ref, value;
      value = this.props.value;
      datumProps = _.extend({}, this.props.column.datumProps, {
        model: this.getModel(),
        attr: this.props.column.key,
        column: this.props.column,
        ref: 'datum',
        inputMode: this.props.editing ? 'edit' : 'readonly'
      });
      datumProps = _.defaults(datumProps, {
        rbOverlayProps: {
          trigger: ['hover', 'focus', 'click'],
          placement: 'top'
        }
      });
      datumComponent = (ref = this.props.column.datum) != null ? ref : ReactDatum.Text;
      value = React.createElement(datumComponent, datumProps);
      return this.renderWrapped(value);
    };

    Cell.prototype.renderWrapped = function(value, options) {
      var canEditCell, className, icon, ref, wrapperStyle;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        title: null,
        wrapperStyle: {}
      });
      this.setDatumErrors();
      canEditCell = (ref = this.getDatagrid()) != null ? ref.canEditCell(this.props.column, this.getModel()) : void 0;
      wrapperStyle = $.extend(true, {}, options.wrapperStyle, this.getCellStyle(canEditCell));
      className = this.getCellClass(canEditCell);
      icon = this.getPrimaryIcon(canEditCell);
      return React.createElement("div", {
        "data-attr-row": this.props.rowIndex,
        "data-attr-col": this.props.column.key,
        "className": className,
        "title": options.title,
        "style": wrapperStyle
      }, icon, React.createElement("span", null, value));
    };

    Cell.prototype._debouncedForceUpdate = function() {
      return _.debounce(((function(_this) {
        return function() {
          return _this.forceUpdate();
        };
      })(this)), 50);
    };

    Cell.prototype._delayedForceUpdate = function(delay) {
      if (delay == null) {
        delay = 5000;
      }
      return _.delay(this._debouncedForceUpdate, 5000);
    };

    Cell.prototype.onEditClick = function(evt) {
      return _.defer((function(_this) {
        return function() {
          var ref;
          if (_this.props.onEdit != null) {
            return _this.props.onEdit(_this, evt);
          } else {
            return (ref = _this.getDatagrid()) != null ? typeof ref.editCurrentCell === "function" ? ref.editCurrentCell() : void 0 : void 0;
          }
        };
      })(this));
    };

    Cell.prototype.getModel = function() {
      return this.props.rowData;
    };

    Cell.prototype.getDatagrid = function() {
      return this.props.datagrid;
    };

    Cell.prototype.getCellClass = function(canEditCell) {
      var model, ref;
      model = this.getModel();
      return Classnames('rdd-cell', "rdd-" + (dasherize(this.props.column.key)) + "-column no-help-icon", this.getAdditionalElementClasses(), {
        'rdd-cell-error': ((ref = this.getDatagridSaveErrors()) != null ? ref.length : void 0) > 0
      }, {
        'rdd-cell-saved': this.getDatagridSaveSuccess() === true
      }, {
        'rdd-editable': canEditCell
      }, {
        'rdd-selected': this.isSelected()
      });
    };

    Cell.prototype.getCellStyle = function(canEditCell) {
      var model;
      model = this.getModel();
      return $.extend(true, {}, this.getCellDefaultStyle(model), this.props.column.cellStyle, this.getCellOverrideStyle(model));
    };

    Cell.prototype.getCellDefaultStyle = function(model) {
      var cellStyle, ref;
      cellStyle = _.extend({}, (ref = this.props.defaultCellStyle) != null ? ref : {});
      if (this.props.column.rightAlign) {
        cellStyle.textAlign = 'right';
        cellStyle.paddingRight = 10;
      }
      return cellStyle;
    };

    Cell.prototype.getCellOverrideStyle = function(model) {
      return {};
    };

    Cell.prototype.getPrimaryIcon = function(canEditCell) {
      var icon, model;
      icon = null;
      model = this.getModel();
      if (model == null) {
        return null;
      }
      if (this.getDatagridSaving()) {
        icon = React.createElement("i", {
          "className": "fa fa-spin fa-refresh rdd-icon rdd-icon-refresh",
          "title": "Saving update..."
        });
      } else if (canEditCell && !this.props.column.hideEditableIcon) {
        icon = React.createElement("i", {
          "className": "fa fa-pencil rdd-icon rdd-icon-edit",
          "onClick": this.onEditClick,
          "title": "Click to edit this cell (or dbclick or enter)"
        });
      }
      return icon;
    };

    Cell.prototype.getAdditionalElementClasses = function() {
      return null;
    };

    Cell.prototype.getDatagridSaveErrors = function() {
      var model, ref, ref1, ref2;
      model = this.getModel();
      return (ref = (ref1 = model != null ? typeof model.getDatagridSaveErrors === "function" ? model.getDatagridSaveErrors(this.props.column.key) : void 0 : void 0) != null ? ref1 : model != null ? (ref2 = model.__datagridSaveErrors) != null ? ref2[this.props.column.key] : void 0 : void 0) != null ? ref : [];
    };

    Cell.prototype.getDatagridSaveSuccess = function() {
      var model, ref, ref1, ref2;
      model = this.getModel();
      return (ref = (ref1 = model != null ? typeof model.getDatagridSaveSuccess === "function" ? model.getDatagridSaveSuccess(this.props.column.key) : void 0 : void 0) != null ? ref1 : model != null ? (ref2 = model.__datagridSaveSuccess) != null ? ref2[this.props.column.key] : void 0 : void 0) != null ? ref : false;
    };

    Cell.prototype.setDatagridSaveSuccess = function(trueOrFalse) {
      var model, ref;
      model = this.getModel();
      if (model == null) {
        return;
      }
      if (_.isFunction(model.setDatagridSaveSuccess)) {
        return model.setDatagridSaveSuccess(this.props.column.key, trueOrFalse);
      } else {
        return (ref = model.__datagridSaveSuccess) != null ? ref[this.props.column.key] = trueOrFalse : void 0;
      }
    };

    Cell.prototype.getDatagridSaving = function() {
      var model, ref, ref1, ref2;
      model = this.getModel();
      return (ref = (ref1 = model != null ? typeof model.getDatagridSaving === "function" ? model.getDatagridSaving(this.props.column.key) : void 0 : void 0) != null ? ref1 : model != null ? (ref2 = model.__datagridSaving) != null ? ref2[this.props.column.key] : void 0 : void 0) != null ? ref : false;
    };

    Cell.prototype.isSelected = function() {
      var ref;
      return (ref = this.getDatagrid()) != null ? typeof ref.isCellSelected === "function" ? ref.isCellSelected(this.props.rowIndex, this.props.column.key) : void 0 : void 0;
    };

    Cell.prototype.setDatumErrors = function() {
      var model, saveErrorResp;
      model = this.getModel();
      if (model == null) {
        return;
      }
      saveErrorResp = this.getDatagridSaveErrors();
      if ((saveErrorResp != null ? saveErrorResp.length : void 0) > 0) {
        _.defer((function(_this) {
          return function() {
            var base;
            if (_this.refs.datum != null) {
              if (typeof (base = _this.refs.datum).clearErrors === "function") {
                base.clearErrors();
              }
              return _this.refs.datum.onModelSaveError(_this.getModel(), saveErrorResp);
            }
          };
        })(this));
      }
      if (this.getDatagridSaveSuccess()) {
        _.defer((function(_this) {
          return function() {
            var base;
            if (_this.refs.datum != null) {
              if (typeof (base = _this.refs.datum).clearErrors === "function") {
                base.clearErrors();
              }
            }
            return _this.setDatagridSaveSuccess(false);
          };
        })(this));
        return this._delayedForceUpdate();
      }
    };

    return Cell;

  })(React.Component);

}).call(this);
