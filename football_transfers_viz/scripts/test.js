var spec;
fetch("test.json")
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    console.log(spec);
    vegaEmbed("#col1-1", spec, {"actions": true});
  });
