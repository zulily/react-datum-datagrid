(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("backbone"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "backbone", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDatum"] = factory(require("underscore"), require("backbone"), require("react"), require("react-dom"));
	else
		root["ReactDatum"] = factory(root["_"], root["Backbone"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_11__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var React;

  React = __webpack_require__(5);

  if (!React.PropTypes) {
    React.PropTypes = __webpack_require__(6);
  }

  module.exports = React;
}).call(undefined);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      Datum,
      Options,
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

  React = __webpack_require__(0);

  ReactDOM = __webpack_require__(11);

  Backbone = __webpack_require__(3);

  _ = __webpack_require__(1);

  Options = __webpack_require__(12);

  module.exports = Datum = function (superClass) {
    extend(Datum, superClass);

    Datum.displayName = "react-datum.Datum";

    Datum.propTypes = {
      className: React.PropTypes.string,
      model: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]),
      attr: React.PropTypes.string,
      label: React.PropTypes.node,
      tooltip: React.PropTypes.string,
      placeholder: React.PropTypes.node,
      inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit']),
      getMetadata: React.PropTypes.func,
      noPopover: React.PropTypes.bool,
      rbOverlayProps: React.PropTypes.object,
      setOnChange: React.PropTypes.bool,
      setOnBlur: React.PropTypes.bool,
      saveOnSet: React.PropTypes.bool,
      modelSaveMethod: React.PropTypes.string,
      modelSaveOptions: React.PropTypes.object,
      savedIndicatorTimeout: React.PropTypes.number,
      readonly: React.PropTypes.bool,
      required: React.PropTypes.bool,
      style: React.PropTypes.object,
      asDiv: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      value: React.PropTypes.node,
      stateless: React.PropTypes.bool
    };

    Datum.defaultProps = {
      setOnBlur: true,
      setOnChange: false,
      saveOnSet: false,
      modelSaveMethod: 'save',
      savedIndicatorTimeout: 5000
    };

    Datum.contextTypes = {
      model: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]),
      inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit']),
      form: React.PropTypes.object
    };

    Datum.prototype.subClassName = null;

    Datum.prototype.className = 'datum';

    Datum.inlineEditor = null;

    Datum.prototype.validations = [];

    function Datum(props) {
      this.validateRequired = bind(this.validateRequired, this);
      this.focus = bind(this.focus, this);
      this.onInputRef = bind(this.onInputRef, this);
      this.getInputComponent = bind(this.getInputComponent, this);
      this.setValue = bind(this.setValue, this);
      this.onInputKeyDown = bind(this.onInputKeyDown, this);
      this.onDocumentKeydown = bind(this.onDocumentKeydown, this);
      this.onDocumentClick = bind(this.onDocumentClick, this);
      this.onModelSaveError = bind(this.onModelSaveError, this);
      this.onModelSaveSuccess = bind(this.onModelSaveSuccess, this);
      this.onBlur = bind(this.onBlur, this);
      this.onChange = bind(this.onChange, this);
      this.onEditClick = bind(this.onEditClick, this);
      this.addValidations = bind(this.addValidations, this);
      Datum.__super__.constructor.call(this, props);
      this.initializeState();
      this.addValidations(this.validateRequired);
    }

    Datum.prototype.initializeState = function () {
      var ref;
      return this.state = _.extend((ref = this.state) != null ? ref : {}, {
        value: this.getModelValue(),
        errors: [],
        isDirty: false,
        saving: false,
        saved: null
      });
    };

    Datum.prototype.componentWillMount = function () {};

    Datum.prototype.componentDidMount = function () {
      var modelValue, ref, ref1;
      if ((ref = this.context) != null) {
        if ((ref1 = ref.form) != null) {
          if (typeof ref1.addDatum === "function") {
            ref1.addDatum(this);
          }
        }
      }
      modelValue = this.getModelValue();
      document.addEventListener('click', this.onDocumentClick);
      return document.addEventListener('keydown', this.onDocumentKeydown);
    };

    /* !pragma coverage-skip-next */

    Datum.prototype.componentWillReceiveProps = function (nextProps) {
      var newModelValue, prevModelValue;
      prevModelValue = this.getModelValue(this.props);
      newModelValue = this.getModelValue(nextProps);
      if (JSON.stringify(prevModelValue) !== JSON.stringify(newModelValue)) {
        return this.setState({
          value: newModelValue
        });
      }
    };

    /* !pragma coverage-skip-next */

    Datum.prototype.componentWillUnmount = function () {
      var ref, ref1;
      if ((ref = this.context) != null) {
        if ((ref1 = ref.form) != null) {
          if (typeof ref1.removeDatum === "function") {
            ref1.removeDatum(this);
          }
        }
      }
      if (this.isDirty() && this.shouldSetOnBlur()) {
        this.setValue(this.state.value, {
          setModelValue: true
        });
      }
      document.removeEventListener('click', this.onDocumentClick);
      return document.removeEventListener('keydown', this.onDocumentKeydown);
    };

    Datum.prototype.render = function () {
      return this.renderDatumWrapper(function (_this) {
        return function () {
          if (_this.isEditing()) {
            return _this.renderForInput();
          } else {
            return _this.renderForDisplay();
          }
        };
      }(this));
    };

    Datum.prototype.renderDatumWrapper = function (contentFn) {
      var wrapperProps;
      wrapperProps = {
        className: this.getFullClassName(),
        'data-zattr': this.getAttr(),
        style: this.props.style || {}
      };
      if (this.props.asDiv) {
        return React.createElement("div", Object.assign({}, wrapperProps), contentFn());
      } else {
        return React.createElement("span", Object.assign({}, wrapperProps), contentFn());
      }
    };

    Datum.prototype.renderForDisplay = function () {
      return React.createElement("span", null, this.renderLabel(), this.renderValueOrPlaceholder(), this.renderIcons());
    };

    Datum.prototype.renderLabel = function () {
      var label, labelProps, tooltip;
      labelProps = {};
      tooltip = this.getPropOrMetadata('tooltip');
      label = this.getPropOrMetadata('label') != null ? this.renderWithPopover(React.createElement("label", Object.assign({}, labelProps), this.getPropOrMetadata('label')), tooltip, 'datumTooltip', 'datum-tooltip') : null;
      return label;
    };

    /*
      Override this method only if you need to not render the placeholder.
     */

    Datum.prototype.renderValueOrPlaceholder = function () {
      var displayValue, placeholderValue;
      if (this.getModelValue() != null) {
        displayValue = this.renderValueForDisplay();
        return this.renderWrappedDisplayValue(displayValue);
      } else {
        placeholderValue = this.renderPlaceholder();
        return this.renderWrappedDisplayValue(placeholderValue);
      }
    };

    /*
      In most cases, this is the method you want to override in a custom datum to 
      alter the way the model attribute is displayed when inputMode='readonly'
      
      This method is only called if the model value is not null.
     */

    Datum.prototype.renderValueForDisplay = function () {
      return this.getValueForDisplay();
    };

    Datum.prototype.renderWrappedDisplayValue = function (value) {
      return React.createElement("span", {
        "className": "datum-display-value",
        "onClick": this.onEditClick,
        "style": this.props.style
      }, value);
    };

    Datum.prototype.renderPlaceholder = function () {
      var placeholder;
      placeholder = this.getPropOrMetadata('placeholder');
      if (placeholder == null) {
        return null;
      }
      return React.createElement("span", {
        "className": "placeholder"
      }, placeholder);
    };

    /*
      Note that this method is not called by Datum directly.  It is 
      provided here in the Datum base class so that any Datum extensions 
      can ellipsize whatever part of their rendering neccessary and have 
      a consistent prop and method for doing so.
     */

    Datum.prototype.renderEllipsizedValue = function (value, options) {
      var ellipsizeAt, ellipsizedValue;
      if (options == null) {
        options = {};
      }
      if (value == null) {
        return value;
      }
      ellipsizeAt = this.getEllipsizeAt();
      if (value && _.isString(value) && ellipsizeAt && value.length > ellipsizeAt) {
        if (this.props.reverseEllipsis) {
          ellipsizedValue = '...' + value.slice(value.length - (ellipsizeAt - 3), value.length - 1);
        } else {
          ellipsizedValue = value.slice(0, ellipsizeAt - 3) + '...';
        }
        return this.renderWithPopover(ellipsizedValue, value, 'datumEllipsizedValue', 'datum-ellipsized');
      }
      return value;
    };

    Datum.prototype.renderForInput = function () {
      return React.createElement("span", {
        "className": "datum-input",
        "data-value": this.getValueForInput()
      }, this.renderLabel(), this.renderInput(), this.renderIcons());
    };

    /*
      In most cases this is the method you want to override to alter the presentation of the datum when
      inputMode='edit'.
      
      If you override this method, be sure to add @onBlur() and @onChange() to your input
      component
     */

    Datum.prototype.renderInput = function () {
      return React.createElement("input", Object.assign({}, this.getInputComponentOptions()));
    };

    /*
      Override / extend this method to add or alter icons presented after datum.
      
      Datum implementation renders the error icon if needed.
     */

    Datum.prototype.renderIcons = function () {
      var className, errorIcon, errorIconClass, errors;
      if (!(this.state.errors.length > 0)) {
        return null;
      }
      errors = [];
      className = "error validation";
      errorIconClass = Options.get('errorIconClass');
      errorIcon = errorIconClass != null ? React.createElement("i", {
        "className": errorIconClass
      }) : '!';
      errors = this.renderErrors();
      return this.renderWithPopover(errorIcon, errors, 'datumInvalid', 'datum-invalid');
    };

    /*
      Override / extend this method to control what is rendered in the error icon popup
     */

    Datum.prototype.renderErrors = function () {
      var error, errors, i, len, ref;
      errors = [];
      if (this.getReactBootstrap() != null && !this.props.noPopover) {
        ref = this.state.errors;
        for (i = 0, len = ref.length; i < len; i++) {
          error = ref[i];
          errors.push(React.createElement("div", null, error));
        }
      } else {
        errors = this.state.errors.join('\n');
      }
      return errors;
    };

    /*
      You can use this to render a value with the standard popover treatment or 
      extend and override to effect the standard popover treatment
     */

    Datum.prototype.renderWithPopover = function (value, tooltip, popoverId, valueClass) {

      /* !pragma coverage-skip-block */
      var Rb, popover, rValue, rbOverlayProps;
      if (tooltip == null) {
        return value;
      }
      Rb = this.getReactBootstrap();
      if (Rb != null && !this.props.noPopover) {
        popover = React.createElement(Rb.Popover, {
          "id": popoverId
        }, tooltip);
        rbOverlayProps = this.getRbOverlayProps(value, popoverId);
        rValue = React.createElement(Rb.OverlayTrigger, Object.assign({
          "overlay": popover
        }, rbOverlayProps), React.createElement("span", {
          "className": valueClass
        }, value));
      } else {
        rValue = React.createElement("span", {
          "className": valueClass,
          "title": tooltip
        }, value);
      }
      return rValue;
    };

    /*
      Override this method to provide things like custom positioning of error popovers
     */

    Datum.prototype.getRbOverlayProps = function (value, popoverId) {

      /* !pragma coverage-skip-block */
      var ref;
      return (ref = this.props.rbOverlayProps) != null ? ref : Options.get('RbOverlayProps');
    };

    /*
      This method can be overriden to provide custom determination of dirty state.
      dirty meaning, has the input value changed.  The base implementation assumes
      that the base behavior of setting state.value to null on model.set() happens.
     */

    Datum.prototype.isDirty = function () {
      return this.state.isDirty;
    };

    /*
      This method is called to determine if the inputMode (prop, context) is one
      of the editable types.  ('edit' or 'inlineEdit')
      
      Note that a return of true does NOT indicate that the Datum is in its 
      edit display.  If the component is an inputMode='inlineEdit', in may be
      showing it's display presentation.  See also isEditing()
     */

    Datum.prototype.isEditable = function () {
      var inputMode;
      inputMode = this.getInputMode();
      if (inputMode === "edit" || inputMode === "inlineEdit") {
        return true;
      }
    };

    /*
      This method is called to determine if the Datum is displaying its input
      presentation.
     */

    Datum.prototype.isEditing = function () {
      var inputMode;
      inputMode = this.getInputMode();
      return inputMode === 'edit' || this.isInlineEdit() && this.constructor.inlineEditor === this;
    };

    Datum.prototype.isInlineEdit = function () {
      return this.getInputMode() === 'inlineEdit';
    };

    Datum.prototype.cancelEdit = function () {
      return this.setState({
        errors: [],
        value: this.getModelValue()
      });
    };

    /*
      When extending Datum, use @addValidations from constructor to add additional validations.
      'required' validation is automatically added (only invalid if empty and has 'required' prop)
      
      For example, see [Number datum](#Number)
      
      You can add validations to an individual instance of any Datum extension.
      
      `validations` argument should be one or an array of methods that accept the (value) to
      validate and return true if valid, false if not.
     */

    Datum.prototype.addValidations = function (validations) {
      if (!_.isArray(validations)) {
        validations = [validations];
      }
      return this.validations = this.validations.concat(validations);
    };

    Datum.prototype.getInputMode = function () {
      if (this.props.readonly) {
        return "readonly";
      }
      return this.props.inputMode || this.context.inputMode || "readonly";
    };

    Datum.prototype.getInputComponentOptions = function () {
      var placeholder, value;
      placeholder = this.getPropOrMetadata('placeholder') || "";
      value = this.getValueForInput();
      return {
        type: "text",
        placeholder: placeholder,
        value: value,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onKeyDown: this.onInputKeyDown,
        ref: this.onInputRef
      };
    };

    /* 
      This method should return the value for display from the model. You 
      can extend this method in a custom Datum to coerce or manipulate just
      the value used for display.   
      
      In most cases, you'll probably want to extend the Datum.renderValueForDisplay() 
      instead
     */

    Datum.prototype.getValueForDisplay = function () {
      return this.getModelValue();
    };

    /*
      Extend this method to coerce or intepret the value from the model
      that is displayed when in input
     */

    Datum.prototype.getValueForInput = function () {
      if (!this.props.stateless && this.state.value !== void 0) {
        return this.state.value;
      } else {
        return this.getModelValue();
      }
    };

    /*
      DEPRECATED (use getValueForInput): this method returns the value in the input as seen by user
     */

    Datum.prototype.getInputValue = function () {
      return this.state.value;
    };

    /*
      Extend this method to change how to get the input element's value from a 
      change event.   The base class impl get's the value from event.target.value
      by default.
     */

    Datum.prototype.getValueFromInput = function (event) {
      var ref, ref1, ref2;
      return (ref = (ref1 = event != null ? (ref2 = event.target) != null ? ref2.value : void 0 : void 0) != null ? ref1 : event != null ? event.value : void 0) != null ? ref : event;
    };

    /*
      returns the Backbone Model currently associated with the datum.
     */

    Datum.prototype.getModel = function (newProps, newContext) {
      if (newProps == null) {
        newProps = this.props;
      }
      if (newContext == null) {
        newContext = this.context;
      }
      return (newProps != null ? newProps.model : void 0) || (newContext != null ? newContext.model : void 0) || new Backbone.Model();
    };

    /*
      Returns the value set via value prop or the value currently set on the model
      
      warning: Do not override this method to return a component element or jsx; bad things will happen.
     */

    Datum.prototype.getModelValue = function (newProps, newContext) {
      var model, ref, ref1, value;
      if (newProps == null) {
        newProps = this.props;
      }
      if (newContext == null) {
        newContext = this.context;
      }
      if (newProps.value !== void 0) {
        return (ref = (ref1 = this.state) != null ? ref1.shadowValue : void 0) != null ? ref : newProps.value;
      }
      if (!(model = this.getModel(newProps, newContext))) {
        return null;
      }
      value = _.isFunction(model.get) ? model.get(this.getAttr(newProps)) : model[this.getAttr(newProps)];
      return value;
    };

    /*
      When extending react datum, use this method to get the attribute name specified
      to the component as props.attr.  
      
      You can also override this method in an extension to dynamically select the attribute
      to get from the model.  For say an international price datum that selects a price
      attribute based on the local currency  (not a contrived example)
     */

    Datum.prototype.getAttr = function (props) {
      if (props == null) {
        props = this.props;
      }
      return props.attr;
    };

    /*
      Extend this method to interpret the value prior to saving for example a Percent datum
      that the user enters a value that is 100x what gets saved to model
      
      options pass through to model.set()
     */

    Datum.prototype.setModelValue = function (value, options) {
      var attr, model;
      if (options == null) {
        options = {};
      }
      if (value === void 0) {
        value = this.getInputValue();
        if (value === void 0) {
          return;
        }
      }
      model = this.getModel();
      attr = this.getAttr();
      if (model != null) {
        if (_.isFunction(model.set)) {
          model.set(attr, value, options);
        } else {
          model[attr] = value;
        }
        if (this.props.saveOnSet || options.saveOnset) {
          this.saveModel();
        }
      }
      if (this.props.value !== void 0) {
        return this.setState({
          shadowValue: value
        });
      }
    };

    Datum.prototype.saveModel = function () {
      var model;
      model = this.getModel();
      if (model == null) {
        return;
      }
      if (_.isFunction(model[this.props.modelSaveMethod])) {
        return this.setState({
          saving: true
        }, function (_this) {
          return function () {
            return model[_this.props.modelSaveMethod]({}, _this.getModelSaveOptions());
          };
        }(this));
      } else {
        return console.error("Datum:setModelValue - saveOnSet true but modelSaveMethod (" + this.props.modelSaveMethod + ") is not a function on model");
      }
    };

    Datum.prototype.getModelSaveOptions = function () {
      var originalError, originalSuccess, saveOptions;
      saveOptions = _.extend({}, this.props.modelSaveOptions);
      originalSuccess = saveOptions.success;
      originalError = saveOptions.error;
      saveOptions.success = function (_this) {
        return function (model, resp) {
          _this.onModelSaveSuccess(model, resp);
          return typeof originalSuccess === "function" ? originalSuccess(model, resp, _this) : void 0;
        };
      }(this);
      saveOptions.error = function (_this) {
        return function (model, resp) {
          _this.onModelSaveError(model, resp);
          return typeof originalError === "function" ? originalError(model, resp, _this) : void 0;
        };
      }(this);
      return saveOptions;
    };

    Datum.prototype.getEllipsizeAt = function () {
      return this.props.ellipsizeAt;
    };

    /*
      Override / extend this method to add conditional css classes to the outer datum element
     */

    Datum.prototype.getFullClassName = function () {
      var className, ref;
      className = this.subClassName != null ? this.className + " " + this.subClassName : this.className;
      if (this.props.required) {
        className += " required";
      }
      if (((ref = this.state.errors) != null ? ref.length : void 0) > 0) {
        className += " invalid";
      }
      if (this.state.saving) {
        className += " saving";
      }
      if (this.state.saved === false) {
        className += " not-saved";
      }
      if (this.state.saved === true) {
        className += " saved";
      }
      if (this.props.className != null) {
        className += " " + this.props.className;
      }
      return className;
    };

    Datum.prototype.getPropOrMetadata = function (prop) {
      var base, ref;
      if (this.props[prop] !== void 0) {
        return this.props[prop];
      }
      return (typeof (base = this.props).getMetadata === "function" ? base.getMetadata(prop, this) : void 0) || ((ref = this.getModel()) != null ? typeof ref.getDatumMetadata === "function" ? ref.getDatumMetadata(prop, this) : void 0 : void 0) || void 0;
    };

    Datum.prototype.getReactBootstrap = function () {
      return Options.get('ReactBootstrap') || (typeof window !== "undefined" && window !== null ? window.ReactBootstrap : void 0);
    };

    Datum.prototype.shouldSetOnChange = function () {
      return this.props.setOnChange === true || this.isInlineEdit() && !this.props.setOnChange === false;
    };

    Datum.prototype.shouldSetOnBlur = function () {
      return this.props.setOnBlur === true && !this.shouldSetOnChange() && !this.props.multi;
    };

    Datum.prototype.onEditClick = function (synthEvent) {
      var ref;
      if (this.inlineToEditMode()) {
        synthEvent.stopPropagation();
        return (ref = synthEvent.nativeEvent) != null ? typeof ref.stopImmediatePropagation === "function" ? ref.stopImmediatePropagation() : void 0 : void 0;
      }
    };

    Datum.prototype.onChange = function (event, options) {
      var value;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false,
        event: event,
        propsOnChangeValue: null
      });
      value = this.getValueFromInput(event);
      this.setValue(value, {
        setModelValue: this.shouldSetOnChange()
      });
      if (this.shouldSetOnChange()) {
        this.inlineToDisplayMode();
      }
      if (this.props.onChange != null && !options.silent) {
        return this.props.onChange(options.propsOnChangeValue || value, this, options);
      }
    };

    Datum.prototype.onBlur = function (event) {
      var value;
      value = this.getInputValue();
      if (!this.hasInputValueChanged()) {
        return;
      }
      this.setValue(value, {
        setModelValue: this.shouldSetOnBlur()
      });
      return this.inlineToDisplayMode();
    };

    Datum.prototype.onModelSaveSuccess = function (model, resp) {
      this.setState({
        saving: false,
        saved: true
      });
      if (this.props.savedIndicatorTimeout != null) {
        return _.delay(function (_this) {
          return function () {
            return _this.setState({
              saved: null
            });
          };
        }(this), this.props.savedIndicatorTimeout);
      }
    };

    Datum.prototype.onModelSaveError = function (model, resp) {
      var errors, ref, ref1;
      errors = this.state.errors || [];
      errors.push("Unable to save value. Error: " + ((ref = (ref1 = resp.responseText) != null ? ref1 : resp.statusText) != null ? ref : resp));
      this.setState({
        saving: false,
        saved: false,
        errors: errors
      });
      if (this.props.savedIndicatorTimeout != null) {
        return _.delay(function (_this) {
          return function () {
            return _this.setState({
              saved: null
            });
          };
        }(this), this.props.savedIndicatorTimeout);
      }
    };

    /*
      Extend this method to run code when the model value change is detected
      when props are changed
     */

    Datum.prototype.onModelValueChange = function (oldModelValue, newModelValue) {
      return this.setState({
        value: newModelValue
      });
    };

    Datum.prototype.onDocumentClick = function (evt) {
      if (this.isInlineEdit() && this.isEditing() && !this.isElementOrParentOf(evt.target, ReactDOM.findDOMNode(this))) {
        return this.inlineToDisplayMode();
      }
    };

    Datum.prototype.onDocumentKeydown = function (evt) {
      if (evt.keyCode === 27 && (typeof this.isInlineEdit === "function" ? this.isInlineEdit() : void 0) && (typeof this.isEditing === "function" ? this.isEditing() : void 0)) {
        return this.inlineToDisplayMode();
      }
    };

    Datum.prototype.isElementOrParentOf = function (elementInQuestion, parentElement) {
      var el;
      el = elementInQuestion;
      while (el != null) {
        if (el === parentElement) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    Datum.prototype.hasInputValueChanged = function () {
      var inputValue;
      inputValue = this.getInputValue();
      return inputValue !== void 0 && inputValue !== this.getModelValue();
    };

    Datum.prototype.inlineToDisplayMode = function () {
      if (!this.isInlineEdit()) {
        return false;
      }
      if (this.constructor.inlineEditor === this) {
        this.constructor.inlineEditor = null;
        this.forceUpdate();
      }
      return true;
    };

    Datum.prototype.inlineToEditMode = function () {
      if (!this.isInlineEdit()) {
        return false;
      }
      if (this.constructor.inlineEditor != null) {
        this.constructor.inlineEditor.inlineToDisplayMode();
      }
      this.constructor.inlineEditor = this;
      this.forceUpdate();
      _.defer(function (_this) {
        return function () {
          return _this.focus();
        };
      }(this));
      return true;
    };

    Datum.prototype.onInputKeyDown = function (event) {
      var base;
      return typeof (base = this.props).onKeyDown === "function" ? base.onKeyDown(event) : void 0;
    };

    Datum.prototype.setValue = function (newValue, options) {
      var valid;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        setModelValue: false
      });
      valid = this.validate(newValue);
      if (options.setModelValue) {
        this.setModelValue(newValue, options);
        this.setState({
          isDirty: false
        });
      } else {
        this.setState({
          isDirty: true
        });
      }
      return this.setState({
        value: newValue
      });
    };

    /*
      This method can be used to get at the inner input component if one exists, only
      while inputMode=='edit'
     */

    Datum.prototype.getInputComponent = function () {
      return this.inputComponent;
    };

    Datum.prototype.onInputRef = function (input) {
      return this.inputComponent = input;
    };

    Datum.prototype.focus = function () {
      var node;
      if (this.getInputComponent() != null) {
        node = ReactDOM.findDOMNode(this.getInputComponent());
        node.focus();
        return node.select();
      }
    };

    /*
      This method is called to validate the value in the input.
      
      Note that validations such as props.required also need to apply if the user 
      hasn't changed the input, so the default value is the coalesce of state.value
      or model value.  state.value (see getInputValue()) is null if the user has
      not made changes.
     */

    Datum.prototype.validate = function (value) {
      var errors, i, len, ref, valid, validation;
      if (value == null) {
        value = this.getValueForInput();
      }
      this.setState({
        errors: []
      });
      errors = [];
      ref = this.validations;
      for (i = 0, len = ref.length; i < len; i++) {
        validation = ref[i];
        valid = validation(value);
        if (valid !== true) {
          errors.push(valid);
        }
      }
      this.setState({
        errors: errors
      });
      return errors.length === 0;
    };

    Datum.prototype.validateRequired = function (value) {
      if (!this.props.required) {
        return true;
      }
      if (!(_.isNull(value) || _.isEmpty(value) || _.isUndefined(value))) {
        return true;
      }
      return "This input is required";
    };

    /*
      This method can be used to clear any validation or save errors manually
     */

    Datum.prototype.clearErrors = function () {
      if (_.isArray(this.state.errors) && this.state.errors.length > 0) {
        return this.setState({
          errors: []
        });
      }
    };

    return Datum;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
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
  module.exports = __webpack_require__(23)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(26)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      ContextualData,
      React,
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

  React = __webpack_require__(0);

  Backbone = __webpack_require__(3);

  _ = __webpack_require__(1);

  /*
    This is an abstract base class for contextual data components like ReactDatum.Collection 
    and ReactDatum.Model that provide a single contextual data element.
    
    The ReactDatum.ContextualData base class also provides the listener to model or collection
    events and rendering of child components on changes.
    
    You shouldn't need to use this class directly.
   */

  module.exports = ContextualData = function (superClass) {
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
      fetch: React.PropTypes.bool,
      fetchOptions: React.PropTypes.object,
      placeholder: React.PropTypes.node,
      className: React.PropTypes.string,
      debouncedUpdate: React.PropTypes.bool,
      debounceMs: React.PropTypes.number,
      debug: React.PropTypes.bool,
      style: React.PropTypes.object
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

    ContextualData.prototype.getChildContext = function () {
      var c;
      c = {};
      c[this.contextKey] = this.state.collectionOrModel;
      return c;
    };

    ContextualData.prototype.render = function () {
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

    ContextualData.prototype.renderContent = function () {
      if (this.state.collectionOrModel != null || this.props.placeholder === void 0) {
        return this.props.children;
      }
      return this.props.placeholder;
    };

    /* !pragma coverage-skip-next */

    ContextualData.prototype.componentWillUnmount = function () {
      return this.unbindEvents();
    };

    ContextualData.prototype.componentWillMount = function () {
      return this.initializeCollectionOrModel();
    };

    /* !pragma coverage-skip-next */

    ContextualData.prototype.componentWillReceiveProps = function (newProps) {
      this.props = newProps;
      return this.initializeCollectionOrModel();
    };

    /*
      override this model to do a custom fetch method like fetchForUser or some such
     */

    ContextualData.prototype.fetchCollectionOrModel = function () {
      return this.state.collectionOrModel.fetch(this.props.fetchOptions);
    };

    /*
      extend this method to provide additional initialization on the 
      thing you provide.  You should probably call super
     */

    ContextualData.prototype.initializeCollectionOrModel = function () {
      if (!this.needsReinitializing()) {
        return;
      }
      this.unbindEvents();
      this.setCollectionOrModel();
      this.bindEvents();
      if (this.props.fetch && this.state.collectionOrModel != null) {
        return this.fetchCollectionOrModel();
      }
    };

    /*
      override this method to input from somewhere other than the context or props being passed in
     */

    ContextualData.prototype.getInputCollectionOrModel = function () {
      return this.props[this.contextKey] || this.context[this.contextKey];
    };

    /*
      override or extend this method to provide something other than what we recieve
     */

    ContextualData.prototype.getCollectionOrModelToProvide = function () {
      return this.getInputCollectionOrModel();
    };

    /*
      extend this method to provide additional tests to determine if initialization is 
      needed.  You should probably extend this method like so:
      ```
        return super() || this._someOtherTest()
      ```
     */

    ContextualData.prototype.needsReinitializing = function () {
      var collectionOrModel, truth;
      collectionOrModel = this.getCollectionOrModelToProvide();
      truth = this.state.collectionOrModel == null || collectionOrModel !== this._lastPropsModel;
      this._lastPropsModel = collectionOrModel;
      return truth;
    };

    ContextualData.prototype.setCollectionOrModel = function () {
      var collectionOrModel;
      collectionOrModel = this.getCollectionOrModelToProvide();
      this.setState({
        collectionOrModel: collectionOrModel
      });
      return this.state.collectionOrModel = collectionOrModel;
    };

    ContextualData.prototype.bindEvents = function () {
      var ref;
      return (ref = this.state.collectionOrModel) != null ? typeof ref.on === "function" ? ref.on('all', this.onDataChanged, this) : void 0 : void 0;
    };

    ContextualData.prototype.unbindEvents = function () {
      var ref;
      return (ref = this.state.collectionOrModel) != null ? typeof ref.off === "function" ? ref.off('all', this.onDataChanged) : void 0 : void 0;
    };

    ContextualData.prototype.onDataChanged = function () {
      return this.debouncedUpdate();
    };

    ContextualData.prototype.update = function () {
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
  }(React.Component);
}).call(undefined);

/***/ }),
/* 8 */
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
/* 9 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Options, _, __options;

  _ = __webpack_require__(1);

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

  module.exports = Options = function () {
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

    Options.set = function (option, value) {
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
        if (this._options[key] != null && _.isObject(this._options[key]) && _.isObject(value)) {
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

    Options.get = function (option) {
      if (option == null) {
        option = null;
      }
      if (option == null) {
        return _.extend({}, this._options);
      }
      return this._options[option];
    };

    return Options;
  }();
}).call(undefined);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Datum,
      Number,
      ONE_BILLION,
      ONE_MILLION,
      ONE_THOUSAND,
      RECOGNIZED_FORMATS,
      React,
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
      hasProp = {}.hasOwnProperty,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  React = __webpack_require__(0);

  _ = __webpack_require__(1);

  Datum = __webpack_require__(2);

  ONE_BILLION = 1000000000;

  ONE_MILLION = 1000000;

  ONE_THOUSAND = 1000;

  RECOGNIZED_FORMATS = ['abbreviate', 'money', 'comma', 'percent'];

  /*
    For real numbers.
  
    Only allows `/^\-?[0-9]*\.?[0-9]*$/` on input
   */

  module.exports = Number = function (superClass) {
    extend(Number, superClass);

    Number.displayName = "react-datum.Number";

    Number.propTypes = _.extend({}, Datum.propTypes, {
      format: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.string]),
      decimalPlaces: React.PropTypes.number,
      zeroFill: React.PropTypes.bool,
      minValue: React.PropTypes.number,
      maxValue: React.PropTypes.number
    });

    Number.defaultProps = _.extend({}, Datum.defaultProps, {
      decimalPlaces: null,
      zeroFill: null,
      format: ['comma']
    });

    Number.prototype.charactersMustMatch = /^\-?[0-9]*\.?[0-9]*$/;

    Number.getComaAddedValue = function (value) {
      var decimal, ref, wholeNumber;
      ref = value.toString().split('.'), wholeNumber = ref[0], decimal = ref[1];
      value = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (decimal != null) {
        value += '.' + decimal;
      }
      return value;
    };

    /*
      fail proof conversion from sting to float that will never return NaN
     */

    Number.safelyFloat = function (value) {
      var error, floatValue;
      if (value == null) {
        return 0;
      }
      try {
        floatValue = parseFloat(value);
      } catch (error) {
        console.error("unparseable float " + value);
        return 0;
      }
      if (_.isNaN(floatValue)) {
        return 0;
      } else {
        return floatValue;
      }
    };

    function Number(props) {
      this.validateMax = bind(this.validateMax, this);
      this.validateMin = bind(this.validateMin, this);
      this.validateNumeric = bind(this.validateNumeric, this);
      this.onChange = bind(this.onChange, this);
      Number.__super__.constructor.apply(this, arguments);
      this.addValidations([this.validateNumeric, this.validateMin, this.validateMax]);
    }

    Number.prototype.isAcceptableInput = function (value) {
      return value.match(this.charactersMustMatch);
    };

    /*
      overrides super - adds formatting
     */

    Number.prototype.renderValueForDisplay = function () {
      var formats, modelValue, value;
      modelValue = this.getModelValue();
      value = parseFloat(modelValue);
      if (_.isNaN(value)) {
        return modelValue;
      }
      formats = this.getFormats();
      if (indexOf.call(formats, 'percent') >= 0) {
        value *= 100;
      }
      value = this.roundToDecimalPlaces(value, {
        formats: formats
      });
      value = this.abbreviate(value, formats);
      value = this.addCommas(value, formats);
      value = this.monetize(value, formats);
      if (indexOf.call(formats, 'percent') >= 0) {
        value += "%";
      }
      return value;
    };

    Number.prototype.renderPlaceHolder = function () {
      if (this.getPropOrMetadata('placeholder') != null) {
        Number.__super__.renderPlaceHolder.apply(this, arguments);
      }
      return React.createElement("span", null, "0");
    };

    Number.prototype.getValueForInput = function () {
      var floatVal, value;
      value = Number.__super__.getValueForInput.apply(this, arguments);
      if (value != null && _.isString(value)) {
        value = value.replace(/[\s\$\,]/g, '');
      }
      if (value === '-' || value === '+') {
        return value;
      }
      floatVal = parseFloat(value);
      if (_.isNaN(floatVal)) {
        return '';
      } else {
        return value;
      }
    };

    Number.prototype.getFormats = function () {
      var ref;
      if (_.isArray(this.props.format)) {
        return this.props.format;
      } else {
        return ((ref = this.props.format) != null ? ref.toString().split(' ') : void 0) || [];
      }
    };

    Number.prototype.onChange = function (event) {
      var inputValue;
      inputValue = event.target.value;
      if (this.isAcceptableInput(inputValue)) {
        return Number.__super__.onChange.apply(this, arguments);
      }
    };

    Number.prototype.validateNumeric = function (value) {
      if (_.isNumber(value)) {
        return true;
      }
      if (this.charactersMustMatch.test(value)) {
        return true;
      }
      if (value.length > 25) {
        value = value.slice(0, 25) + '...';
      }
      return "The value must be numeric. \"" + value + "\" is not valid";
    };

    Number.prototype.validateMin = function (value) {
      var minValue;
      minValue = this.getPropOrMetadata('minValue');
      if (!(value != null && minValue != null)) {
        return true;
      }
      if (parseFloat(value) >= parseFloat(minValue)) {
        return true;
      }
      return "The value must be greater than or equal to " + minValue;
    };

    Number.prototype.validateMax = function (value) {
      var maxValue;
      maxValue = this.getPropOrMetadata('maxValue');
      if (!(value != null && maxValue != null)) {
        return true;
      }
      if (parseFloat(value) <= parseFloat(maxValue)) {
        return true;
      }
      return "The value must be less than or equal to " + maxValue;
    };

    /*  
      returns a string with number value input rounded to user requested props.decimalPlaces 
        and optionally zeroFilled if @props.zeroFill == true
      note that 'money', when not 'abbreviate'd should zero fill out to two decimal places 
      unless props indicate otherwise
     */

    Number.prototype.roundToDecimalPlaces = function (value, options) {
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        formats: this.getFormats(),
        decimalPlaces: this.props.decimalPlaces,
        zeroFill: this.props.zeroFill
      });
      if (indexOf.call(options.formats, 'money') >= 0) {
        if (options.decimalPlaces == null) {
          options.decimalPlaces = 2;
        }
        if (options.zeroFill == null) {
          options.zeroFill = !(indexOf.call(options.formats, 'abbreviate') >= 0);
        }
      }
      if (options.decimalPlaces != null) {
        value = parseFloat(value).toFixed(options.decimalPlaces);
        if (!options.zeroFill) {
          value = parseFloat(value).toString();
        }
      }
      return value;
    };

    /*  
      returns a string with number value abbreviated and rounded to user 
      requested props.decimalPlaces
     */

    Number.prototype.abbreviate = function (value, formats) {
      var absValue, affix, ref;
      if (formats == null) {
        formats = this.getFormats();
      }
      if (indexOf.call(formats, 'abbreviate') >= 0) {
        value = parseFloat(value);
        absValue = Math.abs(value);
        ref = absValue >= ONE_BILLION ? [value / ONE_BILLION, "B"] : absValue >= ONE_MILLION ? [value / ONE_MILLION, "M"] : absValue >= ONE_THOUSAND ? [value / ONE_THOUSAND, "K"] : [value, ""], value = ref[0], affix = ref[1];
        value = "" + this.roundToDecimalPlaces(value, {
          formats: formats
        });
        if ((affix != null ? affix.length : void 0) > 0) {
          value += " " + affix;
        }
      }
      return value;
    };

    Number.prototype.addCommas = function (value, formats) {
      if (formats == null) {
        formats = this.getFormats();
      }
      if (indexOf.call(formats, 'comma') >= 0) {
        value = Number.getComaAddedValue(value);
      }
      return value;
    };

    /*
      If props.formats includes 'money', this method prepends the value
      displayed with '$'
      
      Override this method to do things like create an internationalized
      display of money value for another currency.
     */

    Number.prototype.monetize = function (value, formats) {
      if (formats == null) {
        formats = this.getFormats();
      }
      if (indexOf.call(formats, 'money') >= 0) {
        value = "$" + value;
      }
      return value;
    };

    Number.prototype.getInputValue = function () {
      return parseFloat(this.state.value);
    };

    return Number;
  }(Datum);
}).call(undefined);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(8);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      Datum,
      Form,
      React,
      ReactDom,
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
      hasProp = {}.hasOwnProperty,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  React = __webpack_require__(0);

  ReactDom = __webpack_require__(11);

  Datum = __webpack_require__(2);

  Backbone = __webpack_require__(3);

  _ = __webpack_require__(1);

  module.exports = Form = function (superClass) {
    extend(Form, superClass);

    Form.displayName = "react-datum.Form";

    Form.modelOrObject = function () {
      return React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]);
    };

    Form.propTypes = {
      model: Form.modelOrObject(),
      modelSaveMethod: React.PropTypes.string,
      readonly: React.PropTypes.bool,
      buttonPosition: React.PropTypes.oneOf(['top', 'bottom', 'none']),
      className: React.PropTypes.string,
      saveSuccessCallback: React.PropTypes.func,
      saveErrorCallback: React.PropTypes.func
    };

    Form.defaultProps = {
      readonly: false,
      buttonPosition: 'bottom',
      className: 'form',
      modelSaveMethod: 'save'
    };

    Form.contextTypes = {

      /* can also accept model instance as a prop.  prop has precendence */
      model: Form.modelOrObject()
    };

    Form.childContextTypes = {
      model: Form.modelOrObject(),
      inputMode: Datum.contextTypes.inputMode,
      form: React.PropTypes.object
    };

    Form.prototype.datumInputMode = 'edit';

    function Form(props) {
      this.onCancelClick = bind(this.onCancelClick, this);
      this.onSaveError = bind(this.onSaveError, this);
      this.onSaveSuccess = bind(this.onSaveSuccess, this);
      this.onSaveClick = bind(this.onSaveClick, this);
      this.datums = [];
      this.state = {
        errorMessage: null,
        successMessage: null
      };
      Form.__super__.constructor.apply(this, arguments);
    }

    Form.prototype.getChildContext = function () {
      return {
        model: this.getModel(),
        inputMode: this.getDatumInputMode(),
        form: this
      };
    };

    Form.prototype.render = function () {
      if (this.getModel() == null) {
        return null;
      }
      this._saveModelStateAtRender();
      return React.createElement("div", {
        "className": "form " + this.datumInputMode + " " + this.props.className
      }, this.renderTopButtons(), this.renderChildren(), this.renderBottomButtons(), this.renderMessages());
    };

    Form.prototype.componentDidMount = function () {
      return this.node = ReactDom.findDOMNode(this);
    };

    /*
      Gives the first editable datum focus
     */

    Form.prototype.focus = function () {
      var firstEditable;
      firstEditable = _.find(this.datums, function (d) {
        return d.isEditable();
      });
      return firstEditable != null ? firstEditable.focus() : void 0;
    };

    Form.prototype.renderChildren = function () {
      return React.createElement("div", {
        "className": "form-content"
      }, this.props.children);
    };

    Form.prototype.renderTopButtons = function () {
      if (this.props.buttonPosition !== 'top') {
        return;
      }
      return this.renderButtonContainer({
        addClass: "top"
      });
    };

    Form.prototype.renderBottomButtons = function () {
      if (this.props.buttonPosition !== 'bottom') {
        return;
      }
      return this.renderButtonContainer({
        addClass: "bottom"
      });
    };

    Form.prototype.renderButtonContainer = function (options) {
      var className;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        addClass: null
      });
      className = "form-buttons";
      if (options.addClass != null) {
        className += " " + options.addClass;
      }
      return React.createElement("div", {
        "className": className
      }, this.renderButtons(options));
    };

    Form.prototype.renderButtons = function (options) {
      return [React.createElement("button", {
        "key": "save",
        "ref": "saveButton",
        "className": 'btn btn-success',
        "onClick": this.onSaveClick
      }, "Save"), React.createElement("button", {
        "key": "cancel",
        "ref": "cancelButton",
        "className": 'btn',
        "onClick": this.onCancelClick
      }, "Cancel")];
    };

    Form.prototype.renderMessages = function () {
      return [this.renderSuccessMessage(), this.renderErrorMessage()];
    };

    Form.prototype.renderErrorMessage = function () {
      return this.renderMessage(this.state.errorMessage, 'error');
    };

    Form.prototype.renderSuccessMessage = function () {
      return this.renderMessage(this.state.successMessage, 'success');
    };

    Form.prototype.renderMessage = function (message, className) {
      var fullClassName;
      if (message == null) {
        return null;
      }
      fullClassName = "datum-form-message-" + className + " " + className;
      return React.createElement("div", {
        "key": className,
        "className": fullClassName
      }, message);
    };

    /*
      Save the changes from datums on the form to the Backbone model. 
      
      Calls model.save after first attempting to validate() the model.  Handles 
      inconsistencies in model.validate() between versions 0.9.2 - 1.2.2 of Backbone.
      
      The user clicking on the save button belonging to the Form will call this Method
      
      The options argument is passed on to Backbone model.save()
     */

    Form.prototype.save = function (options) {
      var model;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        validateDatums: true,
        validateModel: true
      });
      this.setState({
        errorMessage: null,
        successMessage: null
      });
      model = this.getModel();
      if (options.validateDatums && !this.validateDatums(options)) {
        this.onSaveError(model, "Correct errors and try again.");
        return;
      }
      if (options.validateModel && !this.validateModel(options)) {
        this.onSaveError(model, model.validationError);
        return;
      }
      return this.saveModel(options);
    };

    /*
      Validate the datums on the form. 
      
      returns false if any are currently invalid
     */

    Form.prototype.validateDatums = function (options) {
      if (options == null) {
        options = {};
      }
      if (this.getInvalidDatums().length > 0) {
        this.setState({
          errorMessage: "Please correct errors and try again."
        });
        return false;
      }
      return true;
    };

    /*
      Calls Backbone model.validate and handles inconsistencies in model.validate() 
      between versions 0.9.2 - 1.2.2 of Backbone.
     */

    Form.prototype.validateModel = function (options) {
      var error, model;
      if (options == null) {
        options = {};
      }
      model = this.getModel();
      if (model == null) {
        return;
      }
      try {
        if (!model.isValid()) {
          if (model.validationError != null) {
            return false;
          }
        }
      } catch (error) {
        null;
      }
      return true;
    };

    Form.prototype.preceedOriginalCallback = function (obj, attr, newCallback) {
      var originalCallback;
      originalCallback = obj[attr];
      return obj[attr] = function () {
        newCallback.apply(this, arguments);
        return originalCallback != null ? originalCallback.apply(this, argumentsk) : void 0;
      };
    };

    /*  
      calls Backbone model.save and calls success and error handlers. 
      
      You should probably call Form.save() above instead.  It will also validate the model 
      and datums.
     */

    Form.prototype.saveModel = function (options) {
      var model, saved;
      if (options == null) {
        options = {};
      }
      model = this.getModel();
      if (model == null) {
        return;
      }
      this.preceedOriginalCallback(options, 'success', this.onSaveSuccess);
      this.preceedOriginalCallback(options, 'error', this.onSaveError);
      return saved = model[this.props.modelSaveMethod]({}, options);
    };

    Form.prototype.onSaveClick = function (evt) {
      return this.save();
    };

    Form.prototype.onSaveSuccess = function (model, response, options) {
      if (options == null) {
        options = {};
      }
      this._saveModelState();
      if (this.props.saveSuccessCallback != null && _.isFunction(this.props.saveSuccessCallback)) {
        return this.props.saveSuccessCallback(model, response, options);
      } else {
        return this.setState({
          successMessage: "Successfully saved!",
          successAt: Date.now()
        });
      }
    };

    Form.prototype.onSaveError = function (model, response, options) {
      if (options == null) {
        options = {};
      }
      if (this.props.saveErrorCallback != null && _.isFunction(this.props.saveErrorCallback)) {
        return this.props.saveErrorCallback(model, response, options);
      } else {
        response = response == null || _.isString(response) ? response : JSON.stringify(response);
        return this.setState({
          errorMessage: "Unable to save. " + response || "Reason unknown."
        });
      }
    };

    Form.prototype.onCancelClick = function (evt) {
      this.setState({
        errorMessage: null,
        successMessage: null
      });
      this._restoreModelState();
      return this._resetDatums();
    };

    Form.prototype.getModel = function () {
      return this.props.model || this.context.model;
    };

    Form.prototype.getDatumInputMode = function () {
      if (this.props.readonly) {
        return 'readonly';
      } else {
        return this.datumInputMode;
      }
    };

    Form.prototype.getInvalidDatums = function () {
      return _.filter(this.datums, function (d) {
        return !d.validate();
      });
    };

    /*
      This method is called by the datum children when they mount
     */

    Form.prototype.addDatum = function (datumComponent) {
      if (indexOf.call(this.datums, datumComponent) < 0) {
        return this.datums.push(datumComponent);
      }
    };

    /*
      This method is called by the datum children when they unmount
     */

    Form.prototype.removeDatum = function (datumComponent) {
      var index;
      index = this.datums.indexOf(datumComponent);
      if (index < 0) {
        console.error("form.removeDatum called for datumComponent (" + datumComponent.constructor.displayName + ") that we don't know about?");
        return;
      }
      return this.datums = this.datums.slice(0, index).concat(this.datums.slice(index + 1, this.datums.length));
    };

    Form.prototype._saveModelStateAtRender = function () {
      var model;
      model = this.getModel();
      if (model === this._savedModel) {
        return;
      }
      return this._saveModelState();
    };

    Form.prototype._saveModelState = function () {
      this._savedModel = this.getModel();
      return this._savedAttrs = this._savedModel.toJSON();
    };

    Form.prototype._restoreModelState = function () {
      var model;
      model = this.getModel();
      if (model !== this._savedModel) {
        return;
      }
      return model.set(this._savedAttrs);
    };

    Form.prototype._resetDatums = function () {
      var datum, i, len, ref, results;
      ref = this.datums;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        datum = ref[i];
        results.push(datum.cancelEdit());
      }
      return results;
    };

    return Form;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Datum,
      React,
      Text,
      _,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  _ = __webpack_require__(1);

  Datum = __webpack_require__(2);

  /*
    see ./text.md
   */

  module.exports = Text = function (superClass) {
    extend(Text, superClass);

    Text.displayName = "react-datum.Text";

    Text.propTypes = _.extend({}, Datum.propTypes, {
      displayAsHtml: React.PropTypes.bool,
      ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
      reverseEllipsis: React.PropTypes.bool,
      uniqueArrayMembers: React.PropTypes.bool
    });

    Text.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      reverseEllipsis: false
    });

    function Text() {
      Text.__super__.constructor.apply(this, arguments);
    }

    Text.prototype.render = function () {
      return Text.__super__.render.apply(this, arguments);
    };

    Text.prototype.renderValueForDisplay = function () {
      var superValue, value, values;
      superValue = Text.__super__.renderValueForDisplay.apply(this, arguments);
      value = function () {
        switch (false) {
          case !_.isArray(superValue):
            values = _.compact(_.flatten(superValue));
            if (this.props.uniqueArrayMembers) {
              values = _.unique(values);
            }
            return values.join(', ');
          case !_.isObject(superValue):
            return JSON.stringify(superValue);
          default:
            return superValue.toString();
        }
      }.call(this);
      return this.renderEllipsizedValue(value);
    };

    /* 
      Extends Datum#renderWrappedDisplayValue to provide support for displayAsHtml
      option.
     */

    Text.prototype.renderWrappedDisplayValue = function (value) {
      if (this.props.displayAsHtml) {
        return React.createElement("span", {
          "className": "datum-display-value",
          "dangerouslySetInnerHTML": this.getMarkup(value)
        });
      } else {
        return Text.__super__.renderWrappedDisplayValue.apply(this, arguments);
      }
    };

    Text.prototype.getMarkup = function (value) {
      return {
        __html: value
      };
    };

    return Text;
  }(Datum);
}).call(undefined);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncCreatable", function() { return AsyncCreatableSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Creatable", function() { return CreatableSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Value", function() { return Value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Option", function() { return Option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMenuRenderer", function() { return menuRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultArrowRenderer", function() { return arrowRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultClearRenderer", function() { return clearRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultFilterOptions", function() { return filterOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_input_autosize__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_input_autosize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_input_autosize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);






var arrowRenderer = function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

var clearRenderer = function clearRenderer() {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

var trim = function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var isValid = function isValid(value) {
	return typeof value !== 'undefined' && value !== null && value !== '';
};

var filterOptions = function filterOptions(options, filterValue, excludeOptions, props) {
	if (props.ignoreAccents) {
		filterValue = stripDiacritics(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (props.trimFilter) {
		filterValue = trim(filterValue);
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;

		var value = option[props.valueKey];
		var label = option[props.labelKey];
		var hasValue = isValid(value);
		var hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		var valueTest = hasValue ? String(value) : null;
		var labelTest = hasLabel ? String(label) : null;

		if (props.ignoreAccents) {
			if (valueTest && props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (labelTest && props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}

		if (props.ignoreCase) {
			if (valueTest && props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (labelTest && props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}

		return props.matchPos === 'start' ? valueTest && props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || labelTest && props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : valueTest && props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || labelTest && props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
};

var menuRenderer = function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    focusOption = _ref.focusOption,
	    inputValue = _ref.inputValue,
	    instancePrefix = _ref.instancePrefix,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    removeValue = _ref.removeValue,
	    selectValue = _ref.selectValue,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.some(function (x) {
			return x[valueKey] === option[valueKey];
		});
		var isFocused = option === focusedOption;
		var optionClass = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
			Option,
			{
				className: optionClass,
				focusOption: focusOption,
				inputValue: inputValue,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				},
				removeValue: removeValue,
				selectValue: selectValue
			},
			optionRenderer(option, i, inputValue)
		);
	});
};

menuRenderer.propTypes = {
	focusOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	focusedOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
	inputValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	instancePrefix: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	onOptionRef: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	optionClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	optionComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	optionRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
	removeValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	selectValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	valueArray: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
	valueKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
};

var blockEvent = (function (event) {
	event.preventDefault();
	event.stopPropagation();
	if (event.target.tagName !== 'A' || !('href' in event.target)) {
		return;
	}
	if (event.target.target) {
		window.open(event.target.href, event.target.target);
	} else {
		window.location.href = event.target.href;
	}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Option = function (_React$Component) {
	inherits(Option, _React$Component);

	function Option(props) {
		classCallCheck(this, Option);

		var _this = possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	createClass(Option, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(this.props.className, option.className);

			return option.disabled ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className,
					onMouseDown: blockEvent,
					onClick: blockEvent },
				this.props.children
			) : __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					'aria-label': option.label,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);
	return Option;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Option.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node,
	className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // className (based on mouse position)
	instancePrefix: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is disabled
	isFocused: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is focused
	isSelected: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is selected
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle mouseEnter on option element
	onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle click on option element
	onUnfocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle mouseLeave on option element
	option: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired, // object that is base for that option
	optionIndex: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number // index of the option, used to generate unique ids for aria
};

var Value = function (_React$Component) {
	inherits(Value, _React$Component);

	function Value(props) {
		classCallCheck(this, Value);

		var _this = possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.onRemove = _this.onRemove.bind(_this);
		_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		return _this;
	}

	createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'\xD7'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);
	return Value;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Value.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node,
	disabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // disabled prop passed to ReactSelect
	id: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // Unique id for the value - used for aria
	onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle click on value label
	onRemove: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle removal of the value
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired // the option object for this value
};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
var stringifyValue = function stringifyValue(value) {
	return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
};

var stringOrNode = __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]);
var stringOrNumber = __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number]);

var instanceId = 1;

var shouldShowValue = function shouldShowValue(state, props) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	if (!inputValue) return true;

	if (!onSelectResetsInput) {
		return !(!isFocused && isPseudoFocused || isFocused && !isPseudoFocused);
	}

	return false;
};

var shouldShowPlaceholder = function shouldShowPlaceholder(state, props, isOpen) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	return !inputValue || !onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused;
};

/**
 * Retrieve a value from the given options and valueKey
 * @param {String|Number|Array} value	- the selected value(s)
 * @param {Object}		 props	- the Select component's props (or nextProps)
 */
var expandValue = function expandValue(value, props) {
	var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
	var options = props.options,
	    valueKey = props.valueKey;

	if (!options) return;
	for (var i = 0; i < options.length; i++) {
		if (String(options[i][valueKey]) === String(value)) return options[i];
	}
	if (props.allowCreate) {
		var newOption = {};
		newOption[valueKey] = value;
		newOption[labelKey] = value;
		return newOption;
	}
};

var handleRequired = function handleRequired(value, multi) {
	if (!value) return true;
	return multi ? value.length === 0 : Object.keys(value).length === 0;
};

var Select$1 = function (_React$Component) {
	inherits(Select, _React$Component);

	function Select(props) {
		classCallCheck(this, Select);

		var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		['clearValue', 'focusOption', 'getOptionLabel', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleTouchMove', 'handleTouchOutside', 'handleTouchStart', 'handleValueClick', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
		return _this;
	}

	createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
				console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
			}
			if (this.props.autoFocus || this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: handleRequired(valueArray[0], nextProps.multi)
				});
			} else if (this.props.required) {
				// Used to be required but it's not any more
				this.setState({ required: false });
			}

			if (this.state.inputValue && this.props.value !== nextProps.value && nextProps.onSelectResetsInput) {
				this.setState({ inputValue: this.handleInputValueChange('') });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.focused);
				var menuNode = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.menu);

				var scrollTop = menuNode.scrollTop;
				var scrollBottom = scrollTop + menuNode.offsetHeight;
				var optionTop = focusedOptionNode.offsetTop;
				var optionBottom = optionTop + focusedOptionNode.offsetHeight;

				if (scrollTop > optionTop || scrollBottom < optionBottom) {
					menuNode.scrollTop = focusedOptionNode.offsetTop;
				}

				// We still set hasScrolledToOption to true even if we didn't
				// actually need to scroll, as we've still confirmed that the
				// option is in view.
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.focused);
				var menuDOM = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				} else if (focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
			if (prevState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(this.state.isOpen);
				var handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.toggleTouchOutsideEvent(false);
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.addEventListener('touchstart', this.handleTouchOutside);
				}
			} else {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.removeEventListener('touchstart', this.handleTouchOutside);
				}
			}
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				if (!this.state.isFocused) {
					this._openAfterFocus = this.props.openOnClick;
					this.focus();
				} else if (!this.state.isOpen) {
					this.setState({
						isOpen: true,
						isPseudoFocused: false
					});
				}

				return;
			}

			// prevent default event handlers
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				// This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				var toOpen = true;

				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				if (this._focusAfterClear) {
					toOpen = false;
					this._focusAfterClear = false;
				}

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: toOpen,
					isPseudoFocused: false,
					focusedOption: null
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
				this.setState({ focusedOption: null });
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (this.state.isOpen) {
				// prevent default event handlers
				event.stopPropagation();
				event.preventDefault();
				// close the menu
				this.closeMenu();
			} else {
				// If the menu isn't open, let the event bubble to the main handleMouseDown
				this.setState({
					isOpen: true
				});
			}
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					inputValue: this.handleInputValueChange(''),
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;

			var toOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			toOpen = this._focusAfterClear ? false : toOpen; //if focus happens after clear values, don't open dropdown yet.

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}

			this.setState({
				isFocused: true,
				isOpen: !!toOpen
			});

			this._focusAfterClear = false;
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = this.handleInputValueChange('');
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value) {
				newInputValue = this.handleInputValueChange(newInputValue);
			}

			this.setState({
				inputValue: newInputValue,
				isOpen: true,
				isPseudoFocused: false
			});
		}
	}, {
		key: 'setInputValue',
		value: function setInputValue(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			this.setState({
				inputValue: newValue
			});
		}
	}, {
		key: 'handleInputValueChange',
		value: function handleInputValueChange(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			return newValue;
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						break;
					}
					event.preventDefault();
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					event.preventDefault();
					event.stopPropagation();
					if (this.state.isOpen) {
						this.selectFocusedOption();
					} else {
						this.focusNextOption();
					}
					break;
				case 27:
					// escape
					event.preventDefault();
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 32:
					// space
					if (this.props.searchable) {
						break;
					}
					event.preventDefault();
					if (!this.state.isOpen) {
						this.focusNextOption();
						break;
					}
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 38:
					// up
					event.preventDefault();
					this.focusPreviousOption();
					break;
				case 40:
					// down
					event.preventDefault();
					this.focusNextOption();
					break;
				case 33:
					// page up
					event.preventDefault();
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					event.preventDefault();
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusStartOption();
					break;
				case 188:
					// comma , key
					if (this.props.allowCreate && this.props.multi) {
						event.preventDefault();
						event.stopPropagation();
						this.selectFocusedOption();
					} else {
						return;
					}
					break;
				case 46:
					// delete
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
			}
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param {String|Number|Array} value		- the value of the select input
   * @param {Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value) {
			var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') {
					value = value.split(props.delimiter);
				}
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (this.props.required) {
				var required = handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this3 = this;

			// NOTE: we actually add/set the value in a callback to make sure the
			// input value is empty to avoid styling issues in Chrome
			if (this.props.closeOnSelect) {
				this.hasScrolledToOption = false;
			}
			var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
			if (this.props.multi) {
				if (this.props.allowCreate) {
					value = this.expandValue(value, this.props);
				}
				this.setState({
					focusedIndex: null,
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect
				}, function () {
					var valueArray = _this3.getValueArray(_this3.props.value);
					if (valueArray.some(function (i) {
						return i[_this3.props.valueKey] === value[_this3.props.valueKey];
					})) {
						_this3.removeValue(value);
					} else {
						_this3.addValue(value);
					}
				});
			} else {
				this.setState({
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect,
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var _this4 = this;

			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i[_this4.props.valueKey] !== value[_this4.props.valueKey];
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.preventDefault();

			this.setValue(this.getResetValue());
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: false
			}, this.focus);

			this._focusAfterClear = true;
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				var newState = {
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null),
					isOpen: true
				};
				if (this.props.onSelectResetsInput) {
					newState.inputValue = '';
				}
				this.setState(newState);
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var _potentialIndex = focusedIndex + this.props.pageSize;
				if (_potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = _potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			} else if (this.props.allowCreate && !this.state.focusedOption) {
				return this.selectValue(this.state.inputValue);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				var showPlaceholder = shouldShowPlaceholder(this.state, this.props, isOpen);
				return showPlaceholder ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				if (this.props.singleValue) {
					return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						ValueComponent,
						{
							disabled: this.props.disabled,
							onClick: onClick,
							onRemove: this.removeValue,
							values: valueArray,
							disabledOptions: this.props.disabledOptions || []
						},
						valueArray.length
					);
				} else {
					return valueArray.map(function (value, i) {
						return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
							ValueComponent,
							{
								id: _this5._instancePrefix + '-value-' + i,
								instancePrefix: _this5._instancePrefix,
								disabled: _this5.props.disabled || value.clearableValue === false,
								key: 'value-' + i + '-' + value[_this5.props.valueKey],
								onClick: onClick,
								onRemove: _this5.removeValue,
								value: value,
								values: valueArray,
								disabledOptions: _this5.props.disabledOptions || []
							},
							renderLabel(value, i),
							__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
								'span',
								{ className: 'Select-aria-only' },
								'\xA0'
							)
						);
					});
				}
			} else if (shouldShowValue(this.state, this.props)) {
				if (isOpen) onClick = null;
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					ValueComponent,
					defineProperty({
						disabled: this.props.disabled,
						disabledOptions: this.props.disabledOptions || [],
						id: this._instancePrefix + '-value-item',
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						placeholder: this.props.placeholder,
						value: valueArray[0],
						values: valueArray
					}, 'disabledOptions', this.props.disabledOptions || []),
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select-input', this.props.inputProps.className);
			var isOpen = this.state.isOpen;

			var ariaOwns = __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classNames = {}, defineProperty(_classNames, this._instancePrefix + '-list', isOpen), defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			var value = this.state.inputValue;
			if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
				// it hides input value when it is not focused and was not reset on select
				value = '';
			}

			var inputProps = _extends({}, this.props.inputProps, {
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-expanded': '' + isOpen,
				'aria-haspopup': '' + isOpen,
				'aria-label': this.props['aria-label'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-owns': ariaOwns,
				className: className,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this6.input = _ref;
				},
				role: 'combobox',
				required: this.state.required,
				tabIndex: this.props.tabIndex,
				value: value
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var divProps = objectWithoutProperties(this.props.inputProps, []);


				var _ariaOwns = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(defineProperty({}, this._instancePrefix + '-list', isOpen));
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div', _extends({}, divProps, {
					'aria-expanded': isOpen,
					'aria-owns': _ariaOwns,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-disabled': '' + this.props.disabled,
					'aria-label': this.props['aria-label'],
					'aria-labelledby': this.props['aria-labelledby'],
					className: className,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref2) {
						return _this6.input = _ref2;
					},
					role: 'combobox',
					style: { border: 0, width: 1, display: 'inline-block' },
					tabIndex: this.props.tabIndex || 0
				}));
			}

			if (this.props.autosize) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react_input_autosize___default.a, _extends({ id: this.props.id }, inputProps, { minWidth: '5' }));
			}
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className, key: 'input-wrap', style: { display: 'inline-block' } },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', _extends({ id: this.props.id }, inputProps))
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			var valueArray = this.getValueArray(this.props.value);
			if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) return;
			var ariaLabel = this.props.multi ? this.props.clearAllText : this.props.clearValueText;
			var clear = this.props.clearRenderer();

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{
					'aria-label': ariaLabel,
					className: 'Select-clear-zone',
					onMouseDown: this.clearValue,
					onTouchEnd: this.handleTouchEndClearValue,
					onTouchMove: this.handleTouchMove,
					onTouchStart: this.handleTouchStart,
					title: ariaLabel
				},
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			if (!this.props.arrowRenderer) return;

			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			if (!arrow) {
				return null;
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions$$1 = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : filterOptions;

				return filterOptions$$1(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					trimFilter: this.props.trimFilter,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					inputValue: this.state.inputValue,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onOptionRef: this.onOptionRef,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					removeValue: this.removeValue,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey
				});
			} else if (this.props.noResultsText) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', {
					disabled: this.props.disabled,
					name: this.props.name,
					ref: function ref(_ref3) {
						return _this7.value = _ref3;
					},
					type: 'hidden',
					value: value
				});
			}
			return valueArray.map(function (item, index) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', {
					disabled: _this7.props.disabled,
					key: 'hidden.' + index,
					name: _this7.props.name,
					ref: 'value' + index,
					type: 'hidden',
					value: stringifyValue(item[_this7.props.valueKey])
				});
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ ref: function ref(_ref5) {
						return _this8.menuContainer = _ref5;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{
						className: 'Select-menu',
						id: this._instancePrefix + '-list',
						onMouseDown: this.handleMouseDownOnMenu,
						onScroll: this.handleMenuScroll,
						ref: function ref(_ref4) {
							return _this8.menu = _ref4;
						},
						role: 'listbox',
						style: this.props.menuStyle,
						tabIndex: -1
					},
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select', this.props.className, {
				'has-value': valueArray.length,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'Select--multi': this.props.multi,
				'Select--rtl': this.props.rtl,
				'Select--single': !this.props.multi
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: 'Select-control',
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchMove: this.handleTouchMove,
						onTouchStart: this.handleTouchStart,
						style: this.props.style
					},
					__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi || this.props.singleValue ? valueArray : null, focusedOption) : null
			);
		}
	}]);
	return Select;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Select$1.propTypes = {
	'aria-describedby': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // aria label (for assistive tech)
	'aria-labelledby': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id of an element that should be used as the label (for assistive tech)
	arrowRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // create the drop-down caret element
	autoBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // automatically blur the component when an option is selected
	autoFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // autofocus the component on mount
	autofocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // deprecated; use autoFocus instead
	autosize: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to enable autosizing or not
	backspaceRemoves: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // should it be possible to reset value
	closeOnSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to close the menu when a value is selected
	deleteRemoves: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether delete removes an item if there is no text input
	delimiter: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // delimiter to use to join multiple values for the hidden field value
	disabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the Select is disabled or not
	escapeClearsValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether escape clears the value when the menu is closed
	filterOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to filter a single option (option, filterString)
	filterOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	id: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id to set on the input element for accessibility or tests
	ignoreAccents: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to strip diacritics when filtering
	ignoreCase: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to perform case-insensitive filtering
	inputProps: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // custom attributes for the Input
	inputRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // returns a custom input component
	instanceId: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // set the components instanceId
	isLoading: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // path of the label value in option objects
	matchPos: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // (any|start) match the start or entire string when filtering
	matchProp: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // (any|label|value) which option property to filter on
	menuBuffer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the menu container
	menuRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // renders a custom menu with options
	menuStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the menu
	multi: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // multi-value input
	name: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onBlur handler: function (event) {}
	onBlurResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared on blur
	onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onChange handler: function (newValue) {}
	onClose: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is closed
	onCloseResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared when menu is closed through the arrow
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onFocus handler: function (event) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is opened
	onSelectResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared on select (works only for multiselect)
	onValueClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onClick handler for value labels: function (value, event) {}
	openOnClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // boolean to control opening the menu when the control is clicked
	openOnFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // always open options menu on focus
	optionClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // additional class(es) to apply to the <Option /> elements
	optionComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // option component to render in dropdown
	optionRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // optionRenderer: function (option) {}
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array, // array of options
	pageSize: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	removeSelected: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the selected option is removed from the dropdown on multi selects
	required: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // applies HTML5 required attribute when needed
	resetValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // value to use when you clear the control
	rtl: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // set to true in order to use react-select in right-to-left direction
	scrollMenuIntoView: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to enable searching feature or not
	simpleValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the control
	tabIndex: stringOrNumber, // optional tab index of the control
	tabSelectsValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to treat tabbing out while focused to be value selection
	trimFilter: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to trim whitespace around filter value
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // initial field value
	valueComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // value component to render
	valueKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // path of the label value in option objects
	valueRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // valueRenderer: function (option) {}
	wrapperStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object // optional style to apply to the component wrapper
};

Select$1.defaultProps = {
	arrowRenderer: arrowRenderer,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: clearRenderer,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: filterOptions,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: menuRenderer,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	onSelectResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
	removeSelected: true,
	required: false,
	rtl: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	trimFilter: true,
	valueComponent: Value,
	valueKey: 'value'
};

var propTypes = {
	autoload: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // object to use to cache results; set to null/false to disable caching
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // perform case-insensitive filtering; defaults to true
	loadOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// replaces the placeholder while options are loading
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	multi: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // multi-value input
	noResultsText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// field noResultsText, displayed when no options come back from the server
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onChange handler: function (newValue) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // optional for keeping track of what is being typed
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array.isRequired, // array of options
	placeholder: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	searchPromptText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// label to prompt for search input
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any // initial field value
};

var defaultCache = {};

var defaultChildren = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = function (_Component) {
	inherits(Async, _Component);

	function Async(props, context) {
		classCallCheck(this, Async);

		var _this = possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

		_this._cache = props.cache === defaultCache ? {} : props.cache;

		_this.state = {
			inputValue: '',
			isLoading: false,
			options: props.options
		};

		_this.onInputChange = _this.onInputChange.bind(_this);
		return _this;
	}

	createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;


			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._callback = null;
		}
	}, {
		key: 'clearOptions',
		value: function clearOptions() {
			this.setState({ options: [] });
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
				this._callback = null;

				this.setState({
					isLoading: false,
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				var options = data && data.options || [];

				if (cache) {
					cache[inputValue] = options;
				}

				if (callback === _this2._callback) {
					_this2._callback = null;

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(inputValue) {
			var _props = this.props,
			    ignoreAccents = _props.ignoreAccents,
			    ignoreCase = _props.ignoreCase,
			    onInputChange = _props.onInputChange;

			var newInputValue = inputValue;

			if (onInputChange) {
				var value = onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					newInputValue = '' + value;
				}
			}

			var transformedInputValue = newInputValue;

			if (ignoreAccents) {
				transformedInputValue = stripDiacritics(transformedInputValue);
			}

			if (ignoreCase) {
				transformedInputValue = transformedInputValue.toLowerCase();
			}

			this.setState({ inputValue: newInputValue });
			this.loadOptions(transformedInputValue);

			// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
			return newInputValue;
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props,
			    loadingPlaceholder = _props2.loadingPlaceholder,
			    noResultsText = _props2.noResultsText,
			    searchPromptText = _props2.searchPromptText;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    isLoading = _state.isLoading;


			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    loadingPlaceholder = _props3.loadingPlaceholder,
			    placeholder = _props3.placeholder;
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    options = _state2.options;


			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this.onInputChange
			}));
		}
	}]);
	return Async;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

var CreatableSelect = function (_React$Component) {
	inherits(CreatableSelect, _React$Component);

	function CreatableSelect(props, context) {
		classCallCheck(this, CreatableSelect);

		var _this = possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		return _this;
	}

	createClass(CreatableSelect, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option, options: options });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1() {
			var _props2 = this.props,
			    filterOptions$$1 = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions$$1.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;


				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;


			options = options || this.props.options;

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer$$1(params) {
			var menuRenderer$$1 = this.props.menuRenderer;


			return menuRenderer$$1(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;

			// This value may be needed in between Select mounts (when this.select is null)

			this.inputValue = input;

			if (onInputChange) {
				this.inputValue = onInputChange(input);
			}

			return this.inputValue;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    refProp = _props4.ref,
			    restProps = objectWithoutProperties(_props4, ['ref']);
			var children = this.props.children;

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			if (!children) {
				children = defaultChildren$2;
			}

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref2) {
					_this2.select = _ref2;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref2) {
						_this2.labelKey = _ref2.props.labelKey;
						_this2.valueKey = _ref2.props.valueKey;
					}
					if (refProp) {
						refProp(_ref2);
					}
				}
			});

			return children(props);
		}
	}]);
	return CreatableSelect;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

var defaultChildren$2 = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

var isOptionUnique = function isOptionUnique(_ref3) {
	var option = _ref3.option,
	    options = _ref3.options,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey;

	if (!options || !options.length) {
		return true;
	}

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

var isValidNewOption = function isValidNewOption(_ref4) {
	var label = _ref4.label;
	return !!label;
};

var newOptionCreator = function newOptionCreator(_ref5) {
	var label = _ref5.label,
	    labelKey = _ref5.labelKey,
	    valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';

	return option;
};

var promptTextCreator = function promptTextCreator(label) {
	return 'Create option "' + label + '"';
};

var shouldKeyDownEventCreateNewOption = function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
		default:
			return false;
	}
};

// Default prop methods
CreatableSelect.isOptionUnique = isOptionUnique;
CreatableSelect.isValidNewOption = isValidNewOption;
CreatableSelect.newOptionCreator = newOptionCreator;
CreatableSelect.promptTextCreator = promptTextCreator;
CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

CreatableSelect.defaultProps = {
	filterOptions: filterOptions,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: menuRenderer,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
};

CreatableSelect.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.filterOptions
	filterOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// input change handler: function (inputValue) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// new option click handler: function (option) {}
	onNewOptionClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.options
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	ref: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

var AsyncCreatableSelect = function (_React$Component) {
	inherits(AsyncCreatableSelect, _React$Component);

	function AsyncCreatableSelect() {
		classCallCheck(this, AsyncCreatableSelect);
		return possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
	}

	createClass(AsyncCreatableSelect, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				Async,
				this.props,
				function (_ref) {
					var ref = _ref.ref,
					    asyncProps = objectWithoutProperties(_ref, ['ref']);

					var asyncRef = ref;
					return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						CreatableSelect,
						asyncProps,
						function (_ref2) {
							var ref = _ref2.ref,
							    creatableProps = objectWithoutProperties(_ref2, ['ref']);

							var creatableRef = ref;
							return _this2.props.children(_extends({}, creatableProps, {
								ref: function ref(select) {
									creatableRef(select);
									asyncRef(select);
									_this2.select = select;
								}
							}));
						}
					);
				}
			);
		}
	}]);
	return AsyncCreatableSelect;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

var defaultChildren$1 = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

AsyncCreatableSelect.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

AsyncCreatableSelect.defaultProps = {
	children: defaultChildren$1
};

Select$1.Async = Async;
Select$1.AsyncCreatable = AsyncCreatableSelect;
Select$1.Creatable = CreatableSelect;
Select$1.Value = Value;
Select$1.Option = Option;


/* harmony default export */ __webpack_exports__["default"] = (Select$1);


/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _ReactDatum = {
  // contextual components
  ClickToEditForm: __webpack_require__(22),
  ContextualData: __webpack_require__(7),
  Collection: __webpack_require__(27),
  CollectionStats: __webpack_require__(30),
  Form: __webpack_require__(15),
  Model: __webpack_require__(31),
  SelectedModel: __webpack_require__(32),

  // Datums
  Datum: __webpack_require__(2),
  Email: __webpack_require__(33),
  LazyPhoto: __webpack_require__(34),
  Link: __webpack_require__(35),
  Number: __webpack_require__(13),
  Percent: __webpack_require__(36),
  Text: __webpack_require__(16),
  Label: __webpack_require__(37),
  WholeNumber: __webpack_require__(38),

  // Global options
  Options: __webpack_require__(12),

  // TODO : i think this and react-select will eventually go to a separate 
  //    npm package so that the core doesn't have dependency on react-select
  CollectionPicker: __webpack_require__(39),
  // react-select 
  ReactSelect: __webpack_require__(17),
  SelectOption: __webpack_require__(43)

};
if (window) {
  window.ReactDatum = _ReactDatum;
}
if (module) {
  module.exports = _ReactDatum;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)(module)))

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var ClickToEditForm,
      Form,
      React,
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

  React = __webpack_require__(0);

  Form = __webpack_require__(15);

  _ = __webpack_require__(1);

  module.exports = ClickToEditForm = function (superClass) {
    extend(ClickToEditForm, superClass);

    ClickToEditForm.displayName = "react-datum.ClickToEditForm";

    ClickToEditForm.prototype.datumInputMode = 'readonly';

    function ClickToEditForm(props) {
      this.stopEditing = bind(this.stopEditing, this);
      this.onCancelClick = bind(this.onCancelClick, this);
      this.onSaveSuccess = bind(this.onSaveSuccess, this);
      this.onEditClick = bind(this.onEditClick, this);
      ClickToEditForm.__super__.constructor.apply(this, arguments);
      this.isEditing = false;
    }

    ClickToEditForm.prototype.renderButtons = function (options) {
      if (this.isEditing) {
        return ClickToEditForm.__super__.renderButtons.apply(this, arguments);
      }
      if (this.props.readonly) {
        return React.createElement("span", null);
      } else {
        return React.createElement("button", {
          "key": "edit",
          "className": "btn btn-primary",
          "onClick": this.onEditClick
        }, "Edit");
      }
    };

    ClickToEditForm.prototype.onEditClick = function () {
      this.isEditing = true;
      this.datumInputMode = 'edit';
      this.forceUpdate();
      return _.defer(function (_this) {
        return function () {
          return _this.focus();
        };
      }(this));
    };

    ClickToEditForm.prototype.onSaveSuccess = function () {
      ClickToEditForm.__super__.onSaveSuccess.apply(this, arguments);
      return this.stopEditing();
    };

    ClickToEditForm.prototype.onCancelClick = function () {
      this.stopEditing();
      return ClickToEditForm.__super__.onCancelClick.apply(this, arguments);
    };

    ClickToEditForm.prototype.stopEditing = function () {
      this.isEditing = false;
      this.datumInputMode = 'readonly';
      return this.forceUpdate();
    };

    return ClickToEditForm;
  }(Form);
}).call(undefined);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(8);
var invariant = __webpack_require__(9);
var warning = __webpack_require__(14);
var assign = __webpack_require__(24);

var ReactPropTypesSecret = __webpack_require__(10);
var checkPropTypes = __webpack_require__(25);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(9);
  var warning = __webpack_require__(14);
  var ReactPropTypesSecret = __webpack_require__(10);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(8);
var invariant = __webpack_require__(9);
var ReactPropTypesSecret = __webpack_require__(10);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      Collection,
      ContextualData,
      React,
      SelectableCollection,
      _,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  Backbone = __webpack_require__(3);

  _ = __webpack_require__(1);

  SelectableCollection = __webpack_require__(28);

  ContextualData = __webpack_require__(7);

  module.exports = Collection = function (superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.displayName = "react-datum.Collection";

    Collection.prototype.dataType = Backbone.Collection;

    Collection.prototype.contextKey = 'collection';

    Collection.collectionPropType = React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.array]);

    Collection.propTypes = _.extend({}, ContextualData.propTypes, {
      collection: Collection.collectionPropType.isRequired
    });

    Collection.childContextTypes = _.extend({}, ContextualData.childContextTypes, {
      collection: Collection.collectionPropType
    });

    Collection.prototype.setCollectionOrModel = function () {
      var collection;
      Collection.__super__.setCollectionOrModel.apply(this, arguments);
      collection = this.state.collectionOrModel;
      if (!(collection == null || collection.hasSelectableCollectionMixin)) {
        SelectableCollection.applyTo(collection);
      }
      return collection;
    };

    return Collection;
  }(ContextualData);
}).call(undefined);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(29)
  

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var SelectableCollection, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = __webpack_require__(1);

  module.exports = SelectableCollection = (function() {
    function SelectableCollection() {
      this.setActiveModelById = __bind(this.setActiveModelById, this);
      this.setActiveIndex = __bind(this.setActiveIndex, this);
      this.getActiveModel = __bind(this.getActiveModel, this);
      this.setActiveModel = __bind(this.setActiveModel, this);
      this.selectNone = __bind(this.selectNone, this);
      this.selectAll = __bind(this.selectAll, this);
      this.selectModelByIndex = __bind(this.selectModelByIndex, this);
      this.selectModelById = __bind(this.selectModelById, this);
      this.selectModel = __bind(this.selectModel, this);
    }


    /*
      This method is used to mix SelectableCollection features into a Backbone Collection.
      
      example:
      ```javascript
        kittensCollection = new Backbone.Collection()
        SelectableCollection.applyTo(kittensCollection)
      ```
     */

    SelectableCollection.applyTo = function(collection) {
      if (collection.hasSelectableCollectionMixin) {
        return;
      }
      collection.hasSelectableCollection = true;
      this.warnIfReplacingMethods(collection);
      return _.extend(collection, this.prototype);
    };

    SelectableCollection.warnIfReplacingMethods = function(collection) {
      var intersect;
      intersect = _.intersection(_.keys(collection), _.keys(this.prototype));
      if (!(intersect.length > 0)) {
        return;
      }
      return console.error("Warning: using SelectableCollection mixin will replace the following methods: " + intersect.join(', '));
    };

    SelectableCollection.prototype.hasSelectableCollectionMixin = true;


    /*
      Collection instance method that returns an array of selected models
     */

    SelectableCollection.prototype.getSelectedModels = function() {
      return _.filter(this.models, function(m) {
        return m.selected;
      });
    };


    /*
      Collection instance method that selects a single model.
     
      The model will be given a `selected` property of true.
     
      The `selected` argument can be one of:
      `true`    - model argument will be selected
      `false`   - unselect model
      "toggle"` - invert current selected state
      
      Example: 
      ```javascript
        myCollection.selectModel(myModel)
        console.log(myModel.selected)
         * => true
      ```
     */

    SelectableCollection.prototype.selectModel = function(model, selected, options) {
      if (selected == null) {
        selected = true;
      }
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      if (model == null) {
        console.warn("SelectableCollection: selectModel called on null model");
        return false;
      }
      if (selected === "toggle") {
        model.selected = (model.selected == null) || model.selected === false;
      } else {
        model.selected = selected;
      }
      if (!options.silent) {
        this.trigger('selectionsChanged');
      }
      return model.selected;
    };


    /*
      Collection instance method that selects a single model by ID.
      
      collection.get(id) is used to get the model passed to selectModel method.
      
      See also [selectModel method](#selectModel) for options
     */

    SelectableCollection.prototype.selectModelById = function(id, selected, options) {
      if (selected == null) {
        selected = true;
      }
      if (options == null) {
        options = {};
      }
      return this.selectModel(this.get(id), selected, options);
    };


    /*
      Collection instance method that selects a single model by it's zero based index
      in the collection.
    
      See also [selectModel method](#selectModel) for options
     */

    SelectableCollection.prototype.selectModelByIndex = function(index, selected, options) {
      if (selected == null) {
        selected = true;
      }
      if (options == null) {
        options = {};
      }
      return this.selectModel(this.models[index], selected, options);
    };


    /*
      Collection instance method that selects all models in the collection.
    
      A single *selectionsChanged* event is triggered unless options.silent==true
     */

    SelectableCollection.prototype.selectAll = function(options) {
      var model, _i, _len, _ref;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      _ref = this.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        if (model == null) {
          continue;
        }
        this.selectModel(model, true, {
          silent: true
        });
      }
      if (!options.silent) {
        return this.trigger('selectionsChanged');
      }
    };


    /*
      Collection instance method that unselects all models.  Also sets activeModel to null.
    
      A *selectionsChanged* event is triggered unless options.silent==true. 
      A *activeModelChanged* event is also fired
     */

    SelectableCollection.prototype.selectNone = function(options) {
      var model, _i, _len, _ref;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false
      });
      _ref = this.getSelectedModels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        if (model == null) {
          continue;
        }
        this.selectModel(model, false, {
          silent: true
        });
      }
      if (!options.silent) {
        this.trigger('selectionsChanged');
      }
      return this.setActiveModel(null);
    };


    /*
      Collection instance method that sets the current 'active' Model.  Multiple models may be 
      selected in the collection, only one model can be 'active'.   The active model is also
      selected in the collection if not already selected.  
      
      SetActiveModel() is an optional feature. Active model can be used, as it is by 
      [tilegrid](https://github.com/zulily/tilegrid), to provide both multiple selections and
      a single selection within that set (the last tile added to the selections)
        
      pass in null for model argument to unset active model
     */

    SelectableCollection.prototype.setActiveModel = function(model, options) {
      var currentActive;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        active: true,
        silent: false
      });
      currentActive = this.getActiveModel();
      if (currentActive != null) {
        currentActive.active = false;
      }
      this.selectModel(model, options);
      if (model != null) {
        model.active = options.active;
      }
      this.activeModel = model;
      if (!options.silent) {
        return this.trigger('activeModelChanged', model);
      }
    };


    /*
      Collection instance method that returns the current active model.
     */

    SelectableCollection.prototype.getActiveModel = function() {
      return this.activeModel;
    };


    /*
      Collection instance method that sets the active model by index in collection.
      
      see [setActiveModel](#setActiveModel) for options
     */

    SelectableCollection.prototype.setActiveIndex = function(index, options) {
      if (options == null) {
        options = {};
      }
      return this.setActiveModel(this.models[index]);
    };


    /*
      Collection instance method that sets the active model by id in collection.
      
      see [setActiveModel](#setActiveModel) for options
     */

    SelectableCollection.prototype.setActiveModelById = function(modelId, options) {
      if (options == null) {
        options = {};
      }
      return this.setActiveModel(this.get(modelId), options);
    };

    return SelectableCollection;

  })();

}).call(this);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      CollectionStats,
      React,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  Backbone = __webpack_require__(3);

  module.exports = CollectionStats = function (superClass) {
    extend(CollectionStats, superClass);

    function CollectionStats() {
      return CollectionStats.__super__.constructor.apply(this, arguments);
    }

    CollectionStats.displayName = "react-datum.CollectionStats";

    CollectionStats.propTypes = {
      collection: React.PropTypes.instanceOf(Backbone.Collection),
      itemDisplayName: React.PropTypes.string
    };

    CollectionStats.defaultProps = {
      itemDisplayName: "item"
    };

    CollectionStats.contextTypes = {
      collection: React.PropTypes.instanceOf(Backbone.Collection)
    };

    CollectionStats.prototype.render = function () {
      this.collection = this.props.collection || this.context.collection;
      if (this.collection == null) {
        throw this.constructor.displayName + " needs a collection prop or react-datum Collection context parent";
      }
      return React.createElement("div", {
        "className": 'collection-stats'
      }, this._renderFound(), this._renderSelected(), this._renderViewing());
    };

    CollectionStats.prototype._renderFound = function () {
      var base, displayName, things, total;
      total = (typeof (base = this.collection).getTotalRows === "function" ? base.getTotalRows() : void 0) || this.collection.models.length;
      displayName = this.props.itemDisplayName;
      things = function () {
        switch (false) {
          case (typeof inflection !== "undefined" && inflection !== null ? inflection.inflect : void 0) == null:
            return inflection.inflect(this.props.itemDisplayName, total);
          case displayName.plural == null:
            return displayName.plural(total);
          default:
            return displayName;
        }
      }.call(this);
      return React.createElement("span", {
        "className": "found stats fade in"
      }, "Found ", this._renderCount(total), " ", things);
    };

    CollectionStats.prototype._renderSelected = function () {
      if (!this.collection.hasSelectableCollection) {
        return null;
      }
      return React.createElement("span", {
        "className": "selected stats fade in"
      }, ", ", this._renderCount(this.collection.getSelectedModels().length), " selected");
    };

    CollectionStats.prototype._renderViewing = function () {
      var bottomIndex, ref, ref1, topIndex;
      topIndex = this.collection.topDisplayIndex || ((ref = this.collection.statsModel) != null ? ref.get('topDisplayIndex') : void 0);
      bottomIndex = this.collection.bottomDisplayIndex || ((ref1 = this.collection.statsModel) != null ? ref1.get('bottomDisplayIndex') : void 0);
      if (!(topIndex != null && bottomIndex)) {
        return null;
      }
      return React.createElement("span", {
        "className": "viewing stats fade in"
      }, "Viewing ", this._renderCount(topIndex, 'top-index'), " - ", this._renderCount(bottomIndex, 'bottom-index'));
    };

    CollectionStats.prototype._renderCount = function (value, addClass) {
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
  }(React.Component);
}).call(undefined);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      ContextualData,
      Model,
      React,
      _,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  Backbone = __webpack_require__(3);

  _ = __webpack_require__(1);

  ContextualData = __webpack_require__(7);

  module.exports = Model = function (superClass) {
    extend(Model, superClass);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.displayName = "react-datum.Model";

    Model.prototype.dataType = Backbone.Model;

    Model.prototype.contextKey = 'model';

    Model.modelPropType = React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Model), React.PropTypes.object]);

    Model.propTypes = _.extend({}, ContextualData.propTypes, {
      model: Model.modelPropType.isRequired
    });

    Model.childContextTypes = _.extend({}, ContextualData.childContextTypes, {
      model: Model.modelPropType
    });

    Model.prototype.update = function () {
      return Model.__super__.update.apply(this, arguments);
    };

    return Model;
  }(ContextualData);
}).call(undefined);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      ContextualData,
      React,
      SelectedModel,
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

  React = __webpack_require__(0);

  Backbone = __webpack_require__(3);

  ContextualData = __webpack_require__(7);

  module.exports = SelectedModel = function (superClass) {
    extend(SelectedModel, superClass);

    function SelectedModel() {
      this._onSelectionsChanged = bind(this._onSelectionsChanged, this);
      return SelectedModel.__super__.constructor.apply(this, arguments);
    }

    SelectedModel.displayName = "react-datum.SelectedModel";

    SelectedModel.prototype.dataType = Backbone.Model;

    SelectedModel.prototype.contextKey = 'model';

    SelectedModel.proptypes = {
      collection: React.PropTypes.instanceOf(Backbone.Collection),
      placeholder: React.PropTypes.node
    };

    SelectedModel.contextTypes = {
      collection: React.PropTypes.instanceOf(Backbone.Collection)
    };

    SelectedModel.childContextTypes = {
      model: React.PropTypes.instanceOf(Backbone.Model)
    };

    SelectedModel.prototype.renderContent = function () {
      var superContent;
      superContent = SelectedModel.__super__.renderContent.apply(this, arguments);
      if (this.state.collectionOrModel != null) {
        return superContent;
      }
      return React.createElement("div", {
        "className": "large-placeholder"
      }, this.props.placeholder);
    };

    SelectedModel.prototype.needsReinitializing = function () {
      var truth;
      truth = SelectedModel.__super__.needsReinitializing.call(this) || this.context.collection !== this._lastContextCollection;
      this._lastContextCollection = this.context.collection;
      return truth;
    };

    /*
      override - We are going to provide a 'model' context (contextKey), but we listen to a 
      collection
     */

    SelectedModel.prototype.getInputCollectionOrModel = function () {
      return this.props.collection || this.context.collection;
    };

    SelectedModel.prototype.getCollectionOrModelToProvide = function () {
      var collection;
      collection = this.props.collection || this.context.collection;
      return collection != null ? typeof collection.getSelectedModels === "function" ? collection.getSelectedModels()[0] : void 0 : void 0;
    };

    SelectedModel.prototype.bindEvents = function (model) {
      var ref;
      SelectedModel.__super__.bindEvents.apply(this, arguments);
      return (ref = this.getInputCollectionOrModel()) != null ? ref.on("selectionsChanged", this._onSelectionsChanged) : void 0;
    };

    SelectedModel.prototype.unbindEvents = function () {
      var ref;
      SelectedModel.__super__.unbindEvents.apply(this, arguments);
      return (ref = this.getInputCollectionOrModel()) != null ? ref.off("selectionsChanged", this._onSelectionsChanged) : void 0;
    };

    SelectedModel.prototype._onSelectionsChanged = function () {
      this.setCollectionOrModel();
      return this.forceUpdate();
    };

    return SelectedModel;
  }(ContextualData);
}).call(undefined);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Datum,
      Email,
      React,
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

  React = __webpack_require__(0);

  _ = __webpack_require__(1);

  Datum = __webpack_require__(2);

  /*
    For rendering and input of email addresses.  Can render mailto: links like 
    `<a href="mailto:">` in display mode
    
    Validates that email address is a semi valid email based on matching 
    `/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/`
   */

  module.exports = Email = function (superClass) {
    extend(Email, superClass);

    Email.displayName = "react-datum.Email";

    Email.propTypes = _.extend({}, Datum.propTypes, {
      displayAsLink: React.PropTypes.bool
    });

    function Email(props) {
      this.validateEmail = bind(this.validateEmail, this);
      Email.__super__.constructor.apply(this, arguments);
      this.addValidations(this.validateEmail);
    }

    Email.prototype.renderValueForDisplay = function () {
      var value;
      value = Email.__super__.renderValueForDisplay.apply(this, arguments);
      if (this.props.displayAsLink) {
        return React.createElement("a", {
          "href": this.getMailToHref(value)
        }, value);
      } else {
        return value;
      }
    };

    Email.prototype.getMailToHref = function (value) {
      return "mailto:" + value;
    };

    Email.prototype.validateEmail = function (value) {
      if (value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        return true;
      }
      return "Invalid email address.  Should be like 'bob@zulily.com'";
    };

    return Email;
  }(Datum);
}).call(undefined);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Datum,
      LazyPhoto,
      Options,
      React,
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

  React = __webpack_require__(0);

  Datum = __webpack_require__(2);

  Options = __webpack_require__(12);

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

  module.exports = LazyPhoto = function (superClass) {
    extend(LazyPhoto, superClass);

    function LazyPhoto() {
      this.onError = bind(this.onError, this);
      this.onLoad = bind(this.onLoad, this);
      return LazyPhoto.__super__.constructor.apply(this, arguments);
    }

    LazyPhoto.displayName = "react-datum.LazyPhoto";

    LazyPhoto.prototype.subClassName = 'lazy-image';

    LazyPhoto.prototype.initialLoadComplete = false;

    LazyPhoto.prototype.componentWillMount = function () {
      LazyPhoto.__super__.componentWillMount.apply(this, arguments);
      return this.setState({
        notFound: false
      });
    };

    LazyPhoto.prototype.isEditable = function () {
      return false;
    };

    LazyPhoto.prototype.renderForDisplay = function () {
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

    LazyPhoto.prototype.onLoad = function (evt) {
      if (this.initialLoadComplete || this.notFound) {
        return;
      }
      return this.initialLoadComplete = true;
    };

    LazyPhoto.prototype.onError = function (evt) {
      if (this.state.notFound) {
        return;
      }
      return this.setState({
        notFound: true
      });
    };

    LazyPhoto.prototype.onModelValueChange = function () {
      this.setState({
        notFound: false
      });
      return LazyPhoto.__super__.onModelValueChange.apply(this, arguments);
    };

    return LazyPhoto;
  }(Datum);
}).call(undefined);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Datum,
      Link,
      React,
      _,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  _ = __webpack_require__(1);

  Datum = __webpack_require__(2);

  /*
    see ./link.md
   */

  module.exports = Link = function (superClass) {
    extend(Link, superClass);

    function Link() {
      return Link.__super__.constructor.apply(this, arguments);
    }

    Link.displayName = "react-datum.Link";

    Link.propTypes = _.extend({}, Datum.propTypes, {
      nameAttr: React.PropTypes.string,
      target: React.PropTypes.string,
      ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
      reverseEllipsis: React.PropTypes.bool,
      hideProtocol: React.PropTypes.bool
    });

    Link.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      target: '_blank',
      hideProtocol: false
    });

    Link.prototype.subClassName = 'link';

    Link.prototype.renderValueForDisplay = function () {
      return React.createElement("a", {
        "href": this._getHref(),
        "target": this.props.target
      }, this._getTagContent());
    };

    Link.prototype._getHref = function () {
      return this.getModelValue();
    };

    Link.prototype._removeHttpForDisplay = function () {
      var index, value;
      value = this.getModelValue();
      if (value.indexOf('://') >= 3) {
        index = value.indexOf('://') + 3;
        value = value.slice(index);
      }
      return value;
    };

    Link.prototype._getTagContent = function () {
      var contentValue, value;
      if (this.props.nameAttr != null) {
        contentValue = this.getModel().get(this.props.nameAttr);
        if (_.isArray(contentValue)) {
          contentValue = contentValue.map(function (v) {
            return v.toString();
          }).join(', ');
        }
        return this.renderEllipsizedValue(contentValue);
      } else if (this.props.children != null) {
        return React.createElement("span", null, this.props.children);
      } else {
        if (this.props.hideProtocol) {
          value = this._removeHttpForDisplay();
        } else {
          value = this.getModelValue();
        }
        return this.renderEllipsizedValue(value);
      }
    };

    return Link;
  }(Datum);
}).call(undefined);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Number,
      Percent,
      React,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  Number = __webpack_require__(13);

  /*
    This datum is an extension of [ReactDatum.Number](http://zulily.github.io/react-datum/docs/api/#Number) for
    display and input of percent values.   
    
    - Display value is affixed with '%' 
    - Display and input value are model value * 100 (model value is assumed to be 
    fractional value)
    - User input is assumed to be number percentage (* 100)
    - props.decimalPlaces is respected for both display and input
  
  
    Number datum has (maybe use to have) a format called  'percent' that will also
    do a little part of what Percent datum does.  The Percent datum is meant to 
    supercede 'percent' format to Number datum.
   */

  module.exports = Percent = function (superClass) {
    extend(Percent, superClass);

    function Percent() {
      return Percent.__super__.constructor.apply(this, arguments);
    }

    Percent.displayName = "react-datum.Percent";

    /*
      Model value returned is multiplied by 100.  Internal value for Percent
      is always the whole number displayed percentage rounded to requested
      decimal places.
     */

    Percent.prototype.getModelValue = function () {
      var superValue;
      superValue = Percent.__super__.getModelValue.apply(this, arguments);
      if (superValue == null) {
        return superValue;
      }
      return this.roundToDecimalPlaces(Number.safelyFloat(superValue) * 100);
    };

    /*
      What get's saved to the model is the user entered value divided by 100
     */

    Percent.prototype.setModelValue = function (value, options) {
      var floatValue;
      if (value == null) {
        value = this.getInputValue();
      }
      if (options == null) {
        options = {};
      }
      if (value == null) {
        return;
      }
      value || (value = 0);
      floatValue = Number.safelyFloat(value) / 100;
      return Percent.__super__.setModelValue.call(this, floatValue, options);
    };

    /*
      Other formats like 'money' and 'abbreviate' are ignored.  Override react-datum.Money
     */

    Percent.prototype.getFormats = function () {
      return [];
    };

    /*
      Renders value for display as nn.n%.
      
      Base number has (maybe use to have) a format called  'percent' that will also
      do this little part of it.  The Percent datum is meant to supercede 'percent' 
      format to Number datum.
     */

    Percent.prototype.renderValueForDisplay = function () {
      var superVal;
      superVal = Percent.__super__.renderValueForDisplay.apply(this, arguments);
      return superVal + '%';
    };

    return Percent;
  }(Number);
}).call(undefined);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Label,
      React,
      Text,
      _,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  _ = __webpack_require__(1);

  Text = __webpack_require__(16);

  /*
    see ./label.md
   */

  module.exports = Label = function (superClass) {
    extend(Label, superClass);

    function Label() {
      return Label.__super__.constructor.apply(this, arguments);
    }

    Label.displayName = "react-datum.Label";

    Label.prototype.render = function () {
      return Label.__super__.render.apply(this, arguments);
    };

    Label.prototype.renderValueForDisplay = function () {
      var label, labelProps, superVal, tooltip;
      superVal = Label.__super__.renderValueForDisplay.apply(this, arguments);
      labelProps = {
        style: this.props.style
      };
      tooltip = this.getPropOrMetadata('tooltip');
      label = superVal != null ? this.renderWithPopover(React.createElement("label", Object.assign({}, labelProps), superVal), tooltip, 'datumLabelTooltip', 'datum-tooltip') : null;
      return label;
    };

    Label.prototype.getModelValue = function (newProps, newContext) {
      if (newProps == null) {
        newProps = this.props;
      }
      if (newContext == null) {
        newContext = this.context;
      }
      if (newProps.children != null) {
        return newProps.children;
      }
      return Label.__super__.getModelValue.apply(this, arguments);
    };

    return Label;
  }(Text);
}).call(undefined);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Number,
      React,
      WholeNumber,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(0);

  Number = __webpack_require__(13);

  /*
    For whole numbers (no decimal input allowed).
   */

  module.exports = WholeNumber = function (superClass) {
    extend(WholeNumber, superClass);

    function WholeNumber() {
      return WholeNumber.__super__.constructor.apply(this, arguments);
    }

    WholeNumber.displayName = "react-datum.WholeNumber";

    WholeNumber.prototype.charactersMustMatch = /^\-?[0-9]*$/;

    WholeNumber.prototype.getInputValue = function () {
      return parseInt(this.state.value, 10);
    };

    return WholeNumber;
  }(Number);
}).call(undefined);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var Backbone,
      CollectionPicker,
      Datum,
      React,
      Select,
      Strhelp,
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
      hasProp = {}.hasOwnProperty,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  React = __webpack_require__(0);

  Backbone = __webpack_require__(3);

  _ = __webpack_require__(1);

  Strhelp = __webpack_require__(40);

  Datum = __webpack_require__(2);

  Select = __webpack_require__(17);

  module.exports = CollectionPicker = function (superClass) {
    extend(CollectionPicker, superClass);

    CollectionPicker.displayName = "react-datum.CollectionPicker";

    CollectionPicker.propTypes = _.extend({}, Datum.propTypes, {
      collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.string, React.PropTypes.array]),
      ellipsizeAt: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
      reverseEllipsis: React.PropTypes.bool,
      optionComponent: React.PropTypes.func,
      valueComponent: React.PropTypes.func,
      fetchUnknownModelsInCollection: React.PropTypes.bool,
      displayAttr: React.PropTypes.string,
      optionSaveAttr: React.PropTypes.string,
      displayComponent: React.PropTypes.any,
      synchronousLoading: React.PropTypes.bool,
      isLoading: React.PropTypes.bool,
      asyncSuggestionCallback: React.PropTypes.func,
      multi: React.PropTypes.bool,
      csvDisplay: React.PropTypes.bool,
      editPlaceholder: React.PropTypes.string,
      setAsString: React.PropTypes.bool,
      displayModelValue: React.PropTypes.bool
    });

    CollectionPicker.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      fetchUnknownModelsInCollection: true,
      loading: false,
      attr: 'value'
    });

    CollectionPicker.contextTypes = _.extend({}, Datum.contextTypes, {
      collection: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Backbone.Collection), React.PropTypes.string])
    });

    CollectionPicker.prototype.subClassName = "collection-picker";

    CollectionPicker.prototype.selectRef = "reactSelect";

    function CollectionPicker() {
      this.groupSuggestionModels = bind(this.groupSuggestionModels, this);
      this.filterSuggestionModels = bind(this.filterSuggestionModels, this);
      this.onLoadOptions = bind(this.onLoadOptions, this);
      this.onChange = bind(this.onChange, this);
      this.getOptionValuesForReactSelect = bind(this.getOptionValuesForReactSelect, this);
      this.focus = bind(this.focus, this);
      this.getInputComponent = bind(this.getInputComponent, this);
      this._onFirstCollectionModelSync = bind(this._onFirstCollectionModelSync, this);
      CollectionPicker.__super__.constructor.apply(this, arguments);
    }

    CollectionPicker.prototype.render = function () {
      return CollectionPicker.__super__.render.apply(this, arguments);
    };

    CollectionPicker.prototype.renderValueForDisplay = function () {
      var collection, collectionValues, modelValues;
      collection = this.getCollection();
      modelValues = this.getModelValue();
      if (_.isString(modelValues) && modelValues.match(/\d+\,\s*\d+/)) {
        modelValues = modelValues.split(/\,\s?/);
      }
      if (!_.isArray(modelValues)) {
        modelValues = [modelValues];
      }
      modelValues = _.compact(_.unique(_.flatten(modelValues)));
      if (this.props.csvDisplay) {
        collectionValues = modelValues.map(function (_this) {
          return function (modelId) {
            var ref;
            return (ref = _this.getCollectionModelDisplayValue(modelId, collection)) != null ? ref : modelId;
          };
        }(this));
        return this.renderEllipsizedValue(collectionValues.join(', '));
      } else {
        return modelValues.map(function (_this) {
          return function (modelValue) {
            return _this.renderCollectionDisplayValue(modelValue, collection);
          };
        }(this));
      }
    };

    CollectionPicker.prototype.renderCollectionDisplayValue = function (modelId, collection) {
      var modelValue, valueProps;
      if (collection == null) {
        collection = this.getCollection();
      }
      modelValue = this.getCollectionModelDisplayValue(modelId, collection);
      if (modelValue) {
        modelValue = this.renderEllipsizedValue(modelValue);
      }
      valueProps = {
        key: modelValue,
        className: "collection-picker-display-value"
      };
      if (this.props.displayComponent != null) {
        valueProps.value = this._getCollectionModelById(modelId);
        return React.createElement(this.props.displayComponent, Object.assign({}, valueProps));
      }
      return React.createElement("span", Object.assign({}, valueProps), modelValue || this.renderPlaceholder() || "unknown");
    };

    CollectionPicker.prototype.renderInput = function () {
      if (this.props.synchronousLoading) {
        return React.createElement(Select["default"], Object.assign({}, this.getSelectOptions()));
      } else {
        return React.createElement(Select.Async, Object.assign({}, this.getSelectAsyncOptions()), function (_this) {
          return function (props) {
            var collection;
            collection = _this.getCollection();
            if (collection.filterForPicker != null || _this.props.asyncLoadCallback != null) {
              props.filterOptions = null;
            }
            props.value = _this.getValueForInput();
            props.ref = 'select';
            return React.createElement(Select["default"], Object.assign({}, props));
          };
        }(this));
      }
    };

    CollectionPicker.prototype.getCollection = function () {
      var collection;
      collection = this.props.collection || this.context.collection;
      if (collection == null) {
        console.warn(this.constructor.displayName + (" requires a collection prop or context. attr=" + this.props.attr));
      }
      if (!(collection instanceof Backbone.Collection)) {
        return new Backbone.Collection(collection);
      }
      return collection;
    };

    /*
      TODO: make this method public.  useful for extensions and used by some
     */

    CollectionPicker.prototype._getCollectionModelById = function (modelOrId) {
      var collectionModel, onSync, ref;
      if (_.isNumber(modelOrId) || _.isString(modelOrId)) {
        collectionModel = (ref = this.getCollection()) != null ? ref.get(modelOrId, {
          add: this.props.fetchUnknownModelsInCollection
        }) : void 0;
        onSync = function (_this) {
          return function () {
            _.defer(function () {
              return _this._onFirstCollectionModelSync(collectionModel);
            });
            return collectionModel != null ? typeof collectionModel.off === "function" ? collectionModel.off('sync', onSync) : void 0 : void 0;
          };
        }(this);
        if (collectionModel != null) {
          if (typeof collectionModel.on === "function") {
            collectionModel.on('sync', onSync);
          }
        }
        return collectionModel;
      }
      return modelOrId;
    };

    CollectionPicker.prototype._onFirstCollectionModelSync = function (collectionModel) {
      var ref;
      if ((ref = this.getModel()) != null) {
        if (typeof ref.trigger === "function") {
          ref.trigger('invalidate');
        }
      }
      return this.forceUpdate();
    };

    CollectionPicker.prototype.getCollectionModelDisplayValue = function (modelId, collection) {
      var displayValue, model, ref;
      if (!modelId) {
        return null;
      }
      if (this.props.displayModelValue) {
        return modelId.toString();
      }
      model = this._getCollectionModelById(modelId);
      if (model != null) {
        if (!_.isFunction(model.toString) && this.props.displayAttr == null) {
          throw new Error(this.constructor.displayName + ": You need to specify a displayAttr prop or model must have toString() method");
        }
        displayValue = this.props.displayAttr != null ? (ref = typeof model.get === "function" ? model.get(this.props.displayAttr) : void 0) != null ? ref : model[this.props.displayAttr] : typeof model.toString === "function" ? model.toString() : void 0;
      } else {
        displayValue = null;
      }
      return displayValue;
    };

    CollectionPicker.prototype.getOptionSaveValue = function (modelId, collection) {
      var model, ref, ref1, ref2;
      model = this._getCollectionModelById(modelId);
      if (model != null && this.props.optionSaveAttr == null) {
        return model.id;
      }
      return (ref = (ref1 = (ref2 = model != null ? typeof model.get === "function" ? model.get(this.props.optionSaveAttr) : void 0 : void 0) != null ? ref2 : model != null ? model[this.props.optionSaveAttr] : void 0) != null ? ref1 : model != null ? model.id : void 0) != null ? ref : modelId;
    };

    CollectionPicker.prototype.getModelValue = function (newProps) {
      var modelValue;
      if (newProps == null) {
        newProps = this.props;
      }
      modelValue = CollectionPicker.__super__.getModelValue.apply(this, arguments);
      if (newProps.multi) {
        modelValue = function () {
          switch (false) {
            case !(modelValue == null):
              return [];
            case !_.isString(modelValue):
              return modelValue.split(',');
            case !_.isArray(modelValue):
              return modelValue;
            default:
              return [modelValue];
          }
        }();
        modelValue = _.compact(_.unique(_.flatten(modelValue)));
      }
      return modelValue;
    };

    CollectionPicker.prototype.getSelectOptions = function () {
      var collection;
      collection = this.getCollection();
      return _.extend({}, this.props, {
        placeholder: this.props.editPlaceholder || this.getPropOrMetadata('placeholder') || this.renderPlaceholder(),
        value: this.getValueForInput(),
        onChange: this.onChange,
        onBlur: this.onBlur,
        options: this.getOptionValuesForReactSelect(collection.models),
        labelKey: "label",
        valueKey: "value",
        ref: this.selectRef
      });
    };

    CollectionPicker.prototype.getSelectAsyncOptions = function () {
      var collection, selectOptions;
      collection = this.getCollection();
      selectOptions = this.getSelectOptions();
      if (this.props.asyncSuggestionCallback != null) {
        delete selectOptions.options;
      }
      return _.extend(selectOptions, {
        loadOptions: this.onLoadOptions
      });
    };

    CollectionPicker.prototype.hasInputValueChanged = function () {
      return this.getInputValue() !== this.getModelValue();
    };

    CollectionPicker.prototype.getInputComponent = function () {
      return ReactDOM.findDOMNode(this).querySelector('input');
    };

    CollectionPicker.prototype.getSelectedModels = function () {
      var ref;
      return (ref = this.getCollection()) != null ? ref.get(this.getInputValue()) : void 0;
    };

    CollectionPicker.prototype.focus = function () {
      var ref;
      return (ref = this.getInputComponent()) != null ? typeof ref.focus === "function" ? ref.focus() : void 0 : void 0;
    };

    CollectionPicker.prototype.getOptionValuesForReactSelect = function (models) {
      if (models == null) {
        models = [];
      }
      return _.map(models, function (_this) {
        return function (m) {
          return {
            label: _this.getCollectionModelDisplayValue(m),
            value: _this.getOptionSaveValue(m),
            model: m
          };
        };
      }(this));
    };

    /*
     Extends Datum class - react-select returns array of options and not a synth event 
     super expects a synth event but only uses value.
     
     Also note that the value passed back to the usage through @props.onChange is
     the option object(s) for the currently selected option(s)
     */

    CollectionPicker.prototype.onChange = function (optionsSelected) {
      var ref, ref1, value, values;
      if (this.props.multi) {
        values = _.pluck(optionsSelected, 'value');
        if (values.length === 1 && ((ref = this.state.value) != null ? ref.length : void 0) > 0 && (ref1 = values[0], indexOf.call(this.state.value, ref1) < 0)) {
          values = this.state.value.concat(values);
          optionsSelected = this.getOptionValuesForReactSelect(this.getSelectedModels());
        }
        if (this.props.setAsString) {
          values = values.join(',');
        }
        return CollectionPicker.__super__.onChange.call(this, values, {
          propsOnChangeValue: optionsSelected
        });
      } else {
        value = optionsSelected === null ? null : optionsSelected != null ? optionsSelected.value : void 0;
        return CollectionPicker.__super__.onChange.call(this, value, {
          propsOnChangeValue: optionsSelected
        });
      }
    };

    CollectionPicker.prototype.onLoadOptions = function (userInput, callback) {
      var chainedCallback, collection, ref, selectedModels;
      collection = this.getCollection();
      selectedModels = _.compact((ref = this.getSelectedModels()) != null ? ref : []);
      this.lastAsyncCallback = callback;
      chainedCallback = function (_this) {
        return function (error, models) {
          var optionsForReactSelect;
          if (arguments.length < 2) {
            models = error;
            error = false;
          }
          models = _this.groupSuggestionModels(userInput, models);
          if (_this.props.multi) {
            models = models.concat(selectedModels);
            collection.add(selectedModels);
          }
          optionsForReactSelect = _this.getOptionValuesForReactSelect(models);
          return _this.lastAsyncCallback(null, {
            options: optionsForReactSelect
          });
        };
      }(this);
      switch (false) {
        case this.props.asyncSuggestionCallback == null:
          this.props.asyncSuggestionCallback.call(this, collection, userInput, chainedCallback, this.props.asyncOptions);
          break;
        case collection.filterForPicker == null:
          collection.filterForPicker.call(this, userInput, chainedCallback, this.props.asyncOptions);
          break;
        default:
          this.filterSuggestionModels(collection, userInput, chainedCallback, this.props.asyncOptions);
      }
      return null;
    };

    /* weak string compare userInput to suggestion model's display value */

    CollectionPicker.prototype.filterSuggestionModels = function (collection, userInput, callback) {
      var filteredModels;
      filteredModels = _.filter(collection.models, function (_this) {
        return function (model) {
          var displayValue;
          displayValue = _this.getCollectionModelDisplayValue(model);
          return displayValue != null && Strhelp.weaklyHas(displayValue, userInput);
        };
      }(this));
      filteredModels = filteredModels.sort(function (_this) {
        return function (a, b) {
          return Strhelp.weaklyCompare(_this.getCollectionModelDisplayValue(a), _this.getCollectionModelDisplayValue(b));
        };
      }(this));
      if (typeof callback === "function") {
        callback(filteredModels);
      }
      return filteredModels;
    };

    CollectionPicker.prototype.groupSuggestionModels = function (userInput, models) {
      var bottomHits, displayValue, i, len, model, topHits;
      topHits = [];
      bottomHits = [];
      for (i = 0, len = models.length; i < len; i++) {
        model = models[i];
        displayValue = this.getCollectionModelDisplayValue(model);
        if (displayValue != null && Strhelp.weaklyStartsWith(displayValue, userInput)) {
          topHits.push(model);
        } else {
          bottomHits.push(model);
        }
      }
      return topHits.concat(bottomHits);
    };

    /*
      This is the model associated with the collectionPicker. This is required to exist because
      this is the model in which the value is saved. If this does not exist or re-created every time we
      will not be able to show the value option on the picker.
     */

    CollectionPicker.prototype.getModel = function (newProps, newContext) {
      if (newProps == null) {
        newProps = this.props;
      }
      if (newContext == null) {
        newContext = this.context;
      }
      this.valueModel = (newProps != null ? newProps.model : void 0) || (newContext != null ? newContext.model : void 0) || this.valueModel || new Backbone.Model();
      return this.valueModel;
    };

    return CollectionPicker;
  }(Datum);
}).call(undefined);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {



module.exports = __webpack_require__(41)


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.10.0
(function() {
  var StringHelpers, _;

  _ = __webpack_require__(1);

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

    StringHelpers.weaklyCompare = function(str, otherStrings, options) {
      if (options == null) {
        options = {};
      }
      return this._withOneOrArray(otherStrings, (function(_this) {
        return function(otherStr) {
          if (_this.weakValue(str, options).localeCompare(_this.weakValue(otherStr, options))) {
            return true;
          }
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
      return out.trim().toLowerCase();
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(18);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _blockEvent = __webpack_require__(44);

var _blockEvent2 = _interopRequireDefault(_blockEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = function (_React$Component) {
	_inherits(Option, _React$Component);

	function Option(props) {
		_classCallCheck(this, Option);

		var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	_createClass(Option, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = (0, _classnames2.default)(this.props.className, option.className);

			return option.disabled ? _react2.default.createElement(
				'div',
				{ className: className,
					onMouseDown: _blockEvent2.default,
					onClick: _blockEvent2.default },
				this.props.children
			) : _react2.default.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					'aria-label': option.label,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);

	return Option;
}(_react2.default.Component);

Option.propTypes = {
	children: _propTypes2.default.node,
	className: _propTypes2.default.string, // className (based on mouse position)
	instancePrefix: _propTypes2.default.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: _propTypes2.default.bool, // the option is disabled
	isFocused: _propTypes2.default.bool, // the option is focused
	isSelected: _propTypes2.default.bool, // the option is selected
	onFocus: _propTypes2.default.func, // method to handle mouseEnter on option element
	onSelect: _propTypes2.default.func, // method to handle click on option element
	onUnfocus: _propTypes2.default.func, // method to handle mouseLeave on option element
	option: _propTypes2.default.object.isRequired, // object that is base for that option
	optionIndex: _propTypes2.default.number // index of the option, used to generate unique ids for aria
};

exports.default = Option;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (event) {
	event.preventDefault();
	event.stopPropagation();
	if (event.target.tagName !== 'A' || !('href' in event.target)) {
		return;
	}
	if (event.target.target) {
		window.open(event.target.href, event.target.target);
	} else {
		window.location.href = event.target.href;
	}
};

/***/ })
/******/ ]);
});