var width = 800,
    height = 560,
    r = height/7;
    enlarged_r = 2*r;

d3.json("/json/link.json", function(json){

var nodes = json.nodes;

nodes[0].fixed = true;
nodes[0].x = width / 2;
nodes[0].y = height / 2;

var force = d3.layout.force()
    .nodes(nodes)
    .links(json.links)
    .size([width, height])
    .linkDistance(300)
    .charge(-500)
    .on("tick", tick)
    .start();

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var svg_n = svg.append("g")

var node = svg_n.selectAll("node")
    .data(nodes)
  .enter().append("g")
  .style("opacity", 0)
  .on("click", nodeFocused);
//    .on("mouseover", mouseover)
//    .on("mouseout", mouseout)

var pattern = node
  .append("defs")
  .append("pattern")
    .attr("x", 2*r)
    .attr("y", r)
    .attr("id", function(d,i) { return "image-"+i; })
    .attr("width", 4*r)
    .attr("height", 2*r)
    .attr("patternUnits", "userSpaceOnUse");

var image = pattern
  .append("image")
    .attr("xlink:href", function(d) { return d.img; })
    .attr("width", 4*r)
    .attr("height", 2*r);

var circle = node.append("circle")
    .attr("r", r)
    .attr("fill", function(d,i) { return "url(#image-"+i+")"; });

var text = node.append("text")
    .attr("y", r*0.6)
    .text(function(d) { return d.name; });

var path = svg.append("g").selectAll("path")
    .data(json.links)
  .enter().append("path")
    .attr("class", "link")
    .style("opacity", 0);

function tick() {

  node.attr("transform", function(d) { return "translate(" + boundedx(d) + "," + boundedy(d) + ")"; });
  path.attr("d", linkArc);

}

function wait(){
    if( force.alpha() > 0.08 )
        setTimeout(wait,200);
    else{
        node.transition().duration(750).style("opacity", 1);
        path.transition().duration(750).style("opacity", 1);
    }
}

wait();

function linkArc(d) {

  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + boundedx(d.source) + "," + boundedy(d.source) + "A" + dr + "," + dr + " 0 0,1 " + boundedx(d.target) + "," + boundedy(d.target);
  
}

function boundedx(d) {
return Math.max(r, Math.min(width - r, d.x));
}

function boundedy(d) {
return Math.max(r, Math.min(height - r, d.y));
}

function nodeFocused(d , i){

    var tempName = nodes[0].name;

    node.transition().duration(1000)
	.style("opacity", 0.3);

    nodes[0].name = nodes[i].name;
    nodes[0].img = "/images/" + nodes[0].name + ".jpg";

    nodes[1].name = tempName;
    nodes[1].img = "/images/" + nodes[1].name + ".jpg";

    nodes[2].name = "Tibet";
    nodes[2].img = "/images/" + nodes[2].name + ".jpg";

    nodes[3].name = "Xian";
    nodes[3].img = "/images/" + nodes[3].name + ".jpg";

    nodes[4].name = "Casablanca";
    nodes[4].img = "/images/" + nodes[4].name + ".jpg";

    nodes[5].name = "Kathmandu";
    nodes[5].img = "/images/" + nodes[5].name + ".jpg";

    force.alpha(0.1);
    
    image.attr("xlink:href", function(d) { return d.img; });

    text.text(function(d) { return d.name; });

    node.transition().duration(1000)
	.style("opacity", 1);

};

});

/*
function mouseover(d) {

var current = d3.select(this);

  current.transition()
      .duration(300)
      .attr("transform",function(d) { return "translate(" + boundedx(d) + "," + boundedy(d) + ") scale(2)"; });
      
  current.append("text")
      .text(function(d) { return d.img; })
      .attr("x", -r*0.1)
      .attr("y", r*0.8)
      .attr("class","smalltext");
      
  current.moveToFront();
  
}

function mouseout() {
  
  var current = d3.select(this);
  
  current.transition()
      .duration(300)
      .attr("transform",function(d) { return "translate(" + boundedx(d) + "," + boundedy(d) + ")"; });

  current.selectAll("text.smalltext").remove();
      
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
  this.parentNode.appendChild(this);
  });
};
*/
