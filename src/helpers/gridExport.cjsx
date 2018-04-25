    
    
    
    
module.exports = class GridExport
  
  ### 
    exports the currently viewed grid and data to csv  
  ###
  exportToCsv: () ->
    collection = @props.collection
    columns = @getColumns()
    rows = []
    
    headers = for column in columns
      continue unless column.exportable
      columnHeader = [column.exportAs || column.givenName || column.name]
      if column.alsoExport? then columnHeader.push(column.alsoExport?.name)
      columnHeader

    rows.push headers.join(',')
    if collection?.length > 0
      for rowIndex in [0...@getRowCount()]
        model = @getModelAt(rowIndex)
        continue unless model?
        
        exportCols = []
        for column in columns
          continue unless column.exportable
          value = @getExportValue(model, column, forCsv: true) 
          exportCols.push '"' + (value?.toString() || '') + '"'

          if column.alsoExport?
            value = @getExportValue(model, column.alsoExport)
  
            exportCols.push '"' + (value?.toString() || '') + '"'
        
        rows.push exportCols.join(',')

    return rows.join('\n')
    