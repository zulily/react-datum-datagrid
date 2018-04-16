

// PUPPY_DATA is a static array of data from petfinder api that gets loaded via script tag 
//   for the examples.  In a real application, you would probably fetch() the collection.
let puppyCollection = new Backbone.Collection(PUPPY_DATA)


class BasicDatagridDisplay extends React.Component {
  static displayName = "BasicDatagridDisplay"
  
  render(){
    // ReactDatumDatagrid will fill what ever element it is placed in
    // Below we constrain it to 100% of the demo pane and a fixed width of 600px
    // You can also use Flex!  See TODO Flexy Demo
    return (
      <div style={{height: "100%", width: 600}}>
        <ReactDatumDatagrid 
          collection={puppyCollection}
          columns={this.getColumns()}
          headerHeight={40}
          rowHeight={110}
          defaultColumnDef={{
            width: 150
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
      locked: true
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
      width: '200',
      datum: ReactDatum.Email,
      datumProps: {
        ellipsizeAt: false,
        reverseEllipsis: true,
      }
    }]
  }
}

window.Demo = BasicDatagridDisplay
