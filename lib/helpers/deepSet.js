(function() {
  var _, deepSet;

  _ = require('underscore');


  /*
  Performs a deep set on the the value of a attribute deeply nested within this object
  
  See App.utils.deepGet comments above for example use.  anything that can get fetched
  with deepGet should be able to be set by deepSet
  
  see also /app/coffeescripts/tests/application/utils/deepGetAndSet.coffee for more examples and tests
   */

  module.exports = deepSet = function(object, pathToAttribute, value, isFunctional) {
    var current, i, lastPart, len, part, parts;
    if (isFunctional == null) {
      isFunctional = true;
    }
    current = object;
    parts = pathToAttribute.split('.');
    lastPart = _.last(parts);
    for (i = 0, len = parts.length; i < len; i++) {
      part = parts[i];
      if (part === lastPart) {
        if (isFunctional && _.isFunction(current[part])) {
          return current[part](value);
        } else {
          return current[part] = value;
        }
      }
      if (current[part] == null) {
        current[part] = {};
      }
      current = isFunctional && _.isFunction(current[part]) ? current[part]() : current[part];
    }
    return current;
  };

}).call(this);
