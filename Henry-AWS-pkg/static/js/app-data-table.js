// ============== Henry's modifications ================

var inputValObj = [];

// store data offline for 
var offlineData;

function getDataOffline (data){
  return offlineData = data;
}

function downloadCSV () {
  convertToCSV();
}

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)
  
  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}

function download_csv(arr) {
  const array = [Object.keys(arr[0])].concat(arr);
  
  array.map(it => {
    return Object.values(it).toString()
  }).join('\n')

  console.log("this is array :: ", array);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(array);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'people.csv';
  hiddenElement.click();
}

// ============== End Henry's modifications ================



// ============== OJ's modifications ================

d3.json("/api/master-record").then(function (tableData) {
  // from data.js in oj's HW11

  // Get a reference to the table body
  var tbody = d3.select("tbody");
  
  // SAT LAUNCH values for each column
  getDataOffline(tableData);
  tableData.slice(0, 10).forEach(function (satlaunch) {
    // Append one table row `tr` for each UFO Sighting object
    var row = tbody.append("tr");
    
    // Use `Object.entries` to console.log each UFO Sighting value
    Object.entries(satlaunch).forEach(function ([key, value]) {
      //   console.log(key, value);
      // Append a cell to the row for each value
      var cell = row.append("td");
      cell.text(value);
    });
  });

  // Select the run filter button
  var button = d3.select("#filter-btn");
  button.on("click", function () {
    tbody.html("");

    // =============== GET FORM INPUT ======================

    // id array of all input boxes
    var idObj = {
      Launch_Date: "#datetime",
      Country_of_Operator_Owner: "#country",
      Launch_Site: "#launch_site",
      Purpose: "#purpose",
      Orbit_Classes: "#orbitclasses",
    };

    filteredData = tableData;
    Object.entries(idObj).forEach(([key, value]) => {
      // get the user input value from the UI form
      inpVal = d3.select(value).property("value");

      if (inpVal != "") {
        inputValObj.push(inpVal);
        inpVal = inpVal.toLowerCase();
        // push the key with value into object
        filteredData = filteredData.filter(
          (record) => record[key].toString().toLowerCase() == inpVal
        );
      }
    });
    getDataOffline(filteredData);
    filteredData.forEach(function (selections) {
      //   console.log(selections);
      // Append one table row `tr` for each UFO Sighting object
      var row = tbody.append("tr");
      // Use `Object.entries` to console.log each UFO Sighting value
      Object.entries(selections).forEach(function ([key, value]) {
        // console.log(key, value);
        // Append a cell to the row for each value
        var cell = row.append("td");
        cell.text(value);
      });
    });
    console.log("this is filtered table data :: ", filteredData);

    // check how many records retrieved
    var ftrDLen = Object.keys(filteredData).length

    // let user know when data retrieval & table are finished
    var status = d3.select("#sitRep").text("STATUS:")
      .append("p").attr("id", "user-notif")
      .text("Finished Retrieving : " + ftrDLen + " Records")
      .append("p").attr("id", "usNoteDate")
      .text(new Date());

    // if filter is not in table's data, tell user to check input
    if (inputValObj.length != 0 && ftrDLen == 0) {
      status.append("p").attr("id", "noData")
        .text("No data found, please check filters and try again...");
    }

    // if filter is not input, notify user
    else if (inputValObj.length == 0 && ftrDLen != 0) {
      status.append("p").attr("id", "noData")
        .text("WARNING: No filter applied, please input at least one & try again ...");
    }
  });
});


// document.getElementById("clickMe").onclick = getCSV;

