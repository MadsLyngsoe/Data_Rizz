const vega = require('vega');
const vegaLite = require('vega-lite');
const vegaEmbed = require('vega-embed');
const d3 = require('d3');

// Define your Vega-Lite specification
const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json", // Use vega-lite schema
  "description": "A basic scatter plot example depicting transfer statistics.",
  "width": 200,
  "height": 200,
  "padding": 5,
  "data": {
    "url": "https://github.com/MadsLyngsoe/Data_Rizz/blob/main/data/premier-league.csv" // Use forward slash (/) instead of backslash (\)
  },
  "mark": "point", // Define the mark as a point
  
  // Define your encoding
  "encoding": {
    "x": {
      "field": "year", // Replace with your actual column name
      "type": "quantitative", // Type of data on the x-axis
      "scale": {"zero": true} // Include scale properties
    },
    "y": {
      "field": "fee", // Replace with your actual column name
      "type": "quantitative", // Type of data on the y-axis
      "scale": {"zero": true} // Include scale properties
    }
  },
  "config": {
    "view": {"stroke": "transparent"} // Make grid lines transparent
  }
};

vegaEmbed('#scatterplot', spec, { actions: true }).catch(console.warn);
