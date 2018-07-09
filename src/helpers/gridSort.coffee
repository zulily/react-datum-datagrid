Bstr = require('bumble-strings')
_ = require('underscore')

module.exports = class GridSort

  onSortColumn: (columnIndex, columnDef, direction) ->

    @setState {
      isSorting: true
      sortColumnIndex: columnIndex
      sortDirection: direction
    }, =>
      if @props.onSort
        @props.onSort columnIndex, columnDef, direction, =>
          @setState isSorting: false
      else if _.isFunction(@props.collection?.onDatagridSort)
        @props.collection.onDatagridSort columnDef.key, direction, columnDef,
          success: => @setState isSorting: false
          error: => @setState isSorting: false
      else
        getSortableValue = (object) ->
          attr = columnDef.sortAttr ? columnDef.key
          return if _.isFunction object.get then object.get(attr) else object[attr]

        arrayToSort = if _.isArray(@props.collection) then @props.collection else
          @props.collection.models || []

        arrayToSort.sort (a,b) ->
          aVal = getSortableValue(a)
          bVal = getSortableValue(b)
          isNumeric = isFinite(aVal) && isFinite(bVal)
          if direction == "DESC"
            temp = aVal; aVal = bVal; bVal = temp # swap a and b

          return if isNumeric
            aVal - bVal
          else
            Bstr.weaklyCompare(aVal?.toString() ? "", bVal ? "")

        # TODO reconsider this
        for model in arrayToSort
          delete model.index
          delete model.attributes.index

        if _.isFunction @props.collection.reset
          @props.collection.reset(arrayToSort)
        else
          @props.collection = arrayToSort

        @setState isSorting: false


