(function() {
  var Backbone, ContextualData, PropTypes, React, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');
  PropTypes = require('prop-types');
  _ = require('underscore');


  /*
    This is an abstract base class for contextual data components like ReactDatum.Collection
    and ReactDatum.Model that provide a single contextual data element.
  
    The ReactDatum.ContextualData base class also provides the listener to model or collection
    events and rendering of child components on changes.
  
    You shouldn't need to use this class directly.
   */

  module.exports = ContextualData = (function(superClass) {
    extend(ContextualData, superClass);


    /*
      This is the class of thing being placed in the context.
        ex. `Backbone.Model` or `Backbone.Collection`
     */

    ContextualData.prototype.dataType = null;


    /*
     this is the key in @context children should use to access thing
      ex. "model"
     */

    ContextualData.prototype.contextKey = null;

    ContextualData.propTypes = {
      fetch: PropTypes.bool,
      fetchOptions: PropTypes.object,
      placeholder: PropTypes.node,
      className: PropTypes.string,
      debouncedUpdate: PropTypes.bool,
      debounceMs: PropTypes.number,
      debug: PropTypes.bool,
      style: PropTypes.object
    };

    ContextualData.childContextTypes = {};

    ContextualData.defaultProps = {
      fetch: false,
      fetchOptions: {},
      placeholder: void 0,
      style: {},
      debouncedUpdate: true,
      debounceMs: 0
    };

    function ContextualData(props) {
      this.update = bind(this.update, this);
      this.onDataChanged = bind(this.onDataChanged, this);
      ContextualData.__super__.constructor.call(this, props);
      this.state = {
        lastUpdated: null,
        collectionOrModel: null
      };
      this.debouncedUpdate = this.props.debouncedUpdate ? _.debounce(this.update, this.props.debounceMs) : this.update;
    }

    ContextualData.prototype.getChildContext = function() {
      var c;
      c = {};
      c[this.contextKey] = this.state.collectionOrModel;
      return c;
    };

    ContextualData.prototype.render = function() {
      var className;
      className = "contextual-data " + this.contextKey;
      if (this.props.className != null) {
        className += " " + this.props.className;
      }
      return React.createElement("span", {
        "style": _.extend({}, this.props.style),
        "className": className
      }, this.renderContent());
    };

    ContextualData.prototype.renderContent = function() {
      if ((this.state.collectionOrModel != null) || this.props.placeholder === void 0) {
        return this.props.children;
      }
      return this.props.placeholder;
    };


    /* !pragma coverage-skip-next */

    ContextualData.prototype.componentWillUnmount = function() {
      return this.unbindEvents();
    };

    ContextualData.prototype.componentWillMount = function() {
      return this.initializeCollectionOrModel();
    };


    /* !pragma coverage-skip-next */

    ContextualData.prototype.componentWillReceiveProps = function(newProps) {
      this.props = newProps;
      return this.initializeCollectionOrModel();
    };


    /*
      override this model to do a custom fetch method like fetchForUser or some such
     */

    ContextualData.prototype.fetchCollectionOrModel = function() {
      return this.state.collectionOrModel.fetch(this.props.fetchOptions);
    };


    /*
      extend this method to provide additional initialization on the
      thing you provide.  You should probably call super
     */

    ContextualData.prototype.initializeCollectionOrModel = function() {
      if (!this.needsReinitializing()) {
        return;
      }
      this.unbindEvents();
      this.setCollectionOrModel();
      this.bindEvents();
      if (this.props.fetch && (this.state.collectionOrModel != null)) {
        return this.fetchCollectionOrModel();
      }
    };


    /*
      override this method to input from somewhere other than the context or props being passed in
     */

    ContextualData.prototype.getInputCollectionOrModel = function() {
      return this.props[this.contextKey] || this.context[this.contextKey];
    };


    /*
      override or extend this method to provide something other than what we recieve
     */

    ContextualData.prototype.getCollectionOrModelToProvide = function() {
      return this.getInputCollectionOrModel();
    };


    /*
      extend this method to provide additional tests to determine if initialization is
      needed.  You should probably extend this method like so:
      ```
        return super() || this._someOtherTest()
      ```
     */

    ContextualData.prototype.needsReinitializing = function() {
      var collectionOrModel, truth;
      collectionOrModel = this.getCollectionOrModelToProvide();
      truth = (this.state.collectionOrModel == null) || collectionOrModel !== this._lastPropsModel;
      this._lastPropsModel = collectionOrModel;
      return truth;
    };

    ContextualData.prototype.setCollectionOrModel = function() {
      var collectionOrModel;
      collectionOrModel = this.getCollectionOrModelToProvide();
      this.setState({
        collectionOrModel: collectionOrModel
      });
      return this.state.collectionOrModel = collectionOrModel;
    };

    ContextualData.prototype.bindEvents = function() {
      var ref;
      return (ref = this.state.collectionOrModel) != null ? typeof ref.on === "function" ? ref.on('all', this.onDataChanged, this) : void 0 : void 0;
    };

    ContextualData.prototype.unbindEvents = function() {
      var ref;
      return (ref = this.state.collectionOrModel) != null ? typeof ref.off === "function" ? ref.off('all', this.onDataChanged) : void 0 : void 0;
    };

    ContextualData.prototype.onDataChanged = function() {
      return this.debouncedUpdate();
    };

    ContextualData.prototype.update = function() {
      if (this.props.debug) {
        console.log("ContextualData: update on model", this.state.collectionOrModel);
      }
      this.setState({
        lastUpdated: Date.now(),
        collectionOrModel: this.getCollectionOrModelToProvide()
      });
      if (this.props.forceUpdate) {
        return this.forceUpdate();
      }
    };

    return ContextualData;

  })(React.Component);

}).call(this);
