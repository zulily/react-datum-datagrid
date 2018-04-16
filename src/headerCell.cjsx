
React = require('react')
PropTypes = require('prop-types')
Rb = require('react-bootstrap')

ReactStyles = require('./helpers/reactStyles')
Cell = require('./cell')

Titleize = require('underscore.string/Titleize')
Humanize = require('underscore.string/Humanize')
  
module.exports = class HeaderCell extends Cell
    
  @propTypes: 
    rowData: PropTypes.any
    column: PropTypes.object
    style: PropTypes.object
    onHideColumn: PropTypes.func
    onShowColumn: PropTypes.func
    

  
  styles: new ReactStyles
    icon: 
      float: 'right'
      color: '#4767AA'
    wrapper: 
      includes: ->
        @props.style
      position: 'relative'
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

  renderWrapped: ->
    unless @props.column?.tooltip
      return super( 
        <div style={@style('wrapper')}>
          {@_renderShowHideControl()}
          {@getColumnName()}
        </div>
      ) 
    
    super( 
      <div style={@style('wrapper')}>
        <Rb.OverlayTrigger overlay={@_renderTooltipPopover()}>
          <div>
            {@_renderShowHideControl()}
            {@getColumnName}
            <i style={@style('icon')} className='fa fa-question-circle'/>
          </div>
        </Rb.OverlayTrigger>
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
      
      
  getColumnName: ->
    @props.column.name ? Titleize(Humanize(@props.column.key))
    

  getCellOverrideStyle: (model) ->
    sval = super(model)
    
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
  
  
    
    
  
  
  