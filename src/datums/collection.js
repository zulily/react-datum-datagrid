(function() {
  var Backbone, Collection, ContextualData, PropTypes, React, SelectableCollection, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Backbone = require('backbone');

  _ = require('underscore');

  SelectableCollection = require('selectable-collection');

  ContextualData = require('./contextualData');

  module.exports = Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.displayName = "react-datum.Collection";

    Collection.prototype.dataType = Backbone.Collection;

    Collection.prototype.contextKey = 'collection';

    Collection.collectionPropType = PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Collection), PropTypes.array]);

    Collection.propTypes = _.extend({}, ContextualData.propTypes, {
      collection: Collection.collectionPropType.isRequired
    });

    Collection.childContextTypes = _.extend({}, ContextualData.childContextTypes, {
      collection: Collection.collectionPropType
    });

    Collection.prototype.setCollectionOrModel = function() {
      var collection;
      Collection.__super__.setCollectionOrModel.apply(this, arguments);
      collection = this.state.collectionOrModel;
      if (!((collection == null) || collection.hasSelectableCollectionMixin)) {
        SelectableCollection.applyTo(collection);
      }
      return collection;
    };

    return Collection;

  })(ContextualData);

}).call(this);
