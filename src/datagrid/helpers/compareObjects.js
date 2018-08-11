(function() {
  var compareObjects;

  module.exports = compareObjects = function(a, b) {
    var attr;
    if ((a == null) && (b == null)) {
      return true;
    }
    if (!((a != null) && (b != null))) {
      return false;
    }
    attr = null;
    for (attr in a) {
      if (typeof b[attr] === "undefined") {
        return false;
      }
    }
    for (attr in a) {
      if (a[attr]) {
        switch (typeof a[attr]) {
          case "object":
            if (!compareObjects(a[attr], b[attr])) {
              return false;
            }
            break;
          case "function":
            if (typeof b[attr] === "undefined" || (attr !== "equals" && a[attr].toString() !== b[attr].toString())) {
              return false;
            }
            break;
          default:
            if (a[attr] !== b[attr]) {
              return false;
            }
        }
      } else {
        if (b[attr]) {
          return false;
        }
      }
    }
    for (attr in b) {
      if (typeof a[attr] === "undefined") {
        return false;
      }
    }
    return true;
  };

}).call(this);
