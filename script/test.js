require(['layro'], function(layro) {
	test("getElementsInRow", function() {
		var parents = $('[data-align="parent"]');
		equal(parents.length, 5, "There should be 5 parents.");

		// This should use mainRoot by default.
		var elementsInRow1 = layro.getElementsInRow(1);
		var elementsInRow2 = layro.getElementsInRow(2);
		var elementsInRow3 = layro.getElementsInRow(3);
		var elementsInRow4 = layro.getElementsInRow(4);
		equal(elementsInRow1.length, 5, "There should be 5 elements in row 1");
		equal(elementsInRow2.length, 4, "There should be 4 elements in row 2");
		equal(elementsInRow3.length, 4, "There should be 4 elements in row 3");
		equal(elementsInRow4.length, 3, "There should be 3 elements in row 4");


		var elementsInRow1a = layro.getElementsInRow(1, "qunit-fixture");	
		var elementsInRow2a = layro.getElementsInRow(2, "qunit-fixture");
		var elementsInRow3a = layro.getElementsInRow(3, "qunit-fixture");
		var elementsInRow4a = layro.getElementsInRow(4, "qunit-fixture");
		equal(elementsInRow1.length, 5, "There should be 5 elements in row 1");
		equal(elementsInRow2.length, 4, "There should be 4 elements in row 2");
		equal(elementsInRow3.length, 4, "There should be 4 element in row 3");
		equal(elementsInRow4.length, 3, "There should be 3 elements in row 4");

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
		ok(layro.getMaxHeightForRow(1, "qunit-fixture") == 42, "row 1 max height should be 42px");

		// Row 2: 50px
		ok(layro.getMaxHeightForRow(2, "qunit-fixture") == 52, "row 2 max height should be 52px");

		// Row 3: 25px
		ok(layro.getMaxHeightForRow(3, "qunit-fixture") == 27, "row 2 max height should be 27px");

		// Row 4: 75px
		ok(layro.getMaxHeightForRow(4, "qunit-fixture") == 77, "row 2 max height should be 77px");

	});

	test("doesRowNeedShim", function() {
		ok(layro.doesRowNeedShim(1, "qunit-fixture") == false, "Row 1 should not need a shim.");
		ok(layro.doesRowNeedShim(2, "qunit-fixture") == true, "Row 2 should need a shim.");
		ok(layro.doesRowNeedShim(3, "qunit-fixture") == true, "Row 3 should need a shim.");
		ok(layro.doesRowNeedShim(4, "qunit-fixture") == true, "Row 4 should need a shim.");
	});

	test("insertShimsForRow", function() {
		ok(layro.insertShimsForRow(3, "qunit-fixture"));
		console.log("Element to insert after: " + $('#2-2').attr('id'));
		equal($('#col2').find('.layroShim').outerHeight(), 27, "Row 3 of Column 2 should have height 27px");
	});

	test("getNumberOfRowsForRoot", function() {
		equal(layro.getNumberOfRowsForRoot('qunit-fixture'), 4, "There should be four rows");
	});

	test("insertShimsForRoot", function() {
		layro.insertShimsForRoot("qunit-fixture");

		// Now, all parent boxes should be the same height.
		var firstParent = -1;
		$('[data-align=parent]').each(function() {
			if (firstParent < 0) {
				firstParent = $(this).height();
			} else {
				var myId = $(this).attr('id');
				equal($(this).height(), firstParent, "Height of element '" + myId + "' should be the same as the height of the first parent.");
			}
		});
	});
});
