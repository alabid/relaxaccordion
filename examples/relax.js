/*
 * Author: Daniel Alabi
 * relax.js
 * The finest accordion everout!
 */

(function($) {
     $.fn.relax = function(inprops) {
	if ($(this).length == 0)
	    return;

        var dProps = {
                    animate: "fast",
	            "activate-links": false,
	            "deactivate-links": true,
	            openondrag: false,
	            ondrop: function() {} // $(this) == dropped
                    } ,
        relax,
        insideLiType, // element type in the lists: a or p or div?
        relaxClass,
        props = $.extend(dProps, inprops);

            if ($(this).attr("class") == undefined 
	       || $(this).attr("class") == "") {
               relax = $("body").find("ul.ra-menu");
	       if (relax.length == 0) {
		   return;
	       }
	    } else {
		relax = $(this);
		if (relax.attr("class"))
		    relaxClass = relax.attr("class").split(" ")[0];
		else  {
		    relaxClass = "ra-menu";
		    relax.addClass("ra-menu");
		}
		insideLiType = getNodeName($(this)
					   .children("li")
					   .children(":first"));
            }
            var no = relax.length;
	    
	    if (no > 0) {
              var alluls = (function() {
                 return relax.add($("ul." + relaxClass)
			 .children("li").children("ul"));
                })();
	    }
	    if ((props["activate-links"] == false ||
	       props["deactivate-links"] == true) &&
		insideLiType == "a") {
	       relax.find("a").each(function() {
		$(this).click(function(e) {
        	  e.preventDefault();
		  return false;
                });
             });	  
	   }

           var smalluls = attachChildClassNames(makeKidsSortable(alluls, props,relaxClass, relax), relaxClass);

           // will need smalluls soon
           relax.find("li>"+insideLiType).each(function() {
            var ul = $(this).next().hide();
            // makeKidsSortable(ul);
            $(this).bind("click", function(e) {
              var isUp;
              e.preventDefault();
              isUp = clearAnyCurrent($(this).parent(), props);
              if (!isUp) {
                ul.slideDown(props.animate);
                ul.parent().addClass("current");
              }
              return false;
            });
           });
  };

 function attachChildClassNames(alluls, relaxClass) {

     var sName = "small-ul";
     return alluls.not("ul."+ relaxClass).each(function() {
	  $(this).addClass(sName);
      });    
 }
   function makeKidsSortable(alluls, props, relaxClass, relax) {

    return alluls.each(function() {
         $(this).sortable({
          connectWith: "ul."+relaxClass + ", ul." + relaxClass + " ul.small-ul",
          start: function(event, ui) {
            if (ui.item.get(0).firstChild && !props.openondrag) {
              ui.item.children("ul").slideUp("fast");
              clearAnyCurrent(ui.item);
	    }
            ui.item.children(relaxClass).addClass("drag");
          },
          stop: function(event, ui) {
	    if (!(ui.item || ui.item.parent() ||
		ui.item.parent().hasClass(relaxClass) ||
		 ui.item.parent().hasClass("small-ul"))) {
		alluls.find("."+relaxClass).append(ui.item);
	    }
	    ui.item.children(relaxClass).removeClass("drag");
            if (props.ondrop ) {
		props.ondrop.call(ui.item, 
				  ui.item, 
				  ui.item.parent(),
				 relax);
	    }
          } ,
	  opacity: props.opacity || 0.7,
	  items: "li",
          revert: false
         }).disableSelection();
      });
   }

  function clearAnyCurrent(that, relax, propers) {  
    var props = $.extend({animate:"fast"}, propers);

    var current = (function() {
                  var returnMe;
		  that.parent().children("li").each(function() {
                     if ($(this).hasClass("current")) {
                        returnMe =  $(this);
                      }
                   });
                   return (returnMe || null);
                })();
   if (current == null) {
       return false;
   }

   current.removeClass("current")
        .children("ul").slideUp(props.animate);

   if (current.get(0) !== that.get(0)) {
      return false;
   } else { 
      return true; // returns 1 if current
   }
 }
  
  function getNodeName(elem) {
      if (!elem || elem.length == 0) {
         return "";
       } 
      if (elem.attr != undefined) {
        return elem.get(0).nodeName.toLowerCase();
      } else {
        return elem.nodeName.toLowerCase();
     }
  }

  function sameParent(first, second) {
      return (first.parent() && second.parent())
               && (first.parent().get(0) === second.parent().get(0));
  }

  function checkClass(elem, className) {
    return elem.attr && elem.attr("class") 
       && elem.attr("class").indexOf(className) != -1;
  }
 
 function removeEmpty(onUl)  {
     onUl.children().each(function() {
       if (getNodeName($(this)) == "li"
           && $(this).html() == "") {
	   $(this).remove();
       }
     });
 }
})(jQuery);

function log(what) {
    console.log(what);
}
