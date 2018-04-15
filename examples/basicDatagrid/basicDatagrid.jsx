

var KittenModel = Backbone.Model.extend({
  save: function(attrs, options){ 
    options.success(this)
    return true
  }
})

var KittenCollection = Backbone.Collection.extend({
  model: KittenModel
})

// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var kittenCollection = new KittenCollection(KITTEN_DATA)

// The above is all backbone setup that you would probably do 
// elsewhere or would not need to do, like stub out model save

class BasicDatagridDisplay extends React.Component {
  static displayName = "BasicDatagridDisplay"
  
  render(){
    return (
      <ReactDatumDatagrid 
        collection={kittenCollection}
        columns={this.getColumns()}
        headerHeight={60}
        rowHeight={100}
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
