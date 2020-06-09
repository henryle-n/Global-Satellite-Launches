var dataUrl = "/api/lauch-history-by-country";


d3.json(dataUrl).then((data) => {

    var countryName = data.map(row => row.Country_of_Operator_Owner); // x-axis
    var valCount = data.map(row => row.Value_Counts); //y-axis

    var xticks = countryName.slice(0, 9);
    var yticks = valCount.slice(0, 9);

    var barData = [
        {
          x: xticks,
          y: yticks,
          type: 'bar',
            marker:{color: '#B21E56'
          }
        }
      ];
        var barLayout = {
            title: 'Country Counts',
            font:{
            family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
            tickangle: -0
            },
            yaxis: {
            zeroline: false,
            gridwidth: 2
            },
            bargap :0.05,
            yaxis: {
                title: 'Satellite Counts',
                titlefont: {
                size: 16,
                color: 'rgb(107, 107, 107)'
                },
            }
        };
      
      Plotly.newPlot('ojCountryBar', barData, barLayout);

    // create new chart below this line


});