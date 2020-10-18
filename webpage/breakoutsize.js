"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    console.log("Initialization");
    document.getElementById("start-btn").addEventListener("click", submitData);
  }
  
  function submitData() {
    var cid = getQueryStringValue("classID");
    var maxNum = id("numberOfPeople").value;
    console.log("Here");
    window.location.href = window.location.origin + "/analyze?classID=" + cid + "&maxNum=" + maxNum;
  }
  // reference from MDN
  function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  /* ---- Helper Functions ---- */
  function id(id) {
    return document.getElementById(id);
  }

})();