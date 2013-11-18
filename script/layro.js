define("layro", [], function() {
  return {
    getNumberOfRowsForRoot: function(aRootId) {
      var totalRows = 0;
      $('#' + aRootId).find('[data-align="parent"]').each(function() {
        var totalRowsInThisCol = $(this).find('[data-row]').length;
        if (totalRowsInThisCol > totalRows) {
          totalRows = totalRowsInThisCol;
        }
      });

      return totalRows;
    },

    /**
     * Returns the elements in a given row, given a root for which to start at. If a root is not
     * given, then the first root encountered is assumed.
     *
     * @param aRow A numeric row to select.
     * @param aRootID The ID of the root box into which to start descending (optional).
     */
    getElementsInRow: function(aRow, aRootID) {
      if (!aRootID) {
        aRoot = $('[data-align="root"]').first();
        aRootID = aRoot.attr('id');
      }

      console.log("Root has ID: " + aRoot.attr('id'));

      var elements = new Array();
      aRoot.find('[data-row="' + aRow + '"]').each(function() {
        elements.push($(this));
      });

      return elements;
    },

    /**
     * Insert shims so that rows are aligned for a given root.
     *
     * @param aRootID The DOM id for the root to align.
     *
     * @returns The number of shims inserted into the DOM.
     */
    insertShimsForRoot: function(aRootID) {
      var layroObj = this;
      if (!$('#' + aRootID)[0]) {
        throw "It appears the element with ID: " + aRootID + " doesn't exist in the DOM";
      }

      var numRows = layroObj.getNumberOfRowsForRoot(aRootID);
      var numShimsInserted = 0;
      for (var nextRow = 1; nextRow <= numRows; nextRow++) {
        layroObj.insertShimsForRow(nextRow, aRootID);
      }
    },

    insertShimsForRow: function(aRow, aRootID) {
      var layroObj = this;
      var root = $('#' + aRootID);
      var shimInserted = false;

      console.log("Asked to insert shims for row with root id: " + aRootID);
      // get the maximum height for the row
      var maxRowHeight = layroObj.getMaxHeightForRow(aRow, aRootID);

      // for each of the children in the row
      root.find('[data-align="parent"]').each(function() {
        var shouldInsertShim = false;

        // if the child does not have a row with the given id
        // OR the child has a row, but it's less than the max height
        // for the row
        var rowSelector = '[data-row="' + aRow + '"]';
        var rowObj = $(this).children(rowSelector);
        var shimHeight = 0;
        if (!(rowObj[0])) {
          rowObj = $(this).children('[data-row="' + (aRow-1) + '"]');
          shimHeight = maxRowHeight;
          shouldInsertShim = true;
        } else if (rowObj.outerHeight() < maxRowHeight) {
          shimHeight = maxRowHeight - rowObj.outerHeight();
          shouldInsertShim = true;
        }

        if (shouldInsertShim) {
          // then insert a shim
          console.log("rowObj outerheight is " + rowObj.outerHeight());
          console.log("Shim height: " + shimHeight);
          if (shimHeight > 0) {
            console.log("Inserting a shim with height: " + shimHeight);
            shimInserted = true;
            layroObj.insertShimAfter(rowObj, shimHeight);
          }
        }
      });

      return shimInserted;
    },

    insertShimAfter: function(aRowObject, aHeightOfShim) {
      console.log("Inserting layro shim after object with id: " + aRowObject.attr('id'));
      console.log(aRowObject.attr('id'));
      $('<div id="lShim" class="layroShim" style="height: ' + aHeightOfShim +'px"></div>').insertAfter(aRowObject);
    },

    doesRowNeedShim: function(aRow, aRootID) {
      var layroObj = this;

      var root = $("#" + aRootID);

      // First, get the number of elements in the row.
      var numElementsInRow = layroObj.getElementsInRow(aRow, aRootID).length;

      // Compare this to the number of children of aRoot.
      var rootChildren = $("#" + aRootID + " > *").length;

      // If different, then yes.
      if (rootChildren > numElementsInRow) {
        return true;
      }

      // Otherwise, no.
      return false;
    },

    getMaxHeightForRow: function(aRow, aRootID) {
      var aRoot = $('#' + aRootID);

      console.log("Getting max height for row " + aRow + " with root id: " + aRoot.attr('id'));
      console.log("Passed in root id: " + aRootID);
      var maxHeightForRow = -1;
      aRoot.find('[data-row="' + aRow + '"]').each(function() {
        if (maxHeightForRow < $(this).outerHeight()) {
          maxHeightForRow = $(this).outerHeight();
        }
      });

      if (maxHeightForRow < 0) {
        throw "Problem retrieving height for row: " + aRow;
      }

      return maxHeightForRow;
    }
  }
});
