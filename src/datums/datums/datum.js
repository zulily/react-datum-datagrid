(function() {
  var Backbone, Datum, Options, PropTypes, React, ReactDOM, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  ReactDOM = require('react-dom');

  Backbone = require('backbone');

  _ = require('underscore');

  Options = require('../options');

  module.exports = Datum = (function(superClass) {
    extend(Datum, superClass);

    Datum.displayName = "react-datum.Datum";

    Datum.propTypes = {
      className: PropTypes.string,
      model: PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Model), PropTypes.object]),
      attr: PropTypes.string,
      label: PropTypes.node,
      tooltip: PropTypes.string,
      placeholder: PropTypes.node,
      inputMode: PropTypes.oneOf(['readonly', 'edit', 'inlineEdit']),
      getMetadata: PropTypes.func,
      noPopover: PropTypes.bool,
      rbOverlayProps: PropTypes.object,
      setOnChange: PropTypes.bool,
      setOnBlur: PropTypes.bool,
      saveOnSet: PropTypes.bool,
      modelSaveMethod: PropTypes.string,
      modelSaveOptions: PropTypes.object,
      savedIndicatorTimeout: PropTypes.number,
      readonly: PropTypes.bool,
      required: PropTypes.bool,
      style: PropTypes.object,
      asDiv: PropTypes.bool,
      onChange: PropTypes.func,
      value: PropTypes.node,
      stateless: PropTypes.bool
    };

    Datum.defaultProps = {
      setOnBlur: true,
      setOnChange: false,
      saveOnSet: false,
      modelSaveMethod: 'save',
      savedIndicatorTimeout: 5000
    };

    Datum.contextTypes = {
      model: PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Model), PropTypes.object]),
      inputMode: PropTypes.oneOf(['readonly', 'edit', 'inlineEdit']),
      form: PropTypes.object
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

    Datum.prototype.initializeState = function() {
      var ref;
      return this.state = _.extend((ref = this.state) != null ? ref : {}, {
        value: this.getModelValue(),
        errors: [],
        isDirty: false,
        saving: false,
        saved: null
      });
    };

    Datum.prototype.componentWillMount = function() {};

    Datum.prototype.componentDidMount = function() {
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

    Datum.prototype.componentWillReceiveProps = function(nextProps) {
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

    Datum.prototype.componentWillUnmount = function() {
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

    Datum.prototype.render = function() {
      return this.renderDatumWrapper((function(_this) {
        return function() {
          if (_this.isEditing()) {
            return _this.renderForInput();
          } else {
            return _this.renderForDisplay();
          }
        };
      })(this));
    };

    Datum.prototype.renderDatumWrapper = function(contentFn) {
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

    Datum.prototype.renderForDisplay = function() {
      return React.createElement("span", null, this.renderLabel(), this.renderValueOrPlaceholder(), this.renderIcons());
    };

    Datum.prototype.renderLabel = function() {
      var label, labelProps, tooltip;
      labelProps = {};
      tooltip = this.getPropOrMetadata('tooltip');
      label = this.getPropOrMetadata('label') != null ? this.renderWithPopover(React.createElement("label", Object.assign({}, labelProps), this.getPropOrMetadata('label')), tooltip, 'datumTooltip', 'datum-tooltip') : null;
      return label;
    };


    /*
      Override this method only if you need to not render the placeholder.
     */

    Datum.prototype.renderValueOrPlaceholder = function() {
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

    Datum.prototype.renderValueForDisplay = function() {
      return this.getValueForDisplay();
    };

    Datum.prototype.renderWrappedDisplayValue = function(value) {
      return React.createElement("span", {
        "className": "datum-display-value",
        "onClick": this.onEditClick,
        "style": this.props.style
      }, value);
    };

    Datum.prototype.renderPlaceholder = function() {
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

    Datum.prototype.renderEllipsizedValue = function(value, options) {
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

    Datum.prototype.renderForInput = function() {
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

    Datum.prototype.renderInput = function() {
      return React.createElement("input", Object.assign({}, this.getInputComponentOptions()));
    };


    /*
      Override / extend this method to add or alter icons presented after datum.
    
      Datum implementation renders the error icon if needed.
     */

    Datum.prototype.renderIcons = function() {
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

    Datum.prototype.renderErrors = function() {
      var error, errors, i, j, len, ref;
      errors = [];
      if ((this.getReactBootstrap() != null) && !this.props.noPopover) {
        ref = this.state.errors;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          error = ref[i];
          errors.push(React.createElement("div", {
            "key": "errorIndexKey-" + i
          }, error));
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

    Datum.prototype.renderWithPopover = function(value, tooltip, popoverId, valueClass) {

      /* !pragma coverage-skip-block */
      var Rb, popover, rValue, rbOverlayProps;
      if (tooltip == null) {
        return value;
      }
      Rb = this.getReactBootstrap();
      if ((Rb != null) && !this.props.noPopover) {
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

    Datum.prototype.getRbOverlayProps = function(value, popoverId) {

      /* !pragma coverage-skip-block */
      var ref;
      return (ref = this.props.rbOverlayProps) != null ? ref : Options.get('RbOverlayProps');
    };


    /*
      This method can be overriden to provide custom determination of dirty state.
      dirty meaning, has the input value changed.  The base implementation assumes
      that the base behavior of setting state.value to null on model.set() happens.
     */

    Datum.prototype.isDirty = function() {
      return this.state.isDirty;
    };


    /*
      This method is called to determine if the inputMode (prop, context) is one
      of the editable types.  ('edit' or 'inlineEdit')
    
      Note that a return of true does NOT indicate that the Datum is in its
      edit display.  If the component is an inputMode='inlineEdit', in may be
      showing it's display presentation.  See also isEditing()
     */

    Datum.prototype.isEditable = function() {
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

    Datum.prototype.isEditing = function() {
      var inputMode;
      inputMode = this.getInputMode();
      return inputMode === 'edit' || (this.isInlineEdit() && this.constructor.inlineEditor === this);
    };

    Datum.prototype.isInlineEdit = function() {
      return this.getInputMode() === 'inlineEdit';
    };

    Datum.prototype.cancelEdit = function() {
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

    Datum.prototype.addValidations = function(validations) {
      if (!_.isArray(validations)) {
        validations = [validations];
      }
      return this.validations = this.validations.concat(validations);
    };

    Datum.prototype.getInputMode = function() {
      if (this.props.readonly) {
        return "readonly";
      }
      return this.props.inputMode || this.context.inputMode || "readonly";
    };

    Datum.prototype.getInputComponentOptions = function() {
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

    Datum.prototype.getValueForDisplay = function() {
      return this.getModelValue();
    };


    /*
      Extend this method to coerce or intepret the value from the model
      that is displayed when in input
     */

    Datum.prototype.getValueForInput = function() {
      if (!this.props.stateless && this.state.value !== void 0) {
        return this.state.value;
      } else {
        return this.getModelValue();
      }
    };


    /*
      DEPRECATED (use getValueForInput): this method returns the value in the input as seen by user
     */

    Datum.prototype.getInputValue = function() {
      return this.state.value;
    };


    /*
      Extend this method to change how to get the input element's value from a
      change event.   The base class impl get's the value from event.target.value
      by default.
     */

    Datum.prototype.getValueFromInput = function(event) {
      var ref, ref1, ref2;
      return (ref = (ref1 = event != null ? (ref2 = event.target) != null ? ref2.value : void 0 : void 0) != null ? ref1 : event != null ? event.value : void 0) != null ? ref : event;
    };


    /*
      returns the Backbone Model currently associated with the datum.
     */

    Datum.prototype.getModel = function(newProps, newContext) {
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

    Datum.prototype.getModelValue = function(newProps, newContext) {
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

    Datum.prototype.getAttr = function(props) {
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

    Datum.prototype.setModelValue = function(value, options) {
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

    Datum.prototype.saveModel = function() {
      var model;
      model = this.getModel();
      if (model == null) {
        return;
      }
      if (_.isFunction(model[this.props.modelSaveMethod])) {
        return this.setState({
          saving: true
        }, (function(_this) {
          return function() {
            return model[_this.props.modelSaveMethod]({}, _this.getModelSaveOptions());
          };
        })(this));
      } else {
        return console.error("Datum:setModelValue - saveOnSet true but modelSaveMethod (" + this.props.modelSaveMethod + ") is not a function on model");
      }
    };

    Datum.prototype.getModelSaveOptions = function() {
      var originalError, originalSuccess, saveOptions;
      saveOptions = _.extend({}, this.props.modelSaveOptions);
      originalSuccess = saveOptions.success;
      originalError = saveOptions.error;
      saveOptions.success = (function(_this) {
        return function(model, resp) {
          _this.onModelSaveSuccess(model, resp);
          return typeof originalSuccess === "function" ? originalSuccess(model, resp, _this) : void 0;
        };
      })(this);
      saveOptions.error = (function(_this) {
        return function(model, resp) {
          _this.onModelSaveError(model, resp);
          return typeof originalError === "function" ? originalError(model, resp, _this) : void 0;
        };
      })(this);
      return saveOptions;
    };

    Datum.prototype.getEllipsizeAt = function() {
      return this.props.ellipsizeAt;
    };


    /*
      Override / extend this method to add conditional css classes to the outer datum element
     */

    Datum.prototype.getFullClassName = function() {
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

    Datum.prototype.getPropOrMetadata = function(prop) {
      var base, ref;
      if (this.props[prop] !== void 0) {
        return this.props[prop];
      }
      return (typeof (base = this.props).getMetadata === "function" ? base.getMetadata(prop, this) : void 0) || ((ref = this.getModel()) != null ? typeof ref.getDatumMetadata === "function" ? ref.getDatumMetadata(prop, this) : void 0 : void 0) || void 0;
    };

    Datum.prototype.getReactBootstrap = function() {
      return Options.get('ReactBootstrap') || (typeof window !== "undefined" && window !== null ? window.ReactBootstrap : void 0);
    };

    Datum.prototype.shouldSetOnChange = function() {
      return this.props.setOnChange === true || (this.isInlineEdit() && !this.props.setOnChange === false);
    };

    Datum.prototype.shouldSetOnBlur = function() {
      return this.props.setOnBlur === true && !this.shouldSetOnChange() && !this.props.multi;
    };

    Datum.prototype.onEditClick = function(synthEvent) {
      var ref;
      if (this.inlineToEditMode()) {
        synthEvent.stopPropagation();
        return (ref = synthEvent.nativeEvent) != null ? typeof ref.stopImmediatePropagation === "function" ? ref.stopImmediatePropagation() : void 0 : void 0;
      }
    };

    Datum.prototype.onChange = function(event, options) {
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
      if ((this.props.onChange != null) && !options.silent) {
        return this.props.onChange(options.propsOnChangeValue || value, this, options);
      }
    };

    Datum.prototype.onBlur = function(event) {
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

    Datum.prototype.onModelSaveSuccess = function(model, resp) {
      this.setState({
        saving: false,
        saved: true
      });
      if (this.props.savedIndicatorTimeout != null) {
        return _.delay(((function(_this) {
          return function() {
            return _this.setState({
              saved: null
            });
          };
        })(this)), this.props.savedIndicatorTimeout);
      }
    };

    Datum.prototype.onModelSaveError = function(model, resp) {
      var errors, ref, ref1;
      errors = this.state.errors || [];
      errors.push("Unable to save value. Error: " + ((ref = (ref1 = resp.responseText) != null ? ref1 : resp.statusText) != null ? ref : resp));
      this.setState({
        saving: false,
        saved: false,
        errors: errors
      });
      if (this.props.savedIndicatorTimeout != null) {
        return _.delay((function(_this) {
          return function() {
            return _this.setState({
              saved: null
            });
          };
        })(this), this.props.savedIndicatorTimeout);
      }
    };


    /*
      Extend this method to run code when the model value change is detected
      when props are changed
     */

    Datum.prototype.onModelValueChange = function(oldModelValue, newModelValue) {
      return this.setState({
        value: newModelValue
      });
    };

    Datum.prototype.onDocumentClick = function(evt) {
      if (this.isInlineEdit() && this.isEditing() && !this.isElementOrParentOf(evt.target, ReactDOM.findDOMNode(this))) {
        return this.inlineToDisplayMode();
      }
    };

    Datum.prototype.onDocumentKeydown = function(evt) {
      if (evt.keyCode === 27 && (typeof this.isInlineEdit === "function" ? this.isInlineEdit() : void 0) && (typeof this.isEditing === "function" ? this.isEditing() : void 0)) {
        return this.inlineToDisplayMode();
      }
    };

    Datum.prototype.isElementOrParentOf = function(elementInQuestion, parentElement) {
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

    Datum.prototype.hasInputValueChanged = function() {
      var inputValue;
      inputValue = this.getInputValue();
      return inputValue !== void 0 && inputValue !== this.getModelValue();
    };

    Datum.prototype.inlineToDisplayMode = function() {
      if (!this.isInlineEdit()) {
        return false;
      }
      if (this.constructor.inlineEditor === this) {
        this.constructor.inlineEditor = null;
        this.forceUpdate();
      }
      return true;
    };

    Datum.prototype.inlineToEditMode = function() {
      if (!this.isInlineEdit()) {
        return false;
      }
      if (this.constructor.inlineEditor != null) {
        this.constructor.inlineEditor.inlineToDisplayMode();
      }
      this.constructor.inlineEditor = this;
      this.forceUpdate();
      _.defer((function(_this) {
        return function() {
          return _this.focus();
        };
      })(this));
      return true;
    };

    Datum.prototype.onInputKeyDown = function(event) {
      var base;
      return typeof (base = this.props).onKeyDown === "function" ? base.onKeyDown(event) : void 0;
    };

    Datum.prototype.setValue = function(newValue, options) {
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

    Datum.prototype.getInputComponent = function() {
      return this.inputComponent;
    };

    Datum.prototype.onInputRef = function(input) {
      return this.inputComponent = input;
    };

    Datum.prototype.focus = function() {
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

    Datum.prototype.validate = function(value) {
      var errors, j, len, ref, valid, validation;
      if (value == null) {
        value = this.getValueForInput();
      }
      this.setState({
        errors: []
      });
      errors = [];
      ref = this.validations;
      for (j = 0, len = ref.length; j < len; j++) {
        validation = ref[j];
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

    Datum.prototype.validateRequired = function(value) {
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

    Datum.prototype.clearErrors = function() {
      if (_.isArray(this.state.errors) && this.state.errors.length > 0) {
        return this.setState({
          errors: []
        });
      }
    };

    return Datum;

  })(React.Component);

}).call(this);
