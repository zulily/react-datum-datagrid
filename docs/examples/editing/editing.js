"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var saveCount = 0;

var PuppyModel = Backbone.Model.extend({
  // Stub out save method and pretend it saved successfully (FOR DEMO PURPOSES ONLY)
  save: function save(attrs, options) {
    saveCount++;
    // add a few seconds delay to see the saving indicator
    _.delay(function () {
      // simulate a failure on every 5th Edit
      if (saveCount % 5 == 0) {
        options.error(this, "Not cool, man. Not cool.", options);
        console.log("Pretended to fail saving model.", attrs, this);
      } else {
        options.success(this, "OK", options);
        console.log("Pretended to successfully save model.", attrs, this);
      }
    }, 2000);
    return true;
  }
});

var PuppyCollection = Backbone.Collection.extend({
  model: PuppyModel
});

// PUPPY_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var puppyCollection = new PuppyCollection(PUPPY_DATA);

var EditableDatagridDisplay = function (_React$Component) {
  _inherits(EditableDatagridDisplay, _React$Component);

  function EditableDatagridDisplay() {
    _classCallCheck(this, EditableDatagridDisplay);

    return _possibleConstructorReturn(this, (EditableDatagridDisplay.__proto__ || Object.getPrototypeOf(EditableDatagridDisplay)).apply(this, arguments));
  }

  _createClass(EditableDatagridDisplay, [{
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
            // The default is normally not editable.
            // Since we want all columns except one to be editable...
            editable: true
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
        editable: false
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

  return EditableDatagridDisplay;
}(React.Component);

EditableDatagridDisplay.displayName = "EditableDatagridDisplay";


window.Demo = EditableDatagridDisplay;