(function() {
  var Datum, Link, PropTypes, React, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  _ = require('underscore');

  Datum = require('./datum');


  /*
    see ./link.md
   */

  module.exports = Link = (function(superClass) {
    extend(Link, superClass);

    function Link() {
      return Link.__super__.constructor.apply(this, arguments);
    }

    Link.displayName = "react-datum.Link";

    Link.propTypes = _.extend({}, Datum.propTypes, {
      nameAttr: PropTypes.string,
      target: PropTypes.string,
      ellipsizeAt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
      reverseEllipsis: PropTypes.bool,
      hideProtocol: PropTypes.bool
    });

    Link.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      target: '_blank',
      hideProtocol: false
    });

    Link.prototype.subClassName = 'link';

    Link.prototype.renderValueForDisplay = function() {
      return React.createElement("a", {
        "href": this._getHref(),
        "target": this.props.target
      }, this._getTagContent());
    };

    Link.prototype._getHref = function() {
      return this.getModelValue();
    };

    Link.prototype._removeHttpForDisplay = function() {
      var index, value;
      value = this.getModelValue();
      if (value.indexOf('://') >= 3) {
        index = value.indexOf('://') + 3;
        value = value.slice(index);
      }
      return value;
    };

    Link.prototype._getTagContent = function() {
      var contentValue, value;
      if (this.props.nameAttr != null) {
        contentValue = this.getModel().get(this.props.nameAttr);
        if (_.isArray(contentValue)) {
          contentValue = contentValue.map(function(v) {
            return v.toString();
          }).join(', ');
        }
        return this.renderEllipsizedValue(contentValue);
      } else if (this.props.children != null) {
        return React.createElement("span", null, this.props.children);
      } else {
        if (this.props.hideProtocol) {
          value = this._removeHttpForDisplay();
        } else {
          value = this.getModelValue();
        }
        return this.renderEllipsizedValue(value);
      }
    };

    return Link;

  })(Datum);

}).call(this);
