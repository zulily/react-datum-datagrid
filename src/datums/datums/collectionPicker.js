(function() {
  var Backbone, CollectionPicker, Datum, PropTypes, React, ReactDOM, Select, Strhelp, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  React = require('react');

  ReactDOM = require('react-dom');

  PropTypes = require('prop-types');

  Backbone = require('backbone');

  _ = require('underscore');

  Strhelp = require('bumble-strings');

  Datum = require('./datum');

  Select = require('react-select');

  module.exports = CollectionPicker = (function(superClass) {
    extend(CollectionPicker, superClass);

    CollectionPicker.displayName = "react-datum.CollectionPicker";

    CollectionPicker.propTypes = _.extend({}, Datum.propTypes, {
      collection: PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Collection), PropTypes.string, PropTypes.array]),
      ellipsizeAt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
      reverseEllipsis: PropTypes.bool,
      optionComponent: PropTypes.func,
      valueComponent: PropTypes.func,
      fetchUnknownModelsInCollection: PropTypes.bool,
      displayAttr: PropTypes.string,
      optionSaveAttr: PropTypes.string,
      displayComponent: PropTypes.any,
      synchronousLoading: PropTypes.bool,
      isLoading: PropTypes.bool,
      asyncSuggestionCallback: PropTypes.func,
      multi: PropTypes.bool,
      csvDisplay: PropTypes.bool,
      editPlaceholder: PropTypes.string,
      setAsString: PropTypes.bool,
      displayModelValue: PropTypes.bool
    });

    CollectionPicker.defaultProps = _.extend({}, Datum.defaultProps, {
      ellipsizeAt: 35,
      fetchUnknownModelsInCollection: true,
      loading: false,
      attr: 'value'
    });

    CollectionPicker.contextTypes = _.extend({}, Datum.contextTypes, {
      collection: PropTypes.oneOfType([PropTypes.instanceOf(Backbone.Collection), PropTypes.string])
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

    CollectionPicker.prototype.render = function() {
      return CollectionPicker.__super__.render.apply(this, arguments);
    };

    CollectionPicker.prototype.renderValueForDisplay = function() {
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
        collectionValues = modelValues.map((function(_this) {
          return function(modelId) {
            var ref;
            return (ref = _this.getCollectionModelDisplayValue(modelId, collection)) != null ? ref : modelId;
          };
        })(this));
        return this.renderEllipsizedValue(collectionValues.join(', '));
      } else {
        return modelValues.map((function(_this) {
          return function(modelValue) {
            return _this.renderCollectionDisplayValue(modelValue, collection);
          };
        })(this));
      }
    };

    CollectionPicker.prototype.renderCollectionDisplayValue = function(modelId, collection) {
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

    CollectionPicker.prototype.renderInput = function() {
      if (this.props.synchronousLoading) {
        return React.createElement(Select["default"], Object.assign({}, this.getSelectOptions()));
      } else {
        return React.createElement(Select.Async, Object.assign({}, this.getSelectAsyncOptions()), ((function(_this) {
          return function(props) {
            var collection;
            collection = _this.getCollection();
            if ((collection.filterForPicker != null) || (_this.props.asyncLoadCallback != null)) {
              props.filterOptions = null;
            }
            props.value = _this.getValueForInput();
            props.ref = 'select';
            return React.createElement(Select["default"], Object.assign({}, props));
          };
        })(this)));
      }
    };

    CollectionPicker.prototype.getCollection = function() {
      var collection;
      collection = this.props.collection || this.context.collection;
      if (!(collection instanceof Backbone.Collection)) {
        return new Backbone.Collection(collection);
      }
      return collection;
    };


    /*
      TODO: make this method public.  useful for extensions and used by some
     */

    CollectionPicker.prototype._getCollectionModelById = function(modelOrId) {
      var collectionModel, onSync, ref;
      if (_.isNumber(modelOrId) || _.isString(modelOrId)) {
        collectionModel = (ref = this.getCollection()) != null ? ref.get(modelOrId, {
          add: this.props.fetchUnknownModelsInCollection
        }) : void 0;
        onSync = (function(_this) {
          return function() {
            _.defer(function() {
              return _this._onFirstCollectionModelSync(collectionModel);
            });
            return collectionModel != null ? typeof collectionModel.off === "function" ? collectionModel.off('sync', onSync) : void 0 : void 0;
          };
        })(this);
        if (collectionModel != null) {
          if (typeof collectionModel.on === "function") {
            collectionModel.on('sync', onSync);
          }
        }
        return collectionModel;
      }
      return modelOrId;
    };

    CollectionPicker.prototype._onFirstCollectionModelSync = function(collectionModel) {
      var ref;
      if ((ref = this.getModel()) != null) {
        if (typeof ref.trigger === "function") {
          ref.trigger('invalidate');
        }
      }
      return this.forceUpdate();
    };

    CollectionPicker.prototype.getCollectionModelDisplayValue = function(modelId, collection) {
      var displayValue, model, ref;
      if (!modelId) {
        return null;
      }
      if (this.props.displayModelValue) {
        return modelId.toString();
      }
      model = this._getCollectionModelById(modelId);
      if (model != null) {
        if (!_.isFunction(model.toString) && (this.props.displayAttr == null)) {
          throw new Error(this.constructor.displayName + ": You need to specify a displayAttr prop or model must have toString() method");
        }
        displayValue = this.props.displayAttr != null ? (ref = typeof model.get === "function" ? model.get(this.props.displayAttr) : void 0) != null ? ref : model[this.props.displayAttr] : typeof model.toString === "function" ? model.toString() : void 0;
      } else {
        displayValue = null;
      }
      return displayValue;
    };

    CollectionPicker.prototype.getOptionSaveValue = function(modelId, collection) {
      var model, ref, ref1, ref2;
      model = this._getCollectionModelById(modelId);
      if ((model != null) && (this.props.optionSaveAttr == null)) {
        return model.id;
      }
      return (ref = (ref1 = (ref2 = model != null ? typeof model.get === "function" ? model.get(this.props.optionSaveAttr) : void 0 : void 0) != null ? ref2 : model != null ? model[this.props.optionSaveAttr] : void 0) != null ? ref1 : model != null ? model.id : void 0) != null ? ref : modelId;
    };

    CollectionPicker.prototype.getModelValue = function(newProps) {
      var modelValue;
      if (newProps == null) {
        newProps = this.props;
      }
      modelValue = CollectionPicker.__super__.getModelValue.apply(this, arguments);
      if (newProps.multi) {
        modelValue = (function() {
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
        })();
        modelValue = _.compact(_.unique(_.flatten(modelValue)));
      }
      return modelValue;
    };

    CollectionPicker.prototype.getSelectOptions = function() {
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

    CollectionPicker.prototype.getSelectAsyncOptions = function() {
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

    CollectionPicker.prototype.hasInputValueChanged = function() {
      return this.getInputValue() !== this.getModelValue();
    };

    CollectionPicker.prototype.getInputComponent = function() {
      return ReactDOM.findDOMNode(this).querySelector('input');
    };

    CollectionPicker.prototype.getSelectedModels = function() {
      var ref;
      return (ref = this.getCollection()) != null ? ref.get(this.getInputValue()) : void 0;
    };

    CollectionPicker.prototype.focus = function() {
      var ref;
      return (ref = this.getInputComponent()) != null ? typeof ref.focus === "function" ? ref.focus() : void 0 : void 0;
    };

    CollectionPicker.prototype.getOptionValuesForReactSelect = function(models) {
      if (models == null) {
        models = [];
      }
      return _.map(models, (function(_this) {
        return function(m) {
          return {
            label: _this.getCollectionModelDisplayValue(m),
            value: _this.getOptionSaveValue(m),
            model: m
          };
        };
      })(this));
    };


    /*
     Extends Datum class - react-select returns array of options and not a synth event
     super expects a synth event but only uses value.
    
     Also note that the value passed back to the usage through @props.onChange is
     the option object(s) for the currently selected option(s)
     */

    CollectionPicker.prototype.onChange = function(optionsSelected) {
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

    CollectionPicker.prototype.onLoadOptions = function(userInput, callback) {
      var chainedCallback, collection, ref, selectedModels;
      collection = this.getCollection();
      selectedModels = _.compact((ref = this.getSelectedModels()) != null ? ref : []);
      this.lastAsyncCallback = callback;
      chainedCallback = (function(_this) {
        return function(error, models) {
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
      })(this);
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

    CollectionPicker.prototype.filterSuggestionModels = function(collection, userInput, callback) {
      var filteredModels;
      filteredModels = _.filter(collection.models, (function(_this) {
        return function(model) {
          var displayValue;
          displayValue = _this.getCollectionModelDisplayValue(model);
          return (displayValue != null) && Strhelp.weaklyHas(displayValue, userInput);
        };
      })(this));
      filteredModels = filteredModels.sort((function(_this) {
        return function(a, b) {
          return Strhelp.weaklyCompare(_this.getCollectionModelDisplayValue(a), _this.getCollectionModelDisplayValue(b));
        };
      })(this));
      if (typeof callback === "function") {
        callback(filteredModels);
      }
      return filteredModels;
    };

    CollectionPicker.prototype.groupSuggestionModels = function(userInput, models) {
      var bottomHits, displayValue, i, len, model, topHits;
      topHits = [];
      bottomHits = [];
      for (i = 0, len = models.length; i < len; i++) {
        model = models[i];
        displayValue = this.getCollectionModelDisplayValue(model);
        if ((displayValue != null) && Strhelp.weaklyStartsWith(displayValue, userInput)) {
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

    CollectionPicker.prototype.getModel = function(newProps, newContext) {
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

  })(Datum);

}).call(this);
