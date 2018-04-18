
const DEFAULT_COLUMN_WIDTH = 150;

const COLUMNS = [{
  key: 'imageUrl',
  width: 120,
},{
  key: 'name',
},{
  key: 'breed',
},{
  key: 'size',
  width: 80,
},{
  key: 'sex',
  width: 80,
},{
  key: 'contactEmail',
  width: 200,
},{
  key: 'contactCity',
},{
  key: 'petfinderURL'
},{
  key: 'description',
  width: 200
}]


class Datagrid extends React.Component {
  
  render() {
    return (
      <div style={{width: 400, height: 300}}>
        <ReactVirtualized.AutoSizer>
        { ({height, width}) =>
          <ReactVirtualized.Grid
            height={height}
            width={width}
            columnCount={COLUMNS.length}
            rowHeight={100}
            rowCount={PUPPY_DATA.length}
            cellRenderer={this.cellRenderer}
            columnWidth={this.getColumnWidth}
          />
        }
        </ReactVirtualized.AutoSizer>
      </div>
    )
  }
  
  cellRenderer({rowIndex, columnIndex, key, isScrolling, isVisible, style}) {
    style = _.extend({}, style, {
      wordWrap: 'break',
      border: '1px solid whitesmoke',
      overflow: 'hidden'
    })
    return (
      <div style={style} key={key}>
        <span>{PUPPY_DATA[rowIndex][COLUMNS[columnIndex].key]}</span>
      </div>
    )
  }
  
  getColumnWidth({index}){
    return COLUMNS[index].width || DEFAULT_COLUMN_WIDTH
  }
}

window.Demo = Datagrid

