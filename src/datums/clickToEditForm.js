(function() {
  var ClickToEditForm, Form, React, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  Form = require('./form');

  _ = require('underscore');

  module.exports = ClickToEditForm = (function(superClass) {
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

    ClickToEditForm.prototype.renderButtons = function(options) {
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

    ClickToEditForm.prototype.onEditClick = function() {
      this.isEditing = true;
      this.datumInputMode = 'edit';
      this.forceUpdate();
      return _.defer((function(_this) {
        return function() {
          return _this.focus();
        };
      })(this));
    };

    ClickToEditForm.prototype.onSaveSuccess = function() {
      ClickToEditForm.__super__.onSaveSuccess.apply(this, arguments);
      return this.stopEditing();
    };

    ClickToEditForm.prototype.onCancelClick = function() {
      this.stopEditing();
      return ClickToEditForm.__super__.onCancelClick.apply(this, arguments);
    };

    ClickToEditForm.prototype.stopEditing = function() {
      this.isEditing = false;
      this.datumInputMode = 'readonly';
      return this.forceUpdate();
    };

    return ClickToEditForm;

  })(Form);

}).call(this);
