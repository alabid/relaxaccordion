Relax Accordion -  Accordion bundled with sorting and callback functionality
============================================================================

Setup
-----

You'll need to clone this repository to use the files here:
`git clone git@github.com:alabid/relaxaccordion.git` 
on your unix/linux command line.

To use relax accordion, you need three core js files to power this 
accordion:

* jquery -- the new wave javascript library.
The other two `.js` files depend on this.
* relax.js -- javascript file containing the implementation of the relax
               accordion.
* jquery.draggable.droppable.custom.min.js -- it contains the draggable
and droppable jquery ui libraries.

If you are going to use any more of the jquery ui libraries, I'd advise
that you just download and include the jquery ui libraries you'd use
with your application together with relax.js. If you do that then you 
wouldn't have to include (iii) anymore. But make sure that you have both
the draggable and droppable jquery ui libraries coupled with your downloads.

Download jquery ui libraries [here](http://www.jqueryui.com/download).

After downloading (i), (ii), (iii), you can include these files in your
html file like this (and preferably in this order):


      <script type="text/javascript" src="jquery.js"></script>
      <script type="text/javascript" src="jquery.draggable.droppable.custom.min.js"></script>
      <script type="text/javascript" src="relax.js"></script>
	<script type="text/javascript" src="myscript.js"></script>

Then you can call the relax plugin in your own script like this:

`$("ul.menu").relax();`

The selector `ul.menu` specifies the list where the relax function will
act upon and make a RELAX accordion.

Usage
------

The `.relax()` function takes in an object that you could use to specify
some options for the relax accordion:

     // default values
     $("ul.menu") .relax({
     "animate" : "fast",
     "activate-links" : false, // or "deactivate-links" : true
     "openondrag" : false,
     ondrop: function() {}, // or null
     opacity: 0.7
     });


`animate` option specifies how fast the accordion menus should slide up
or slide down.
Available options: "fast", "slow", "normal".

`activate-links` option applies to only accordion that use `<a>` tags in
them (which is most accordions). It deactivates all the links. You can
activate the links again by simply setting this option to true.

`openondrag` specifies if a sublist in the relax accordion menu should
be open when a drag operation is being performed. If `openondrag == false`,
then whenever you start to drag an `<li>` from one container to another,
 any open sublist closes.

`ondrop` is a callback that will be called whenever an `<li>` is moved
from one sublist to another.

For example:

    ondrop: function(dropped, into, contained) {
             log("I am ");
             log(dropped);
             log("dropped into ");
             log(into);
             log("in this menu: ");
             log(contained);
	     }

`dropped` is the last list item (`<li>`) that was dropped before the
ondrop callback was called.

`into` is the list `<ul>` into which `dropped` was dropped into.

`contained` is the container/menu that encapsulates both `dropped` and
`into`.

Examples
--------
Examples of usage of `relax.js` are at `http://vidmuster.com`. Check out 
these ones:

1. Two sortable accordion menus. One uses `<a>` elements and the other
   uses `<p>` elements in the accordion tabs.
   [Example 1](http://vidmuster.com/ra-tests/relax1.html).
   
2. Two sortable accordion menus that communicate with each other. You can 
   drag from one menu to the other and also specifiy callbacks that will
   execute just immediately after you're done moving an `<li>`.
   [Example 2](http://vidmuster.com/ra-tests/relax2.html).

Feedback, Bugs, Suggestions
---------------------------
I'd really like your feedback, comments, and bug reports sent to me
somehow preferably by filing an issue (github feature).


