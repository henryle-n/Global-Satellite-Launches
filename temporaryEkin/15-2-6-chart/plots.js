d3.csv("LaunchCountrydate.csv", function(data) {
    console.log(data)
});


// Sort the data by Greek search results
var sortedByLaunchSearch = LaunchCountrydate.sort((a, b) => b.ValueCounts - a.ValueCounts);

// Slice the first 10 objects for plotting
slicedData = sortedByLaunchSearch.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
var trace1 = {
    x: reversedData.map(object => object.ValueCounts),
    y: reversedData.map(object => object.CountryOperatorOwner),
    text: reversedData.map(object => object.CountryOperatorOwner),
    name: "Satellite",
    type: "bar",
    orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
    title: "Total Satellite Launch Counts by Country",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);