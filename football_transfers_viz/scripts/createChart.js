
var spec;
var yearMin;
var yearMax;

function createChart(divId, chartSpec, year) {
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
      spec.signals[0].value = yearMin;
      spec.signals[1].value = yearMax;
    }
    //vegaEmbed(divId, spec, {"actions": true});
    vegaEmbed(divId, spec, {"actions": true});
  });
  createTreemap("#col2-1", "treemap.json");
}

function createTreemap(divId, chartSpec, year) {
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
      spec.signals[0].value = yearMin;
      spec.signals[1].value = yearMax;
    }
    vegaEmbed(divId, spec, {"actions": true}
    ).then(result => {
        result.view.addEventListener('click', function(event, item) {
          createBubbleChart("#col2-2", "test3.json", undefined, item.datum.club_name, item.datum.league_name);
        });
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
      spec.signals[0].value = yearMin;
      spec.signals[1].value = yearMax;
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
    vegaEmbed(divId, spec, {"actions": true});
  });
}
