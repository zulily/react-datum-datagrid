(function() {
  var Label, React, Text, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  _ = require('underscore');

  Text = require('./text');


  /*
    see ./label.md
   */

  module.exports = Label = (function(superClass) {
    extend(Label, superClass);

    function Label() {
      return Label.__super__.constructor.apply(this, arguments);
    }

    Label.displayName = "react-datum.Label";

    Label.prototype.render = function() {
      return Label.__super__.render.apply(this, arguments);
    };

    Label.prototype.renderValueForDisplay = function() {
      var label, labelProps, superVal, tooltip;
      superVal = Label.__super__.renderValueForDisplay.apply(this, arguments);
      labelProps = {
        style: this.props.style
      };
      tooltip = this.getPropOrMetadata('tooltip');
      label = superVal != null ? this.renderWithPopover(React.createElement("label", Object.assign({}, labelProps), superVal), tooltip, 'datumLabelTooltip', 'datum-tooltip') : null;
      return label;
    };

    Label.prototype.getModelValue = function(newProps, newContext) {
      if (newProps == null) {
        newProps = this.props;
      }
      if (newContext == null) {
        newContext = this.context;
      }
      if (newProps.children != null) {
        return newProps.children;
      }
      return Label.__super__.getModelValue.apply(this, arguments);
    };

    return Label;

  })(Text);

}).call(this);
