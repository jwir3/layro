# Layro #
## A Javascript library for simple row-based layout.##

### Introduction ###

This library is mostly for use with older browsers that don't have an implementation
of the CSS3 flexible box layout module. (If you have support for this, then you should
use that, as it's likely MUCH faster).

### Thirty-Second Start ###
There are three levels of the layro model: roots, parents, and rows. It is assumed
that layro rows are annotated in HTML with the `data-row` attribute, along with
the number of row:
```html
<div id="someData" data-row="1">I'm in row 1</div>
```
