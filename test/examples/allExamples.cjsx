React = require 'react'
ReactDOM = require 'react-dom'
Tilegrid = require 'tilegrid'
PropTypes = require 'prop-types'

Backbone = require 'backbone'
$ = require 'jquery'
_ = require 'underscore'

Th = require '../lib/testHelpers'
TestExamples = require('bumble-test/testExamples')

addScripts = ['docs/vendor/tilegrid.js']
testExamples = new TestExamples(addScripts)

PUPPY_DATA = require '../lib/puppyData'
# the examples expect these to be script tagged in and be available globally
_.extend global, 
  React: React
  ReactDOM: ReactDOM
  Backbone: Backbone
  Tilegrid: Tilegrid
  PropTypes: PropTypes
  '_': _
  '$': $
  'jQuery': $
  PUPPY_DATA: PUPPY_DATA


describe 'All examples (requires grunt build:docs)', ->
  testExamples.testAllExamples()
  
    



  
