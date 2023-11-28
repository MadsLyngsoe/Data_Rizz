
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
    vegaEmbed(divId, spec, {"actions": true}
    ).then(result => {
        result.view.addEventListener('click', function(event, item) {
          createBubbleChart("#col2-2", "test3.json", undefined, item.datum.club_name);
        });
    }).catch(console.warn);
  });
}

function createBubbleChart(divId, chartSpec, year, clubName) {
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
    spec.signals[2].value = clubName;
    console.log(spec.data[0].url);
    //vegaEmbed(divId, spec, {"actions": true});
    vegaEmbed(divId, spec, {"actions": true});
  });
}
