function getLineGraph() {
  try {
    $.getJSON( "./../static/assets/data/country_names_counts.json", function( data ) {
      const graphData = generateDataFromJSON(data);
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChartDom = document.getElementById("myChart");
    if (screen.width <= 360) {
      myChartDom.height = 400;
    } else {
      myChartDom.height = 200;
    }
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: graphData.xLabels,
        datasets: [
          {
            label: `Top ${graphData.top} Country Names Count`,
            data: graphData.yLabels,
            backgroundColor: "rgba(209, 34, 28, 0.2)",
            borderColor: "rgb(209, 34, 28)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    return myChart;
    });
    
  } catch (error) {
    console.log(error);
  }
}

function generateDataFromJSON(countryNamesData) {
  try {
    let xLabels = [];
    let yLabels = [];
    const top = 10;
    // let my_url = "{{ url_for('get_country_names_counts') }}";
    // console.log(my_url);
    
    let sortedData = sortDataByValue(countryNamesData, top);
    sortedData.map((_data)=>{
      xLabels.push(_data.name);
      yLabels.push(_data.value);
      return _data;
    })
    // xLabels = Object.keys(Country_of_Operator_Owner).map((xlabel) => {
    //   return Country_of_Operator_Owner[xlabel];
    // });
    // yLabels = Object.keys(Satellite_Counts).map((yLabels) => {
    //   return Satellite_Counts[yLabels];
    // });
    return { xLabels, yLabels, top };
  } catch (error) {
    console.log(error);
  }
}

async function extractCountryData(countries) {
  try {
    let countryNamesData;
    await $.getJSON( "./../static/assets/data/country_names_counts.json", function( data ) {
      countryNamesData = data;
    });    
    const extractedCountries = [];
    const { Country_of_Operator_Owner, Satellite_Counts } = countryNamesData;
    Object.keys(Country_of_Operator_Owner).map((_countryOperator, index) => {
      countries.map((_countryObj) => {
        const { name } = (_countryObj || {}).properties;
        if (
          (name || "").toLowerCase() ===
          (Country_of_Operator_Owner[_countryOperator] || "").toLowerCase()
        ) {
          extractedCountries.push({
            ..._countryObj,
            countValue: Satellite_Counts[_countryOperator],
          });
        }
      });
      // return
      // return (((_country || {}).properties || {}).name || "").toLowerCase();
    });
    return extractedCountries;
  } catch (error) {
    console.log(error);
  }
}

 function getChoropleth() {
  try {
    fetch("https://unpkg.com/world-atlas/countries-50m.json")
      .then((r) => r.json())
      .then(async(data) => {
        let countries = ChartGeo.topojson.feature(data, data.objects.countries)
          .features;
        // console.log(countries);
        
        countries = await extractCountryData(countries);
        const chart = new Chart(
          document.getElementById("canvas").getContext("2d"),
          {
            type: "choropleth",
            data: {
              labels: countries.map((d) => d.properties.name),
              datasets: [
                {
                  label: "Countries",
                  data: countries.map((d) => ({
                    feature: d,
                    value: d.countValue,
                  })),
                },
              ],
            },
            options: {
              showOutline: true,
              showGraticule: true,
              legend: {
                display: false,
              },
              scale: {
                projection: "equalEarth",
              },
              geo: {
                colorScale: {
                  display: true,
                },
              },
            },
          }
        );
      });
  } catch (error) {
    console.log(error);
  }
}

function sortDataByValue(data, top) {
  try {
    const { Country_of_Operator_Owner, Satellite_Counts } = data;
    let myArrObj = Object.keys(Country_of_Operator_Owner).map((key)=>{
      return {
        name: Country_of_Operator_Owner[key],
        value: Satellite_Counts[key]
      }
    })
    // console.log(myArrObj);
    myArrObj = myArrObj.sort((a, b)=>{
      return b.value - a.value;
    });
    return myArrObj.slice(0, top);
  } catch (error) {
    console.log(error);
  }
}

function init() {
  try {
    getLineGraph();
    getChoropleth();
  } catch (error) {
    console.log(error);
  }
}

init();
