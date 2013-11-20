/*
 * We need to provide a config so that requirejs knows where to
 * find layro.
 */
require.config({
  paths: {
    layro: '../../script/layro'
  }
});

require(['layro'], function(layro) {
	test("getElementsInRow", function() {
		var parents = $('[data-align="parent"]');
		equal(parents.length, 7, "There should be 7 parents.");

		// This should use root1 by default.
		var elementsInRow1 = layro.getElementsInRow(1);
		var elementsInRow2 = layro.getElementsInRow(2);
		var elementsInRow3 = layro.getElementsInRow(3);
		var elementsInRow4 = layro.getElementsInRow(4);
		equal(elementsInRow1.length, 5, "There should be 5 elements in row 1");
		equal(elementsInRow2.length, 4, "There should be 4 elements in row 2");
		equal(elementsInRow3.length, 4, "There should be 4 elements in row 3");
		equal(elementsInRow4.length, 3, "There should be 3 elements in row 4");


		var elementsInRow1a = layro.getElementsInRow(1, "root1");	
		var elementsInRow2a = layro.getElementsInRow(2, "root1");
		var elementsInRow3a = layro.getElementsInRow(3, "root1");
		var elementsInRow4a = layro.getElementsInRow(4, "root1");
		equal(elementsInRow1.length, 5, "There should be 5 elements in row 1");
		equal(elementsInRow2.length, 4, "There should be 4 elements in row 2");
		equal(elementsInRow3.length, 4, "There should be 4 elements in row 3");
		equal(elementsInRow4.length, 3, "There should be 3 elements in row 4");

		var elementsInRow1b = layro.getElementsInRow(1, "root2");	
		var elementsInRow2b = layro.getElementsInRow(2, "root2");
		equal(elementsInRow1b.length, 2, "There should be 2 elements in row 1 of root 2");
		equal(elementsInRow2b.length, 1, "There should be 1 element in row 2 of root 2");
	});

	test("getMaxHeightForRow", function() {
		// Throw an error if we don't provide a parent.
		throws(
			function() {
				layro.getMaxHeightForRow(1)
			}, "get max height without a parent should throw an error"
		);

		// The max height for rows should be as follows:
		// Row 1: 40px
		ok(layro.getMaxHeightForRow(1, "root1") == 42, "row 1 max height should be 42px");

		// Row 2: Same as Row 2, Column 2.
		var expectedHeight = $('#2-2').outerHeight();
		ok(layro.getMaxHeightForRow(2, "root1") == expectedHeight, "row 2 max height should be " + expectedHeight + "px");

		// Row 3: 25px
		ok(layro.getMaxHeightForRow(3, "root1") == 27, "row 2 max height should be 27px");

		// Row 4: 75px
		ok(layro.getMaxHeightForRow(4, "root1") == 77, "row 2 max height should be 77px");

	});

	test("doesRowNeedShim", function() {
		ok(layro.doesRowNeedShim(1, "root1") == false, "Row 1 should not need a shim.");
		ok(layro.doesRowNeedShim(2, "root1") == true, "Row 2 should need a shim.");
		ok(layro.doesRowNeedShim(3, "root1") == true, "Row 3 should need a shim.");
		ok(layro.doesRowNeedShim(4, "root1") == true, "Row 4 should need a shim.");
	});

	test("insertShimsForRow", function() {
		ok(layro.insertShimsForRow(3, "root1"));
		console.log("Element to insert after: " + $('#2-2').attr('id'));
		equal($('#col2').find('.layroShim').outerHeight(), 27, "Row 3 of Column 2 should have height 27px");
	});

	test("getNumberOfRowsForRoot", function() {
		equal(layro.getNumberOfRowsForRoot('root1'), 4, "There should be four rows");
	});

	test("insertShimsForRoot", function() {
		// We should insert shims for all roots.
		// Then, all parent boxes within a root should be the same height.
		$('[data-align=root]').each(function() {
			var rootId = $(this).attr('id');
			var shimsInserted = layro.insertShimsForRoot(rootId);

			if (rootId == 'root1') {
				equal(shimsInserted, 9, "Root 1 should have inserted 9 shims");
			} else if (rootId == 'root2') {
				equal(shimsInserted, 1, "Root 2 should have only a single shim inserted");
			}

			var firstParent = -1;
			$(this).find('[data-align=parent]').each(function() {
				if (firstParent < 0) {
					firstParent = $(this).height();
				} else {
					var myId = $(this).attr('id');
					equal($(this).height(), firstParent, "Height of element '" + myId + "' should be the same as the height of the first parent.");
				}
			});	
		});

		var totalShims = $('.layroShim').length;
		equal(totalShims, 10, "Document should have a total of 10 shims.");
	});

	test("insertShimsForAllRoots", function() {
		var shimsInserted = layro.insertShimsForAllRoots();
		equal(shimsInserted, 10, "10 shims should have been inserted");
	});

	test("insertShims", function() {
		var shimsInserted = layro.insertShims();
		equal(shimsInserted, 10, "10 shims should have been inserted");
	});
});
