

var KittenModel = Backbone.Model.extend({
  save: function(attrs, options){ 
    options.success(this)
    return true
  }
})
// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var KittenCollection = Backbone.Collection.extend({
  model: KittenModel
})

var kittenCollection = new KittenCollection(KITTEN_DATA)

// The above is all backbone setup that you would probably do 
// elsewhere or would not need to do, like stub out model save

// Below is really most of what you need for a basic list
// left, form right type view.  All in 30 lines of code!

class BasicDatagridDisplay extends React.Component {
  static displayName = "BasicDatagridDisplay"
  
  render(){
    return (
      <ReactDatumDatagrid 
        collection={kittenCollection}
        columns={this.getColumns()}
        headerHeight={60}
        rowHeight={100}/>
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
      key: 'email',
      datum: ReactDatum.Email,
      datumProps: {
        ellipsizeAt: 20,
        reverseEllipsis: true,
      },
    }]
  }
}

window.Demo = BasicDatagridDisplay
