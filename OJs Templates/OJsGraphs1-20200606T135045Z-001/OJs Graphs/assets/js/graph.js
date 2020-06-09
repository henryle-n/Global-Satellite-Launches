const countryNamesData = {
  Country_of_Operator_Owner: {
    "0": "Algeria",
    "1": "Argentina",
    "2": "Australia",
    "3": "Austria",
    "4": "Azerbaijan",
    "5": "Bangladesh",
    "6": "Belarus",
    "7": "Belgium",
    "8": "Bhutan",
    "9": "Bolivia",
    "10": "Brazil",
    "11": "Bulgaria",
    "12": "Canada",
    "13": "Chile",
    "14": "China",
    "15": "China/Brazil",
    "16": "China/France",
    "17": "China/Germany",
    "18": "China/Italy",
    "19": "Colombia",
    "20": "Czech Republic",
    "21": "Denmark",
    "22": "ESA",
    "23": "ESA/USA",
    "24": "ESA/USA/Russia",
    "25": "Ecuador",
    "26": "Egypt",
    "27": "Ethiopia",
    "28": "Finland",
    "29": "France",
    "30": "France/Belgium/Sweden",
    "31": "France/Israel",
    "32": "France/Italy",
    "33": "France/Italy/Belgium/Spain/Greece",
    "34": "France/USA",
    "35": "Germany",
    "36": "Greece",
    "37": "Greece/United Kingdom",
    "38": "Hungary",
    "39": "India",
    "40": "India/Canada",
    "41": "India/France",
    "42": "Indonesia",
    "43": "Iran",
    "44": "Iraq",
    "45": "Israel",
    "46": "Italy",
    "47": "Japan",
    "48": "Japan/Singapore",
    "49": "Jordan",
    "50": "Kazakhstan",
    "51": "Laos",
    "52": "Latvia",
    "53": "Lithuania",
    "54": "Luxembourg",
    "55": "Malaysia",
    "56": "Mexico",
    "57": "Morocco",
    "58": "Morocco/Germany",
    "59": "Multinational",
    "60": "Nepal",
    "61": "Netherlands",
    "62": "Nigeria",
    "63": "Norway",
    "64": "Pakistan",
    "65": "Peru",
    "66": "Philippines",
    "67": "Poland",
    "68": "Qatar",
    "69": "Russia",
    "70": "Russia/USA",
    "71": "Saudi Arabia",
    "72": "Singapore",
    "73": "Singapore/Taiwan",
    "74": "South Africa",
    "75": "South Korea",
    "76": "Spain",
    "77": "Sri Lanka",
    "78": "Sudan",
    "79": "Sweden",
    "80": "Switzerland",
    "81": "Taiwan",
    "82": "Taiwan/USA",
    "83": "Thailand",
    "84": "Turkey",
    "85": "Turkmenistan/Monaco",
    "86": "USA",
    "87": "USA/Argentina",
    "88": "USA/Canada",
    "89": "USA/Canada/Japan",
    "90": "USA/France",
    "91": "USA/Germany",
    "92": "USA/Japan",
    "93": "USA/Japan/Brazil",
    "94": "USA/Mexico",
    "95": "USA/Sweden",
    "96": "USA/United Kingdom/Italy",
    "97": "Ukraine",
    "98": "United Arab Emirates",
    "99": "United Kingdom",
    "100": "United Kingdom/ESA",
    "101": "Venezuela",
    "102": "Vietnam",
  },
  Satellite_Counts: {
    "0": 5,
    "1": 16,
    "2": 12,
    "3": 1,
    "4": 2,
    "5": 1,
    "6": 2,
    "7": 1,
    "8": 1,
    "9": 1,
    "10": 11,
    "11": 1,
    "12": 39,
    "13": 1,
    "14": 356,
    "15": 2,
    "16": 2,
    "17": 2,
    "18": 1,
    "19": 1,
    "20": 3,
    "21": 5,
    "22": 53,
    "23": 1,
    "24": 1,
    "25": 1,
    "26": 3,
    "27": 1,
    "28": 7,
    "29": 12,
    "30": 2,
    "31": 1,
    "32": 3,
    "33": 2,
    "34": 1,
    "35": 37,
    "36": 2,
    "37": 1,
    "38": 2,
    "39": 58,
    "40": 1,
    "41": 2,
    "42": 9,
    "43": 1,
    "44": 1,
    "45": 15,
    "46": 12,
    "47": 78,
    "48": 2,
    "49": 1,
    "50": 7,
    "51": 1,
    "52": 1,
    "53": 2,
    "54": 32,
    "55": 5,
    "56": 4,
    "57": 2,
    "58": 1,
    "59": 64,
    "60": 1,
    "61": 12,
    "62": 3,
    "63": 7,
    "64": 3,
    "65": 1,
    "66": 2,
    "67": 2,
    "68": 1,
    "69": 167,
    "70": 2,
    "71": 13,
    "72": 8,
    "73": 1,
    "74": 5,
    "75": 16,
    "76": 21,
    "77": 1,
    "78": 1,
    "79": 2,
    "80": 4,
    "81": 1,
    "82": 11,
    "83": 5,
    "84": 7,
    "85": 1,
    "86": 1308,
    "87": 4,
    "88": 2,
    "89": 1,
    "90": 1,
    "91": 2,
    "92": 5,
    "93": 1,
    "94": 1,
    "95": 1,
    "96": 1,
    "97": 1,
    "98": 8,
    "99": 130,
    "100": 1,
    "101": 2,
    "102": 4,
  },
};

function getLineGraph() {
  try {
    const graphData = generateDataFromJSON();
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
            label: `Country Names Count`,
            data: graphData.yLabels,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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
  } catch (error) {
    console.log(error);
  }
}

function generateDataFromJSON() {
  try {
    let xLabels = [];
    let yLabels = [];
    const {Country_of_Operator_Owner, Satellite_Counts} = countryNamesData;
    xLabels = Object.keys(Country_of_Operator_Owner).map((xlabel)=>{
      return Country_of_Operator_Owner[xlabel];
    })
    yLabels = Object.keys(Satellite_Counts).map((yLabels)=>{
      return Satellite_Counts[yLabels];
    })
    return {xLabels, yLabels};
  } catch (error) {
    console.log(error);
  }
}

function init() {
  try {
    getLineGraph();
  } catch (error) {
    console.log(error);
  }
}

init();