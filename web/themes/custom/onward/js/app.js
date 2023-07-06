/**
 * @file
 * Global utilities.
 *
 */

(function($, Drupal) {
    "use strict";

    $(".dropdown > a").click(function() {
        location.href = this.href;
    });

    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function() {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function() {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

})(jQuery, Drupal);

/**
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

