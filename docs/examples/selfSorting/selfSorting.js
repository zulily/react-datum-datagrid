"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var puppyCollection = new Backbone.Collection(PUPPY_DATA);

var SelfSortingDatagridDisplay = function (_React$Component) {
  _inherits(SelfSortingDatagridDisplay, _React$Component);

  function SelfSortingDatagridDisplay() {
    _classCallCheck(this, SelfSortingDatagridDisplay);

    return _possibleConstructorReturn(this, (SelfSortingDatagridDisplay.__proto__ || Object.getPrototypeOf(SelfSortingDatagridDisplay)).apply(this, arguments));
  }

  _createClass(SelfSortingDatagridDisplay, [{
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

  return SelfSortingDatagridDisplay;
}(React.Component);

SelfSortingDatagridDisplay.displayName = "EditableDatagridDisplay";


window.Demo = SelfSortingDatagridDisplay;