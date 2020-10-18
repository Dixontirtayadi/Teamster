"use strict";

(function () {
    window.addEventListener("load", init);
    function init() {
      getResults();
    }

    function getResults () {
        // Change numPeople based on data
        
        //var results = [numPeople][2];
        var results = [[{name: "Woo Young Kim", email: "wookim@uw.edu"}, {name: "Name2", email: "name2uw.edu"},{name: "Name3", email: "Name3@uw.edu"}, ],[{name: "Group2Name1", email: "G2N1@uw.edu"}, {name: "Name4", email: "Name4@uw.edu"}, {name: "Name5", email: "Name5@uw.edu"}]];
        for ( let i = 0; i < results.length; i++) {
            let list = document.createElement("ul");
            list.class = "person" + i;
            console.log(results[i]);
            for (let j = 0; j < results[i].length; j++) {
                let nameEmail = document.createElement("li");
                nameEmail.textContent = results[i][j].name + ", " + results[i][j].email;
                list.appendChild(nameEmail);
            }
            console.log(id("text_results"));
            id("text_results").appendChild(list);
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
        
})();