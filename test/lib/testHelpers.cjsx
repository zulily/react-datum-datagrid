###
  utilities for writing tests and aliases for long ass, no fucking way I'm typing
  that out, React methods
###
_ = require 'underscore'

React = require 'react'
ReactDOM = require 'react-dom'
ReactTest = require('react-dom/test-utils'); 

$ = require 'jquery'

###
  leave this in here so tests can be debugged using node-inspector using
  ```
  coffee --nodejs --debug-brk scripts/testRunner.coffee test/form/formSaving.cjsx
  ``` 
  Then hit run in node-inspector UI and it will stop here with the tests loaded so you can
  set breakpoints in them in the debugger
###
debugger 


module.exports = class TestHelpers
  # these are aliases of React test util names that are TFL
  @findByClass:        ReactTest.scryRenderedDOMComponentsWithClass
  @findByTag:          ReactTest.scryRenderedDOMComponentsWithTag
  @render:             ReactTest.renderIntoDocument
  @Simulate:           ReactTest.Simulate

  @domNode: (component) ->
    ReactDOM.findDOMNode(component)


  @domNodeByClass: (component, className) ->
    c = @findByClass(component, className)
    return @domNode(c[0])


  @domNodeByTag: (component, tag) ->
    c = @findByTag(component, tag)
    return @domNode(c[0])


  @dumpHtml: (component) ->
    me = "dumpHtml"
    if component?
      node = @domNode(component)
      if node?
        console.log me, node.outerHTML
      else
        console.log me, "node not found for component:", component
    else
      console.log me, 'component passed is null or undefined'


  @changeDatumAndTestValid = (component, newValue, shouldBeValid=true) ->
    @changeDatumValue(component, newValue)
    iconsExpected = if shouldBeValid then 0 else 1
    @findByClass(component, 'datum-invalid').length.should.be.equal(iconsExpected, "expected to find one icon")


  @changeDatumValue = (component, newValue, options={}) ->
    options = _.defaults options,
      blur: true
      
    inputNode = @domNodeByTag(component, 'input')
    inputNode.value = newValue
    ReactTest.Simulate.change(inputNode)
    ReactTest.Simulate.blur(inputNode) if options.blur
    
    return inputNode
    
    
  @testDatumInput = (datum, value) ->
    datum.isEditing().should.equal true, "datum.isEditing()" 
    datumNode = @domNode(datum)
    $input = $(datumNode).find('input')
    $input.length.should.equal 1, 'should have found an input'
    $input.val().should.equal value.toString(), "input should have val() = '#{value}'"
    return $input
    
    
  @testDatumDisplay = (datum, value) ->
    datum.isEditing().should.equal false, "datum.isEditing()" 
    datumNode = @domNode(datum)
    $(datumNode).find('input').length.should.equal 0, "should not have found an input"  
    datumNode.innerHTML.should.contain value, 'should have found test value in the HTML'
    
