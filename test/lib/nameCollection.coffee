
Backbone = require 'backbone'

module.exports = class NameCollection extends Backbone.Collection
  model: Backbone.Model
  constructor: () ->
    # you can add to the names (new id) but don't change any existing
    # ids or names or the collection picker tests will break.
    #
    # I added a little bit of randomness into the ids and order. not all collections will have
    # perfectly sequential ids and we should never make assumptions on that premise
    super [
      {
        id: 2
        altId: 102
        name: "Foo Foo"
        nickName: "the foo"
      },{ 
        id: 1
        altId: 101
        name: "Fluffy"
        nickName: "the fluff"
      },{
        id: 11
        altId: 111
        name: "Mr. Cuddles"
        nickName: "the cuddles"
      },{
        id: 22
        altId: 122
        name: "Sebastian"
        nickName: "the sebastian"
      },{
        id: 23
        altId: 123
        #      1        10       20        30        40        50        60   
        name: "My cat's name is really really long and hard to pronounce"
        nickName: 'the long name'
      }
    ]
    