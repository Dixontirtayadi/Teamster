"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    document.getElementById("my-btn").addEventListener("click", displayDate);
    console.log(getMap());
  }

  function getMap() {
    let query = getQueryStringValue("classID")
    var data;
    fetch("/getData/" + query).then((res) => {
      res.json().then( (d) => {
        console.log("Got data!");
        console.log(d);
        data = d;
      })
    })
    return data;
  }

function displayDate() {
  console.log("test" + getMap());

  // // var parsed = JSON.stringify(values);
  // console.log("parsed value is " + parsed);
  document.getElementById("demo").innerHTML = Date();
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