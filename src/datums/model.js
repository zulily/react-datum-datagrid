(function() {
  var Backbone, ContextualData, Model, PropTypes, React, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Backbone = require('backbone');

  _ = require('underscore');

  ContextualData = require('./contextualData');

  module.exports = Model = (function(superClass) {
    extend(Model, superClass);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.displayName = "react-datum.Model";

    Model.prototype.dataType = Backbone.Model;

    Model.prototype.contextKey = 'model';

    Model.modelPropType = PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Model), PropTypes.object]);

    Model.propTypes = _.extend({}, ContextualData.propTypes, {
      model: Model.modelPropType.isRequired
    });

    Model.childContextTypes = _.extend({}, ContextualData.childContextTypes, {
      model: Model.modelPropType
    });

    Model.prototype.update = function() {
      return Model.__super__.update.apply(this, arguments);
    };

    return Model;

  })(ContextualData);

}).call(this);
