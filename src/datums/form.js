(function() {
  var Backbone, Datum, Form, PropTypes, React, ReactDom, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  React = require('react');

  PropTypes = require('prop-types');

  ReactDom = require('react-dom');

  Datum = require('./datums/datum');

  Backbone = require('backbone');

  _ = require('underscore');

  module.exports = Form = (function(superClass) {
    extend(Form, superClass);

    Form.displayName = "react-datum.Form";

    Form.modelOrObject = function() {
      return PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Model), PropTypes.object]);
    };

    Form.propTypes = {
      model: Form.modelOrObject(),
      modelSaveMethod: PropTypes.string,
      readonly: PropTypes.bool,
      buttonPosition: PropTypes.oneOf(['top', 'bottom', 'none']),
      className: PropTypes.string,
      saveSuccessCallback: PropTypes.func,
      saveErrorCallback: PropTypes.func
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
      form: PropTypes.object
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

    Form.prototype.getChildContext = function() {
      return {
        model: this.getModel(),
        inputMode: this.getDatumInputMode(),
        form: this
      };
    };

    Form.prototype.render = function() {
      if (this.getModel() == null) {
        return null;
      }
      this._saveModelStateAtRender();
      return React.createElement("div", {
        "className": "form " + this.datumInputMode + " " + this.props.className
      }, this.renderTopButtons(), this.renderChildren(), this.renderBottomButtons(), this.renderMessages());
    };

    Form.prototype.componentDidMount = function() {
      return this.node = ReactDom.findDOMNode(this);
    };


    /*
      Gives the first editable datum focus
     */

    Form.prototype.focus = function() {
      var firstEditable;
      firstEditable = _.find(this.datums, function(d) {
        return d.isEditable();
      });
      return firstEditable != null ? firstEditable.focus() : void 0;
    };

    Form.prototype.renderChildren = function() {
      return React.createElement("div", {
        "className": "form-content"
      }, this.props.children);
    };

    Form.prototype.renderTopButtons = function() {
      if (this.props.buttonPosition !== 'top') {
        return;
      }
      return this.renderButtonContainer({
        addClass: "top"
      });
    };

    Form.prototype.renderBottomButtons = function() {
      if (this.props.buttonPosition !== 'bottom') {
        return;
      }
      return this.renderButtonContainer({
        addClass: "bottom"
      });
    };

    Form.prototype.renderButtonContainer = function(options) {
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

    Form.prototype.renderButtons = function(options) {
      return [
        React.createElement("button", {
          "key": "save",
          "ref": "saveButton",
          "className": 'btn btn-success',
          "onClick": this.onSaveClick
        }, "Save"), React.createElement("button", {
          "key": "cancel",
          "ref": "cancelButton",
          "className": 'btn',
          "onClick": this.onCancelClick
        }, "Cancel")
      ];
    };

    Form.prototype.renderMessages = function() {
      return [this.renderSuccessMessage(), this.renderErrorMessage()];
    };

    Form.prototype.renderErrorMessage = function() {
      return this.renderMessage(this.state.errorMessage, 'error');
    };

    Form.prototype.renderSuccessMessage = function() {
      return this.renderMessage(this.state.successMessage, 'success');
    };

    Form.prototype.renderMessage = function(message, className) {
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

    Form.prototype.save = function(options) {
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

    Form.prototype.validateDatums = function(options) {
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

    Form.prototype.validateModel = function(options) {
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

    Form.prototype.preceedOriginalCallback = function(obj, attr, newCallback) {
      var originalCallback;
      originalCallback = obj[attr];
      return obj[attr] = function() {
        newCallback.apply(this, arguments);
        return originalCallback != null ? originalCallback.apply(this, argumentsk) : void 0;
      };
    };


    /*
      calls Backbone model.save and calls success and error handlers.
    
      You should probably call Form.save() above instead.  It will also validate the model
      and datums.
     */

    Form.prototype.saveModel = function(options) {
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

    Form.prototype.onSaveClick = function(evt) {
      return this.save();
    };

    Form.prototype.onSaveSuccess = function(model, response, options) {
      if (options == null) {
        options = {};
      }
      this._saveModelState();
      if ((this.props.saveSuccessCallback != null) && _.isFunction(this.props.saveSuccessCallback)) {
        return this.props.saveSuccessCallback(model, response, options);
      } else {
        return this.setState({
          successMessage: "Successfully saved!",
          successAt: Date.now()
        });
      }
    };

    Form.prototype.onSaveError = function(model, response, options) {
      if (options == null) {
        options = {};
      }
      if ((this.props.saveErrorCallback != null) && _.isFunction(this.props.saveErrorCallback)) {
        return this.props.saveErrorCallback(model, response, options);
      } else {
        response = (response == null) || _.isString(response) ? response : JSON.stringify(response);
        return this.setState({
          errorMessage: "Unable to save. " + response || "Reason unknown."
        });
      }
    };

    Form.prototype.onCancelClick = function(evt) {
      this.setState({
        errorMessage: null,
        successMessage: null
      });
      this._restoreModelState();
      return this._resetDatums();
    };

    Form.prototype.getModel = function() {
      return this.props.model || this.context.model;
    };

    Form.prototype.getDatumInputMode = function() {
      if (this.props.readonly) {
        return 'readonly';
      } else {
        return this.datumInputMode;
      }
    };

    Form.prototype.getInvalidDatums = function() {
      return _.filter(this.datums, function(d) {
        return !d.validate();
      });
    };


    /*
      This method is called by the datum children when they mount
     */

    Form.prototype.addDatum = function(datumComponent) {
      if (indexOf.call(this.datums, datumComponent) < 0) {
        return this.datums.push(datumComponent);
      }
    };


    /*
      This method is called by the datum children when they unmount
     */

    Form.prototype.removeDatum = function(datumComponent) {
      var index;
      index = this.datums.indexOf(datumComponent);
      if (index < 0) {
        console.error("form.removeDatum called for datumComponent (" + datumComponent.constructor.displayName + ") that we don't know about?");
        return;
      }
      return this.datums = this.datums.slice(0, index).concat(this.datums.slice(index + 1, this.datums.length));
    };

    Form.prototype._saveModelStateAtRender = function() {
      var model;
      model = this.getModel();
      if (model === this._savedModel) {
        return;
      }
      return this._saveModelState();
    };

    Form.prototype._saveModelState = function() {
      this._savedModel = this.getModel();
      return this._savedAttrs = this._savedModel.toJSON();
    };

    Form.prototype._restoreModelState = function() {
      var model;
      model = this.getModel();
      if (model !== this._savedModel) {
        return;
      }
      return model.set(this._savedAttrs);
    };

    Form.prototype._resetDatums = function() {
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

  })(React.Component);

}).call(this);
