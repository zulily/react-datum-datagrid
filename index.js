

var _ReactDatum = {
  // contextual components
  ClickToEditForm:   require('./lib/clickToEditForm'),
  ContextualData:    require('./lib/contextualData'),
  Collection:        require('./lib/collection'),
  CollectionStats:   require('./lib/collectionStats'),
  Form:              require('./lib/form'),
  Model:             require('./lib/model'),
  SelectedModel:     require('./lib/selectedModel'),
  
  // Datums
  Datum:             require('./lib/datums/datum'),
  Email:             require('./lib/datums/email'),
  LazyPhoto:         require('./lib/datums/lazyPhoto'),
  Link:              require('./lib/datums/link'),
  Number:            require('./lib/datums/number'),
  Percent:           require('./lib/datums/percent'),
  Text:              require('./lib/datums/text'),
  Label:             require('./lib/datums/label'),
  WholeNumber:       require('./lib/datums/wholeNumber'),

  // Global options
  Options:           require('./lib/options'),
  
  
  // TODO : i think this and react-select will eventually go to a separate 
  //    npm package so that the core doesn't have dependency on react-select
  CollectionPicker:  require('./lib/datums/collectionPicker/collectionPicker'),
  // react-select 
  ReactSelect:       require('react-select'),
  SelectOption:      require('react-select/lib/Option.js'),
  

}
if(window){
  window.ReactDatum = _ReactDatum
}
if(module){
  module.exports = _ReactDatum
}