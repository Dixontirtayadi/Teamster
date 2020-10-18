"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    let button = id("end");
    button.addEventListener("click", () => {
        var cID = getQueryStringValue("cID")
        window.location.href = window.location.origin + "/analyzeResult?classID=" + cID;
    });
  }

  /* ---- Helper Functions ---- */
  function id(id) {
    return document.getElementById(id);
  }

// reference from MDN
  function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  // less common, but you may find it helpful
  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();