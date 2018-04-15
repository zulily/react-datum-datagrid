
class PuppyModel extends Backbone.Model
  save: (attrs, options={}) ->
    options.success(this);
    return true

# PUPPY_DATA is a static array of data from petfinder api
#    that gets loaded via script tag for the examples
class PuppyCollection extends Backbone.Collection
  model: PuppyModel
  constructor: ->
    super(PUPPY_DATA)


module.exports = new PuppyCollection()
  
  