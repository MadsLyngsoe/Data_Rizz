var spec;

function createTreemap(year) {
    showTreemap = document.getElementById("flexCheckDefault").checked
    if(showTreemap === false) {
        //document.getElementById("row1").innerHTML = "";
        return;
    }
    if(year === undefined) return;
        var splittedYears = year?.split(",");
        var yearMin = parseInt(splittedYears[0]);
        var yearMax = parseInt(splittedYears[1]);
    //vegaEmbed(divId, spec, {"actions": true});
    fetch("treemap.json")
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    if(yearMax !== undefined && yearMin !== undefined) {
      spec.signals[0].value = yearMin;
      spec.signals[1].value = yearMax;
    }
    vegaEmbed("#col2-1", spec, {"actions": true});
  });
  /*
  FOR SLIDER FOR TREEMAP
  <div class="mx-auto" style="width: 20%;">
    <label for="customRange2" class="form-label">Select year</label>
    <input type="range" 
        class="form-range" 
        min="1992" max="2023" 
        value="1992"
        id="customRange2" 
        onchange="createChart('#col2-1', 'treemap.json', this.value); this.nextElementSibling.value = 'Year: ' + this.value"
    >
    <output>Year: 1992</output>
    </div>
    */

}