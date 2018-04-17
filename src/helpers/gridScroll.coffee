

###
  This mixin (see ./mixin.coffee) provides the scrolling syncronization between headers, 
  locked columns and free scrolling grids

###
module.exports = class GridScroll
  
  
  componentDidMount: ->
    @_initializeScrolling()
    @originalMethod?()
  
  
  _initializeScrolling: ->
    lockedGridEl = @_getLockedGridEl()
    freeGridEl = @_getFreeGridEl()
    lockedGridEl.addEventListener('scroll', => @_onLockedGridScroll())
    freeGridEl.addEventListener('scroll', => @_onFreeGridScroll())
    
    scrollingHeaderCellsEl = @_getScrollingHeadersEl()
    scrollingHeaderCellsEl.addEventListener('scroll', => @_onHeaderScroll())
    
    
  _getLockedGridEl: ->
    ReactDOM.findDOMNode(@).querySelector '.rdd-locked-grid .rdd-rv-grid'
    
    
  _getFreeGridEl: ->
    ReactDOM.findDOMNode(@).querySelector '.rdd-free-grid .rdd-rv-grid'
    
    
  _getScrollingHeadersEl: ->
    ReactDOM.findDOMNode(@).querySelector '.rdd-scrolling-header-cells'  
  
    
  _onLockedGridScroll: =>
    unless @_isFreeGridInitiatedScrolling
      @_isLockedGridInitiatedScrolling = true
      lockedGridEl = @_getLockedGridEl()
      freeGridEl = @_getFreeGridEl()
      
      if @props.orientation == 'landscape'
        freeGridEl.scrollTop = lockedGridEl.scrollTop
      else
        freeGridEl.scrollLeft = lockedGridEl.scrollLeft
    
    @_isFreeGridInitiatedScrolling = false
    

  _onFreeGridScroll: =>
    unless @_isLockedGridInitiatedScrolling || @_isLabelInitiatedScrolling
      @_isFreeGridInitiatedScrolling = true
      lockedGridEl = @_getLockedGridEl()
      freeGridEl = @_getFreeGridEl()
      
      if @props.orientation == 'landscape'
        lockedGridEl.scrollTop = freeGridEl.scrollTop
      else
        lockedGridEl.scrollLeft = freeGridEl.scrollLeft
    
    @_isLockedGridInitiatedScrolling = false
    
    unless @_isLabelInitiatedScrolling
      scrollingHeaderCellsEl = @_getScrollingHeadersEl()
      freeGridEl = @_getFreeGridEl()
      if @props.orientation == 'landscape'
        scrollingHeaderCellsEl.scrollLeft = freeGridEl.scrollLeft
      else
        scrollingHeaderCellsEl.scrollTop = freeGridEl.scrollTop
      
    @_isLabelInitiatedScrolling = false

      
  _onHeaderScroll: =>
    unless @_isFreeGridInitiatedScrolling
      @_isLabelInitiatedScrolling = true
      scrollingHeaderCellsEl = @_getScrollingHeadersEl()
      freeGridEl = @_getFreeGridEl()
      if @props.orientation == 'landscape'
        freeGridEl.scrollLeft = scrollingHeaderCellsEl.scrollLeft
      else
        freeGridEl.scrollTop = scrollingHeaderCellsEl.scrollTop
    
    @_isFreeGridInitiatedScrolling = false
        
  