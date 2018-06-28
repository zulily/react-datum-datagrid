"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var puppyCollection = new Backbone.Collection(PUPPY_DATA);

// If your Backbone collection has an onDatagridSort method, that will be called
// to sort the grid.    You MUST call options.success() or options.error()
puppyCollection.onDatagridSort = function (columnKey, direction, columnDef) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

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
  this.models = this.models.sort(function (a, b) {
    var aVal = a.get(columnKey);
    var bVal = b.get(columnKey);
    var isNumeric = isFinite(aVal) && isFinite(bVal);
    if (direction == "DESC") {
      var temp = aVal;aVal = bVal;bVal = temp;
    }
    if (isNumeric) {
      return aVal - bVal;
    } else {
      aVal = (aVal || "").toString();
      bVal = (bVal || "").toString();
      return aVal.localeCompare(bVal);
    }
  });
  alert('we can sort our own grid, thank you very much');
  options.success(this);
};

var CollectionSortingDatagridDisplay = function (_React$Component) {
  _inherits(CollectionSortingDatagridDisplay, _React$Component);

  function CollectionSortingDatagridDisplay() {
    _classCallCheck(this, CollectionSortingDatagridDisplay);

    return _possibleConstructorReturn(this, (CollectionSortingDatagridDisplay.__proto__ || Object.getPrototypeOf(CollectionSortingDatagridDisplay)).apply(this, arguments));
  }

  _createClass(CollectionSortingDatagridDisplay, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { style: { height: "100%", width: 900 } },
        React.createElement(ReactDatumDatagrid.Datagrid, {
          collection: puppyCollection,
          columns: this.getColumns(),
          headerHeight: 40,
          rowHeight: 110,
          defaultColumnDef: {
            width: 150,
            // The default is normally not sortable.
            // Since we want all columns except one to be sortable...
            sortable: true
          } })
      );
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return [{
        key: 'imageUrl',
        name: 'Image',
        width: 120,
        datum: ReactDatum.LazyPhoto,
        // explicit column definition takes precedence over defaultColumnDef prop
        sortable: false
      }, {
        key: 'name'
      }, {
        key: 'breed'
      }, {
        key: 'size',
        width: 80
      }, {
        key: 'sex',
        width: 80
      }, {
        key: 'contactEmail',
        width: '250',
        datum: ReactDatum.Email,
        datumProps: {
          ellipsizeAt: false,
          reverseEllipsis: true
        }
      }];
    }
  }]);

  return CollectionSortingDatagridDisplay;
}(React.Component);

CollectionSortingDatagridDisplay.displayName = "CollectionSortingDatagridDisplay";


window.Demo = CollectionSortingDatagridDisplay;