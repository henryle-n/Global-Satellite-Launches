// function buildMetadata(userData) {

//     result = userData;
//     console.log("result build meta\n", result);
//     var PANEL = d3.select("#sample-metadata");
//     PANEL.html("");

//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.  
//     Object.entries(result).forEach(([key, value]) => {
//       PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//     });  

//     buildGauge(result.wfreq);
//     }
function buildCharts(sample) {



    var userInfo;
    d3.csv("Data\LaunchCountryDate.csv").function((data) => {

        var resultArray = data.results;
        userInfo = data.user;

        var value_counts = resultArray.map(info => info.ValueCounts);
        var country_names = resultArray.map(info => info.CountryOperatorOwner);
        var launch_year = resultArray.map(info => info.LaunchYear);

        // // Build a Bubble Chart
        // var bubbleLayout = {
        //   title: "40 years of satellite launches ",
        //   margin: { t: 0 },
        //   hovermode: "closest",
        //   xaxis: { title: "years" },
        //   margin: { t: 30}
        // };
        // var bubbleData = [
        //   {
        //     x: launch_dates,
        //     y: years_count,
        //     text: otu_labels,
        //     mode: "markers",
        //     marker: {
        //       size: years_count,
        //       color: launch_dates,
        //       colorscale: "Earth"
        //     }
        //   }
        // ];

        // Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // var yticks = launch_dates.slice(0, 10).map(launcs => `LAUNCH ${launcs}`).reverse();
        // var barData = [
        //   {
        //     y: yticks,
        //     x: sample_values.slice(0, 10).reverse(),
        //     text: otu_labels.slice(0, 10).reverse(),
        //     type: "bar",
        //     orientation: "h",
        //   }
        // ];

        // var barLayout = {
        //   title: "Top 10 Bacteria Cultures Found",
        //   margin: { t: 30, l: 150 }
        // };

        // Plotly.newPlot("bar", barData, barLayout);

        // buildMetadata(userInfo);

    });



}

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.csv("Data\launchDate.csv.csv").then((data) => {
        var sampleNames = data;

        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        var userData = buildCharts(firstSample);

    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    console.log(`change ${{newSample}}`)
    buildCharts(newSample);

}

// Initialize the dashboard
init();