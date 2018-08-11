(function() {
  var Backbone, CollectionStats, PropTypes, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Backbone = require('backbone');

  module.exports = CollectionStats = (function(superClass) {
    extend(CollectionStats, superClass);

    function CollectionStats() {
      return CollectionStats.__super__.constructor.apply(this, arguments);
    }

    CollectionStats.displayName = "react-datum.CollectionStats";

    CollectionStats.propTypes = {
      collection: PropTypes.instanceOf(Backbone.Collection),
      itemDisplayName: PropTypes.string
    };

    CollectionStats.defaultProps = {
      itemDisplayName: "item"
    };

    CollectionStats.contextTypes = {
      collection: PropTypes.instanceOf(Backbone.Collection)
    };

    CollectionStats.prototype.render = function() {
      this.collection = this.props.collection || this.context.collection;
      if (this.collection == null) {
        throw this.constructor.displayName + " needs a collection prop or react-datum Collection context parent";
      }
      return React.createElement("div", {
        "className": 'collection-stats'
      }, this._renderFound(), this._renderSelected(), this._renderViewing());
    };

    CollectionStats.prototype._renderFound = function() {
      var base, displayName, things, total;
      total = (typeof (base = this.collection).getTotalRows === "function" ? base.getTotalRows() : void 0) || this.collection.models.length;
      displayName = this.props.itemDisplayName;
      things = (function() {
        switch (false) {
          case (typeof inflection !== "undefined" && inflection !== null ? inflection.inflect : void 0) == null:
            return inflection.inflect(this.props.itemDisplayName, total);
          case displayName.plural == null:
            return displayName.plural(total);
          default:
            return displayName;
        }
      }).call(this);
      return React.createElement("span", {
        "className": "found stats fade in"
      }, "Found ", this._renderCount(total), " ", things);
    };

    CollectionStats.prototype._renderSelected = function() {
      if (!this.collection.hasSelectableCollection) {
        return null;
      }
      return React.createElement("span", {
        "className": "selected stats fade in"
      }, ", ", this._renderCount(this.collection.getSelectedModels().length), " selected");
    };

    CollectionStats.prototype._renderViewing = function() {
      var bottomIndex, ref, ref1, topIndex;
      topIndex = this.collection.topDisplayIndex || ((ref = this.collection.statsModel) != null ? ref.get('topDisplayIndex') : void 0);
      bottomIndex = this.collection.bottomDisplayIndex || ((ref1 = this.collection.statsModel) != null ? ref1.get('bottomDisplayIndex') : void 0);
      if (!((topIndex != null) && bottomIndex)) {
        return null;
      }
      return React.createElement("span", {
        "className": "viewing stats fade in"
      }, "Viewing ", this._renderCount(topIndex, 'top-index'), " -", this._renderCount(bottomIndex, 'bottom-index'));
    };

    CollectionStats.prototype._renderCount = function(value, addClass) {
      var className;
      if (addClass == null) {
        addClass = "";
      }
      className = ["count", addClass].join(' ');
      return React.createElement("span", {
        "className": className
      }, value);
    };

    return CollectionStats;

  })(React.Component);

}).call(this);
