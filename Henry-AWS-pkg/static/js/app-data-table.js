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

function resetFilter (){
  d3.selectAll('input').property("value", "");
}


// Get a reference to the table body
var tbody = d3.select("tbody");
function makeTable (data) {
  data.forEach(dp => {
    // Append one table row `tr` for each UFO Sighting object
    var row = tbody.append("tr");
    // Use `Object.entries` to console.log each UFO Sighting value
    Object.values(dp).forEach(value => {

      // Append a cell to the row for each value
      var cell = row.append("td");
      cell.text(value);
    });
  });
}


function runFilter (data) {
  event.preventDefault();
  tbody.html("");
  var filteredData = data;
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
       filteredData = filteredData;
      };
  });

  // get new offlineData for CSV
  getDataOffline(filteredData);
  makeTable(filteredData);

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
};



// ============== Henry's & OJ's modifications ================

d3.json("/api/master-record").then(function (tableData) {

  // get initial offlineData for CSV & initial filtered Data
  getDataOffline(tableData);
  
  // make initial table upon page loading, limit for only 100 records 
  // to improve webpage loading performance
  makeTable(tableData.slice(0,100));
  
  // Select the run filter button
  var button = d3.select("#filter-btn");
  var inpForm = d3.select("#input-form");
  button.on("click", function () {
    runFilter(tableData)});
  inpForm.on("submit", function () {
    runFilter(tableData)});
}).catch(error => {
  console.log(error);
})

// onclick will download the csv
document.getElementById("csv-btn").onclick = download_csv;

// onclick to clear out all filter
document.getElementById("reset-btn").onclick = resetFilter;