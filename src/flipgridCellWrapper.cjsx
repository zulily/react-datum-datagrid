App.namespace 'App.views.eventProductSetup.buydoc.datagrid', require: [

  'views/reactView'
  
  
  'views/widgets/react/datagrid/defaultEditor'

  'views/eventProductSetup/buydoc/datagrid/cell'
  
], (x, loadedLibs...) ->
  
  
  class x.FlipGridCellWrapper extends App.views.ReactView
    
    @props: 
      model: React.PropTypes.any
      column: React.PropTypes.object
      rowIdx: React.PropTypes.number
      colIdx: React.PropTypes.number
      datagrid: React.PropTypes.any
      defaultCellStyle: React.PropTypes.object
      
    styles:
      wrapper: 
        outline: 'none';
      
    componentWillMount: ->
      @setState editing: false, selected: false
      super
      @_bindEvents()
      
      
    componentWillUnmount: ->
      super
      @_unbindEvents()
      
      
    render: ->
      if @state.editing 
        CellComponent = @props.column.editor ? App.views.widgets.react.datagrid.DefaultEditor
      else
        CellComponent = @props.column.formatter ? x.Cell
        
      _.defer =>
        @refs.cellComponent?.getInputNode?()
      
      dataProps = 
        'data-row': @props.rowIdx
        'data-col': @props.colIdx
        
      classNames = @conditionalClassNames 'flipgrid-cell-wrapper', selected: @isSelected()

      <div className={classNames} style={@style('wrapper')}
          tabIndex={1}
          onKeyDown={@_onCellKeydown}
          onFocus={@_onCellFocus}
          onBlur={@_onCellBlur}
          onDoubleClick={@_onCellEdit}
          {... dataProps}
          
      >
        <CellComponent 
          rowData={@props.model}
          rowIdx={@props.rowIdx}
          column={@props.column}
          value={@props.model?.get(@props.column.key)}
          datagrid={@props.datagrid}
          defaultCellStyle={@props.defaultCellStyle}
          ref={'cellComponent'}
          onEdit={@_onCellEdit}
        />
      </div>
      

    edit: ->
      return unless @props.datagrid?.canEditCell?(@props.column, @props.model)
      @setState editing: true
      

    focus: ->
      ReactDOM.findDOMNode(@).focus()
      
    
    isSelected: ->
      @props.selected || @props.datagrid?.isCellSelected?(@props.rowIdx, @props.column.key)


    _bindEvents: () ->
      # $(document).on 'keydown.flipgridCell', @_onDocumentKeyDown(evt)
      # $(document).on 'dblclick.flipgridCell', @(evt)
      # $(document).on 'mousedown.GridSelect', '.datagrid-cell', @__onDocumentMouseDown(evt)
      
      
    _unbindEvents: () ->
    
    
    _onCellFocus: (evt) =>
      @setState selected: true
      
      
    _onCellBlur: (evt) =>
      # defer to give editing a chance to happen, and focus gets put on edit input
      _.defer =>
        unless $.contains(ReactDOM.findDOMNode(this), document.activeElement) 
          @setState selected: false, editing: false
      
    
    _onCellKeydown: (evt) =>
      #console.log 'FlipGridCellWrapper _onCellKeydown', evt.key
      switch evt.key
        when 'Enter'
          if @state.editing
            @_save()
            newCell = if evt.shiftKey
              @_focusUp()
            else
              @_focusDown()
            newCell.find('i.fa-pencil').trigger('click')
          else
            @edit()
        when 'Tab'
          evt.preventDefault()
          newCell = if evt.shiftKey
            @_focusLeft()
          else
            @_focusRight()

          if @state.editing
            @_save()
            # TODO : this is a hack we should probably comunicate this back up to
            #  flipgrid and have it tell the adjacent cell to go into edit
            # I tried triggering dblclick on the newCell but that didn't do the thing
            _.defer => newCell.find('i.fa-pencil').trigger('click')
          
        when 'Escape' then @_cancel()
        when 'ArrowRight' then @_onArrowRight(evt)
        when 'ArrowLeft' then @_onArrowLeft(evt)
        when 'ArrowUp' then @_onArrowUp(evt)
        when 'ArrowDown' then @_onArrowDown(evt)
        
      
    _onCellEdit: =>
      @edit()
    
    
    _onArrowRight: (evt) =>
      evt.preventDefault()
      @_focusRight()  
      
      
    _onArrowLeft: (evt) =>
      evt.preventDefault()
      @_focusLeft()
      
        
    _onArrowUp: (evt) =>
      evt.preventDefault()
      @_focusUp()
      
        
    _onArrowDown: (evt) =>
      evt.preventDefault()
      @_focusDown()
      
        
      
    ###
      rowEvt from react-data-grid looks like this:
      {  
        cellKey: "costing.wholesaleCost.amount"
        key: "Enter"
        rowIdx: 0
        updated: "24"
      }
      flipgrid ignores .key
    ###
    _save: ->
      rowEvt = 
        cellKey: @props.column.key
        key: "Other"
        rowIdx: @props.rowIdx
        # cell component must have a getValue method. See DefaultEditor
        updated: @refs.cellComponent.getValue()
      @props.datagrid.saveModel(@props.model, rowEvt)
      @setState editing: false
      
      
    _cancel: ->
      @setState editing: false
      _.defer => @focus()
      
      
    _focusRight: ->
      @_focusOffset(0, 1)

    
    _focusLeft: ->
      @_focusOffset(0, -1)


    _focusUp: ->
      @_focusOffset(-1, 0)

    
    _focusDown: ->
      @_focusOffset(1, 0)

    
    _focusOffset: (colOffset, rowOffset)->
      # TODO : flip these when datagrid is upright
      colIdx = @props.colIdx + colOffset
      rowIdx = @props.rowIdx + rowOffset
      

      return $(React.findDOMNode(@props.datagrid))
      .find(".flipgrid-cell-wrapper[data-row=#{rowIdx}][data-col=#{colIdx}]")
      .focus()
    
      
    
    