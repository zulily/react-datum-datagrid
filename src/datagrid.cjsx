
React = require 'react'
ReactDOM = require 'react-dom'
ReactDatum = require 'react-datum'
PropTypes = require 'prop-types'
_ = require 'underscore'
$ = require 'jquery'

Mixin = require './helpers/mixin'
ReactStyles = require './helpers/reactStyles'
CellWrapper = require './cellWrapper'
LabelCell = require './labelCell'

GridEdit = require './gridEdit'
GridSelect = require './gridSelect'

###
  This is react-datum-datagrid.   
  
  Example:
  TODO
  
###
module.exports = class Datagrid extends React.Component
  @displayName: "react-datum-datagrid"
  
  @DEFAULT_CELL_HEIGHT: 20
  @DEFAULT_CELL_BORDER_WIDTH: 1
  @DEFAULT_CELL_PADDING_HEIGHT: 5
  @DEFAULT_CELL_PADDING_WIDTH: 10


  @propTypes: 
    # This should be an instance of a backbone collection or an array of javascript objects.  
    # It can also be set through @context.collection or via Datagrid.setCollection() below.
    collection: PropTypes.oneOfType([
      PropTypes.object
      PropTypes.array
    ])  
  
    # the columns are compatible with the prop of the same name passed to App.views.widgets.react.Datagrid
    # see Class comment above for which column def attributes are used
    columns: PropTypes.array
    
    # set to true to not display save errors in Oh My Something is amiss. Cells will 
    # passively only show icon and popover  
    silentSaveErrors: PropTypes.bool
    
    # width of the "headers" (labels) when in horz display 
    labelWidth: PropTypes.number
    
    # callback to call when columns are hidden.  called with (this, columnDef, evt)
    onHideColumn: PropTypes.func
    
    # callback to call when columns are shown. (this, columnDef, evt)
    onShowColumn: PropTypes.func
    

  @defaultProps: 
    labelWidth: 300
    
    
  @childContextTypes:
    datagrid: PropTypes.instanceOf(@constructor)


  getChildContext: ->
    return {datagrid: @}
    
    
  # TODO : when I reengineer this to use react-virtualized, flexify this shiz
  styles: new ReactStyles
    container: 
      includes: -> @props.style
    headers:
      includes: -> 
        width: @props.labelWidth
      display: 'inline-block'
      backgroundColor: '#eceff6'
      height: '100%'
      verticalAlign: 'top'
    gridsContainer:
      includes: ->
        width: "calc(100% - #{@props.labelWidth}px)"
      display: 'inline-block'
      height: '100%'
    topGrid:
      includes: ['bottomDivider', (-> {height: @_getTopGridHeight()})] 
      width: 'calc(100% - 13px)'
    bottomGrid:
      includes: -> {height: @_getBottomGridHeight()}
      width: '100%'
    fixedHeaderCells:
      includes: ['bottomDivider', (-> {height: @_getTopGridHeight() + 1 })] 
      width: '100%'
    scrollingHeaderCells:
      includes: -> {height: "calc(100% - #{@_getTopGridHeight() + 20}px)"}
      width: '100%'
      marginTop: 1
    scrollingHeaderCellsViewport:
      height: '100%'
      overflowY: 'scroll'
    styleImage:
      width: 50
      minHeight: 60
    bottomDivider: 
      borderBottom: "3px solid #cccccc"


  componentDidMount: ->
    @_initializeScrolling()
    super

  style: (name) -> 
    _.extend {}, @styles.get(@, name), @props.styles?[name] || {}    

  render: ->
    fixedColumns = @_getFixedColumns()
    scrollingColumns = @_getScrollingColumns()
    
    <div style={@style('container')} className='react-datum-datagrid'>
      <div style={@style('headers')} className='rdd-headers'>
        <div style={@style('fixedHeaderCells')} className='rdd-fixed-header-cells'>
          {@_renderHeaderCells(fixedColumns)}
        </div>
        <div style={@style('scrollingHeaderCells')} className='rdd-scrolling-header-cells' >
          <div style={@style('scrollingHeaderCellsViewport')}>
            {@_renderHeaderCells(scrollingColumns)}
          </div>
        </div>
      </div>
      <div style={@style('gridsContainer')}>
        <div style={@style('topGrid')} className='rdd-top-grid'>
          <ReactGrid 
                collection={@props.collection} ref='topGrid'} 
                gridSelectionClass={null}
                gridOptions={{preloadCushion: 200, pageSize: 20}}                  
          >
            { (model, rowIdx) => @_renderDataCells(@_getFixedColumns(), model, rowIdx, 0) }
          </ReactGrid>
        </div>
        <div style={@style('bottomGrid')} className='rdd-bottom-grid'>
          <ReactGrid 
                collection={@props.collection} ref='bottomGrid' 
                gridSelectionClass={null}
                gridOptions={{preloadCushion: 200, pageSize: 20}} 
          >
            { (model, rowIdx) => @_renderDataCells(@_getScrollingColumns(), model, rowIdx, @_getFixedColumns().length) }
          </ReactGrid>
        </div>
      </div>
    </div>
      
      
  ###
    Override me to conditionally enable editing on a per cell basis
  ###
  canEditCell: (col, rowModel) ->
    if !col?.editable then return false
    if col?.datum?.prototype?.isLocked?(col, rowModel) then return false
    return true;        


  # required by GridSelect mixin
  getSelectedCell: () ->
    $focusedCell = $(ReactDOM.findDOMNode(@)).find('.rdd-cell-wrapper:focus')
    return null unless $focusedCell?.length > 0
    rowIdx = ReactDatum.Number.safelyFloat($focusedCell.attr('data-row'))
    colIdx = ReactDatum.Number.safelyFloat($focusedCell.attr('data-col'))
    columnDef = @getColumn(colIdx)

    return {rowIdx: rowIdx, idx: colIdx, col: columnDef.key}
    
    
  # required by GridSelect mixin
  setSelectedCell: (rowIndex, colIndex) ->
    $requestedCell = $(ReactDOM.findDOMNode(@)).find(".rdd-cell-wrapper[data-row=#{rowIndex}][data-col=#{colIndex}]")
    return unless $requestedCell?.length > 0
    
    $requestedCell.focus()
    
  
  # required by GridSelect mixin
  unsetSelectedCell: () ->
    if @getSelectedCell()?
      document.activeElement.blur()
      
  # this is overridden when GridSelect is mixed in    
  isCellSelected: (rowIdx, colKey) ->
    selectedCell = @getSelectedCell()
    return selectedCell.rowIdx == rowIdx && selectedCell.col == colKey
      
      
  refresh: ->
    @refs.topGrid?.grid?.refresh()
    @refs.bottomGrid?.grid?.refresh()
    
    # resync the bottom grid scrolltop to the labels column scrolltop, prevents
    # from scrolling back to top on refresh
    @_onLabelScroll()
    # we have to do this twice.  The first effectively prevents the bottom grid
    # from effecting the label scroll position on rerender.  The second defered 
    # onLabelScroll causes the newly rerendered bottom grid to scroll down to 
    # match the label scroll position.  
    _.defer => @_onLabelScroll()
  
  
  _renderHeaderCells: (columnDefs) ->
    cells = for columnDef, index in columnDefs
      @_renderLabelCell(index, columnDef)
    return cells

      
  _renderLabelCell: (index, columnDef) ->
    return null unless columnDef?
    labelStyle = $.extend true, {}, @_getDefaultCellStyle(columnDef), columnDef.flipgrid?.labelStyle
    <LabelCell 
      key={index} 
      column={columnDef} 
      datagrid={@} 
      defaultCellStyle={labelStyle}
      onShowColumn={@props.onShowColumn}
      onHideColumn={@props.onHideColumn}
    />


  _renderDataCells: (columnDefs, model, rowIdx, baseColumnIndex) ->
    cells = for columnDef, index in columnDefs
      @_renderDataCell(index, columnDef, model, rowIdx, baseColumnIndex)


  _renderDataCell: (index, columnDef, model, rowIdx, baseColumnIndex) ->
    <CellWrapper
      model={model}
      column={columnDef}
      rowIdx={rowIdx}
      colIdx={baseColumnIndex + index}
      datagrid={@}
      defaultCellStyle={@_getDefaultCellStyle(columnDef)}
    />
       
    
  _getFixedColumns: ->
    _.filter @props.columns, (columnDef) -> columnDef.locked  

    
  _getScrollingColumns: ->
    _.filter @props.columns, (columnDef) -> !columnDef.locked  
    

  _initializeScrolling: ->
    topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid')
    bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid')
    topGridEl.addEventListener('scroll', @_onTopGridScroll)
    bottomGridEl.addEventListener('scroll', @_onBottomGridScroll)
    
    scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div')
    scrollingLableCellsEl.addEventListener('scroll', @_onLabelScroll)
    
    
  _onTopGridScroll: =>
    unless @_isBottomInitiatedScrolling
      @_isTopInitiatedScrolling = true
      topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid')
      bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid')
      bottomGridEl.scrollLeft = topGridEl.scrollLeft
    
    @_isBottomInitiatedScrolling = false
    

  _onBottomGridScroll: =>
    unless @_isTopInitiatedScrolling || @_isLabelInitiatedScrolling
      @_isBottomInitiatedScrolling = true
      topGridEl = ReactDOM.findDOMNode(this.refs.topGrid).querySelector('.grid')
      bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid')
      
      topGridEl.scrollLeft = bottomGridEl.scrollLeft
    
    @_isTopInitiatedScrolling = false
    
    unless @_isLabelInitiatedScrolling
      scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div')
      bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid')
      scrollingLableCellsEl.scrollTop = bottomGridEl.scrollTop
      
    @_isLabelInitiatedScrolling = false

      
  _onLabelScroll: =>
    unless @_isBottomInitiatedScrolling
      @_isLabelInitiatedScrolling = true
      scrollingLableCellsEl = ReactDOM.findDOMNode(this).querySelector('.scrolling-label-cells > div')
      bottomGridEl = ReactDOM.findDOMNode(this.refs.bottomGrid).querySelector('.grid')
      bottomGridEl.scrollTop = scrollingLableCellsEl.scrollTop
    
    @_isBottomInitiatedScrolling = false
      
  
  _getTopGridHeight: ->
    heightOut = 0
    for col in @_getFixedColumns()
      heightOut += @_convertCssPx(col.cellStyle?.borderWidth) ? @constructor.DEFAULT_CELL_BORDER_WIDTH
      heightOut += col.height ? @constructor.DEFAULT_CELL_HEIGHT
      heightOut += @_convertCssPx(col.cellStyle?.paddingTop) ? @constructor.DEFAULT_CELL_PADDING_HEIGHT
      heightOut += @_convertCssPx(col.cellStyle?.paddingBottom) ? @constructor.DEFAULT_CELL_PADDING_HEIGHT
    
    return heightOut
      
    
  _getBottomGridHeight: ->
    return "calc(100% - #{@_getTopGridHeight() + 5}px)"
    
    
  _convertCssPx: (value) ->
    return null unless value?
    if _.isString value
      numerals = value.match(/[^0-9\.]*([0-9\.]*).*/)?[1]
      return 0 unless numerals?
      return parseInt(numerals)
    
    return value
    
  
  _getDefaultCellStyle: (columnDef) ->
    cellStyle = 
      height: columnDef.height || @constructor.DEFAULT_CELL_HEIGHT
      borderColor: "#EFEFEF"
      borderStyle: 'solid'
      borderWidth: 0
      borderBottomWidth: @constructor.DEFAULT_CELL_BORDER_WIDTH
      paddingTop: @constructor.DEFAULT_CELL_PADDING_HEIGHT
      paddingBottom: @constructor.DEFAULT_CELL_PADDING_HEIGHT
      paddingLeft: @constructor.DEFAULT_CELL_PADDING_WIDTH
      paddingRight: @constructor.DEFAULT_CELL_PADDING_WIDTH
      
    return cellStyle
    
    
    
  Mixin @, GridEdit
  Mixin @, GridSelect
