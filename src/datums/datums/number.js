(function() {
  var Datum, Number, ONE_BILLION, ONE_MILLION, ONE_THOUSAND, PropTypes, RECOGNIZED_FORMATS, React, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  React = require('react');

  PropTypes = require('prop-types');

  _ = require('underscore');

  Datum = require('./datum');

  ONE_BILLION = 1000000000;

  ONE_MILLION = 1000000;

  ONE_THOUSAND = 1000;

  RECOGNIZED_FORMATS = ['abbreviate', 'money', 'comma', 'percent'];


  /*
    For real numbers.
  
    Only allows `/^\-?[0-9]*\.?[0-9]*$/` on input
   */

  module.exports = Number = (function(superClass) {
    extend(Number, superClass);

    Number.displayName = "react-datum.Number";

    Number.propTypes = _.extend({}, Datum.propTypes, {
      format: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      decimalPlaces: PropTypes.number,
      zeroFill: PropTypes.bool,
      minValue: PropTypes.number,
      maxValue: PropTypes.number
    });

    Number.defaultProps = _.extend({}, Datum.defaultProps, {
      decimalPlaces: null,
      zeroFill: null,
      format: ['comma']
    });

    Number.prototype.charactersMustMatch = /^\-?[0-9]*\.?[0-9]*$/;

    Number.getComaAddedValue = function(value) {
      var decimal, ref, wholeNumber;
      ref = value.toString().split('.'), wholeNumber = ref[0], decimal = ref[1];
      value = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (decimal != null) {
        value += '.' + decimal;
      }
      return value;
    };


    /*
      fail proof conversion from sting to float that will never return NaN
     */

    Number.safelyFloat = function(value) {
      var error, floatValue;
      if (value == null) {
        return 0;
      }
      try {
        floatValue = parseFloat(value);
      } catch (error) {
        console.error("unparseable float " + value);
        return 0;
      }
      if (_.isNaN(floatValue)) {
        return 0;
      } else {
        return floatValue;
      }
    };

    function Number(props) {
      this.validateMax = bind(this.validateMax, this);
      this.validateMin = bind(this.validateMin, this);
      this.validateNumeric = bind(this.validateNumeric, this);
      this.onChange = bind(this.onChange, this);
      Number.__super__.constructor.apply(this, arguments);
      this.addValidations([this.validateNumeric, this.validateMin, this.validateMax]);
    }

    Number.prototype.isAcceptableInput = function(value) {
      return value.match(this.charactersMustMatch);
    };


    /*
      overrides super - adds formatting
     */

    Number.prototype.renderValueForDisplay = function() {
      var formats, modelValue, value;
      modelValue = this.getModelValue();
      value = parseFloat(modelValue);
      if (_.isNaN(value)) {
        return modelValue;
      }
      formats = this.getFormats();
      if (indexOf.call(formats, 'percent') >= 0) {
        value *= 100;
      }
      value = this.roundToDecimalPlaces(value, {
        formats: formats
      });
      value = this.abbreviate(value, formats);
      value = this.addCommas(value, formats);
      value = this.monetize(value, formats);
      if (indexOf.call(formats, 'percent') >= 0) {
        value += "%";
      }
      return value;
    };

    Number.prototype.renderPlaceHolder = function() {
      if (this.getPropOrMetadata('placeholder') != null) {
        Number.__super__.renderPlaceHolder.apply(this, arguments);
      }
      return React.createElement("span", null, "0");
    };

    Number.prototype.getValueForInput = function() {
      var floatVal, value;
      value = Number.__super__.getValueForInput.apply(this, arguments);
      if ((value != null) && _.isString(value)) {
        value = value.replace(/[\s\$\,]/g, '');
      }
      if (value === '-' || value === '+') {
        return value;
      }
      floatVal = parseFloat(value);
      if (_.isNaN(floatVal)) {
        return '';
      } else {
        return value;
      }
    };

    Number.prototype.getFormats = function() {
      var ref;
      if (_.isArray(this.props.format)) {
        return this.props.format;
      } else {
        return ((ref = this.props.format) != null ? ref.toString().split(' ') : void 0) || [];
      }
    };

    Number.prototype.onChange = function(event) {
      var inputValue;
      inputValue = event.target.value;
      if (this.isAcceptableInput(inputValue)) {
        return Number.__super__.onChange.apply(this, arguments);
      }
    };

    Number.prototype.validateNumeric = function(value) {
      if (_.isNumber(value)) {
        return true;
      }
      if (this.charactersMustMatch.test(value)) {
        return true;
      }
      if (value.length > 25) {
        value = value.slice(0, 25) + '...';
      }
      return "The value must be numeric. \"" + value + "\" is not valid";
    };

    Number.prototype.validateMin = function(value) {
      var minValue;
      minValue = this.getPropOrMetadata('minValue');
      if (!((value != null) && (minValue != null))) {
        return true;
      }
      if (parseFloat(value) >= parseFloat(minValue)) {
        return true;
      }
      return "The value must be greater than or equal to " + minValue;
    };

    Number.prototype.validateMax = function(value) {
      var maxValue;
      maxValue = this.getPropOrMetadata('maxValue');
      if (!((value != null) && (maxValue != null))) {
        return true;
      }
      if (parseFloat(value) <= parseFloat(maxValue)) {
        return true;
      }
      return "The value must be less than or equal to " + maxValue;
    };


    /*
      returns a string with number value input rounded to user requested props.decimalPlaces
        and optionally zeroFilled if @props.zeroFill == true
      note that 'money', when not 'abbreviate'd should zero fill out to two decimal places
      unless props indicate otherwise
     */

    Number.prototype.roundToDecimalPlaces = function(value, options) {
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        formats: this.getFormats(),
        decimalPlaces: this.props.decimalPlaces,
        zeroFill: this.props.zeroFill
      });
      if (indexOf.call(options.formats, 'money') >= 0) {
        if (options.decimalPlaces == null) {
          options.decimalPlaces = 2;
        }
        if (options.zeroFill == null) {
          options.zeroFill = !(indexOf.call(options.formats, 'abbreviate') >= 0);
        }
      }
      if (options.decimalPlaces != null) {
        value = parseFloat(value).toFixed(options.decimalPlaces);
        if (!options.zeroFill) {
          value = parseFloat(value).toString();
        }
      }
      return value;
    };


    /*
      returns a string with number value abbreviated and rounded to user
      requested props.decimalPlaces
     */

    Number.prototype.abbreviate = function(value, formats) {
      var absValue, affix, ref;
      if (formats == null) {
        formats = this.getFormats();
      }
      if (indexOf.call(formats, 'abbreviate') >= 0) {
        value = parseFloat(value);
        absValue = Math.abs(value);
        ref = absValue >= ONE_BILLION ? [value / ONE_BILLION, "B"] : absValue >= ONE_MILLION ? [value / ONE_MILLION, "M"] : absValue >= ONE_THOUSAND ? [value / ONE_THOUSAND, "K"] : [value, ""], value = ref[0], affix = ref[1];
        value = "" + (this.roundToDecimalPlaces(value, {
          formats: formats
        }));
        if ((affix != null ? affix.length : void 0) > 0) {
          value += " " + affix;
        }
      }
      return value;
    };

    Number.prototype.addCommas = function(value, formats) {
      if (formats == null) {
        formats = this.getFormats();
      }
      if (indexOf.call(formats, 'comma') >= 0) {
        value = Number.getComaAddedValue(value);
      }
      return value;
    };


    /*
      If props.formats includes 'money', this method prepends the value
      displayed with '$'
    
      Override this method to do things like create an internationalized
      display of money value for another currency.
     */

    Number.prototype.monetize = function(value, formats) {
      if (formats == null) {
        formats = this.getFormats();
      }
      if (indexOf.call(formats, 'money') >= 0) {
        value = "$" + value;
      }
      return value;
    };

    Number.prototype.getInputValue = function() {
      return parseFloat(this.state.value);
    };

    return Number;

  })(Datum);

}).call(this);
