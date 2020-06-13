

function getLineGraph() {
  try {
    // $.getJSON("./../static/assets/data/country_names_counts.json", function (data) {
    $.getJSON("./../static/assets/data/country_names_counts.json", function (data) {
    const graphData = generateDataFromJSON(data);
    console.log("this is graph Data", graphData.xLabels)
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
          datasets: [{
            label: `Top ${graphData.top} Country Names Count`,
            data: graphData.yLabels,
            backgroundColor: "rgba(102, 221, 34, 0.6)",
            borderColor: "#447E23",
            borderWidth: 1,
          }, ],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }, ],
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
    sortedData.map((data) => {
      var countryName;
      switch (data.name) {
        case "United States of America":
          countryName = "USA";
          break;
        case "United Kingdom":
          countryName = "UK";
          break;
        case "European Space Agency":
          countryName = "ESA";
          break;
        case "Multinational":
          countryName = "MultiNations";
          break;
        default:
          countryName = data.name
      }
      xLabels.push(countryName);
      yLabels.push(data.value);
      return data;
    })
    // xLabels = Object.keys(Country_of_Operator_Owner).map((xlabel) => {
    //   return Country_of_Operator_Owner[xlabel];
    // });
    // yLabels = Object.keys(Satellite_Counts).map((yLabels) => {
    //   return Satellite_Counts[yLabels];
    // });
    return {
      xLabels,
      yLabels,
      top
    };
  } catch (error) {
    console.log(error);
  }
}

async function extractCountryData(countries) {
  try {
    let countryNamesData;
    await $.getJSON("./../static/assets/data/country_names_counts.json", data => {
      countryNamesData = data;
      console.log("98 this is countryNamesData", countryNamesData);
    });
    const extractedCountries = [];
    const {Country_of_Operator_Owner, Satellite_Counts} = countryNamesData;
    console.log("102 this is countnry NamesData :: ", countryNamesData);

    Object.keys(Country_of_Operator_Owner).forEach((_countryOperator, index) => {

      countries.forEach((_countryObj) => {
        
        const {name} = (_countryObj || {}).properties;

        if ((name || "").toLowerCase() === (Country_of_Operator_Owner[_countryOperator] || "").toLowerCase()) {
          extractedCountries.push({..._countryObj, countValue: Satellite_Counts[_countryOperator],});
        }
      });
    });
    console.log("123 this is extracted countries :: ", extractedCountries);
    return extractedCountries;
  } catch (error) {
    console.log(error);
  }
}

function getChoropleth() {
  try {
    fetch("https://unpkg.com/world-atlas/countries-50m.json")
      .then((r) => r.json())
      .then(async (data) => {
        let countries = ChartGeo.topojson.feature(data, data.objects.countries)
          .features;
        console.log("137 this is countries :: ", countries);

        countries = await extractCountryData(countries);
        const chart = new Chart(
          document.getElementById("canvas").getContext("2d"), {
            type: "choropleth",
            data: {
              labels: countries.map((d) => d.properties.name),
              datasets: [
                {
                label: "Countries",
                showOutline : true,
                data: countries.map((d) => ({
                  feature: d,
                  value: d.countValue,
                })),
              }, ],
            },
            options: {
              showOutline: true,
              showGraticule: true,
              backgroundColor: 'red',
              legend: {
                display: false,
                 
              },
              scale: {
                projection: "equalEarth",
              },
              geo: {
                colorScale: {
                  display: true,
                  position: '',
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
    const {
      Country_of_Operator_Owner,
      Satellite_Counts
    } = data;
    let myArrObj = Object.keys(Country_of_Operator_Owner).map((key) => {
      return {
        name: Country_of_Operator_Owner[key],
        value: Satellite_Counts[key]
      }
    })
    // console.log(myArrObj);
    myArrObj = myArrObj.sort((a, b) => {
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