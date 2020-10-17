"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    document.getElementById("my-btn").addEventListener("click", displayDate);

    // let erase = id("erase-btn");
    // erase.addEventListener("click", eraseSelf);
  }

  // function eraseSelf(e) {
  //   let btn = e.currentTarget;
  //   btn.classList.add("hidden");
  //   // TODO -- What happens here?
  // }
  // document.getElementById("myBtn").addEventListener("click", displayDate);

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
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