(function() {
  var ErrorBoundary, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('react');

  module.exports = ErrorBoundary = (function(superClass) {
    extend(ErrorBoundary, superClass);

    function ErrorBoundary(props) {
      ErrorBoundary.__super__.constructor.call(this, props);
      this.state = {
        error: null,
        errorInfo: null
      };
    }

    ErrorBoundary.prototype.componentDidCatch = function(error, errorInfo) {
      return this.setState({
        error: error,
        errorInfo: errorInfo
      });
    };

    ErrorBoundary.prototype.render = function() {
      if (this.state.error) {
        return React.createElement("div", null, React.createElement("h5", null, "This component hath crashed"), React.createElement("p", {
          "className": "red"
        }, this.state.error && this.state.error.toString()), React.createElement("div", null, "Component Stack Error Details: "), React.createElement("p", {
          "className": "red"
        }, this.state.errorInfo.componentStack));
      }
      return this.props.children;
    };

    return ErrorBoundary;

  })(React.Component);

}).call(this);
