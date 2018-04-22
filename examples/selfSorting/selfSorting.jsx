

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
let puppyCollection = new Backbone.Collection(PUPPY_DATA)


class SelfSortingDatagridDisplay extends React.Component {
  static displayName = "EditableDatagridDisplay"
  
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

window.Demo = SelfSortingDatagridDisplay
