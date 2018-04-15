

var PuppyModel = Backbone.Model.extend({
  save: function(attrs, options){ 
    options.success(this)
    return true
  }
})

var PuppyCollection = Backbone.Collection.extend({
  model: PuppyModel
})

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var puppyCollection = new PuppyCollection(PUPPY_DATA)

// The above is all backbone setup that you would probably do 
// elsewhere or would not need to do, like stub out model save

class BasicDatagridDisplay extends React.Component {
  static displayName = "BasicDatagridDisplay"
  
  render(){
    return (
      <ReactDatumDatagrid 
        collection={puppyCollection}
        columns={this.getColumns()}
        headerHeight={40}
        rowHeight={110}
        defaultColumnDef={{
          width: 150
        }}/>
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
      },
    }]
  }
}

window.Demo = BasicDatagridDisplay
