'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_COLUMN_WIDTH = 150;

var COLUMNS = [{
  key: 'imageUrl',
  width: 120
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
  width: 200
}, {
  key: 'contactCity'
}, {
  key: 'petfinderURL'
}, {
  key: 'description',
  width: 200
}];

var Datagrid = function (_React$Component) {
  _inherits(Datagrid, _React$Component);

  function Datagrid() {
    _classCallCheck(this, Datagrid);

    return _possibleConstructorReturn(this, (Datagrid.__proto__ || Object.getPrototypeOf(Datagrid)).apply(this, arguments));
  }

  _createClass(Datagrid, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { style: { width: 400, height: 300 } },
        React.createElement(
          ReactVirtualized.AutoSizer,
          null,
          function (_ref) {
            var height = _ref.height,
                width = _ref.width;
            return React.createElement(ReactVirtualized.Grid, {
              height: height,
              width: width,
              columnCount: COLUMNS.length,
              rowHeight: 100,
              rowCount: PUPPY_DATA.length,
              cellRenderer: _this2.cellRenderer,
              columnWidth: _this2.getColumnWidth
            });
          }
        )
      );
    }
  }, {
    key: 'cellRenderer',
    value: function cellRenderer(_ref2) {
      var rowIndex = _ref2.rowIndex,
          columnIndex = _ref2.columnIndex,
          key = _ref2.key,
          isScrolling = _ref2.isScrolling,
          isVisible = _ref2.isVisible,
          style = _ref2.style;

      style = _.extend({}, style, {
        wordWrap: 'break',
        border: '1px solid whitesmoke',
        overflow: 'hidden'
      });
      return React.createElement(
        'div',
        { style: style, key: key },
        React.createElement(
          'span',
          null,
          PUPPY_DATA[rowIndex][COLUMNS[columnIndex].key]
        )
      );
    }
  }, {
    key: 'getColumnWidth',
    value: function getColumnWidth(_ref3) {
      var index = _ref3.index;

      return COLUMNS[index].width || DEFAULT_COLUMN_WIDTH;
    }
  }]);

  return Datagrid;
}(React.Component);

window.Demo = Datagrid;