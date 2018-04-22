

var _datagrid = require('./lib/datagrid')
var _cell = require('./lib/cell')
var _headerCell = require('./lib/headerCell')

var _ReactDatumDatagrid = {
  Datagrid: _datagrid,
  Cell: _cell,
  HeaderCell: _headerCell
}

if(window){
  window.ReactDatumDatagrid = _ReactDatumDatagrid
}
if(module){
  module.exports = _ReactDatumDatagrid
}
