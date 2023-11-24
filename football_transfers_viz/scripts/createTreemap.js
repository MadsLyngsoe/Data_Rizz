var spec;

function createTreemap() {
    showTreemap = document.getElementById("flexCheckDefault").checked
    if(showTreemap === false) {
        document.getElementsByClassName("row1")[0].innerHTML = "";
        console.log(document.getElementsByClassName("row1")[0]);
        return;
    }
    console.log("hello");
    //vegaEmbed(divId, spec, {"actions": true});
    document.getElementsByClassName("row1")[0].innerHTML += `
    <div class="col" id="col2-1">
              <script type="text/javascript">createChart("#col2-1", "treemap.json");</script>
    </div>
    <label for="customRange2" class="form-label">Select year</label>
    <input type="range" 
        class="form-range" 
        min="1992" max="2023" 
        value="1992"
        id="customRange2" 
        onchange="createChart('#col2-1', 'treemap.json', this.value); this.nextElementSibling.value = 'Year: ' + this.value"
    >
    <output>Year: 1992</output>
    `
    fetch("treemap.json")
  .then((res) => res.json())
  .then((data) => {
    spec = data;
    vegaEmbed("#col2-1", spec, {"actions": true});
  });
}