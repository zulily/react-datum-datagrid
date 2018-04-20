(function() {
  var HeaderCell, PropTypes, Rb, React, ReactStyles,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Rb = require('react-bootstrap');

  ReactStyles = require('./helpers/reactStyles');


  /*
    HeaderCell is a controlled component
   */

  module.exports = HeaderCell = (function(superClass) {
    extend(HeaderCell, superClass);

    function HeaderCell() {
      this._onColumnNameClick = bind(this._onColumnNameClick, this);
      this._onHideIconClick = bind(this._onHideIconClick, this);
      this._onShowIconClick = bind(this._onShowIconClick, this);
      return HeaderCell.__super__.constructor.apply(this, arguments);
    }

    HeaderCell.propTypes = {
      column: PropTypes.object,
      columnIndex: PropTypes.number,
      style: PropTypes.object,
      sorted: PropTypes.oneOf(['asc', 'desc']),
      onSort: PropTypes.func,
      onSelectColumn: PropTypes.func
    };

    HeaderCell.prototype.styles = new ReactStyles({
      icon: {
        float: 'right',
        color: '#4767AA'
      },
      wrapper: {
        includes: function() {
          return _.extend({}, this.props.style, {
            width: this.props.column.width
          });
        },
        position: 'relative',
        display: 'inline-block'
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

    HeaderCell.prototype.style = function(name) {
      var ref;
      return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {});
    };

    HeaderCell.prototype.render = function() {
      var ref;
      if ((ref = this.props.column) != null ? ref.tooltip : void 0) {
        return React.createElement("div", {
          "style": this.style('wrapper'),
          "className": "rdd-header-wrapper"
        }, React.createElement(Rb.OverlayTrigger, {
          "overlay": this._renderTooltipPopover()
        }, React.createElement("div", null, this._renderShowHideControl(), this._renderColumnName(), React.createElement("i", {
          "style": this.style('icon'),
          "className": 'fa fa-question-circle'
        }))));
      } else {
        return React.createElement("div", {
          "style": this.style('wrapper'),
          "className": "rdd-header-wrapper"
        }, this._renderShowHideControl(), this._renderColumnName());
      }
    };

    HeaderCell.prototype._renderTooltipPopover = function() {
      return React.createElement(Rb.Popover, {
        "id": "flipgridTooltipPopover"
      }, this.props.column.tooltip);
    };

    HeaderCell.prototype._renderShowHideControl = function() {
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

    HeaderCell.prototype._renderColumnName = function() {
      var name;
      name = this.props.column.name;
      return React.createElement("a", {
        "title": "click to select all in column",
        "onClick": ((function(_this) {
          return function(evt) {
            return _this._onColumnNameClick(evt);
          };
        })(this))
      }, name);
    };

    HeaderCell.prototype.getCellOverrideStyle = function(model) {
      var sval;
      sval = {};
      _.extend(sval, this.props.orientation === 'landscape' ? {
        display: 'inline-block'
      } : {
        display: 'block'
      });
      return sval;
    };

    HeaderCell.prototype._onShowIconClick = function(evt) {
      this.props.column.isHidden = false;
      return this.forceUpdate((function(_this) {
        return function() {
          var base;
          return typeof (base = _this.props).onShowColumn === "function" ? base.onShowColumn(_this, _this.props.column, evt) : void 0;
        };
      })(this));
    };

    HeaderCell.prototype._onHideIconClick = function(evt) {
      this.props.column.isHidden = true;
      return this.forceUpdate((function(_this) {
        return function() {
          var base;
          return typeof (base = _this.props).onHideColumn === "function" ? base.onHideColumn(_this, _this.props.column, evt) : void 0;
        };
      })(this));
    };

    HeaderCell.prototype._onColumnNameClick = function(evt) {
      var base;
      return typeof (base = this.props).onSelectColumn === "function" ? base.onSelectColumn(evt, this.props.columnIndex) : void 0;
    };

    return HeaderCell;

  })(React.Component);

}).call(this);
