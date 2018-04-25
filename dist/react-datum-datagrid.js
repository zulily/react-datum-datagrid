(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("underscore"), require("react-dom"), require("react-datum"), require("react-bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "underscore", "react-dom", "react-datum", "react-bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["ReactDatumDatagrid"] = factory(require("react"), require("underscore"), require("react-dom"), require("react-datum"), require("react-bootstrap"));
	else
		root["ReactDatumDatagrid"] = factory(root["React"], root["_"], root["ReactDOM"], root["ReactDatum"], root["ReactBootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_93__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
  module.exports = __webpack_require__(73)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(76)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _react = __webpack_require__(2);

var React = _interopRequireWildcard(_react);

var _ScalingCellSizeAndPositionManager = __webpack_require__(46);

var _ScalingCellSizeAndPositionManager2 = _interopRequireDefault(_ScalingCellSizeAndPositionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var babelPluginFlowReactPropTypes_proptype_CellPosition = process.env.NODE_ENV === 'production' ? null : {
  columnIndex: __webpack_require__(0).number.isRequired,
  rowIndex: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellPosition', {
  value: babelPluginFlowReactPropTypes_proptype_CellPosition,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRendererParams = process.env.NODE_ENV === 'production' ? null : {
  columnIndex: __webpack_require__(0).number.isRequired,
  isScrolling: __webpack_require__(0).bool.isRequired,
  isVisible: __webpack_require__(0).bool.isRequired,
  key: __webpack_require__(0).string.isRequired,
  parent: __webpack_require__(0).object.isRequired,
  rowIndex: __webpack_require__(0).number.isRequired,
  style: __webpack_require__(0).object.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRendererParams', {
  value: babelPluginFlowReactPropTypes_proptype_CellRendererParams,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRenderer = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRenderer', {
  value: babelPluginFlowReactPropTypes_proptype_CellRenderer,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams = process.env.NODE_ENV === 'production' ? null : {
  cellCache: __webpack_require__(0).object.isRequired,
  cellRenderer: __webpack_require__(0).func.isRequired,
  columnSizeAndPositionManager: typeof _ScalingCellSizeAndPositionManager2.default === 'function' ? __webpack_require__(0).instanceOf(_ScalingCellSizeAndPositionManager2.default).isRequired : __webpack_require__(0).any.isRequired,
  columnStartIndex: __webpack_require__(0).number.isRequired,
  columnStopIndex: __webpack_require__(0).number.isRequired,
  deferredMeasurementCache: __webpack_require__(0).object,
  horizontalOffsetAdjustment: __webpack_require__(0).number.isRequired,
  isScrolling: __webpack_require__(0).bool.isRequired,
  parent: __webpack_require__(0).object.isRequired,
  rowSizeAndPositionManager: typeof _ScalingCellSizeAndPositionManager2.default === 'function' ? __webpack_require__(0).instanceOf(_ScalingCellSizeAndPositionManager2.default).isRequired : __webpack_require__(0).any.isRequired,
  rowStartIndex: __webpack_require__(0).number.isRequired,
  rowStopIndex: __webpack_require__(0).number.isRequired,
  scrollLeft: __webpack_require__(0).number.isRequired,
  scrollTop: __webpack_require__(0).number.isRequired,
  styleCache: __webpack_require__(0).object.isRequired,
  verticalOffsetAdjustment: __webpack_require__(0).number.isRequired,
  visibleColumnIndices: __webpack_require__(0).object.isRequired,
  visibleRowIndices: __webpack_require__(0).object.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams', {
  value: babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellRangeRenderer = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellRangeRenderer', {
  value: babelPluginFlowReactPropTypes_proptype_CellRangeRenderer,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellSizeGetter = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellSizeGetter', {
  value: babelPluginFlowReactPropTypes_proptype_CellSizeGetter,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_CellSize = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).oneOfType([__webpack_require__(0).func, __webpack_require__(0).number]);
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_CellSize', {
  value: babelPluginFlowReactPropTypes_proptype_CellSize,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_NoContentRenderer = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NoContentRenderer', {
  value: babelPluginFlowReactPropTypes_proptype_NoContentRenderer,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_Scroll = process.env.NODE_ENV === 'production' ? null : {
  clientHeight: __webpack_require__(0).number.isRequired,
  clientWidth: __webpack_require__(0).number.isRequired,
  scrollHeight: __webpack_require__(0).number.isRequired,
  scrollLeft: __webpack_require__(0).number.isRequired,
  scrollTop: __webpack_require__(0).number.isRequired,
  scrollWidth: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_Scroll', {
  value: babelPluginFlowReactPropTypes_proptype_Scroll,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange = process.env.NODE_ENV === 'production' ? null : {
  horizontal: __webpack_require__(0).bool.isRequired,
  vertical: __webpack_require__(0).bool.isRequired,
  size: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange', {
  value: babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_RenderedSection = process.env.NODE_ENV === 'production' ? null : {
  columnOverscanStartIndex: __webpack_require__(0).number.isRequired,
  columnOverscanStopIndex: __webpack_require__(0).number.isRequired,
  columnStartIndex: __webpack_require__(0).number.isRequired,
  columnStopIndex: __webpack_require__(0).number.isRequired,
  rowOverscanStartIndex: __webpack_require__(0).number.isRequired,
  rowOverscanStopIndex: __webpack_require__(0).number.isRequired,
  rowStartIndex: __webpack_require__(0).number.isRequired,
  rowStopIndex: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_RenderedSection', {
  value: babelPluginFlowReactPropTypes_proptype_RenderedSection,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams = process.env.NODE_ENV === 'production' ? null : {
  // One of SCROLL_DIRECTION_HORIZONTAL or SCROLL_DIRECTION_VERTICAL
  direction: __webpack_require__(0).oneOf(['horizontal', 'vertical']).isRequired,


  // One of SCROLL_DIRECTION_BACKWARD or SCROLL_DIRECTION_FORWARD
  scrollDirection: __webpack_require__(0).oneOf([-1, 1]).isRequired,


  // Number of rows or columns in the current axis
  cellCount: __webpack_require__(0).number.isRequired,


  // Maximum number of cells to over-render in either direction
  overscanCellsCount: __webpack_require__(0).number.isRequired,


  // Begin of range of visible cells
  startIndex: __webpack_require__(0).number.isRequired,


  // End of range of visible cells
  stopIndex: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams', {
  value: babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_OverscanIndices = process.env.NODE_ENV === 'production' ? null : {
  overscanStartIndex: __webpack_require__(0).number.isRequired,
  overscanStopIndex: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OverscanIndices', {
  value: babelPluginFlowReactPropTypes_proptype_OverscanIndices,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).func;
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter', {
  value: babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_Alignment = process.env.NODE_ENV === 'production' ? null : __webpack_require__(0).oneOf(['auto', 'end', 'start', 'center']);
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_Alignment', {
  value: babelPluginFlowReactPropTypes_proptype_Alignment,
  configurable: true
});
var babelPluginFlowReactPropTypes_proptype_VisibleCellRange = process.env.NODE_ENV === 'production' ? null : {
  start: __webpack_require__(0).number,
  stop: __webpack_require__(0).number
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_VisibleCellRange', {
  value: babelPluginFlowReactPropTypes_proptype_VisibleCellRange,
  configurable: true
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(4);
var ctx = __webpack_require__(52);
var hide = __webpack_require__(11);
var has = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(53);
var toPrimitive = __webpack_require__(33);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(56);
var defined = __webpack_require__(34);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(37)('wks');
var uid = __webpack_require__(20);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(55);
var enumBugKeys = __webpack_require__(38);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {



module.exports = __webpack_require__(83)


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(34);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(106);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_25__;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ }),
/* 27 */
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
/* 28 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(77);


/***/ }),
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Bstr,
      Cell,
      Classnames,
      PropTypes,
      React,
      ReactDatum,
      _,
      extend,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend1 = function extend1(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(2);

  ReactDatum = __webpack_require__(26);

  PropTypes = __webpack_require__(0);

  Classnames = __webpack_require__(31);

  Bstr = __webpack_require__(18);

  _ = __webpack_require__(5);

  extend = __webpack_require__(30);

  module.exports = Cell = function (superClass) {
    extend1(Cell, superClass);

    function Cell() {
      this.renderWrapped = bind(this.renderWrapped, this);
      return Cell.__super__.constructor.apply(this, arguments);
    }

    Cell.propTypes = {
      selected: PropTypes.bool,
      editing: PropTypes.bool,
      editable: PropTypes.bool,
      rowData: PropTypes.object,
      rowIndex: PropTypes.number,
      column: PropTypes.object,
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      value: PropTypes.any,
      onChange: PropTypes.func,
      onEdit: PropTypes.func,
      defaultCellStyle: PropTypes.object
    };

    Cell.prototype.componentDidUpdate = function (prevProps, prevState) {
      var ref, ref1;
      this.setDatumErrors();
      if (this.props.editing && !prevProps.editing) {
        return (ref = this.refs) != null ? (ref1 = ref.datum) != null ? ref1.focus() : void 0 : void 0;
      }
    };

    Cell.prototype.render = function () {
      var datumComponent, datumProps, ref, value;
      value = this.props.value;
      datumProps = _.extend({}, this.props.column.datumProps, {
        model: this.getModel(),
        attr: this.props.column.key,
        column: this.props.column,
        ref: 'datum',
        inputMode: this.props.editing ? 'edit' : 'readonly',
        stateless: true,
        value: value,
        onChange: this.props.onChange
      });
      datumProps = _.defaults(datumProps, {
        rbOverlayProps: {
          trigger: ['hover', 'focus', 'click'],
          placement: 'top'
        }
      });
      datumComponent = (ref = this.props.column.datum) != null ? ref : ReactDatum.Text;
      value = React.createElement(datumComponent, datumProps);
      return this.renderWrapped(value);
    };

    Cell.prototype.renderWrapped = function (value, options) {
      var wrapperStyle;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        title: null,
        wrapperStyle: {}
      });
      wrapperStyle = extend(true, {}, options.wrapperStyle, this.getCellStyle());
      return React.createElement("div", {
        "data-attr-row": this.props.rowIndex,
        "data-attr-col": this.props.column.key,
        "className": this.getCellClass(),
        "title": options.title,
        "style": wrapperStyle
      }, value);
    };

    Cell.prototype.getModel = function () {
      return this.props.rowData;
    };

    Cell.prototype.getCellClass = function () {
      var model, ref;
      model = this.getModel();
      return Classnames('rdd-cell', "rdd-" + Bstr.dasherize(this.props.column.key) + "-column no-help-icon", this.getAdditionalElementClasses(), {
        'rdd-cell-error': ((ref = this.getDatagridSaveErrors()) != null ? ref.length : void 0) > 0
      }, {
        'rdd-cell-saved': this.getDatagridSaveSuccess() === true
      }, {
        'rdd-editable': this.props.editable
      }, {
        'rdd-selected': this.props.selected
      });
    };

    Cell.prototype.getCellStyle = function () {
      var model;
      model = this.getModel();
      return extend(true, {}, this.getCellDefaultStyle(model), this.props.column.cellStyle, this.getCellOverrideStyle(model));
    };

    Cell.prototype.getCellDefaultStyle = function (model) {
      var cellStyle, ref;
      cellStyle = _.extend({}, (ref = this.props.defaultCellStyle) != null ? ref : {});
      if (this.props.column.rightAlign) {
        cellStyle.textAlign = 'right';
        cellStyle.paddingRight = 10;
      } else {
        cellStyle.padding = 5;
        cellStyle.margin = 0;
      }
      return cellStyle;
    };

    Cell.prototype.getCellOverrideStyle = function (model) {
      return {};
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

    Cell.prototype.setDatumErrors = function () {
      var base, model, ref, saveErrorResp;
      model = this.getModel();
      if (model == null) {
        return;
      }
      saveErrorResp = this.getDatagridSaveErrors();
      if ((saveErrorResp != null ? saveErrorResp.length : void 0) > 0) {
        if (this.refs.datum != null) {
          if (typeof (base = this.refs.datum).clearErrors === "function") {
            base.clearErrors();
          }
          this.refs.datum.onModelSaveError(this.getModel(), saveErrorResp);
        }
      }
      if (this.getDatagridSaveSuccess()) {
        if ((ref = this.refs.datum) != null) {
          if (typeof ref.clearErrors === "function") {
            ref.clearErrors();
          }
        }
        return this.setDatagridSaveSuccess(false);
      }
    };

    Cell.prototype.focusInput = function () {
      var ref;
      if (this.props.editing) {
        return (ref = this.refs.datum) != null ? ref.focus() : void 0;
      }
    };

    return Cell;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(37)('keys');
var uid = __webpack_require__(20);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(16);
var dPs = __webpack_require__(114);
var enumBugKeys = __webpack_require__(38);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(54)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(115).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(15)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(15);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(40);
var wksExt = __webpack_require__(44);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = __webpack_require__(138);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = __webpack_require__(23);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(24);

var _createClass3 = _interopRequireDefault(_createClass2);

var _CellSizeAndPositionManager = __webpack_require__(139);

var _CellSizeAndPositionManager2 = _interopRequireDefault(_CellSizeAndPositionManager);

var _maxElementSize = __webpack_require__(140);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_VisibleCellRange = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_VisibleCellRange || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellSizeGetter = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellSizeGetter || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_Alignment = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_Alignment || __webpack_require__(0).any;

/**
 * Extends CellSizeAndPositionManager and adds scaling behavior for lists that are too large to fit within a browser's native limits.
 */


/**
 * Browsers have scroll offset limitations (eg Chrome stops scrolling at ~33.5M pixels where as Edge tops out at ~1.5M pixels).
 * After a certain position, the browser won't allow the user to scroll further (even via JavaScript scroll offset adjustments).
 * This util picks a lower ceiling for max size and artificially adjusts positions within to make it transparent for users.
 */

var ScalingCellSizeAndPositionManager = function () {
  function ScalingCellSizeAndPositionManager(_ref) {
    var _ref$maxScrollSize = _ref.maxScrollSize,
        maxScrollSize = _ref$maxScrollSize === undefined ? (0, _maxElementSize.getMaxElementSize)() : _ref$maxScrollSize,
        params = (0, _objectWithoutProperties3.default)(_ref, ['maxScrollSize']);
    (0, _classCallCheck3.default)(this, ScalingCellSizeAndPositionManager);

    // Favor composition over inheritance to simplify IE10 support
    this._cellSizeAndPositionManager = new _CellSizeAndPositionManager2.default(params);
    this._maxScrollSize = maxScrollSize;
  }

  (0, _createClass3.default)(ScalingCellSizeAndPositionManager, [{
    key: 'areOffsetsAdjusted',
    value: function areOffsetsAdjusted() {
      return this._cellSizeAndPositionManager.getTotalSize() > this._maxScrollSize;
    }
  }, {
    key: 'configure',
    value: function configure(params) {
      this._cellSizeAndPositionManager.configure(params);
    }
  }, {
    key: 'getCellCount',
    value: function getCellCount() {
      return this._cellSizeAndPositionManager.getCellCount();
    }
  }, {
    key: 'getEstimatedCellSize',
    value: function getEstimatedCellSize() {
      return this._cellSizeAndPositionManager.getEstimatedCellSize();
    }
  }, {
    key: 'getLastMeasuredIndex',
    value: function getLastMeasuredIndex() {
      return this._cellSizeAndPositionManager.getLastMeasuredIndex();
    }

    /**
     * Number of pixels a cell at the given position (offset) should be shifted in order to fit within the scaled container.
     * The offset passed to this function is scaled (safe) as well.
     */

  }, {
    key: 'getOffsetAdjustment',
    value: function getOffsetAdjustment(_ref2) {
      var containerSize = _ref2.containerSize,
          offset = _ref2.offset;

      var totalSize = this._cellSizeAndPositionManager.getTotalSize();
      var safeTotalSize = this.getTotalSize();
      var offsetPercentage = this._getOffsetPercentage({
        containerSize: containerSize,
        offset: offset,
        totalSize: safeTotalSize
      });

      return Math.round(offsetPercentage * (safeTotalSize - totalSize));
    }
  }, {
    key: 'getSizeAndPositionOfCell',
    value: function getSizeAndPositionOfCell(index) {
      return this._cellSizeAndPositionManager.getSizeAndPositionOfCell(index);
    }
  }, {
    key: 'getSizeAndPositionOfLastMeasuredCell',
    value: function getSizeAndPositionOfLastMeasuredCell() {
      return this._cellSizeAndPositionManager.getSizeAndPositionOfLastMeasuredCell();
    }

    /** See CellSizeAndPositionManager#getTotalSize */

  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      return Math.min(this._maxScrollSize, this._cellSizeAndPositionManager.getTotalSize());
    }

    /** See CellSizeAndPositionManager#getUpdatedOffsetForIndex */

  }, {
    key: 'getUpdatedOffsetForIndex',
    value: function getUpdatedOffsetForIndex(_ref3) {
      var _ref3$align = _ref3.align,
          align = _ref3$align === undefined ? 'auto' : _ref3$align,
          containerSize = _ref3.containerSize,
          currentOffset = _ref3.currentOffset,
          targetIndex = _ref3.targetIndex;

      currentOffset = this._safeOffsetToOffset({
        containerSize: containerSize,
        offset: currentOffset
      });

      var offset = this._cellSizeAndPositionManager.getUpdatedOffsetForIndex({
        align: align,
        containerSize: containerSize,
        currentOffset: currentOffset,
        targetIndex: targetIndex
      });

      return this._offsetToSafeOffset({
        containerSize: containerSize,
        offset: offset
      });
    }

    /** See CellSizeAndPositionManager#getVisibleCellRange */

  }, {
    key: 'getVisibleCellRange',
    value: function getVisibleCellRange(_ref4) {
      var containerSize = _ref4.containerSize,
          offset = _ref4.offset;

      offset = this._safeOffsetToOffset({
        containerSize: containerSize,
        offset: offset
      });

      return this._cellSizeAndPositionManager.getVisibleCellRange({
        containerSize: containerSize,
        offset: offset
      });
    }
  }, {
    key: 'resetCell',
    value: function resetCell(index) {
      this._cellSizeAndPositionManager.resetCell(index);
    }
  }, {
    key: '_getOffsetPercentage',
    value: function _getOffsetPercentage(_ref5) {
      var containerSize = _ref5.containerSize,
          offset = _ref5.offset,
          totalSize = _ref5.totalSize;

      return totalSize <= containerSize ? 0 : offset / (totalSize - containerSize);
    }
  }, {
    key: '_offsetToSafeOffset',
    value: function _offsetToSafeOffset(_ref6) {
      var containerSize = _ref6.containerSize,
          offset = _ref6.offset;

      var totalSize = this._cellSizeAndPositionManager.getTotalSize();
      var safeTotalSize = this.getTotalSize();

      if (totalSize === safeTotalSize) {
        return offset;
      } else {
        var offsetPercentage = this._getOffsetPercentage({
          containerSize: containerSize,
          offset: offset,
          totalSize: totalSize
        });

        return Math.round(offsetPercentage * (safeTotalSize - containerSize));
      }
    }
  }, {
    key: '_safeOffsetToOffset',
    value: function _safeOffsetToOffset(_ref7) {
      var containerSize = _ref7.containerSize,
          offset = _ref7.offset;

      var totalSize = this._cellSizeAndPositionManager.getTotalSize();
      var safeTotalSize = this.getTotalSize();

      if (totalSize === safeTotalSize) {
        return offset;
      } else {
        var offsetPercentage = this._getOffsetPercentage({
          containerSize: containerSize,
          offset: offset,
          totalSize: safeTotalSize
        });

        return Math.round(offsetPercentage * (totalSize - containerSize));
      }
    }
  }]);
  return ScalingCellSizeAndPositionManager;
}();

exports.default = ScalingCellSizeAndPositionManager;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(27);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var DeepSet,
      ReactStyles,
      _,
      slice = [].slice;

  _ = __webpack_require__(5);

  DeepSet = __webpack_require__(80);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var React,
      SavingIndicator,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(2);

  module.exports = SavingIndicator = function (superClass) {
    extend(SavingIndicator, superClass);

    function SavingIndicator() {
      return SavingIndicator.__super__.constructor.apply(this, arguments);
    }

    SavingIndicator.prototype.render = function () {
      return React.createElement("div", {
        "className": 'rdd-saving-indicator',
        "title": "cell is saving updates..."
      }, React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 512.333 512"
      }, React.createElement("path", {
        "d": "M440.935 12.574l3.966 82.766C399.416 41.904 331.674 8 256 8 134.813 8 33.933 94.924 12.296 209.824 10.908 217.193 16.604 224 24.103 224h49.084c5.57 0 10.377-3.842 11.676-9.259C103.407 137.408 172.931 80 256 80c60.893 0 114.512 30.856 146.104 77.801l-101.53-4.865c-6.845-.328-12.574 5.133-12.574 11.986v47.411c0 6.627 5.373 12 12 12h200.333c6.627 0 12-5.373 12-12V12c0-6.627-5.373-12-12-12h-47.411c-6.853 0-12.315 5.729-11.987 12.574zM256 432c-60.895 0-114.517-30.858-146.109-77.805l101.868 4.871c6.845.327 12.573-5.134 12.573-11.986v-47.412c0-6.627-5.373-12-12-12H12c-6.627 0-12 5.373-12 12V500c0 6.627 5.373 12 12 12h47.385c6.863 0 12.328-5.745 11.985-12.599l-4.129-82.575C112.725 470.166 180.405 504 256 504c121.187 0 222.067-86.924 243.704-201.824 1.388-7.369-4.308-14.176-11.807-14.176h-49.084c-5.57 0-10.377 3.842-11.676 9.259C408.593 374.592 339.069 432 256 432z"
      })));
    };

    return SavingIndicator;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var HeaderCell,
      PropTypes,
      Rb,
      React,
      ReactStyles,
      SavingIndicator,
      SortIndicator,
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

  React = __webpack_require__(2);

  PropTypes = __webpack_require__(0);

  Rb = __webpack_require__(93);

  ReactStyles = __webpack_require__(48);

  SortIndicator = __webpack_require__(94);

  SavingIndicator = __webpack_require__(49);

  /*
    HeaderCell is a controlled component
   */

  module.exports = HeaderCell = function (superClass) {
    extend(HeaderCell, superClass);

    function HeaderCell() {
      this._onColumnNameClick = bind(this._onColumnNameClick, this);
      this._onSort = bind(this._onSort, this);
      return HeaderCell.__super__.constructor.apply(this, arguments);
    }

    HeaderCell.propTypes = {
      column: PropTypes.object,
      columnIndex: PropTypes.number,
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      style: PropTypes.object,
      isSorting: PropTypes.bool,
      sorted: PropTypes.oneOf(['ASC', 'DESC']),
      onSort: PropTypes.func,
      onSelectColumn: PropTypes.func,
      orientation: PropTypes.oneOf(['portrait', 'landscape']),
      width: PropTypes.number,
      height: PropTypes.number
    };

    HeaderCell.prototype.styles = new ReactStyles({
      icon: {
        float: 'right',
        color: '#4767AA'
      },
      wrapper: {
        display: 'inline-block',
        position: 'relative',
        includes: function includes() {
          var style;
          style = _.extend({}, this.props.style);
          if (this.props.orientation === 'landscape') {
            _.extend(style, {
              display: 'inline-block',
              width: this.props.column.width,
              height: this.props.height
            });
          } else {
            _.extend(style, {
              display: 'block',
              height: this.props.column.height,
              width: this.props.width
            });
          }
          return style;
        }
      }
    });

    HeaderCell.prototype.style = function (name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    HeaderCell.prototype.render = function () {
      var ref;
      if ((ref = this.props.column) != null ? ref.tooltip : void 0) {
        return React.createElement("div", {
          "style": this.style('wrapper'),
          "className": "rdd-header-wrapper"
        }, React.createElement(Rb.OverlayTrigger, {
          "overlay": this._renderTooltipPopover()
        }, React.createElement("div", null, this._renderIcons(), this._renderColumnName(), React.createElement("i", {
          "style": this.style('icon'),
          "className": 'fa fa-question-circle'
        }))));
      } else {
        return React.createElement("div", {
          "style": this.style('wrapper'),
          "className": "rdd-header-wrapper"
        }, this._renderIcons(), this._renderColumnName());
      }
    };

    HeaderCell.prototype._renderTooltipPopover = function () {
      return React.createElement(Rb.Popover, {
        "id": "flipgridTooltipPopover"
      }, this.props.column.tooltip);
    };

    HeaderCell.prototype._renderIcons = function () {
      return React.createElement("div", {
        "className": 'rdd-header-icons'
      }, this._renderSortIndicator());
    };

    HeaderCell.prototype._renderSortIndicator = function () {
      if (!this.props.column.sortable) {
        return null;
      }
      if (this.props.isSorting) {
        return this._renderSpinnySpinner();
      }
      return React.createElement(SortIndicator, {
        "sorted": this.props.sorted,
        "onClick": this._onSort
      });
    };

    HeaderCell.prototype._renderSpinnySpinner = function () {
      return React.createElement(SavingIndicator, null);
    };

    HeaderCell.prototype._onSort = function () {
      var direction;
      direction = function () {
        switch (this.props.sorted) {
          case null:
          case void 0:
            return 'ASC';
          case 'ASC':
            return 'DESC';
          case 'DESC':
            return null;
        }
      }.call(this);
      return this.props.onSort(this.props.columnIndex, this.props.column, direction);
    };

    HeaderCell.prototype._renderColumnName = function () {
      var name;
      name = this.props.column.name;
      return React.createElement("a", {
        "title": "click to select all in column",
        "onClick": function (_this) {
          return function (evt) {
            return _this._onColumnNameClick(evt);
          };
        }(this)
      }, name);
    };

    HeaderCell.prototype._onColumnNameClick = function (evt) {
      var base;
      return typeof (base = this.props).onSelectColumn === "function" ? base.onSelectColumn(evt, this.props.columnIndex) : void 0;
    };

    return HeaderCell;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(96);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(99);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(54)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(101)(false);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(57);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(22);
var IE_PROTO = __webpack_require__(36)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7);
var core = __webpack_require__(4);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(62);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(109);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(120);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(40);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(64);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(41);
var $iterCreate = __webpack_require__(113);
var setToStringTag = __webpack_require__(43);
var getPrototypeOf = __webpack_require__(59);
var ITERATOR = __webpack_require__(15)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(55);
var hiddenKeys = __webpack_require__(38).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(21);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(33);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(53);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(130);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(134);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(62);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationTimeout = exports.cancelAnimationTimeout = undefined;

var _animationFrame = __webpack_require__(150);

var babelPluginFlowReactPropTypes_proptype_AnimationTimeoutId = process.env.NODE_ENV === 'production' ? null : {
  id: __webpack_require__(0).number.isRequired
};
if (!(process.env.NODE_ENV === 'production') && typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_AnimationTimeoutId', {
  value: babelPluginFlowReactPropTypes_proptype_AnimationTimeoutId,
  configurable: true
});
var cancelAnimationTimeout = exports.cancelAnimationTimeout = function cancelAnimationTimeout(frame) {
  return (0, _animationFrame.caf)(frame.id);
};

/**
 * Recursively calls requestAnimationFrame until a specified delay has been met or exceeded.
 * When the delay time has been reached the function you're timing out will be called.
 *
 * Credit: Joe Lambert (https://gist.github.com/joelambert/1002116#file-requesttimeout-js)
 */
var requestAnimationTimeout = exports.requestAnimationTimeout = function requestAnimationTimeout(callback, delay) {
  var start = Date.now();

  var timeout = function timeout() {
    if (Date.now() - start >= delay) {
      callback.call();
    } else {
      frame.id = (0, _animationFrame.raf)(timeout);
    }
  };

  var frame = {
    id: (0, _animationFrame.raf)(timeout)
  };

  return frame;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(70);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _datagrid = __webpack_require__(72);
var _cell = __webpack_require__(32);
var _headerCell = __webpack_require__(50);

var _ReactDatumDatagrid = {
  Datagrid: _datagrid,
  Cell: _cell,
  HeaderCell: _headerCell
};

if (window) {
  window.ReactDatumDatagrid = _ReactDatumDatagrid;
}
if (module) {
  module.exports = _ReactDatumDatagrid;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)(module)))

/***/ }),
/* 71 */
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var AutoSizer,
      Cell,
      CellWrapper,
      Datagrid,
      Grid,
      GridCopyPaste,
      GridEdit,
      GridExport,
      GridScroll,
      GridSelect,
      GridSort,
      HeaderCell,
      Mixin,
      PropTypes,
      React,
      ReactDOM,
      ReactDatum,
      ReactStyles,
      _,
      extend,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend1 = function extend1(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(2);

  ReactDOM = __webpack_require__(25);

  ReactDatum = __webpack_require__(26);

  PropTypes = __webpack_require__(0);

  _ = __webpack_require__(5);

  extend = __webpack_require__(30);

  Mixin = __webpack_require__(79);

  ReactStyles = __webpack_require__(48);

  CellWrapper = __webpack_require__(81);

  GridEdit = __webpack_require__(84);

  GridSelect = __webpack_require__(86);

  GridScroll = __webpack_require__(88);

  GridCopyPaste = __webpack_require__(89);

  GridExport = __webpack_require__(91);

  GridSort = __webpack_require__(92);

  Cell = __webpack_require__(32);

  HeaderCell = __webpack_require__(50);

  Grid = __webpack_require__(95)['default'];

  AutoSizer = __webpack_require__(151)['default'];

  __webpack_require__(154);

  __webpack_require__(155);

  /*
    This is react-datum-datagrid.   
    
    Example:
    TODO
   */

  module.exports = Datagrid = function (superClass) {
    extend1(Datagrid, superClass);

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.propTypes = {
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      columns: PropTypes.array,
      orientation: PropTypes.oneOf(['landscape', 'portrait']),
      silentSaveErrors: PropTypes.bool,
      headerWidth: PropTypes.number,
      headerHeight: PropTypes.number,
      defaultColumnDef: PropTypes.object,
      defaultCellComponent: PropTypes.any,
      defaultHeaderComponent: PropTypes.any,
      disableUndo: PropTypes.bool,
      sortColumnIndex: PropTypes.number,
      sortDirection: PropTypes.oneOf(["ASC", "DESC"]),
      onSelectedCellsChange: PropTypes.func,
      onSort: PropTypes.func
    };

    Datagrid.defaultProps = {
      headerWidth: 150,
      headerHeight: 60,
      orientation: 'landscape',
      defaultHeaderComponent: HeaderCell,
      defaultCellComponent: Cell,
      defaultColumnDef: {
        width: 120
      }
    };

    Datagrid.LOG_UNDO_DEBOUNCE = 1;

    Datagrid.prototype.undo = {};

    Datagrid.prototype.undoIndex = 0;

    Datagrid.prototype.styles = new ReactStyles({
      container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              flexDirection: 'column'
            };
          } else {
            return {
              flexDirection: 'row'
            };
          }
        }
      },
      headers: {
        display: 'flex',
        flexGrow: 0,
        margin: 0,
        overflow: 'hidden',
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'block',
              width: '100%',
              height: this.props.headerHeight
            };
          } else {
            return {
              display: 'inline-block',
              width: this.props.headerWidth,
              height: '100%'
            };
          }
        }
      },
      gridsContainer: {
        position: "relative",
        display: "flex",
        flexGrow: 1,
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              flexDirection: 'row'
            };
          } else {
            return {
              flexDirection: 'column'
            };
          }
        }
      },
      lockedGrid: {
        flexGrow: 0,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              width: this._sumLockedColumnWidths()
            };
          } else {
            return {
              height: this._sumLockedColumnHeights()
            };
          }
        }
      },
      freeGrid: {
        flexGrow: 1,
        margin: 0,
        padding: 0,
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              width: "calc(100% - " + this._sumLockedColumnWidths() + "px"
            };
          } else {
            return {
              height: "calc(100% - " + this._sumLockedColumnHeights() + "px"
            };
          }
        },
        overflow: 'hidden'
      },
      fixedHeaderCells: {
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'inline-block',
              width: this._sumLockedColumnWidths(),
              height: this.props.headerHeight
            };
          } else {
            return {
              display: 'block',
              width: this.props.headerWidth,
              height: this._sumLockedColumnHeights()
            };
          }
        },
        verticalAlign: 'top'
      },
      scrollingHeaderCells: {
        includes: function includes() {
          if (this.props.orientation === 'landscape') {
            return {
              display: 'inline-block',
              width: "calc(100% - " + this._sumLockedColumnWidths() + "px)",
              height: this.props.headerHeight,
              overflowY: 'scroll'
            };
          } else {
            return {
              display: 'block',
              width: this.props.headerWidth,
              height: "calc(100% - " + this._sumLockedColumnHeights() + "px)",
              overflowX: 'scroll'
            };
          }
        },
        marginTop: 1,
        verticalAlign: 'top',
        whiteSpace: 'nowrap'
      }
    });

    function Datagrid() {
      this._onDocumentKeyDown = bind(this._onDocumentKeyDown, this);
      this._onDocumentPaste = bind(this._onDocumentPaste, this);
      this._onDocumentCopy = bind(this._onDocumentCopy, this);
      this._unbindDocumentEvents = bind(this._unbindDocumentEvents, this);
      this._bindDocumentEvents = bind(this._bindDocumentEvents, this);
      this.getFreeColumnWidth = bind(this.getFreeColumnWidth, this);
      this.getLockedColumnWidth = bind(this.getLockedColumnWidth, this);
      this.freeCellRenderer = bind(this.freeCellRenderer, this);
      this.lockedCellRenderer = bind(this.lockedCellRenderer, this);
      this.state = {};
      Datagrid.__super__.constructor.apply(this, arguments);
      this._debouncedForceUpdate = _.debounce(function (_this) {
        return function () {
          return _this.forceUpdate();
        };
      }(this), 50);
    }

    Datagrid.prototype.style = function (name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    Datagrid.getDerivedStateFromProps = function (nextProps, prevState) {
      var newState;
      newState = {};
      if (nextProps.sortColumnIndex !== prevState._cachedSortColumnIndex) {
        newState.sortColumnIndex = newState._cachedSortColumnIndex = nextProps.sortColumnIndex;
      }
      if (nextProps.sortDirection !== prevState._cachedSortDirection) {
        newState.sortDirection = newState._cachedSortDirection = nextProps.sortDirection;
      }
      if (_.isEmpty(newState)) {
        return null;
      }
      return newstate;
    };

    Datagrid.prototype.componentDidMount = function () {
      return this._bindDocumentEvents();
    };

    Datagrid.prototype.componentWillUnmount = function () {
      return this._unbindDocumentEvents();
    };

    Datagrid.prototype.render = function () {
      var freeColumns, freeGridProps, lastSelectedCellPosition, lockedColumns, lockedGridProps;
      lockedColumns = this._getLockedColumns();
      freeColumns = this._getFreeColumns();
      lockedGridProps = {
        className: "rdd-rv-grid",
        overscanRowCount: 20,
        overscanColCount: 5,
        rowHeight: this.props.rowHeight,
        rowCount: this.getRowCount(),
        datagridState: JSON.stringify(this.state)
      };
      freeGridProps = _.extend({}, lockedGridProps);
      lastSelectedCellPosition = this.getLastSelectedCellPosition();
      if (lastSelectedCellPosition != null) {
        freeGridProps.scrollToColumn = lastSelectedCellPosition.columnIndex - lockedColumns.length;
        lockedGridProps.scrollToRow = freeGridProps.scrollToRow = lastSelectedCellPosition.rowIndex;
      }
      return React.createElement("div", {
        "style": this.style('container'),
        "className": 'react-datum-datagrid'
      }, React.createElement("div", {
        "style": this.style('headers'),
        "className": 'rdd-headers'
      }, React.createElement("div", {
        "style": this.style('fixedHeaderCells'),
        "className": 'rdd-fixed-header-cells'
      }, this._renderHeaderCells(0, lockedColumns)), React.createElement("div", {
        "style": this.style('scrollingHeaderCells'),
        "className": 'rdd-scrolling-header-cells'
      }, this._renderHeaderCells(lockedColumns.length, freeColumns))), React.createElement("div", {
        "style": this.style('gridsContainer'),
        "className": 'rdd-grids-container'
      }, React.createElement("div", {
        "style": this.style('lockedGrid'),
        "className": 'rdd-locked-grid'
      }, React.createElement(AutoSizer, null, function (_this) {
        return function (arg) {
          var height, width;
          height = arg.height, width = arg.width;
          return React.createElement(Grid, Object.assign({
            "cellRenderer": _this.lockedCellRenderer,
            "columnWidth": _this.getLockedColumnWidth,
            "columnCount": lockedColumns.length,
            "height": height,
            "width": width
          }, lockedGridProps));
        };
      }(this))), React.createElement("div", {
        "style": this.style('freeGrid'),
        "className": 'rdd-free-grid'
      }, React.createElement(AutoSizer, null, function (_this) {
        return function (arg) {
          var height, width;
          height = arg.height, width = arg.width;
          return React.createElement(Grid, Object.assign({
            "cellRenderer": _this.freeCellRenderer,
            "columnWidth": _this.getFreeColumnWidth,
            "columnCount": freeColumns.length,
            "height": height,
            "width": width
          }, freeGridProps));
        };
      }(this)))));
    };

    Datagrid.prototype.lockedCellRenderer = function (arg) {
      var columnIndex, isScrolling, isVisible, key, rowIndex, style;
      rowIndex = arg.rowIndex, columnIndex = arg.columnIndex, key = arg.key, isScrolling = arg.isScrolling, isVisible = arg.isVisible, style = arg.style;
      return this.cellRenderer(this._getLockedColumns(), 0, columnIndex, rowIndex, key, isVisible, isScrolling, style);
    };

    Datagrid.prototype.freeCellRenderer = function (arg) {
      var baseColumnIndex, columnIndex, isScrolling, isVisible, key, rowIndex, style;
      rowIndex = arg.rowIndex, columnIndex = arg.columnIndex, key = arg.key, isScrolling = arg.isScrolling, isVisible = arg.isVisible, style = arg.style;
      baseColumnIndex = this._getLockedColumns().length;
      return this.cellRenderer(this._getFreeColumns(), baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style);
    };

    Datagrid.prototype.cellRenderer = function (columns, baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style) {
      var columnDef, model, showPlaceholder;
      showPlaceholder = false;
      columnDef = columns[columnIndex];
      model = this.getModelAt(rowIndex);
      return this._renderDataCell(columnDef, model, columnIndex + baseColumnIndex, rowIndex, key, style, showPlaceholder);
    };

    Datagrid.prototype.getLockedColumnWidth = function (arg) {
      var index, width;
      index = arg.index;
      width = this.getColumnWidth(index, this._getLockedColumns());
      console.log('getLockedColumnWidth', index, width);
      return width;
    };

    Datagrid.prototype.getFreeColumnWidth = function (arg) {
      var index, width;
      index = arg.index;
      width = this.getColumnWidth(index, this._getFreeColumns());
      console.log('getFreeColumnWidth', index, width);
      return width;
    };

    Datagrid.prototype.getColumnWidth = function (index, columns) {
      var ref;
      if (columns == null) {
        columns = this.props.columns;
      }
      return (ref = columns[index].width) != null ? ref : this.props.defaultColumnDef.width;
    };

    Datagrid.prototype.getRowCount = function () {
      var base, ref, ref1;
      if (this.props.collection == null) {
        return 0;
      }
      return (ref = (ref1 = typeof (base = this.props.collection).getLength === "function" ? base.getLength() : void 0) != null ? ref1 : this.props.collection.length) != null ? ref : 0;
    };

    /*
      Call this method to get a csv text representation of the grid
     */

    Datagrid.prototype.exportToCsv = function () {};

    Datagrid.prototype.getCollection = function () {
      return this.props.collection;
    };

    Datagrid.prototype._renderHeaderCells = function (baseIndex, columnDefs) {
      var cells, columnDef, index;
      cells = function () {
        var i, len, results;
        results = [];
        for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
          columnDef = columnDefs[index];
          results.push(this._renderHeaderCell(baseIndex + index, columnDef));
        }
        return results;
      }.call(this);
      return cells;
    };

    Datagrid.prototype._renderHeaderCell = function (columnIndex, columnDef) {
      var HeaderCellComponent, isSortedByUs, isSortingByUs, ref, ref1, sortDirection;
      if (columnDef == null) {
        return null;
      }
      columnDef = this.getColumnDefaults(columnDef);
      isSortedByUs = this.state.sortColumnIndex != null && this.state.sortColumnIndex === columnIndex;
      isSortingByUs = this.state.isSorting && isSortedByUs;
      sortDirection = isSortedByUs ? this.state.sortDirection : null;
      HeaderCellComponent = (ref = (ref1 = columnDef.headerComponent) != null ? ref1 : columnDef.header) != null ? ref : this.props.defaultHeaderComponent;
      return React.createElement(HeaderCellComponent, {
        "key": columnIndex,
        "column": columnDef,
        "columnIndex": columnIndex,
        "collection": this.props.collection,
        "orientation": this.props.orientation,
        "isSorting": isSortingByUs,
        "sorted": sortDirection,
        "onSelectColumn": function (_this) {
          return function (evt, columnIndex) {
            return _this.onSelectColumn(evt, columnIndex);
          };
        }(this),
        "onSort": function (_this) {
          return function (columnIndex, columnDef, direction) {
            return _this.onSortColumn(columnIndex, columnDef, direction);
          };
        }(this),
        "width": this.props.headerWidth,
        "height": this.props.headerHeight
      });
    };

    Datagrid.prototype._renderDataCell = function (columnDef, model, columnIndex, rowIndex, key, style, showPlaceholder) {
      var editingOurselves, props, savingOurselves, value;
      style = this._getCellWrapperStyle(style);
      editingOurselves = this.isCellEditing(columnIndex, rowIndex);
      savingOurselves = this.isCellSaving(columnIndex, rowIndex);
      value = editingOurselves ? this.state.editingCell.value : this.getValueAt(columnIndex, rowIndex);
      props = {
        value: value,
        key: key,
        model: model,
        column: columnDef,
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        collection: this.props.collection,
        style: style,
        showPlaceholder: showPlaceholder,
        datagrid: this,
        defaultCellStyle: this._getDefaultCellStyle(columnDef),
        defaultCellComponent: this.props.defaultCellComponent,
        editable: this.canEditCell(columnDef, model),
        selected: this.isCellSelected(rowIndex, columnDef.key),
        editing: editingOurselves,
        saving: savingOurselves,
        wasSaved: this.wasCellSaved(columnIndex, rowIndex),
        saveErrors: this.getSaveErrors(columnIndex, rowIndex),
        onMouseDown: function (_this) {
          return function (evt, cell) {
            return _this.onCellMouseDown(evt, cell);
          };
        }(this),
        onMouseUp: function (_this) {
          return function (evt, cell) {
            return _this.onCellMouseUp(evt, cell);
          };
        }(this),
        onMouseMove: function (_this) {
          return function (evt, cell) {
            return _this.onCellMouseMove(evt, cell);
          };
        }(this),
        onDoubleClick: function (_this) {
          return function (evt, cell) {
            return _this.onCellEdit(evt, columnDef, model, columnIndex, rowIndex);
          };
        }(this),
        onEditIndicatorClick: function (_this) {
          return function (evt, cell) {
            return _this.onCellEdit(evt, columnDef, model, columnIndex, rowIndex);
          };
        }(this),
        onChange: function (_this) {
          return function (value, cell) {
            return _this.onCellChange(value, columnDef, model, columnIndex, rowIndex);
          };
        }(this)
      };
      return React.createElement(CellWrapper, Object.assign({}, props));
    };

    Datagrid.prototype._getLockedColumns = function () {
      return _.filter(this.props.columns, function (columnDef) {
        return columnDef.locked;
      });
    };

    Datagrid.prototype._getFreeColumns = function () {
      return _.filter(this.props.columns, function (columnDef) {
        return !columnDef.locked;
      });
    };

    Datagrid.prototype._sumLockedColumnHeights = function () {
      var col, heightOut, i, len, ref, ref1, ref2, ref3, ref4;
      heightOut = 0;
      ref = this._getLockedColumns();
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        heightOut += this._convertCssPx((ref1 = col.cellStyle) != null ? ref1.borderWidth : void 0);
        heightOut += (ref2 = col.height) != null ? ref2 : this.props.defaultColumnDef.height;
        heightOut += this._convertCssPx((ref3 = col.cellStyle) != null ? ref3.paddingTop : void 0);
        heightOut += this._convertCssPx((ref4 = col.cellStyle) != null ? ref4.paddingBottom : void 0);
      }
      return heightOut;
    };

    Datagrid.prototype._sumLockedColumnWidths = function () {
      var col, i, len, ref, ref1, ref2, ref3, ref4, widthOut;
      widthOut = 0;
      ref = this._getLockedColumns();
      for (i = 0, len = ref.length; i < len; i++) {
        col = ref[i];
        widthOut += this._convertCssPx((ref1 = col.cellStyle) != null ? ref1.borderWidth : void 0);
        widthOut += (ref2 = col.width) != null ? ref2 : this.props.defaultColumnDef.width;
        widthOut += this._convertCssPx((ref3 = col.cellStyle) != null ? ref3.paddingTop : void 0);
        widthOut += this._convertCssPx((ref4 = col.cellStyle) != null ? ref4.paddingBottom : void 0);
        widthOut;
      }
      return widthOut;
    };

    Datagrid.prototype._getFreeGridHeight = function () {
      return 300;
    };

    Datagrid.prototype._getFreeGridWidth = function () {
      return 300;
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

    Datagrid.prototype._getCellWrapperStyle = function (style) {
      return _.extend(style, {
        margin: 0,
        padding: 0
      });
    };

    Datagrid.prototype._getDefaultCellStyle = function (columnDef, isHeader) {
      var cellStyle, height, ref, ref1, width;
      if (isHeader == null) {
        isHeader = false;
      }
      if (isHeader) {
        if (this.props.orientation === 'landscape') {
          height = this.props.headerHeight;
          width = (ref = columnDef.width) != null ? ref : this.props.defaultColumnDef.width;
        } else {
          height = (ref1 = columnDef.height) != null ? ref1 : this.props.defaultColumnDef.height;
          width = this.props.headerWidth;
        }
      }
      cellStyle = {
        height: height,
        width: width
      };
      return cellStyle;
    };

    Datagrid.prototype._bindDocumentEvents = function () {
      document.addEventListener('copy', this._onDocumentCopy);
      document.addEventListener('paste', this._onDocumentPaste);
      return document.addEventListener('keydown', this._onDocumentKeyDown);
    };

    Datagrid.prototype._unbindDocumentEvents = function () {
      document.removeEventListener('copy', this._onDocumentCopy);
      document.removeEventListener('paste', this._onDocumentPaste);
      return document.removeEventListener('keydown', this._onDocumentKeyDown);
    };

    Datagrid.prototype._onDocumentCopy = function (evt) {
      return this.GridCopyPaste_onDocumentCopy(evt);
    };

    Datagrid.prototype._onDocumentPaste = function (evt) {
      return this.GridCopyPaste_onDocumentPaste(evt);
    };

    Datagrid.prototype._onDocumentKeyDown = function (evt) {
      return this.GridSelect_onDocumentKeyDown(evt);
    };

    Mixin(Datagrid, GridScroll);

    Mixin(Datagrid, GridEdit);

    Mixin(Datagrid, GridSelect);

    Mixin(Datagrid, GridCopyPaste);

    Mixin(Datagrid, GridExport);

    Mixin(Datagrid, GridSort);

    return Datagrid;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(27);
var invariant = __webpack_require__(28);
var warning = __webpack_require__(47);
var assign = __webpack_require__(74);

var ReactPropTypesSecret = __webpack_require__(29);
var checkPropTypes = __webpack_require__(75);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 74 */
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(28);
  var warning = __webpack_require__(47);
  var ReactPropTypesSecret = __webpack_require__(29);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(27);
var invariant = __webpack_require__(28);
var ReactPropTypesSecret = __webpack_require__(29);

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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * node.extend
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * @fileoverview
 * Port of jQuery.extend that actually works on node.js
 */
var is = __webpack_require__(78);

module.exports = function extend() {
  var target = arguments[0] || {};
  var i = 1;
  var length = arguments.length;
  var deep = false;
  var options, name, src, copy, copyIsArray, clone;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !is.fn(target)) {
    target = {};
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    options = arguments[i];
    if (options != null) {
      if (typeof options === 'string') {
        options = options.split('');
      }
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (is.hash(copy) || (copyIsArray = is.array(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && is.array(src) ? src : [];
          } else {
            clone = src && is.hash(src) ? src : {};
          }

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

        // Don't bring in undefined values
        } else if (typeof copy !== 'undefined') {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals window, HTMLElement */



/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var isActualNaN = function (value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;

/**
 * Expose `is`
 */

var is = {};

/**
 * Test general.
 */

/**
 * is.type
 * Test if `value` is a type of `type`.
 *
 * @param {Mixed} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.a = is.type = function (value, type) {
  return typeof value === type;
};

/**
 * is.defined
 * Test if `value` is defined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

is.defined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * is.empty
 * Test if `value` is empty.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */

is.empty = function (value) {
  var type = toStr.call(value);
  var key;

  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
};

/**
 * is.equal
 * Test if `value` is equal to `other`.
 *
 * @param {Mixed} value value to test
 * @param {Mixed} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = function equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (key--) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

/**
 * is.hosted
 * Test if `value` is hosted by `host`.
 *
 * @param {Mixed} value to test
 * @param {Mixed} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

is.hosted = function (value, host) {
  var type = typeof host[value];
  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

/**
 * is.instance
 * Test if `value` is an instance of `constructor`.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instance = is['instanceof'] = function (value, constructor) {
  return value instanceof constructor;
};

/**
 * is.nil / is.null
 * Test if `value` is null.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.nil = is['null'] = function (value) {
  return value === null;
};

/**
 * is.undef / is.undefined
 * Test if `value` is undefined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

is.undef = is.undefined = function (value) {
  return typeof value === 'undefined';
};

/**
 * Test arguments.
 */

/**
 * is.args
 * Test if `value` is an arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.args = is.arguments = function (value) {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * is.array
 * Test if 'value' is an array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

is.array = Array.isArray || function (value) {
  return toStr.call(value) === '[object Array]';
};

/**
 * is.arguments.empty
 * Test if `value` is an empty arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
is.args.empty = function (value) {
  return is.args(value) && value.length === 0;
};

/**
 * is.array.empty
 * Test if `value` is an empty array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
is.array.empty = function (value) {
  return is.array(value) && value.length === 0;
};

/**
 * is.arraylike
 * Test if `value` is an arraylike object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arraylike = function (value) {
  return !!value && !is.bool(value)
    && owns.call(value, 'length')
    && isFinite(value.length)
    && is.number(value.length)
    && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * is.bool
 * Test if `value` is a boolean.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = is['boolean'] = function (value) {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * is.false
 * Test if `value` is false.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is['false'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

/**
 * is.true
 * Test if `value` is true.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is['true'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * is.date
 * Test if `value` is a date.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = function (value) {
  return toStr.call(value) === '[object Date]';
};

/**
 * is.date.valid
 * Test if `value` is a valid date.
 *
 * @param {Mixed} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
is.date.valid = function (value) {
  return is.date(value) && !isNaN(Number(value));
};

/**
 * Test element.
 */

/**
 * is.element
 * Test if `value` is an html element.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

is.element = function (value) {
  return value !== undefined
    && typeof HTMLElement !== 'undefined'
    && value instanceof HTMLElement
    && value.nodeType === 1;
};

/**
 * Test error.
 */

/**
 * is.error
 * Test if `value` is an error object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = function (value) {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * is.fn / is.function (deprecated)
 * Test if `value` is a function.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = is['function'] = function (value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

/**
 * Test number.
 */

/**
 * is.number
 * Test if `value` is a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = function (value) {
  return toStr.call(value) === '[object Number]';
};

/**
 * is.infinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
is.infinite = function (value) {
  return value === Infinity || value === -Infinity;
};

/**
 * is.decimal
 * Test if `value` is a decimal number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = function (value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

/**
 * is.divisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function (value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
};

/**
 * is.integer
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = is['int'] = function (value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * is.maximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.minimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.nan
 * Test if `value` is not a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = function (value) {
  return !is.number(value) || value !== value;
};

/**
 * is.even
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
};

/**
 * is.odd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
};

/**
 * is.ge
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * is.gt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * is.le
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * is.lt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * is.within
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
is.within = function (value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * is.object
 * Test if `value` is an object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */
is.object = function (value) {
  return toStr.call(value) === '[object Object]';
};

/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
is.primitive = function isPrimitive(value) {
  if (!value) {
    return true;
  }
  if (typeof value === 'object' || is.object(value) || is.fn(value) || is.array(value)) {
    return false;
  }
  return true;
};

/**
 * is.hash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = function (value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * is.regexp
 * Test if `value` is a regular expression.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = function (value) {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * is.string
 * Test if `value` is a string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = function (value) {
  return toStr.call(value) === '[object String]';
};

/**
 * Test base64 string.
 */

/**
 * is.base64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = function (value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * is.hex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = function (value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

/**
 * is.symbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = function (value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};

module.exports = is;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var _, mixin;

  _ = __webpack_require__(5);

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
        wrapperDef = "klass.prototype[key] = function() {\n  this.__originalMethodStack.push(this.originalMethod)\n  this.originalMethod = this.__originalMethods['" + oMethodKey + "']\n  var returnValue = this.__mixinMethods['" + oMethodKey + "'].apply(this, arguments)\n  this.originalMethod = this.__originalMethodStack.pop()\n  return returnValue\n}";
        results.push(eval(wrapperDef));
      } else {
        results.push(klass.prototype[key] = val);
      }
    }
    return results;
  };
}).call(undefined);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var _, deepSet;

  _ = __webpack_require__(5);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Cell,
      CellWrapper,
      Classnames,
      EditableIndicator,
      PropTypes,
      Rd,
      React,
      ReactDOM,
      SavingIndicator,
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

  React = __webpack_require__(2);

  ReactDOM = __webpack_require__(25);

  PropTypes = __webpack_require__(0);

  Classnames = __webpack_require__(31);

  Rd = __webpack_require__(26);

  _ = __webpack_require__(5);

  EditableIndicator = __webpack_require__(82);

  SavingIndicator = __webpack_require__(49);

  Cell = __webpack_require__(32);

  module.exports = CellWrapper = function (superClass) {
    extend(CellWrapper, superClass);

    function CellWrapper() {
      this._onChange = bind(this._onChange, this);
      this._onEditIndicatorClick = bind(this._onEditIndicatorClick, this);
      this._onDoubleClick = bind(this._onDoubleClick, this);
      this._onBlur = bind(this._onBlur, this);
      this._onFocus = bind(this._onFocus, this);
      this._onMouseLeave = bind(this._onMouseLeave, this);
      this._onMouseEnter = bind(this._onMouseEnter, this);
      this._onMouseMove = bind(this._onMouseMove, this);
      this._onMouseUp = bind(this._onMouseUp, this);
      this._onMouseDown = bind(this._onMouseDown, this);
      return CellWrapper.__super__.constructor.apply(this, arguments);
    }

    CellWrapper.props = {
      model: PropTypes.any,
      column: PropTypes.object,
      rowIndex: PropTypes.number,
      columnIndex: PropTypes.number,
      value: PropTypes.any,
      collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      defaultCellComponent: PropTypes.any,
      defaultCellStyle: PropTypes.object,
      style: PropTypes.object,
      selected: PropTypes.bool,
      editing: PropTypes.bool,
      editable: PropTypes.bool,
      onMouseDown: PropTypes["function"],
      onMouseUp: PropTypes["function"],
      onMouseEnter: PropTypes["function"],
      onMouseLeave: PropTypes["function"],
      onKeyDown: PropTypes["function"],
      onChange: PropTypes["function"]
    };

    CellWrapper.defaultProps = {
      defaultCellComponent: Cell
    };

    CellWrapper.prototype.componentWillMount = function () {
      return this.setState({
        renderError: null
      });
    };

    CellWrapper.prototype.componentDidCatch = function (error, info) {
      var base;
      if (typeof (base = this.props).onRenderError === "function") {
        base.onRenderError(error, info);
      }
      console.error("react-datum-datagrid: Cell at " + rowIndex + ", " + columnIndex + " (" + column.key + ") failed to render", error, info);
      return this.setState({
        renderError: {
          error: error,
          info: info
        }
      });
    };

    CellWrapper.prototype.render = function () {
      var classNames, dataProps, ref, title;
      if (this.state.renderError != null) {
        title = "This cell failed to render. Additional Details: " + JSON.stringify(this.state.renderError);
        return React.createElement("span", {
          "title": title
        }, ":(");
      }
      dataProps = {
        'data-row': this.props.rowIndex,
        'data-col': this.props.columnIndex
      };
      classNames = Classnames('rdd-cell-wrapper', {
        'rdd-cell-selected': this.isSelected(),
        'rdd-cell-placeholder': this.props.showPlaceholder,
        'rdd-was-saved': this.props.wasSaved,
        'rdd-save-error': ((ref = this.props.saveErrors) != null ? ref.length : void 0) > 0
      });
      return React.createElement("div", Object.assign({
        "className": classNames,
        "onMouseDown": this._onMouseDown,
        "onMouseUp": this._onMouseUp,
        "onMouseMove": this._onMouseMove,
        "onMouseEnter": this._onMouseEnter,
        "onMouseLeave": this._onMouseLeave,
        "onKeyDown": this._onKeydown,
        "onFocus": this._onFocus,
        "onBlur": this._onBlur,
        "onDoubleClick": this._onDoubleClick,
        "style": this.props.style
      }, dataProps), this._renderIndicators(), this._renderComponentOrPlaceholder());
    };

    CellWrapper.prototype._renderComponentOrPlaceholder = function () {
      var CellComponent, ref, ref1;
      if (this.props.showPlaceholder) {
        return React.createElement("span", null, "...");
      }
      CellComponent = (ref = (ref1 = this.props.column.cellComponent) != null ? ref1 : this.props.column.formatter) != null ? ref : this.props.defaultCellComponent;
      return React.createElement(Rd.Model, {
        "model": this.props.model
      }, React.createElement(CellComponent, {
        "value": this.props.value,
        "selected": this.props.selected,
        "editable": this.props.editable,
        "editing": this.props.editing,
        "rowData": this.props.model,
        "rowIndex": this.props.rowIndex,
        "rowIdx": this.props.rowIndex,
        "column": this.props.column,
        "collection": this.props.collection,
        "defaultCellStyle": this.props.defaultCellStyle,
        "ref": 'cellComponent',
        "onChange": this._onChange
      }));
    };

    CellWrapper.prototype._renderIndicators = function () {
      return React.createElement("div", {
        "className": "rdd-cell-indicators"
      }, this._renderEditableIndicator(), this._renderSavingIndicator());
    };

    CellWrapper.prototype._renderEditableIndicator = function () {
      if (!(this.props.editable && !this.props.saving && !this.props.editing)) {
        return null;
      }
      return React.createElement(EditableIndicator, {
        "onClick": this._onEditIndicatorClick
      });
    };

    CellWrapper.prototype._renderSavingIndicator = function () {
      if (!this.props.saving) {
        return null;
      }
      return React.createElement(SavingIndicator, null);
    };

    CellWrapper.prototype.focus = function () {
      var ref, ref1;
      return (ref = this.refs) != null ? (ref1 = ref.cellComponent) != null ? ref1.focus() : void 0 : void 0;
    };

    CellWrapper.prototype.isSelected = function () {
      return this.props.selected;
    };

    CellWrapper.prototype._onMouseDown = function (evt) {
      var base;
      return typeof (base = this.props).onMouseDown === "function" ? base.onMouseDown(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseUp = function (evt) {
      var base;
      return typeof (base = this.props).onMouseUp === "function" ? base.onMouseUp(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseMove = function (evt) {
      var base;
      return typeof (base = this.props).onMouseMove === "function" ? base.onMouseMove(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseEnter = function (evt) {
      var base;
      return typeof (base = this.props).onMouseEnter === "function" ? base.onMouseEnter(evt, this) : void 0;
    };

    CellWrapper.prototype._onMouseLeave = function (evt) {
      var base;
      return typeof (base = this.props).onMouseLeave === "function" ? base.onMouseLeave(evt, this) : void 0;
    };

    CellWrapper.prototype._onFocus = function (evt) {
      return this.setState({
        selected: true
      });
    };

    CellWrapper.prototype._onBlur = function (evt) {
      var base;
      return typeof (base = this.props)._onBlur === "function" ? base._onBlur(evt, this) : void 0;
    };

    CellWrapper.prototype._onDoubleClick = function (evt) {
      return this.props.onDoubleClick(evt, this);
    };

    CellWrapper.prototype._onEditIndicatorClick = function (evt) {
      return this.props.onEditIndicatorClick(evt, this);
    };

    CellWrapper.prototype._onChange = function (value) {
      return this.props.onChange(value, this);
    };

    return CellWrapper;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var EditableIndicator,
      React,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(2);

  module.exports = EditableIndicator = function (superClass) {
    extend(EditableIndicator, superClass);

    function EditableIndicator() {
      return EditableIndicator.__super__.constructor.apply(this, arguments);
    }

    EditableIndicator.prototype.render = function () {
      return React.createElement("div", {
        "className": 'rdd-editable-indicator',
        "title": "click to edit this cell, or double click anywhere in cell, or press enter with cell selected",
        "onClick": this.props.onClick
      }, React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 512 512"
      }, React.createElement("path", {
        "d": "M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
      })));
    };

    return EditableIndicator;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.3
(function() {
  var StringHelpers, _;

  _ = __webpack_require__(5);

  module.exports = StringHelpers = (function() {
    function StringHelpers() {}


    /*
      Trims leading and trailing spaces.  Also optionally trims internal excess spaces
     */

    StringHelpers.trim = function(str, options) {
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        all: false
      });
      str = str.replace(/^\s+|\s+$/g, "");
      if (options.all) {
        str = str.replace(/\s+/g, ' ');
      }
      return str;
    };


    /*
      Adds elipsis to string, if neccessary, for maximum string length not
      to exceed maxLength
     */

    StringHelpers.elipsize = function(str, maxLength) {
      if ((maxLength == null) || str.length <= maxLength) {
        return str;
      }
      return str.slice(0, maxLength - 3) + '...';
    };


    /*
      Returns true if the string is all whitespace characters
     */

    StringHelpers.isEmpty = function(str) {
      if (this.weaklyEqual(str, "")) {
        return true;
      }
    };


    /*
      Returns true if string starts with any of otherStrings.  
      otherStrings = one or array to compare to
     */

    StringHelpers.startsWith = function(str, otherStrings) {
      return this._withOneOrArray(otherStrings, function(otherStr) {
        if (str.slice(0, otherStr.length) === otherStr) {
          return true;
        }
      });
    };


    /*
      Returns true if string ends with any of otherStrings.  
      otherStrings = one or array to compare to
     */

    StringHelpers.endsWith = function(str, otherStrings) {
      return this._withOneOrArray(otherStrings, function(otherStr) {
        if (!((otherStr != null ? otherStr.length : void 0) > 0)) {
          return true;
        }
        if (str.slice(-1 * otherStr.length) === otherStr) {
          return true;
        }
      });
    };


    /*
      Returns true if string contains any of otherStrings.  
      otherStrings = one or array to compare to
     */

    StringHelpers.has = function(str, otherStrings) {
      return this._withOneOrArray(otherStrings, function(otherStr) {
        if (str.indexOf(otherStr) !== -1) {
          return true;
        }
      });
    };


    /*
      Returns the weak value of the string -- all lowercase, plus trimmed
      and with excess inner whitespace ignored, locale ignored by default. 
      
      The weakly... functions below use this method on both strings being
      compared to return positive match of mismatched case, etc.
     */

    StringHelpers.weakValue = function(str, options) {
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        ignoreCase: true,
        useLocale: false,
        trim: true
      });
      if (options.trim) {
        str = this.trim(str, {
          all: true
        });
      }
      if (options.ignoreCase) {
        if (options.useLocale) {
          return str = str.toLocaleLowerCase();
        } else {
          return str = str.toLowerCase();
        }
      }
    };


    /*
      Returns true if the first string weakly equals any of the otherStrings. 
      see weakValue() comments
     */

    StringHelpers.weaklyEqual = function(str, otherStrings, options) {
      if (options == null) {
        options = {};
      }
      return this._withOneOrArray(otherStrings, (function(_this) {
        return function(otherStr) {
          if (_this.weakValue(str, options) === _this.weakValue(otherStr, options)) {
            return true;
          }
        };
      })(this));
    };


    /*
      Returns -1, 0 or 1 like javascript localeCompare.  Comppares the weak values.  
      see weakValue() comments
     */

    StringHelpers.weaklyCompare = function(str, otherStr, options) {
      if (options == null) {
        options = {};
      }
      return this.weakValue(str, options).localeCompare(this.weakValue(otherStr, options));
    };

    StringHelpers.weaklyIn = function(str, otherStrings, options) {
      if (options == null) {
        options = {};
      }
      return __withOneOrArray(otherStrings, (function(_this) {
        return function(otherStr) {
          return _this.weaklyEqual(str, otherStr, options);
        };
      })(this));
    };


    /*
      Returns true if the first string weakly contains any of the otherStrings. 
      see weakValue() comments
     */

    StringHelpers.weaklyHas = function(str, otherStrings) {
      return this._withOneOrArray(otherStrings, (function(_this) {
        return function(otherStr) {
          if (_this.weakValue(str).indexOf(_this.weakValue(otherStr)) !== -1) {
            return true;
          }
        };
      })(this));
    };


    /*
      Returns true if the first string weakly starts with any of the otherStrings. 
      see weakValue() comments
     */

    StringHelpers.weaklyStartsWith = function(str, otherStrings) {
      return this._withOneOrArray(otherStrings, (function(_this) {
        return function(otherStr) {
          if (_this.startsWith(_this.weakValue(str), _this.weakValue(otherStr))) {
            return true;
          }
        };
      })(this));
    };


    /*
      Returns true if the first string weakly ends with any of the otherStrings. 
      see weakValue() comments
     */

    StringHelpers.weaklyEndsWith = function(str, otherStrings) {
      return this._withOneOrArray(otherStrings, (function(_this) {
        return function(otherStr) {
          if (_this.endsWith(_this.weakValue(str), _this.weakValue(otherStr))) {
            return true;
          }
        };
      })(this));
    };


    /*
      makes strings like "this_string", "ThisString", "this-string", "this.string" into
      "this string"
     */

    StringHelpers.humanize = function(str) {
      var out;
      out = str.replace(/([A-Z])/g, " $1").replace(/[_\-\.](.)/g, " $1");
      return this.trim(out).toLowerCase();
    };


    /*
      makes "this is a string" into "this-is-a-string"
      (stolen from underscore.string)
     */

    StringHelpers.dasherize = function(str) {
      return this.trim(str).replace(/(.)([A-Z])/g, '$1-$2').replace(/[-_\s]+/g, '-').toLowerCase();
    };


    /*  
      converts a string like "dropCamelCase".decamelize() => "Drop Camel Case"
     */

    StringHelpers.decamelize = function(str) {
      var result;
      result = str.replace(/_?([A-Z])/g, " $1");
      result = result.charAt(0).toUpperCase() + result.slice(1);
      return result.toLowerCase();
    };


    /*
      converts a string like "Drop Camel Case".dropcamelize() => "dropCamelCase"
     */

    StringHelpers.dropcamelize = function(str) {
      var result;
      result = str.replace(/\s/g, "");
      return result.charAt(0).toLowerCase() + result.slice(1);
    };


    /*
      capitalize the first letter of a string
     */

    StringHelpers.capitalize = function(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };


    /*
      decapitalize the first letter of a string
     */

    StringHelpers.decapitalize = function(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };

    StringHelpers.titleize = function(str) {
      return str.toString().toLowerCase().replace(/(?:^|\s|-)\S/g, function(c) {
        return c.toUpperCase();
      });
    };


    /*
      returns true if the first letter of a string is capitalized
     */

    StringHelpers.isCapitalized = function(str) {
      return str.match(/^[A-Z].*/) !== null;
    };


    /*
      returns true if all alphabetic characters of string are upper case letters.
      ignores numbers and punctuation
     */

    StringHelpers.isAllCaps = function(str) {
      return str.match(/^[A-Z\s0-9]*$/) !== null;
    };


    /*
      returns true if string is numeric
     */

    StringHelpers.isNumeric = function(str) {
      return str.toString().match(/^[\-,\+]?[\s\d\.]*$/) !== null;
    };


    /*
      adds thousands separaters optionally truncates decimal portion to decimalPlaces characters
      slightly enhanced from
      http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
     */

    StringHelpers.numerize = function(str, decimalPlaces, zeroFill) {
      var parts, pow;
      if (decimalPlaces == null) {
        decimalPlaces = null;
      }
      if (zeroFill == null) {
        zeroFill = false;
      }
      if (decimalPlaces) {
        pow = Math.pow(10, decimalPlaces);
        parts = (Math.round(parseFloat(str) * pow) / pow).toString().split(".");
      } else {
        parts = str.toString().split('.');
      }
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (decimalPlaces) {
        if (parts.length > 1) {
          parts[1] = parts[1].slice(0, decimalPlaces);
          if (zeroFill) {
            while (parts[1].length < decimalPlaces) {
              parts[1] += '0';
            }
          }
        } else if (zeroFill) {
          parts.push(Array(decimalPlaces + 1).join('0'));
        }
      }
      return parts.join(".");
    };

    StringHelpers._withOneOrArray = function(strOrArray, fn) {
      var array, i, len, str, truth;
      array = _.isArray(strOrArray) ? strOrArray : [strOrArray];
      truth = false;
      for (i = 0, len = array.length; i < len; i++) {
        str = array[i];
        if (fn(str) === true) {
          truth = true;
          break;
        }
      }
      return truth;
    };

    return StringHelpers;

  })();

}).call(this);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Bstr,
      DeepGet,
      Extend,
      GridEdit,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  _ = __webpack_require__(5);

  Bstr = __webpack_require__(18);

  Extend = __webpack_require__(30);

  DeepGet = __webpack_require__(85);

  /*
   */

  module.exports = GridEdit = function () {
    function GridEdit() {
      this.onModelSaveComplete = bind(this.onModelSaveComplete, this);
      this.onModelSaveError = bind(this.onModelSaveError, this);
      this.onModelSaveSuccess = bind(this.onModelSaveSuccess, this);
    }

    /*
      Override me to conditionally enable editing on a per cell basis
     */

    GridEdit.prototype.canEditCell = function (column, model) {
      var ref, ref1, ref2, ref3;
      if (column != null ? (ref = column.datum) != null ? (ref1 = ref.prototype) != null ? typeof ref1.isLocked === "function" ? ref1.isLocked(column, model) : void 0 : void 0 : void 0 : void 0) {
        return false;
      }
      if (typeof col !== "undefined" && col !== null ? (ref2 = col.datumProps) != null ? typeof ref2.shouldLock === "function" ? ref2.shouldLock(col, rowModel) : void 0 : void 0 : void 0) {
        return false;
      }
      return (ref3 = column.editable) != null ? ref3 : this.props.defaultColumnDef.editable;
    };

    GridEdit.prototype.isCellEditing = function (columnIndex, rowIndex) {
      var editCell;
      editCell = this.state.editingCell;
      if (editCell == null) {
        return false;
      }
      return editCell.rowIndex === rowIndex && editCell.columnIndex === columnIndex;
    };

    GridEdit.prototype.isCellSaving = function (columnIndex, rowIndex) {
      var savingCells;
      savingCells = this.state.savingCells || {};
      if (!(_.keys(savingCells).length > 0)) {
        return false;
      }
      return savingCells[columnIndex + "_" + rowIndex] === true;
    };

    GridEdit.prototype.wasCellSaved = function (columnIndex, rowIndex) {
      var savedCells;
      savedCells = this.state.savedCells || {};
      if (!(_.keys(savedCells).length > 0)) {
        return false;
      }
      return savedCells[columnIndex + "_" + rowIndex];
    };

    GridEdit.prototype.getSaveErrors = function (columnIndex, rowIndex) {
      var saveErrors;
      saveErrors = this.state.saveErrors || {};
      if (!(_.keys(saveErrors).length > 0)) {
        return false;
      }
      return saveErrors[columnIndex + "_" + rowIndex];
    };

    GridEdit.prototype.isDatagridEditing = function () {
      return this.state.editingCell != null && true || false;
    };

    GridEdit.prototype.editCellAt = function (evt, columnIndex, rowIndex) {
      return this.onCellEdit(evt, this.getColumn(columnIndex), this.getModelAt(rowIndex), columnIndex, rowIndex);
    };

    GridEdit.prototype.onCellEdit = function (evt, columnDef, model, columnIndex, rowIndex) {
      if (!this.canEditCell(columnDef, model)) {
        return false;
      }
      this.setState({
        editingCell: {
          columnIndex: columnIndex,
          rowIndex: rowIndex,
          value: this.getValueAt(columnIndex, rowIndex)
        }
      });
      return typeof this.originalMethod === "function" ? this.originalMethod(evt, columnDef, model, columnIndex, rowIndex) : void 0;
    };

    GridEdit.prototype.onCellChange = function (value, columnDef, model, columnIndex, rowIndex) {
      var newState;
      if (!(this.canEditCell(columnDef, model) && this.isCellEditing(columnIndex, rowIndex))) {
        return false;
      }
      newState = _.extend({}, this.state.editingCell, {
        value: value
      });
      return this.setState({
        editingCell: newState
      });
    };

    GridEdit.prototype.getEditingCell = function () {
      return this.state.editingCell;
    };

    GridEdit.prototype.saveEditingCell = function () {
      var columnDef, columnIndex, model, rowEvt, rowIndex, value;
      if (this.state.editingCell == null) {
        return false;
      }
      columnDef = this.getColumn(this.state.editingCell.columnIndex);
      model = this.getModelAt(this.state.editingCell.rowIndex);
      if (!this.canEditCell(columnDef, model)) {
        return false;
      }
      columnIndex = this.state.editingCell.columnIndex;
      rowIndex = this.state.editingCell.rowIndex;
      value = this.state.editingCell.value;
      rowEvt = {
        cellKey: columnDef.key,
        key: "Enter",
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        updated: value
      };
      this.saveModel(model, rowEvt);
      return this.setState({
        editingCell: null
      });
    };

    GridEdit.prototype.updateCell = function (columnIndex, rowIndex, value, options) {
      var column, error, model, parsedJsonObj;
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        silent: false
      });
      model = this.getModelAt(rowIndex);
      column = this.getColumn(columnIndex);
      if (!(model != null && column != null)) {
        return;
      }
      if (!this.canEditCell(column, model)) {
        return false;
      }
      try {
        if (_.isString(value)) {
          parsedJsonObj = JSON.parse(value);
        }
      } catch (error) {}
      return this.saveModel(model, {
        cellKey: column.key,
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        updated: parsedJsonObj != null ? parsedJsonObj : value,
        key: "Paste"
      }, options);
    };

    GridEdit.prototype.cancelEditing = function () {
      return this.setState({
        editingCell: null
      });
    };

    /*
      returns the current columns with defaults
     */

    GridEdit.prototype.getColumns = function () {
      var columns, i, ref;
      if (!(((ref = this.props.columns) != null ? ref.length : void 0) > 0)) {
        return [];
      }
      columns = this.props.columns.slice(0);
      return function () {
        var j, ref1, results;
        results = [];
        for (i = j = 0, ref1 = columns.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
          results.push(this.getColumn(i));
        }
        return results;
      }.call(this);
    };

    /*
      returns a column with defaulted attributes by key or index
     */

    GridEdit.prototype.getColumn = function (keyOrIndex) {
      var columnDef;
      if (this.originalMethod != null) {
        return this.originalMethod();
      }
      columnDef = _.isString(keyOrIndex) ? _.find(this.props.columns, function (c) {
        return c.key === keyOrIndex;
      }) : this.props.columns[keyOrIndex];
      return this.getColumnDefaults(columnDef);
    };

    GridEdit.prototype.getColumnDefaults = function (columnDef) {
      columnDef = Extend(true, {}, this.props.defaultColumnDef, columnDef);
      if (columnDef.name == null) {
        columnDef.name = Bstr.titleize(Bstr.humanize(columnDef.key));
      }
      columnDef.givenName = columnDef.name;
      if (columnDef.exportable == null) {
        columnDef.exportable = true;
      }
      return columnDef;
    };

    GridEdit.prototype.getModelAt = function (index) {
      var collection;
      collection = this.props.collection;
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

    GridEdit.prototype.getValueAt = function (colIndexOrKey, rowIndex) {
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
      columnKey = _.isNumber(colIndexOrKey) ? (ref = this.props.columns) != null ? (ref1 = ref[colIndexOrKey]) != null ? ref1.key : void 0 : void 0 : colIndexOrKey;
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
      var j, len, ref, ref1, validation, validationErrors, validationResult;
      validationErrors = [];
      ref1 = (ref = column.validations) != null ? ref : [];
      for (j = 0, len = ref1.length; j < len; j++) {
        validation = ref1[j];
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
      if (this.props.disableUndo) {
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
      var bucketKey, j, keys, len, operation, operations;
      keys = _.keys(this.undo);
      if (keys.length === 0) {
        return;
      }
      bucketKey = _.last(keys);
      operations = this.undo[bucketKey];
      for (j = 0, len = operations.length; j < len; j++) {
        operation = operations[j];
        this.clearCellErrors(operation.model, operation.rowEvt);
        Extend(true, operation.model.attributes, operation.revPatch);
        this.saveModel(operation.model, operation.rowEvt, {
          logUndo: false,
          setOnUpdate: false
        });
      }
      return delete this.undo[bucketKey];
    };

    GridEdit.prototype.logUndoDebounced = _.debounce(GridEdit.prototype._logUndo, GridEdit.LOG_UNDO_DEBOUNCE);

    /*
      TODO : rengineer this, everything else is more simply {columnIndex, rowIndex}
      
      we mimick rowEvt from react-data-grid which looked like this:
      {  
        cellKey: "costing.wholesaleCost.amount"
        key: "Enter"
        rowIndex: 0
        columnIndex: 0
        updated: "24"
      }
     */

    GridEdit.prototype.saveModel = function (model, rowEvt, options) {
      var attr, base, isDirty, newValue, oldValue, ref, ref1, revPatch, saveOptions;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        logUndo: !this.props.disableUndo,
        setOnUpdate: true,
        silent: false
      });
      attr = (ref = rowEvt.attribute) != null ? ref : rowEvt.cellKey;
      oldValue = this.getValueAt(rowEvt.cellKey, rowEvt.rowIndex);
      newValue = ((ref1 = rowEvt.updated) != null ? ref1.toString().trim() : void 0) !== '' ? rowEvt.updated : null;
      if (!(oldValue || newValue)) {
        return;
      }
      if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
        return;
      }
      this.clearCellErrors(model, rowEvt, options);
      saveOptions = this.getModelSaveOptions();
      saveOptions.__datagrid_rowEvt = rowEvt;
      saveOptions.silent = options.silent;
      if (!(this.props.setOnUpdate === false || options.setOnUpdate === false)) {
        if (!this.setValueOnModel(model, attr, newValue, saveOptions)) {
          return;
        }
      }
      revPatch = typeof model.getReversePatchObject === "function" ? model.getReversePatchObject() : void 0;
      if (options.logUndo) {
        if ((base = this.constructor)._batchUndoRequests == null) {
          base._batchUndoRequests = [];
        }
        this.constructor._batchUndoRequests.push({
          model: model,
          attr: attr,
          prevValue: revPatch != null ? revPatch : oldValue,
          rowEvt: rowEvt
        });
        this.logUndoDebounced.apply(this, arguments);
      }
      isDirty = _.isFunction(model.isDirty) ? model.isDirty() : true;
      if (this.props.saveOnUpdate !== false && isDirty) {
        this.setSaving(model, rowEvt, true, options);
        return (model.patch || model.save)({}, saveOptions);
      }
    };

    GridEdit.prototype.clearCellErrors = function (model, rowEvt, options) {
      var saveErrors;
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        silent: false
      });
      saveErrors = this.state.saveErrors != null ? _.extend({}, this.state.saveErrors) : {};
      delete saveErrors[rowEvt.columnIndex + "_" + rowEvt.rowIndex];
      if (options.silent) {
        return this.state.saveErrors = saveErrors;
      } else {
        return this.setState({
          saveErrors: saveErrors
        });
      }
    };

    GridEdit.prototype.setSaveSuccess = function (model, rowEvt, trueOrFalse, options) {
      var lookupKey, savedCells;
      if (options == null) {
        options = {};
      }
      if (model != null) {
        if (typeof model.setDatagridSaveSuccess === "function") {
          model.setDatagridSaveSuccess(rowEvt.cellKey, trueOrFalse);
        }
      }
      lookupKey = rowEvt.columnIndex + "_" + rowEvt.rowIndex;
      savedCells = this.state.savedCells != null ? _.extend({}, this.state.savedCells) : {};
      savedCells[lookupKey] = trueOrFalse;
      if (options.silent) {
        this.state.savedCells = savedCells;
      }
      if (trueOrFalse) {
        return _.delay(function (_this) {
          return function () {
            savedCells = _.extend({}, _this.state.savedCells);
            delete savedCells[lookupKey];
            if (options.silent) {
              _this.state.savedCells = savedCells;
              return _this._debouncedForceUpdate();
            } else {
              return _this.setState({
                savedCells: savedCells
              });
            }
          };
        }(this), 5000);
      }
    };

    GridEdit.prototype.setSaveErrors = function (model, rowEvt, resp) {
      var lookupKey, ref, saveErrors;
      if (model != null) {
        if (typeof model.setDatagridSaveErrors === "function") {
          model.setDatagridSaveErrors(rowEvt.cellKey, resp);
        }
      }
      lookupKey = rowEvt.columnIndex + "_" + rowEvt.rowIndex;
      saveErrors = (ref = this.state.saveErrors) != null ? ref : {};
      if (saveErrors[lookupKey] == null) {
        saveErrors[lookupKey] = [];
      }
      saveErrors[lookupKey].push(resp);
      return this.setState({
        saveErrors: saveErrors
      });
    };

    GridEdit.prototype.setSaving = function (model, rowEvt, trueOrFalse, options) {
      var savingCells;
      if (options == null) {
        options = {};
      }
      _.defaults(options, {
        silent: false
      });
      savingCells = this.state.savingCells || {};
      if (trueOrFalse) {
        savingCells[rowEvt.columnIndex + "_" + rowEvt.rowIndex] = true;
      } else {
        delete savingCells[rowEvt.columnIndex + "_" + rowEvt.rowIndex];
      }
      if (options.silent) {
        return this.state.savingCells = savingCells;
      } else {
        return this.setState({
          savingCells: savingCells
        });
      }
    };

    GridEdit.prototype.onModelSaveSuccess = function (model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        this.setSaveSuccess(model, rowEvt, true, options);
        this.clearCellErrors(model, rowEvt, options);
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
        this.setSaveErrors(model, rowEvt, resp);
      }
      return this.onModelSaveComplete(model, resp, options);
    };

    GridEdit.prototype.onModelSaveComplete = function (model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        this.setSaving(model, rowEvt, false, options);
      }
      if (options.silent) {
        return this._debouncedForceUpdate();
      }
    };

    return GridEdit;
  }();
}).call(undefined);

/***/ }),
/* 85 */
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var CompareObjects,
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

  ReactDOM = __webpack_require__(25);

  _ = __webpack_require__(5);

  CompareObjects = __webpack_require__(87);

  /*
    These are the selection methods available on react-datum-datagrid
    
    @state.selectedCells
      An array of objects with the following definition
        {
          colKey: string      # Defines the model attribute associated with this cell
          rowIndex: number   # Defines the row index of the model this row represents
          columnIndex: number      # Defines the column index. Not probably too useful outside this mixin
        } 
        
    getSelectedCells() method is added to datagrid class being mixed into.  It returns an array 
      of the selected cells.  Array may be just one member -> the currently highlighted cell 
        
    A typical use case would be to check if @state.selectedCells.length > 0, if so, use that.
    Otherwise, you can use getSelectedCell() to see if the user has just focused on a specific
    cell instead of selecting a range.  
    
    Addtional Props:
      onSelectedCellsChange - called with (@state.selectedCells)
   */

  module.exports = GridSelect = function () {
    function GridSelect() {
      this.isCellSelected = bind(this.isCellSelected, this);
      this.GridSelect_onDocumentKeyDown = bind(this.GridSelect_onDocumentKeyDown, this);
      this.onCellMouseMove = bind(this.onCellMouseMove, this);
      this.onCellMouseUp = bind(this.onCellMouseUp, this);
      this.onCellMouseDown = bind(this.onCellMouseDown, this);
      this.onCollectionReset = bind(this.onCollectionReset, this);
    }

    GridSelect.prototype.DOUBLE_CLICK_INTERVAL = 600;

    GridSelect.prototype.modelKeyIndex = [];

    GridSelect.prototype.startSelPosition = null;

    GridSelect.prototype.onCollectionReset = function () {
      this.resetSelectedCells();
      return typeof this.originalMethod === "function" ? this.originalMethod() : void 0;
    };

    GridSelect.prototype.onCellMouseDown = function (evt, cell) {
      var thisClickPosition, thisClickTick;
      this._updateModelKeyIndex();
      thisClickPosition = this._getCellPosition(cell);
      if (thisClickPosition == null) {
        return;
      }
      if (this.isCellEditing(thisClickPosition.columnIndex, thisClickPosition.rowIndex)) {
        return;
      }
      if (this.isDatagridEditing()) {
        this.saveEditingCell();
      }
      thisClickTick = Date.now();
      if (thisClickTick - this.lastClickTick < this.DOUBLE_CLICK_INTERVAL && CompareObjects(thisClickPosition, this.lastClickedPosition)) {
        this.onCellEdit(evt, cell.props.column, cell.props.model, cell.props.columnIndex, cell.props.rowIndex);
        return;
      }
      this.lastClickedPosition = thisClickPosition;
      this.lastClickTick = thisClickTick;
      if (!evt.shiftKey) {
        return this.startSelPosition = thisClickPosition;
      }
    };

    GridSelect.prototype.onCellMouseUp = function (evt, cell) {
      var endSelPosition, ref, rowModel, sameCellAsOrigin;
      endSelPosition = this._getCellPosition(cell);
      if (this.isCellEditing(endSelPosition.columnIndex, endSelPosition.rowIndex)) {
        return;
      }
      if (evt.shiftKey && ((ref = this.state.selectedCells) != null ? ref.length : void 0) > 0) {
        this.selectCellsBetween(this.getSelectedCell(), endSelPosition);
      } else if (this.startSelPosition != null) {
        if (endSelPosition == null) {
          this.startSelPosition = null;
          return;
        }
        sameCellAsOrigin = endSelPosition.rowIndex === this.startSelPosition.rowIndex && endSelPosition.colKey === this.startSelPosition.colKey;
        rowModel = cell.props.model;
        if (evt.metaKey || evt.ctrKey) {
          if (sameCellAsOrigin) {
            if (this.isCellSelected(endSelPosition.rowIndex, endSelPosition.colKey)) {
              this.deselectCell(endSelPosition.rowIndex, endSelPosition.colKey);
            } else {
              this.selectCellPosition(endSelPosition);
            }
          }
        } else if (sameCellAsOrigin) {
          this.setSelectedCell(cell);
        }
      } else {
        this.setSelectedCell(cell);
      }
      return this.startSelPosition = null;
    };

    GridSelect.prototype.onCellMouseMove = function (evt, cell) {
      var thisCellPosition;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.metaKey || evt.ctrKey || evt.shiftKey) {
        return;
      }
      thisCellPosition = this._getCellPosition(cell);
      if (this.startSelPosition != null && !CompareObjects(this.startSelPosition, thisCellPosition)) {
        return this.selectCellsBetween(this.startSelPosition, thisCellPosition);
      }
    };

    GridSelect.prototype.onSelectColumn = function (evt, columnIndex) {
      var selectAllCells;
      evt.stopPropagation();
      this.setState({
        selectingAll: true
      });
      selectAllCells = function (_this) {
        return function () {
          var column, i, index, len, model, models, ref, selectedCells;
          column = _this.getColumn(columnIndex);
          selectedCells = [];
          models = Array.isArray(_this.props.collection) ? _this.props.collection : (ref = _this.props.collection.models) != null ? ref : [];
          for (index = i = 0, len = models.length; i < len; index = ++i) {
            model = models[index];
            selectedCells.push({
              rowIndex: index,
              colKey: column.key,
              columnIndex: columnIndex
            });
          }
          return _this.setState({
            selectedCells: selectedCells,
            selectingAll: false
          });
        };
      }(this);
      if (_.isFunction(this.props.collection.ensureAllRows)) {
        this.setState({
          selectedCells: [],
          selectingAll: true
        });
        return this.props.collection.ensureAllRows({
          success: selectAllCells
        });
      } else {
        return selectAllCells();
      }
    };

    GridSelect.prototype.GridSelect_onDocumentKeyDown = function (evt) {
      var cellPosition, columnIndex, i, keyCode, ref, ref1, ref2, ref3, results, rowIndex;
      if (!this.__isInOurDatagrid(evt.target)) {
        return;
      }
      keyCode = evt.keyCode;
      if (this.isDatagridEditing()) {
        switch (keyCode) {
          case 13:
          case 9:
            evt.preventDefault();
            cellPosition = this._getRelativeCellPosition(keyCode);
            this.saveEditingCell();
            if (cellPosition != null) {
              this.setSelectedCellAt(cellPosition);
              return this.editCellAt(evt, cellPosition.columnIndex, cellPosition.rowIndex);
            }
            break;
          case 27:
            return this.cancelEditing();
        }
      } else {
        switch (false) {
          case !((keyCode === 13 || keyCode === 32 || keyCode === 110 || indexOf.call(function () {
            results = [];
            for (i = 48; i <= 90; i++) {
              results.push(i);
            }
            return results;
          }.apply(this), keyCode) >= 0) && !(evt.ctrlKey || evt.metaKey)):
            if (((ref = this.state.selectedCells) != null ? ref.length : void 0) > 0) {
              ref1 = this.getSelectedCell(), columnIndex = ref1.columnIndex, rowIndex = ref1.rowIndex;
              return this.editCellAt(evt, columnIndex, rowIndex);
            }
            break;
          case keyCode !== 27:
            return this.resetSelectedCells();
          case keyCode !== 37 && keyCode !== 38 && keyCode !== 39 && keyCode !== 40:
            evt.preventDefault();
            if (evt.shiftKey) {
              if (((ref2 = this.state.selectedCells) != null ? ref2.length : void 0) > 0) {
                return this.selectCellsBetween(this.getSelectedCell(), this._getRelativeCellPosition(keyCode));
              }
            } else if (((ref3 = this.state.selectedCells) != null ? ref3.length : void 0) > 0) {
              this.startSelPosition = null;
              cellPosition = this._getRelativeCellPosition(keyCode);
              if (cellPosition != null) {
                return this.setSelectedCellAt(cellPosition);
              }
            }
        }
      }
    };

    GridSelect.prototype._getRelativeCellPosition = function (keyCode) {
      var adjacentCell, lastSelectedCellPosition, ref;
      lastSelectedCellPosition = (ref = this.getLastSelectedCellPosition()) != null ? ref : this.getEditingCell();
      if (lastSelectedCellPosition == null) {
        return null;
      }
      adjacentCell = function () {
        switch (keyCode) {
          case 37:
            if (lastSelectedCellPosition.columnIndex > 0) {
              return _.extend({}, lastSelectedCellPosition, {
                columnIndex: lastSelectedCellPosition.columnIndex - 1,
                colKey: this.props.columns[lastSelectedCellPosition.columnIndex - 1].key
              });
            }
            break;
          case 38:
            if (lastSelectedCellPosition.rowIndex > 0) {
              return _.extend({}, lastSelectedCellPosition, {
                rowIndex: lastSelectedCellPosition.rowIndex - 1
              });
            }
            break;
          case 39:
          case 9:
            if (lastSelectedCellPosition.columnIndex < this.props.columns.length - 1) {
              return _.extend({}, lastSelectedCellPosition, {
                columnIndex: lastSelectedCellPosition.columnIndex + 1,
                colKey: this.props.columns[lastSelectedCellPosition.columnIndex + 1].key
              });
            }
            break;
          case 40:
          case 13:
            if (lastSelectedCellPosition.rowIndex < this.getRowCount() - 1) {
              return _.extend({}, lastSelectedCellPosition, {
                rowIndex: lastSelectedCellPosition.rowIndex + 1
              });
            }
        }
      }.call(this);
      return adjacentCell;
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
            rowIndex: startRow + rows * modifierX,
            colKey: this.modelKeyIndex[startCol + cols * modifierY],
            columnIndex: startCol + cols * modifierY
          });
        }
      }
      return result;
    };

    GridSelect.prototype.getSelectedCell = function () {
      var ref;
      return ((ref = this.state.selectedCells) != null ? ref[0] : void 0) || null;
    };

    GridSelect.prototype.setSelectedCell = function (cell) {
      return this.setSelectedCellAt(this._getCellPosition(cell));
    };

    GridSelect.prototype.setSelectedCellAt = function (cellPosition) {
      this.setState({
        selectedCells: [cellPosition]
      });
      return this.onSelectedCellsChange();
    };

    GridSelect.prototype.isCellSelected = function (rowIndex, colKey) {
      var selectedCell;
      selectedCell = this.getSelectedCell();
      return selectedCell.rowIndex === rowIndex && selectedCell.colKey === colKey;
    };

    GridSelect.prototype.getSelectedColumn = function () {
      var colIndex, ref;
      colIndex = (ref = this.getSelectedCell()) != null ? ref.columnIndex : void 0;
      if (colIndex == null) {
        return null;
      }
      return this.getColumn(colIndex);
    };

    GridSelect.prototype.resetSelectedCells = function (options) {
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      if (options.silent) {
        return this.state.selectedCells = [];
      } else {
        return this.setState({
          selectedCells: []
        }, function () {
          if (!options.silent) {
            return this.onSelectedCellsChange();
          }
        });
      }
    };

    GridSelect.prototype.selectCellPositions = function (cellPositions) {
      var cellPosition, i, len;
      this.resetSelectedCells({
        silent: true
      });
      for (i = 0, len = cellPositions.length; i < len; i++) {
        cellPosition = cellPositions[i];
        this.selectCellPosition(cellPosition, {
          silent: true
        });
      }
      return this.setState({
        selectedCells: this.state.selectedCells
      }, function () {
        return this.onSelectedCellsChange();
      });
    };

    GridSelect.prototype.selectCellsBetween = function (startSelPosition, endSelPosition) {
      var cells;
      this.startSelPosition = startSelPosition;
      cells = this._getCellsBetween(this.startSelPosition.rowIndex, this.startSelPosition.columnIndex, endSelPosition.rowIndex, endSelPosition.columnIndex);
      return this.selectCellPositions(cells);
    };

    GridSelect.prototype.selectCell = function (cell) {
      return this.selectCellPosition(this._getCellPosition(cell));
    };

    GridSelect.prototype.selectCellPosition = function (cellPosition, options) {
      var cell, selectedCells;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      if (cellPosition.rowIndex < 0 || this.modelKeyIndex.indexOf(cellPosition.colKey) < 0) {
        return;
      }
      cell = {
        rowIndex: cellPosition.rowIndex,
        colKey: cellPosition.colKey,
        columnIndex: this.modelKeyIndex.indexOf(cellPosition.colKey)
      };
      if (!this.isCellSelected(cellPosition.rowIndex, cellPosition.colKey)) {
        selectedCells = this.state.selectedCells.slice(0);
        selectedCells.push(cellPosition);
        if (options.silent) {
          return this.state.selectedCells = selectedCells;
        } else {
          return this.setState({
            selectedCells: selectedCells
          }, function () {
            return this.onSelectedCellsChange();
          });
        }
      }
    };

    GridSelect.prototype.isCellSelected = function (row, colKey) {
      return _.any(this.state.selectedCells, function (cell) {
        return cell.rowIndex === row && cell.colKey === colKey;
      });
    };

    GridSelect.prototype.deselectCell = function (rowIndex, colKey) {
      var newSelectedCells;
      newSelectedCells = _.filter(this.state.selectedCells, function (cell) {
        return !(cell.rowIndex === rowIndex && cell.colKey === colKey);
      });
      return this.setState({
        selectedCells: newSelectedCells
      }, function () {
        return this.onSelectedCellsChange();
      });
    };

    /*
      returns an array of selectedCells.  May be array of one - the highlighted cell
     */

    GridSelect.prototype.getSelectedCells = function () {
      var ref;
      return (ref = this.state.selectedCells) != null ? ref : [];
    };

    /*
      returns the cell position of the last cell selected by user
     */

    GridSelect.prototype.getLastSelectedCellPosition = function () {
      var ref;
      if (!(((ref = this.state.selectedCells) != null ? ref.length : void 0) > 0)) {
        return null;
      }
      return this.state.selectedCells.slice(-1)[0];
    };

    GridSelect.prototype.onSelectedCellsChange = function () {
      var base, ref;
      return typeof (base = this.props).onSelectedCellsChange === "function" ? base.onSelectedCellsChange(((ref = this.state.selectedCells) != null ? ref : []).slice(0)) : void 0;
    };

    GridSelect.prototype.onCellEdit = function (evt, columnDef, model, columnIndex, rowIndex) {
      this.startSelPosition = null;
      this.resetSelectedCells();
      return typeof this.originalMethod === "function" ? this.originalMethod(evt, columnDef, model, columnIndex, rowIndex) : void 0;
    };

    GridSelect.prototype._updateModelKeyIndex = function () {
      return this.modelKeyIndex = _.map(this.props.columns, function (columnDef) {
        return columnDef.key;
      });
    };

    GridSelect.prototype._getCellPosition = function (cell) {
      return {
        rowIndex: cell.props.rowIndex,
        colKey: cell.props.column.key,
        columnIndex: cell.props.columnIndex
      };
    };

    GridSelect.prototype.__isInOurDatagrid = function (element) {
      return ReactDOM.findDOMNode(this).contains(element);
    };

    return GridSelect;
  }();
}).call(undefined);

/***/ }),
/* 87 */
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

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  This mixin (see ./mixin.coffee) provides the scrolling syncronization between headers, 
  locked columns and free scrolling grids
 */

(function () {
  var GridScroll,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  module.exports = GridScroll = function () {
    function GridScroll() {
      this._onHeaderScroll = bind(this._onHeaderScroll, this);
      this._onFreeGridScroll = bind(this._onFreeGridScroll, this);
      this._onLockedGridScroll = bind(this._onLockedGridScroll, this);
    }

    GridScroll.prototype.componentDidMount = function () {
      this._initializeScrolling();
      return typeof this.originalMethod === "function" ? this.originalMethod() : void 0;
    };

    GridScroll.prototype._initializeScrolling = function () {
      var freeGridEl, lockedGridEl, scrollingHeaderCellsEl;
      lockedGridEl = this._getLockedGridEl();
      freeGridEl = this._getFreeGridEl();
      lockedGridEl.addEventListener('scroll', function (_this) {
        return function () {
          return _this._onLockedGridScroll();
        };
      }(this));
      freeGridEl.addEventListener('scroll', function (_this) {
        return function () {
          return _this._onFreeGridScroll();
        };
      }(this));
      scrollingHeaderCellsEl = this._getScrollingHeadersEl();
      return scrollingHeaderCellsEl.addEventListener('scroll', function (_this) {
        return function () {
          return _this._onHeaderScroll();
        };
      }(this));
    };

    GridScroll.prototype._getLockedGridEl = function () {
      return ReactDOM.findDOMNode(this).querySelector('.rdd-locked-grid .rdd-rv-grid');
    };

    GridScroll.prototype._getFreeGridEl = function () {
      return ReactDOM.findDOMNode(this).querySelector('.rdd-free-grid .rdd-rv-grid');
    };

    GridScroll.prototype._getScrollingHeadersEl = function () {
      return ReactDOM.findDOMNode(this).querySelector('.rdd-scrolling-header-cells');
    };

    GridScroll.prototype._onLockedGridScroll = function () {
      var freeGridEl, lockedGridEl;
      if (!this._isFreeGridInitiatedScrolling) {
        this._isLockedGridInitiatedScrolling = true;
        lockedGridEl = this._getLockedGridEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          freeGridEl.scrollTop = lockedGridEl.scrollTop;
        } else {
          freeGridEl.scrollLeft = lockedGridEl.scrollLeft;
        }
      }
      return this._isFreeGridInitiatedScrolling = false;
    };

    GridScroll.prototype._onFreeGridScroll = function () {
      var freeGridEl, lockedGridEl, scrollingHeaderCellsEl;
      if (!(this._isLockedGridInitiatedScrolling || this._isLabelInitiatedScrolling)) {
        this._isFreeGridInitiatedScrolling = true;
        lockedGridEl = this._getLockedGridEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          lockedGridEl.scrollTop = freeGridEl.scrollTop;
        } else {
          lockedGridEl.scrollLeft = freeGridEl.scrollLeft;
        }
      }
      this._isLockedGridInitiatedScrolling = false;
      if (!this._isLabelInitiatedScrolling) {
        scrollingHeaderCellsEl = this._getScrollingHeadersEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          scrollingHeaderCellsEl.scrollLeft = freeGridEl.scrollLeft;
        } else {
          scrollingHeaderCellsEl.scrollTop = freeGridEl.scrollTop;
        }
      }
      return this._isLabelInitiatedScrolling = false;
    };

    GridScroll.prototype._onHeaderScroll = function () {
      var freeGridEl, scrollingHeaderCellsEl;
      if (!this._isFreeGridInitiatedScrolling) {
        this._isLabelInitiatedScrolling = true;
        scrollingHeaderCellsEl = this._getScrollingHeadersEl();
        freeGridEl = this._getFreeGridEl();
        if (this.props.orientation === 'landscape') {
          freeGridEl.scrollLeft = scrollingHeaderCellsEl.scrollLeft;
        } else {
          freeGridEl.scrollTop = scrollingHeaderCellsEl.scrollTop;
        }
      }
      return this._isFreeGridInitiatedScrolling = false;
    };

    return GridScroll;
  }();
}).call(undefined);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var CopyPasteFromExcel,
      GridCopyPaste,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  CopyPasteFromExcel = __webpack_require__(90);

  module.exports = GridCopyPaste = function () {
    function GridCopyPaste() {
      this.GridCopyPaste_onDocumentPaste = bind(this.GridCopyPaste_onDocumentPaste, this);
      this.GridCopyPaste_onDocumentCopy = bind(this.GridCopyPaste_onDocumentCopy, this);
    }

    GridCopyPaste.prototype.copyPasteHelper = new CopyPasteFromExcel();

    GridCopyPaste.prototype.GridCopyPaste_onDocumentCopy = function (e) {
      var cell, cells, cellsInRow, i, j, len, len1, ref, result, row, rowModel, rows, vals;
      if (e.target.closest('.rdd-cell-editing') != null) {
        return;
      }
      result = [];
      cells = this.getSelectedCells();
      rows = _.uniq(_.map(cells, function (cell) {
        return cell.rowIndex;
      }));
      for (i = 0, len = rows.length; i < len; i++) {
        row = rows[i];
        rowModel = this.getModelAt(row);
        if (rowModel == null) {
          continue;
        }
        cellsInRow = _.filter(cells, function (cell) {
          return cell.rowIndex === row;
        });
        cellsInRow = _.sortBy(cellsInRow, 'columnIndex');
        vals = [];
        ref = _.filter(cellsInRow, function (cell) {
          return cell != null;
        });
        for (j = 0, len1 = ref.length; j < len1; j++) {
          cell = ref[j];
          vals.push(this.getExportValue(rowModel, this.getColumn(cell.colKey)));
        }
        result.push(vals.join("\t"));
      }
      e.clipboardData.setData('text/plain', result.join("\n"));
      e.stopPropagation();
      return e.preventDefault();
    };

    GridCopyPaste.prototype.GridCopyPaste_onDocumentPaste = function (e) {
      var activeEl, cell, columnIndex, i, j, k, len, offset, paste, pasteRow, ref, ref1, ref2, ref3, rowIndex, rowModel, start;
      paste = this.copyPasteHelper.processPaste(e);
      activeEl = document.activeElement;
      if (activeEl.closest('.rdd-cell-editing') != null || activeEl.matches('input,textarea')) {
        return;
      }
      if (!Array.isArray(paste) && paste.indexOf('\t') >= 0) {
        paste = [paste.split('\t')];
      }
      if (Array.isArray(paste)) {
        if (this.state.selectedCells.length > 0) {
          start = this._getUpperLeftBound();
          for (rowIndex = i = ref = start.top, ref1 = start.top + paste.length - 1; ref <= ref1 ? i <= ref1 : i >= ref1; rowIndex = ref <= ref1 ? ++i : --i) {
            pasteRow = paste[rowIndex - start.top];
            if (!Array.isArray(pasteRow)) {
              pasteRow = [pasteRow];
            }
            rowModel = this.getModelAt(rowIndex);
            for (offset = j = 0, ref2 = pasteRow.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; offset = 0 <= ref2 ? ++j : --j) {
              columnIndex = start.left + offset;
              if (columnIndex >= this.props.columns.length) {
                continue;
              }
              this.updateCell(columnIndex, rowIndex, pasteRow[offset], {
                silent: true
              });
            }
          }
        }
      } else {
        ref3 = this.getSelectedCells();
        for (k = 0, len = ref3.length; k < len; k++) {
          cell = ref3[k];
          rowModel = this.getModelAt(cell.rowIndex);
          this.updateCell(cell.columnIndex, cell.rowIndex, paste, {
            silent: true
          });
        }
      }
      this.forceUpdate();
      e.stopPropagation();
      return e.preventDefault();
    };

    GridCopyPaste.prototype._getUpperLeftBound = function (cells) {
      var left, top;
      if (cells == null) {
        cells = this.state.selectedCells;
      }
      if (cells == null) {
        return [];
      }
      top = _.min(cells, function (cell) {
        return cell.rowIndex;
      });
      cells = _.filter(cells, function (cell) {
        return cell.rowIndex === top.rowIndex;
      });
      left = _.min(cells, function (cell) {
        return cell.columnIndex;
      });
      return {
        top: top.rowIndex,
        left: left.columnIndex
      };
    };

    GridCopyPaste.prototype._getLowerRightBound = function (cells) {
      var bottom, right;
      if (cells == null) {
        cells = this.state.selectedCells;
      }
      if (cells == null) {
        return [];
      }
      bottom = _.max(cells, function (cell) {
        return cell.rowIndex;
      });
      cells = _.filter(cells, function (cell) {
        return cell.rowIndex === bottom.rowIndex;
      });
      right = _.max(cells, function (cell) {
        return cell.columnIndex;
      });
      return {
        bottom: bottom.rowIndex,
        right: right.columnIndex
      };
    };

    return GridCopyPaste;
  }();
}).call(undefined);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Bstr,
      CopyPasteFromExcel,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  Bstr = __webpack_require__(18);

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
      trimmed = Bstr.trim(str);
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var GridExport;

  module.exports = GridExport = function () {
    function GridExport() {}

    /* 
      exports the currently viewed grid and data to csv
     */

    GridExport.prototype.exportToCsv = function () {
      var collection, column, columnHeader, columns, exportCols, headers, i, j, len, model, ref, rowIndex, rows, value;
      collection = this.props.collection;
      columns = this.getColumns();
      rows = [];
      headers = function () {
        var i, len, ref, results;
        results = [];
        for (i = 0, len = columns.length; i < len; i++) {
          column = columns[i];
          if (!column.exportable) {
            continue;
          }
          columnHeader = [column.exportAs || column.givenName || column.name];
          if (column.alsoExport != null) {
            columnHeader.push((ref = column.alsoExport) != null ? ref.name : void 0);
          }
          results.push(columnHeader);
        }
        return results;
      }();
      rows.push(headers.join(','));
      if ((collection != null ? collection.length : void 0) > 0) {
        for (rowIndex = i = 0, ref = this.getRowCount(); 0 <= ref ? i < ref : i > ref; rowIndex = 0 <= ref ? ++i : --i) {
          model = this.getModelAt(rowIndex);
          if (model == null) {
            continue;
          }
          exportCols = [];
          for (j = 0, len = columns.length; j < len; j++) {
            column = columns[j];
            if (!column.exportable) {
              continue;
            }
            value = this.getExportValue(model, column, {
              forCsv: true
            });
            exportCols.push('"' + ((value != null ? value.toString() : void 0) || '') + '"');
            if (column.alsoExport != null) {
              value = this.getExportValue(model, column.alsoExport);
              exportCols.push('"' + ((value != null ? value.toString() : void 0) || '') + '"');
            }
          }
          rows.push(exportCols.join(','));
        }
      }
      return rows.join('\n');
    };

    return GridExport;
  }();
}).call(undefined);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Bstr, GridSort;

  Bstr = __webpack_require__(18);

  module.exports = GridSort = function () {
    function GridSort() {}

    GridSort.prototype.onSortColumn = function (columnIndex, columnDef, direction) {
      return this.setState({
        isSorting: true,
        sortColumnIndex: columnIndex,
        sortDirection: direction
      }, function (_this) {
        return function () {
          var arrayToSort, getSortableValue, i, len, model, ref;
          if (_this.props.onSort) {
            return _this.props.onSort(columnIndex, columnDef, direction, function () {
              return _this.setState({
                isSorting: false
              });
            });
          } else if (_.isFunction((ref = _this.props.collection) != null ? ref.onDatagridSort : void 0)) {
            return _this.props.collection.onDatagridSort(columnDef.key, direction, columnDef, {
              success: function success() {
                return _this.setState({
                  isSorting: false
                });
              },
              error: function error() {
                return _this.setState({
                  isSorting: false
                });
              }
            });
          } else {
            getSortableValue = function getSortableValue(object) {
              var attr, ref1;
              attr = (ref1 = columnDef.sortAttr) != null ? ref1 : columnDef.key;
              if (_.isFunction(object.get)) {
                return object.get(attr);
              } else {
                return object[attr];
              }
            };
            arrayToSort = _.isArray(_this.props.collection) ? _this.props.collection : _this.props.collection.models || [];
            arrayToSort.sort(function (a, b) {
              var aVal, bVal, isNumeric, ref1, temp;
              aVal = getSortableValue(a);
              bVal = getSortableValue(b);
              isNumeric = isFinite(aVal) && isFinite(bVal);
              if (direction === "DESC") {
                temp = aVal;
                aVal = bVal;
                bVal = temp;
              }
              if (isNumeric) {
                return aVal - bVal;
              } else {
                return Bstr.weaklyCompare((ref1 = aVal != null ? aVal.toString() : void 0) != null ? ref1 : "", bVal != null ? bVal : "");
              }
            });
            for (i = 0, len = arrayToSort.length; i < len; i++) {
              model = arrayToSort[i];
              delete model.index;
              delete model.attributes.index;
            }
            if (_.isFunction(_this.props.collection.reset)) {
              _this.props.collection.reset(arrayToSort);
            } else {
              _this.props.collection = arrayToSort;
            }
            return _this.setState({
              isSorting: false
            });
          }
        };
      }(this));
    };

    return GridSort;
  }();
}).call(undefined);

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_93__;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var React,
      SortIndicator,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(2);

  module.exports = SortIndicator = function (superClass) {
    extend(SortIndicator, superClass);

    function SortIndicator() {
      return SortIndicator.__super__.constructor.apply(this, arguments);
    }

    SortIndicator.propTypes = {
      sorted: PropTypes.oneOf(['ASC', 'DESC']),
      onSort: PropTypes.func,
      onSelectColumn: PropTypes.func
    };

    SortIndicator.prototype.render = function () {
      var className, icon;
      icon = null;
      className = 'rdd-header-icon';
      switch (this.props.sorted) {
        case 'ASC':
          icon = this.renderSortedAsc();
          className += ' rdd-sort-indicator-asc';
          break;
        case 'DESC':
          icon = this.renderSortedDesc();
          className += ' rdd-sort-indicator-desc';
          break;
        default:
          icon = this.renderUnsorted();
          className += ' rdd-sort-indicator';
      }
      return React.createElement("div", {
        "className": className,
        "title": "click to edit this cell, or double click anywhere in cell, or press enter with cell selected",
        "onClick": this.props.onClick
      }, icon);
    };

    SortIndicator.prototype.renderUnsorted = function () {
      return React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 512"
      }, React.createElement("path", {
        "d": "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
      }));
    };

    SortIndicator.prototype.renderSortedAsc = function () {
      return React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 512"
      }, React.createElement("path", {
        "d": "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
      }));
    };

    SortIndicator.prototype.renderSortedDesc = function () {
      return React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 512"
      }, React.createElement("path", {
        "d": "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
      }));
    };

    return SortIndicator;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SCROLLING_RESET_TIME_INTERVAL = undefined;

var _extends2 = __webpack_require__(51);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(58);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(23);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(24);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(67);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__(31);

var _classnames2 = _interopRequireDefault(_classnames);

var _calculateSizeAndPositionDataAndUpdateScrollOffset = __webpack_require__(137);

var _calculateSizeAndPositionDataAndUpdateScrollOffset2 = _interopRequireDefault(_calculateSizeAndPositionDataAndUpdateScrollOffset);

var _ScalingCellSizeAndPositionManager = __webpack_require__(46);

var _ScalingCellSizeAndPositionManager2 = _interopRequireDefault(_ScalingCellSizeAndPositionManager);

var _createCallbackMemoizer = __webpack_require__(141);

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _defaultOverscanIndicesGetter = __webpack_require__(145);

var _defaultOverscanIndicesGetter2 = _interopRequireDefault(_defaultOverscanIndicesGetter);

var _updateScrollIndexHelper = __webpack_require__(146);

var _updateScrollIndexHelper2 = _interopRequireDefault(_updateScrollIndexHelper);

var _defaultCellRangeRenderer = __webpack_require__(147);

var _defaultCellRangeRenderer2 = _interopRequireDefault(_defaultCellRangeRenderer);

var _scrollbarSize = __webpack_require__(148);

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _requestAnimationTimeout = __webpack_require__(68);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Alignment = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_Alignment || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_RenderedSection = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_RenderedSection || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_ScrollbarPresenceChange || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_Scroll = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_Scroll || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_NoContentRenderer = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_NoContentRenderer || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellSizeGetter = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellSizeGetter || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellSize = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellSize || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellPosition = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellPosition || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellRangeRenderer = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellRangeRenderer || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellRenderer = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellRenderer || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_AnimationTimeoutId = __webpack_require__(68).babelPluginFlowReactPropTypes_proptype_AnimationTimeoutId || __webpack_require__(0).any;

/**
 * Specifies the number of milliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var DEFAULT_SCROLLING_RESET_TIME_INTERVAL = exports.DEFAULT_SCROLLING_RESET_TIME_INTERVAL = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

var renderNull = function renderNull() {
  return null;
};

/**
 * Renders tabular data with virtualization along the vertical and horizontal axes.
 * Row heights and column widths must be known ahead of time and specified as properties.
 */
var Grid = function (_React$PureComponent) {
  (0, _inherits3.default)(Grid, _React$PureComponent);

  // Invokes onSectionRendered callback only when start/stop row or column indices change
  function Grid(props) {
    (0, _classCallCheck3.default)(this, Grid);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Grid.__proto__ || (0, _getPrototypeOf2.default)(Grid)).call(this, props));

    _this.state = {
      isScrolling: false,
      scrollDirectionHorizontal: _defaultOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD,
      scrollDirectionVertical: _defaultOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD,
      scrollLeft: 0,
      scrollTop: 0,
      scrollPositionChangeReason: null
    };
    _this._onGridRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);
    _this._deferredInvalidateColumnIndex = null;
    _this._deferredInvalidateRowIndex = null;
    _this._recomputeScrollLeftFlag = false;
    _this._recomputeScrollTopFlag = false;
    _this._horizontalScrollBarSize = 0;
    _this._verticalScrollBarSize = 0;
    _this._scrollbarPresenceChanged = false;
    _this._cellCache = {};
    _this._styleCache = {};
    _this._scrollbarSizeMeasured = false;
    _this._renderedColumnStartIndex = 0;
    _this._renderedColumnStopIndex = 0;
    _this._renderedRowStartIndex = 0;
    _this._renderedRowStopIndex = 0;

    _this._debounceScrollEndedCallback = function () {
      _this._disablePointerEventsTimeoutId = null;
      _this._resetStyleCache();
    };

    _this._invokeOnGridRenderedHelper = function () {
      var onSectionRendered = _this.props.onSectionRendered;


      _this._onGridRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          columnOverscanStartIndex: _this._columnStartIndex,
          columnOverscanStopIndex: _this._columnStopIndex,
          columnStartIndex: _this._renderedColumnStartIndex,
          columnStopIndex: _this._renderedColumnStopIndex,
          rowOverscanStartIndex: _this._rowStartIndex,
          rowOverscanStopIndex: _this._rowStopIndex,
          rowStartIndex: _this._renderedRowStartIndex,
          rowStopIndex: _this._renderedRowStopIndex
        }
      });
    };

    _this._setScrollingContainerRef = function (ref) {
      _this._scrollingContainer = ref;
    };

    _this._onScroll = function (event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target === _this._scrollingContainer) {
        _this.handleScrollEvent(event.target);
      }
    };

    _this._columnWidthGetter = _this._wrapSizeGetter(props.columnWidth);
    _this._rowHeightGetter = _this._wrapSizeGetter(props.rowHeight);

    _this._columnSizeAndPositionManager = new _ScalingCellSizeAndPositionManager2.default({
      cellCount: props.columnCount,
      cellSizeGetter: function cellSizeGetter(params) {
        return _this._columnWidthGetter(params);
      },
      estimatedCellSize: _this._getEstimatedColumnSize(props)
    });
    _this._rowSizeAndPositionManager = new _ScalingCellSizeAndPositionManager2.default({
      cellCount: props.rowCount,
      cellSizeGetter: function cellSizeGetter(params) {
        return _this._rowHeightGetter(params);
      },
      estimatedCellSize: _this._getEstimatedRowSize(props)
    });
    return _this;
  }

  /**
   * Gets offsets for a given cell and alignment.
   */


  // See defaultCellRangeRenderer() for more information on the usage of these caches


  (0, _createClass3.default)(Grid, [{
    key: 'getOffsetForCell',
    value: function getOffsetForCell() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$alignment = _ref.alignment,
          alignment = _ref$alignment === undefined ? this.props.scrollToAlignment : _ref$alignment,
          _ref$columnIndex = _ref.columnIndex,
          columnIndex = _ref$columnIndex === undefined ? this.props.scrollToColumn : _ref$columnIndex,
          _ref$rowIndex = _ref.rowIndex,
          rowIndex = _ref$rowIndex === undefined ? this.props.scrollToRow : _ref$rowIndex;

      var offsetProps = (0, _extends3.default)({}, this.props, {
        scrollToAlignment: alignment,
        scrollToColumn: columnIndex,
        scrollToRow: rowIndex
      });

      return {
        scrollLeft: this._getCalculatedScrollLeft(offsetProps),
        scrollTop: this._getCalculatedScrollTop(offsetProps)
      };
    }

    /**
     * This method handles a scroll event originating from an external scroll control.
     * It's an advanced method and should probably not be used unless you're implementing a custom scroll-bar solution.
     */

  }, {
    key: 'handleScrollEvent',
    value: function handleScrollEvent(_ref2) {
      var _ref2$scrollLeft = _ref2.scrollLeft,
          scrollLeftParam = _ref2$scrollLeft === undefined ? 0 : _ref2$scrollLeft,
          _ref2$scrollTop = _ref2.scrollTop,
          scrollTopParam = _ref2$scrollTop === undefined ? 0 : _ref2$scrollTop;

      // On iOS, we can arrive at negative offsets by swiping past the start.
      // To prevent flicker here, we make playing in the negative offset zone cause nothing to happen.
      if (scrollTopParam < 0) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._debounceScrollEnded();

      var _props = this.props,
          autoHeight = _props.autoHeight,
          autoWidth = _props.autoWidth,
          height = _props.height,
          width = _props.width;

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scroll offsets never exceed their bounds.

      var scrollbarSize = this._scrollbarSize;
      var totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();
      var totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();
      var scrollLeft = Math.min(Math.max(0, totalColumnsWidth - width + scrollbarSize), scrollLeftParam);
      var scrollTop = Math.min(Math.max(0, totalRowsHeight - height + scrollbarSize), scrollTopParam);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Track scrolling direction so we can more efficiently overscan rows to reduce empty space around the edges while scrolling.
        // Don't change direction for an axis unless scroll offset has changed.
        var _scrollDirectionHorizontal = scrollLeft !== this.state.scrollLeft ? scrollLeft > this.state.scrollLeft ? _defaultOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD : _defaultOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD : this.state.scrollDirectionHorizontal;
        var _scrollDirectionVertical = scrollTop !== this.state.scrollTop ? scrollTop > this.state.scrollTop ? _defaultOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD : _defaultOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD : this.state.scrollDirectionVertical;

        var newState = {
          isScrolling: true,
          scrollDirectionHorizontal: _scrollDirectionHorizontal,
          scrollDirectionVertical: _scrollDirectionVertical,
          scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.OBSERVED
        };

        if (!autoHeight) {
          newState.scrollTop = scrollTop;
        }

        if (!autoWidth) {
          newState.scrollLeft = scrollLeft;
        }

        this.setState(newState);
      }

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        totalColumnsWidth: totalColumnsWidth,
        totalRowsHeight: totalRowsHeight
      });
    }

    /**
     * Invalidate Grid size and recompute visible cells.
     * This is a deferred wrapper for recomputeGridSize().
     * It sets a flag to be evaluated on cDM/cDU to avoid unnecessary renders.
     * This method is intended for advanced use-cases like CellMeasurer.
     */
    // @TODO (bvaughn) Add automated test coverage for this.

  }, {
    key: 'invalidateCellSizeAfterRender',
    value: function invalidateCellSizeAfterRender(_ref3) {
      var columnIndex = _ref3.columnIndex,
          rowIndex = _ref3.rowIndex;

      this._deferredInvalidateColumnIndex = typeof this._deferredInvalidateColumnIndex === 'number' ? Math.min(this._deferredInvalidateColumnIndex, columnIndex) : columnIndex;
      this._deferredInvalidateRowIndex = typeof this._deferredInvalidateRowIndex === 'number' ? Math.min(this._deferredInvalidateRowIndex, rowIndex) : rowIndex;
    }

    /**
     * Pre-measure all columns and rows in a Grid.
     * Typically cells are only measured as needed and estimated sizes are used for cells that have not yet been measured.
     * This method ensures that the next call to getTotalSize() returns an exact size (as opposed to just an estimated one).
     */

  }, {
    key: 'measureAllCells',
    value: function measureAllCells() {
      var _props2 = this.props,
          columnCount = _props2.columnCount,
          rowCount = _props2.rowCount;


      this._columnSizeAndPositionManager.getSizeAndPositionOfCell(columnCount - 1);
      this._rowSizeAndPositionManager.getSizeAndPositionOfCell(rowCount - 1);
    }

    /**
     * Forced recompute of row heights and column widths.
     * This function should be called if dynamic column or row sizes have changed but nothing else has.
     * Since Grid only receives :columnCount and :rowCount it has no way of detecting when the underlying data changes.
     */

  }, {
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$columnIndex = _ref4.columnIndex,
          columnIndex = _ref4$columnIndex === undefined ? 0 : _ref4$columnIndex,
          _ref4$rowIndex = _ref4.rowIndex,
          rowIndex = _ref4$rowIndex === undefined ? 0 : _ref4$rowIndex;

      var _props3 = this.props,
          scrollToColumn = _props3.scrollToColumn,
          scrollToRow = _props3.scrollToRow;


      this._columnSizeAndPositionManager.resetCell(columnIndex);
      this._rowSizeAndPositionManager.resetCell(rowIndex);

      // Cell sizes may be determined by a function property.
      // In this case the cDU handler can't know if they changed.
      // Store this flag to let the next cDU pass know it needs to recompute the scroll offset.
      this._recomputeScrollLeftFlag = scrollToColumn >= 0 && columnIndex <= scrollToColumn;
      this._recomputeScrollTopFlag = scrollToRow >= 0 && rowIndex <= scrollToRow;

      // Clear cell cache in case we are scrolling;
      // Invalid row heights likely mean invalid cached content as well.
      this._cellCache = {};
      this._styleCache = {};

      this.forceUpdate();
    }

    /**
     * Ensure column and row are visible.
     */

  }, {
    key: 'scrollToCell',
    value: function scrollToCell(_ref5) {
      var columnIndex = _ref5.columnIndex,
          rowIndex = _ref5.rowIndex;
      var columnCount = this.props.columnCount;


      var props = this.props;

      // Don't adjust scroll offset for single-column grids (eg List, Table).
      // This can cause a funky scroll offset because of the vertical scrollbar width.
      if (columnCount > 1 && columnIndex !== undefined) {
        this._updateScrollLeftForScrollToColumn((0, _extends3.default)({}, props, {
          scrollToColumn: columnIndex
        }));
      }

      if (rowIndex !== undefined) {
        this._updateScrollTopForScrollToRow((0, _extends3.default)({}, props, {
          scrollToRow: rowIndex
        }));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props4 = this.props,
          getScrollbarSize = _props4.getScrollbarSize,
          height = _props4.height,
          scrollLeft = _props4.scrollLeft,
          scrollToColumn = _props4.scrollToColumn,
          scrollTop = _props4.scrollTop,
          scrollToRow = _props4.scrollToRow,
          width = _props4.width;

      // If cell sizes have been invalidated (eg we are using CellMeasurer) then reset cached positions.
      // We must do this at the start of the method as we may calculate and update scroll position below.

      this._handleInvalidatedGridSize();

      // If this component was first rendered server-side, scrollbar size will be undefined.
      // In that event we need to remeasure.
      if (!this._scrollbarSizeMeasured) {
        this._scrollbarSize = getScrollbarSize();
        this._scrollbarSizeMeasured = true;
        this.setState({});
      }

      if (typeof scrollLeft === 'number' && scrollLeft >= 0 || typeof scrollTop === 'number' && scrollTop >= 0) {
        this.scrollToPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      // Don't update scroll offset if the size is 0; we don't render any cells in this case.
      // Setting a state may cause us to later thing we've updated the offce when we haven't.
      var sizeIsBiggerThanZero = height > 0 && width > 0;
      if (scrollToColumn >= 0 && sizeIsBiggerThanZero) {
        this._updateScrollLeftForScrollToColumn();
      }
      if (scrollToRow >= 0 && sizeIsBiggerThanZero) {
        this._updateScrollTopForScrollToRow();
      }

      // Update onRowsRendered callback
      this._invokeOnGridRenderedHelper();

      // Initialize onScroll callback
      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalColumnsWidth: this._columnSizeAndPositionManager.getTotalSize(),
        totalRowsHeight: this._rowSizeAndPositionManager.getTotalSize()
      });

      this._maybeCallOnScrollbarPresenceChange();
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) New scroll-to-cell props have been set
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _props5 = this.props,
          autoHeight = _props5.autoHeight,
          autoWidth = _props5.autoWidth,
          columnCount = _props5.columnCount,
          height = _props5.height,
          rowCount = _props5.rowCount,
          scrollToAlignment = _props5.scrollToAlignment,
          scrollToColumn = _props5.scrollToColumn,
          scrollToRow = _props5.scrollToRow,
          width = _props5.width;
      var _state = this.state,
          scrollLeft = _state.scrollLeft,
          scrollPositionChangeReason = _state.scrollPositionChangeReason,
          scrollTop = _state.scrollTop;

      // If cell sizes have been invalidated (eg we are using CellMeasurer) then reset cached positions.
      // We must do this at the start of the method as we may calculate and update scroll position below.

      this._handleInvalidatedGridSize();

      // Handle edge case where column or row count has only just increased over 0.
      // In this case we may have to restore a previously-specified scroll offset.
      // For more info see bvaughn/react-virtualized/issues/218
      var columnOrRowCountJustIncreasedFromZero = columnCount > 0 && prevProps.columnCount === 0 || rowCount > 0 && prevProps.rowCount === 0;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.
      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        // @TRICKY :autoHeight and :autoWidth properties instructs Grid to leave :scrollTop and :scrollLeft management to an external HOC (eg WindowScroller).
        // In this case we should avoid checking scrollingContainer.scrollTop and scrollingContainer.scrollLeft since it forces layout/flow.
        if (!autoWidth && scrollLeft >= 0 && (scrollLeft !== prevState.scrollLeft && scrollLeft !== this._scrollingContainer.scrollLeft || columnOrRowCountJustIncreasedFromZero)) {
          this._scrollingContainer.scrollLeft = scrollLeft;
        }
        if (!autoHeight && scrollTop >= 0 && (scrollTop !== prevState.scrollTop && scrollTop !== this._scrollingContainer.scrollTop || columnOrRowCountJustIncreasedFromZero)) {
          this._scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Special case where the previous size was 0:
      // In this case we don't show any windowed cells at all.
      // So we should always recalculate offset afterwards.
      var sizeJustIncreasedFromZero = (prevProps.width === 0 || prevProps.height === 0) && height > 0 && width > 0;

      // Update scroll offsets if the current :scrollToColumn or :scrollToRow values requires it
      // @TODO Do we also need this check or can the one in componentWillUpdate() suffice?
      if (this._recomputeScrollLeftFlag) {
        this._recomputeScrollLeftFlag = false;
        this._updateScrollLeftForScrollToColumn(this.props);
      } else {
        (0, _updateScrollIndexHelper2.default)({
          cellSizeAndPositionManager: this._columnSizeAndPositionManager,
          previousCellsCount: prevProps.columnCount,
          previousCellSize: prevProps.columnWidth,
          previousScrollToAlignment: prevProps.scrollToAlignment,
          previousScrollToIndex: prevProps.scrollToColumn,
          previousSize: prevProps.width,
          scrollOffset: scrollLeft,
          scrollToAlignment: scrollToAlignment,
          scrollToIndex: scrollToColumn,
          size: width,
          sizeJustIncreasedFromZero: sizeJustIncreasedFromZero,
          updateScrollIndexCallback: function updateScrollIndexCallback() {
            return _this2._updateScrollLeftForScrollToColumn(_this2.props);
          }
        });
      }

      if (this._recomputeScrollTopFlag) {
        this._recomputeScrollTopFlag = false;
        this._updateScrollTopForScrollToRow(this.props);
      } else {
        (0, _updateScrollIndexHelper2.default)({
          cellSizeAndPositionManager: this._rowSizeAndPositionManager,
          previousCellsCount: prevProps.rowCount,
          previousCellSize: prevProps.rowHeight,
          previousScrollToAlignment: prevProps.scrollToAlignment,
          previousScrollToIndex: prevProps.scrollToRow,
          previousSize: prevProps.height,
          scrollOffset: scrollTop,
          scrollToAlignment: scrollToAlignment,
          scrollToIndex: scrollToRow,
          size: height,
          sizeJustIncreasedFromZero: sizeJustIncreasedFromZero,
          updateScrollIndexCallback: function updateScrollIndexCallback() {
            return _this2._updateScrollTopForScrollToRow(_this2.props);
          }
        });
      }

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();

      // Changes to :scrollLeft or :scrollTop should also notify :onScroll listeners
      if (scrollLeft !== prevState.scrollLeft || scrollTop !== prevState.scrollTop) {
        var totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();
        var totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();

        this._invokeOnScrollMemoizer({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          totalColumnsWidth: totalColumnsWidth,
          totalRowsHeight: totalRowsHeight
        });
      }

      this._maybeCallOnScrollbarPresenceChange();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var getScrollbarSize = this.props.getScrollbarSize;

      // If this component is being rendered server-side, getScrollbarSize() will return undefined.
      // We handle this case in componentDidMount()

      this._scrollbarSize = getScrollbarSize();
      if (this._scrollbarSize === undefined) {
        this._scrollbarSizeMeasured = false;
        this._scrollbarSize = 0;
      } else {
        this._scrollbarSizeMeasured = true;
      }

      this._calculateChildrenToRender();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        (0, _requestAnimationTimeout.cancelAnimationTimeout)(this._disablePointerEventsTimeoutId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var _state2 = this.state,
          scrollLeft = _state2.scrollLeft,
          scrollTop = _state2.scrollTop;


      if (nextProps.columnCount === 0 && scrollLeft !== 0 || nextProps.rowCount === 0 && scrollTop !== 0) {
        this.scrollToPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        var newState = {};

        if (nextProps.scrollLeft != null) {
          newState.scrollLeft = nextProps.scrollLeft;
        }
        if (nextProps.scrollTop != null) {
          newState.scrollTop = nextProps.scrollTop;
        }

        this.scrollToPosition(newState);
      }

      if (nextProps.columnWidth !== this.props.columnWidth || nextProps.rowHeight !== this.props.rowHeight) {
        this._styleCache = {};
      }

      this._columnWidthGetter = this._wrapSizeGetter(nextProps.columnWidth);
      this._rowHeightGetter = this._wrapSizeGetter(nextProps.rowHeight);

      this._columnSizeAndPositionManager.configure({
        cellCount: nextProps.columnCount,
        estimatedCellSize: this._getEstimatedColumnSize(nextProps)
      });
      this._rowSizeAndPositionManager.configure({
        cellCount: nextProps.rowCount,
        estimatedCellSize: this._getEstimatedRowSize(nextProps)
      });

      var _props6 = this.props,
          columnCount = _props6.columnCount,
          rowCount = _props6.rowCount;

      // Special case when either cols or rows were 0
      // This would prevent any cells from rendering
      // So we need to reset row scroll if cols changed from 0 (and vice versa)

      if (columnCount === 0 || rowCount === 0) {
        columnCount = 0;
        rowCount = 0;
      }

      // If scrolling is controlled outside this component, clear cache when scrolling stops
      if (nextProps.autoHeight && nextProps.isScrolling === false && this.props.isScrolling === true) {
        this._resetStyleCache();
      }

      // Update scroll offsets if the size or number of cells have changed, invalidating the previous value
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: columnCount,
        cellSize: typeof this.props.columnWidth === 'number' ? this.props.columnWidth : null,
        computeMetadataCallback: function computeMetadataCallback() {
          return _this3._columnSizeAndPositionManager.resetCell(0);
        },
        computeMetadataCallbackProps: nextProps,
        nextCellsCount: nextProps.columnCount,
        nextCellSize: typeof nextProps.columnWidth === 'number' ? nextProps.columnWidth : null,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollLeftForScrollToColumn(nextProps, _this3.state);
        }
      });
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: rowCount,
        cellSize: typeof this.props.rowHeight === 'number' ? this.props.rowHeight : null,
        computeMetadataCallback: function computeMetadataCallback() {
          return _this3._rowSizeAndPositionManager.resetCell(0);
        },
        computeMetadataCallbackProps: nextProps,
        nextCellsCount: nextProps.rowCount,
        nextCellSize: typeof nextProps.rowHeight === 'number' ? nextProps.rowHeight : null,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollTopForScrollToRow(nextProps, _this3.state);
        }
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this._calculateChildrenToRender(nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          autoContainerWidth = _props7.autoContainerWidth,
          autoHeight = _props7.autoHeight,
          autoWidth = _props7.autoWidth,
          className = _props7.className,
          containerProps = _props7.containerProps,
          containerRole = _props7.containerRole,
          containerStyle = _props7.containerStyle,
          height = _props7.height,
          id = _props7.id,
          noContentRenderer = _props7.noContentRenderer,
          role = _props7.role,
          style = _props7.style,
          tabIndex = _props7.tabIndex,
          width = _props7.width;


      var isScrolling = this._isScrolling();

      var gridStyle = {
        boxSizing: 'border-box',
        direction: 'ltr',
        height: autoHeight ? 'auto' : height,
        position: 'relative',
        width: autoWidth ? 'auto' : width,
        WebkitOverflowScrolling: 'touch',
        willChange: 'transform'
      };

      var totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();
      var totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      var verticalScrollBarSize = totalRowsHeight > height ? this._scrollbarSize : 0;
      var horizontalScrollBarSize = totalColumnsWidth > width ? this._scrollbarSize : 0;

      if (horizontalScrollBarSize !== this._horizontalScrollBarSize || verticalScrollBarSize !== this._verticalScrollBarSize) {
        this._horizontalScrollBarSize = horizontalScrollBarSize;
        this._verticalScrollBarSize = verticalScrollBarSize;
        this._scrollbarPresenceChanged = true;
      }

      // Also explicitly init styles to 'auto' if scrollbars are required.
      // This works around an obscure edge case where external CSS styles have not yet been loaded,
      // But an initial scroll index of offset is set as an external prop.
      // Without this style, Grid would render the correct range of cells but would NOT update its internal offset.
      // This was originally reported via clauderic/react-infinite-calendar/issues/23
      gridStyle.overflowX = totalColumnsWidth + verticalScrollBarSize <= width ? 'hidden' : 'auto';
      gridStyle.overflowY = totalRowsHeight + horizontalScrollBarSize <= height ? 'hidden' : 'auto';

      var childrenToDisplay = this._childrenToDisplay;

      var showNoContentRenderer = childrenToDisplay.length === 0 && height > 0 && width > 0;

      return React.createElement(
        'div',
        (0, _extends3.default)({
          ref: this._setScrollingContainerRef
        }, containerProps, {
          'aria-label': this.props['aria-label'],
          'aria-readonly': this.props['aria-readonly'],
          className: (0, _classnames2.default)('ReactVirtualized__Grid', className),
          id: id,
          onScroll: this._onScroll,
          role: role,
          style: (0, _extends3.default)({}, gridStyle, style),
          tabIndex: tabIndex }),
        childrenToDisplay.length > 0 && React.createElement(
          'div',
          {
            className: 'ReactVirtualized__Grid__innerScrollContainer',
            role: containerRole,
            style: (0, _extends3.default)({
              width: autoContainerWidth ? 'auto' : totalColumnsWidth,
              height: totalRowsHeight,
              maxWidth: totalColumnsWidth,
              maxHeight: totalRowsHeight,
              overflow: 'hidden',
              pointerEvents: isScrolling ? 'none' : '',
              position: 'relative'
            }, containerStyle) },
          childrenToDisplay
        ),
        showNoContentRenderer && noContentRenderer()
      );
    }

    /* ---------------------------- Helper methods ---------------------------- */

  }, {
    key: '_calculateChildrenToRender',
    value: function _calculateChildrenToRender() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
      var cellRenderer = props.cellRenderer,
          cellRangeRenderer = props.cellRangeRenderer,
          columnCount = props.columnCount,
          deferredMeasurementCache = props.deferredMeasurementCache,
          height = props.height,
          overscanColumnCount = props.overscanColumnCount,
          overscanIndicesGetter = props.overscanIndicesGetter,
          overscanRowCount = props.overscanRowCount,
          rowCount = props.rowCount,
          width = props.width;
      var scrollDirectionHorizontal = state.scrollDirectionHorizontal,
          scrollDirectionVertical = state.scrollDirectionVertical,
          scrollLeft = state.scrollLeft,
          scrollTop = state.scrollTop;


      var isScrolling = this._isScrolling(props, state);

      this._childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = this._columnSizeAndPositionManager.getVisibleCellRange({
          containerSize: width,
          offset: scrollLeft
        });
        var visibleRowIndices = this._rowSizeAndPositionManager.getVisibleCellRange({
          containerSize: height,
          offset: scrollTop
        });

        var horizontalOffsetAdjustment = this._columnSizeAndPositionManager.getOffsetAdjustment({
          containerSize: width,
          offset: scrollLeft
        });
        var verticalOffsetAdjustment = this._rowSizeAndPositionManager.getOffsetAdjustment({
          containerSize: height,
          offset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = overscanIndicesGetter({
          direction: 'horizontal',
          cellCount: columnCount,
          overscanCellsCount: overscanColumnCount,
          scrollDirection: scrollDirectionHorizontal,
          startIndex: typeof visibleColumnIndices.start === 'number' ? visibleColumnIndices.start : 0,
          stopIndex: typeof visibleColumnIndices.stop === 'number' ? visibleColumnIndices.stop : -1
        });

        var overscanRowIndices = overscanIndicesGetter({
          direction: 'vertical',
          cellCount: rowCount,
          overscanCellsCount: overscanRowCount,
          scrollDirection: scrollDirectionVertical,
          startIndex: typeof visibleRowIndices.start === 'number' ? visibleRowIndices.start : 0,
          stopIndex: typeof visibleRowIndices.stop === 'number' ? visibleRowIndices.stop : -1
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        // Advanced use-cases (eg CellMeasurer) require batched measurements to determine accurate sizes.
        if (deferredMeasurementCache) {
          // If rows have a dynamic height, scan the rows we are about to render.
          // If any have not yet been measured, then we need to render all columns initially,
          // Because the height of the row is equal to the tallest cell within that row,
          // (And so we can't know the height without measuring all column-cells first).
          if (!deferredMeasurementCache.hasFixedHeight()) {
            for (var rowIndex = this._rowStartIndex; rowIndex <= this._rowStopIndex; rowIndex++) {
              if (!deferredMeasurementCache.has(rowIndex, 0)) {
                this._columnStartIndex = 0;
                this._columnStopIndex = columnCount - 1;
                break;
              }
            }
          }

          // If columns have a dynamic width, scan the columns we are about to render.
          // If any have not yet been measured, then we need to render all rows initially,
          // Because the width of the column is equal to the widest cell within that column,
          // (And so we can't know the width without measuring all row-cells first).
          if (!deferredMeasurementCache.hasFixedWidth()) {
            for (var columnIndex = this._columnStartIndex; columnIndex <= this._columnStopIndex; columnIndex++) {
              if (!deferredMeasurementCache.has(0, columnIndex)) {
                this._rowStartIndex = 0;
                this._rowStopIndex = rowCount - 1;
                break;
              }
            }
          }
        }

        this._childrenToDisplay = cellRangeRenderer({
          cellCache: this._cellCache,
          cellRenderer: cellRenderer,
          columnSizeAndPositionManager: this._columnSizeAndPositionManager,
          columnStartIndex: this._columnStartIndex,
          columnStopIndex: this._columnStopIndex,
          deferredMeasurementCache: deferredMeasurementCache,
          horizontalOffsetAdjustment: horizontalOffsetAdjustment,
          isScrolling: isScrolling,
          parent: this,
          rowSizeAndPositionManager: this._rowSizeAndPositionManager,
          rowStartIndex: this._rowStartIndex,
          rowStopIndex: this._rowStopIndex,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          styleCache: this._styleCache,
          verticalOffsetAdjustment: verticalOffsetAdjustment,
          visibleColumnIndices: visibleColumnIndices,
          visibleRowIndices: visibleRowIndices
        });
      }
    }

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Grid.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_debounceScrollEnded',
    value: function _debounceScrollEnded() {
      var scrollingResetTimeInterval = this.props.scrollingResetTimeInterval;


      if (this._disablePointerEventsTimeoutId) {
        (0, _requestAnimationTimeout.cancelAnimationTimeout)(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = (0, _requestAnimationTimeout.requestAnimationTimeout)(this._debounceScrollEndedCallback, scrollingResetTimeInterval);
    }
  }, {
    key: '_getEstimatedColumnSize',
    value: function _getEstimatedColumnSize(props) {
      return typeof props.columnWidth === 'number' ? props.columnWidth : props.estimatedColumnSize;
    }
  }, {
    key: '_getEstimatedRowSize',
    value: function _getEstimatedRowSize(props) {
      return typeof props.rowHeight === 'number' ? props.rowHeight : props.estimatedRowSize;
    }

    /**
     * Check for batched CellMeasurer size invalidations.
     * This will occur the first time one or more previously unmeasured cells are rendered.
     */

  }, {
    key: '_handleInvalidatedGridSize',
    value: function _handleInvalidatedGridSize() {
      if (typeof this._deferredInvalidateColumnIndex === 'number' && typeof this._deferredInvalidateRowIndex === 'number') {
        var columnIndex = this._deferredInvalidateColumnIndex;
        var rowIndex = this._deferredInvalidateRowIndex;

        this._deferredInvalidateColumnIndex = null;
        this._deferredInvalidateRowIndex = null;

        this.recomputeGridSize({ columnIndex: columnIndex, rowIndex: rowIndex });
      }
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref6) {
      var _this4 = this;

      var scrollLeft = _ref6.scrollLeft,
          scrollTop = _ref6.scrollTop,
          totalColumnsWidth = _ref6.totalColumnsWidth,
          totalRowsHeight = _ref6.totalRowsHeight;

      this._onScrollMemoizer({
        callback: function callback(_ref7) {
          var scrollLeft = _ref7.scrollLeft,
              scrollTop = _ref7.scrollTop;
          var _props8 = _this4.props,
              height = _props8.height,
              onScroll = _props8.onScroll,
              width = _props8.width;


          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalRowsHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalColumnsWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }
  }, {
    key: '_isScrolling',
    value: function _isScrolling() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

      // If isScrolling is defined in props, use it to override the value in state
      // This is a performance optimization for WindowScroller + Grid
      return Object.hasOwnProperty.call(props, 'isScrolling') ? Boolean(props.isScrolling) : Boolean(state.isScrolling);
    }
  }, {
    key: '_maybeCallOnScrollbarPresenceChange',
    value: function _maybeCallOnScrollbarPresenceChange() {
      if (this._scrollbarPresenceChanged) {
        var _onScrollbarPresenceChange = this.props.onScrollbarPresenceChange;


        this._scrollbarPresenceChanged = false;

        _onScrollbarPresenceChange({
          horizontal: this._horizontalScrollBarSize > 0,
          size: this._scrollbarSize,
          vertical: this._verticalScrollBarSize > 0
        });
      }
    }
  }, {
    key: 'scrollToPosition',


    /**
     * Scroll to the specified offset(s).
     * Useful for animating position changes.
     */
    value: function scrollToPosition(_ref8) {
      var scrollLeft = _ref8.scrollLeft,
          scrollTop = _ref8.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (typeof scrollLeft === 'number' && scrollLeft >= 0) {
        newState.scrollDirectionHorizontal = scrollLeft > this.state.scrollLeft ? _defaultOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD : _defaultOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD;
        newState.scrollLeft = scrollLeft;
      }

      if (typeof scrollTop === 'number' && scrollTop >= 0) {
        newState.scrollDirectionVertical = scrollTop > this.state.scrollTop ? _defaultOverscanIndicesGetter.SCROLL_DIRECTION_FORWARD : _defaultOverscanIndicesGetter.SCROLL_DIRECTION_BACKWARD;
        newState.scrollTop = scrollTop;
      }

      if (typeof scrollLeft === 'number' && scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || typeof scrollTop === 'number' && scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_wrapSizeGetter',
    value: function _wrapSizeGetter(value) {
      return typeof value === 'function' ? value : function () {
        return value;
      };
    }
  }, {
    key: '_getCalculatedScrollLeft',
    value: function _getCalculatedScrollLeft() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
      var columnCount = props.columnCount,
          height = props.height,
          scrollToAlignment = props.scrollToAlignment,
          scrollToColumn = props.scrollToColumn,
          width = props.width;
      var scrollLeft = state.scrollLeft;


      if (columnCount > 0) {
        var finalColumn = columnCount - 1;
        var targetIndex = scrollToColumn < 0 ? finalColumn : Math.min(finalColumn, scrollToColumn);
        var totalRowsHeight = this._rowSizeAndPositionManager.getTotalSize();
        var scrollBarSize = totalRowsHeight > height ? this._scrollbarSize : 0;

        return this._columnSizeAndPositionManager.getUpdatedOffsetForIndex({
          align: scrollToAlignment,
          containerSize: width - scrollBarSize,
          currentOffset: scrollLeft,
          targetIndex: targetIndex
        });
      }
    }
  }, {
    key: '_updateScrollLeftForScrollToColumn',
    value: function _updateScrollLeftForScrollToColumn() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
      var scrollLeft = state.scrollLeft;

      var calculatedScrollLeft = this._getCalculatedScrollLeft(props, state);

      if (typeof calculatedScrollLeft === 'number' && calculatedScrollLeft >= 0 && scrollLeft !== calculatedScrollLeft) {
        this.scrollToPosition({
          scrollLeft: calculatedScrollLeft,
          scrollTop: -1
        });
      }
    }
  }, {
    key: '_getCalculatedScrollTop',
    value: function _getCalculatedScrollTop() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
      var height = props.height,
          rowCount = props.rowCount,
          scrollToAlignment = props.scrollToAlignment,
          scrollToRow = props.scrollToRow,
          width = props.width;
      var scrollTop = state.scrollTop;


      if (rowCount > 0) {
        var finalRow = rowCount - 1;
        var targetIndex = scrollToRow < 0 ? finalRow : Math.min(finalRow, scrollToRow);
        var totalColumnsWidth = this._columnSizeAndPositionManager.getTotalSize();
        var scrollBarSize = totalColumnsWidth > width ? this._scrollbarSize : 0;

        return this._rowSizeAndPositionManager.getUpdatedOffsetForIndex({
          align: scrollToAlignment,
          containerSize: height - scrollBarSize,
          currentOffset: scrollTop,
          targetIndex: targetIndex
        });
      }
    }
  }, {
    key: '_resetStyleCache',
    value: function _resetStyleCache() {
      var styleCache = this._styleCache;

      // Reset cell and style caches once scrolling stops.
      // This makes Grid simpler to use (since cells commonly change).
      // And it keeps the caches from growing too large.
      // Performance is most sensitive when a user is scrolling.
      this._cellCache = {};
      this._styleCache = {};

      // Copy over the visible cell styles so avoid unnecessary re-render.
      for (var rowIndex = this._rowStartIndex; rowIndex <= this._rowStopIndex; rowIndex++) {
        for (var columnIndex = this._columnStartIndex; columnIndex <= this._columnStopIndex; columnIndex++) {
          var key = rowIndex + '-' + columnIndex;
          this._styleCache[key] = styleCache[key];
        }
      }

      this.setState({
        isScrolling: false
      });
    }
  }, {
    key: '_updateScrollTopForScrollToRow',
    value: function _updateScrollTopForScrollToRow() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
      var scrollTop = state.scrollTop;

      var calculatedScrollTop = this._getCalculatedScrollTop(props, state);

      if (typeof calculatedScrollTop === 'number' && calculatedScrollTop >= 0 && scrollTop !== calculatedScrollTop) {
        this.scrollToPosition({
          scrollLeft: -1,
          scrollTop: calculatedScrollTop
        });
      }
    }
  }]);
  return Grid;
}(React.PureComponent);

Grid.defaultProps = {
  'aria-label': 'grid',
  'aria-readonly': true,
  autoContainerWidth: false,
  autoHeight: false,
  autoWidth: false,
  cellRangeRenderer: _defaultCellRangeRenderer2.default,
  containerRole: 'rowgroup',
  containerStyle: {},
  estimatedColumnSize: 100,
  estimatedRowSize: 30,
  getScrollbarSize: _scrollbarSize2.default,
  noContentRenderer: renderNull,
  onScroll: function onScroll() {},
  onScrollbarPresenceChange: function onScrollbarPresenceChange() {},
  onSectionRendered: function onSectionRendered() {},
  overscanColumnCount: 0,
  overscanIndicesGetter: _defaultOverscanIndicesGetter2.default,
  overscanRowCount: 10,
  role: 'grid',
  scrollingResetTimeInterval: DEFAULT_SCROLLING_RESET_TIME_INTERVAL,
  scrollToAlignment: 'auto',
  scrollToColumn: -1,
  scrollToRow: -1,
  style: {},
  tabIndex: 0
};
Grid.propTypes = process.env.NODE_ENV === 'production' ? null : {
  "aria-label": __webpack_require__(0).string.isRequired,
  "aria-readonly": __webpack_require__(0).bool,


  /**
   * Set the width of the inner scrollable container to 'auto'.
   * This is useful for single-column Grids to ensure that the column doesn't extend below a vertical scrollbar.
   */
  autoContainerWidth: __webpack_require__(0).bool.isRequired,


  /**
   * Removes fixed height from the scrollingContainer so that the total height of rows can stretch the window.
   * Intended for use with WindowScroller
   */
  autoHeight: __webpack_require__(0).bool.isRequired,


  /**
   * Removes fixed width from the scrollingContainer so that the total width of rows can stretch the window.
   * Intended for use with WindowScroller
   */
  autoWidth: __webpack_require__(0).bool.isRequired,


  /** Responsible for rendering a cell given an row and column index.  */
  cellRenderer: typeof babelPluginFlowReactPropTypes_proptype_CellRenderer === 'function' ? babelPluginFlowReactPropTypes_proptype_CellRenderer.isRequired ? babelPluginFlowReactPropTypes_proptype_CellRenderer.isRequired : babelPluginFlowReactPropTypes_proptype_CellRenderer : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_CellRenderer).isRequired,


  /** Responsible for rendering a group of cells given their index ranges.  */
  cellRangeRenderer: typeof babelPluginFlowReactPropTypes_proptype_CellRangeRenderer === 'function' ? babelPluginFlowReactPropTypes_proptype_CellRangeRenderer.isRequired ? babelPluginFlowReactPropTypes_proptype_CellRangeRenderer.isRequired : babelPluginFlowReactPropTypes_proptype_CellRangeRenderer : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_CellRangeRenderer).isRequired,


  /** Optional custom CSS class name to attach to root Grid element.  */
  className: __webpack_require__(0).string,


  /** Number of columns in grid.  */
  columnCount: __webpack_require__(0).number.isRequired,


  /** Either a fixed column width (number) or a function that returns the width of a column given its index.  */
  columnWidth: typeof babelPluginFlowReactPropTypes_proptype_CellSize === 'function' ? babelPluginFlowReactPropTypes_proptype_CellSize.isRequired ? babelPluginFlowReactPropTypes_proptype_CellSize.isRequired : babelPluginFlowReactPropTypes_proptype_CellSize : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_CellSize).isRequired,


  /** Unfiltered props for the Grid container. */
  containerProps: __webpack_require__(0).object,


  /** ARIA role for the cell-container.  */
  containerRole: __webpack_require__(0).string.isRequired,


  /** Optional inline style applied to inner cell-container */
  containerStyle: __webpack_require__(0).object.isRequired,


  /**
   * If CellMeasurer is used to measure this Grid's children, this should be a pointer to its CellMeasurerCache.
   * A shared CellMeasurerCache reference enables Grid and CellMeasurer to share measurement data.
   */
  deferredMeasurementCache: __webpack_require__(0).object,


  /**
   * Used to estimate the total width of a Grid before all of its columns have actually been measured.
   * The estimated total width is adjusted as columns are rendered.
   */
  estimatedColumnSize: __webpack_require__(0).number.isRequired,


  /**
   * Used to estimate the total height of a Grid before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: __webpack_require__(0).number.isRequired,


  /** Exposed for testing purposes only.  */
  getScrollbarSize: __webpack_require__(0).func.isRequired,


  /** Height of Grid; this property determines the number of visible (vs virtualized) rows.  */
  height: __webpack_require__(0).number.isRequired,


  /** Optional custom id to attach to root Grid element.  */
  id: __webpack_require__(0).string,


  /**
   * Override internal is-scrolling state tracking.
   * This property is primarily intended for use with the WindowScroller component.
   */
  isScrolling: __webpack_require__(0).bool,


  /** Optional renderer to be used in place of rows when either :rowCount or :columnCount is 0.  */
  noContentRenderer: typeof babelPluginFlowReactPropTypes_proptype_NoContentRenderer === 'function' ? babelPluginFlowReactPropTypes_proptype_NoContentRenderer.isRequired ? babelPluginFlowReactPropTypes_proptype_NoContentRenderer.isRequired : babelPluginFlowReactPropTypes_proptype_NoContentRenderer : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_NoContentRenderer).isRequired,


  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   */
  onScroll: __webpack_require__(0).func.isRequired,


  /**
   * Called whenever a horizontal or vertical scrollbar is added or removed.
   * This prop is not intended for end-user use;
   * It is used by MultiGrid to support fixed-row/fixed-column scroll syncing.
   */
  onScrollbarPresenceChange: __webpack_require__(0).func.isRequired,


  /** Callback invoked with information about the section of the Grid that was just rendered.  */
  onSectionRendered: __webpack_require__(0).func.isRequired,


  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnCount: __webpack_require__(0).number.isRequired,


  /**
   * Calculates the number of cells to overscan before and after a specified range.
   * This function ensures that overscanning doesn't exceed the available cells.
   */
  overscanIndicesGetter: typeof babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter === 'function' ? babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter.isRequired ? babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter.isRequired : babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetter).isRequired,


  /**
   * Number of rows to render above/below the visible section of the grid.
   * These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanRowCount: __webpack_require__(0).number.isRequired,


  /** ARIA role for the grid element.  */
  role: __webpack_require__(0).string.isRequired,


  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * Should implement the following interface: ({ index: number }): number
   */
  rowHeight: typeof babelPluginFlowReactPropTypes_proptype_CellSize === 'function' ? babelPluginFlowReactPropTypes_proptype_CellSize.isRequired ? babelPluginFlowReactPropTypes_proptype_CellSize.isRequired : babelPluginFlowReactPropTypes_proptype_CellSize : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_CellSize).isRequired,


  /** Number of rows in grid.  */
  rowCount: __webpack_require__(0).number.isRequired,


  /** Wait this amount of time after the last scroll event before resetting Grid `pointer-events`. */
  scrollingResetTimeInterval: __webpack_require__(0).number.isRequired,


  /** Horizontal offset. */
  scrollLeft: __webpack_require__(0).number,


  /**
   * Controls scroll-to-cell behavior of the Grid.
   * The default ("auto") scrolls the least amount possible to ensure that the specified cell is fully visible.
   * Use "start" to align cells to the top/left of the Grid and "end" to align bottom/right.
   */
  scrollToAlignment: typeof babelPluginFlowReactPropTypes_proptype_Alignment === 'function' ? babelPluginFlowReactPropTypes_proptype_Alignment.isRequired ? babelPluginFlowReactPropTypes_proptype_Alignment.isRequired : babelPluginFlowReactPropTypes_proptype_Alignment : __webpack_require__(0).shape(babelPluginFlowReactPropTypes_proptype_Alignment).isRequired,


  /** Column index to ensure visible (by forcefully scrolling if necessary) */
  scrollToColumn: __webpack_require__(0).number.isRequired,


  /** Vertical offset. */
  scrollTop: __webpack_require__(0).number,


  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToRow: __webpack_require__(0).number.isRequired,


  /** Optional inline style */
  style: __webpack_require__(0).object.isRequired,


  /** Tab index for focus */
  tabIndex: __webpack_require__(0).number,


  /** Width of Grid; this property determines the number of visible (vs virtualized) columns.  */
  width: __webpack_require__(0).number.isRequired
};
exports.default = Grid;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(100) });


/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(21);
var toObject = __webpack_require__(22);
var IObject = __webpack_require__(56);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(102);
var toAbsoluteIndex = __webpack_require__(103);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
module.exports = __webpack_require__(4).Object.getPrototypeOf;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(22);
var $getPrototypeOf = __webpack_require__(59);

__webpack_require__(60)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
__webpack_require__(116);
module.exports = __webpack_require__(44).f('iterator');


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(112)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(63)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var defined = __webpack_require__(34);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(43);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(15)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(16);
var getKeys = __webpack_require__(17);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
var global = __webpack_require__(6);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(41);
var TO_STRING_TAG = __webpack_require__(15)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(118);
var step = __webpack_require__(119);
var Iterators = __webpack_require__(41);
var toIObject = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(63)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
__webpack_require__(127);
__webpack_require__(128);
__webpack_require__(129);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(64);
var META = __webpack_require__(123).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(37);
var setToStringTag = __webpack_require__(43);
var uid = __webpack_require__(20);
var wks = __webpack_require__(15);
var wksExt = __webpack_require__(44);
var wksDefine = __webpack_require__(45);
var enumKeys = __webpack_require__(124);
var isArray = __webpack_require__(125);
var anObject = __webpack_require__(16);
var isObject = __webpack_require__(12);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(33);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(42);
var gOPNExt = __webpack_require__(126);
var $GOPD = __webpack_require__(66);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(17);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(65).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(21).f = $propertyIsEnumerable;
  __webpack_require__(39).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(40)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(20)('meta');
var isObject = __webpack_require__(12);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(39);
var pIE = __webpack_require__(21);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(57);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14);
var gOPN = __webpack_require__(65).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 127 */
/***/ (function(module, exports) {



/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('asyncIterator');


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('observable');


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(131), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(7);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(133).set });


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12);
var anObject = __webpack_require__(16);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(52)(Function.call, __webpack_require__(66).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
var $Object = __webpack_require__(4).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(42) });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionDataAndUpdateScrollOffset;
function calculateSizeAndPositionDataAndUpdateScrollOffset(_ref) {
  var cellCount = _ref.cellCount,
      cellSize = _ref.cellSize,
      computeMetadataCallback = _ref.computeMetadataCallback,
      computeMetadataCallbackProps = _ref.computeMetadataCallbackProps,
      nextCellsCount = _ref.nextCellsCount,
      nextCellSize = _ref.nextCellSize,
      nextScrollToIndex = _ref.nextScrollToIndex,
      scrollToIndex = _ref.scrollToIndex,
      updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;

  // Don't compare cell sizes if they are functions because inline functions would cause infinite loops.
  // In that event users should use the manual recompute methods to inform of changes.
  if (cellCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}

/**
 * Helper method that determines when to recalculate row or column metadata.
 */

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(23);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(24);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_VisibleCellRange = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_VisibleCellRange || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_CellSizeGetter = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellSizeGetter || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_Alignment = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_Alignment || __webpack_require__(0).any;

/**
 * Just-in-time calculates and caches size and position information for a collection of cells.
 */

var CellSizeAndPositionManager = function () {

  // Used in deferred mode to track which cells have been queued for measurement.

  // Cache of size and position data for cells, mapped by cell index.
  // Note that invalid values may exist in this map so only rely on cells up to this._lastMeasuredIndex
  function CellSizeAndPositionManager(_ref) {
    var cellCount = _ref.cellCount,
        cellSizeGetter = _ref.cellSizeGetter,
        estimatedCellSize = _ref.estimatedCellSize;
    (0, _classCallCheck3.default)(this, CellSizeAndPositionManager);
    this._cellSizeAndPositionData = {};
    this._lastMeasuredIndex = -1;
    this._lastBatchedIndex = -1;

    this._cellSizeGetter = cellSizeGetter;
    this._cellCount = cellCount;
    this._estimatedCellSize = estimatedCellSize;
  }

  // Measurements for cells up to this index can be trusted; cells afterward should be estimated.


  (0, _createClass3.default)(CellSizeAndPositionManager, [{
    key: 'areOffsetsAdjusted',
    value: function areOffsetsAdjusted() {
      return false;
    }
  }, {
    key: 'configure',
    value: function configure(_ref2) {
      var cellCount = _ref2.cellCount,
          estimatedCellSize = _ref2.estimatedCellSize;

      this._cellCount = cellCount;
      this._estimatedCellSize = estimatedCellSize;
    }
  }, {
    key: 'getCellCount',
    value: function getCellCount() {
      return this._cellCount;
    }
  }, {
    key: 'getEstimatedCellSize',
    value: function getEstimatedCellSize() {
      return this._estimatedCellSize;
    }
  }, {
    key: 'getLastMeasuredIndex',
    value: function getLastMeasuredIndex() {
      return this._lastMeasuredIndex;
    }
  }, {
    key: 'getOffsetAdjustment',
    value: function getOffsetAdjustment() {
      return 0;
    }

    /**
     * This method returns the size and position for the cell at the specified index.
     * It just-in-time calculates (or used cached values) for cells leading up to the index.
     */

  }, {
    key: 'getSizeAndPositionOfCell',
    value: function getSizeAndPositionOfCell(index) {
      if (index < 0 || index >= this._cellCount) {
        throw Error('Requested index ' + index + ' is outside of range 0..' + this._cellCount);
      }

      if (index > this._lastMeasuredIndex) {
        var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();
        var _offset = lastMeasuredCellSizeAndPosition.offset + lastMeasuredCellSizeAndPosition.size;

        for (var i = this._lastMeasuredIndex + 1; i <= index; i++) {
          var _size = this._cellSizeGetter({ index: i });

          // undefined or NaN probably means a logic error in the size getter.
          // null means we're using CellMeasurer and haven't yet measured a given index.
          if (_size === undefined || isNaN(_size)) {
            throw Error('Invalid size returned for cell ' + i + ' of value ' + _size);
          } else if (_size === null) {
            this._cellSizeAndPositionData[i] = {
              offset: _offset,
              size: 0
            };

            this._lastBatchedIndex = index;
          } else {
            this._cellSizeAndPositionData[i] = {
              offset: _offset,
              size: _size
            };

            _offset += _size;

            this._lastMeasuredIndex = index;
          }
        }
      }

      return this._cellSizeAndPositionData[index];
    }
  }, {
    key: 'getSizeAndPositionOfLastMeasuredCell',
    value: function getSizeAndPositionOfLastMeasuredCell() {
      return this._lastMeasuredIndex >= 0 ? this._cellSizeAndPositionData[this._lastMeasuredIndex] : {
        offset: 0,
        size: 0
      };
    }

    /**
     * Total size of all cells being measured.
     * This value will be completely estimated initially.
     * As cells are measured, the estimate will be updated.
     */

  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();
      var totalSizeOfMeasuredCells = lastMeasuredCellSizeAndPosition.offset + lastMeasuredCellSizeAndPosition.size;
      var numUnmeasuredCells = this._cellCount - this._lastMeasuredIndex - 1;
      var totalSizeOfUnmeasuredCells = numUnmeasuredCells * this._estimatedCellSize;
      return totalSizeOfMeasuredCells + totalSizeOfUnmeasuredCells;
    }

    /**
     * Determines a new offset that ensures a certain cell is visible, given the current offset.
     * If the cell is already visible then the current offset will be returned.
     * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
     *
     * @param align Desired alignment within container; one of "auto" (default), "start", or "end"
     * @param containerSize Size (width or height) of the container viewport
     * @param currentOffset Container's current (x or y) offset
     * @param totalSize Total size (width or height) of all cells
     * @return Offset to use to ensure the specified cell is visible
     */

  }, {
    key: 'getUpdatedOffsetForIndex',
    value: function getUpdatedOffsetForIndex(_ref3) {
      var _ref3$align = _ref3.align,
          align = _ref3$align === undefined ? 'auto' : _ref3$align,
          containerSize = _ref3.containerSize,
          currentOffset = _ref3.currentOffset,
          targetIndex = _ref3.targetIndex;

      if (containerSize <= 0) {
        return 0;
      }

      var datum = this.getSizeAndPositionOfCell(targetIndex);
      var maxOffset = datum.offset;
      var minOffset = maxOffset - containerSize + datum.size;

      var idealOffset = void 0;

      switch (align) {
        case 'start':
          idealOffset = maxOffset;
          break;
        case 'end':
          idealOffset = minOffset;
          break;
        case 'center':
          idealOffset = maxOffset - (containerSize - datum.size) / 2;
          break;
        default:
          idealOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
          break;
      }

      var totalSize = this.getTotalSize();

      return Math.max(0, Math.min(totalSize - containerSize, idealOffset));
    }
  }, {
    key: 'getVisibleCellRange',
    value: function getVisibleCellRange(params) {
      var containerSize = params.containerSize,
          offset = params.offset;


      var totalSize = this.getTotalSize();

      if (totalSize === 0) {
        return {};
      }

      var maxOffset = offset + containerSize;
      var start = this._findNearestCell(offset);

      var datum = this.getSizeAndPositionOfCell(start);
      offset = datum.offset + datum.size;

      var stop = start;

      while (offset < maxOffset && stop < this._cellCount - 1) {
        stop++;

        offset += this.getSizeAndPositionOfCell(stop).size;
      }

      return {
        start: start,
        stop: stop
      };
    }

    /**
     * Clear all cached values for cells after the specified index.
     * This method should be called for any cell that has changed its size.
     * It will not immediately perform any calculations; they'll be performed the next time getSizeAndPositionOfCell() is called.
     */

  }, {
    key: 'resetCell',
    value: function resetCell(index) {
      this._lastMeasuredIndex = Math.min(this._lastMeasuredIndex, index - 1);
    }
  }, {
    key: '_binarySearch',
    value: function _binarySearch(high, low, offset) {
      while (low <= high) {
        var middle = low + Math.floor((high - low) / 2);
        var _currentOffset = this.getSizeAndPositionOfCell(middle).offset;

        if (_currentOffset === offset) {
          return middle;
        } else if (_currentOffset < offset) {
          low = middle + 1;
        } else if (_currentOffset > offset) {
          high = middle - 1;
        }
      }

      if (low > 0) {
        return low - 1;
      } else {
        return 0;
      }
    }
  }, {
    key: '_exponentialSearch',
    value: function _exponentialSearch(index, offset) {
      var interval = 1;

      while (index < this._cellCount && this.getSizeAndPositionOfCell(index).offset < offset) {
        index += interval;
        interval *= 2;
      }

      return this._binarySearch(Math.min(index, this._cellCount - 1), Math.floor(index / 2), offset);
    }

    /**
     * Searches for the cell (index) nearest the specified offset.
     *
     * If no exact match is found the next lowest cell index will be returned.
     * This allows partially visible cells (with offsets just before/above the fold) to be visible.
     */

  }, {
    key: '_findNearestCell',
    value: function _findNearestCell(offset) {
      if (isNaN(offset)) {
        throw Error('Invalid offset ' + offset + ' specified');
      }

      // Our search algorithms find the nearest match at or below the specified offset.
      // So make sure the offset is at least 0 or no match will be found.
      offset = Math.max(0, offset);

      var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();
      var lastMeasuredIndex = Math.max(0, this._lastMeasuredIndex);

      if (lastMeasuredCellSizeAndPosition.offset >= offset) {
        // If we've already measured cells within this range just use a binary search as it's faster.
        return this._binarySearch(lastMeasuredIndex, 0, offset);
      } else {
        // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
        // The exponential search avoids pre-computing sizes for the full set of cells as a binary search would.
        // The overall complexity for this approach is O(log n).
        return this._exponentialSearch(lastMeasuredIndex, offset);
      }
    }
  }]);
  return CellSizeAndPositionManager;
}();

exports.default = CellSizeAndPositionManager;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_MAX_ELEMENT_SIZE = 1500000;
var CHROME_MAX_ELEMENT_SIZE = 1.67771e7;

var isBrowser = function isBrowser() {
  return typeof window !== 'undefined';
};

var isChrome = function isChrome() {
  return !!window.chrome && !!window.chrome.webstore;
};

var getMaxElementSize = exports.getMaxElementSize = function getMaxElementSize() {
  if (isBrowser()) {
    if (isChrome()) {
      return CHROME_MAX_ELEMENT_SIZE;
    }
  }
  return DEFAULT_MAX_ELEMENT_SIZE;
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(142);

var _keys2 = _interopRequireDefault(_keys);

exports.default = createCallbackMemoizer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  var cachedIndices = {};

  return function (_ref) {
    var callback = _ref.callback,
        indices = _ref.indices;

    var keys = (0, _keys2.default)(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      var value = indices[key];
      return Array.isArray(value) ? value.length > 0 : value >= 0;
    });
    var indexChanged = keys.length !== (0, _keys2.default)(cachedIndices).length || keys.some(function (key) {
      var cachedValue = cachedIndices[key];
      var value = indices[key];

      return Array.isArray(value) ? cachedValue.join(',') !== value.join(',') : cachedValue !== value;
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
module.exports = __webpack_require__(4).Object.keys;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(22);
var $keys = __webpack_require__(17);

__webpack_require__(60)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultOverscanIndicesGetter;

var babelPluginFlowReactPropTypes_proptype_OverscanIndices = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_OverscanIndices || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_OverscanIndicesGetterParams || __webpack_require__(0).any;

var SCROLL_DIRECTION_BACKWARD = exports.SCROLL_DIRECTION_BACKWARD = -1;
var SCROLL_DIRECTION_FORWARD = exports.SCROLL_DIRECTION_FORWARD = 1;

var SCROLL_DIRECTION_HORIZONTAL = exports.SCROLL_DIRECTION_HORIZONTAL = 'horizontal';
var SCROLL_DIRECTION_VERTICAL = exports.SCROLL_DIRECTION_VERTICAL = 'vertical';

/**
 * Calculates the number of cells to overscan before and after a specified range.
 * This function ensures that overscanning doesn't exceed the available cells.
 */

function defaultOverscanIndicesGetter(_ref) {
  var cellCount = _ref.cellCount,
      overscanCellsCount = _ref.overscanCellsCount,
      scrollDirection = _ref.scrollDirection,
      startIndex = _ref.startIndex,
      stopIndex = _ref.stopIndex;

  if (scrollDirection === SCROLL_DIRECTION_FORWARD) {
    return {
      overscanStartIndex: Math.max(0, startIndex),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
    };
  } else {
    return {
      overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex)
    };
  }
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateScrollIndexHelper;

var _ScalingCellSizeAndPositionManager = __webpack_require__(46);

var _ScalingCellSizeAndPositionManager2 = _interopRequireDefault(_ScalingCellSizeAndPositionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_CellSize = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellSize || __webpack_require__(0).any;

var babelPluginFlowReactPropTypes_proptype_Alignment = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_Alignment || __webpack_require__(0).any;

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 * This function also ensures that the scroll ofset isn't past the last column/row of cells.
 */

function updateScrollIndexHelper(_ref) {
  var cellSize = _ref.cellSize,
      cellSizeAndPositionManager = _ref.cellSizeAndPositionManager,
      previousCellsCount = _ref.previousCellsCount,
      previousCellSize = _ref.previousCellSize,
      previousScrollToAlignment = _ref.previousScrollToAlignment,
      previousScrollToIndex = _ref.previousScrollToIndex,
      previousSize = _ref.previousSize,
      scrollOffset = _ref.scrollOffset,
      scrollToAlignment = _ref.scrollToAlignment,
      scrollToIndex = _ref.scrollToIndex,
      size = _ref.size,
      sizeJustIncreasedFromZero = _ref.sizeJustIncreasedFromZero,
      updateScrollIndexCallback = _ref.updateScrollIndexCallback;

  var cellCount = cellSizeAndPositionManager.getCellCount();
  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellCount;
  var sizeHasChanged = size !== previousSize || sizeJustIncreasedFromZero || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToAlignment !== previousScrollToAlignment || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback(scrollToIndex);

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && cellCount > 0 && (size < previousSize || cellCount < previousCellsCount)) {
    // We need to ensure that the current scroll offset is still within the collection's range.
    // To do this, we don't need to measure everything; CellMeasurer would perform poorly.
    // Just check to make sure we're still okay.
    // Only adjust the scroll position if we've scrolled below the last set of rows.
    if (scrollOffset > cellSizeAndPositionManager.getTotalSize() - size) {
      updateScrollIndexCallback(cellCount - 1);
    }
  }
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultCellRangeRenderer;

/**
 * Default implementation of cellRangeRenderer used by Grid.
 * This renderer supports cell-caching while the user is scrolling.
 */

var babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams = __webpack_require__(1).babelPluginFlowReactPropTypes_proptype_CellRangeRendererParams || __webpack_require__(0).any;

function defaultCellRangeRenderer(_ref) {
  var cellCache = _ref.cellCache,
      cellRenderer = _ref.cellRenderer,
      columnSizeAndPositionManager = _ref.columnSizeAndPositionManager,
      columnStartIndex = _ref.columnStartIndex,
      columnStopIndex = _ref.columnStopIndex,
      deferredMeasurementCache = _ref.deferredMeasurementCache,
      horizontalOffsetAdjustment = _ref.horizontalOffsetAdjustment,
      isScrolling = _ref.isScrolling,
      parent = _ref.parent,
      rowSizeAndPositionManager = _ref.rowSizeAndPositionManager,
      rowStartIndex = _ref.rowStartIndex,
      rowStopIndex = _ref.rowStopIndex,
      styleCache = _ref.styleCache,
      verticalOffsetAdjustment = _ref.verticalOffsetAdjustment,
      visibleColumnIndices = _ref.visibleColumnIndices,
      visibleRowIndices = _ref.visibleRowIndices;

  var renderedCells = [];

  // Browsers have native size limits for elements (eg Chrome 33M pixels, IE 1.5M pixes).
  // User cannot scroll beyond these size limitations.
  // In order to work around this, ScalingCellSizeAndPositionManager compresses offsets.
  // We should never cache styles for compressed offsets though as this can lead to bugs.
  // See issue #576 for more.
  var areOffsetsAdjusted = columnSizeAndPositionManager.areOffsetsAdjusted() || rowSizeAndPositionManager.areOffsetsAdjusted();

  var canCacheStyle = !isScrolling && !areOffsetsAdjusted;

  for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
    var rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(rowIndex);

    for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
      var columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfCell(columnIndex);
      var isVisible = columnIndex >= visibleColumnIndices.start && columnIndex <= visibleColumnIndices.stop && rowIndex >= visibleRowIndices.start && rowIndex <= visibleRowIndices.stop;
      var key = rowIndex + '-' + columnIndex;
      var style = void 0;

      // Cache style objects so shallow-compare doesn't re-render unnecessarily.
      if (canCacheStyle && styleCache[key]) {
        style = styleCache[key];
      } else {
        // In deferred mode, cells will be initially rendered before we know their size.
        // Don't interfere with CellMeasurer's measurements by setting an invalid size.
        if (deferredMeasurementCache && !deferredMeasurementCache.has(rowIndex, columnIndex)) {
          // Position not-yet-measured cells at top/left 0,0,
          // And give them width/height of 'auto' so they can grow larger than the parent Grid if necessary.
          // Positioning them further to the right/bottom influences their measured size.
          style = {
            height: 'auto',
            left: 0,
            position: 'absolute',
            top: 0,
            width: 'auto'
          };
        } else {
          style = {
            height: rowDatum.size,
            left: columnDatum.offset + horizontalOffsetAdjustment,
            position: 'absolute',
            top: rowDatum.offset + verticalOffsetAdjustment,
            width: columnDatum.size
          };

          styleCache[key] = style;
        }
      }

      var cellRendererParams = {
        columnIndex: columnIndex,
        isScrolling: isScrolling,
        isVisible: isVisible,
        key: key,
        parent: parent,
        rowIndex: rowIndex,
        style: style
      };

      var renderedCell = void 0;

      // Avoid re-creating cells while scrolling.
      // This can lead to the same cell being created many times and can cause performance issues for "heavy" cells.
      // If a scroll is in progress- cache and reuse cells.
      // This cache will be thrown away once scrolling completes.
      // However if we are scaling scroll positions and sizes, we should also avoid caching.
      // This is because the offset changes slightly as scroll position changes and caching leads to stale values.
      // For more info refer to issue #395
      if (isScrolling && !horizontalOffsetAdjustment && !verticalOffsetAdjustment) {
        if (!cellCache[key]) {
          cellCache[key] = cellRenderer(cellRendererParams);
        }

        renderedCell = cellCache[key];

        // If the user is no longer scrolling, don't cache cells.
        // This makes dynamic cell content difficult for users and would also lead to a heavier memory footprint.
      } else {
        renderedCell = cellRenderer(cellRendererParams);
      }

      if (renderedCell == null || renderedCell === false) {
        continue;
      }

      if (process.env.NODE_ENV !== 'production') {
        warnAboutMissingStyle(parent, renderedCell);
      }

      renderedCells.push(renderedCell);
    }
  }

  return renderedCells;
}

function warnAboutMissingStyle(parent, renderedCell) {
  if (process.env.NODE_ENV !== 'production') {
    if (renderedCell) {
      // If the direct child is a CellMeasurer, then we should check its child
      // See issue #611
      if (renderedCell.type && renderedCell.type.__internalCellMeasurerFlag) {
        renderedCell = renderedCell.props.children;
      }

      if (renderedCell && renderedCell.props && renderedCell.props.style === undefined && parent.__warnedAboutMissingStyle !== true) {
        parent.__warnedAboutMissingStyle = true;

        console.warn('Rendered cell should include style property for positioning.');
      }
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (recalc) {
  if (!size && size !== 0 || recalc) {
    if (_inDOM2.default) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};

var _inDOM = __webpack_require__(149);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var size = void 0;

module.exports = exports['default'];

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


// Properly handle server-side rendering.
var win = void 0;

if (typeof window !== 'undefined') {
  win = window;
} else if (typeof self !== 'undefined') {
  win = self;
} else {
  win = {};
}

// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var request = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || function (callback) {
  return win.setTimeout(callback, 1000 / 60);
};

var cancel = win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame || function (id) {
  win.clearTimeout(id);
};

var raf = exports.raf = request;
var caf = exports.caf = cancel;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(51);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(58);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(23);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(24);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(61);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(67);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(2);

var React = _interopRequireWildcard(_react);

var _detectElementResize = __webpack_require__(152);

var _detectElementResize2 = _interopRequireDefault(_detectElementResize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoSizer = function (_React$PureComponent) {
  (0, _inherits3.default)(AutoSizer, _React$PureComponent);

  function AutoSizer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoSizer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoSizer.__proto__ || (0, _getPrototypeOf2.default)(AutoSizer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: _this.props.defaultHeight || 0,
      width: _this.props.defaultWidth || 0
    }, _this._onResize = function () {
      var _this$props = _this.props,
          disableHeight = _this$props.disableHeight,
          disableWidth = _this$props.disableWidth,
          onResize = _this$props.onResize;


      if (_this._parentNode) {
        // Guard against AutoSizer component being removed from the DOM immediately after being added.
        // This can result in invalid style values which can result in NaN values if we don't handle them.
        // See issue #150 for more context.

        var _height = _this._parentNode.offsetHeight || 0;
        var _width = _this._parentNode.offsetWidth || 0;

        var _style = window.getComputedStyle(_this._parentNode) || {};
        var paddingLeft = parseInt(_style.paddingLeft, 10) || 0;
        var paddingRight = parseInt(_style.paddingRight, 10) || 0;
        var paddingTop = parseInt(_style.paddingTop, 10) || 0;
        var paddingBottom = parseInt(_style.paddingBottom, 10) || 0;

        var newHeight = _height - paddingTop - paddingBottom;
        var newWidth = _width - paddingLeft - paddingRight;

        if (!disableHeight && _this.state.height !== newHeight || !disableWidth && _this.state.width !== newWidth) {
          _this.setState({
            height: _height - paddingTop - paddingBottom,
            width: _width - paddingLeft - paddingRight
          });

          onResize({ height: _height, width: _width });
        }
      }
    }, _this._setRef = function (autoSizer) {
      _this._autoSizer = autoSizer;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var nonce = this.props.nonce;

      if (this._autoSizer && this._autoSizer.parentNode && this._autoSizer.parentNode.ownerDocument && this._autoSizer.parentNode.ownerDocument.defaultView && this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement) {
        // Delay access of parentNode until mount.
        // This handles edge-cases where the component has already been unmounted before its ref has been set,
        // As well as libraries like react-lite which have a slightly different lifecycle.
        this._parentNode = this._autoSizer.parentNode;

        // Defer requiring resize handler in order to support server-side rendering.
        // See issue #41
        this._detectElementResize = (0, _detectElementResize2.default)(nonce);
        this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

        this._onResize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._detectElementResize && this._parentNode) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          disableHeight = _props.disableHeight,
          disableWidth = _props.disableWidth,
          style = _props.style;
      var _state = this.state,
          height = _state.height,
          width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };
      var childParams = {};

      if (!disableHeight) {
        outerStyle.height = 0;
        childParams.height = height;
      }

      if (!disableWidth) {
        outerStyle.width = 0;
        childParams.width = width;
      }

      /**
       * TODO: Avoid rendering children before the initial measurements have been collected.
       * At best this would just be wasting cycles.
       * Add this check into version 10 though as it could break too many ref callbacks in version 9.
       * Note that if default width/height props were provided this would still work with SSR.
      if (
        height !== 0 &&
        width !== 0
      ) {
        child = children({ height, width })
      }
      */

      return React.createElement(
        'div',
        {
          className: className,
          ref: this._setRef,
          style: (0, _extends3.default)({}, outerStyle, style) },
        children(childParams)
      );
    }
  }]);
  return AutoSizer;
}(React.PureComponent);

AutoSizer.defaultProps = {
  onResize: function onResize() {},
  disableHeight: false,
  disableWidth: false,
  style: {}
};
AutoSizer.propTypes = process.env.NODE_ENV === 'production' ? null : {
  /** Function responsible for rendering children.*/
  children: __webpack_require__(0).func.isRequired,


  /** Optional custom CSS class name to attach to root AutoSizer element.  */
  className: __webpack_require__(0).string,


  /** Default height to use for initial render; useful for SSR */
  defaultHeight: __webpack_require__(0).number,


  /** Default width to use for initial render; useful for SSR */
  defaultWidth: __webpack_require__(0).number,


  /** Disable dynamic :height property */
  disableHeight: __webpack_require__(0).bool.isRequired,


  /** Disable dynamic :width property */
  disableWidth: __webpack_require__(0).bool.isRequired,


  /** Nonce of the inlined stylesheet for Content Security Policy */
  nonce: __webpack_require__(0).string,


  /** Callback to be invoked on-resize */
  onResize: __webpack_require__(0).func.isRequired,


  /** Optional inline style */
  style: __webpack_require__(0).object
};
exports.default = AutoSizer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDetectElementResize;
/**
 * Detect Element Resize.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * Forked from version 0.5.3; includes the following modifications:
 * 1) Guard against unsafe 'window' and 'document' references (to support SSR).
 * 2) Defer initialization code via a top-level function wrapper (to support SSR).
 * 3) Avoid unnecessary reflows by not measuring size for scroll events bubbling from children.
 * 4) Add nonce for style element.
 **/

function createDetectElementResize(nonce) {
  // Check `document` and `window` in case of server-side rendering
  var _window;
  if (typeof window !== 'undefined') {
    _window = window;
  } else if (typeof self !== 'undefined') {
    _window = self;
  } else {
    _window = global;
  }

  var attachEvent = typeof document !== 'undefined' && document.attachEvent;

  if (!attachEvent) {
    var requestFrame = function () {
      var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
        return _window.setTimeout(fn, 20);
      };
      return function (fn) {
        return raf(fn);
      };
    }();

    var cancelFrame = function () {
      var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
      return function (id) {
        return cancel(id);
      };
    }();

    var resetTriggers = function resetTriggers(element) {
      var triggers = element.__resizeTriggers__,
          expand = triggers.firstElementChild,
          contract = triggers.lastElementChild,
          expandChild = expand.firstElementChild;
      contract.scrollLeft = contract.scrollWidth;
      contract.scrollTop = contract.scrollHeight;
      expandChild.style.width = expand.offsetWidth + 1 + 'px';
      expandChild.style.height = expand.offsetHeight + 1 + 'px';
      expand.scrollLeft = expand.scrollWidth;
      expand.scrollTop = expand.scrollHeight;
    };

    var checkTriggers = function checkTriggers(element) {
      return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
    };

    var scrollListener = function scrollListener(e) {
      // Don't measure (which forces) reflow for scrolls that happen inside of children!
      if (e.target.className.indexOf('contract-trigger') < 0 && e.target.className.indexOf('expand-trigger') < 0) {
        return;
      }

      var element = this;
      resetTriggers(this);
      if (this.__resizeRAF__) {
        cancelFrame(this.__resizeRAF__);
      }
      this.__resizeRAF__ = requestFrame(function () {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(function (fn) {
            fn.call(element, e);
          });
        }
      });
    };

    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
        keyframeprefix = '',
        animationstartevent = 'animationstart',
        domPrefixes = 'Webkit Moz O ms'.split(' '),
        startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
        pfx = '';
    {
      var elm = document.createElement('fakeelement');
      if (elm.style.animationName !== undefined) {
        animation = true;
      }

      if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
          if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animationstartevent = startEvents[i];
            animation = true;
            break;
          }
        }
      }
    }

    var animationName = 'resizeanim';
    var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
  }

  var createStyles = function createStyles(doc) {
    if (!doc.getElementById('detectElementResize')) {
      //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
          head = doc.head || doc.getElementsByTagName('head')[0],
          style = doc.createElement('style');

      style.id = 'detectElementResize';
      style.type = 'text/css';

      if (nonce != null) {
        style.setAttribute('nonce', nonce);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(doc.createTextNode(css));
      }

      head.appendChild(style);
    }
  };

  var addResizeListener = function addResizeListener(element, fn) {
    if (attachEvent) {
      element.attachEvent('onresize', fn);
    } else {
      if (!element.__resizeTriggers__) {
        var doc = element.ownerDocument;
        var elementStyle = _window.getComputedStyle(element);
        if (elementStyle && elementStyle.position == 'static') {
          element.style.position = 'relative';
        }
        createStyles(doc);
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = doc.createElement('div')).className = 'resize-triggers';
        element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
        element.appendChild(element.__resizeTriggers__);
        resetTriggers(element);
        element.addEventListener('scroll', scrollListener, true);

        /* Listen for a css animation to detect element display/re-attach */
        if (animationstartevent) {
          element.__resizeTriggers__.__animationListener__ = function animationListener(e) {
            if (e.animationName == animationName) {
              resetTriggers(element);
            }
          };
          element.__resizeTriggers__.addEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__);
        }
      }
      element.__resizeListeners__.push(fn);
    }
  };

  var removeResizeListener = function removeResizeListener(element, fn) {
    if (attachEvent) {
      element.detachEvent('onresize', fn);
    } else {
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', scrollListener, true);
        if (element.__resizeTriggers__.__animationListener__) {
          element.__resizeTriggers__.removeEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__);
          element.__resizeTriggers__.__animationListener__ = null;
        }
        try {
          element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
        } catch (e) {
          // Preact compat; see developit/preact-compat/issues/228
        }
      }
    }
  };

  return {
    addResizeListener: addResizeListener,
    removeResizeListener: removeResizeListener
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),
/* 153 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el, i, matches;
      matches = (this.document || this.ownerDocument).querySelectorAll(s);
      i = void 0;
      el = this;
      while (true) {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {
          continue;
        }
        if (!(i < 0 && (el = el.parentElement))) {
          break;
        }
      }
      return el;
    };
  }
}).call(undefined);

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var i, matches;
      matches = (this.document || this.ownerDocument).querySelectorAll(s);
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {
        continue;
      }
      return i > -1;
    };
  }
}).call(undefined);

/***/ })
/******/ ]);
});