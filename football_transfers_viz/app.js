const vega = require('vega');
const vegaLite = require('vega-lite');
const vegaEmbed = require('vega-embed');
const d3 = require('d3');

/*d3.csv('data\premier-league.csv').then((csvData) => {
  const data = csvData;
});*/

const spec = {
  {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A basic scatter plot example depicting automobile statistics.",
    "width": 400,
    "height": 400,
    "padding": 5,
  
    "data": [
      {
        "name": "source",
        "url": "https://raw.githubusercontent.com/MadsLyngsoe/Data_Rizz/main/data/premier-league.csv",
        "format": {"type": "csv"}
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "band",
        "round": true,
        "domain": {"data": "source", "field": "year"},
        "range": "width"
      },
      {
        "name": "y",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": true,
        "domain": {"data": "source", "field": "fee"},
        "range": "height"
      },
      {
        "name": "size",
        "type": "linear",
        "round": true,
        "nice": false,
        "zero": true,
        "domain": {"data": "source", "field": "fee"},
        "range": [4,361]
      }
    ],
  
    "axes": [
      {
        "scale": "x",
        "grid": true,
        "domain": false,
        "orient": "bottom",
        "tickCount": 10,
        "labelOverlap": "parity",
        "title": "Tranfer Year"
      },
      {
        "scale": "y",
        "grid": true,
        "domain": false,
        "orient": "left",
        "titlePadding": 5,
        "title": "Transfer Fee"
      }
    ],
    "marks": [
      {
        "name": "marks",
        "type": "symbol",
        "from": {"data": "source"},
        "encode": {
          "update": {
            "x": {"scale": "x", "field": "year"},
            "y": {"scale": "y", "field": "fee"},
            "size": {"scale": "size", "field": "fee"},
            "shape": {"value": "circle"},
            "strokeWidth": {"value": 2},
            "opacity": {"value": 0.5},
            "stroke": {"value": "#4682b4"},
            "fill": {"value": "transparent"}
          }
        }
      }
    ]
  }
  

};

vegaEmbed('#scatterplot', spec {actions:true}).catch(console.warn);
