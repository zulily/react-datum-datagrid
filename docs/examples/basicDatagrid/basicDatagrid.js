"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// PUPPY_DATA is a static array of data from petfinder api that gets loaded via script tag 
//   for the examples.  In a real application, you would probably fetch() the collection.
var puppyCollection = new Backbone.Collection(PUPPY_DATA);

var BasicDatagridDisplay = function (_React$Component) {
  _inherits(BasicDatagridDisplay, _React$Component);

  function BasicDatagridDisplay() {
    _classCallCheck(this, BasicDatagridDisplay);

    return _possibleConstructorReturn(this, (BasicDatagridDisplay.__proto__ || Object.getPrototypeOf(BasicDatagridDisplay)).apply(this, arguments));
  }

  _createClass(BasicDatagridDisplay, [{
    key: "render",
    value: function render() {
      // ReactDatumDatagrid will fill what ever element it is placed in
      // Below we constrain it to 100% of the demo pane and a fixed width of 600px
      // You can also use Flex!  See TODO Flexy Demo
      return React.createElement(
        "div",
        { style: { height: "100%", width: 600 } },
        React.createElement(ReactDatumDatagrid.Datagrid, {
          collection: puppyCollection,
          columns: this.getColumns(),
          headerHeight: 40,
          rowHeight: 110,
          defaultColumnDef: {
            width: 150
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
        locked: true
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
        width: '200',
        datum: ReactDatum.Email,
        datumProps: {
          ellipsizeAt: false,
          reverseEllipsis: true
        }
      }];
    }
  }]);

  return BasicDatagridDisplay;
}(React.Component);

BasicDatagridDisplay.displayName = "BasicDatagridDisplay";


window.Demo = BasicDatagridDisplay;