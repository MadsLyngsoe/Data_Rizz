const vega require('vega');
const vegaLite require('vega-lite');
const vegaEmbed require('vega-embed');
const d3 require('d3');

/*d3.csv('data\premier-league.csv').then((csvData) => {
  const data = csvData;
});*/

const spec = {
  {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A basic scatter plot example depicting transfer statistics.",
    "width": 200,
    "height": 200,
    "padding": 5,
  
    "data": [
      {
        "name": "source",
        "url": "data\premier-league.csv",
      }
    ],
  
    "scales": [
      {
        "name": "x",
        "type": "linear",
        "round": true,
        "nice": true,
        "zero": true,
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
      /*{
        "name": "size",
        "type": "linear",
        "round": true,
        "nice": false,
        "zero": true,
        "domain": {"data": "source", "field": "Acceleration"},
        "range": [4,361]
      }*/
    ],
  
    "axes": [
      {
        "scale": "x",
        "grid": true,
        "domain": false,
        "orient": "bottom",
        "tickCount": 5,
        "title": "Year"
      },
      {
        "scale": "y",
        "grid": true,
        "domain": false,
        "orient": "left",
        "titlePadding": 5,
        "title": "fee"
      }
    ],
  
    /*"legends": [
      {
        "size": "size",
        "title": "Acceleration",
        "format": "s",
        "symbolStrokeColor": "#4682b4",
        "symbolStrokeWidth": 2,
        "symbolOpacity": 0.5,
        "symbolType": "circle"
      }
    ],*/
  
    "marks": [
      {
        "name": "marks",
        "type": "symbol",
        "from": {"data": "source"},
        "encode": {
          "update": {
            "x": {"scale": "x", "field": "year"},
            "y": {"scale": "y", "field": "fee"},
            "size": {"scale": "size", "field": "year"},
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
