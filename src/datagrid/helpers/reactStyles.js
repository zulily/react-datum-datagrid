(function() {
  var DeepSet, ReactStyles, _,
    slice = [].slice;

  _ = require('underscore');

  DeepSet = require('./deepSet');

  module.exports = ReactStyles = (function() {
    function ReactStyles(styles) {
      this.styles = styles;
    }


    /*
      Get's an object of React inline styles resolving any includes.
    
      Context is optional and defaults to window.
      (see, ./reactStyles.md for more)
     */

    ReactStyles.prototype.get = function() {
      var context, i, include, includes, j, len, len1, outStyles, style, styleName, styleNames;
      context = arguments[0], styleNames = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (_.isString(context)) {
        styleNames.splice(0, 0, context);
        context = window;
      }
      outStyles = [{}];
      for (i = 0, len = styleNames.length; i < len; i++) {
        styleName = styleNames[i];
        style = _.extend({}, this.styles[styleName]);
        if (style == null) {
          console.error("ReactStyles: invalid styleName specified: '" + styleName + "'");
          continue;
        }
        if (style.includes != null) {
          includes = _.isArray(style.includes) ? style.includes : [style.includes];
          for (j = 0, len1 = includes.length; j < len1; j++) {
            include = includes[j];
            switch (false) {
              case !_.isString(include):
                outStyles.push(this.get(context, include));
                break;
              case !_.isFunction(include):
                outStyles.push(include.call(context));
                break;
              case !_.isObject(include):
                outStyles.push(include);
                break;
              default:
                throw "Unrecognized include type (should be string, object or function): " + (JSON.stringify(include)) + " for styles: " + (JSON.stringify(this.styles));
            }
          }
          delete style.includes;
        }
        outStyles.push(style);
      }
      return _.extend.apply(this, outStyles);
    };

    ReactStyles.prototype.set = function(deepAttr, value) {
      return DeepSet(this.styles, deepAttr, value);
    };

    return ReactStyles;

  })();

}).call(this);
