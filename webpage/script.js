"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    let button = id("my-btn");
    button.addEventListener("click", () => {
      doThing("Parameter!");
    });

    let erase = id("erase-btn");
    erase.addEventListener("click", eraseSelf);
  }

  function eraseSelf(e) {
    let btn = e.currentTarget;
    btn.classList.add("hidden");
    // TODO -- What happens here?
  }

  function doThing(a) {
    let p = qs("#container p");
    console.log(typeof(p));
    p.textContent = "Goodbye.";
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