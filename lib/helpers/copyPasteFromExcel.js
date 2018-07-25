(function() {
  var Bstr, CopyPasteFromExcel,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Bstr = require('bumble-strings');


  /*
   */

  module.exports = CopyPasteFromExcel = (function() {
    function CopyPasteFromExcel() {
      this.processPaste = bind(this.processPaste, this);
    }

    CopyPasteFromExcel.prototype.getClipboardData = function(e) {
      var ref;
      return e.clipboardData || ((ref = e.originalEvent) != null ? ref.clipboardData : void 0) || window.clipboardData;
    };

    CopyPasteFromExcel.prototype.getExpectedColumnLength = function(array2d) {
      var i, len, max, row;
      if (!Array.isArray(array2d)) {
        return 0;
      }
      max = 1;
      for (i = 0, len = array2d.length; i < len; i++) {
        row = array2d[i];
        if (Array.isArray(row) && row.length > max) {
          max = row.length;
        }
      }
      return max;
    };

    CopyPasteFromExcel.prototype.removeQuotes = function(str) {
      var trimmed;
      if (str == null) {
        return str;
      }
      trimmed = Bstr.trim(str);
      if (trimmed[0] === '\"' && trimmed[trimmed.length - 1] === '\"') {
        return trimmed.substr(trimmed.indexOf('\"') + 1, trimmed.lastIndexOf('\"') - 1);
      } else {
        return trimmed;
      }
    };


    /*
    This function will iterate over a 2d array and see if the first and last columns
    anywhere in the array have newline returns. Indicating an edge case we probably
    didn't reliably parse.
     */

    CopyPasteFromExcel.prototype.is2dArrayBroken = function(array2d) {
      var i, leftIsTextarea, len, rightIsTextarea, row;
      leftIsTextarea = false;
      rightIsTextarea = false;
      for (i = 0, len = array2d.length; i < len; i++) {
        row = array2d[i];
        if (row[0].indexOf('\n') >= 0) {
          leftIsTextarea = true;
        }
        if (row[row.length - 1].indexOf('\n') >= 0) {
          rightIsTextarea = true;
        }
      }
      return rightIsTextarea && leftIsTextarea;
    };


    /*
    This function will take a 2d array and uniform the columns for each row
    by finding the row with the most columns, and assuming that as the 'standard'
    column length. Then it iterates over each cell and creates new rows that have the
    standardized column length.
    
    If it encouters a row with a single value, it will collect all single values from
    that point on, until it finds a normal row, and then it will assum cell[0] in the normal
    row is also part of the broken cells it has collected. It will smartly merge the broken values and the cell[0]
    in the correct place.
    
    This fixes excel weirdness.
     */

    CopyPasteFromExcel.prototype.make2dArrayUniform = function(array2d) {
      var brokenStr, cell, cells, i, j, lastCell, len, len1, length, result, row, tempRow;
      length = this.getExpectedColumnLength(array2d);
      result = [];
      tempRow = [];
      brokenStr = '';
      if (length === 1) {
        return array2d;
      }
      for (i = 0, len = array2d.length; i < len; i++) {
        row = array2d[i];
        if (!Array.isArray(row)) {
          brokenStr += row + '\n';
        } else {
          if (brokenStr.length > 0) {
            if (tempRow.length > 0) {
              tempRow[tempRow.length - 1] += '\n' + brokenStr;
            } else if (result.length > 0) {
              cells = result[result.length - 1];
              lastCell = cells[cells.length - 1];
              if (lastCell.indexOf('\n') >= 0 || lastCell.indexOf('\"') >= 0) {
                cells[cells.length - 1] = this.removeQuotes(lastCell + '\n' + brokenStr);
              } else {
                tempRow.push(this.removeQuotes(brokenStr));
              }
            }
            brokenStr = '';
          }
          if (row.length + tempRow.length < length && tempRow.length > 0) {
            tempRow[tempRow.length - 1] = this.removeQuotes(tempRow[tempRow.length - 1] + '\n' + row.splice(0, 1));
          }
          if (tempRow.length > 0 && row.length + tempRow.length > length) {
            while (row.length + tempRow.length > length) {
              tempRow[tempRow.length - 1] = this.removeQuotes(tempRow[tempRow.length - 1] + '\n' + row.splice(0, 1));
            }
          }
          for (j = 0, len1 = row.length; j < len1; j++) {
            cell = row[j];
            tempRow.push(cell);
            if (tempRow.length >= length) {
              result.push(tempRow);
              tempRow = [];
            }
          }
        }
      }
      if (tempRow.length > 0) {
        result.push(tempRow);
      }
      return result;
    };


    /*
    If a single value is pasted, this will invoke @props.onPaste if available.
    Otherwise, it will convert the value into a 2-dimensional array and pass it to
    @props.onMultiPaste if available.
    
    It also passes the event along with, so you can e.stopPropagation() and e.preventDefault()
    further upstream if you want.
     */

    CopyPasteFromExcel.prototype.processPaste = function(e) {
      var arrText, clipboardData, i, len, rawText, ref, ref1, resultArray, row, splitChar;
      clipboardData = this.getClipboardData(e);
      rawText = clipboardData != null ? clipboardData.getData('text') : void 0;
      if (rawText == null) {
        return;
      }
      if (rawText.indexOf(String.fromCharCode(13)) >= 0) {
        arrText = rawText.split(String.fromCharCode(13));
      } else if (rawText.indexOf('\n') >= 0) {
        arrText = rawText.split('\n');
      } else {
        arrText = [rawText];
      }
      if (arrText.length > 1) {
        resultArray = [];
        if (((ref = arrText[0]) != null ? ref.indexOf('\t') : void 0) >= 0) {
          splitChar = '\t';
        } else if (((ref1 = arrText[0]) != null ? ref1.indexOf(',') : void 0) >= 0) {
          splitChar = ',';
        }
        for (i = 0, len = arrText.length; i < len; i++) {
          row = arrText[i];
          if (row.indexOf(splitChar) >= 0) {
            resultArray.push(row.split(splitChar));
          } else {
            resultArray.push(row);
          }
        }
        return this.make2dArrayUniform(resultArray);
      } else {
        return rawText;
      }
    };

    return CopyPasteFromExcel;

  })();

}).call(this);
