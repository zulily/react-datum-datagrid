
React = require('react')
PropTypes = require('prop-types')
Rb = require('react-bootstrap')

ReactStyles = require('./helpers/reactStyles')
Cell = require('./cell')
  
module.exports = class LabelCell extends Cell
    
  @propTypes: 
    rowData: PropTypes.any
    column: PropTypes.object
    onHideColumn: PropTypes.func
    onShowColumn: PropTypes.func

  
  styles: new ReactStyles
    icon: 
      float: 'right'
      color: '#4767AA'
    wrapper: 
      position: 'relative'
      paddingLeft: 18
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
          {@props.column?.name}
        </div>
      ) 
    
    super( 
      <div style={@style('wrapper')}>
        <Rb.OverlayTrigger overlay={@_renderTooltipPopover()}>
          <div>
            {@_renderShowHideControl()}
            {@props.column.name}
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
      

  getCellDefaultStyle: (model) ->
    styles = _.defaults super(model), 
      verticalAlign: 'middle'
      textAlign: 'left'
      paddingLeft: App.lessVar('standard_padding');        
      
    _.extend styles,
      borderRight: "solid 1px #{App.lessVar('base_white')}"
      borderBottom: "solid 1px #{App.lessVar('base_white')}"
      
    if @props.column.isHidden
      styles.color = 'rgba(0, 0, 0, 0.16)'
      
    return styles
    
      
  getBackgroundColor: ->
    return App.lessVar('grid_header_background_color')
      
  
  _onShowIconClick: (evt)  =>      
    @props.column.isHidden = false
    @forceUpdate => @props.onShowColumn?(@, @props.column, evt)
  
  
  _onHideIconClick: (evt) =>
    @props.column.isHidden = true
    @forceUpdate => @props.onHideColumn?(@, @props.column, evt)
  
  
    
    
  
  
  