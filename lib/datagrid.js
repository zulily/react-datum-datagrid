(function() {
  var Datagrid, PropTypes, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  PropTypes = require('prop-types');


  /*
    This is react-datum-datagrid.   
    
    Example:
    TODO
   */

  module.exports = Datagrid = (function(superClass) {
    extend(Datagrid, superClass);

    function Datagrid() {
      return Datagrid.__super__.constructor.apply(this, arguments);
    }

    Datagrid.displayName = "react-datum-datagrid";

    Datagrid.propTypes = {

      /*
        Collection is the array of data to be displayed.  It can
        be an array or a Backbone compatible Collection object.
       */
      collection: Datagrid.PropTypes.oneOfType([Datagrid.PropTypes.array, Datagrid.PropTypes.object])
    };

    Datagrid.prototype.render = function() {
      return React.createElement("h5", null, "I am going to grow up to be an unweildy datagrid!");
    };

    return Datagrid;

  })(React.Component);

}).call(this);
