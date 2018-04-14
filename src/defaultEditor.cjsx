App.namespace 'App.views.widgets.react.datagrid', require: [

  'views/reactView'

], (x, [loadedLibs...]) ->
    
    
    ###
      This is the default editor (you didn't specify an `editor:` in your column attributes) used by
      App.views.react.components.Datagrid class

      See ./defaultFormatter.cjsx comment for an example of using react-datum components

    ###

    class x.DefaultEditor extends React.Component

      @propTypes: 
        rowData: React.PropTypes.instanceOf(Backbone.Model)
        column: React.PropTypes.object
        value: React.PropTypes.any


        # default styles to apply to cell
        defaultCellStyle: React.PropTypes.object

        
      
      @contextTypes:
        datagrid: React.PropTypes.any
        
      hasResults: -> return true

      render: -> 
        value = @props.value
        if @props.column.datum?
          value =  React.createElement(@props.column.datum, @getDatumProps())
          
        return <div className='datagrid-cell editing' style={@getCellStyle()}>{value}</div>
        

      getCellStyle: ->
        return _.extend {}, @props.defaultCellStyle,
          zIndex: 1
          overflow: 'visible'
          

      getDatumProps: (options = {}) ->
        datagridDatumProps =
          model: @props.rowData
          attr: @props.column.key
          column: @props.column
          inputMode: 'edit'
          ref: 'datum'
          onKeyDown: @onKeyDown
          # we'll let you know when to set the model value
          setOnBlur: false
          setOnChange: false
          rbOverlayProps:
            trigger: ['hover','focus', 'click']
            placement: 'top'

        _.extend({}, @props.column.datumProps, datagridDatumProps, options)

      # called by Rdg to get our input.  Not providing an input node back has the positive side effect of not
      # being able to arrow right out of edit. 
      getInputNode: ->
        @refs.datum?.focus()
        # TODO : decide if this is really better than just returning @refs.datum.inputComponent
        # if you return a focusable element rdg should focus it.  we're going to let Rd do that 
        return undefined     
        #return @refs.datum?.getInputComponent()

      
      # called by Rdg to get the current value of the editor 
      getValue: ->
        datum = @refs.datum
        return null unless datum? && @props.rowData?
        # don't set the model value unless valid
        if datum.isDirty() && datum.validate()
          datum.setModelValue()
        # don't call this to get the value to save on the model because some datums do
        #   translations and math on it.  Rely on the model value itself
        # datum.getModelValue()
        return if _.isFunction(@props.rowData.get)
          @props.rowData.get(@props.column.key)
        else
          @props.rowData[@props.column.key]
          
        
      # called by Rdg to get validate the input.  (this will be interesting)
      validate: (value) ->
        return true unless @refs.datum?
        @refs.datum.validate()
      
      
      onKeyDown: (evt) =>
        # react-data-grid handler causes the caret to move to the beginning 
        # or end of the input and won't allow left/right one char at a time
        if evt.key in ["ArrowLeft", "ArrowRight"]
          evt.stopPropagation()
          
        return true
        
    
    