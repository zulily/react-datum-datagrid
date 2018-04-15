

React = require 'react'

module.exports = class ErrorBoundary extends React.Component 
  
  constructor: (props) ->
    super(props);
    @state = 
      error: null
      errorInfo: null

  
  componentDidCatch: (error, errorInfo) ->
    # Catch errors in any child components and re-renders with an error message
    this.setState
      error: error,
      errorInfo: errorInfo
    
  
  render: () ->
    if (@state.error) 
      # Fallback UI if an error occurs
      return (
        <div>
          <h5>This component hath crashed</h5>
          <p className="red">
            {@state.error && @state.error.toString()}
          </p>
          <div>{"Component Stack Error Details: "}</div>
          <p className="red">{@state.errorInfo.componentStack}</p>
        </div>
      )
      
    return @props.children;
