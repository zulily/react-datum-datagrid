
React = require 'react'
PropTypes = require 'prop-types'

module.exports = class SortIndicator extends React.Component
  
  @propTypes: 
    sorted: PropTypes.oneOf(['ASC', 'DESC'])
    # callback method called when user clicks sort indicator. Called with (evt, columnIndex)
    onSort: PropTypes.func
    # callback method called when user clicks column name called with (evt, columnIndex)
    onSelectColumn: PropTypes.func


  render: ->
    icon = null
    className = 'rdd-header-icon'
    switch @props.sorted
      when 'ASC' 
        icon = @renderSortedAsc()
        className += ' rdd-sort-indicator-asc'
      when 'DESC' 
        icon = @renderSortedDesc()
        className += ' rdd-sort-indicator-desc'
      else 
        icon = @renderUnsorted()
        className += ' rdd-sort-indicator'
      
    <div className={className} 
      title="click to edit this cell, or double click anywhere in cell, or press enter with cell selected" 
      onClick={@props.onClick}
    >
      {icon}
    </div>
    
    
  renderUnsorted: ->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"/></svg>

  renderSortedAsc: ->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"/></svg>    
    
  renderSortedDesc: ->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/></svg>