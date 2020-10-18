"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    const url = new URL(window.location.href);
    const classID = url.searchParams.get("cID");
    id("classID").innerHTML = classID;
    if (id("displayClass") !== null) {
      var mapped;
      let d = getMap();
      d.then((data) => (
        function() {
          var str = "";
          for (var i = 0; i < data[classID].length ; i++) {
            console.log(id("displayClass").value);
            str += "<br>" + JSON.stringify(data[classID][i]["name"])
          }
          id("displayClass").innerHTML = str;
        }()
      ));
    }
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