const vega require('vega');
const vegaLite require('vega-lite');
const vegaEmbed require('vega-embed');
const d3 require('d3');

/*d3.csv('data\premier-league.csv').then((csvData) => {
  const data = csvData;
});*/

vegaEmbed('#scatterplot', 'test.json');
