# Layro: A Javascript library for simple row-based layout. #
## Introduction ##

This library is mostly for use with older browsers that don't have an implementation
of the CSS3 flexible box layout module. (If you have support for this, then you should
use that, as it's likely MUCH faster).

## Markup ##
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

## Using Layro ##
Once you've set up your markup to align with what layro expects, you can go ahead
and run layro on the DOM object you want:
```javascript
  /* This assumes you have a layro object, and your root has id 'mainRoot' */
  layro.insertShimsForRoot('mainRoot');
```

### RequireJS Module (Getting the Layro Object) ###
RequireJS is a simple library designed to promote modularity of Javascript code,
and layro takes advantage of this. The above syntax is designed to show that
you can import the layro code into your project using RequireJS. If you want
to learn more about this, point your browser to www.requirejs.org.

Mainly, this means that you'll need to do two things to include layro into your
web page. You'll need to create a main.js file, preferably in script/main.js,
and then add the following to any HTML file you want to include:

```html
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  <script data-main="script/main" src="script/require.js"></script>
```

You need the jQuery plugin as well as require.js, since layro also relies on
jQuery. RequireJS is included in the layro package, but jQuery is not, since it's
better to get it from a CDN, anyway.

You'll notice that there are already two files that pretty much save you the time
of getting started with layro: `index.html`, which includes requirejs and layro,
and `script/main.js`, which is essentially the code above, but wrapped in a RequireJS
module.  Feel free to use either or both of these as your bootstrap into layro.

## Shims and Variable Heights ##
Write some information in here.

## Live Example ##
Write some information in here.

## TODO ##
- [ ] Turn the todo list into issues. :)
- [ ] Import jQuery using RequireJS, rather than the archaic way we do it now.
- [ ] Make the library be able to infer roots based on the location of parents.
- [ ] Make the library work a bit better with nested parent/root structures.
- [ ] Verify that the library works with `height: auto` rows.
- [ ] Add a conveinence method that automatically adjusts everything in the page, probably used for a onload handler.
