
_ = require('underscore')

###
Performs a deep set on the the value of a attribute deeply nested within this object

See deepGet comments above for example use.  anything that can get fetched
with deepGet should be able to be set by deepSet

see also /app/coffeescripts/tests/application/utils/deepGetAndSet.coffee for more examples and tests
###
module.exports = deepSet = (object, pathToAttribute, value, isFunctional=true) ->
  current = object
  parts = pathToAttribute.split('.')
  lastPart = _.last(parts)
  for part in parts
    if part == lastPart
      return if isFunctional && _.isFunction(current[part]) then current[part](value) else current[part] = value
    # create missing parts (this might need to be optional at some point
    current[part] = {} unless current[part]?
    current = if isFunctional && _.isFunction(current[part]) then current[part]() else current[part]

  return current
