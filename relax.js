(function($) {
  $.fn.relax = function(inprops) {

        var dProps = {
                    animate: "fast",
	            "activate-links": false,
	            "deactivate-links": true,
	            openondrag: false,
	            ondrop: function() {} // $(this) == dropped
                    } ,
        relax,
        props = $.extend(dProps, inprops);

            if ($(this).length < 1 ||
		$(this).attr("class") == undefined ||
         	$(this).attr("class").indexOf("menu") == -1) {
               relax = $("body").find("ul.menu");
	       if (relax.length < 1) {
		   return null;
	       }
	    } else {
	        relax = $(this);
            }
            var no = $("ul.menu").length;

	    if (no > 0) {
              var alluls = (function() {
                 return $("ul.menu").add($("ul.menu")
			 .children("li").children("ul"));
                })();
	    }
	    if (props["activate-links"] == false ||
	       props["deactivate-links"] == true) {
	       relax.find("a").each(function() {
		$(this).click(function(e) {
        	  e.preventDefault();
		  return false;
                });
             });	  
	   }
          
           var smalluls = attachChildClassNames(makeKidsSortable(alluls, props));
           // will need smalluls soon
           relax.find("li>a").each(function() {
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

 function attachChildClassNames(alluls) {
     var sName = "small-ul";
     return alluls.not("ul.menu").each(function() {
	  $(this).addClass(sName);
      });    
 }
   function makeKidsSortable(alluls, props) {
    return alluls.each(function() {
         $(this).sortable({
          connectWith: "ul.menu, ul.menu ul.small-ul",
          start: function(event, ui) {
            if (ui.item.get(0).firstChild && !props.openondrag) {
              ui.item.children("ul").slideUp("fast");
              clearAnyCurrent(ui.item);
	    }
            ui.item.children("a").addClass("drag");
          },
          stop: function(event, ui) {
	    if (!(ui.item || ui.item.parent() ||
		ui.item.parent().hasClass("menu") ||
		 ui.item.parent().hasClass("small-ul"))) {
		alluls.find(".menu").append(ui.item);
	    }
	    ui.item.children("a").removeClass("drag");
            if (props.ondrop) {
		props.ondrop.call(ui.item, ui.item, ui.item.parent());
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




$(function() {
   $().relax({
     // by default all header links are not activated but are just headers
     // that can be moved.
     // on the other hand, by default the links below the headers
     // can only be moved. If you want to be able to click on it,
     //	make it happen using this:
     // "activate-links" : true; or "deactivate-links" : false
     ondrop: function(dropped, on) {
	 log("I");
	 log(dropped);
	 log(" was dropped on ");
	 log(on);
	 log("I'm this: ");
	 log($(this));
     },
     openondrag: true, 
     opacity: 0.7 /* must be between 0.1 and 1 */
   });
});


function log(what) {
    console.log(what);
}
