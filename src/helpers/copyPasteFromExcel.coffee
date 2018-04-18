
trim = require('underscore.string/trim')

###

###
module.exports = class CopyPasteFromExcel
  
  # I know we technically only support current chrome, but this
  # will do a test to see whatever clipboard is available and use that.
  getClipboardData: (e) ->
    return e.clipboardData || e.originalEvent?.clipboardData || window.clipboardData


  getExpectedColumnLength: (array2d) ->
    return 0 unless Array.isArray(array2d)
    # The maximum cannot be less than 1 if we are dealing with an array
    max = 1
    for row in array2d
      if Array.isArray(row) && row.length > max
        max = row.length
    return max


  removeQuotes: (str) ->
    return str unless str?
    trimmed = trim(str)
    if trimmed[0] == '\"' && trimmed[trimmed.length - 1] == '\"'
      return trimmed.substr(trimmed.indexOf('\"') + 1, trimmed.lastIndexOf('\"') - 1)
    else
      return trimmed
      

  ###
  This function will iterate over a 2d array and see if the first and last columns
  anywhere in the array have newline returns. Indicating an edge case we probably
  didn't reliably parse.
  ###
  is2dArrayBroken: (array2d) ->
    leftIsTextarea = false
    rightIsTextarea = false
    
    for row in array2d
      if row[0].indexOf('\n') >= 0
        leftIsTextarea = true
      if row[row.length - 1].indexOf('\n') >= 0
        rightIsTextarea = true
    
    return rightIsTextarea && leftIsTextarea
  

  ###
  This function will take a 2d array and uniform the columns for each row
  by finding the row with the most columns, and assuming that as the 'standard'
  column length. Then it iterates over each cell and creates new rows that have the
  standardized column length.

  If it encouters a row with a single value, it will collect all single values from
  that point on, until it finds a normal row, and then it will assum cell[0] in the normal
  row is also part of the broken cells it has collected. It will smartly merge the broken values and the cell[0]
  in the correct place.

  This fixes excel weirdness.
  ###
  make2dArrayUniform: (array2d) ->
    length = @getExpectedColumnLength(array2d)
    result = []
    tempRow = []
    brokenStr = ''
    
    if length == 1
      # NOTE: This may be incorrect, however,
      # there's no way we can reconstruct the original object
      # in this edge case.
      return array2d

    # Iterate over the array2d and reconstruct the
    # rows.
    for row in array2d
      if !Array.isArray(row)
        # If the row in this 2d array is not actually an array,
        # we have encoutered a broken piece of data.
        brokenStr += row + '\n'
      else
        # Edge case: You have a partial cell. We must determine where
        # to place it.
        if brokenStr.length > 0
          # If we are in the middle of building a new row,
          # just tack the cell on to the end of what we were putting together.
          if tempRow.length > 0
            tempRow[tempRow.length - 1] += '\n' + brokenStr
          # If we are starting a new row, check the end of the
          # last row to see if it is a textarea.
          else if result.length > 0
            cells = result[result.length - 1]
            lastCell = cells[cells.length - 1]
            # If the end of the last row is a textArea, then merge this with it.
            if lastCell.indexOf('\n') >= 0 || lastCell.indexOf('\"') >= 0
              cells[cells.length - 1] = @removeQuotes(lastCell + '\n' + brokenStr)
            else
              # Otherwise, the start of this row is a textarea and will contain
              # the broken string.
              tempRow.push(@removeQuotes(brokenStr))
          brokenStr = ''
        
        # Dynamically size the rows accordingly.
        if row.length + tempRow.length < length && tempRow.length > 0
          tempRow[tempRow.length - 1] = @removeQuotes(tempRow[tempRow.length - 1] + '\n' + row.splice(0 ,1))
        
        if tempRow.length > 0 && row.length + tempRow.length > length
          while row.length + tempRow.length > length
            tempRow[tempRow.length - 1] = @removeQuotes(tempRow[tempRow.length - 1] + '\n' + row.splice(0, 1))
        
        # Now iterate over the cells in the row and begin constructing
        # the document.
        for cell in row
          tempRow.push cell

          # Now add the cells we know about
          if tempRow.length >= length
            result.push tempRow
            tempRow = []

    if tempRow.length > 0
      result.push tempRow

    return result


  ###
  If a single value is pasted, this will invoke @props.onPaste if available.
  Otherwise, it will convert the value into a 2-dimensional array and pass it to
  @props.onMultiPaste if available.

  It also passes the event along with, so you can e.stopPropagation() and e.preventDefault()
  further upstream if you want.
  ###
  processPaste: (e) =>
    clipboardData = @getClipboardData(e)
    rawText = clipboardData?.getData('text')

    # Skip processing if there's nothing found.
    # TODO: might want to add other cases for files or things. Or figure
    # how to parse that.
    return unless rawText?

    # If the raw text can be split by the separator that excel uses,
    # do that. Otherwise try a newline. Otherwise it's probably a single value.
    if rawText.indexOf(String.fromCharCode(13)) >= 0
      arrText = rawText.split(String.fromCharCode(13))
    else if rawText.indexOf('\n') >= 0
      arrText = rawText.split('\n')
    else
      arrText = [rawText]

    if arrText.length > 1
      resultArray = []

      # Test for the parsing character. It can be parsed with by \t or comma.
      # The find kind we find is what we will use throughout the rest of the process.
      if arrText[0]?.indexOf('\t') >= 0
        splitChar = '\t'
      else if arrText[0]?.indexOf(',') >= 0
        splitChar = ','

      for row in arrText
        if row.indexOf(splitChar) >= 0
          resultArray.push(row.split(splitChar))
        else
          resultArray.push row

      return @make2dArrayUniform(resultArray)
        # resultArray = @make2dArrayUniform(resultArray)
        # # Run through our check to see if we think this parse
        # # was reliable.
        # if @is2dArrayBroken(resultArray)
        #   # If it wasn't reliable, then invoke the onParseError() method.
        #   if @props.onParseError?
        #     @props.onParseError(e)
        # else
        #   @props.onMultiPaste(e, resultArray
    else
      return rawText
      # if @props.onPaste?
      #   @props.onPaste(e, rawText)