var spec;

function createChart(divId, chartSpec, year) {
fetch(chartSpec)
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    if(year !== undefined) spec.signals[0].value = year;
    vegaEmbed(divId, spec, {"actions": true});
  });
}
