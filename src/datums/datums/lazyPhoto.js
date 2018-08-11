(function() {
  var Datum, LazyPhoto, Options, React,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  Datum = require('./datum');

  Options = require('../options');


  /*
    This is a lazy loading image.
  
    To prevent a page heavily loaded with images preventing other content from loading, a small
    blank image is downloaded and rendered first and then onLoad the real image src is used and
    rerender.
  
    On error a notFoundUrl is set as the image src to prevent broken image display.
  
    The model attribute specified in @props.attr should return a fully qualified
    url.  The image is only rendered if it's visible and in view. Otherwise the placeholder
    image is rendered.
   */

  module.exports = LazyPhoto = (function(superClass) {
    extend(LazyPhoto, superClass);

    function LazyPhoto() {
      this.onError = bind(this.onError, this);
      this.onLoad = bind(this.onLoad, this);
      return LazyPhoto.__super__.constructor.apply(this, arguments);
    }

    LazyPhoto.displayName = "react-datum.LazyPhoto";

    LazyPhoto.prototype.subClassName = 'lazy-image';

    LazyPhoto.prototype.initialLoadComplete = false;

    LazyPhoto.prototype.componentWillMount = function() {
      LazyPhoto.__super__.componentWillMount.apply(this, arguments);
      return this.setState({
        notFound: false
      });
    };

    LazyPhoto.prototype.isEditable = function() {
      return false;
    };

    LazyPhoto.prototype.renderForDisplay = function() {
      var modelValue, notFound, notFoundUrl, source;
      modelValue = this.getModelValue();
      notFound = modelValue == null ? true : this.state.notFound;
      notFoundUrl = Options.get('LazyPhoto').notFoundUrl;
      source = notFound ? notFoundUrl : modelValue;
      return React.createElement("img", {
        "src": source,
        "onLoad": this.onLoad,
        "onError": this.onError
      });
    };

    LazyPhoto.prototype.onLoad = function(evt) {
      if (this.initialLoadComplete || this.notFound) {
        return;
      }
      return this.initialLoadComplete = true;
    };

    LazyPhoto.prototype.onError = function(evt) {
      if (this.state.notFound) {
        return;
      }
      return this.setState({
        notFound: true
      });
    };

    LazyPhoto.prototype.onModelValueChange = function() {
      this.setState({
        notFound: false
      });
      return LazyPhoto.__super__.onModelValueChange.apply(this, arguments);
    };

    return LazyPhoto;

  })(Datum);

}).call(this);
