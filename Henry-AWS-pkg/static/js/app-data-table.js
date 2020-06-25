// ============== Henry's modifications ================

var inputValObj = [];

// store data offline for exporting upon user request
var offlineData;

function getDataOffline(data) {
  return offlineData = data;
}

/*
- convert retrieved data to csv
- part of process will be also to replace all "," of thousand seperator
- if comma is not removed, the csv will not work correctly as the program thought
- the comma from thousand seperator is the comma delimiter
*/
function convertToCSV(arr) {
  var newArr = [];
  var tempObj = {};
  arr.forEach(row => {
    Object.entries(row).forEach(([k, v]) => {
      v = v.toString().replace(/,/g, '');
      k = k;
      tempObj[k] = v;
    })
    newArr.push(tempObj);
    tempObj = {};
  })

  const array = [Object.keys(newArr[0])].concat(newArr);
  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n');
}

// this will trigger the dowload of csv
function download_csv() {
  baseName = "Filtered-Data_";
  var currDate = new Date();
  var month = currDate.getUTCMonth() + 1; //months from 1-12
  var day = currDate.getUTCDate();
  var year = currDate.getUTCFullYear();
  var newdate = month + "-" + day + "-" + year;

  array = convertToCSV(offlineData);
  console.log("this is offline DATA\n", offlineData);
  var hiddenElement = document.createElement('a');
  // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(array);
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(array);
  hiddenElement.target = '_blank';
  hiddenElement.download = `${baseName}${newdate}.csv`;
  console.log(hiddenElement);
  hiddenElement.click();
}


// ============== Henry's & OJ's modifications ================

d3.json("/api/master-record").then(function (tableData) {
  // from data.js in oj's HW11

  // Get a reference to the table body
  var tbody = d3.select("tbody");

  // get initial offlineData for CSV & initial filtered Data
  getDataOffline(tableData);
  var filteredData = tableData;

  // SAT LAUNCH values for each column
  tableData.slice(0,100).forEach(function (satlaunch) {
    // Append one table row `tr` for each row in object
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

    Object.entries(idObj).forEach(([key, value]) => {
      // get the user input value from the UI form
      inpVal = d3.select(value).property("value");

      if (inpVal != "") {
        inputValObj.push(inpVal);
        inpVal = inpVal.toLowerCase();
        console.log("this is inputVAL :: ", inpVal);
        // push the key with value into object
        filteredData = filteredData.filter(
          (record) => record[key].toString().toLowerCase() == inpVal
        );
      }
       else {
         console.log("else empty :: ", inpVal);
         filteredData = filteredData;
        };
    });

    // get new offlineData for CSV
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

// onclick will download the csv
document.getElementById("csv-btn").onclick = download_csv;