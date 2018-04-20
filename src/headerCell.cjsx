
React = require('react')
PropTypes = require('prop-types')
Rb = require('react-bootstrap')

ReactStyles = require('./helpers/reactStyles')

###
  HeaderCell is a controlled component

###
module.exports = class HeaderCell extends React.Component
    
  @propTypes: 
    column: PropTypes.object
    columnIndex: PropTypes.number
    style: PropTypes.object
    # TBD:  needed for buydoc
    # onHideColumn: PropTypes.func
    # onShowColumn: PropTypes.func
    sorted: PropTypes.oneOf(['asc', 'desc'])
    # callback method called when user clicks sort indicator. Called with (evt, columnIndex)
    onSort: PropTypes.func
    # callback method called when user clicks column name called with (evt, columnIndex)
    onSelectColumn: PropTypes.func
    

  
  styles: new ReactStyles
    icon: 
      float: 'right'
      color: '#4767AA'
    wrapper: 
      includes: ->
        _.extend {}, @props.style,
          width: @props.column.width
      position: 'relative'
      display: 'inline-block'
      
    showHideIcon: 
      position: 'absolute'
      left: -5
      top: 0
      fontSize: 17
      color: '#4767AA'
    showIcon: 
      includes: 'showHideIcon'
      left: 2
      top: 1
    banIcon:
      includes: 'showHideIcon'
      color: '#DE8387'
      top: 1
      left: 1
      fontSize: 21
      
  style: (name) -> 
    _.extend {}, @styles.get(@, name), @props.styles?[name] || {}    

  render: ->
    if @props.column?.tooltip
      return (
        <div style={@style('wrapper')} className="rdd-header-wrapper">
          <Rb.OverlayTrigger overlay={@_renderTooltipPopover()}>
            <div>
              {@_renderShowHideControl()}
              {@_renderColumnName()}
              <i style={@style('icon')} className='fa fa-question-circle'/>
            </div>
          </Rb.OverlayTrigger>
        </div>
      ) 
    else return ( 
      <div style={@style('wrapper')} className="rdd-header-wrapper">
        {@_renderShowHideControl()}
        {@_renderColumnName()}
      </div>
    )


  _renderTooltipPopover: () ->
    <Rb.Popover id="flipgridTooltipPopover">
      {@props.column.tooltip}
    </Rb.Popover>
    
  
  _renderShowHideControl: ->
    return null unless @props.column.canHide
    if @props.column.isHidden
      return <i className='fa fa-eye' 
        style={@style('showHideIcon')} 
        title='Click to show this attribute when "Mine" attributes selected'
        onClick={@_onShowIconClick}
      />
    else
      return <span 
        class="fa-stack"
        title='Click to hide this attribute when "Mine" attributes selected'
        onClick={@_onHideIconClick}
        style={@style('showHideIcon')}
      >
        <i className="fa fa-eye fa-stack-1x" style={@style('showIcon')}/> 
        <i className="fa fa-ban fa-stack-2x" style={@style('banIcon')} />
      </span>
      
      
  _renderColumnName: ->
    name = @props.column.name
    <a title="click to select all in column" onClick={(evt) => @_onColumnNameClick(evt)}>{name}</a>


  getCellOverrideStyle: (model) ->
    sval = {}
    
    _.extend sval, if @props.orientation == 'landscape' 
      display: 'inline-block'
    else
      display: 'block'
    
    return sval
    
  
  _onShowIconClick: (evt)  =>      
    @props.column.isHidden = false
    @forceUpdate => @props.onShowColumn?(@, @props.column, evt)
  
  
  _onHideIconClick: (evt) =>
    @props.column.isHidden = true
    @forceUpdate => @props.onHideColumn?(@, @props.column, evt)
  
  
  _onColumnNameClick: (evt) =>
    @props.onSelectColumn?(evt, @props.columnIndex)
    
    
  
  
  