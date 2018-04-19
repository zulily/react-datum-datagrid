

let PuppyModel = Backbone.Model.extend({
  // Stub out save method and pretend it saved successfully (FOR DEMO PURPOSES ONLY)
  save: function(attrs, options){ 
    // add a few seconds delay to see the saving indicator
    _.delay( function(){
      options.success(this, "OK", options)
      console.log("Pretended to save model.", attrs, this)
    }, 2000 )   
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
  static displayName = "EditableDatagridDisplay"
  
  render(){
    return (
      <div style={{height: "100%", width: 900}}>
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
      editable: false
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

window.Demo = EditableDatagridDisplay
