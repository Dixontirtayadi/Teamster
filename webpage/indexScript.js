"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    document.getElementById("my-btn").addEventListener("click", displayDate);
  }

function displayDate() {
  document.getElementById("demo").innerHTML = Date() + "hello";
}

  /* ---- Helper Functions ---- */
  function id(id) {
    return document.getElementById(id);
  }

  // less common, but you may find it helpful
  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();