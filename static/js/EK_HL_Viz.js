// =========== Henry's Data Retrieval- version 0 ============


var dataUrl = "/api/launch-date";

var dayArr = []; // the master list of all days including duplications
var dayCounts ={}; // {day1: counts, day2: counts, etc..}
var monthArr = []; // the master list of all days including duplications
var monthCounts ={}; // {day1: counts, day2: counts, etc..}
var yearArr = []; // the master list of all days including duplications
var yearCounts ={}; // {day1: counts, day2: counts, etc..}

// for the plot, x and y axes
var xDay=[];
var yDay=[];
var xMonth=[];
var yMonth=[];
var xYear=[];
var yYear=[];

function numFreqCount(numArr) {
  
    // An object to hold word frequency
    var numCount = {};
  
    // Iterate through the array
    for (var i = 0; i < numArr.length; i++) {
      var currNum = numArr[i];
      // If the word has been seen before...
      if (currNum in numCount) {
        // Add one to the counter
        numCount[currNum] += 1;
      }
      else {
        // Set the counter at 1
        numCount[currNum] = 1;
      }
    }
    return numCount;
  }

//   ====== use d3 promise to retrieve data =====
d3.json(dataUrl).then((data) => {
    data.forEach(row => {
        // ====== This is for day ======
        dayArr.push(row['Launch_Day']);
        monthArr.push(row['Launch_Month']);
        yearArr.push(row['Launch_Year']);
    });

    dayCounts = numFreqCount(dayArr);
    monthCounts = numFreqCount(monthArr);
    yearCounts = numFreqCount(yearArr);

    console.log(" this is dayCounts :: ", dayCounts);
    console.log(" this is monthCounts :: ", monthCounts);
    console.log(" this is yearCounts :: ", yearCounts);

    
    Object.entries(dayCounts).forEach(([k, v]) => {
        xDay.push(k);
        yDay.push(v);
    });

    Object.entries(monthCounts).forEach(([k, v]) => {
        xMonth.push(k);
        yMonth.push(v);
    });

    Object.entries(yearCounts).forEach(([k, v]) => {
        xYear.push(k);
        yYear.push(v);
    });

    console.log("this is xDay", xDay, "this is yDay", yDay);
    console.log("this is xMonth", xMonth, "this is yMonth", yMonth);
    console.log("this is xYear", xYear, "this is yYear", yYear);


// =========== Ekin's Visualization - version 0 ============


})

