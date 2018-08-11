(function() {
  var Datum, PropTypes, React, Text, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  _ = require('underscore');

  Datum = require('./datum');


  /*
    see ./text.md
   */

  module.exports = Text = (function(superClass) {
    extend(Text, superClass);

    Text.displayName = "react-datum.Text";

    Text.propTypes = _.extend({}, Datum.propTypes, {
      displayAsHtml: PropTypes.bool,
      ellipsizeAt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
      reverseEllipsis: PropTypes.bool,
      uniqueArrayMembers: PropTypes.bool
    });

    Text.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      reverseEllipsis: false
    });

    function Text() {
      Text.__super__.constructor.apply(this, arguments);
    }

    Text.prototype.render = function() {
      return Text.__super__.render.apply(this, arguments);
    };

    Text.prototype.renderValueForDisplay = function() {
      var superValue, value, values;
      superValue = Text.__super__.renderValueForDisplay.apply(this, arguments);
      value = (function() {
        switch (false) {
          case !_.isArray(superValue):
            values = _.compact(_.flatten(superValue));
            if (this.props.uniqueArrayMembers) {
              values = _.unique(values);
            }
            return values.join(', ');
          case !_.isObject(superValue):
            return JSON.stringify(superValue);
          default:
            return superValue.toString();
        }
      }).call(this);
      return this.renderEllipsizedValue(value);
    };


    /*
      Extends Datum#renderWrappedDisplayValue to provide support for displayAsHtml
      option.
     */

    Text.prototype.renderWrappedDisplayValue = function(value) {
      if (this.props.displayAsHtml) {
        return React.createElement("span", {
          "className": "datum-display-value",
          "dangerouslySetInnerHTML": this.getMarkup(value)
        });
      } else {
        return Text.__super__.renderWrappedDisplayValue.apply(this, arguments);
      }
    };

    Text.prototype.getMarkup = function(value) {
      return {
        __html: value
      };
    };

    return Text;

  })(Datum);

}).call(this);
