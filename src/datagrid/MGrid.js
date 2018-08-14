import React, { Component } from 'react'

import MultiGrid from 'react-virtualized/dist/es/MultiGrid'
import './MGrid.css'

class MGrid extends Component {
  cellRenderer({ columnIndex, key, rowIndex, style }) {
      rowIndex = rowIndex -1
      if (rowIndex === -1) {
        let classNames = 'cell cell-header'
        classNames += columnIndex === 0 ? ' cell-locked' : ''
        return (
            <div className={classNames} key={key} style={style}>
                {this.props.columns[columnIndex].key}
            </div>
        )
    } else {
        let classNames = 'cell'
        classNames += (rowIndex % 2) === 0 ? ' cell-row-even' : ' cell-row-odd'
        classNames += columnIndex === 0 ? ' cell-locked' : ''
        return (
            <div className={classNames} key={key} style={style}>
                {"" + this.props.collection[rowIndex][this.props.columns[columnIndex].key]}
            </div>
        ) 
    } 
  }
  render() {
    if (this.props.loading) {
        return (<div>Loading...</div>)
      } else if (!this.props.collection || !this.props.collection.length) {
        return (<div>No Data</div>)
      }
    return (
        <MultiGrid 
          columnCount={this.props.columns.length}
          rowCount={this.props.collection.length+1}
          cellRenderer={this.cellRenderer.bind(this)}
          columnWidth={300}
          rowHeight={50}
          height={this.props.height}
          width={this.props.width}
          fixedColumnCount={1}
          fixedRowCount={1}
          overscanColumnCount={25}
          overscanRowCount={25}
        />
    )
  }
}

export default MGrid
