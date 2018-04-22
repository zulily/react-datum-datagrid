(function() {
  var HeaderCell, PropTypes, Rb, React, ReactStyles, SavingIndicator, SortIndicator,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');

  Rb = require('react-bootstrap');

  ReactStyles = require('./helpers/reactStyles');

  SortIndicator = require('./helpers/sortIndicator');

  SavingIndicator = require('./helpers/savingIndicator');


  /*
    HeaderCell is a controlled component
   */

  module.exports = HeaderCell = (function(superClass) {
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
        includes: function() {
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

    HeaderCell.prototype._renderTooltipPopover = function() {
      return React.createElement(Rb.Popover, {
        "id": "flipgridTooltipPopover"
      }, this.props.column.tooltip);
    };

    HeaderCell.prototype._renderIcons = function() {
      return React.createElement("div", {
        "className": 'rdd-header-icons'
      }, this._renderSortIndicator());
    };

    HeaderCell.prototype._renderSortIndicator = function() {
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

    HeaderCell.prototype._renderSpinnySpinner = function() {
      return React.createElement(SavingIndicator, null);
    };

    HeaderCell.prototype._onSort = function() {
      var direction;
      direction = (function() {
        switch (this.props.sorted) {
          case null:
          case void 0:
            return 'ASC';
          case 'ASC':
            return 'DESC';
          case 'DESC':
            return null;
        }
      }).call(this);
      return this.props.onSort(this.props.columnIndex, this.props.column, direction);
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

    HeaderCell.prototype._onColumnNameClick = function(evt) {
      var base;
      return typeof (base = this.props).onSelectColumn === "function" ? base.onSelectColumn(evt, this.props.columnIndex) : void 0;
    };

    return HeaderCell;

  })(React.Component);

}).call(this);
