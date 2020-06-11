// =========== Henry's Data Retrieval- version 0 ============


var dataUrl = "/api/launch-date";

var dayArr = []; // the master list of all days including duplications
var dayCountObj = []; // {day1: counts, day2: counts, etc..}
var monthArr = []; // the master list of all days including duplications
var monthCountArr = []; // {momht1: counts, month2: counts, etc..}
var yearArr = []; // the master list of all years including duplications
var yearCountArr = [] // {year1: counts, year2: counts, etc..}

// for the plot, x and y axes
var xDay = [];
var yDay = [];
var xMonth = [];
var yMonth = [];
var xYear = [];
var yYear = [];

function numFreqCount(numArr, category) {

    // An object to hold word frequency
    var numCount = {};

    // Iterate through the array
    for (var i = 0; i < numArr.length; i++) {
        var currNum = numArr[i];
        // If the word has been seen before...
        if (currNum in numCount) {
            // Add one to the counter
            numCount[currNum] += 1;
        } else {
            // Set the counter at 1
            numCount[currNum] = 1;
        }
    }
    var CountArr = [];
    Object.entries(numCount).forEach(([k, v]) => {
        var CountObj = {}
        CountObj[category] = +k;
        CountObj[`${category}Counts`] = +v;
        CountArr.push(CountObj);
    });
    return CountArr;
}


// ===================== Henry's Base Code ================== 

d3.json(dataUrl).then((data, err) => {
        console.log("running :: ", getScriptName());
        if (err) throw err;

        data.forEach(row => {
            // ====== This is for day ======
            dayArr.push(row['Launch_Day']);
            monthArr.push(row['Launch_Month']);
            yearArr.push(row['Launch_Year']);
        });
        dayCountArr = numFreqCount(dayArr, "day").sort((a, b) => b.dayCounts - a.dayCounts);
        monthCountArr = numFreqCount(monthArr, "month").sort((a, b) => b.monthCounts - a.monthCounts);
        yearCountArr = numFreqCount(yearArr, "year").sort((a, b) => b.yearCounts - a.yearCounts);

        console.log(" this is dayCountArr :: ", dayCountArr);
        console.log(" this is monthCountArr :: ", monthCountArr);
        console.log(" this is yearCountArr :: ", yearCountArr);



        var xAxisDay = dayCountArr.map(row => row.day);
        var yAxisDay = dayCountArr.map(row => row.dayCounts);

        var dayBarData = [{
            x: xAxisDay,
            y: yAxisDay,
            type: 'bar',
            marker: {
                color: 'rgba(158, 55, 190, 0.35)'
            }
        }];
        var dayBarLayout = {
            title: 'Launch Day Counts',
            font: {
                family: 'Raleway, sans-serif'
            },
            showlegend: false,

            xaxis: {
                tickangle: -0,
                title: 'Day',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                }
            },

            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap: 0.05,
            yaxis: {
                title: 'Satellite Counts',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
            }

        };

        Plotly.newPlot('LaunchDayBar', dayBarData, dayBarLayout);

        // ========================= Ekin's Visualization ====================== 

        var xAxisMonth = monthCountArr.map(row => row.month);
        var yAxisMonth = monthCountArr.map(row => row.monthCounts);

        var monthBarData = [{
            x: xAxisMonth,
            y: yAxisMonth,
            type: 'bar',
            marker: {
                color: 'rgba(158, 55, 190, 0.35)'
            }
        }];
        var monthBarLayout = {
            title: 'Launch Month Counts',
            font: {
                family: 'Raleway, sans-serif'
            },
            showlegend: false,

            xaxis: {
                tickangle: -0,
                title: 'Satellite Counts',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                }
            },

            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap: 0.05,
            yaxis: {
                title: 'Satellite Counts',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
            }

        };

        Plotly.newPlot('LaunchMonthBar', monthBarData, monthBarLayout);





        var xAxisYear = yearCountArr.map(row => row.year);
        var yAxisYear = yearCountArr.map(row => row.yearCounts);

        var yearBarData = [{
            x: xAxisYear,
            y: yAxisYear,
            type: 'bar',
            marker: {
                color: 'rgba(158, 55, 190, 0.35)'
            }
        }];
        var yearBarLayout = {
            title: 'Launch Year Counts',
            font: {
                family: 'Raleway, sans-serif'
            },
            showlegend: false,

            xaxis: {
                tickangle: -0,
                title: 'Satellite Counts',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                }
            },

            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap: 0.05,
            yaxis: {
                title: 'Satellite Counts',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
            }

        };

        Plotly.newPlot('LaunchYearBar', yearBarData, yearBarLayout);

        // ================================================================
        console.log("end running :: ", getScriptName());
    })
    // log any error while pulling promises
    .catch(function(err) {
        console.log("Error(s) while running Promise :: ", err);
    })