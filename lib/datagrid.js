(function() {
  var Datagrid, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  module.exports = Datagrid = (function(superClass) {
    extend(Datagrid, superClass);

    function Datagrid() {
      return Datagrid.__super__.constructor.apply(this, arguments);
    }

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.prototype.render = function() {
      return React.createElement("h5", null, "I am going to grow up to be an unweildy datagrid!");
    };

    return Datagrid;

  })(React.Component);

}).call(this);
