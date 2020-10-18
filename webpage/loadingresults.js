"use strict";

(function () {
  window.addEventListener("load", init);

  function init() {
    var cid = getQueryStringValue("classID");
    fetch("/formGroups?classID=" + cid).then((response) => {
        response.json().then( (data) => {
            console.log(data);
        })
    })
  }
  
  // reference from MDN
  function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

})();