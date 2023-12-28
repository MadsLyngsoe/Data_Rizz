
var spec;
var treeMapSelected;
var lineChartView;
var treemapChartView;
var bubbleChartView;

var originalTreeData;

const bundesligaColor = "#E69F00";
const ligaNosColor = "#56B4E9";
const ligue1Color = "#009E73";
const premierLeagueColor = "#0072B2";
const laLigaColor = "#D55E00";
const serieAColor = "#CC79A7";

function createLineChart(divId, chartSpec) {
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    vegaEmbed(divId, spec, {"actions": true}).then(result => {
      if(chartSpec == "lineChart.json" || chartSpec == "barChart.json") {
      result.view.addDataListener("selected", function(name, value) {
        createTreemap("#col2-1", "treemap.json");
        if(bubbleChartView != null) {
          treeMapSelected = null;
          document.getElementById("col2-2").innerHTML = "";
        } 
      });
      if(!document.getElementById("checkbox1").checked){
      result.view.addSignalListener("yearMin", function(name, value) {
        createTreemap("#col2-1", "treemap.json");
        if(bubbleChartView != null) {
          treeMapSelected = null;
          document.getElementById("col2-2").innerHTML = "";
        } 
      });
      result.view.addSignalListener("yearMax", function(name, value) {
        createTreemap("#col2-1", "treemap.json");
        if(bubbleChartView != null) {
          treeMapSelected = null;
          document.getElementById("col2-2").innerHTML = "";
        } 
      });
    }
    }
    lineChartView = result.view;
    var sliderValues = document.getElementById("slider").value.split(",");
    lineChartView.signal("yearMin", sliderValues[0]);
    lineChartView.signal("yearMax", sliderValues[1]);
    lineChartView.run();
    });
  });
  createTreemap("#col2-1", "treemap.json");
  if(document.getElementById("col2-2") == undefined) return;
  document.getElementById("col2-2").innerHTML = "";
}

function createTreemap(divId, chartSpec) {
  var splittedYears = document.getElementById("slider").value.split(",")
  if(splittedYears !== undefined) {
    var yearMin = parseInt(splittedYears[0]);
    var yearMax = parseInt(splittedYears[1]);
  }
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    if(!document.getElementById("checkbox1").checked) {
      data.signals.push({
        "name": "year", "value": yearMin,
        "bind": {"input": "range", "min": yearMin, "max": yearMax, "step": 1}
      });
      for(var element in data.data) {
        if(element < 6) {
          data.data[element].transform[5].expr = "datum.year_numeric == year";
        }
      }
     data.title.text = { signal: "'Clubs total transfer fees in ' + year" }
    }
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
        var sliderValues = document.getElementById("slider").value.split(",");
        treemapChartView.signal("yearMin", sliderValues[0]);
        treemapChartView.signal("yearMax", sliderValues[1]);
        treemapChartView.run();
    });
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
    if(!document.getElementById("checkbox1").checked) {
      spec.signals.push({
        "name": "year", "value": treemapChartView.signal("year"),
      });
      spec.data[0].transform[5].expr = "datum.year_numeric == year";
      spec.title.text ={ signal: "clubName + ' top k transfered players by fee' + ' in year ' + year" }
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
      if(!document.getElementById("checkbox1").checked) {
        bubbleChartView.addSignalListener("year", function(name, value) {
          treemapChartView.signal("year", value);
          treemapChartView.run();
        })
        treemapChartView.addSignalListener("year", function(name,othervalue) {
          bubbleChartView.signal("year", othervalue);
          bubbleChartView.run();
        })
      }
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

function sliderUpdateCharts(value) {
  var sliderValues = value.split(",");
  if(document.getElementById("checkbox1").checked) {
  if(lineChartView != null) {
    lineChartView.signal("yearMin", parseInt(sliderValues[0]));
    lineChartView.signal("yearMax", parseInt(sliderValues[1]));
    lineChartView.run();
  }
  if(treemapChartView != null) {
    treemapChartView.signal("yearMin", parseInt(sliderValues[0]));
    treemapChartView.signal("yearMax", parseInt(sliderValues[1]));
    treemapChartView.run();
  }
  if(bubbleChartView != null) {
    bubbleChartView.signal("yearMin", parseInt(sliderValues[0]));
    bubbleChartView.signal("yearMax", parseInt(sliderValues[1]));
    bubbleChartView.run();
  }
} else {
  if(lineChartView != null) {
    lineChartView.signal("yearMin", parseInt(sliderValues[0]));
    lineChartView.signal("yearMax", parseInt(sliderValues[1]));
    lineChartView.run();
  }
  if(treemapChartView != null) {
    treemapChartView.signal("year", parseInt(sliderValues[0]));
    treemapChartView.signal("yearMax", parseInt(sliderValues[1]));
    treemapChartView.run();
  }
  if(bubbleChartView != null) {
    bubbleChartView.signal("yearMin", parseInt(sliderValues[0]));
    bubbleChartView.signal("yearMax", parseInt(sliderValues[1]));
    bubbleChartView.run();
  }
}
}
