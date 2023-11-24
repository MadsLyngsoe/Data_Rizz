var spec;

function createChart(divId, chartSpec, year) {
  if(year === undefined) return;
  var splittedYears = year?.split(",");
  var yearMin = parseInt(splittedYears[0]);
  var yearMax = parseInt(splittedYears[1]);
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    if(yearMax !== undefined && yearMin !== undefined) {
      spec.signals[0].value = yearMin;
      spec.signals[1].value = yearMax;
    }
    vegaEmbed(divId, spec, {"actions": true});
  });
}
