

Backbone = require 'backbone'

module.exports = class KittenModel extends Backbone.Model
  constructor: () ->
    super
      name: "Fluffy"
      title: "His Royal Cuteness"
      description: "He's a cuddler and a lover through and through"
      forAdoption: true
      ageInMonths: 10
      createdAt: 1446520828
      imgUrl: "https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=200&no_scale_up=1"
      sponsorEmail: "kindoldcatlady@lotsofcats.com"
      comment: ""
