"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    document.getElementById("my-btn").addEventListener("click", displayDate);
    console.log(getMap());
  }

  async function getMap() {
    let query = getQueryStringValue("classID")
    const resp = await fetch("/getData/");
    const json = await resp.json();
    console.log(json);
      return json;
  }

function displayDate() {
  let d = getMap();
  d.then((data) => (
    document.getElementById("demo").innerHTML = JSON.stringify(data)
  ));

  // // var parsed = JSON.stringify(values);
  // console.log("parsed value is " + parsed);

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