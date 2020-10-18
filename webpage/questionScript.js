"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    document.getElementById("submit").addEventListener("click", getData);
  }


function getData() {
  var outputs = "1. " + id("q1").value + "   2. " + id("q2").value + "   3. "+ id("q3").value + "   4. "+ id("q4").value + "   5. "+ id("q5").value;
  console.log(outputs);
  const url = new URL(window.location.href);
  const classID = url.searchParams.get("cID");
  window.location.href = 'http://localhost:3000/submit?cID=' + classID +
    "&sID=" + url.searchParams.get("sID") + "&sEMAIL=" + url.searchParams.get("sEMAIL") + "&answer=" + outputs;
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