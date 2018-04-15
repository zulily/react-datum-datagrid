(function() {
  var $, DeepGet, GridEdit, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore');

  $ = require('jquery');

  DeepGet = require('./helpers/deepGet');


  /*
   */

  module.exports = GridEdit = (function() {
    function GridEdit() {
      this.onModelSaveComplete = bind(this.onModelSaveComplete, this);
      this.onModelSaveError = bind(this.onModelSaveError, this);
      this.onModelSaveSuccess = bind(this.onModelSaveSuccess, this);
    }

    GridEdit.prototype.getCollection = function() {
      return this.props.collection;
    };


    /*
      returns columns with a defaulted name, formatter, header component
     */

    GridEdit.prototype.getColumns = function(columns) {
      if (columns == null) {
        columns = null;
      }
      if (this.originalMethod != null) {
        return this.originalMethod(columns);
      }
      return this.props.columns;
    };


    /*
      returns a column by key or index
     */

    GridEdit.prototype.getColumn = function(keyOrIndex) {
      var columns;
      if (this.originalMethod != null) {
        return this.originalMethod();
      }
      columns = this.getColumns();
      if (_.isString(keyOrIndex)) {
        return _.find(this.getColumns(), function(c) {
          return c.key === keyOrIndex;
        });
      } else {
        return columns[keyOrIndex];
      }
    };

    GridEdit.prototype.getModelAt = function(index) {
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

    GridEdit.prototype.getValueFromModel = function(model, attr) {
      var ref;
      return (ref = typeof model.get === "function" ? model.get(attr) : void 0) != null ? ref : model[attr];
    };

    GridEdit.prototype.getValueAt = function(rowIndex, colIndexOrKey) {
      var columnKey, datum, model, ref;
      ref = this.getModelColumnKeyAt(rowIndex, colIndexOrKey), model = ref[0], columnKey = ref[1], datum = ref[2];
      if (!((model != null) && (columnKey != null))) {
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

    GridEdit.prototype.getExportValue = function(model, column, options) {
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

    GridEdit.prototype.getModelColumnKeyAt = function(rowIndex, colIndexOrKey) {
      var columnKey, model, ref, ref1;
      model = this.getModelAt(rowIndex);
      columnKey = _.isNumber(colIndexOrKey) ? (ref = this.getColumns()) != null ? (ref1 = ref[colIndexOrKey]) != null ? ref1.key : void 0 : void 0 : colIndexOrKey;
      return [model, columnKey];
    };

    GridEdit.prototype.setValueOnModel = function(model, columnKey, value, saveOptions) {
      var attr, column, result;
      attr = columnKey;
      column = this.getColumn(columnKey);
      if (!((column != null) && this.validateCell(model, column, value, saveOptions))) {
        return false;
      }
      result = _.isFunction(model.set) ? model.set(attr, value) : model[attr] = value;
      return result;
    };

    GridEdit.prototype.setValueAt = function(rowIndex, colIndexOrKey, value) {
      var columnKey, model, ref;
      ref = this.getModelColumnKeyAt(rowIndex, colIndexOrKey), model = ref[0], columnKey = ref[1];
      if (!((model != null) && (columnKey != null))) {
        return null;
      }
      return this.setValueOnModel(model, columnKey);
    };

    GridEdit.prototype.validateCell = function(model, column, value, saveOptions) {
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

    GridEdit.prototype.getModelSaveOptions = function() {
      return {
        success: (function(_this) {
          return function() {
            return _this.onModelSaveSuccess.apply(_this, arguments);
          };
        })(this),
        error: (function(_this) {
          return function() {
            return _this.onModelSaveError.apply(_this, arguments);
          };
        })(this)
      };
    };


    /*
    This method will log a batch of actions, relying on
    debounce to ensure the actions are collected properly.
     */

    GridEdit.prototype._logUndo = function(model, rowEvt, options) {
      if (options == null) {
        options = {};
      }
      if (!this.props.enableUndo) {
        return;
      }
      this.undo[this.undoIndex++] = this.constructor._batchUndoRequests;
      return this.constructor._batchUndoRequests = [];
    };

    GridEdit.prototype.resetUndo = function() {
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

    GridEdit.prototype.doUndo = function() {
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
        rowIndex: 0
        updated: "24"
      }
     */

    GridEdit.prototype.saveModel = function(model, rowEvt, options) {
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

    GridEdit.prototype.clearCellErrors = function(model, columnKey) {
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

    GridEdit.prototype.setSaveSuccess = function(model, attr, trueOrFalse) {
      if (_.isFunction(model.setDatagridSaveSuccess)) {
        return model.setDatagridSaveSuccess(attr, trueOrFalse);
      } else {
        if (model.__datagridSaveSuccess == null) {
          model.__datagridSaveSuccess = {};
        }
        return model.__datagridSaveSuccess[attr] = trueOrFalse;
      }
    };

    GridEdit.prototype.setSaveErrors = function(model, attr, resp) {
      if (_.isFunction(model.setDatagridSaveErrors)) {
        return model.setDatagridSaveErrors(attr, resp);
      } else {
        if (model.__datagridSaveErrors == null) {
          model.__datagridSaveErrors = {};
        }
        return model.__datagridSaveErrors[attr] = resp;
      }
    };

    GridEdit.prototype.setSaving = function(model, attr, trueOrFalse) {
      if (_.isFunction(model.setDatagridSaving)) {
        return model.setDatagridSaving(attr, trueOrFalse);
      } else {
        if (model.__datagridSaving == null) {
          model.__datagridSaving = {};
        }
        return model.__datagridSaving[attr] = trueOrFalse;
      }
    };

    GridEdit.prototype.onModelSaveSuccess = function(model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        this.setSaveSuccess(model, rowEvt.cellKey, true);
        this.clearCellErrors(model);
      }
      return this.onModelSaveComplete(model, resp, options);
    };

    GridEdit.prototype.onModelSaveError = function(model, resp, options) {
      var rowEvt;
      if (!this.props.silentSaveErrors) {
        throw "Unable to save changes<br><br>" + (JSON.stringify(resp));
      }
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt != null) {
        this.setSaveErrors(model, rowEvt.cellKey, resp);
      }
      return this.onModelSaveComplete(model, resp, options);
    };

    GridEdit.prototype.onModelSaveComplete = function(model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        return this.setSaving(model, rowEvt.cellKey, false);
      }
    };

    return GridEdit;

  })();

}).call(this);
