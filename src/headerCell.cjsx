
React = require('react')
PropTypes = require('prop-types')
Rb = require('react-bootstrap')
_ = require('underscore')

ReactStyles = require('./helpers/reactStyles')
SortIndicator = require('./helpers/sortIndicator')
SavingIndicator = require('./helpers/savingIndicator')

###
  HeaderCell is a controlled component

###
module.exports = class HeaderCell extends React.Component
    
  @propTypes: 
    # the column definition
    column: PropTypes.object
    # the index of the column
    columnIndex: PropTypes.number
    # the collection the datagrid is rendered from 
    collection: PropTypes.oneOfType([
      PropTypes.object
      PropTypes.array
    ])  
    style: PropTypes.object
    isSorting: PropTypes.bool
    isSelecting: PropTypes.bool
    sorted: PropTypes.oneOf(['ASC', 'DESC'])
    # callback method called when user clicks sort indicator. Called with (evt, columnIndex)
    onSort: PropTypes.func
    # callback method called when user clicks column name called with (evt, columnIndex)
    onSelectColumn: PropTypes.func
    # orientation of the data rows 
    orientation: PropTypes.oneOf(['portrait', 'landscape'])
    # width of header when orientation is portrait and columnDef.width is ignored
    width: PropTypes.number
    # height of header when orientation is landscape and columnDef.height is ignored
    height: PropTypes.number
    
    

  styles: new ReactStyles
    icon: 
      float: 'right'
      color: '#4767AA'
    wrapper: 
      display: 'inline-block'
      position: 'relative'
      includes: ->
        style =_.extend {}, @props.style
        if @props.orientation == 'landscape' 
          _.extend style,
            display: 'inline-block'
            width: @props.column.width
            height: @props.height
        else
          _.extend style, 
            display: 'block'
            height: @props.column.height
            width: @props.width
        return style
      
      
  style: (name) -> 
    _.extend {}, @styles.get(@, name), @props.styles?[name] || {}    

  render: ->
    if @props.column?.tooltip
      return (
        <div style={@style('wrapper')} className="rdd-header-wrapper">
          <Rb.OverlayTrigger overlay={@_renderTooltipPopover()}>
            <div>
              {@_renderIcons()}
              {@_renderColumnName()}
              <i style={@style('icon')} className='fa fa-question-circle'/>
            </div>
          </Rb.OverlayTrigger>
        </div>
      ) 
    else return ( 
      <div style={@style('wrapper')} className="rdd-header-wrapper">
        {@_renderIcons()}
        {@_renderColumnName()}
      </div>
    )


  _renderTooltipPopover: () ->
    <Rb.Popover id="flipgridTooltipPopover">
      {@props.column.tooltip}
    </Rb.Popover>
    
  
  _renderIcons: ->
    <div className='rdd-header-icons'>
      {@_renderSortIndicator()}
    </div>
    
  
  _renderSortIndicator: ->
    return null unless @props.column.sortable
    return @_renderSpinnySpinner() if @props.isSorting || @props.isSelecting
  
    <SortIndicator sorted={@props.sorted} onClick={@_onSort}/>
  
  _renderSpinnySpinner: ->
    <SavingIndicator/>


  _onSort: () =>
    direction = switch @props.sorted
      when null, undefined then 'ASC'
      when 'ASC' then 'DESC'
      when 'DESC' then null
      
    @props.onSort(@props.columnIndex, @props.column, direction)
    

  _renderColumnName: ->
    name = @props.column.name
    <a title="click to select all in column" onClick={(evt) => @_onColumnNameClick(evt)}>{name}</a>

  
  _onColumnNameClick: (evt) =>
    @props.onSelectColumn?(evt, @props.columnIndex)
    
    
  
  
  