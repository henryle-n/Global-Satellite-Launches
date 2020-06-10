// =========== Henry's Data Retrieval- version 0 ============


var dataUrl = "/api/launch-date";

var dayArr = []; // the master list of all days including duplications
var dayCountObj = []; // {day1: counts, day2: counts, etc..}
var monthArr = []; // the master list of all days including duplications
var monthCountArr = []; // {day1: counts, day2: counts, etc..}
var yearArr = []; // the master list of all days including duplications
var yearCountArr = [] // {day1: counts, day2: counts, etc..}

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


var svgWidth;
var svgHeight;
var margin;
var width;
var height;
var svgArea;
var chartGroup;
var transDura = 800; // unit = ms :: transition Time between new data
var scaleMin = 15; // percentage ::  axis value extension beyond dataset min value 
var scaleMax = 10; // percentage ::  axis value extension beyond dataset max value
var toolTip;
var toolTipArea;
// specify label starting position relative to origin and spacing out between labels of the same axis
var labelStartPos = 3; // rem unit
var labelSpacing = 1.3; // rem unit

// circular datapoint radius
var circleRadius = 12;

// default axes upon page loading
var chosenXaxis = "day";
var chosenYaxis = "dayCounts";

var body = document.body,
    html = document.documentElement;

// ============== SVG CREATTION ==================
function refreshExistElemt(element) {
    if (element && !element.empty()) {
        element.remove();
    }
}

function createSVG() {
    refreshExistElemt(svgArea);

    // find svgHeight & Width upon loading based on container current size
    svgWidth = Math.min(
        d3.select("#ekHenryLauchBar").node().getBoundingClientRect().width
    );

    // I love golden ratio = 1.618
    if (svgWidth >= 768) { // screen size in pixels
        svgHeight = window.innerHeight / ((1 + Math.sqrt(5)) / 2);
    } else
        svgHeight = svgWidth;

    margin = {
        top: 20,
        right: 50,
        bottom: 100,
        left: 130
    };

    width = svgWidth - margin.left - margin.right;
    height = svgHeight - margin.top - margin.bottom;

    var scatter = d3.select("body").select("#ekHenryLauchBar");

    svgArea = scatter
        .append("div")
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    // shift the svg area to specified parameters
    chartGroup = d3.select("svg").append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
}


// =============== SCALING AXES =================
function xScale(data, chosenXaxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        // scale so that min of the axis is 20% extended beyond original data
        // max is 20% more than original
        .domain([
            d3.min(data, d => d[chosenXaxis]) * (1 - scaleMin / 100),
            d3.max(data, d => d[chosenXaxis]) * (1 + scaleMax / 100)
        ])
        .range([0, width]);
    return xLinearScale;
}

// function used for updating y-scale var upon click on yAxis label
function yScale(data, chosenYaxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d[chosenYaxis]) * (1 - scaleMin / 100),
            d3.max(data, d => d[chosenYaxis]) * (1 + scaleMax / 100)
        ])
        .range([height, 0]);
    return yLinearScale;
}

// =============== UPDATING CURRENT AXES =================
function renderXaxis(newXscale, xAxis) {
    var bottomAxis = d3.axisBottom(newXscale);
    xAxis.transition()
        .duration(transDura)
        .call(bottomAxis);
    return xAxis;
}

function renderYaxis(newYscale, yAxis) {
    var leftAxis = d3.axisLeft(newYscale);
    yAxis.transition()
        .duration(transDura)
        .call(leftAxis);
    return yAxis;
}

// ================= RENDERING CIRCLES ===================

// create/ update circular data points on graph
function renderCircles(circlesGroup, newXscale, newYscale, chosenXaxis, chosenYaxis) {

    circlesGroup.transition()
        .duration(transDura)
        .attr("cx", d => newXscale(d[chosenXaxis]))
        .attr("cy", d => newYscale(d[chosenYaxis]));
    return circlesGroup;
}

// ================= RENDERING CIRC LABELS ===================

// create/ update circular data points on graph
function renderCirLabel(circLabelGroup, newXscale, newYscale, chosenXaxis, chosenYaxis) {

    circLabelGroup.transition()
        .duration(transDura)
        .attr("x", d => newXscale(d[chosenXaxis]))
        .attr("y", d => newYscale(d[chosenYaxis]));
    return circLabelGroup;
}


// ================= UPDATE TOOLTIPS ===================
function updateToolTip(chosenXaxis, chosenYaxis, elementGroup) {
    toolTipArea = d3.selectAll("div.tooltip");

    // delete existing tootip and update to new tooltip
    refreshExistElemt(toolTipArea);

    // define label(key) for tooltip content box
    var labelX;
    var labelY;

    // these switch will help build the keys for tooltip box when hovering over the data and tag
    switch (chosenXaxis) {
        case "day":
            labelX = "Day";
            break;

        case "month":
            labelX = "Year";
            break;

        case "year":
            labelX = "Year";
            break;
    }

    labelY = "Counts";
    // use d3.tip to construct tooltips
    toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([-10, 0])
        .html(function (row) {
            // income has different unit
            return (`
            ${labelX}
            -------------------------<br>
            ${labelY} : 
                </span>
                <br>
                <span style='color:#59DCE5'>
                ${row[chosenYaxis]}
                </span>
            `);
        }
        );

    // add tooltip to chart circles and state text
    elementGroup.call(toolTip);

    // mouse event listener to show tooltip when hovering mouse over the circles or state text
    elementGroup.on("mouseover", function (tTip) {
        toolTip.show(tTip);
    })
        // onmouseout event
        .on("mouseout", function (tTip, i) {
            toolTip.hide(tTip);
        });

    return elementGroup;
}


function initChart() {

    // call back to create svg canvas
    createSVG();
    d3.json(dataUrl).then((data, err) => {
        if (err) throw err;

        data.forEach(row => {
            // ====== This is for day ======
            dayArr.push(row['Launch_Day']);
            monthArr.push(row['Launch_Month']);
            yearArr.push(row['Launch_Year']);
        });

        dayCounts = numFreqCount(dayArr, "day");
        monthCounts = numFreqCount(monthArr, "month");
        yearCounts = numFreqCount(yearArr,"year");

        console.log(" this is dayCounts :: ", dayCounts);
        console.log(" this is monthCounts :: ", monthCounts);
        console.log(" this is yearCounts :: ", yearCounts);


        switch (chosenXaxis) {
            case "day":
                chosenYaxis = "dayCounts";
                demoData = dayCounts;

            case "month":
                chosenYaxis = "monthCounts";
                demoData = monthCounts;

            case "year":
                chosenYaxis = "yearCounts";
                demoData = yearCounts;
        }


        //  x & y linear scale function 
        var xLinearScale = xScale(demoData, chosenXaxis);
        var yLinearScale = yScale(demoData, chosenYaxis);


        // Create initial axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // append and show x & y axes
        var xAxis = chartGroup.append("g")
            .attr("id", "axisText")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        var yAxis = chartGroup.append("g")
            .attr("id", "axisText")
            .call(leftAxis)

        // create initial circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(demoData)
            .enter()
            .append("circle")
            .attr("cx", data => xLinearScale(data[chosenXaxis]))
            .attr("cy", data => yLinearScale(data[chosenYaxis]))
            .attr("r", circleRadius);

        // create initial circle labels === state abbr text
        var circLabelGroup = chartGroup.selectAll(".circLabel")
            .data(demoData)
            .enter()
            .append("text")
            .classed("circLabel", true)
            .attr("x", data => xLinearScale(data[chosenXaxis]))
            .attr("y", data => yLinearScale(data[chosenYaxis]))
            .attr("dy", 3.5)
            .text(data => data.abbr);


        // --------- Create group for 3 x-axis labels ------------
        var labelsGroupX = chartGroup.append("g")
            // position of the xAxis labels
            .attr("transform", `translate(${width / 2}, ${height})`);

        // add text label to the labelsGroup
        var dayLabel = labelsGroupX.append("text")
            .attr("y", `${labelStartPos}rem`)
            .attr("value", "day") // value to grab for event listener
            .classed("active", true)
            .text("Launch Day");

        var monthLabel = labelsGroupX.append("text")
            .attr("y", `${labelStartPos + labelSpacing}rem`)
            .attr("value", "month") // value to grab for event listener
            .classed("inactive", true)
            .text("Launch Month");

        var yearLabel = labelsGroupX.append("text")
            .attr("y", `${labelStartPos + 2 * labelSpacing}rem`)
            .attr("value", "year") // value to grab for event listener
            .classed("inactive", true)
            .text("Launch Year");

        // --------- Create group for 3 y-axis labels ------------
        var labelsGroupY = chartGroup.append("g")
            // rotate yAxis label CCW 90-deg and move the label origin to mid yAxis  
            .attr("transform", `rotate(-90) translate(${-height / 2}, 0)`);

        // add text labels to the labelsGroup
        var launchCountsLabel = labelsGroupY.append("text")
            .attr("y", `${-labelStartPos}rem`)
            .text("Satellite Launch Counts");


        // updateToolTip function above csv import
        var circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup);

        // updateToolTipState function above csv import
        var circLabelGroup = updateToolTip(chosenXaxis, chosenYaxis, circLabelGroup);


        // x axis labels event listener
        labelsGroupX.selectAll("text")
            .on("click", function () {
                // get value of selection
                var value = d3.select(this).attr("value");
                if (value !== chosenXaxis) {

                    // replaces chosenXaxis with value
                    chosenXaxis = value;

                    // updates x & y scale for new data
                    xLinearScale = xScale(demoData, chosenXaxis);
                    yLinearScale = yScale(demoData, chosenYaxis);

                    // updates x axis with transition
                    xAxis = renderXaxis(xLinearScale, xAxis);
                    yAxis = renderYaxis(yLinearScale, yAxis);

                    // updates circle labels with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

                    circLabelGroup = renderCirLabel(circLabelGroup, xLinearScale, yLinearScale, chosenXaxis, chosenYaxis);

                    // updates tooltips with new info
                    circlesGroup = updateToolTip(chosenXaxis, chosenYaxis, circlesGroup);

                    circLabelGroup = updateToolTip(chosenXaxis, chosenYaxis, circLabelGroup);

                    // changes classes to change css format for active and inactive xAxis labels
                    switch (chosenXaxis) {
                        case "day":
                            dayLabel
                                .classed("active", false)
                                .classed("inactive", true);
                            monthLabel
                                .classed("active", false)
                                .classed("inactive", true);
                            yearLabel
                                .classed("active", true)
                                .classed("inactive", false);
                            break;

                        case "month":
                            dayLabel
                                .classed("active", false)
                                .classed("inactive", true);
                            monthLabel
                                .classed("active", false)
                                .classed("inactive", true);
                            yearLabel
                                .classed("active", true)
                                .classed("inactive", false);
                            break;

                        default:
                            dayLabel
                                .classed("active", false)
                                .classed("inactive", true);
                            monthLabel
                                .classed("active", true)
                                .classed("inactive", false);
                            yearLabel
                                .classed("active", false)
                                .classed("inactive", true);
                            break;
                    }

                    getAnalysis(chosenXaxis, chosenYaxis);
                }
            });

        }
    )
        // log any error while pulling promises
    .catch(function (err) {
        console.log("Error(s) while running Promise :: ", err);
    })
}