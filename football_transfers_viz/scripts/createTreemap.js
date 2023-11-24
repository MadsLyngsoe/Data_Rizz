var spec;

function createTreemap() {
    showTreemap = document.getElementById("flexCheckDefault").checked
    if(showTreemap === false) {
        document.getElementById("row1").innerHTML = "";
        return;
    }
    //vegaEmbed(divId, spec, {"actions": true});
    document.getElementById("row1").innerHTML += `
    <div class="col" id="col2-1">
              <script type="text/javascript">createChart("#col2-1", "treemap.json");</script>
    </div>
    `
    fetch("treemap.json")
  .then((res) => res.json())
  .then((data) => {
    spec = data;
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