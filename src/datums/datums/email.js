(function() {
  var Datum, Email, PropTypes, React, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  _ = require('underscore');

  Datum = require('./datum');


  /*
    For rendering and input of email addresses.  Can render mailto: links like
    `<a href="mailto:">` in display mode
  
    Validates that email address is a semi valid email based on matching
    `/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/`
   */

  module.exports = Email = (function(superClass) {
    extend(Email, superClass);

    Email.displayName = "react-datum.Email";

    Email.propTypes = _.extend({}, Datum.propTypes, {
      displayAsLink: PropTypes.bool
    });

    function Email(props) {
      this.validateEmail = bind(this.validateEmail, this);
      Email.__super__.constructor.apply(this, arguments);
      this.addValidations(this.validateEmail);
    }

    Email.prototype.renderValueForDisplay = function() {
      var value;
      value = Email.__super__.renderValueForDisplay.apply(this, arguments);
      if (this.props.displayAsLink) {
        return React.createElement("a", {
          "href": this.getMailToHref(value)
        }, value);
      } else {
        return value;
      }
    };

    Email.prototype.getMailToHref = function(value) {
      return "mailto:" + value;
    };

    Email.prototype.validateEmail = function(value) {
      if (value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        return true;
      }
      return "Invalid email address.  Should be like 'bob@zulily.com'";
    };

    return Email;

  })(Datum);

}).call(this);
