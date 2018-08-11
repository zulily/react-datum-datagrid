(function() {
  var Number, Percent, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  Number = require('./number');


  /*
    This datum is an extension of [ReactDatum.Number](http://zulily.github.io/react-datum/docs/api/#Number) for
    display and input of percent values.
  
    - Display value is affixed with '%'
    - Display and input value are model value * 100 (model value is assumed to be
    fractional value)
    - User input is assumed to be number percentage (* 100)
    - props.decimalPlaces is respected for both display and input
  
  
    Number datum has (maybe use to have) a format called  'percent' that will also
    do a little part of what Percent datum does.  The Percent datum is meant to
    supercede 'percent' format to Number datum.
   */

  module.exports = Percent = (function(superClass) {
    extend(Percent, superClass);

    function Percent() {
      return Percent.__super__.constructor.apply(this, arguments);
    }

    Percent.displayName = "react-datum.Percent";


    /*
      Model value returned is multiplied by 100.  Internal value for Percent
      is always the whole number displayed percentage rounded to requested
      decimal places.
     */

    Percent.prototype.getModelValue = function() {
      var superValue;
      superValue = Percent.__super__.getModelValue.apply(this, arguments);
      if (superValue == null) {
        return superValue;
      }
      return this.roundToDecimalPlaces(Number.safelyFloat(superValue) * 100);
    };


    /*
      What get's saved to the model is the user entered value divided by 100
     */

    Percent.prototype.setModelValue = function(value, options) {
      var floatValue;
      if (value == null) {
        value = this.getInputValue();
      }
      if (options == null) {
        options = {};
      }
      if (value == null) {
        return;
      }
      value || (value = 0);
      floatValue = Number.safelyFloat(value) / 100;
      return Percent.__super__.setModelValue.call(this, floatValue, options);
    };


    /*
      Other formats like 'money' and 'abbreviate' are ignored.  Override react-datum.Money
     */

    Percent.prototype.getFormats = function() {
      return [];
    };


    /*
      Renders value for display as nn.n%.
    
      Base number has (maybe use to have) a format called  'percent' that will also
      do this little part of it.  The Percent datum is meant to supercede 'percent'
      format to Number datum.
     */

    Percent.prototype.renderValueForDisplay = function() {
      var superVal;
      superVal = Percent.__super__.renderValueForDisplay.apply(this, arguments);
      return superVal + '%';
    };

    return Percent;

  })(Number);

}).call(this);
