/*



// ================= DECLARE SOME VARS =====================

// access the body of the table 
var tbody = d3.select("tbody");



// Select the button & form container
var filButton = d3.select("#filter-btn");
var inpForm = d3.select("#input-form");

// event handler (D3.js script) for all filters
filButton.on("click", exeMultiFilter); // filter button is clicked 
inpForm.on("submit", exeMultiFilter); // when "enter" key is hit

// event handler (pure HTML) to change background color of status box
document.getElementById("filter-btn").onclick = function(){
    document.getElementById("sitRep").style.color = 'white';
    document.getElementById("sitRep").style.backgroundColor = 'black';
}

// ============= DECLARE SOME FUNCTIONS ==============

// make table from array of objects
function makeTable (tblData) {
    tblData.forEach(obj => {
        // print out the retrieve object
        // console.log("making table...", obj); 
        
        // add row for each object in the array
        var row = tbody.append("tr");

        //within each object, get the key-value pairs to fill each cell
        // of the same row
        Object.entries(obj).forEach(([key, value]) => {

            // add tag td for data 
            var cell = row.append("td");

            // add data 
            cell.text(value);
            });
    });
};   // ============== END DECLARING FUNCTIONS ===============


// upon page loading, display all table data
// makeTable(events);


// =============== GET FORM INPUT ======================

// id array of all input boxes
var idObj = {
    Launch_Date : "#datetime",
    Country_of_Operator_Owner : "#country",
    Launch_Site : "#launchsite",
    Purpose : "#purpose",
    Orbit_Classes : "#orbitclasses"
};

// loop and get a object of filtering parameters input by user
var inpVal;  // each input from the form
// var inpValObj = {};  // create an object to hold the key-value pairs
// // ---------------------------- //

function filterData(event) {
   return Object.keys(this).every(key => event[key] == this[key]);
};

var curDate = new Date()

var ftrD;
function exeMultiFilter (dataset) {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // clear old table
    tbody.html("");
    
    // retrieve new filtering condtitions from user input
   
    ftrD = dataset;
    Object.entries(idObj).forEach(([key, value]) => {
        // get the user input value from the UI form 
        inpVal = d3.select(value).property("value");

        if (inpVal != ""){
            inpVal = inpVal.toLowerCase();
            // push the key with value into object
            ftrD = ftrD.filter(record => record[key].toLowerCase() == inpVal);
        }
    });
    
    // make table from retrieved data
    makeTable(ftrD);
    
    // check how many records retrieved
    var ftrDLen = Object.keys(ftrD).length
    
    // let user know when data retrieval & table are finished
    var status = d3.select("#sitRep").text("STATUS:")
        .append("p").attr("id", "user-notif")
        .text("Finished Retrieving : " + ftrDLen + " Records")
        .append("p").attr("id", "usNoteDate")
        .text(new Date());
    
    // if filter is not in table's data, tell user to check input
    if (Object.keys(inpValObj).length != 0 && ftrDLen == 0) {
            status.append("p").attr("id", "noData")
            .text("No data found, please check filters and try again..."); 
    }

    // if filter is not input, notify user
    else if (Object.keys(inpValObj).length == 0 && ftrDLen != 0) {
                status.append("p").attr("id", "noData")
                .text("WARNING: No filter applied, please input at least one & try again ..."); 
    }
}

var dataUrl = "/api/master-record";
        
d3.json(dataUrl).then((data) => {
    console.log("OJ run function", data)
    // if (err) throw err;
    // console.log("124 this is raw data ::  ", data)
    });


//     // get first and last dates on the data array
// var fdate = data[0].datetime;
// var ldate = data.slice(-1)[0].datetime;

// // then feed that to placeholder of input
// d3.select("#datetime").attr("placeholder", `${fdate} to ${ldate}`);

    // exeMultiFilter (data) {     //parse in exeMultiFilter, get data from json & run with the function
// parse the data & it runs the enitre functions

// });
*/

d3.json("/api/master-record").then(function (tableData) {
  // from data.js in oj's HW11
  console.log(tableData);

  // Get a reference to the table body
  var tbody = d3.select("tbody");

  // SAT LAUNCH values for each column
  tableData.slice(0, 10).forEach(function (satlaunch) {
    console.log("tableData.forEachsatlaunch", satlaunch);
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

    // // Select the input date get the raw HTML nodes
    // var inputElement = d3.select("#datetime");
    // var inputCountry = d3.select("#country");
    // // Get the value property of the input date, state, shape
    // var inputValue = inputElement.property("value");
    // var countryValue = inputCountry.property("value");
    // // console.log input value
    // console.log("inputValue", inputValue);
    // // Filter Data with datetime equal to input value
    // var filteredData = tableData.filter(
    //   (satellite) =>
    //     satellite.Launch_Date === inputValue ||
    //     satellite.country_of_operator_owner === countryValue
    // );
    // // console.log filter values
    // console.log("filteredData", filteredData);

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
        inpVal = inpVal.toLowerCase();
        // push the key with value into object
        filteredData = filteredData.filter(
          (record) => record[key].toString().toLowerCase() == inpVal
        );
      }
    });

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
        // // check how many records retrieved
        // var ftrDLen = Object.keys(filteredData).length
    
        // // let user know when data retrieval & table are finished
        // var status = d3.select("#sitRep").text("STATUS:")
        //     .append("p").attr("id", "user-notif")
        //     .text("Finished Retrieving : " + ftrDLen + " Records")
        //     .append("p").attr("id", "usNoteDate")
        //     .text(new Date());
        
        // // if filter is not in table's data, tell user to check input
        // if (Object.keys(inpValObj).length != 0 && ftrDLen == 0) {
        //         status.append("p").attr("id", "noData")
        //         .text("No data found, please check filters and try again..."); 
        // }
    
        // // if filter is not input, notify user
        // else if (Object.keys(inpValObj).length == 0 && ftrDLen != 0) {
        //             status.append("p").attr("id", "noData")
        //             .text("WARNING: No filter applied, please input at least one & try again ..."); 

  });
});

