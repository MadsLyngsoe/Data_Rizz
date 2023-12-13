
var spec;
var treeMapSelected;
var lineChartView;
var treemapChartView;
var bubbleChartView;

var originalTreeData;

const bundesligaColor = "#a6cee3";
const ligaNosColor = "#33a02c";
const ligue1Color = "#fb9a99";
const premierLeagueColor = "#e31a1c";
const laLigaColor = "#ff7f00";
const serieAColor = "#cab2d6";

function createChart(divId, chartSpec) {
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    vegaEmbed(divId, spec, {"actions": true}).then(result => {
      result.view.addDataListener("selected", function(name, value) {
        createTreemap("#col2-1", "treemap.json");
        if(bubbleChartView != null) {
          bubbleChartView.finalize();
          treeMapSelected = null;
          document.getElementById("col2-2").innerHTML = "";
        } 
      })
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
    if(lineChartView != undefined) {
    if(lineChartView.data("selected").length != 0) {
      var selectedLeagues = [];
      var colorRange = [];
      for(element of lineChartView.data("selected")) {
        if(element.value == "1 Bundesliga") {
          selectedLeagues.push("1-bundesliga");
          colorRange.push(bundesligaColor);
        }
        if(element.value == "Liga Nos") {
          selectedLeagues.push("liga-nos");
          colorRange.push(ligaNosColor);
        }
        if(element.value == "Ligue 1") {
          selectedLeagues.push("ligue-1");
          colorRange.push(ligue1Color);
        }
        if(element.value == "Premier League") {
          selectedLeagues.push("premier-league");
          colorRange.push(premierLeagueColor);
        }
        if(element.value == "Primera Division") {
          selectedLeagues.push("primera-division");
          colorRange.push(laLigaColor);
        }
        if(element.value == "Serie A") {
          selectedLeagues.push("serie-a");
          colorRange.push(serieAColor);
        }
      }
      data.data[6].source = selectedLeagues;
      data.scales[0].range = colorRange;
    }
  }
    spec = data;
    vegaEmbed(divId, spec, {"actions": true}
    ).then(result => {
        result.view.addEventListener('click', function(event, item) {
          if(item == null) return;
          if(treeMapSelected == item) {
            treeMapSelected = null;
            document.getElementById("col2-2").innerHTML = "";
          } else {
            document.getElementById("col2-2").innerHTML = item.datum.league_name;
            createBubbleChart("#col2-2", "bubbleChart.json", document.getElementById("slider").value, item.datum.club_name, item.datum.league_name);
            treeMapSelected = item;
          }
        }
        );
        originalTreeData = result.view.data("treeData");
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
      if(document.getElementById('inlineCheckbox1').checked == false) {
        result.view.signal("transferInOut", "out");
        result.view.run();
      }
      bubbleChartView = result.view;
    }
    );
  });
}

function setTransferInOrOut(value) {
  if(lineChartView != null) lineChartView.signal("transferInOut", value);
  if(bubbleChartView != null) bubbleChartView.signal("transferInOut", value);
  if(treemapChartView != null) treemapChartView.signal("transferInOut", value);
  if(lineChartView != null) lineChartView.run();
  if(bubbleChartView != null) bubbleChartView.run();
  if(treemapChartView != null) treemapChartView.run();
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
