
React = require('react')
PropTypes = require('prop-types')

###
  This is react-datum-datagrid.   
  
  Example:
  TODO
  
###
module.exports = class Datagrid extends React.Component
  @displayName: "react-datum-datagrid"
  
  @propTypes: 
    ###
      Collection is the array of data to be displayed.  It can
      be an array or a Backbone compatible Collection object.
    ###
    collection:  @PropTypes.oneOfType [
      @PropTypes.array
      @PropTypes.object
    ]
    

  render: ->
    <h5>I am going to grow up to be an unweildy datagrid!</h5>
