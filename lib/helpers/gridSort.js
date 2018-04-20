(function() {
  var Bstr, GridSort;

  Bstr = require('bumble-strings');

  module.exports = GridSort = (function() {
    function GridSort() {}

    GridSort.prototype.onSortColumn = function(columnIndex, columnDef, direction) {
      return this.setState({
        isSorting: true,
        sortColumnIndex: columnIndex,
        sortDirection: direction
      }, (function(_this) {
        return function() {
          var arrayToSort, getSortableValue, i, len, model, ref;
          if (_this.props.onSort) {
            return _this.props.onSort(columnIndex, columnDef, direction, function() {
              return _this.setState({
                isSorting: false
              });
            });
          } else if (_.isFunction((ref = _this.props.collection) != null ? ref.onDatagridSort : void 0)) {
            return _this.props.collection.onDatagridSort(columnDef.key, direction, columnDef, {
              success: function() {
                return _this.setState({
                  isSorting: false
                });
              },
              error: function() {
                return _this.setState({
                  isSorting: false
                });
              }
            });
          } else {
            getSortableValue = function(object) {
              var attr, ref1;
              attr = (ref1 = columnDef.sortAttr) != null ? ref1 : columnDef.key;
              if (_.isFunction(object.get)) {
                return object.get(attr);
              } else {
                return object[attr];
              }
            };
            arrayToSort = _.isArray(_this.props.collection) ? _this.props.collection : _this.props.collection.models || [];
            arrayToSort.sort(function(a, b) {
              var aVal, bVal, isNumeric, ref1, temp;
              aVal = getSortableValue(a);
              bVal = getSortableValue(b);
              isNumeric = isFinite(aVal) && isFinite(bVal);
              if (direction === "DESC") {
                temp = aVal;
                aVal = bVal;
                bVal = temp;
              }
              if (isNumeric) {
                return aVal - bVal;
              } else {
                return Bstr.weaklyCompare((ref1 = aVal != null ? aVal.toString() : void 0) != null ? ref1 : "", bVal != null ? bVal : "");
              }
            });
            for (i = 0, len = arrayToSort.length; i < len; i++) {
              model = arrayToSort[i];
              delete model.index;
              delete model.attributes.index;
            }
            if (_.isFunction(_this.props.collection.reset)) {
              _this.props.collection.reset(arrayToSort);
            } else {
              _this.props.collection = arrayToSort;
            }
            return _this.setState({
              isSorting: false
            });
          }
        };
      })(this));
    };

    return GridSort;

  })();

}).call(this);
