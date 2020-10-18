"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    id("joinGame").addEventListener("click", joinGame);
    const url = new URL(window.location.href);
    const classID = url.searchParams.get("cID");
    id("classID").innerHTML = classID;
    if (id("displayClass") !== null) {
      let d = getMap();
      d.then((data) => (
        id("diplayClass").innerHTML = JSON.stringify(data)
      ));
      // id("demo").innerHTML = id("join").value;
    }
  }

function joinGame() {
  const url = new URL(window.location.href);
  const classID = url.searchParams.get("cID");
  window.location.href = window.location.origin + '/class/students?cID=' + classID +
    "&sID=" + id("name").value + "&sEMAIL=" + id("email").value + "&answer=null";
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