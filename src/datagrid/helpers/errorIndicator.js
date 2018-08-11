(function() {
  var ErrorIndicator, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  module.exports = ErrorIndicator = (function(superClass) {
    extend(ErrorIndicator, superClass);

    function ErrorIndicator() {
      return ErrorIndicator.__super__.constructor.apply(this, arguments);
    }

    ErrorIndicator.prototype.render = function() {
      var errorText, ref;
      if (!(((ref = this.props.errors) != null ? ref.length : void 0) > 0)) {
        return null;
      }
      errorText = "Failed to save with the following errors: " + this.props.errors.map(function(e) {
        var ref1, ref2;
        return (ref1 = (ref2 = e.responseText) != null ? ref2 : e.msg) != null ? ref1 : JSON.stringify(e);
      });
      return React.createElement("div", {
        "className": 'rdd-error-indicator',
        "title": errorText
      }, React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 576 512"
      }, React.createElement("path", {
        "d": "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
      })));
    };

    return ErrorIndicator;

  })(React.Component);

}).call(this);
