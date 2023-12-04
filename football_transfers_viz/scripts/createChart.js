
var spec;
var treeMapSelected;
var lineChartView;
var treemapChartView;
var bubbleChartView;
function createChart(divId, chartSpec) {
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    //vegaEmbed(divId, spec, {"actions": true});
    vegaEmbed(divId, spec, {"actions": true}).then(result => {
      lineChartView = result.view;
    });
  });
  createTreemap("#col2-1", "treemap.json");
  if(document.getElementById("col2-2") == undefined) return;
  document.getElementById("col2-2").innerHTML = "";
}

function createTreemap(divId, chartSpec) {
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    vegaEmbed(divId, spec, {"actions": true}
    ).then(result => {
        result.view.addEventListener('click', function(event, item) {
          if(item == null) return;
          if(treeMapSelected == item) {
            treeMapSelected = null;
            document.getElementById("col2-2").innerHTML = "";
          } else {
            createBubbleChart("#col2-2", "bubbleChart.json", document.getElementById("slider").value, item.datum.club_name, item.datum.league_name);
            treeMapSelected = item;
          }
        });
        treemapChartView = result.view;
    }).catch(console.warn);
  });
}



function createBubbleChart(divId, chartSpec, year, clubName, leagueName) {
  var splittedYears = year?.split(",");
  if(splittedYears !== undefined) {
    var yearMin = parseInt(splittedYears[0]);
    var yearMax = parseInt(splittedYears[1]);
  }
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    if(yearMax !== undefined && yearMin !== undefined) {
      spec.signals[3].value = yearMin;
      spec.signals[4].value = yearMax;
    }
    switch(leagueName) {
      case "1 Bundesliga":
        spec.data[0].url = "/data/1-bundesliga.csv"
        break;

      case "Premier League":
        spec.data[0].url = "/data/premier-league.csv"
        break;

      case "Liga Nos":
        spec.data[0].url = "/data/liga-nos.csv"
        break;
      
      case "Ligue 1":
        spec.data[0].url = "/data/ligue-1.csv"
        break;

      case "Primera Division":
        spec.data[0].url = "/data/primera-division.csv"
        break;

      case "Serie A":
        spec.data[0].url = "/data/serie-a.csv"
        break;

      default:
        spec.data[0].url = "/data/serie-a.csv";
    }
    spec.signals[2].value = clubName;
    vegaEmbed(divId, spec, {"actions": true}).then(result => {
      bubbleChartView = result.view;
    }
    );
  });
}

function getLineChartView() {
  return lineChartView;
}

function getTreemapChartView() {
  return treemapChartView;
}

function getBubbleChartView() {
  return bubbleChartView;
}
