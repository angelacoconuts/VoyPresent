d3.select(window).on("resize", throttle);

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 9])
    .on("zoom", move);

var width = document.getElementById('world-map').offsetWidth;
var height = width / 2;

var projection,path,svg,g,active,countries;

var tooltip = d3.select("#world-map").append("div").attr("class", "countryname-ticker hidden");

setup(width,height);

function setup(width,height){
  projection = d3.geo.mercator()
    .translate([(width/2), (height/2)])
    .scale( width / 2 / Math.PI);

  path = d3.geo.path().projection(projection);

  svg = d3.select("#world-map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoom)
      .append("g");

  g = svg.append("g");

}

d3.json("data/world-topo-min.json", function(error, world) {

  countries = topojson.feature(world, world.objects.countries).features;

  draw(countries);

});

function draw(countries) {

  var country = g.selectAll(".country").data(countries);

  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("id", function(d,i) { return d.id; })
      .attr("title", function(d,i) { return d.properties.name; })
      .on("click", click)
      .style("fill", function(d, i) { return d.properties.color; });

  //offsets for tooltips
  var offsetL = document.getElementById('world-map').offsetLeft+20;
  var offsetT = document.getElementById('world-map').offsetTop+10;

  //tooltips
  country
    .on("mousemove", function(d,i) {

      var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

      tooltip.classed("hidden", false)
             .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
             .html(d.properties.name);

      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true);
      }); 

}

function move() {

  var t = d3.event.translate;
  var s = d3.event.scale; 
  zscale = s;
  var h = height/4;


  t[0] = Math.min(
    (width/height)  * (s - 1), 
    Math.max( width * (1 - s), t[0] )
  );

  t[1] = Math.min(
    h * (s - 1) + h * s, 
    Math.max(height  * (1 - s) - h * s, t[1])
  );

  zoom.translate(t);
  g.attr("transform", "translate(" + t + ")scale(" + s + ")");

  //adjust the country hover stroke width based on zoom level
  d3.selectAll(".country").style("stroke-width", 1 / s);

}

function redraw() {
  width = document.getElementById('world-map').offsetWidth;
  height = width / 2;
  d3.select('svg').remove();
  setup(width,height);
  draw(countries);
}

var throttleTimer;
function throttle() {
  window.clearTimeout(throttleTimer);
    throttleTimer = window.setTimeout(function() {
      redraw();
    }, 200);
}

function click(d) {

 // if (active === d) return reset();
  if (active === d)
    window.location.href="/poi/"+d.properties.name;
  g.selectAll(".active").classed("active", false);
  d3.select(this).classed("active", active = d);

  var b = path.bounds(d);

  var scale = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);

  //adjust the country hover stroke width based on zoom level
  d3.selectAll(".country").style("stroke-width", 1 / scale);

  g.transition().duration(750).attr("transform",
      "translate(" + projection.translate() + ")"
      + "scale(" + scale + ")"
      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");

}

function reset() {

  g.selectAll(".active").classed("active", active = false);
  g.transition().duration(750).attr("transform", "");
  d3.selectAll(".country").style("stroke-width", 1);

}
