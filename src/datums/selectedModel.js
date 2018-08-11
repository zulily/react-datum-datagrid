(function() {
  var Backbone, ContextualData, PropTypes, React, SelectedModel,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Backbone = require('backbone');

  ContextualData = require('./contextualData');

  module.exports = SelectedModel = (function(superClass) {
    extend(SelectedModel, superClass);

    function SelectedModel() {
      this._onSelectionsChanged = bind(this._onSelectionsChanged, this);
      return SelectedModel.__super__.constructor.apply(this, arguments);
    }

    SelectedModel.displayName = "react-datum.SelectedModel";

    SelectedModel.prototype.dataType = Backbone.Model;

    SelectedModel.prototype.contextKey = 'model';

    SelectedModel.proptypes = {
      collection: PropTypes.instanceOf(Backbone.Collection),
      placeholder: PropTypes.node
    };

    SelectedModel.contextTypes = {
      collection: PropTypes.instanceOf(Backbone.Collection)
    };

    SelectedModel.childContextTypes = {
      model: PropTypes.instanceOf(Backbone.Model)
    };

    SelectedModel.prototype.renderContent = function() {
      var superContent;
      superContent = SelectedModel.__super__.renderContent.apply(this, arguments);
      if (this.state.collectionOrModel != null) {
        return superContent;
      }
      return React.createElement("div", {
        "className": "large-placeholder"
      }, this.props.placeholder);
    };

    SelectedModel.prototype.needsReinitializing = function() {
      var truth;
      truth = SelectedModel.__super__.needsReinitializing.call(this) || this.context.collection !== this._lastContextCollection;
      this._lastContextCollection = this.context.collection;
      return truth;
    };


    /*
      override - We are going to provide a 'model' context (contextKey), but we listen to a
      collection
     */

    SelectedModel.prototype.getInputCollectionOrModel = function() {
      return this.props.collection || this.context.collection;
    };

    SelectedModel.prototype.getCollectionOrModelToProvide = function() {
      var collection;
      collection = this.props.collection || this.context.collection;
      return collection != null ? typeof collection.getSelectedModels === "function" ? collection.getSelectedModels()[0] : void 0 : void 0;
    };

    SelectedModel.prototype.bindEvents = function(model) {
      var ref;
      SelectedModel.__super__.bindEvents.apply(this, arguments);
      return (ref = this.getInputCollectionOrModel()) != null ? ref.on("selectionsChanged", this._onSelectionsChanged) : void 0;
    };

    SelectedModel.prototype.unbindEvents = function() {
      var ref;
      SelectedModel.__super__.unbindEvents.apply(this, arguments);
      return (ref = this.getInputCollectionOrModel()) != null ? ref.off("selectionsChanged", this._onSelectionsChanged) : void 0;
    };

    SelectedModel.prototype._onSelectionsChanged = function() {
      this.setCollectionOrModel();
      return this.forceUpdate();
    };

    return SelectedModel;

  })(ContextualData);

}).call(this);
