(function() {
  var Cell, Humanize, LabelCell, PropTypes, Rb, React, ReactStyles, Titleize,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Rb = require('react-bootstrap');

  ReactStyles = require('./helpers/reactStyles');

  Cell = require('./cell');

  Titleize = require('underscore.string/Titleize');

  Humanize = require('underscore.string/Humanize');

  module.exports = LabelCell = (function(superClass) {
    extend(LabelCell, superClass);

    function LabelCell() {
      this._onHideIconClick = bind(this._onHideIconClick, this);
      this._onShowIconClick = bind(this._onShowIconClick, this);
      return LabelCell.__super__.constructor.apply(this, arguments);
    }

    LabelCell.propTypes = {
      rowData: PropTypes.any,
      column: PropTypes.object,
      style: PropTypes.object,
      onHideColumn: PropTypes.func,
      onShowColumn: PropTypes.func
    };

    LabelCell.prototype.styles = new ReactStyles({
      icon: {
        float: 'right',
        color: '#4767AA'
      },
      wrapper: {
        includes: function() {
          return this.props.style;
        },
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

    LabelCell.prototype.style = function(name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    LabelCell.prototype.renderWrapped = function() {
      var ref;
      if (!((ref = this.props.column) != null ? ref.tooltip : void 0)) {
        return LabelCell.__super__.renderWrapped.call(this, React.createElement("div", {
          "style": this.style('wrapper')
        }, this._renderShowHideControl(), this.getColumnName()));
      }
      return LabelCell.__super__.renderWrapped.call(this, React.createElement("div", {
        "style": this.style('wrapper')
      }, React.createElement(Rb.OverlayTrigger, {
        "overlay": this._renderTooltipPopover()
      }, React.createElement("div", null, this._renderShowHideControl(), this.getColumnName, React.createElement("i", {
        "style": this.style('icon'),
        "className": 'fa fa-question-circle'
      })))));
    };

    LabelCell.prototype._renderTooltipPopover = function() {
      return React.createElement(Rb.Popover, {
        "id": "flipgridTooltipPopover"
      }, this.props.column.tooltip);
    };

    LabelCell.prototype._renderShowHideControl = function() {
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

    LabelCell.prototype.getColumnName = function() {
      var ref;
      return (ref = this.props.column.name) != null ? ref : Titleize(Humanize(this.props.column.key));
    };

    LabelCell.prototype.getCellDefaultStyle = function(model) {
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

    LabelCell.prototype.getCellOverrideStyle = function(model) {
      var sval;
      sval = LabelCell.__super__.getCellOverrideStyle.call(this, model);
      _.extend(sval, this.props.orientation === 'landscape' ? {
        display: 'inline-block'
      } : {
        display: 'block'
      });
      return sval;
    };

    LabelCell.prototype.getBackgroundColor = function() {
      return '#eceff6';
    };

    LabelCell.prototype._onShowIconClick = function(evt) {
      this.props.column.isHidden = false;
      return this.forceUpdate((function(_this) {
        return function() {
          var base;
          return typeof (base = _this.props).onShowColumn === "function" ? base.onShowColumn(_this, _this.props.column, evt) : void 0;
        };
      })(this));
    };

    LabelCell.prototype._onHideIconClick = function(evt) {
      this.props.column.isHidden = true;
      return this.forceUpdate((function(_this) {
        return function() {
          var base;
          return typeof (base = _this.props).onHideColumn === "function" ? base.onHideColumn(_this, _this.props.column, evt) : void 0;
        };
      })(this));
    };

    return LabelCell;

  })(Cell);

}).call(this);
