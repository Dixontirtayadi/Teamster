"use strict";

(function () {
    window.addEventListener("load", init);
    function init() {
      var cid = getQueryStringValue("classID");
      var num = getQueryStringValue("maxNum");
      fetch("/formGroups?classID=" + cid +"&maxNum=" + num).then((response) => {
          response.json().then( (data) => {
             getResults(data);
          })
      })
    }

    function getResults (data) {
        // Change numPeople based on data
        
        var results = data;
        for ( let i = 0; i < results.length; i++) {
            let list = document.createElement("ul");
            list.class = "person" + i;
            console.log(results[i]);
            for (let j = 0; j < results[i].length; j++) {
                let nameEmail = document.createElement("li");
                nameEmail.textContent = results[i][j].name + ", " + results[i][j].email;
                list.appendChild(nameEmail);
            }
            id("text_results").appendChild(list);
            id("export").addEventListener(exportToCsv, "breakoutrooms.csv", results);
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

  function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
        
})();