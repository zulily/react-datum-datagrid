
/*
  gets the value of a nested member of an object.

  example:
  <code>
    |  var data = {
    |     sayulita: {
    |       fun: true,
    |       surf: true,
    |       weather: {
    |         high: 90,
    |         low: function(){ return 70; }
    |       }
    |     }
    |   }
    |  deepGet(data, 'weather.high')   # will return 90
  </code>

  There is no limit to the depth, also functions may be employed anywhere along the path if isFunctional is not set to disabled
  From the former example:
  <code>
    |  deepGet(data, 'weather.low')   # will call the function associated with 'low' which returns 70
  </code>

  see /app/coffeescripts/tests/application/utils/deepGetAndSet.coffee for more examples and tests
 */

(function() {
  var deepGet;

  module.exports = deepGet = function(object, pathToAttribute, isFunctional) {
    var current, i, len, part, ref, ref1;
    if (isFunctional == null) {
      isFunctional = true;
    }
    current = object;
    ref = pathToAttribute.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
      part = ref[i];
      if (isFunctional && _.isFunction(current[part])) {
        current = current[part]();
      } else if (isFunctional && _.isFunction(current["get" + part.capitalize()])) {
        current = current["get" + part.capitalize()]();
      } else if (((ref1 = current['attributes']) != null ? ref1[part] : void 0) != null) {
        current = current['attributes'][part];
      } else if (_.isArray(current)) {
        current = _.map(current, function(currentEntity) {
          if (currentEntity != null) {
            return deepGet(currentEntity, part, isFunctional);
          } else {
            return currentEntity;
          }
        });
      } else {
        current = current[part];
      }
      if (current == null) {
        break;
      }
    }
    return current;
  };

}).call(this);
