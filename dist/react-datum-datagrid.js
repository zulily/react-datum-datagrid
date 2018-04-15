(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("jquery"), require("react"), require("react-dom"), require("react-datum"), require("react-bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "jquery", "react", "react-dom", "react-datum", "react-bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["ReactDatumDatagrid"] = factory(require("underscore"), require("jquery"), require("react"), require("react-dom"), require("react-datum"), require("react-bootstrap"));
	else
		root["ReactDatumDatagrid"] = factory(root["_"], root["jQuery"], root["React"], root["ReactDOM"], root["ReactDatum"], root["ReactBootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_26__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(18)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(21)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(6);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var DeepSet,
      ReactStyles,
      _,
      slice = [].slice;

  _ = __webpack_require__(0);

  DeepSet = __webpack_require__(23);

  module.exports = ReactStyles = function () {
    function ReactStyles(styles) {
      this.styles = styles;
    }

    /*
      Get's an object of React inline styles resolving any includes.  
      
      Context is optional and defaults to window.  
      (see, ./reactStyles.md for more)
     */

    ReactStyles.prototype.get = function () {
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
                throw "Unrecognized include type (should be string, object or function): " + JSON.stringify(include) + " for styles: " + JSON.stringify(this.styles);
            }
          }
          delete style.includes;
        }
        outStyles.push(style);
      }
      return _.extend.apply(this, outStyles);
    };

    ReactStyles.prototype.set = function (deepAttr, value) {
      return DeepSet(this.styles, deepAttr, value);
    };

    return ReactStyles;
  }();
}).call(undefined);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Cell,
      Classnames,
      PropTypes,
      React,
      ReactDatum,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  ReactDatum = __webpack_require__(9);

  PropTypes = __webpack_require__(4);

  Classnames = __webpack_require__(12);

  _ = __webpack_require__(0);

  module.exports = Cell = function (superClass) {
    extend(Cell, superClass);

    Cell.propTypes = {
      editing: PropTypes.bool,
      rowData: PropTypes.object,
      column: PropTypes.object,
      datagrid: PropTypes.any,
      onEdit: PropTypes.func,
      defaultCellStyle: PropTypes.object
    };

    Cell.contextTypes = {
      datagrid: PropTypes.any
    };

    function Cell() {
      this.onEditClick = bind(this.onEditClick, this);
      this._delayedForceUpdate = bind(this._delayedForceUpdate, this);
      this._debouncedForceUpdate = bind(this._debouncedForceUpdate, this);
      this.renderWrapped = bind(this.renderWrapped, this);
      Cell.__super__.constructor.apply(this, arguments);
    }

    Cell.prototype.componentDidMount = function () {
      return Cell.__super__.componentDidMount.apply(this, arguments);
    };

    Cell.prototype.render = function () {
      var datumComponent, datumProps, ref, value;
      value = this.props.value;
      datumProps = _.extend({}, this.props.column.datumProps, {
        model: this.getModel(),
        attr: this.props.column.key,
        column: this.props.column,
        ref: 'datum',
        inputMode: this.props.editing ? 'edit' : 'readonly'
      });
      datumProps = _.defaults(datumProps, {
        rbOverlayProps: {
          trigger: ['hover', 'focus', 'click'],
          placement: 'top'
        }
      });
      datumComponent = (ref = this.props.column.datum) != null ? ref : ReactDatum.Text;
      value = React.createElement(this.props.column.datum, datumProps);
      this.renderWrapped(value);
      return renderedCell;
    };

    Cell.prototype.renderWrapped = function (value, options) {
      var canEditCell, className, icon, ref, wrapperStyle;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        title: null,
        wrapperStyle: {}
      });
      this.setDatumErrors();
      canEditCell = (ref = this.getDatagrid()) != null ? ref.canEditCell(this.props.column, this.getModel()) : void 0;
      wrapperStyle = $.extend(true, {}, options.wrapperStyle, this.getCellStyle(canEditCell));
      className = this.getCellClass(canEditCell);
      icon = this.getPrimaryIcon(canEditCell);
      return React.createElement("div", {
        "data-attr-row": this.props.rowIdx,
        "data-attr-col": this.props.column.key,
        "className": className,
        "title": options.title,
        "style": wrapperStyle
      }, icon, React.createElement("span", null, value));
    };

    Cell.prototype._debouncedForceUpdate = function () {
      return _.debounce(function (_this) {
        return function () {
          return _this.forceUpdate();
        };
      }(this), 50);
    };

    Cell.prototype._delayedForceUpdate = function (delay) {
      if (delay == null) {
        delay = 5000;
      }
      return _.delay(this._debouncedForceUpdate, 5000);
    };

    Cell.prototype.onEditClick = function (evt) {
      return _.defer(function (_this) {
        return function () {
          var ref;
          if (_this.props.onEdit != null) {
            return _this.props.onEdit(_this, evt);
          } else {
            return (ref = _this.getDatagrid()) != null ? typeof ref.editCurrentCell === "function" ? ref.editCurrentCell() : void 0 : void 0;
          }
        };
      }(this));
    };

    Cell.prototype.getModel = function () {
      return this.props.rowData;
    };

    Cell.prototype.getDatagrid = function () {
      var ref;
      return (ref = this.props.datagrid) != null ? ref : this.context.datagrid;
    };

    Cell.prototype.getCellClass = function (canEditCell) {
      var model, ref;
      model = this.getModel();
      return Classnames('rdd-cell', "rdd-" + this.props.column.key.dasherize() + "-column no-help-icon", this.getAdditionalElementClasses(), {
        'rdd-cell-error': ((ref = this.getDatagridSaveErrors()) != null ? ref.length : void 0) > 0
      }, {
        'rdd-cell-saved': this.getDatagridSaveSuccess() === true
      }, {
        'rdd-editable': canEditCell
      }, {
        'rdd-selected': this.isSelected()
      });
    };

    Cell.prototype.getCellStyle = function (canEditCell) {
      var model;
      model = this.getModel();
      return $.extend(true, {}, this.getCellDefaultStyle(model), this.props.column.cellStyle, this.getCellOverrideStyle(model));
    };

    Cell.prototype.getCellDefaultStyle = function (model) {
      var cellStyle, ref;
      cellStyle = _.extend({}, (ref = this.props.defaultCellStyle) != null ? ref : {});
      if (this.props.column.rightAlign) {
        cellStyle.textAlign = 'right';
        cellStyle.paddingRight = 10;
      }
      return cellStyle;
    };

    Cell.prototype.getCellOverrideStyle = function (model) {
      return {};
    };

    Cell.prototype.getPrimaryIcon = function (canEditCell) {
      var icon, model;
      icon = null;
      model = this.getModel();
      if (model == null) {
        return null;
      }
      if (this.getDatagridSaving()) {
        icon = React.createElement("i", {
          "className": "fa fa-spin fa-refresh rdd-icon rdd-icon-refresh",
          "title": "Saving update..."
        });
      } else if (canEditCell && !this.props.column.hideEditableIcon) {
        icon = React.createElement("i", {
          "className": "fa fa-pencil rdd-icon rdd-icon-edit",
          "onClick": this.onEditClick,
          "title": "Click to edit this cell (or dbclick or enter)"
        });
      }
      return icon;
    };

    Cell.prototype.getAdditionalElementClasses = function () {
      return null;
    };

    Cell.prototype.getDatagridSaveErrors = function () {
      var model, ref, ref1, ref2;
      model = this.getModel();
      return (ref = (ref1 = model != null ? typeof model.getDatagridSaveErrors === "function" ? model.getDatagridSaveErrors(this.props.column.key) : void 0 : void 0) != null ? ref1 : model != null ? (ref2 = model.__datagridSaveErrors) != null ? ref2[this.props.column.key] : void 0 : void 0) != null ? ref : [];
    };

    Cell.prototype.getDatagridSaveSuccess = function () {
      var model, ref, ref1, ref2;
      model = this.getModel();
      return (ref = (ref1 = model != null ? typeof model.getDatagridSaveSuccess === "function" ? model.getDatagridSaveSuccess(this.props.column.key) : void 0 : void 0) != null ? ref1 : model != null ? (ref2 = model.__datagridSaveSuccess) != null ? ref2[this.props.column.key] : void 0 : void 0) != null ? ref : false;
    };

    Cell.prototype.setDatagridSaveSuccess = function (trueOrFalse) {
      var model, ref;
      model = this.getModel();
      if (model == null) {
        return;
      }
      if (_.isFunction(model.setDatagridSaveSuccess)) {
        return model.setDatagridSaveSuccess(this.props.column.key, trueOrFalse);
      } else {
        return (ref = model.__datagridSaveSuccess) != null ? ref[this.props.column.key] = trueOrFalse : void 0;
      }
    };

    Cell.prototype.getDatagridSaving = function () {
      var model, ref, ref1, ref2;
      model = this.getModel();
      return (ref = (ref1 = model != null ? typeof model.getDatagridSaving === "function" ? model.getDatagridSaving(this.props.column.key) : void 0 : void 0) != null ? ref1 : model != null ? (ref2 = model.__datagridSaving) != null ? ref2[this.props.column.key] : void 0 : void 0) != null ? ref : false;
    };

    Cell.prototype.isSelected = function () {
      var ref;
      return (ref = this.getDatagrid()) != null ? typeof ref.isCellSelected === "function" ? ref.isCellSelected(this.props.rowIdx, this.props.column.key) : void 0 : void 0;
    };

    Cell.prototype.setDatumErrors = function () {
      var model, saveErrorResp;
      model = this.getModel();
      if (model == null) {
        return;
      }
      saveErrorResp = this.getDatagridSaveErrors();
      if ((saveErrorResp != null ? saveErrorResp.length : void 0) > 0) {
        _.defer(function (_this) {
          return function () {
            var base;
            if (_this.refs.datum != null) {
              if (typeof (base = _this.refs.datum).clearErrors === "function") {
                base.clearErrors();
              }
              return _this.refs.datum.onModelSaveError(_this.getModel(), saveErrorResp);
            }
          };
        }(this));
      }
      if (this.getDatagridSaveSuccess()) {
        _.defer(function (_this) {
          return function () {
            var base;
            if (_this.refs.datum != null) {
              if (typeof (base = _this.refs.datum).clearErrors === "function") {
                base.clearErrors();
              }
            }
            return _this.setDatagridSaveSuccess(false);
          };
        }(this));
        return this._delayedForceUpdate();
      }
    };

    return Cell;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _ReactDatumDatagrid = __webpack_require__(17);

if (window) {
  window.ReactDatumDatagrid = _ReactDatumDatagrid;
}
if (module) {
  module.exports = _ReactDatumDatagrid;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      CellWrapper,
      Datagrid,
      GridEdit,
      GridSelect,
      LabelCell,
      Mixin,
      PropTypes,
      React,
      ReactDOM,
      ReactDatum,
      ReactStyles,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  ReactDOM = __webpack_require__(5);

  ReactDatum = __webpack_require__(9);

  PropTypes = __webpack_require__(4);

  _ = __webpack_require__(0);

  $ = __webpack_require__(2);

  Mixin = __webpack_require__(22);

  ReactStyles = __webpack_require__(11);

  CellWrapper = __webpack_require__(24);

  LabelCell = __webpack_require__(25);

  GridEdit = __webpack_require__(27);

  GridSelect = __webpack_require__(29);

  /*
    This is react-datum-datagrid.   
    
    Example:
    TODO
   */

  module.exports = Datagrid = function (superClass) {
    extend(Datagrid, superClass);

    function Datagrid() {
      this._onLabelScroll = bind(this._onLabelScroll, this);
      this._onBottomGridScroll = bind(this._onBottomGridScroll, this);
      this._onTopGridScroll = bind(this._onTopGridScroll, this);
      return Datagrid.__super__.constructor.apply(this, arguments);
    }

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.DEFAULT_CELL_HEIGHT = 20;

    Datagrid.DEFAULT_CELL_BORDER_WIDTH = 1;

    Datagrid.DEFAULT_CELL_PADDING_HEIGHT = 5;

    Datagrid.DEFAULT_CELL_PADDING_WIDTH = 10;

    Datagrid.propTypes = {
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      columns: PropTypes.array,
      silentSaveErrors: PropTypes.bool,
      labelWidth: PropTypes.number,
      onHideColumn: PropTypes.func,
      onShowColumn: PropTypes.func
    };

    Datagrid.defaultProps = {
      labelWidth: 300
    };

    Datagrid.childContextTypes = {
      datagrid: PropTypes.instanceOf(Datagrid.constructor)
    };

    Datagrid.prototype.getChildContext = function () {
      return {
        datagrid: this
      };
    };

    Datagrid.prototype.styles = new ReactStyles({
      container: {
        includes: function includes() {
          return this.props.style;
        }
      },
      headers: {
        includes: function includes() {
          return {
            width: this.props.labelWidth
          };
        },
        display: 'inline-block',
        backgroundColor: '#eceff6',
        height: '100%',
        verticalAlign: 'top'
      },
      gridsContainer: {
        includes: function includes() {
          return {
            width: "calc(100% - " + this.props.labelWidth + "px)"
          };
        },
        display: 'inline-block',
        height: '100%'
      },
      topGrid: {
        includes: ['bottomDivider', function () {
          return {
            height: this._getTopGridHeight()
          };
        }],
        width: 'calc(100% - 13px)'
      },
      bottomGrid: {
        includes: function includes() {
          return {
            height: this._getBottomGridHeight()
          };
        },
        width: '100%'
      },
      fixedHeaderCells: {
        includes: ['bottomDivider', function () {
          return {
            height: this._getTopGridHeight() + 1
          };
        }],
        width: '100%'
      },
      scrollingHeaderCells: {
        includes: function includes() {
          return {
            height: "calc(100% - " + (this._getTopGridHeight() + 20) + "px)"
          };
        },
        width: '100%',
        marginTop: 1
      },
      scrollingHeaderCellsViewport: {
        height: '100%',
        overflowY: 'scroll'
      },
      styleImage: {
        width: 50,
        minHeight: 60
      },
      bottomDivider: {
        borderBottom: "3px solid #cccccc"
      }
    });

    Datagrid.prototype.componentDidMount = function () {
      this._initializeScrolling();
      return Datagrid.__super__.componentDidMount.apply(this, arguments);
    };

    Datagrid.prototype.style = function (name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    Datagrid.prototype.render = function () {
      var fixedColumns, scrollingColumns;
      fixedColumns = this._getFixedColumns();
      scrollingColumns = this._getScrollingColumns();
      return React.createElement("div", {
        "style": this.style('container'),
        "className": 'react-datum-datagrid'
      }, React.createElement("div", {
        "style": this.style('headers'),
        "className": 'rdd-headers'
      }, React.createElement("div", {
        "style": this.style('fixedHeaderCells'),
        "className": 'rdd-fixed-header-cells'
      }, this._renderHeaderCells(fixedColumns)), React.createElement("div", {
        "style": this.style('scrollingHeaderCells'),
        "className": 'rdd-scrolling-header-cells'
      }, React.createElement("div", {
        "style": this.style('scrollingHeaderCellsViewport')
      }, this._renderHeaderCells(scrollingColumns)))), React.createElement("div", {
        "style": this.style('gridsContainer')
      }, React.createElement("div", {
        "style": this.style('topGrid'),
        "className": 'rdd-top-grid'
      }, React.createElement(ReactGrid, {
        "collection": this.props.collection,
        "ref": 'topGrid',
        "gridSelectionClass": null,
        "gridOptions": {
          preloadCushion: 200,
          pageSize: 20
        }
      }, function (_this) {
        return function (model, rowIdx) {
          return _this._renderDataCells(_this._getFixedColumns(), model, rowIdx, 0);
        };
      }(this))), React.createElement("div", {
        "style": this.style('bottomGrid'),
        "className": 'rdd-bottom-grid'
      }, React.createElement(ReactGrid, {
        "collection": this.props.collection,
        "ref": 'bottomGrid',
        "gridSelectionClass": null,
        "gridOptions": {
          preloadCushion: 200,
          pageSize: 20
        }
      }, function (_this) {
        return function (model, rowIdx) {
          return _this._renderDataCells(_this._getScrollingColumns(), model, rowIdx, _this._getFixedColumns().length);
        };
      }(this)))));
    };

    /*
      Override me to conditionally enable editing on a per cell basis
     */

    Datagrid.prototype.canEditCell = function (col, rowModel) {
      var ref, ref1;
      if (!(col != null ? col.editable : void 0)) {
        return false;
      }
      if (col != null ? (ref = col.datum) != null ? (ref1 = ref.prototype) != null ? typeof ref1.isLocked === "function" ? ref1.isLocked(col, rowModel) : void 0 : void 0 : void 0 : void 0) {
        return false;
      }
      return true;
    };

    Datagrid.prototype.getSelectedCell = function () {
      var $focusedCell, colIdx, columnDef, rowIdx;
      $focusedCell = $(ReactDOM.findDOMNode(this)).find('.rdd-cell-wrapper:focus');
      if (!(($focusedCell != null ? $focusedCell.length : void 0) > 0)) {
        return null;
      }
      rowIdx = ReactDatum.Number.safelyFloat($focusedCell.attr('data-row'));
      colIdx = ReactDatum.Number.safelyFloat($focusedCell.attr('data-col'));
      columnDef = this.getColumn(colIdx);
      return {
        rowIdx: rowIdx,
        idx: colIdx,
        col: columnDef.key
      };
    };

    Datagrid.prototype.setSelectedCell = function (rowIndex, colIndex) {
      var $requestedCell;
      $requestedCell = $(ReactDOM.findDOMNode(this)).find(".rdd-cell-wrapper[data-row=" + rowIndex + "][data-col=" + colIndex + "]");
      if (!(($requestedCell != null ? $requestedCell.length : void 0) > 0)) {
        return;
      }
      return $requestedCell.focus();
    };

    Datagrid.prototype.unsetSelectedCell = function () {
      if (this.getSelectedCell() != null) {
        return document.activeElement.blur();
      }
    };

    Datagrid.prototype.isCellSelected = function (rowIdx, colKey) {
      var selectedCell;
      selectedCell = this.getSelectedCell();
      return selectedCell.rowIdx === rowIdx && selectedCell.col === colKey;
    };

    Datagrid.prototype.refresh = function () {
      var ref, ref1, ref2, ref3;
      if ((ref = this.refs.topGrid) != null) {
        if ((ref1 = ref.grid) != null) {
          ref1.refresh();
        }
      }
      if ((ref2 = this.refs.bottomGrid) != null) {
        if ((ref3 = ref2.grid) != null) {
          ref3.refresh();
        }
      }
      this._onLabelScroll();
      return _.defer(function (_this) {
        return function () {
          return _this._onLabelScroll();
        };
      }(this));
    };

    Datagrid.prototype._renderHeaderCells = function (columnDefs) {
      var cells, columnDef, index;
      cells = function () {
        var i, len, results;
        results = [];
        for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
          columnDef = columnDefs[index];
          results.push(this._renderLabelCell(index, columnDef));
        }
        return results;
      }.call(this);
      return cells;
    };

    Datagrid.prototype._renderLabelCell = function (index, columnDef) {
      var labelStyle, ref;
      if (columnDef == null) {
        return null;
      }
      labelStyle = $.extend(true, {}, this._getDefaultCellStyle(columnDef), (ref = columnDef.flipgrid) != null ? ref.labelStyle : void 0);
      return React.createElement(LabelCell, {
        "key": index,
        "column": columnDef,
        "datagrid": this,
        "defaultCellStyle": labelStyle,
        "onShowColumn": this.props.onShowColumn,
        "onHideColumn": this.props.onHideColumn
      });
    };

    Datagrid.prototype._renderDataCells = function (columnDefs, model, rowIdx, baseColumnIndex) {
      var cells, columnDef, index;
      return cells = function () {
        var i, len, results;
        results = [];
        for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
          columnDef = columnDefs[index];
          results.push(this._renderDataCell(index, columnDef, model, rowIdx, baseColumnIndex));
        }
        return results;
      }.call(this);
    };

    Datagrid.prototype._renderDataCell = function (index, columnDef, model, rowIdx, baseColumnIndex) {
      return React.createElement(CellWrapper, {
        "model": model,
        "column": columnDef,
        "rowIdx": rowIdx,
        "colIdx": baseColumnIndex + index,
        "datagrid": this,
        "defaultCellStyle": this._getDefaultCellStyle(columnDef)
      });
    };

    Datagrid.prototype._getFixedColumns = function () {
      return _.filter(this.props.columns, function (columnDef) {
        return columnDef.locked;
      });
    };

    Datagrid.prototype._getScrollingColumns = function () {
      return _.filter(this.props.columns, function (columnDef) {
        return !columnDef.locked;
      });
    };

    Datagrid.prototype._initializeScrolling = function () {
      var bottomGridEl, scrollingLableCellsEl, topGridEl;
      topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid');
      bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
      topGridEl.addEventListener('scroll', this._onTopGridScroll);
      bottomGridEl.addEventListener('scroll', this._onBottomGridScroll);
      scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div');
      return scrollingLableCellsEl.addEventListener('scroll', this._onLabelScroll);
    };

    Datagrid.prototype._onTopGridScroll = function () {
      var bottomGridEl, topGridEl;
      if (!this._isBottomInitiatedScrolling) {
        this._isTopInitiatedScrolling = true;
        topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        bottomGridEl.scrollLeft = topGridEl.scrollLeft;
      }
      return this._isBottomInitiatedScrolling = false;
    };

    Datagrid.prototype._onBottomGridScroll = function () {
      var bottomGridEl, scrollingLableCellsEl, topGridEl;
      if (!(this._isTopInitiatedScrolling || this._isLabelInitiatedScrolling)) {
        this._isBottomInitiatedScrolling = true;
        topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        topGridEl.scrollLeft = bottomGridEl.scrollLeft;
      }
      this._isTopInitiatedScrolling = false;
      if (!this._isLabelInitiatedScrolling) {
        scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        scrollingLableCellsEl.scrollTop = bottomGridEl.scrollTop;
      }
      return this._isLabelInitiatedScrolling = false;
    };

    Datagrid.prototype._onLabelScroll = function () {
      var bottomGridEl, scrollingLableCellsEl;
      if (!this._isBottomInitiatedScrolling) {
        this._isLabelInitiatedScrolling = true;
        scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div');
        bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid');
        bottomGridEl.scrollTop = scrollingLableCellsEl.scrollTop;
      }
      return this._isBottomInitiatedScrolling = false;
    };

    Datagrid.prototype._getTopGridHeight = function () {
      var col, heightOut, i, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
      heightOut = 0;
      ref = this._getFixedColumns();
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        heightOut += (ref1 = this._convertCssPx((ref2 = col.cellStyle) != null ? ref2.borderWidth : void 0)) != null ? ref1 : this.constructor.DEFAULT_CELL_BORDER_WIDTH;
        heightOut += (ref3 = col.height) != null ? ref3 : this.constructor.DEFAULT_CELL_HEIGHT;
        heightOut += (ref4 = this._convertCssPx((ref5 = col.cellStyle) != null ? ref5.paddingTop : void 0)) != null ? ref4 : this.constructor.DEFAULT_CELL_PADDING_HEIGHT;
        heightOut += (ref6 = this._convertCssPx((ref7 = col.cellStyle) != null ? ref7.paddingBottom : void 0)) != null ? ref6 : this.constructor.DEFAULT_CELL_PADDING_HEIGHT;
      }
      return heightOut;
    };

    Datagrid.prototype._getBottomGridHeight = function () {
      return "calc(100% - " + (this._getTopGridHeight() + 5) + "px)";
    };

    Datagrid.prototype._convertCssPx = function (value) {
      var numerals, ref;
      if (value == null) {
        return null;
      }
      if (_.isString(value)) {
        numerals = (ref = value.match(/[^0-9\.]*([0-9\.]*).*/)) != null ? ref[1] : void 0;
        if (numerals == null) {
          return 0;
        }
        return parseInt(numerals);
      }
      return value;
    };

    Datagrid.prototype._getDefaultCellStyle = function (columnDef) {
      var cellStyle;
      cellStyle = {
        height: columnDef.height || this.constructor.DEFAULT_CELL_HEIGHT,
        borderColor: "#EFEFEF",
        borderStyle: 'solid',
        borderWidth: 0,
        borderBottomWidth: this.constructor.DEFAULT_CELL_BORDER_WIDTH,
        paddingTop: this.constructor.DEFAULT_CELL_PADDING_HEIGHT,
        paddingBottom: this.constructor.DEFAULT_CELL_PADDING_HEIGHT,
        paddingLeft: this.constructor.DEFAULT_CELL_PADDING_WIDTH,
        paddingRight: this.constructor.DEFAULT_CELL_PADDING_WIDTH
      };
      return cellStyle;
    };

    Mixin(Datagrid, GridEdit);

    Mixin(Datagrid, GridSelect);

    return Datagrid;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(10);
var assign = __webpack_require__(19);

var ReactPropTypesSecret = __webpack_require__(8);
var checkPropTypes = __webpack_require__(20);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(7);
  var warning = __webpack_require__(10);
  var ReactPropTypesSecret = __webpack_require__(8);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var ReactPropTypesSecret = __webpack_require__(8);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var _, mixin;

  _ = __webpack_require__(0);

  /*
    Extends a class with another class.  Klass is the main class and mixinKlass methods and attributes will
    be added to klass and function as full members of that class.
  
    In the context of a mixinKlass method,
      - @ will reference the instance of klass
      - @originalMethod() will always call method replaced by the mixinKlass method
      - mixinKlass attributes will replace attributes in klass
  
    @originalMethod()
      - is a special method that only exists in the context of a mixinKlass method call
      - should reference either the previous mixin that replaced this method or the klass method replaced
      - may be undefined.  if no previous mixin or the klass did not define the mixinKlass method,
        then @originalMethod should be null or undefined.  If you are unsure if the class being mixed into
        will define the mixin method, use the   @originalMethod?(arguments)   pattern (note existensial op)
  
    see,  app/coffeescripts/tests/application/mixin.coffee for examples and expected behaviors.
  
    IMPORTANT NOTES:
  
      Mixin constructor methods override contructor methods in class being mixed into.  Mixins that extend
      other classes get a hidden constructor.  Make sure @originalMethod? is called with the original constructor
      args.   See models/mixins/stylesMetadata.coffee
  
      mixin() <b>must be called last</b> in the class definition or after class is defined such that any overridden
        methods have already been defined.
  
      Parameter passing.  For flexibility, plugins will often pass along arguments to @originalMethod.  If your
        mixin method doesn't specifically require a fixed set of parameters or doesn't care about parameters,
        you should call original method like so:
        <pre>
                    @originalMethod?.apply(@, arguments)
        </pre>
        This will make your mixin more flexible and able to survive changes to the underlying instance method
        argument specification.
  
    example:
  
        class MyMixin
          someMethod: () =>
            @originalMethod()
             * ... do something more useful
  
        class MyClass
          someMethod: () =>
             * do something useful
  
          mixin @, MyMixin     #  this needs to be last
   */

  module.exports = mixin = function mixin(klass, mixinKlass) {
    var base, base1, base2, key, mixinKlassName, oMethod, oMethodKey, ref, results, val, wrapperDef, wrapperName;
    if (!mixinKlass) {
      console.trace();
      throw "Dev: Mixin class undefined. Make sure you are correctly requiring file.";
    }
    if (klass === window || klass === document) {
      throw "Dev: The class being mixed into should not be window or document. <p>Look closely at the indentation of 'mixin(@, ... )' callsite.  If using '@' for first parameter it must be at the same indentation as the instance method definitions in the class at the very end of the class definition.</p>";
    }
    mixinKlassName = mixinKlass.toString().match(/^\s*function\s*([^\(]*)/)[1] || "unknown";
    ref = mixinKlass.prototype;
    results = [];
    for (key in ref) {
      val = ref[key];
      if (key === 'constructor') {
        continue;
      }
      if (_.isFunction(val) && (_.isEmpty(_.keys(val)) || key === 'constructor')) {
        oMethod = klass.prototype[key];
        oMethodKey = mixinKlassName + "_" + key;
        (base = klass.prototype).__originalMethods || (base.__originalMethods = {});
        klass.prototype.__originalMethods[oMethodKey] = oMethod;
        (base1 = klass.prototype).__mixinMethods || (base1.__mixinMethods = {});
        klass.prototype.__mixinMethods[oMethodKey] = val;
        (base2 = klass.prototype).__originalMethodStack || (base2.__originalMethodStack = []);
        wrapperName = oMethodKey + "__wrapperFn";
        wrapperDef = "klass.prototype[key] = function() {\n  this.__originalMethodStack.push(this.originalMethod)\n  this.originalMethod = this.__originalMethods['" + oMethodKey + "']\n  returnValue = this.__mixinMethods['" + oMethodKey + "'].apply(this, arguments)\n  this.originalMethod = this.__originalMethodStack.pop()\n  return returnValue\n}";
        results.push(eval(wrapperDef));
      } else {
        results.push(klass.prototype[key] = val);
      }
    }
    return results;
  };
}).call(undefined);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var _, deepSet;

  _ = __webpack_require__(0);

  /*
  Performs a deep set on the the value of a attribute deeply nested within this object
  
  See deepGet comments above for example use.  anything that can get fetched
  with deepGet should be able to be set by deepSet
  
  see also /app/coffeescripts/tests/application/utils/deepGetAndSet.coffee for more examples and tests
   */

  module.exports = deepSet = function deepSet(object, pathToAttribute, value, isFunctional) {
    var current, i, lastPart, len, part, parts;
    if (isFunctional == null) {
      isFunctional = true;
    }
    current = object;
    parts = pathToAttribute.split('.');
    lastPart = _.last(parts);
    for (i = 0, len = parts.length; i < len; i++) {
      part = parts[i];
      if (part === lastPart) {
        if (isFunctional && _.isFunction(current[part])) {
          return current[part](value);
        } else {
          return current[part] = value;
        }
      }
      if (current[part] == null) {
        current[part] = {};
      }
      current = isFunctional && _.isFunction(current[part]) ? current[part]() : current[part];
    }
    return current;
  };
}).call(undefined);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      Cell,
      CellWrapper,
      Classnames,
      PropTypes,
      React,
      ReactDOM,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  ReactDOM = __webpack_require__(5);

  PropTypes = __webpack_require__(4);

  Classnames = __webpack_require__(12);

  $ = __webpack_require__(2);

  _ = __webpack_require__(0);

  Cell = __webpack_require__(13);

  module.exports = CellWrapper = function (superClass) {
    extend(CellWrapper, superClass);

    function CellWrapper() {
      this._onArrowDown = bind(this._onArrowDown, this);
      this._onArrowUp = bind(this._onArrowUp, this);
      this._onArrowLeft = bind(this._onArrowLeft, this);
      this._onArrowRight = bind(this._onArrowRight, this);
      this._onCellEdit = bind(this._onCellEdit, this);
      this._onCellKeydown = bind(this._onCellKeydown, this);
      this._onCellBlur = bind(this._onCellBlur, this);
      this._onCellFocus = bind(this._onCellFocus, this);
      return CellWrapper.__super__.constructor.apply(this, arguments);
    }

    CellWrapper.props = {
      model: React.PropTypes.any,
      column: React.PropTypes.object,
      rowIdx: React.PropTypes.number,
      colIdx: React.PropTypes.number,
      datagrid: React.PropTypes.any,
      defaultCellComponent: React.PropTypes.any,
      defaultCellStyle: React.PropTypes.object
    };

    CellWrapper.defaultProps = {
      defaultCellComponent: Cell
    };

    CellWrapper.prototype.componentWillMount = function () {
      return this.setState({
        editing: false,
        selected: false
      });
    };

    CellWrapper.prototype.render = function () {
      var CellComponent, classNames, dataProps, ref;
      CellComponent = (ref = this.props.column.cellComponent) != null ? ref : this.props.defaultCellComponent;
      dataProps = {
        'data-row': this.props.rowIdx,
        'data-col': this.props.colIdx
      };
      classNames = Classnames('rdd-cell-wrapper', {
        selected: this.isSelected()
      });
      return React.createElement("div", Object.assign({
        "className": classNames,
        "tabIndex": 1.,
        "onKeyDown": this._onCellKeydown,
        "onFocus": this._onCellFocus,
        "onBlur": this._onCellBlur,
        "onDoubleClick": this._onCellEdit
      }, dataProps), React.createElement(CellComponent, {
        "editing": this.state.editing,
        "rowData": this.props.model,
        "rowIdx": this.props.rowIdx,
        "column": this.props.column,
        "datagrid": this.props.datagrid,
        "defaultCellStyle": this.props.defaultCellStyle,
        "ref": 'cellComponent',
        "onEdit": this._onCellEdit
      }));
    };

    CellWrapper.prototype.edit = function () {
      var ref;
      if (!((ref = this.props.datagrid) != null ? typeof ref.canEditCell === "function" ? ref.canEditCell(this.props.column, this.props.model) : void 0 : void 0)) {
        return;
      }
      return this.setState({
        editing: true
      });
    };

    CellWrapper.prototype.focus = function () {
      return ReactDOM.findDOMNode(this).focus();
    };

    CellWrapper.prototype.isSelected = function () {
      var ref;
      return (ref = this.props.datagrid) != null ? typeof ref.isCellSelected === "function" ? ref.isCellSelected(this.props.rowIdx, this.props.column.key) : void 0 : void 0;
    };

    CellWrapper.prototype._onCellFocus = function (evt) {
      return this.setState({
        selected: true
      });
    };

    CellWrapper.prototype._onCellBlur = function (evt) {
      return _.defer(function (_this) {
        return function () {
          if (!$.contains(ReactDOM.findDOMNode(_this), document.activeElement)) {
            return _this.setState({
              selected: false,
              editing: false
            });
          }
        };
      }(this));
    };

    CellWrapper.prototype._onCellKeydown = function (evt) {
      var newCell;
      switch (evt.key) {
        case 'Enter':
          if (this.state.editing) {
            this._save();
            newCell = evt.shiftKey ? this._focusUp() : this._focusDown();
            return newCell.find('i.fa-pencil').trigger('click');
          } else {
            return this.edit();
          }
          break;
        case 'Tab':
          evt.preventDefault();
          newCell = evt.shiftKey ? this._focusLeft() : this._focusRight();
          if (this.state.editing) {
            this._save();
            return _.defer(function (_this) {
              return function () {
                return newCell.find('.rdd-icon-edit').trigger('click');
              };
            }(this));
          }
          break;
        case 'Escape':
          return this._cancel();
        case 'ArrowRight':
          return this._onArrowRight(evt);
        case 'ArrowLeft':
          return this._onArrowLeft(evt);
        case 'ArrowUp':
          return this._onArrowUp(evt);
        case 'ArrowDown':
          return this._onArrowDown(evt);
      }
    };

    CellWrapper.prototype._onCellEdit = function () {
      return this.edit();
    };

    CellWrapper.prototype._onArrowRight = function (evt) {
      evt.preventDefault();
      return this._focusRight();
    };

    CellWrapper.prototype._onArrowLeft = function (evt) {
      evt.preventDefault();
      return this._focusLeft();
    };

    CellWrapper.prototype._onArrowUp = function (evt) {
      evt.preventDefault();
      return this._focusUp();
    };

    CellWrapper.prototype._onArrowDown = function (evt) {
      evt.preventDefault();
      return this._focusDown();
    };

    /*
      rowEvt from react-data-grid looks like this:
      {  
        cellKey: "costing.wholesaleCost.amount"
        key: "Enter"
        rowIdx: 0
        updated: "24"
      }
      datagrid ignores .key
     */

    CellWrapper.prototype._save = function () {
      var rowEvt;
      rowEvt = {
        cellKey: this.props.column.key,
        key: "Other",
        rowIdx: this.props.rowIdx,
        updated: this.refs.cellComponent.getValue()
      };
      this.props.datagrid.saveModel(this.props.model, rowEvt);
      return this.setState({
        editing: false
      });
    };

    CellWrapper.prototype._cancel = function () {
      this.setState({
        editing: false
      });
      return _.defer(function (_this) {
        return function () {
          return _this.focus();
        };
      }(this));
    };

    CellWrapper.prototype._focusRight = function () {
      return this._focusOffset(0, 1);
    };

    CellWrapper.prototype._focusLeft = function () {
      return this._focusOffset(0, -1);
    };

    CellWrapper.prototype._focusUp = function () {
      return this._focusOffset(-1, 0);
    };

    CellWrapper.prototype._focusDown = function () {
      return this._focusOffset(1, 0);
    };

    CellWrapper.prototype._focusOffset = function (colOffset, rowOffset) {
      var colIdx, rowIdx;
      colIdx = this.props.colIdx + colOffset;
      rowIdx = this.props.rowIdx + rowOffset;
      return $(React.findDOMNode(this.props.datagrid)).find(".rdd-cell-wrapper[data-row=" + rowIdx + "][data-col=" + colIdx + "]").focus();
    };

    return CellWrapper;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Cell,
      LabelCell,
      PropTypes,
      Rb,
      React,
      ReactStyles,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  PropTypes = __webpack_require__(4);

  Rb = __webpack_require__(26);

  ReactStyles = __webpack_require__(11);

  Cell = __webpack_require__(13);

  module.exports = LabelCell = function (superClass) {
    extend(LabelCell, superClass);

    function LabelCell() {
      this._onHideIconClick = bind(this._onHideIconClick, this);
      this._onShowIconClick = bind(this._onShowIconClick, this);
      return LabelCell.__super__.constructor.apply(this, arguments);
    }

    LabelCell.propTypes = {
      rowData: PropTypes.any,
      column: PropTypes.object,
      onHideColumn: PropTypes.func,
      onShowColumn: PropTypes.func
    };

    LabelCell.prototype.styles = new ReactStyles({
      icon: {
        float: 'right',
        color: '#4767AA'
      },
      wrapper: {
        position: 'relative',
        paddingLeft: 18
      },
      showHideIcon: {
        position: 'absolute',
        left: -5,
        top: 0,
        fontSize: 17,
        color: '#4767AA'
      },
      showIcon: {
        includes: 'showHideIcon',
        left: 2,
        top: 1
      },
      banIcon: {
        includes: 'showHideIcon',
        color: '#DE8387',
        top: 1,
        left: 1,
        fontSize: 21
      }
    });

    LabelCell.prototype.style = function (name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    LabelCell.prototype.renderWrapped = function () {
      var ref, ref1;
      if (!((ref = this.props.column) != null ? ref.tooltip : void 0)) {
        return LabelCell.__super__.renderWrapped.call(this, React.createElement("div", {
          "style": this.style('wrapper')
        }, this._renderShowHideControl(), (ref1 = this.props.column) != null ? ref1.name : void 0));
      }
      return LabelCell.__super__.renderWrapped.call(this, React.createElement("div", {
        "style": this.style('wrapper')
      }, React.createElement(Rb.OverlayTrigger, {
        "overlay": this._renderTooltipPopover()
      }, React.createElement("div", null, this._renderShowHideControl(), this.props.column.name, React.createElement("i", {
        "style": this.style('icon'),
        "className": 'fa fa-question-circle'
      })))));
    };

    LabelCell.prototype._renderTooltipPopover = function () {
      return React.createElement(Rb.Popover, {
        "id": "flipgridTooltipPopover"
      }, this.props.column.tooltip);
    };

    LabelCell.prototype._renderShowHideControl = function () {
      if (!this.props.column.canHide) {
        return null;
      }
      if (this.props.column.isHidden) {
        return React.createElement("i", {
          "className": 'fa fa-eye',
          "style": this.style('showHideIcon'),
          "title": 'Click to show this attribute when "Mine" attributes selected',
          "onClick": this._onShowIconClick
        });
      } else {
        return React.createElement("span", {
          "class": "fa-stack",
          "title": 'Click to hide this attribute when "Mine" attributes selected',
          "onClick": this._onHideIconClick,
          "style": this.style('showHideIcon')
        }, React.createElement("i", {
          "className": "fa fa-eye fa-stack-1x",
          "style": this.style('showIcon')
        }), React.createElement("i", {
          "className": "fa fa-ban fa-stack-2x",
          "style": this.style('banIcon')
        }));
      }
    };

    LabelCell.prototype.getCellDefaultStyle = function (model) {
      var styles;
      styles = _.defaults(LabelCell.__super__.getCellDefaultStyle.call(this, model), {
        verticalAlign: 'middle',
        textAlign: 'left',
        paddingLeft: 10
      });
      _.extend(styles, {
        borderRight: "solid 1px #FFFFFF",
        borderBottom: "solid 1px #FFFFFF"
      });
      if (this.props.column.isHidden) {
        styles.color = 'rgba(0, 0, 0, 0.16)';
      }
      return styles;
    };

    LabelCell.prototype.getBackgroundColor = function () {
      return '#eceff6';
    };

    LabelCell.prototype._onShowIconClick = function (evt) {
      this.props.column.isHidden = false;
      return this.forceUpdate(function (_this) {
        return function () {
          var base;
          return typeof (base = _this.props).onShowColumn === "function" ? base.onShowColumn(_this, _this.props.column, evt) : void 0;
        };
      }(this));
    };

    LabelCell.prototype._onHideIconClick = function (evt) {
      this.props.column.isHidden = true;
      return this.forceUpdate(function (_this) {
        return function () {
          var base;
          return typeof (base = _this.props).onHideColumn === "function" ? base.onHideColumn(_this, _this.props.column, evt) : void 0;
        };
      }(this));
    };

    return LabelCell;
  }(Cell);
}).call(undefined);

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      DeepGet,
      GridEdit,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  _ = __webpack_require__(0);

  $ = __webpack_require__(2);

  DeepGet = __webpack_require__(28);

  /*
   */

  module.exports = GridEdit = function () {
    function GridEdit() {
      this.onModelSaveComplete = bind(this.onModelSaveComplete, this);
      this.onModelSaveError = bind(this.onModelSaveError, this);
      this.onModelSaveSuccess = bind(this.onModelSaveSuccess, this);
    }

    GridEdit.prototype.getCollection = function () {
      var ref, ref1, ref2, ref3, ref4;
      if (this.originalMethod != null) {
        return this.originalMethod();
      }
      return (ref = (ref1 = (ref2 = (ref3 = this.state) != null ? ref3.collection : void 0) != null ? ref2 : this.props.collection) != null ? ref1 : (ref4 = this.context) != null ? ref4.collection : void 0) != null ? ref : this.collection;
    };

    /*
      returns columns with a defaulted name, formatter, header component
     */

    GridEdit.prototype.getColumns = function (columns) {
      var ref, ref1, ref2;
      if (columns == null) {
        columns = null;
      }
      if (this.originalMethod != null) {
        return this.originalMethod(columns);
      }
      return (ref = (ref1 = columns != null ? columns : (ref2 = this.state) != null ? ref2.columns : void 0) != null ? ref1 : this.props.columns) != null ? ref : this.columns;
    };

    /*
      returns a column by key or index
     */

    GridEdit.prototype.getColumn = function (keyOrIndex) {
      var columns;
      if (this.originalMethod != null) {
        return this.originalMethod();
      }
      columns = this.getColumns();
      if (_.isString(keyOrIndex)) {
        return _.find(this.getColumns(), function (c) {
          return c.key === keyOrIndex;
        });
      } else {
        return columns[keyOrIndex];
      }
    };

    GridEdit.prototype.getModelAt = function (index) {
      var collection;
      collection = this.getCollection();
      switch (false) {
        case !(collection == null):
          return null;
        case collection.getItem == null:
          return collection.getItem(index);
        case collection.at == null:
          return collection.at(index);
        default:
          return collection[index];
      }
    };

    GridEdit.prototype.getValueFromModel = function (model, attr) {
      var ref;
      return (ref = typeof model.get === "function" ? model.get(attr) : void 0) != null ? ref : model[attr];
    };

    GridEdit.prototype.getValueAt = function (rowIndex, colIndexOrKey) {
      var columnKey, datum, model, ref;
      ref = this.getModelColumnKeyAt(rowIndex, colIndexOrKey), model = ref[0], columnKey = ref[1], datum = ref[2];
      if (!(model != null && columnKey != null)) {
        return null;
      }
      return this.getValueFromModel(model, columnKey);
    };

    /*
      returns the value to export to csv. Also used by gridSelect mixin for value to copy to clipboard
    
      NOTE that getExportValue is also used by copy/paste to get the value to copy to clipboard.
        you can use csvExportAttribute on the column to export a different attribute only when 
        exporting to CSV
     */

    GridEdit.prototype.getExportValue = function (model, column, options) {
      var value;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        forCsv: false
      });
      value = null;
      if (column.exportFunction != null) {
        value = column.exportFunction(model, column, this, options);
      } else if (options.forCsv && column.csvExportAttribute) {
        value = this.getValueFromModel(model, column.csvExportAttribute);
      } else if (column.exportAttribute != null) {
        value = this.getValueFromModel(model, column.exportAttribute);
      } else {
        value = this.getValueFromModel(model, column.key);
      }
      if (options.forCsv && _.isArray(value)) {
        value = _.uniq(_.compact(value)).join(', ');
      } else if (_.isArray(value) || _.isObject(value)) {
        value = JSON.stringify(value);
      }
      if (_.isString(value) && options.forCsv) {
        value = value.replace(/\"/g, '""');
      }
      return value;
    };

    GridEdit.prototype.getModelColumnKeyAt = function (rowIndex, colIndexOrKey) {
      var columnKey, model, ref, ref1;
      model = this.getModelAt(rowIndex);
      columnKey = _.isNumber(colIndexOrKey) ? (ref = this.getColumns()) != null ? (ref1 = ref[colIndexOrKey]) != null ? ref1.key : void 0 : void 0 : colIndexOrKey;
      return [model, columnKey];
    };

    GridEdit.prototype.setValueOnModel = function (model, columnKey, value, saveOptions) {
      var attr, column, result;
      attr = columnKey;
      column = this.getColumn(columnKey);
      if (!(column != null && this.validateCell(model, column, value, saveOptions))) {
        return false;
      }
      result = _.isFunction(model.set) ? model.set(attr, value) : model[attr] = value;
      return result;
    };

    GridEdit.prototype.setValueAt = function (rowIndex, colIndexOrKey, value) {
      var columnKey, model, ref;
      ref = this.getModelColumnKeyAt(rowIndex, colIndexOrKey), model = ref[0], columnKey = ref[1];
      if (!(model != null && columnKey != null)) {
        return null;
      }
      return this.setValueOnModel(model, columnKey);
    };

    GridEdit.prototype.validateCell = function (model, column, value, saveOptions) {
      var i, len, ref, ref1, validation, validationErrors, validationResult;
      validationErrors = [];
      ref1 = (ref = column.validations) != null ? ref : [];
      for (i = 0, len = ref1.length; i < len; i++) {
        validation = ref1[i];
        validationResult = validation.apply(this, [model, column, value]);
        if (validationResult !== true) {
          validationErrors.push(validationResult);
        }
      }
      if (validationErrors.length > 0) {
        this.onModelSaveError(model, validationErrors, saveOptions);
        return false;
      }
      return true;
    };

    /*
      returns the options used when saving a backbone model
     */

    GridEdit.prototype.getModelSaveOptions = function () {
      return {
        success: function (_this) {
          return function () {
            return _this.onModelSaveSuccess.apply(_this, arguments);
          };
        }(this),
        error: function (_this) {
          return function () {
            return _this.onModelSaveError.apply(_this, arguments);
          };
        }(this)
      };
    };

    /*
    This method will log a batch of actions, relying on
    debounce to ensure the actions are collected properly.
     */

    GridEdit.prototype._logUndo = function (model, rowEvt, options) {
      if (options == null) {
        options = {};
      }
      if (!this.props.enableUndo) {
        return;
      }
      this.undo[this.undoIndex++] = this.constructor._batchUndoRequests;
      return this.constructor._batchUndoRequests = [];
    };

    GridEdit.prototype.resetUndo = function () {
      delete this.undo;
      this.undo = {};
      return this.undoIndex = 0;
    };

    /*
    This method will iterate over the properties of the @undo object
    and find the top-most item. Each property is an array of actions that
    occured within the same "batch" or "bucket". Once it finds the most recent
    batch, it will revert the operation by calling @saveModel.
     */

    GridEdit.prototype.doUndo = function () {
      var bucketKey, i, keys, len, operation, operations;
      keys = _.keys(this.undo);
      if (keys.length === 0) {
        return;
      }
      bucketKey = _.last(keys);
      operations = this.undo[bucketKey];
      for (i = 0, len = operations.length; i < len; i++) {
        operation = operations[i];
        this.clearCellErrors(operation.model, operation.attr);
        $.extend(true, operation.model.attributes, operation.revPatch);
        this.saveModel(operation.model, operation.rowEvt, {
          logUndo: false,
          setOnUpdate: false
        });
      }
      return delete this.undo[bucketKey];
    };

    GridEdit.prototype.logUndoDebounced = _.debounce(GridEdit.prototype._logUndo, GridEdit.LOG_UNDO_DEBOUNCE);

    /*
      rowEvt from react-data-grid looks like this:
      {  
        cellKey: "costing.wholesaleCost.amount"
        key: "Enter"
        rowIdx: 0
        updated: "24"
      }
     */

    GridEdit.prototype.saveModel = function (model, rowEvt, options) {
      var attr, base, isDirty, newValue, oldValue, ref, ref1, revPatch, saveOptions;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        logUndo: this.props.enableUndo,
        setOnUpdate: true
      });
      attr = (ref = rowEvt.attribute) != null ? ref : rowEvt.cellKey;
      oldValue = DeepGet(model._lastSyncAttributes, attr);
      newValue = ((ref1 = rowEvt.updated) != null ? ref1.toString().trim() : void 0) !== '' ? rowEvt.updated : null;
      if (!(oldValue || newValue)) {
        return;
      }
      if (oldValue === newValue) {
        return;
      }
      this.clearCellErrors(model, attr);
      saveOptions = this.getModelSaveOptions();
      saveOptions.__datagrid_rowEvt = rowEvt;
      if (!(this.props.setOnUpdate === false || options.setOnUpdate === false)) {
        if (!this.setValueOnModel(model, attr, newValue, saveOptions)) {
          return;
        }
      }
      revPatch = model.getReversePatchObject();
      if (options.logUndo !== false && oldValue !== newValue) {
        if ((base = this.constructor)._batchUndoRequests == null) {
          base._batchUndoRequests = [];
        }
        this.constructor._batchUndoRequests.push({
          model: model,
          attr: attr,
          revPatch: revPatch,
          rowEvt: rowEvt
        });
        this.logUndoDebounced.apply(this, arguments);
      }
      isDirty = _.isFunction(model.isDirty) ? model.isDirty() : true;
      if (this.props.saveOnUpdate !== false && isDirty) {
        this.setSaving(model, rowEvt.cellKey, true);
        return (model.patch || model.save)({}, saveOptions);
      }
    };

    GridEdit.prototype.clearCellErrors = function (model, columnKey) {
      if (_.isFunction(model.setDatagridSaveErrors)) {
        return model.setDatagridSaveErrors(columnKey, null);
      } else {
        if (model.__datagridSaveErrors == null) {
          model.__datagridSaveErrors = {};
        }
        if (columnKey != null) {
          return delete model.__datagridSaveErrors[columnKey];
        } else {
          return model.__datagridSaveErrors = {};
        }
      }
    };

    GridEdit.prototype.setSaveSuccess = function (model, attr, trueOrFalse) {
      if (_.isFunction(model.setDatagridSaveSuccess)) {
        return model.setDatagridSaveSuccess(attr, trueOrFalse);
      } else {
        if (model.__datagridSaveSuccess == null) {
          model.__datagridSaveSuccess = {};
        }
        return model.__datagridSaveSuccess[attr] = trueOrFalse;
      }
    };

    GridEdit.prototype.setSaveErrors = function (model, attr, resp) {
      if (_.isFunction(model.setDatagridSaveErrors)) {
        return model.setDatagridSaveErrors(attr, resp);
      } else {
        if (model.__datagridSaveErrors == null) {
          model.__datagridSaveErrors = {};
        }
        return model.__datagridSaveErrors[attr] = resp;
      }
    };

    GridEdit.prototype.setSaving = function (model, attr, trueOrFalse) {
      if (_.isFunction(model.setDatagridSaving)) {
        return model.setDatagridSaving(attr, trueOrFalse);
      } else {
        if (model.__datagridSaving == null) {
          model.__datagridSaving = {};
        }
        return model.__datagridSaving[attr] = trueOrFalse;
      }
    };

    GridEdit.prototype.onModelSaveSuccess = function (model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        this.setSaveSuccess(model, rowEvt.cellKey, true);
        this.clearCellErrors(model);
      }
      return this.onModelSaveComplete(model, resp, options);
    };

    GridEdit.prototype.onModelSaveError = function (model, resp, options) {
      var rowEvt;
      if (!this.props.silentSaveErrors) {
        throw "Unable to save changes<br><br>" + JSON.stringify(resp);
      }
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt != null) {
        this.setSaveErrors(model, rowEvt.cellKey, resp);
      }
      return this.onModelSaveComplete(model, resp, options);
    };

    GridEdit.prototype.onModelSaveComplete = function (model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        return this.setSaving(model, rowEvt.cellKey, false);
      }
    };

    return GridEdit;
  }();
}).call(undefined);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  gets the value of a nested member of an object.

  example:
  <code>
    |  var data = {
    |     sayulita: {
    |       fun: true,
    |       surf: true,
    |       weather: {
    |         high: 90,
    |         low: function(){ return 70; }
    |       }
    |     }
    |   }
    |  deepGet(data, 'weather.high')   # will return 90
  </code>

  There is no limit to the depth, also functions may be employed anywhere along the path if isFunctional is not set to disabled
  From the former example:
  <code>
    |  deepGet(data, 'weather.low')   # will call the function associated with 'low' which returns 70
  </code>

  see /app/coffeescripts/tests/application/utils/deepGetAndSet.coffee for more examples and tests
 */

(function () {
  var _deepGet;

  module.exports = _deepGet = function deepGet(object, pathToAttribute, isFunctional) {
    var current, i, len, part, ref, ref1;
    if (isFunctional == null) {
      isFunctional = true;
    }
    current = object;
    ref = pathToAttribute.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
      part = ref[i];
      if (isFunctional && _.isFunction(current[part])) {
        current = current[part]();
      } else if (isFunctional && _.isFunction(current["get" + part.capitalize()])) {
        current = current["get" + part.capitalize()]();
      } else if (((ref1 = current['attributes']) != null ? ref1[part] : void 0) != null) {
        current = current['attributes'][part];
      } else if (_.isArray(current)) {
        current = _.map(current, function (currentEntity) {
          if (currentEntity != null) {
            return _deepGet(currentEntity, part, isFunctional);
          } else {
            return currentEntity;
          }
        });
      } else {
        current = current[part];
      }
      if (current == null) {
        break;
      }
    }
    return current;
  };
}).call(undefined);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      CompareObjects,
      CopyPasteFromExcel,
      GridSelect,
      ReactDOM,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  ReactDOM = __webpack_require__(5);

  $ = __webpack_require__(2);

  _ = __webpack_require__(0);

  CopyPasteFromExcel = __webpack_require__(30);

  CompareObjects = __webpack_require__(31);

  /*
    These are the selection methods available on react-datum-datagrid
    
    @selectedCells
      An array of objects with the following definition
        {
          col: string      # Defines the model attribute associated with this cell
          rowIdx: number   # Defines the row index of the model this row represents
          idx: number      # Defines the column index. Not probably too useful outside this mixin
        } 
        
    getSelectedCells() method is added to datagrid class being mixed into.  It returns an array 
      of the selected cells.  Array may be just one member -> the currently highlighted cell 
        
    A typical use case would be to check if @selectedCells.length > 0, if so, use that.
    Otherwise, you can use getSelectedCell() to see if the user has just focused on a specific
    cell instead of selecting a range.  
    
    Addtional Props:
      onSelectedCellsChange - called with (@selectedCells)
   */

  module.exports = GridSelect = function () {
    function GridSelect() {
      this.__onDocumentMouseMove = bind(this.__onDocumentMouseMove, this);
      this.__onDocumentMouseUp = bind(this.__onDocumentMouseUp, this);
      this.__onDocumentKeyDown = bind(this.__onDocumentKeyDown, this);
      this.__onDocumentMouseDown = bind(this.__onDocumentMouseDown, this);
      this.__onDocumentPaste = bind(this.__onDocumentPaste, this);
      this.__onDocumentCopy = bind(this.__onDocumentCopy, this);
      this.__unbindEvents = bind(this.__unbindEvents, this);
      this.__bindEvents = bind(this.__bindEvents, this);
      this.isCellSelected = bind(this.isCellSelected, this);
      this.onCollectionReset = bind(this.onCollectionReset, this);
    }

    GridSelect.prototype.DOUBLE_CLICK_INTERVAL = 600;

    GridSelect.prototype.copyPasteHelper = new CopyPasteFromExcel();

    GridSelect.prototype.shouldEdit = false;

    GridSelect.prototype.selectedCells = [];

    GridSelect.prototype.modelKeyIndex = [];

    GridSelect.prototype.startSelPosition = null;

    GridSelect.prototype.endSelPosition = null;

    GridSelect.prototype.componentDidMount = function () {
      var ref, ref1, wrap;
      if (typeof this.originalMethod === "function") {
        this.originalMethod();
      }
      this.__bindEvents();
      wrap = function (_this) {
        return function (fn) {
          return function () {
            if (!_this.shouldEdit) {
              return false;
            }
            return fn.apply(_this.refs.reactDataGrid, arguments);
          };
        };
      }(this);
      return (ref = this.refs.reactDataGrid) != null ? ref.canEdit = wrap((ref1 = this.refs.reactDataGrid) != null ? ref1.canEdit : void 0) : void 0;
    };

    GridSelect.prototype.componentWillUnmount = function () {
      if (typeof this.originalMethod === "function") {
        this.originalMethod();
      }
      return this.__unbindEvents();
    };

    GridSelect.prototype.onCollectionReset = function () {
      this.resetSelectedCells();
      return typeof this.originalMethod === "function" ? this.originalMethod() : void 0;
    };

    GridSelect.prototype.getContainerStyle = function () {
      var ref, style;
      style = (ref = typeof this.originalMethod === "function" ? this.originalMethod() : void 0) != null ? ref : this.props.style;
      style.userSelect = 'none';
      return style;
    };

    GridSelect.prototype._getCellsBetween = function (startRow, startCol, endRow, endCol) {
      var cols, deltaX, deltaY, i, j, modifierX, modifierY, ref, ref1, result, rows;
      result = [];
      deltaX = endRow - startRow;
      deltaY = endCol - startCol;
      modifierX = deltaX < 0 ? -1 : 1;
      modifierY = deltaY < 0 ? -1 : 1;
      for (rows = i = 0, ref = Math.abs(deltaX); 0 <= ref ? i <= ref : i >= ref; rows = 0 <= ref ? ++i : --i) {
        for (cols = j = 0, ref1 = Math.abs(deltaY); 0 <= ref1 ? j <= ref1 : j >= ref1; cols = 0 <= ref1 ? ++j : --j) {
          result.push({
            rowIdx: startRow + rows * modifierX,
            col: this.modelKeyIndex[startCol + cols * modifierY],
            idx: startCol + cols * modifierY
          });
        }
      }
      return result;
    };

    GridSelect.prototype.getSelectedCell = function () {
      if (this.originalMethod == null) {
        throw "The grid component that has GridSelect mixin must implement getSelectedCell()";
      }
      return this.originalMethod.apply(this, arguments);
    };

    GridSelect.prototype.setSelectedCell = function (rowIndex, colIndex) {
      if (this.originalMethod == null) {
        throw "The grid component that has GridSelect mixin must implement setSelectedCell()";
      }
      return this.originalMethod.apply(this, arguments);
    };

    GridSelect.prototype.unsetSelectedCell = function () {
      if (this.originalMethod == null) {
        throw "The grid component that has GridSelect mixin must implement unsetSelectedCell()";
      }
      return this.originalMethod.apply(this, arguments);
    };

    GridSelect.prototype.getSelectedColumn = function () {
      var colIndex, ref;
      colIndex = (ref = this.getSelectedCell()) != null ? ref.idx : void 0;
      if (colIndex == null) {
        return null;
      }
      return this.getColumn(colIndex);
    };

    GridSelect.prototype.resetSelectedCells = function () {
      var cell, collection, i, len, ref, selectedCells;
      collection = this.getCollection();
      if (collection != null) {
        if (typeof collection.selectNone === "function") {
          collection.selectNone();
        }
      }
      selectedCells = this.selectedCells;
      this.selectedCells = [];
      for (i = 0, len = selectedCells.length; i < len; i++) {
        cell = selectedCells[i];
        if ((ref = this.getModelAt(cell.rowIdx)) != null) {
          if (typeof ref.trigger === "function") {
            ref.trigger('invalidate');
          }
        }
      }
      return _.defer(function (_this) {
        return function () {
          var highlightedCell;
          highlightedCell = _this.getSelectedCell();
          if (highlightedCell != null) {
            return collection != null ? typeof collection.selectModelByIndex === "function" ? collection.selectModelByIndex(highlightedCell.rowIdx) : void 0 : void 0;
          }
        };
      }(this));
    };

    GridSelect.prototype.selectCells = function (cells, options) {
      var base, cell, i, len;
      if (options == null) {
        options = {};
      }
      this.resetSelectedCells();
      for (i = 0, len = cells.length; i < len; i++) {
        cell = cells[i];
        this.selectCell(cell.rowIdx, cell.col, options);
      }
      return typeof (base = this.props).onSelectedCellsChange === "function" ? base.onSelectedCellsChange(this.selectedCells) : void 0;
    };

    GridSelect.prototype.selectCell = function (rowIdx, colKey, options) {
      var cell, ref, rowModel;
      if (options == null) {
        options = {};
      }
      if (rowIdx < 0 || this.modelKeyIndex.indexOf(colKey) < 0) {
        return;
      }
      rowModel = this.getModelAt(rowIdx);
      cell = {
        rowIdx: rowIdx,
        col: colKey,
        idx: this.modelKeyIndex.indexOf(colKey)
      };
      if (!this.isCellSelected(rowIdx, colKey)) {
        this.selectedCells.push(cell);
      }
      if (typeof this.getCollection === "function") {
        if ((ref = this.getCollection()) != null) {
          if (typeof ref.selectModel === "function") {
            ref.selectModel(rowModel, true, options);
          }
        }
      }
      if (!options.silent) {
        return _.defer(function (_this) {
          return function () {
            return rowModel.trigger('invalidate');
          };
        }(this));
      }
    };

    GridSelect.prototype.selectCurrentCell = function () {
      var col, highlightedCell, ref;
      highlightedCell = this.getSelectedCell();
      col = (ref = this.getSelectedColumn()) != null ? ref.key : void 0;
      if (!(highlightedCell != null && col != null)) {
        return;
      }
      return this.selectCell(highlightedCell.rowIdx, col);
    };

    GridSelect.prototype.isCellSelected = function (row, colKey) {
      return _.any(this.selectedCells, function (cell) {
        return cell.rowIdx === row && cell.col === colKey;
      });
    };

    GridSelect.prototype.deselectCell = function (rowIdx, colKey) {
      var ref, rowModel;
      rowModel = this.getModelAt(rowIdx);
      this.selectedCells = _.filter(this.selectedCells, function (cell) {
        return !(cell.rowIdx === rowIdx && cell.col === colKey);
      });
      return typeof this.getCollection === "function" ? (ref = this.getCollection()) != null ? typeof ref.selectModel === "function" ? ref.selectModel(rowModel, false) : void 0 : void 0 : void 0;
    };

    /*
      returns an array of selectedCells.  May be array of one - the highlighted cell
     */

    GridSelect.prototype.getSelectedCells = function () {
      var highlightedCell, ref, ref1;
      if (!(((ref = this.selectedCells) != null ? ref.length : void 0) > 0)) {
        highlightedCell = this.getSelectedCell();
        if (highlightedCell == null) {
          return [];
        }
        highlightedCell.col = (ref1 = this.getSelectedColumn()) != null ? ref1.key : void 0;
        return [highlightedCell];
      }
      return this.selectedCells;
    };

    GridSelect.prototype._updateModelKeyIndex = function () {
      return this.modelKeyIndex = _.map(this.getColumns(), function (col) {
        return col.key;
      });
    };

    GridSelect.prototype._getPositionByElement = function (el) {
      var $cell, columnKey, idx, rowIdx;
      $cell = $(el).closest('.datagrid-cell');
      if (!($cell.length > 0)) {
        return null;
      }
      columnKey = $cell.attr("data-attr-col");
      rowIdx = parseInt($cell.attr("data-attr-row"));
      idx = this.modelKeyIndex.indexOf(columnKey);
      return {
        rowIdx: rowIdx,
        col: columnKey,
        idx: idx
      };
    };

    GridSelect.prototype._getUpperLeftBound = function (cells) {
      var left, top;
      if (cells == null) {
        cells = this.selectedCells;
      }
      if (this.selectedCells == null) {
        return [];
      }
      top = _.min(cells, function (cell) {
        return cell.rowIdx;
      });
      cells = _.filter(cells, function (cell) {
        return cell.rowIdx === top.rowIdx;
      });
      left = _.min(cells, function (cell) {
        return cell.idx;
      });
      return {
        top: top.rowIdx,
        left: left.idx
      };
    };

    GridSelect.prototype._getLowerRightBound = function (cells) {
      var bottom, right;
      if (cells == null) {
        cells = this.selectedCells;
      }
      if (this.selectedCells == null) {
        return [];
      }
      bottom = _.max(cells, function (cell) {
        return cell.rowIdx;
      });
      cells = _.filter(cells, function (cell) {
        return cell.rowIdx === bottom.rowIdx;
      });
      right = _.max(cells, function (cell) {
        return cell.idx;
      });
      return {
        bottom: bottom.rowIdx,
        right: right.idx
      };
    };

    GridSelect.prototype.__bindEvents = function () {
      $(document).on('copy.GridSelect', function (_this) {
        return function (evt) {
          return _this.__onDocumentCopy(evt);
        };
      }(this));
      $(document).on('paste.GridSelect', function (_this) {
        return function (evt) {
          return _this.__onDocumentPaste(evt);
        };
      }(this));
      $(document).on('keydown.GridSelect', function (_this) {
        return function (evt) {
          return _this.__onDocumentKeyDown(evt);
        };
      }(this));
      $(document).on('mouseup.GridSelect', function (_this) {
        return function (evt) {
          return _this.__onDocumentMouseUp(evt);
        };
      }(this));
      $(document).on('mousedown.GridSelect', '.datagrid-cell', function (_this) {
        return function (evt) {
          return _this.__onDocumentMouseDown(evt);
        };
      }(this));
      return $(document).on('mousemove.GridSelect', '.datagrid-cell', function (_this) {
        return function (evt) {
          return _this.__onDocumentMouseMove(evt);
        };
      }(this));
    };

    GridSelect.prototype.__unbindEvents = function () {
      $(document).off('copy.GridSelect');
      $(document).off('paste.GridSelect');
      $(document).off('keydown.GridSelect');
      $(document).off('mouseup.GridSelect');
      $(document).off('mousedown.GridSelect');
      return $(document).off('mousemove.GridSelect');
    };

    GridSelect.prototype.__onDocumentCopy = function (e) {
      var cell, cells, cellsInRow, i, j, len, len1, ref, result, row, rowModel, rows, vals;
      if ($(e.target).closest('.datagrid-cell.editing').length > 0) {
        return;
      }
      result = [];
      cells = this.getSelectedCells();
      rows = _.uniq(_.map(cells, function (cell) {
        return cell.rowIdx;
      }));
      for (i = 0, len = rows.length; i < len; i++) {
        row = rows[i];
        rowModel = this.getModelAt(row);
        if (rowModel == null) {
          continue;
        }
        cellsInRow = _.filter(cells, function (cell) {
          return cell.rowIdx === row;
        });
        cellsInRow = _.sortBy(cellsInRow, 'idx');
        vals = [];
        ref = _.filter(cellsInRow, function (cell) {
          return cell != null;
        });
        for (j = 0, len1 = ref.length; j < len1; j++) {
          cell = ref[j];
          vals.push(this.getExportValue(rowModel, this.getColumn(cell.col)));
        }
        result.push(vals.join("\t"));
      }
      e.originalEvent.clipboardData.setData('text/plain', result.join("\n"));
      e.stopPropagation();
      return e.preventDefault();
    };

    GridSelect.prototype.__onDocumentPaste = function (e) {
      var $activeEl, cell, cellIdx, cellsInRow, highlightedCell, i, j, k, l, len, m, paste, pasteRow, ref, ref1, ref2, ref3, ref4, ref5, ref6, rowIdx, rowModel, start;
      paste = this.copyPasteHelper.processPaste(e);
      $activeEl = $(document.activeElement);
      if ($($activeEl).closest('.datagrid-cell.editing').length > 0 || $($activeEl).is('input,textarea')) {
        return;
      }
      if (!Array.isArray(paste) && paste.indexOf('\t') >= 0) {
        paste = [paste.split('\t')];
      }
      if (Array.isArray(paste)) {
        if (this.selectedCells.length > 0) {
          start = this._getUpperLeftBound();
          for (rowIdx = i = ref = start.top, ref1 = start.top + paste.length - 1; ref <= ref1 ? i <= ref1 : i >= ref1; rowIdx = ref <= ref1 ? ++i : --i) {
            cellsInRow = _.filter(this.selectedCells, function (cell) {
              return cell != null && cell.rowIdx === rowIdx;
            });
            cellsInRow = _.sortBy(cellsInRow, 'idx');
            if (cellsInRow.length === 0) {
              continue;
            }
            pasteRow = paste[rowIdx - start.top];
            if (!Array.isArray(pasteRow)) {
              pasteRow = [pasteRow];
            }
            rowModel = this.getModelAt(rowIdx);
            for (cellIdx = j = 0, ref2 = pasteRow.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; cellIdx = 0 <= ref2 ? ++j : --j) {
              if (cellIdx >= cellsInRow.length) {
                continue;
              }
              this.__updateRowModelColumn(rowIdx, rowModel, cellsInRow[cellIdx].col, pasteRow[cellIdx]);
            }
          }
        } else {
          highlightedCell = this.getSelectedCell();
          if (highlightedCell != null) {
            start = {
              top: highlightedCell.rowIdx,
              left: highlightedCell.idx
            };
            for (rowIdx = k = ref3 = start.top, ref4 = start.top + paste.length - 1; ref3 <= ref4 ? k <= ref4 : k >= ref4; rowIdx = ref3 <= ref4 ? ++k : --k) {
              pasteRow = paste[rowIdx - start.top];
              if (!_.isArray(pasteRow)) {
                pasteRow = [pasteRow];
              }
              rowModel = this.getModelAt(rowIdx);
              for (cellIdx = l = 0, ref5 = pasteRow.length - 1; 0 <= ref5 ? l <= ref5 : l >= ref5; cellIdx = 0 <= ref5 ? ++l : --l) {
                this.__updateRowModelColumn(rowIdx, rowModel, this.modelKeyIndex[start.left + cellIdx], pasteRow[cellIdx]);
              }
            }
          }
        }
      } else {
        ref6 = this.getSelectedCells();
        for (m = 0, len = ref6.length; m < len; m++) {
          cell = ref6[m];
          rowModel = this.getModelAt(cell.rowIdx);
          this.__updateRowModelColumn(cell.rowIdx, rowModel, cell.col, paste);
        }
      }
      e.stopPropagation();
      return e.preventDefault();
    };

    GridSelect.prototype.__onDocumentMouseDown = function (evt) {
      var el, thisClickPosition, thisClickTick;
      el = $(evt.target);
      if (el.closest('.datagrid-cell.editing').length > 0 || !this.__isInOurDatagrid(el)) {
        return;
      }
      if (el.hasClass("fa-pencil")) {
        this.__startEdit();
        return;
      }
      this._updateModelKeyIndex();
      thisClickPosition = this._getPositionByElement(el);
      if (thisClickPosition == null) {
        return;
      }
      thisClickTick = Date.now();
      if (thisClickTick - this.lastClickTick < this.DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, this.lastClickedPosition)) {
        this.__startEdit();
        return;
      }
      this.lastClickedPosition = thisClickPosition;
      this.lastClickTick = thisClickTick;
      if (thisClickPosition != null) {
        this.setSelectedCell(thisClickPosition.rowIdx, thisClickPosition.idx);
      }
      this.shouldEdit = false;
      this.startKeySelPosition = null;
      if (evt.shiftKey) {
        return _.defer(function (_this) {
          return function () {
            return _this.__shiftKeyClickSelect(thisClickPosition);
          };
        }(this));
      } else {
        return this.startSelPosition = thisClickPosition;
      }
    };

    GridSelect.prototype.__onDocumentKeyDown = function (evt) {
      var i, keyCode, results;
      if (!this.__isInOurDatagrid(evt.target)) {
        return;
      }
      keyCode = evt.keyCode;
      switch (false) {
        case !((keyCode === 13 || keyCode === 32 || keyCode === 110 || indexOf.call(function () {
          results = [];
          for (i = 48; i <= 90; i++) {
            results.push(i);
          }
          return results;
        }.apply(this), keyCode) >= 0) && !(evt.ctrlKey || evt.metaKey)):
          return this.__startEdit();
        case keyCode !== 27:
          return this.resetSelectedCells();
        case keyCode !== 37 && keyCode !== 38 && keyCode !== 39 && keyCode !== 40:
          if (evt.shiftKey) {
            this.selectCurrentCell();
            if (this.startKeySelPosition == null) {
              this.startKeySelPosition = this.getSelectedCell();
            }
            return _.defer(function (_this) {
              return function () {
                var cells, endCell;
                if (_this.startKeySelPosition == null) {
                  return;
                }
                endCell = _this.getSelectedCell();
                cells = _this._getCellsBetween(_this.startKeySelPosition.rowIdx, _this.startKeySelPosition.idx, endCell.rowIdx, endCell.idx);
                return _this.selectCells(cells);
              };
            }(this));
          } else {
            this.startKeySelPosition = null;
            this.resetSelectedCells();
            return _.defer(function (_this) {
              return function () {
                return _this.selectCurrentCell();
              };
            }(this));
          }
      }
    };

    GridSelect.prototype.__onDocumentMouseUp = function (evt) {
      var el, isSelectColumn, rowModel, sameCellAsOrigin;
      el = $(evt.target);
      if (el.closest('.datagrid-cell.editing').length > 0) {
        return;
      }
      if (el.closest('.widgets-react-datagrid').length > 0 && !evt.shiftKey) {
        if (this.startSelPosition != null) {
          this.endSelPosition = this._getPositionByElement(el);
          if (this.endSelPosition == null) {
            this.startSelPosition = null;
            return;
          }
          sameCellAsOrigin = this.endSelPosition.rowIdx === this.startSelPosition.rowIdx && this.endSelPosition.col === this.startSelPosition.col;
          isSelectColumn = el.closest('.datagrid-cell.selected-column').length > 0;
          rowModel = this.getModelAt(this.endSelPosition.rowIdx);
          if (evt.metaKey || evt.ctrKey || isSelectColumn) {
            if (sameCellAsOrigin) {
              if (this.isCellSelected(this.endSelPosition.rowIdx, this.endSelPosition.col) || isSelectColumn && rowModel.selected) {
                this.deselectCell(this.endSelPosition.rowIdx, this.endSelPosition.col);
              } else {
                this.selectCell(this.endSelPosition.rowIdx, this.endSelPosition.col);
              }
            }
          } else if (sameCellAsOrigin) {
            this.resetSelectedCells();
            _.defer(function (_this) {
              return function () {
                return _this.selectCurrentCell();
              };
            }(this));
          }
        } else {
          this.resetSelectedCells();
          _.defer(function (_this) {
            return function () {
              return _this.selectCurrentCell();
            };
          }(this));
        }
      }
      return this.startSelPosition = null;
    };

    GridSelect.prototype.__onDocumentMouseMove = function (evt) {
      var cells, el;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.metaKey || evt.ctrKey || evt.shiftKey) {
        return;
      }
      el = $(evt.target);
      if (this.startSelPosition != null && el.hasClass("datagrid-cell")) {
        this.shouldEdit = false;
        this.endSelPosition = this._getPositionByElement(el);
        cells = this._getCellsBetween(this.startSelPosition.rowIdx, this.startSelPosition.idx, this.endSelPosition.rowIdx, this.endSelPosition.idx);
        return this.selectCells(cells);
      }
    };

    GridSelect.prototype.__startEdit = function () {
      this.startSelPosition = null;
      this.startKeySelPosition = null;
      this.resetSelectedCells();
      return this.shouldEdit = true;
    };

    GridSelect.prototype.__updateRowModelColumn = function (rowIndex, rowModel, columnKey, value) {
      var attribute, column, error, parsedJsonObj;
      if (rowModel == null) {
        return;
      }
      try {
        if (_.isString(value)) {
          parsedJsonObj = JSON.parse(value);
        }
      } catch (error) {}
      attribute = columnKey;
      column = this.getColumn(columnKey);
      if (this.canEditCell(column, rowModel)) {
        this.saveModel(rowModel, {
          cellKey: columnKey,
          rowIdx: rowIndex,
          updated: parsedJsonObj != null ? parsedJsonObj : value,
          key: "Paste"
        });
        return rowModel.trigger('invalidate');
      }
    };

    GridSelect.prototype.__isInOurDatagrid = function (element) {
      return $.contains(ReactDOM.findDOMNode(this), $(element)[0]);
    };

    GridSelect.prototype.__shiftKeyClickSelect = function (endSelPosition) {
      var cells, lowerRightSel, startingFrom, upperLeftSel;
      upperLeftSel = this._getUpperLeftBound();
      lowerRightSel = this._getLowerRightBound();
      startingFrom = endSelPosition.rowIdx <= upperLeftSel.top && endSelPosition.idx <= upperLeftSel.left ? {
        rowIdx: lowerRightSel.bottom,
        idx: lowerRightSel.right
      } : {
        rowIdx: upperLeftSel.top,
        idx: upperLeftSel.left
      };
      if (startingFrom.rowIdx != null && startingFrom.idx != null) {
        cells = this._getCellsBetween(startingFrom.rowIdx, startingFrom.idx, endSelPosition.rowIdx, endSelPosition.idx);
        return this.selectCells(cells);
      } else {
        return this.selectCurrentCell();
      }
    };

    return GridSelect;
  }();
}).call(undefined);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      CopyPasteFromExcel,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  $ = __webpack_require__(2);

  /*
   */

  module.exports = CopyPasteFromExcel = function () {
    function CopyPasteFromExcel() {
      this.processPaste = bind(this.processPaste, this);
    }

    CopyPasteFromExcel.prototype.getClipboardData = function (e) {
      var ref;
      return e.clipboardData || ((ref = e.originalEvent) != null ? ref.clipboardData : void 0) || window.clipboardData;
    };

    CopyPasteFromExcel.prototype.getExpectedColumnLength = function (array2d) {
      var i, len, max, row;
      if (!Array.isArray(array2d)) {
        return 0;
      }
      max = 1;
      for (i = 0, len = array2d.length; i < len; i++) {
        row = array2d[i];
        if (Array.isArray(row) && row.length > max) {
          max = row.length;
        }
      }
      return max;
    };

    CopyPasteFromExcel.prototype.removeQuotes = function (str) {
      var trimmed;
      if (str == null) {
        return str;
      }
      trimmed = $.trim(str);
      if (trimmed[0] === '\"' && trimmed[trimmed.length - 1] === '\"') {
        return trimmed.substr(trimmed.indexOf('\"') + 1, trimmed.lastIndexOf('\"') - 1);
      } else {
        return trimmed;
      }
    };

    /*
    This function will iterate over a 2d array and see if the first and last columns
    anywhere in the array have newline returns. Indicating an edge case we probably
    didn't reliably parse.
     */

    CopyPasteFromExcel.prototype.is2dArrayBroken = function (array2d) {
      var i, leftIsTextarea, len, rightIsTextarea, row;
      leftIsTextarea = false;
      rightIsTextarea = false;
      for (i = 0, len = array2d.length; i < len; i++) {
        row = array2d[i];
        if (row[0].indexOf('\n') >= 0) {
          leftIsTextarea = true;
        }
        if (row[row.length - 1].indexOf('\n') >= 0) {
          rightIsTextarea = true;
        }
      }
      return rightIsTextarea && leftIsTextarea;
    };

    /*
    This function will take a 2d array and uniform the columns for each row
    by finding the row with the most columns, and assuming that as the 'standard'
    column length. Then it iterates over each cell and creates new rows that have the
    standardized column length.
    
    If it encouters a row with a single value, it will collect all single values from
    that point on, until it finds a normal row, and then it will assum cell[0] in the normal
    row is also part of the broken cells it has collected. It will smartly merge the broken values and the cell[0]
    in the correct place.
    
    This fixes excel weirdness.
     */

    CopyPasteFromExcel.prototype.make2dArrayUniform = function (array2d) {
      var brokenStr, cell, cells, i, j, lastCell, len, len1, length, result, row, tempRow;
      length = this.getExpectedColumnLength(array2d);
      result = [];
      tempRow = [];
      brokenStr = '';
      if (length === 1) {
        return array2d;
      }
      for (i = 0, len = array2d.length; i < len; i++) {
        row = array2d[i];
        if (!Array.isArray(row)) {
          brokenStr += row + '\n';
        } else {
          if (brokenStr.length > 0) {
            if (tempRow.length > 0) {
              tempRow[tempRow.length - 1] += '\n' + brokenStr;
            } else if (result.length > 0) {
              cells = result[result.length - 1];
              lastCell = cells[cells.length - 1];
              if (lastCell.indexOf('\n') >= 0 || lastCell.indexOf('\"') >= 0) {
                cells[cells.length - 1] = this.removeQuotes(lastCell + '\n' + brokenStr);
              } else {
                tempRow.push(this.removeQuotes(brokenStr));
              }
            }
            brokenStr = '';
          }
          if (row.length + tempRow.length < length && tempRow.length > 0) {
            tempRow[tempRow.length - 1] = this.removeQuotes(tempRow[tempRow.length - 1] + '\n' + row.splice(0, 1));
          }
          if (tempRow.length > 0 && row.length + tempRow.length > length) {
            while (row.length + tempRow.length > length) {
              tempRow[tempRow.length - 1] = this.removeQuotes(tempRow[tempRow.length - 1] + '\n' + row.splice(0, 1));
            }
          }
          for (j = 0, len1 = row.length; j < len1; j++) {
            cell = row[j];
            tempRow.push(cell);
            if (tempRow.length >= length) {
              result.push(tempRow);
              tempRow = [];
            }
          }
        }
      }
      if (tempRow.length > 0) {
        result.push(tempRow);
      }
      return result;
    };

    /*
    If a single value is pasted, this will invoke @props.onPaste if available.
    Otherwise, it will convert the value into a 2-dimensional array and pass it to
    @props.onMultiPaste if available.
    
    It also passes the event along with, so you can e.stopPropagation() and e.preventDefault()
    further upstream if you want.
     */

    CopyPasteFromExcel.prototype.processPaste = function (e) {
      var arrText, clipboardData, i, len, rawText, ref, ref1, resultArray, row, splitChar;
      clipboardData = this.getClipboardData(e);
      rawText = clipboardData != null ? clipboardData.getData('text') : void 0;
      if (rawText == null) {
        return;
      }
      if (rawText.indexOf(String.fromCharCode(13)) >= 0) {
        arrText = rawText.split(String.fromCharCode(13));
      } else if (rawText.indexOf('\n') >= 0) {
        arrText = rawText.split('\n');
      } else {
        arrText = [rawText];
      }
      if (arrText.length > 1) {
        resultArray = [];
        if (((ref = arrText[0]) != null ? ref.indexOf('\t') : void 0) >= 0) {
          splitChar = '\t';
        } else if (((ref1 = arrText[0]) != null ? ref1.indexOf(',') : void 0) >= 0) {
          splitChar = ',';
        }
        for (i = 0, len = arrText.length; i < len; i++) {
          row = arrText[i];
          if (row.indexOf(splitChar) >= 0) {
            resultArray.push(row.split(splitChar));
          } else {
            resultArray.push(row);
          }
        }
        return this.make2dArrayUniform(resultArray);
      } else {
        return rawText;
      }
    };

    return CopyPasteFromExcel;
  }();
}).call(undefined);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var _compareObjects;

  module.exports = _compareObjects = function compareObjects(a, b) {
    var attr;
    if (a == null && b == null) {
      return true;
    }
    if (!(a != null && b != null)) {
      return false;
    }
    attr = null;
    for (attr in a) {
      if (typeof b[attr] === "undefined") {
        return false;
      }
    }
    for (attr in a) {
      if (a[attr]) {
        switch (_typeof(a[attr])) {
          case "object":
            if (!_compareObjects(a[attr], b[attr])) {
              return false;
            }
            break;
          case "function":
            if (typeof b[attr] === "undefined" || attr !== "equals" && a[attr].toString() !== b[attr].toString()) {
              return false;
            }
            break;
          default:
            if (a[attr] !== b[attr]) {
              return false;
            }
        }
      } else {
        if (b[attr]) {
          return false;
        }
      }
    }
    for (attr in b) {
      if (typeof a[attr] === "undefined") {
        return false;
      }
    }
    return true;
  };
}).call(undefined);

/***/ })
/******/ ]);
});