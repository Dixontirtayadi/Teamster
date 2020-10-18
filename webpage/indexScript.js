"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    let query = getQueryStringValue("classID")
    fetch("/getData/" + query).then((res) => {
      res.json().then( (d) => {
        console.log("Got data!");
        console.log(d);
      })
    })
    
    document.getElementById("my-btn").addEventListener("click", displayDate);

  }

function displayDate() {
  document.getElementById("demo").innerHTML = Date() + "hello";
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