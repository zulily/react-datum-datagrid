# deep compare two objects.  ex:
#    compareObjects({a: 1, b: {foo: "bar"}, c: 2}, {c: 2, b: {foo: "bar"}, a: 1})
#      => true
#    compareObjects({a: 1, b: {foo: "bar"}, c: 2}, {a: 1, b: {foo: "whatever, I got paid"}, c: 2})
#      => false
# see, http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
module.exports = compareObjects = (a, b) ->
  return true if !a? && !b?
  return false unless a? && b?

  attr = null
  for attr of a
    return false if typeof(b[attr]) == "undefined"
  for attr of a
    if a[attr]
      switch typeof(a[attr])
        when "object"
          return false unless compareObjects(a[attr], b[attr])   # recurses here
        when "function"
          if typeof(b[attr]) == "undefined" || (attr != "equals" && a[attr].toString() != b[attr].toString())
            return false
        else
          return false unless a[attr] == b[attr]
    else
      return false if b[attr]
  for attr of b
    return false if typeof(a[attr]) == "undefined"
  true