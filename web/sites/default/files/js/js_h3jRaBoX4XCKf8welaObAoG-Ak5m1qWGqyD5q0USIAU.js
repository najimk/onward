/* global a2a*/
(function (Drupal) {
  'use strict';

  Drupal.behaviors.addToAny = {
    attach: function (context, settings) {
      // If not the full document (it's probably AJAX), and window.a2a exists
      if (context !== document && window.a2a) {
        a2a.init_all(); // Init all uninitiated AddToAny instances
      }
    }
  };

})(Drupal);
;
/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_barrio = {
    attach: function (context, settings) {

      var position = window.scrollY;
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          document.querySelector('body').classList.add("scrolled");
        }
        else {
          document.querySelector('body').classList.remove("scrolled");
        }
        var scroll = window.scrollY;
        if (scroll > position) {
          document.querySelector('body').classList.add("scrolldown");
          document.querySelector('body').classList.remove("scrollup");
        } else {
          document.querySelector('body').classList.add("scrollup");
          document.querySelector('body').classList.remove("scrolldown");
        }
        position = scroll;
      });

      document.addEventListener('click', function (event) {

        // If the clicked element doesn't have the right selector, bail
        if (!event.target.matches('.dropdown-item a.dropdown-toggle')) return;
      
        // Don't follow the link
        event.preventDefault();
      
        toggle(event.target.next('ul'));
        event.stopPropagation();
      
      }, false);
      
      // Toggle element visibility
      var toggle = function (elem) {

        // If the element is visible, hide it
        if (window.getComputedStyle(elem).display === 'block') {
          hide(elem);
          return;
        }

        // Otherwise, show it
        show(elem);

      };
      
      var show = function (elem) {
        elem.style.display = 'block';
      };
      
      var hide = function (elem) {
        elem.style.display = 'none';
      };
    }
  };

})(Drupal);
;
/**
 *
 * Code fo the social networking icons on the sidebar on article pages
 *
 */

// Build the social share block
function populateSocialLinks(socialSite, elementId = "sharebar") {
  var i = document.createElement("i");
  i.className = "fab fa-" + socialSite;

  var a = document.createElement("a");
  a.className = "social-icon";
  a.href =
    "javascript:socialOpen('" +
    "https://" +
    socialSite +
    socialDict[socialSite] +
    window.location.href +
    "')";
  a.append(i);

  d = document.getElementById(elementId);
  d.style.zIndex = "999";
  d.append(a);
}

// raw share links https://crunchify.com/list-of-all-social-sharing-urls-for-handy-reference-social-media-sharing-buttons-without-javascript/
// If you add a service you have to add the URL modifier to the dict
var socialDict = {
  facebook: ".com/sharer/sharer.php?u=",
  twitter: ".com/share?url=",
  pinterest: ".com/pin/create/bookmarklet/?url=",
  linkedin: ".com/shareArticle?url=",
  reddit: ".com/submit?url=",
};

//   Enabled share services
socialLinks = ["facebook", "twitter", "linkedin", "pinterest", "reddit"];

//   Run it
socialLinks.forEach((item) => populateSocialLinks(item, "sharebar"));

// popup small window for share (plagiarised from somehwere.... not sure where)
function socialOpen(url) {
  window.open(
    url,
    "links",
    "toolbar=0,location=1,directories=0,status=0,menubar=0,scrollbars=auto,resizable=yes,dependent=yes,width=400,height=400"
  );
  window.blur();
}
var links; //to avoid "undefined" message
// JavaScript Unleashed's onUnload event handler
function clean() {
  if (links != null) {
    links.close();
  }
}
;
