(function() {
  var DeepGet, Extend, GridEdit, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore');

  Extend = require('node.extend');

  DeepGet = require('./deepGet');


  /*
   */

  module.exports = GridEdit = (function() {
    function GridEdit() {
      this.onModelSaveComplete = bind(this.onModelSaveComplete, this);
      this.onModelSaveError = bind(this.onModelSaveError, this);
      this.onModelSaveSuccess = bind(this.onModelSaveSuccess, this);
    }


    /*
      Override me to conditionally enable editing on a per cell basis
     */

    GridEdit.prototype.canEditCell = function(column, model) {
      var ref, ref1, ref2;
      if (column != null ? (ref = column.datum) != null ? (ref1 = ref.prototype) != null ? typeof ref1.isLocked === "function" ? ref1.isLocked(column, model) : void 0 : void 0 : void 0 : void 0) {
        return false;
      }
      return (ref2 = column.editable) != null ? ref2 : this.props.defaultColumnDef.editable;
    };

    GridEdit.prototype.isCellEditing = function(columnIndex, rowIndex) {
      var editCell;
      editCell = this.state.editingCell;
      if (editCell == null) {
        return false;
      }
      return editCell.rowIndex === rowIndex && editCell.columnIndex === columnIndex;
    };

    GridEdit.prototype.isCellSaving = function(columnIndex, rowIndex) {
      var savingCells;
      savingCells = this.state.savingCells || {};
      if (!(_.keys(savingCells).length > 0)) {
        return false;
      }
      return savingCells[columnIndex + "_" + rowIndex] === true;
    };

    GridEdit.prototype.wasCellSaved = function(columnIndex, rowIndex) {
      var savedCells;
      savedCells = this.state.savedCells || {};
      if (!(_.keys(savedCells).length > 0)) {
        return false;
      }
      return savedCells[columnIndex + "_" + rowIndex];
    };

    GridEdit.prototype.getSaveErrors = function(columnIndex, rowIndex) {
      var saveErrors;
      saveErrors = this.state.saveErrors || {};
      if (!(_.keys(saveErrors).length > 0)) {
        return false;
      }
      return saveErrors[columnIndex + "_" + rowIndex];
    };

    GridEdit.prototype.isDatagridEditing = function() {
      return (this.state.editingCell != null) && true || false;
    };

    GridEdit.prototype.onCellEdit = function(evt, columnDef, model, columnIndex, rowIndex) {
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

    GridEdit.prototype.onCellChange = function(value, columnDef, model, columnIndex, rowIndex) {
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

    GridEdit.prototype.saveEditingCell = function() {
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


    /*
      returns a column by key or index
     */

    GridEdit.prototype.getColumn = function(keyOrIndex) {
      if (this.originalMethod != null) {
        return this.originalMethod();
      }
      if (_.isString(keyOrIndex)) {
        return _.find(this.props.columns, function(c) {
          return c.key === keyOrIndex;
        });
      } else {
        return this.props.columns[keyOrIndex];
      }
    };

    GridEdit.prototype.getModelAt = function(index) {
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

    GridEdit.prototype.getValueFromModel = function(model, attr) {
      var ref;
      return (ref = typeof model.get === "function" ? model.get(attr) : void 0) != null ? ref : model[attr];
    };

    GridEdit.prototype.getValueAt = function(colIndexOrKey, rowIndex) {
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
      columnKey = _.isNumber(colIndexOrKey) ? (ref = this.props.columns) != null ? (ref1 = ref[colIndexOrKey]) != null ? ref1.key : void 0 : void 0 : colIndexOrKey;
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
      if (this.props.disableUndo) {
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

    GridEdit.prototype.saveModel = function(model, rowEvt, options) {
      var attr, base, isDirty, newValue, oldValue, ref, ref1, revPatch, saveOptions;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        logUndo: !this.props.disableUndo,
        setOnUpdate: true
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
      this.clearCellErrors(model, rowEvt);
      saveOptions = this.getModelSaveOptions();
      saveOptions.__datagrid_rowEvt = rowEvt;
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
        this.setSaving(model, rowEvt, true);
        return (model.patch || model.save)({}, saveOptions);
      }
    };

    GridEdit.prototype.clearCellErrors = function(model, rowEvt) {
      var saveErrors;
      saveErrors = this.state.saveErrors != null ? _.extend({}, this.state.saveErrors) : {};
      delete saveErrors[rowEvt.columnIndex + "_" + rowEvt.rowIndex];
      return this.setState({
        saveErrors: saveErrors
      });
    };

    GridEdit.prototype.setSaveSuccess = function(model, rowEvt, trueOrFalse) {
      var lookupKey, savedCells;
      if (model != null) {
        if (typeof model.setDatagridSaveSuccess === "function") {
          model.setDatagridSaveSuccess(rowEvt.cellKey, trueOrFalse);
        }
      }
      lookupKey = rowEvt.columnIndex + "_" + rowEvt.rowIndex;
      savedCells = this.state.savedCells != null ? _.extend({}, this.state.savedCells) : {};
      savedCells[lookupKey] = trueOrFalse;
      this.setState({
        savedCells: savedCells
      });
      if (trueOrFalse) {
        return _.delay((function(_this) {
          return function() {
            delete savedCells[lookupKey];
            return _this.setState({
              savedCells: savedCells
            });
          };
        })(this), 5000);
      }
    };

    GridEdit.prototype.setSaveErrors = function(model, rowEvt, resp) {
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

    GridEdit.prototype.setSaving = function(model, rowEvt, trueOrFalse) {
      var savingCells;
      savingCells = this.state.savingCells || {};
      if (trueOrFalse) {
        savingCells[rowEvt.columnIndex + "_" + rowEvt.rowIndex] = true;
      } else {
        delete savingCells[rowEvt.columnIndex + "_" + rowEvt.rowIndex];
      }
      return this.setState({
        savingCells: savingCells
      });
    };

    GridEdit.prototype.onModelSaveSuccess = function(model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        this.setSaveSuccess(model, rowEvt, true);
        this.clearCellErrors(model, rowEvt);
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
        this.setSaveErrors(model, rowEvt, resp);
      }
      return this.onModelSaveComplete(model, resp, options);
    };

    GridEdit.prototype.onModelSaveComplete = function(model, resp, options) {
      var rowEvt;
      rowEvt = options != null ? options.__datagrid_rowEvt : void 0;
      if (rowEvt) {
        return this.setSaving(model, rowEvt, false);
      }
    };

    return GridEdit;

  })();

}).call(this);
