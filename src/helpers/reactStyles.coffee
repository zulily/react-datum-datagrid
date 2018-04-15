

_ = require 'underscore'
DeepSet = require './deepSet'

# see ./reactStyles.md  
module.exports = class ReactStyles 
  

  constructor: (@styles) ->
    # nothing to do here
    
  
  ###
    Get's an object of React inline styles resolving any includes.  
    
    Context is optional and defaults to window.  
    (see, ./reactStyles.md for more)
  ###
  get: (context, styleNames...) ->
    if _.isString(context)
      styleNames.splice(0, 0, context)
      context = window
    
    outStyles = [{}]   # blank first for _.extend.apply
    for styleName in styleNames
      # make a shallow copy so we can remove includes on the style applied 
      style = _.extend({}, @styles[styleName])
      # TODO : should this throw an error? you probably got the name wrong.  
      #       Or should it return null?  Code review
      unless style?        
        console.error "ReactStyles: invalid styleName specified: '#{styleName}'"
        continue
      
      if style.includes?
        includes = if _.isArray(style.includes) then style.includes else [style.includes]
        for include in includes
          switch
            # Recursively get the includes, so that includes can have includes
            when _.isString include then outStyles.push @get(context, include)
            # function needs to come before object since they too are functions
            when _.isFunction include then outStyles.push include.call(context)
            when _.isObject include then outStyles.push include 
            else
              throw "Unrecognized include type (should be string, object or function): #{JSON.stringify(include)} for styles: #{JSON.stringify(@styles)}"
        delete style.includes
      # our internal style specified on construction has final word on styling
      outStyles.push style

    return _.extend.apply @, outStyles
      
      
  set: (deepAttr, value) ->
    DeepSet(@styles, deepAttr, value)
      
    