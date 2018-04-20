(function() {
  var React, SortIndicator,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  module.exports = SortIndicator = (function(superClass) {
    extend(SortIndicator, superClass);

    function SortIndicator() {
      return SortIndicator.__super__.constructor.apply(this, arguments);
    }

    SortIndicator.propTypes = {
      sorted: PropTypes.oneOf(['ASC', 'DESC']),
      onSort: PropTypes.func,
      onSelectColumn: PropTypes.func
    };

    SortIndicator.prototype.render = function() {
      var className, icon;
      icon = null;
      className = 'rdd-header-icon';
      switch (this.props.sorted) {
        case 'ASC':
          icon = this.renderSortedAsc();
          className += ' rdd-sort-indicator-asc';
          break;
        case 'DESC':
          icon = this.renderSortedDesc();
          className += ' rdd-sort-indicator-desc';
          break;
        default:
          icon = this.renderUnsorted();
          className += ' rdd-sort-indicator';
      }
      return React.createElement("div", {
        "className": className,
        "title": "click to edit this cell, or double click anywhere in cell, or press enter with cell selected",
        "onClick": this.props.onClick
      }, icon);
    };

    SortIndicator.prototype.renderUnsorted = function() {
      return React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 512"
      }, React.createElement("path", {
        "d": "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
      }));
    };

    SortIndicator.prototype.renderSortedAsc = function() {
      return React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 512"
      }, React.createElement("path", {
        "d": "M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
      }));
    };

    SortIndicator.prototype.renderSortedDesc = function() {
      return React.createElement("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 512"
      }, React.createElement("path", {
        "d": "M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
      }));
    };

    return SortIndicator;

  })(React.Component);

}).call(this);
