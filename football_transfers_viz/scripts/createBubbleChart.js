var spec;
var yearMin;
var yearMax;

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
    console.log(spec.signals);
    //vegaEmbed(divId, spec, {"actions": true});
    vegaEmbed(divId, spec, {"actions": true});
  });
}
