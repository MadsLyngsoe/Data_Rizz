const vega require('vega');
const vegaLite require('vega-lite');
const vegaEmbed require('vega-embed');
const d3 require('d3');

d3.csv('data\premier-league.csv').then((csvData) => {
  const data = csvData;
});

const spec = {
  data: { values: data }, // or csvData
  mark: 'point',
  encoding: {
    x: { field: 'year', type: 'quantitative' },
    y: { field: 'fee', type: 'quantitative' },
    color: { field: 'color', type: 'nominal' },
    size: { field: 'size', type: 'quantitative' },
  },

};

vegaEmbed('#scatterplot', spec {actions:true}).catch(console.warn);
