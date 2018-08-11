(function() {
  var GridExport;

  module.exports = GridExport = (function() {
    function GridExport() {}


    /* 
      exports the currently viewed grid and data to csv
     */

    GridExport.prototype.exportToCsv = function() {
      var collection, column, columnHeader, columns, exportCols, headers, i, j, len, model, ref, rowIndex, rows, value;
      collection = this.props.collection;
      columns = this.getColumns();
      rows = [];
      headers = (function() {
        var i, len, ref, results;
        results = [];
        for (i = 0, len = columns.length; i < len; i++) {
          column = columns[i];
          if (!column.exportable) {
            continue;
          }
          columnHeader = [column.exportAs || column.givenName || column.name];
          if (column.alsoExport != null) {
            columnHeader.push((ref = column.alsoExport) != null ? ref.name : void 0);
          }
          results.push(columnHeader);
        }
        return results;
      })();
      rows.push(headers.join(','));
      if ((collection != null ? collection.length : void 0) > 0) {
        for (rowIndex = i = 0, ref = this.getRowCount(); 0 <= ref ? i < ref : i > ref; rowIndex = 0 <= ref ? ++i : --i) {
          model = this.getModelAt(rowIndex);
          if (model == null) {
            continue;
          }
          exportCols = [];
          for (j = 0, len = columns.length; j < len; j++) {
            column = columns[j];
            if (!column.exportable) {
              continue;
            }
            value = this.getExportValue(model, column, {
              forCsv: true
            });
            exportCols.push('"' + ((value != null ? value.toString() : void 0) || '') + '"');
            if (column.alsoExport != null) {
              value = this.getExportValue(model, column.alsoExport);
              exportCols.push('"' + ((value != null ? value.toString() : void 0) || '') + '"');
            }
          }
          rows.push(exportCols.join(','));
        }
      }
      return rows.join('\n');
    };

    return GridExport;

  })();

}).call(this);
