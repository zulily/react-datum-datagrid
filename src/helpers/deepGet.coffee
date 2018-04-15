###
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
###
module.exports = deepGet = (object, pathToAttribute, isFunctional=true) ->
  current = object
  for part in pathToAttribute.split('.')
    if isFunctional && _.isFunction(current[part])
      current = current[part]()
    else if isFunctional && _.isFunction(current["get" + part.capitalize()])
      current = current["get" + part.capitalize()]()
    else if current['attributes']?[part]?
      current = current['attributes'][part]
    else if _.isArray(current)
      current = _.map current, (currentEntity) -> 
        if currentEntity? then deepGet(currentEntity, part, isFunctional) else currentEntity
    else
      current = current[part]
    break if !current?
  return current