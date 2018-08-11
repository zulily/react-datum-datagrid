import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

import Mixin from './helpers/mixin'
import ReactStyles from './helpers/reactStyles'
import CellWrapper from './helpers/cellWrapper'
import GridEdit from './helpers/gridEdit'
import GridSelect from './helpers/gridSelect'
import GridScroll from './helpers/gridScroll'
import GridCopyPaste from './helpers/gridCopyPaste'
import GridExport from './helpers/gridExport'
import GridSort from './helpers/gridSort'

import Cell from './cell'
import HeaderCell from './headerCell'

import Grid from 'react-virtualized/dist/es/Grid/Grid'

import './helpers/closestPolyfill'
import './helpers/matchesPolyfill'

import './datagrid.css'

class Datagrid extends Component {

  displayName = "react-datum-datagrid"

  static propTypes = {
    collection: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    columns: PropTypes.array,
    orientation: PropTypes.oneOf(['landscape', 'portrait']),
    readOnly: PropTypes.bool,
    headerWidth: PropTypes.number,
    headerHeight: PropTypes.number,
    defaultColumnDef: PropTypes.object,
    defaultCellComponent: PropTypes.any,
    defaultHeaderComponent: PropTypes.any,
    disableUndo: PropTypes.bool,
    sortColumnIndex: PropTypes.number,
    sortDirection: PropTypes.oneOf(["ASC", "DESC"]),
    onSelectedCellsChange: PropTypes.func,
    onSort: PropTypes.func
  }

  static defaultProps = {
    headerWidth: 150,
    headerHeight: 60,
    orientation: 'landscape',
    defaultHeaderComponent: HeaderCell,
    defaultCellComponent: Cell,
    defaultColumnDef: {
      width: 120
    }
  }

  LOG_UNDO_DEBOUNCE = 1

  undo = {}

  undoIndex = 0

  styles = new ReactStyles({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            flexDirection: 'column'
          }
        } else {
          return {
            flexDirection: 'row'
          }
        }
      }
    },
    headers: {
      display: 'flex',
      flexGrow: 0,
      margin: 0,
      overflow: 'hidden',
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            display: 'block',
            width: '100%',
            height: this.props.headerHeight
          }
        } else {
          return {
            display: 'inline-block',
            width: this.props.headerWidth,
            height: '100%'
          }
        }
      }
    },
    gridsContainer: {
      position: "relative",
      display: "flex",
      flexGrow: 1,
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            flexDirection: 'row'
          }
        } else {
          return {
            flexDirection: 'column'
          }
        }
      }
    },
    lockedGrid: {
      flexGrow: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            width: this._sumLockedColumnWidths()
          }
        } else {
          return {
            height: this._sumLockedColumnHeights()
          }
        }
      }
    },
    freeGrid: {
      flexGrow: 1,
      margin: 0,
      padding: 0,
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            width: "calc(100% - " + (this._sumLockedColumnWidths()) + "px"
          }
        } else {
          return {
            height: "calc(100% - " + (this._sumLockedColumnHeights()) + "px"
          }
        }
      },
      overflow: 'visible'
    },
    fixedHeaderCells: {
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            display: 'inline-block',
            width: this._sumLockedColumnWidths(),
            height: this.props.headerHeight
          }
        } else {
          return {
            display: 'block',
            width: this.props.headerWidth,
            height: this._sumLockedColumnHeights()
          }
        }
      },
      verticalAlign: 'top'
    },
    scrollingHeaderCells: {
      includes: function() {
        if (this.props.orientation === 'landscape') {
          return {
            display: 'inline-block',
            width: "calc(100% - " + (this._sumLockedColumnWidths()) + "px)",
            height: this.props.headerHeight,
            overflowY: 'scroll'
          }
        } else {
          return {
            display: 'block',
            width: this.props.headerWidth,
            height: "calc(100% - " + (this._sumLockedColumnHeights()) + "px)",
            overflowX: 'scroll'
          }
        }
      },
      marginTop: 1,
      verticalAlign: 'top',
      whiteSpace: 'nowrap'
    }
  })

  constructor(props) {
    super(props)

    this._onCollectionUpdate = this._onCollectionUpdate.bind(this)
    this._unbindCollectionEvents = this._unbindCollectionEvents.bind(this)
    this._bindCollectionEvents = this._bindCollectionEvents.bind(this)
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this)
    this._onDocumentPaste = this._onDocumentPaste.bind(this)
    this._onDocumentCopy = this._onDocumentCopy.bind(this)
    this._unbindDocumentEvents = this._unbindDocumentEvents.bind(this)
    this._bindDocumentEvents = this._bindDocumentEvents.bind(this)
    this.getFreeColumnWidth = this.getFreeColumnWidth.bind(this)
    this.getLockedColumnWidth = this.getLockedColumnWidth.bind(this)
    this.freeCellRenderer = this.freeCellRenderer.bind(this)
    this.lockedCellRenderer = this.lockedCellRenderer.bind(this)
    this.state = {}

    this._debouncedForceUpdate = _.debounce(((function(_this) {
      return function() {
        return _this.forceUpdate()
      }
    })(this)), 50)
    
  }

  style = function(name) {
    var ref
    return _.extend({}, this.styles.get(this, name), ((ref = this.props.styles) != null ? ref[name] : void 0) || {})
  }

  static getDerivedStateFromProps = function(nextProps, prevState) {
    var newState
    newState = {}
    if (nextProps.sortColumnIndex !== prevState._cachedSortColumnIndex) {
      newState.sortColumnIndex = newState._cachedSortColumnIndex = nextProps.sortColumnIndex
    }
    if (nextProps.sortDirection !== prevState._cachedSortDirection) {
      newState.sortDirection = newState._cachedSortDirection = nextProps.sortDirection
    }
    if (_.isEmpty(newState)) {
      return null
    }
    return newState
  }

  componentDidMount = function() {
    this._bindDocumentEvents()
    return this._bindCollectionEvents()
  }

  componentDidUpdate = function(prevProps) {
    if (prevProps.collection !== this.props.collection) {
      this._unbindCollectionEvents(prevProps.collection)
      this._bindCollectionEvents()
      this._resetAfterDataTransition()
    }
    if (prevProps.columns !== this.props.columns) {
      return this._resetAfterDataTransition()
    }
  }

  componentWillUnmount = function() {
    this._unbindDocumentEvents()
    return this._unbindCollectionEvents()
  }

  render = function() {
    let lockedColumns = this._getLockedColumns()
    let freeColumns = this._getFreeColumns()
    let lockedGridProps = {
      className: "rdd-rv-grid",
      overscanRowCount: 20,
      overscanColCount: 20,
      rowHeight: this.props.rowHeight,
      rowCount: this.getRowCount(),
      datagridState: JSON.stringify(this.state)
    }
    let freeGridProps = _.extend({}, lockedGridProps)
    let lastSelectedCellPosition = this.getLastSelectedCellPosition()
    if (lastSelectedCellPosition != null) {
      freeGridProps.scrollToColumn = lastSelectedCellPosition.columnIndex - lockedColumns.length
      lockedGridProps.scrollToRow = freeGridProps.scrollToRow = lastSelectedCellPosition.rowIndex
    }

    let height = window.innerHeight
    let width = window.innerWidth

    return (
      <div style={this.style('container')} className='react-datum-datagrid'>
      <div style={this.style('headers')} className='rdd-headers'>
        <div style={this.style('fixedHeaderCells')} className='rdd-fixed-header-cells'>
          {this._renderHeaderCells(0, lockedColumns)}
        </div>
        <div style={this.style('scrollingHeaderCells')} className='rdd-scrolling-header-cells' >
          {this._renderHeaderCells(lockedColumns.length, freeColumns)}
        </div>
      </div>
      <div style={this.style('gridsContainer')} className='rdd-grids-container'>
        <div style={this.style('lockedGrid')} className='rdd-locked-grid'>
            <Grid
              cellRenderer={this.lockedCellRenderer}
              columnWidth={this.getLockedColumnWidth}
              columnCount={lockedColumns.length}
              height={height}
              width={width}
              {... lockedGridProps}
            />
          }
        </div>
        <div style={this.style('freeGrid')} className='rdd-free-grid'>
            <Grid
              cellRenderer={this.freeCellRenderer}
              columnWidth={this.getFreeColumnWidth}
              columnCount={freeColumns.length}
              height={height}
              width={width}
              {... freeGridProps}
            />
          }
        </div>
      </div>
    </div>
    )
  }

  lockedCellRenderer = function(arg) {
    return this.cellRenderer(this._getLockedColumns(), 0, arg.columnIndex, arg.rowIndex, arg.key, arg.isVisible, arg.isScrolling, arg.style)
  }

  freeCellRenderer = function(arg) {
    return this.cellRenderer(this._getFreeColumns(), this._getLockedColumns().length, arg.columnIndex, arg.rowIndex, arg.key, arg.isVisible, arg.isScrolling, arg.style)
  }

  cellRenderer = function(columns, baseColumnIndex, columnIndex, rowIndex, key, isVisible, isScrolling, style) {
    let showPlaceholder = false
    let model = this.getModelAt(rowIndex)
    return this._renderDataCell(columns[columnIndex], model, columnIndex + baseColumnIndex, rowIndex, key, style, showPlaceholder)
  }

  getLockedColumnWidth = function(arg) {
    return this.getColumnWidth(arg.index, this._getLockedColumns())
  }

  getFreeColumnWidth = function(arg) {
    return this.getColumnWidth(arg.index, this._getFreeColumns())
  }

  getColumnWidth = function(index, columns) {
    var ref
    if (columns == null) {
      columns = this.props.columns
    }
    return (ref = columns[index].width) != null ? ref : this.props.defaultColumnDef.width
  }

  getRowCount = function() {
    if (this.props.collection == null) {
      return 0
    }
    if (typeof this.props.collection.getLength === "function") {
      return this.props.collection.getLength()
    } else {
      return this.props.collection.length
    }
  }

  exportToCsv = function() {

  }

  getCollection = function() {
    return this.props.collection
  }

  _renderHeaderCells = function(baseIndex, columnDefs) {
    var cells, columnDef, index
    cells = (function() {
      var i, len, results
      results = []
      for (index = i = 0, len = columnDefs.length; i < len; index = ++i) {
        columnDef = columnDefs[index]
        results.push(this._renderHeaderCell(baseIndex + index, columnDef))
      }
      return results
    }).call(this)
    return cells
  }

  _renderHeaderCell = function(columnIndex, columnDef) {
    var HeaderCellComponent, isSelectingThisColumn, isSortedByUs, isSortingByUs, ref, ref1, sortDirection
    if (columnDef == null) {
      return null
    }
    columnDef = this.getColumnDefaults(columnDef)
    isSortedByUs = (this.state.sortColumnIndex != null) && this.state.sortColumnIndex === columnIndex
    isSortingByUs = this.state.isSorting && isSortedByUs
    sortDirection = isSortedByUs ? this.state.sortDirection : null
    isSelectingThisColumn = this.state.selectingColumnIndex === columnIndex
    HeaderCellComponent = (ref = (ref1 = columnDef.headerComponent) != null ? ref1 : columnDef.header) != null ? ref : this.props.defaultHeaderComponent

    return (
      <HeaderCellComponent
        key={columnIndex}
        column={columnDef}
        columnIndex={columnIndex}
        collection={this.props.collection}
        orientation={this.props.orientation}
        isSorting={isSortingByUs}
        sorted={sortDirection}
        isSelecting={isSelectingThisColumn}
        onSelectColumn={(evt,columnIndex) => this.onSelectColumn(evt,columnIndex)}
        onSort={(columnIndex, columnDef, direction) => this.onSortColumn(columnIndex, columnDef, direction)}

        width={this.props.headerWidth}
        height={this.props.headerHeight}
      />
    )
  }

  _renderDataCell = function(columnDef, model, columnIndex, rowIndex, key, style, showPlaceholder) {
    var editingOurselves, props, savingOurselves, value
    style = this._getCellWrapperStyle(style)
    editingOurselves = this.isCellEditing(columnIndex, rowIndex)
    savingOurselves = this.isCellSaving(columnIndex, rowIndex)
    value = editingOurselves ? this.state.editingCell.value : this.getValueAt(columnIndex, rowIndex)
    props = {
      value: value,
      key: key,
      model: model,
      column: columnDef,
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      collection: this.props.collection,
      style: style,
      showPlaceholder: showPlaceholder,
      defaultCellStyle: this._getDefaultCellStyle(columnDef),
      defaultCellComponent: this.props.defaultCellComponent,
      editable: this.canEditCell(columnDef, model),
      selected: this.isCellSelected(rowIndex, columnDef.key),
      editing: editingOurselves,
      saving: savingOurselves,
      wasSaved: this.wasCellSaved(columnIndex, rowIndex),
      saveErrors: this.getSaveErrors(columnIndex, rowIndex),
      onMouseDown: (function(_this) {
        return function(evt, cell) {
          return _this.onCellMouseDown(evt, cell)
        }
      })(this),
      onMouseUp: (function(_this) {
        return function(evt, cell) {
          return _this.onCellMouseUp(evt, cell)
        }
      })(this),
      onMouseMove: (function(_this) {
        return function(evt, cell) {
          return _this.onCellMouseMove(evt, cell)
        }
      })(this),
      onDoubleClick: (function(_this) {
        return function(evt, cell) {
          return _this.onCellEdit(evt, columnDef, model, columnIndex, rowIndex)
        }
      })(this),
      onEditIndicatorClick: (function(_this) {
        return function(evt, cell) {
          return _this.onCellEdit(evt, columnDef, model, columnIndex, rowIndex)
        }
      })(this),
      onChange: (function(_this) {
        return function(value, cell) {
          return _this.onCellChange(value, columnDef, model, columnIndex, rowIndex)
        }
      })(this)
    }
    return React.createElement(CellWrapper, Object.assign({}, props))
  }

  _getLockedColumns = function() {
    return _.filter(this.props.columns, function(columnDef) {
      return columnDef.locked
    })
  }

  _getFreeColumns = function() {
    return _.filter(this.props.columns, function(columnDef) {
      return !columnDef.locked
    })
  }

  _sumLockedColumnHeights = function() {
    var col, heightOut, i, len, ref, ref1, ref2, ref3, ref4
    heightOut = 0
    ref = this._getLockedColumns()
    for (i = 0, len = ref.length; i < len; i++) {
      col = ref[i]
      heightOut += this._convertCssPx((ref1 = col.cellStyle) != null ? ref1.borderWidth : void 0)
      heightOut += (ref2 = col.height) != null ? ref2 : this.props.defaultColumnDef.height
      heightOut += this._convertCssPx((ref3 = col.cellStyle) != null ? ref3.paddingTop : void 0)
      heightOut += this._convertCssPx((ref4 = col.cellStyle) != null ? ref4.paddingBottom : void 0)
    }
    return heightOut
  }

  _sumLockedColumnWidths = function() {
    var col, i, len, ref, ref1, ref2, ref3, ref4, widthOut
    widthOut = 0
    ref = this._getLockedColumns()
    for (i = 0, len = ref.length; i < len; i++) {
      col = ref[i]
      widthOut += this._convertCssPx((ref1 = col.cellStyle) != null ? ref1.borderWidth : void 0)
      widthOut += (ref2 = col.width) != null ? ref2 : this.props.defaultColumnDef.width
      widthOut += this._convertCssPx((ref3 = col.cellStyle) != null ? ref3.paddingTop : void 0)
      widthOut += this._convertCssPx((ref4 = col.cellStyle) != null ? ref4.paddingBottom : void 0)
    }
    return widthOut
  }

  _getFreeGridHeight = function() {
    return 300
  }

  _getFreeGridWidth = function() {
    return 300
  }

  _convertCssPx = function(value) {
    var numerals, ref
    if (value == null) {
      return null
    }
    if (_.isString(value)) {
      numerals = (ref = value.match(/[^0-9\.]*([0-9\.]*).*/)) != null ? ref[1] : void 0
      if (numerals == null) {
        return 0
      }
      return parseInt(numerals, 10)
    }
    return value
  }

  _getCellWrapperStyle = function(style) {
    return _.extend(style, {
      margin: 0,
      padding: 0
    })
  }

  _getDefaultCellStyle = function(columnDef, isHeader) {
    var cellStyle, height, ref, ref1, ref2, width
    if (isHeader == null) {
      isHeader = false
    }
    if (isHeader) {
      if (this.props.orientation === 'landscape') {
        height = this.props.headerHeight
        width = (ref = columnDef.width) != null ? ref : this.props.defaultColumnDef.width
      } else {
        height = (ref1 = columnDef.height) != null ? ref1 : this.props.defaultColumnDef.height
        width = (ref2 = columnDef.width) != null ? ref2 : this.props.defaultColumnDef.width
      }
    }
    cellStyle = {
      height: height,
      width: width
    }
    return cellStyle
  }

  _resetAfterDataTransition = function() {
    if (this.isDatagridEditing()) {
      this.cancelEditing()
    }
    return this.resetSelectedCells()
  }

  _bindDocumentEvents = function() {
    document.addEventListener('copy', this._onDocumentCopy)
    document.addEventListener('paste', this._onDocumentPaste)
    return document.addEventListener('keydown', this._onDocumentKeyDown)
  }

  _unbindDocumentEvents = function() {
    document.removeEventListener('copy', this._onDocumentCopy)
    document.removeEventListener('paste', this._onDocumentPaste)
    return document.removeEventListener('keydown', this._onDocumentKeyDown)
  }

  _onDocumentCopy = function(evt) {
    return this.GridCopyPaste_onDocumentCopy(evt)
  }

  _onDocumentPaste = function(evt) {
    return this.GridCopyPaste_onDocumentPaste(evt)
  }

  _onDocumentKeyDown = function(evt) {
    return this.GridSelect_onDocumentKeyDown(evt)
  }

  _bindCollectionEvents = function(collection) {
    if (collection == null) {
      collection = this.props.collection
    }
    return collection != null ? typeof collection.on === "function" ? collection.on('reset add remove', this._onCollectionUpdate) : void 0 : void 0
  }

  _unbindCollectionEvents = function(collection) {
    if (collection == null) {
      collection = this.props.collection
    }
    return collection != null ? typeof collection.off === "function" ? collection.off('reset add remove', this._onCollectionUpdate) : void 0 : void 0
  }

  _onCollectionUpdate = function() {
    return this._debouncedForceUpdate()
  }
  
}

Mixin(Datagrid, 'GridScroll', GridScroll)
Mixin(Datagrid, 'GridEdit', GridEdit)
Mixin(Datagrid, 'GridSelect', GridSelect)
Mixin(Datagrid, 'GridCopyPaste', GridCopyPaste)
Mixin(Datagrid, 'GridExport', GridExport)
Mixin(Datagrid, 'GridSort', GridSort)

export default Datagrid