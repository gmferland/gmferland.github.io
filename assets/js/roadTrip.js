var width = 960;
var height = 500;

var projection = d3.geo.albersUsa()
  .translate([width / 2, height / 2])
  .scale([1000]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
  if (error) throw error;

  svg.append("path")
      .attr("stroke-width", 0.5)
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  svg.append("path")
      .attr("d", path(topojson.feature(us, us.objects.nation)));
});
