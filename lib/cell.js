(function() {
  var Bstr, Cell, Classnames, PropTypes, React, ReactDatum, _, extend,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  ReactDatum = require('react-datum');

  PropTypes = require('prop-types');

  Classnames = require('classnames');

  Bstr = require('bumble-strings');

  _ = require('underscore');

  extend = require('node.extend');


  /*
    Cell is the controlled component rendered by default in each cell.
   */

  module.exports = Cell = (function(superClass) {
    extend1(Cell, superClass);

    function Cell() {
      this.renderWrapped = bind(this.renderWrapped, this);
      return Cell.__super__.constructor.apply(this, arguments);
    }

    Cell.propTypes = {
      selected: PropTypes.bool,
      editing: PropTypes.bool,
      editable: PropTypes.bool,
      rowData: PropTypes.object,
      rowIndex: PropTypes.number,
      column: PropTypes.object,
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      value: PropTypes.any,
      onChange: PropTypes.func,
      onEdit: PropTypes.func,
      defaultCellStyle: PropTypes.object
    };

    Cell.prototype.componentDidUpdate = function(prevProps, prevState) {
      var ref, ref1;
      if (this.props.editing && !prevProps.editing) {
        return (ref = this.refs) != null ? (ref1 = ref.datum) != null ? ref1.focus() : void 0 : void 0;
      }
    };

    Cell.prototype.render = function() {
      var datumComponent, datumProps, ref, value;
      value = this.props.value;
      datumProps = this.getDatumProps(value);
      datumComponent = (ref = this.props.column.datum) != null ? ref : ReactDatum.Text;
      value = React.createElement(datumComponent, datumProps);
      return this.renderWrapped(value);
    };

    Cell.prototype.renderWrapped = function(value, options) {
      var wrapperStyle;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        title: null,
        wrapperStyle: {}
      });
      wrapperStyle = extend(true, {}, options.wrapperStyle, this.getCellStyle());
      return React.createElement("div", {
        "data-attr-row": this.props.rowIndex,
        "data-attr-col": this.props.column.key,
        "className": this.getCellClass(),
        "title": options.title,
        "style": wrapperStyle
      }, value);
    };

    Cell.prototype.getModel = function() {
      return this.props.rowData;
    };


    /*
      You can override or extend this method to change the props passed to 
      the datum at runtime
     */

    Cell.prototype.getDatumProps = function(value) {
      var datumProps;
      datumProps = extend(true, {}, this.props.column.datumProps, {
        model: this.getModel(),
        attr: this.props.column.key,
        column: this.props.column,
        ref: 'datum',
        inputMode: this.props.editing ? 'edit' : 'readonly',
        stateless: true,
        value: value,
        setOnChange: false,
        setOnBlur: false,
        saveOnSet: false,
        onChange: this.props.onChange
      });
      datumProps = _.defaults(datumProps, {
        rbOverlayProps: {
          trigger: ['hover', 'focus', 'click'],
          placement: 'top'
        }
      });
      return datumProps;
    };

    Cell.prototype.getCellClass = function() {
      var model;
      model = this.getModel();
      return Classnames('rdd-cell', "rdd-" + (Bstr.dasherize(this.props.column.key)) + "-column no-help-icon", this.getAdditionalElementClasses());
    };

    Cell.prototype.getCellStyle = function() {
      var model;
      model = this.getModel();
      return extend(true, {}, this.getCellDefaultStyle(model), this.props.column.cellStyle, this.getCellOverrideStyle(model));
    };

    Cell.prototype.getCellDefaultStyle = function(model) {
      var cellStyle, ref;
      cellStyle = _.extend({}, (ref = this.props.defaultCellStyle) != null ? ref : {});
      if (this.props.column.rightAlign) {
        cellStyle.textAlign = 'right';
        cellStyle.paddingRight = 10;
      } else {
        cellStyle.padding = 5;
        cellStyle.margin = 0;
      }
      return cellStyle;
    };

    Cell.prototype.getCellOverrideStyle = function(model) {
      return {};
    };

    Cell.prototype.getAdditionalElementClasses = function() {
      return null;
    };

    Cell.prototype.focusInput = function() {
      var ref;
      if (this.props.editing) {
        return (ref = this.refs.datum) != null ? ref.focus() : void 0;
      }
    };

    return Cell;

  })(React.Component);

}).call(this);
