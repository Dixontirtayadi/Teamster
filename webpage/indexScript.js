"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    document.getElementById("join-btn").addEventListener("click", joinClass);
    document.getElementById("create-btn").addEventListener("click", createClass);
  }

function joinClass() {
  window.location.href += 'class?cID=' + id("join").value;
}

function createClass() {
  window.location.href += 'class/teachers/game?cID=' + Math.floor(Math.random() * 9000 + 999);
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

  async function getMap() {
    let query = getQueryStringValue("classID")
    const resp = await fetch("/getData/");
    const json = await resp.json();
    console.log(json);
      return json;
  }

  //HOW TO USE
  // let d = getMap();
  // d.then((data) => (
  //   document.getElementById("demo").innerHTML = JSON.stringify(data)
  // ));
  // id("demo").innerHTML = id("join").value;
})();