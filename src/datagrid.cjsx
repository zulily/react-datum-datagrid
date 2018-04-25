
React = require 'react'
ReactDOM = require 'react-dom'
ReactDatum = require 'react-datum'
PropTypes = require 'prop-types'
_ = require 'underscore'
extend = require 'node.extend'

Mixin = require './helpers/mixin'
ReactStyles = require './helpers/reactStyles'
CellWrapper = require './helpers/cellWrapper'
GridEdit = require './helpers/gridEdit'
GridSelect = require './helpers/gridSelect'
GridScroll = require './helpers/gridScroll'
GridCopyPaste = require './helpers/gridCopyPaste'
GridExport = require './helpers/gridExport'
GridSort = require './helpers/gridSort'

Cell = require './cell'
HeaderCell = require './headerCell'

Grid = require('react-virtualized/dist/commonjs/Grid/Grid')['default']
AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer/AutoSizer')['default']

require('./helpers/closestPolyfill')
require('./helpers/matchesPolyfill')

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
    
    # default column definition attributes
    defaultColumnDef: PropTypes.object

    # default component to render in data cells.  default: ReactDatumDatagrid.Cell
    defaultCellComponent: PropTypes.any
    
    # default component to render in header cell. default: ReactDatumDatagrid.HeaderCell
    defaultHeaderComponent: PropTypes.any
  
    # disables ctrl-Z to undo 
    disableUndo: PropTypes.bool
    
    # the index of the sorted column (if one is sorted)
    sortColumnIndex: PropTypes.number
    
    # the direction the sortColumnIndex column is sorted
    sortDirection: PropTypes.oneOf(["ASC", "DESC"])
    
    # callback to call when cell selections change
    onSelectedCellsChange: PropTypes.func
    
    # If provided, this callback method is called to sort the underlying collection
    # when the user clicks the sort icon in the header.  
    #
    # If provided, you ** MUST ** also provide `sortColumnIndex` and `sortColumnDirection`
    # 
    # If not, provided, rdd will assume the collection is fully fetched will sort the collection
    # internally.   
    # 
    # Called with (columnIndex, columnDef, direction, onComplete)
    # you ** must call the onComplete ** method passed when sorting is complete
    onSort: PropTypes.func 
    

  @defaultProps: 
    headerWidth: 150
    headerHeight: 60
    orientation: 'landscape'
    defaultHeaderComponent: HeaderCell
    defaultCellComponent: Cell
    defaultColumnDef: {
      width: 120
      
    }
    
    
  @LOG_UNDO_DEBOUNCE: 1
  undo: {}
  undoIndex: 0
    
  
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
      overflow: 'hidden'
      margin: 0
      padding: 0
      includes: -> 
        if @props.orientation == 'landscape'
          width: @_sumLockedColumnWidths()
        else
          height: @_sumLockedColumnHeights()
    
    freeGrid:
      flexGrow: 1
      margin: 0
      padding: 0
      includes: -> 
        if @props.orientation == 'landscape'
          width: "calc(100% - #{@_sumLockedColumnWidths()}px"
        else
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
    
    
    
  constructor: ->
    @state = {}
    super
    # doesn't need to be big but in the event of multiple cells posting saves at the near same time,
    # don't call forceUpdate for each one
    @_debouncedForceUpdate = _.debounce((=> @forceUpdate()), 50)
    # In milleseconds, this will efficiently collect
    # model changes that happen within the same "action"
    # and bucket the undo operations in such a way so as to work
    # with multi grid paste as well as with single actions.
    

  style: (name) -> 
    _.extend {}, @styles.get(@, name), @props.styles?[name] || {}    
    
  
  # https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  @getDerivedStateFromProps: (nextProps, prevState) ->
    newState = {}
    
    if nextProps.sortColumnIndex != prevState._cachedSortColumnIndex
      newState.sortColumnIndex = newState._cachedSortColumnIndex = nextProps.sortColumnIndex
      
    if nextProps.sortDirection != prevState._cachedSortDirection
      newState.sortDirection = newState._cachedSortDirection = nextProps.sortDirection
      
    return null if _.isEmpty(newState)
    return newstate
    
    
  componentDidMount: ->
    @_bindDocumentEvents()
  
  
  componentWillUnmount: ->
    @_unbindDocumentEvents()
    
    
  render: ->
    lockedColumns = @_getLockedColumns()
    freeColumns = @_getFreeColumns()
    
    lockedGridProps =
      className: "rdd-rv-grid"
      overscanRowCount: 20
      overscanColCount: 5
      rowHeight: @props.rowHeight
      rowCount: @getRowCount()
      # this will force the Grid to update when our state changes
      datagridState: JSON.stringify @state 
      
    freeGridProps = _.extend {}, lockedGridProps
      
    lastSelectedCellPosition = @getLastSelectedCellPosition()
    if lastSelectedCellPosition?
      freeGridProps.scrollToColumn = lastSelectedCellPosition.columnIndex - lockedColumns.length
      lockedGridProps.scrollToRow = freeGridProps.scrollToRow = lastSelectedCellPosition.rowIndex

    <div style={@style('container')} className='react-datum-datagrid'>
      <div style={@style('headers')} className='rdd-headers'>
        <div style={@style('fixedHeaderCells')} className='rdd-fixed-header-cells'>
          {@_renderHeaderCells(0, lockedColumns)}
        </div>
        <div style={@style('scrollingHeaderCells')} className='rdd-scrolling-header-cells' >
          {@_renderHeaderCells(lockedColumns.length, freeColumns)}
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
                {... lockedGridProps}
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
                {... freeGridProps}
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
    width = @getColumnWidth(index, @_getLockedColumns())
    console.log('getLockedColumnWidth', index, width)
    return width
    
  
  getFreeColumnWidth: ({index}) =>
    width = @getColumnWidth(index, @_getFreeColumns())
    console.log('getFreeColumnWidth', index, width)
    return width
    
    
  getColumnWidth: (index, columns=@props.columns) ->
    return columns[index].width ? @props.defaultColumnDef.width 
    
    
  getRowCount: () ->
    return 0 unless @props.collection?
    return @props.collection.getLength?() ? @props.collection.length ? 0


  ###
    Call this method to get a csv text representation of the grid
  ###
  exportToCsv: () ->
    # this method is provided by helpers/gridExport. here for docs purposes


  _renderHeaderCells: (baseIndex, columnDefs) ->
    cells = for columnDef, index in columnDefs
      @_renderHeaderCell(baseIndex + index, columnDef)
    return cells

      
  _renderHeaderCell: (columnIndex, columnDef) ->
    return null unless columnDef?
    columnDef = @getColumnDefaults(columnDef)
    isSortedByUs = @state.sortColumnIndex? && @state.sortColumnIndex == columnIndex
    isSortingByUs = @state.isSorting && isSortedByUs
    sortDirection = if isSortedByUs then @state.sortDirection else null
    
    HeaderCellComponent = columnDef.headerComponent ? columnDef.header ? @props.defaultHeaderComponent
    
    <HeaderCellComponent 
      key={columnIndex}
      column={columnDef} 
      columnIndex={columnIndex}
      collection={@props.collection}
      orientation={@props.orientation}
      
      isSorting={isSortingByUs}
      sorted={sortDirection}
      onSelectColumn={(evt,columnIndex) => @onSelectColumn(evt,columnIndex)} 
      onSort={(columnIndex, columnDef, direction) => @onSortColumn(columnIndex, columnDef, direction)}
      
      width={@props.headerWidth}
      height={@props.headerHeight}
    />
    # @onSelectColumn is in helpers/gridSelect
    # @onSortColumn is in helpers/gridSort

  _renderDataCell: (columnDef, model, columnIndex, rowIndex, key, style, showPlaceholder) ->
    style = @_getCellWrapperStyle(style)
    editingOurselves = @isCellEditing(columnIndex, rowIndex)
    savingOurselves = @isCellSaving(columnIndex, rowIndex)
    value = if editingOurselves
      @state.editingCell.value
    else
      @getValueAt(columnIndex, rowIndex)
    
    props =
      value: value
      key: key
      model: model
      column: columnDef
      rowIndex: rowIndex
      columnIndex: columnIndex
      collection: @props.collection
      style: style
      showPlaceholder: showPlaceholder
      datagrid: @
      defaultCellStyle: @_getDefaultCellStyle(columnDef)
      defaultCellComponent: @props.defaultCellComponent
      
      editable: @canEditCell(columnDef, model)
      selected: @isCellSelected(rowIndex, columnDef.key)  
      editing: editingOurselves
      saving: savingOurselves
      wasSaved: @wasCellSaved(columnIndex, rowIndex)
      saveErrors: @getSaveErrors(columnIndex, rowIndex)
      
      # the onOnCellMouse... event handlers above are provided by the GridSelect mixin 
      onMouseDown: (evt,cell) => @onCellMouseDown(evt,cell)
      onMouseUp: (evt,cell) => @onCellMouseUp(evt,cell)
      onMouseMove: (evt,cell) => @onCellMouseMove(evt,cell)
      
      # cell edit and change handlers provided by helpers/gridEdit
      onDoubleClick: (evt, cell) => @onCellEdit(evt, columnDef, model, columnIndex, rowIndex)
      onEditIndicatorClick: (evt, cell) => @onCellEdit(evt, columnDef, model, columnIndex, rowIndex)
      onChange: (value, cell) => @onCellChange(value, columnDef, model, columnIndex, rowIndex)
      
    <CellWrapper {... props}/>
    
    
  _getLockedColumns: ->
    _.filter @props.columns, (columnDef) -> columnDef.locked  

    
  _getFreeColumns: ->
    _.filter @props.columns, (columnDef) -> !columnDef.locked  
    
  
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
      margin: 0
      padding: 0
      # display: 'flex'
      # flexDirection: 'column'
      
    
  
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
    
    
  _bindDocumentEvents: =>
    document.addEventListener 'copy', @_onDocumentCopy
    document.addEventListener 'paste', @_onDocumentPaste
    document.addEventListener 'keydown', @_onDocumentKeyDown
    
    
  _unbindDocumentEvents: =>
    document.removeEventListener 'copy', @_onDocumentCopy 
    document.removeEventListener 'paste', @_onDocumentPaste
    document.removeEventListener 'keydown', @_onDocumentKeyDown
    
  
  # mixin methods are late bound and can't be directly used as event handlers
  _onDocumentCopy: (evt) => @GridCopyPaste_onDocumentCopy(evt)
  _onDocumentPaste: (evt) => @GridCopyPaste_onDocumentPaste(evt)
  _onDocumentKeyDown: (evt) => @GridSelect_onDocumentKeyDown(evt)
    
    
  Mixin @, GridScroll
  Mixin @, GridEdit
  Mixin @, GridSelect
  Mixin @, GridCopyPaste
  Mixin @, GridExport
  Mixin @, GridSort
