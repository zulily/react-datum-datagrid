(function() {
  var Number, React, WholeNumber,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  Number = require('./number');


  /*
    For whole numbers (no decimal input allowed).
   */

  module.exports = WholeNumber = (function(superClass) {
    extend(WholeNumber, superClass);

    function WholeNumber() {
      return WholeNumber.__super__.constructor.apply(this, arguments);
    }

    WholeNumber.displayName = "react-datum.WholeNumber";

    WholeNumber.prototype.charactersMustMatch = /^\-?[0-9]*$/;

    WholeNumber.prototype.getInputValue = function() {
      return parseInt(this.state.value, 10);
    };

    return WholeNumber;

  })(Number);

}).call(this);
