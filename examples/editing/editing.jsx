

let PuppyModel = Backbone.Model.extend({
  // Stub out save method and pretended it saved successfully (FOR DEMO PURPOSES ONLY)
  save: function(attrs, options){ 
    options.success(this)
    return true
  }
})

let PuppyCollection = Backbone.Collection.extend({
  model: PuppyModel
})

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
let puppyCollection = new PuppyCollection(PUPPY_DATA)


class EditableDatagridDisplay extends React.Component {
  static displayName = "BasicDatagridDisplay"
  
  render(){
    return (
      <ReactDatumDatagrid 
        collection={puppyCollection}
        columns={this.getColumns()}
        headerHeight={40}
        rowHeight={110}
        defaultColumnDef={{
          width: 150,
          // The default is normally not editable.
          // Since we want all columns except one to be editable...
          editable: true
        }}/>
    )
  }
  
  getColumns(){
    return [{
      key: 'imageUrl',
      name: 'Image',
      width: 120,
      datum: ReactDatum.LazyPhoto,
      locked: true,
      // explicit column definition takes precedence over defaultColumnDef prop
      editable: false
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

window.Demo = EditableDatagridDisplay
