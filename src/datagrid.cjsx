
React = require 'react'
ReactDOM = require 'react-dom'
ReactDatum = require 'react-datum'
PropTypes = require 'prop-types'
_ = require 'underscore'
$ = require 'jquery'

Mixin = require './helpers/mixin'
ReactStyles = require './helpers/reactStyles'
CellWrapper = require './cellWrapper'
HeaderCell = require './headerCell'

GridEdit = require './gridEdit'
GridSelect = require './gridSelect'

Grid = require('react-virtualized/dist/commonjs/Grid/Grid')['default']
AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer/AutoSizer')['default']

###
  This is react-datum-datagrid.   
  
  Example:
  TODO
  
###
module.exports = class Datagrid extends React.Component
  @displayName: "react-datum-datagrid"
  
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
    
    # orientation of columns and rows can be flipped by setting this prop to 'portrait'
    orientation: PropTypes.oneOf(['landscape', 'portrait'])
    
    # set to true to not display save errors in Oh My Something is amiss. Cells will 
    # passively only show icon and popover  
    silentSaveErrors: PropTypes.bool
    
    # width of the "headers" (labels) when orientation == 'portrait' 
    headerWidth: PropTypes.number

    # height of the "headers" (labels) when orientation == 'portrait' 
    headerHeight: PropTypes.number
    
    # callback to call when columns are hidden.  called with (this, columnDef, evt)
    onHideColumn: PropTypes.func
    
    # callback to call when columns are shown. (this, columnDef, evt)
    onShowColumn: PropTypes.func
    
    # default column definition attributes
    defaultColumnDef: PropTypes.object
    

  @defaultProps: 
    headerWidth: 150
    headerHeight: 60
    orientation: 'landscape'
    defaultColumnDef: {
      width: 120
      
    }
    
  # a minimal margin is neccessary on the CellWrapper in order to see the 
  # focus rectangle 
  WRAPPER_CELL_VERT_MARGIN: 3
  WRAPPER_CELL_HORZ_MARGIN: 4
  
  styles: new ReactStyles
    container: 
      height: '100%'
      width: '100%'
      display: 'flex'
      includes: -> 
        if @props.orientation == 'landscape'
          flexDirection: 'column'
        else 
          flexDirection: 'row'
    headers:
      display: 'flex'
      flexGrow: 0
      margin: 0
      overflow: 'hidden'
      includes: -> 
        if @props.orientation == 'landscape'
          display: 'block'
          width: '100%'
          height: @props.headerHeight
        else
          display: 'inline-block'
          width: @props.headerWidth
          height: '100%'
    
    gridsContainer:
      position: "relative"
      display: "flex"
      flexGrow: 1
      includes: ->
        if @props.orientation == 'landscape'
          flexDirection: 'row'
        else
          flexDirection: 'column'
    
    lockedGrid:
      flexGrow: 0
      includes: -> 
        if @props.orientation == 'landscape'
          display: 'inline-block'
          width: @_sumLockedColumnWidths()
        else
          display: 'block'
          height: @_sumLockedColumnHeights()
      overflow: 'hidden'
    
    freeGrid:
      flexGrow: 1
      includes: -> 
        if @props.orientation == 'landscape'
          display: 'inline-block'
          width: "calc(100% - #{@_sumLockedColumnWidths()}px"
        else
          display: 'block'
          height: "calc(100% - #{@_sumLockedColumnHeights()}px"
      overflow: 'hidden'
    
    fixedHeaderCells:
      includes: -> 
        return if @props.orientation == 'landscape'
          display: 'inline-block'
          width: @_sumLockedColumnWidths()
          height: @props.headerHeight
        else
          display: 'block'
          width: @props.headerWidth
          height: @_sumLockedColumnHeights()
      verticalAlign: 'top'
    
    scrollingHeaderCells:
      includes: -> 
        if @props.orientation == 'landscape'
          display: 'inline-block'
          width: "calc(100% - #{@_sumLockedColumnWidths()}px)"
          height: @props.headerHeight
          overflowY: 'scroll'
        else
          display: 'block'
          width: @props.headerWidth
          height: "calc(100% - #{@_sumLockedColumnHeights()}px)" 
          overflowX: 'scroll'
      marginTop: 1
      verticalAlign: 'top'
      whiteSpace: 'nowrap'
    

  componentDidMount: ->
    @_initializeScrolling()
    
    
  style: (name) -> 
    _.extend {}, @styles.get(@, name), @props.styles?[name] || {}    


  render: ->
    lockedColumns = @_getLockedColumns()
    freeColumns = @_getFreeColumns()
    
    gridProps = 
      className: "rdd-rv-grid"
      overscanRowCount: 20
      overscanColCount: 5
      rowHeight: @props.rowHeight
      rowCount: @getRowCount()

    
    <div style={@style('container')} className='react-datum-datagrid'>
      <div style={@style('headers')} className='rdd-headers'>
        <div style={@style('fixedHeaderCells')} className='rdd-fixed-header-cells'>
          {@_renderHeaderCells(lockedColumns)}
        </div>
        <div style={@style('scrollingHeaderCells')} className='rdd-scrolling-header-cells' >
          {@_renderHeaderCells(freeColumns)}
        </div>
      </div>
      <div style={@style('gridsContainer')} className='rdd-grids-container'>
        <div style={@style('lockedGrid')} className='rdd-locked-grid'>
          <AutoSizer>
            { ({height, width}) => 
              <Grid
                cellRenderer={@lockedCellRenderer}
                columnWidth={@getLockedColumnWidth}
                columnCount={lockedColumns.length}
                height={height}
                width={width}
                {... gridProps}
              />
            }          
          </AutoSizer>
        </div>
        <div style={@style('freeGrid')} className='rdd-free-grid'>
          <AutoSizer>
            { ({height, width}) => 
              <Grid
                cellRenderer={@freeCellRenderer}
                columnWidth={@getFreeColumnWidth}
                columnCount={freeColumns.length}
                height={height}
                width={width}
                {... gridProps}
              />          
            }          
          </AutoSizer>
        </div>
      </div>
    </div>
      

  # columnIndex, # Horizontal (column) index of cell
  # isScrolling, # The Grid is currently being scrolled
  # isVisible,   # This cell is visible within the grid (eg it is not an overscanned cell)
  # key,         # Unique key within array of cells
  # parent,      # Reference to the parent Grid (instance)
  # rowIndex,    # Vertical (row) index of cell
  # style        # Style object to be applied to cell (to position it);
  #              # This must be passed through to the rendered cell element.
  
  lockedCellRenderer: ({rowIndex, columnIndex, key, isScrolling, isVisible, style}) =>
    @cellRenderer(@_getLockedColumns(), 0, columnIndex, rowIndex, key, isVisible, isScrolling, style)
    

  freeCellRenderer: ({rowIndex, columnIndex, key, isScrolling, isVisible, style}) =>
    baseColumnIndex = @_getLockedColumns().length
    @cellRenderer(@_getFreeColumns(), baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style)

  
  cellRenderer: (columns, baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style) ->
    showPlaceholder = false 
    columnDef = columns[columnIndex]
    model = @getModelAt(rowIndex)
    @_renderDataCell(columnDef, model, columnIndex + baseColumnIndex, rowIndex, key, style, showPlaceholder)
    
    
  getLockedColumnWidth: ({index}) =>
    @getColumnWidth(index, @_getLockedColumns())
    
  
  getFreeColumnWidth: ({index}) =>
    @getColumnWidth(index, @_getFreeColumns())
    
    
  getColumnWidth: (index, columns=@props.columns) ->
    return columns[index].width ? @props.defaultColumnDef.width 
    
    
  getRowCount: () ->
    return 0 unless @props.collection?
    return @props.collection.getLength?() ? @props.collection.length ? 0
      
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
    rowIndex = ReactDatum.Number.safelyFloat($focusedCell.attr('data-row'))
    columnIndex = ReactDatum.Number.safelyFloat($focusedCell.attr('data-col'))
    columnDef = @getColumn(columnIndex)

    return {rowIndex: rowIndex, idx: columnIndex, col: columnDef.key}
    
    
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
  isCellSelected: (rowIndex, colKey) ->
    selectedCell = @getSelectedCell()
    return selectedCell.rowIndex == rowIndex && selectedCell.col == colKey
      
      
  refresh: ->
    @refs.lockedGrid?.grid?.refresh()
    @refs.freeGrid?.grid?.refresh()
    
    # resync the bottom grid scrolltop to the labels column scrolltop, prevents
    # from scrolling back to top on refresh
    @_onHeaderScroll()
    # we have to do this twice.  The first effectively prevents the bottom grid
    # from effecting the label scroll position on rerender.  The second defered 
    # onLabelScroll causes the newly rerendered bottom grid to scroll down to 
    # match the label scroll position.  
    _.defer => @_onHeaderScroll()
  
  
  _renderHeaderCells: (columnDefs) ->
    cells = for columnDef, index in columnDefs
      @_renderHeaderCell(index, columnDef)
    return cells

      
  _renderHeaderCell: (index, columnDef) ->
    return null unless columnDef?
    labelStyle = $.extend true, {}, @_getDefaultCellStyle(columnDef, true), columnDef.flipgrid?.labelStyle
    <HeaderCell 
      key={index} 
      column={columnDef} 
      orientation={@props.orientation}
      datagrid={@} 
      defaultCellStyle={labelStyle}
      onShowColumn={@props.onShowColumn}
      onHideColumn={@props.onHideColumn}
    />


  _renderDataCell: (columnDef, model, columnIndex, rowIndex, key, style, showPlaceholder) ->
    style = @_getCellWrapperStyle(style)
      
    <CellWrapper
      key={key}
      model={model}
      column={columnDef}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      style={style}
      showPlaceholder={showPlaceholder}
      datagrid={@}
      defaultCellStyle={@_getDefaultCellStyle(columnDef)}
    />
       
    
  _getLockedColumns: ->
    _.filter @props.columns, (columnDef) -> columnDef.locked  

    
  _getFreeColumns: ->
    _.filter @props.columns, (columnDef) -> !columnDef.locked  
    
  
  _initializeScrolling: ->
    lockedGridEl = @_getLockedGridEl()
    freeGridEl = @_getFreeGridEl()
    lockedGridEl.addEventListener('scroll', @_onLockedGridScroll)
    freeGridEl.addEventListener('scroll', @_onFreeGridScroll)
    
    scrollingHeaderCellsEl = @_getScrollingHeadersEl()
    scrollingHeaderCellsEl.addEventListener('scroll', @_onHeaderScroll)
    
    
  _getLockedGridEl: ->
    ReactDOM.findDOMNode(@).querySelector '.rdd-locked-grid .rdd-rv-grid'
    
    
  _getFreeGridEl: ->
    ReactDOM.findDOMNode(@).querySelector '.rdd-free-grid .rdd-rv-grid'
    
    
  _getScrollingHeadersEl: ->
    ReactDOM.findDOMNode(@).querySelector '.rdd-scrolling-header-cells'  
  
    
  _onLockedGridScroll: =>
    unless @_isFreeGridInitiatedScrolling
      @_isLockedGridInitiatedScrolling = true
      lockedGridEl = @_getLockedGridEl()
      freeGridEl = @_getFreeGridEl()
      
      if @props.orientation == 'landscape'
        freeGridEl.scrollTop = lockedGridEl.scrollTop
      else
        freeGridEl.scrollLeft = lockedGridEl.scrollLeft
    
    @_isFreeGridInitiatedScrolling = false
    

  _onFreeGridScroll: =>
    unless @_isLockedGridInitiatedScrolling || @_isLabelInitiatedScrolling
      @_isFreeGridInitiatedScrolling = true
      lockedGridEl = @_getLockedGridEl()
      freeGridEl = @_getFreeGridEl()
      
      if @props.orientation == 'landscape'
        lockedGridEl.scrollTop = freeGridEl.scrollTop
      else
        lockedGridEl.scrollLeft = freeGridEl.scrollLeft
    
    @_isLockedGridInitiatedScrolling = false
    
    unless @_isLabelInitiatedScrolling
      scrollingHeaderCellsEl = @_getScrollingHeadersEl()
      freeGridEl = @_getFreeGridEl()
      if @props.orientation == 'landscape'
        scrollingHeaderCellsEl.scrollLeft = freeGridEl.scrollLeft
      else
        scrollingHeaderCellsEl.scrollTop = freeGridEl.scrollTop
      
    @_isLabelInitiatedScrolling = false

      
  _onHeaderScroll: =>
    unless @_isFreeGridInitiatedScrolling
      @_isLabelInitiatedScrolling = true
      scrollingHeaderCellsEl = @_getScrollingHeadersEl()
      freeGridEl = @_getFreeGridEl()
      if @props.orientation == 'landscape'
        freeGridEl.scrollLeft = scrollingHeaderCellsEl.scrollLeft
      else
        freeGridEl.scrollTop = scrollingHeaderCellsEl.scrollTop
    
    @_isFreeGridInitiatedScrolling = false
      
  
  _sumLockedColumnHeights: ->
    heightOut = 0
    for col in @_getLockedColumns()
      heightOut += @_convertCssPx(col.cellStyle?.borderWidth) 
      heightOut += col.height ? @props.defaultColumnDef.height 
      heightOut += @_convertCssPx(col.cellStyle?.paddingTop) 
      heightOut += @_convertCssPx(col.cellStyle?.paddingBottom)
    
    return heightOut
  
  
  _sumLockedColumnWidths: ->
    widthOut = 0
    for col in @_getLockedColumns()
      widthOut += @_convertCssPx(col.cellStyle?.borderWidth) 
      widthOut += col.width ? @props.defaultColumnDef.width 
      widthOut += @_convertCssPx(col.cellStyle?.paddingTop) 
      widthOut += @_convertCssPx(col.cellStyle?.paddingBottom)
      widthOut 
    
    return widthOut
      
    
  _getFreeGridHeight: ->
    return 300 # "calc(100% - #{@_getLockedGridHeight() + 5}px)"
    
  _getFreeGridWidth: ->
    return 300 # "calc(100% - #{@_getLockedGridWidth() + 5}px)"
    
    
  _convertCssPx: (value) ->
    return null unless value?
    if _.isString value
      numerals = value.match(/[^0-9\.]*([0-9\.]*).*/)?[1]
      return 0 unless numerals?
      return parseInt(numerals)
    
    return value
    
    
  _getCellWrapperStyle: (style) ->
    _.extend style,
      margin: "#{@WRAPPER_CELL_VERT_MARGIN}px #{@WRAPPER_CELL_HORZ_MARGIN}px"
      height: style.height - @WRAPPER_CELL_VERT_MARGIN * 2
      width: style.width - @WRAPPER_CELL_HORZ_MARGIN * 2
      padding: 0
      display: 'flex'
      flexDirection: 'column'
      
    
  
  _getDefaultCellStyle: (columnDef, isHeader=false) ->
    if isHeader 
      if @props.orientation == 'landscape'
        height = @props.headerHeight
        width = columnDef.width ? @props.defaultColumnDef.width 
      else
        height = columnDef.height ? @props.defaultColumnDef.height 
        width = @props.headerWidth 
      
    cellStyle = 
      height: height 
      width: width 
      
    return cellStyle
    
    
    
  Mixin @, GridEdit
  Mixin @, GridSelect
