

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
let puppyCollection = new Backbone.Collection(PUPPY_DATA)

// If your Backbone collection has an onDatagridSort method, that will be called
// to sort the grid.    You MUST call options.success() or options.error()
puppyCollection.onDatagridSort = function(columnKey, direction, columnDef, options={}){
  // Normally in the this method we would call fetch to fetch a sorted collection and 
  // pass through the options like:
  //    
  //    options = _.extend({}, options, {
  //        data: {sort: columnKey, sortDir: direction}
  //    })
  //    this.fetch(options)
  //
  // FOR DEMO PURPOSES ONLY 
  // below is essentially what the datagrid internal sort will do for you
  // if sorting on one attribute in the model is what you want, you could
  // skip 
  this.models = this.models.sort(function(a, b){
    let aVal = a.get(columnKey)
    let bVal = b.get(columnKey)
    let isNumeric = isFinite(aVal) && isFinite(bVal)
    if( direction == "DESC" ){
      let temp = aVal; aVal = bVal; bVal = temp 
    }
    if( isNumeric ){
      return aVal - bVal
    } else {
      aVal = (aVal || "").toString()
      bVal = (bVal || "").toString()
      return aVal.localeCompare(bVal)
    }
  })
  alert('we can sort our own grid, thank you very much')
  options.success(this)
}

class CollectionSortingDatagridDisplay extends React.Component {
  static displayName = "CollectionSortingDatagridDisplay"
  
  render(){
    return (
      <div style={{height: "100%", width: 900}}>
        <ReactDatumDatagrid.Datagrid
          collection={puppyCollection}
          columns={this.getColumns()}
          headerHeight={40}
          rowHeight={110}
          defaultColumnDef={{
            width: 150,
            // The default is normally not sortable.
            // Since we want all columns except one to be sortable...
            sortable: true
          }}/>
      </div>
    )
  }
  
  getColumns(){
    return [{
      key: 'imageUrl',
      name: 'Image',
      width: 120,
      datum: ReactDatum.LazyPhoto,
      // explicit column definition takes precedence over defaultColumnDef prop
      sortable: false
    },{
      key: 'name'
    },{
      key: 'breed'
    },{
      key: 'size',
      width: 80
    },{
      key: 'sex',
      width: 80
    },{
      key: 'contactEmail',
      width: '250',
      datum: ReactDatum.Email,
      datumProps: {
        ellipsizeAt: false,
        reverseEllipsis: true,
      }
    }]
  }
}

window.Demo = CollectionSortingDatagridDisplay
