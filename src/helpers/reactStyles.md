This is the base class for inline styles in code.  

You construct it like this:
```javascript  
  styles = new ReactStyles 
    messageBox: 
      minHeight: 200
      maxHeight: 300
      overflow: "auto"
    errorMessageBox:
      includes: "messageBox"
      backgroundColor: "red"
    successMessageBox:
      includes: "messageBox"
      backgroundColor: "green"
```  
The `includes` member is special.  It is used by get() to default the styles 
from messageBox into the other two, more specific, types of message boxes.

`includes` can be an array of mixed strings, objects or functions. string 
includes are fetched from the passed in styles.  

So, if for example, you had a global rule for error message box text properties, 
some dynamically generated rules, you could do
```
  styles: new ReactStyles
    errorMessageBox:
      includes: [
        "messageBox",                            # our internal/local "messageBox" rules
        styles.get('errorMessageBoxText'),   # also include the global rule
        (=> @getMyDynamicStyles())               # plus some class instance method
      ]
  
  ...
  
  # don't forget the @ context variable so our @getMyDynamicStyles above
  # has this class instance as `this`
  @styles.get(@, 'errorMessageBox')
    
```


### Using @props.style

`includes` member variable can also be an function returning style attributes.  
For example, the `include` used below is used by roundedSliderButton, to 
let you easily just specify a single style which it applies to only it's
outermost element:
```javascript
  styles: new ReactStyles
    roundedSliderButton:
      includes: -> @props.style 
      display: 'inline-block'
    outerLabel: 
      display: 'inline-block'
      color: '#090909'
    slideRail:
      display: 'inline-block'
      width: 20
      height: 12
  
```
Be sure to use -> and not => for the includes that are functions


Note that if you extend ReactView you will also get a handy 
member function `@style(styleNames...)` added to your class that properly 
passes the context and allows for a user specified @props.styles (note plural) 
that can be used to override any internal rule and also allows you to 
accept a style property to apply to any one element style.   


### The complete example

So, for example, you can have a component like,
```javascript
  class myAwesomeComponent extends ReactView
    
    @propTypes:
      # this component accepts a style prop that we will apply to our 
      # outer element
      style: React.PropTypes.object
      
      # This component accepts a full override of any internal styles used
      styles: React.PropTypes.object
    
    @defaultProps:
      # Just for illustration.  If the user passes `styles` prop they 
      # are considered imperitive. So the user component can
      # get around our `outerDiv.position:'relative'` constraint below
      # by passing a prop like `styles={{outerDiv: {position: absolute}}}` 
      styles: {}
      
      # We default this one in the defaultProps to allow the user to change
      # the value of display property.  Our sensible default is 'inline-block'
      style: {display: "inline-block"}
      
      
    styles: new ReactStyles
      outerDiv:
        # This is how you allow the user of your component to style its 
        # outer element for positioning or such.  Note this only works 
        # because ReactView#style() passes the view object
        # as context to the method assigned to `includes` 
        includes: -> @props.style
      
        # This rule takes precedent over `@props.style.position`, but 
        # does *not* take precedence over `@props.styles.outerDiv.position` 
        # if it exists.
        # TODO : reassess
        # The user component gets final say through `@prop` styles 
        position: 'relative';
      
      innerDiv:
        position: 'absolute'
    
    
    render: ->
      <div style={@style('outerDiv')}>
        <div style={@style('innerDiv')}/>
      </div>
```  
