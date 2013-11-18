# Layro #
## A Javascript library for simple row-based layout.##

### Introduction ###

This library is mostly for use with older browsers that don't have an implementation
of the CSS3 flexible box layout module. (If you have support for this, then you should
use that, as it's likely MUCH faster).

### Markup ###
There are three levels of the layro model: roots, parents, and rows. It is assumed
that layro rows are annotated in HTML with the `data-row` attribute, along with
the number of row:
```html
<div id="someData" data-row="1">I'm in row 1</div>
```
Above this in the hierarchy are parents. They are annotated with the `data-align`
HTML attribute:
```html
<div id="parent1" data-align="parent">
  <div data-row="1">Row 1</div>
  <div data=row="2">Row 2</div>
</div>
```
Every row should have a parent. Rows in parents that are siblings in the DOM will
be aligned after a call to one of the ``insertShims`` functions in layro.

Finally, row parents (also could be called 'columns') should be segmented from
the rest of the DOM using roots. Roots are defined by adding the attribute
`data-align=root` to the element:
```html
<div id="mainRoot" data-align="root">
  <div id="parent1" data-align="parent">
    <div data-row="1">Row 1</div>
    <div data=row="2">Row 2</div>
  </div>
  <div id="parent2" data-align="parent">
    <div data-row="1">Row 1</div>
    <div data=row="2">Row 2</div>
  </div>
</div>
```

## TODO ##
[ ] Make the library be able to infer roots based on the location of parents.
[ ] Make the library work a bit better with nested parent/root structures.
[ ] Verify that the library works with width="auto" rows.
[ ] Add a conveinence method that automatically adjusts everything in the page, probably used for a onload handler.

