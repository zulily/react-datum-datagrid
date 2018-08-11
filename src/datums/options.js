(function() {
  var Options, _, __options;

  _ = require('underscore');

  __options = {
    ReactBootstrap: (typeof window !== "undefined" && window !== null ? window.ReactBootstrap : void 0) || null,
    errorIconClass: null
  };


  /*
    These are global options used to control various aspects
    of ReactDatum rendering and functionality.
  
    Currently supported configurable options:
  
      ReactBootstrap: Defaults to global 'ReactBootstrap' if it exists.
        If set this option will use ReactBootstrap for popovers such as when
        a Datum is ellipsized and for validation errors. 
        If not set, ReactDatum will use the HTML5 title tooltips for popovers
        
      RbOverlayProps: 
        You can change the placement, trigger, etc used for popovers when using
        ReactBootstrap.
        
      errorIconClass: default: null.  Icon css class to use for indicating 
        validation errors. If not set, a red unicode exclamation point is used.
   */

  module.exports = Options = (function() {
    function Options() {}


    /*
      These are defaulted onto whatever is provided via ReactDatum.Options.set().
     */

    Options._defaults = {
      errorIconClass: null,
      ReactBootstrap: null,
      RbOverlayProps: {
        trigger: ['hover', 'focus'],
        placement: 'right'
      },
      LazyPhoto: {
        notFoundUrl: "http://zulily.github.io/react-datum/img/petals.png",
        loadingUrl: "http://zulily.github.io/react-datum/img/blank.jpg"
      }
    };

    Options._options = _.extend({}, Options._defaults);


    /*
      Use to set a ReactDatum option.  Arguments can be either `(key, value)` or `({key: value, key: value})`
        
      Example:
      ```
        ReactDatum = require('react-datum')
        
        // use the version of react bootstrap I got somewhere 
        ReactDatum.Options.set('ReactBootstrap', loadedBootstrapLib)
        
        // use the fontawesome 4.5 exclamation sign icon for errors
        ReactDatum.Options.set('errorIconClass', 'fa fa-exclamation-circle')
      
        // change the placement of the popover (if using ReactBootstrap)
        ReactDatum.Options.set({RbOverlayProps: {placement: 'bottom'}})
      ```
     */

    Options.set = function(option, value) {
      var _options, extension, key;
      _options = Options._options;
      extension = {};
      if (_.isObject(option)) {
        extension = option;
      } else {
        extension[option] = value;
      }
      for (key in extension) {
        value = extension[key];
        if ((this._options[key] != null) && _.isObject(this._options[key]) && _.isObject(value)) {
          _.extend(this._options[key], value);
        } else {
          this._options[key] = value;
        }
      }
      return this._options;
    };


    /*
      Get a previously set option or it's default if not set.  Returns full set of options if no option arg 
      is provided.
     */

    Options.get = function(option) {
      if (option == null) {
        option = null;
      }
      if (option == null) {
        return _.extend({}, this._options);
      }
      return this._options[option];
    };

    return Options;

  })();

}).call(this);
