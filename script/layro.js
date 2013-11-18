define("layro", [], function() {
  return {

    /**
     * Get the number of rows within a DOM element having specified root id.
     *
     * @param aRootId The DOM id of the element for which to find the number of
     *        rows.
     *
     * @returns The number of rows in the root. This is the maximum rows in any of the
     *           root's parents.
     */
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
        numShimsInserted += layroObj.insertShimsForRow(nextRow, aRootID);
      }

      return numShimsInserted;
    },

    /**
     * Insert a number of shims necessary to make a given row align across all parents.
     *
     * @param aRow The number of row which we want to align.
     * @param aRootID The ID of the root element on which we want to align.
     *
     * @returns The number of shims inserted.
     */
    insertShimsForRow: function(aRow, aRootID) {
      var layroObj = this;
      var root = $('#' + aRootID);
      var numShimsInserted = 0;

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
            numShimsInserted = numShimsInserted + 1;
            layroObj.insertShimAfter(rowObj, shimHeight);
          }
        }
      });

      return numShimsInserted;
    },

    /**
     * Insert a shim after a given element within a layro parent.
     *
     * This method simply inserts a shim after a given element in the DOM. Ideally,
     * the element after which we want to insert has, as its parent, a layro parent.
     * This condition isn't enforced, however. You probably don't want to use this
     * method directly. Use insertShimsForRoot() or insertShimsForRow() instead.
     *
     * @param aAfterElement The element after which we want a shim.
     * @param aHeightOfShim A numeric value indicating the number of CSS pixels the height
     *        of the shim should be.
     */
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

    /**
     * Retrieve the maximum height of any element in a given row.
     *
     * @param aRow A numeric value indicating the row for which the max height should be calculated.
     * @param aRootID An ID for the DOM element serving as the row's grandparent.
     *
     * @return The maximum height of any element in the specified row and root.
     *
     * @throws An exception if the maximum height for a given row is less than 0. This usually
     *         indicates that the row wasn't found, or that no element with specified ID exists.
     */
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
