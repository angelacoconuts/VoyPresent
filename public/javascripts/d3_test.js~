var width = 480;
var height = 480;
var root = d3.select('#chart').append('svg')
    .attr({
      'width': width,
      'height': height,
    });

// Render the title.
var titleHeight = 50;
root.append('text')
    .attr({
      'class': 'title',
      'x': width / 2,
      'y': titleHeight / 2,
    })
    .text('Skull-splitting power!');
    
// Render our axis.
var yAxisWidth = 40;
var xAxisHeight = 40;

var histoWidth = width - yAxisWidth;
var histoHeight = height - xAxisHeight - titleHeight;
var histoG = root.append('g')
    .attr({
      'class': 'histo',
      'transform': 'translate(' + yAxisWidth + ', ' + titleHeight + ')',
    });

var xScale = d3.scale.linear()
    .domain([0, 10])
    .range([yAxisWidth, histoWidth]);
var yScale = d3.scale.linear()
    .domain([0, 1.2])
    .range([histoHeight, xAxisHeight]);

var xAxis = d3.svg.axis().scale(xScale);
root.append('g')
    .attr({
      'class': 'x axis',
      'transform': 'translate(0,' + histoHeight + ')',
    })
    .call(xAxis);

var yAxis = d3.svg.axis().scale(yScale).orient('left');
root.append('g')
    .attr({
      'class': 'y axis',
      'transform': 'translate(' + yAxisWidth + ',0)',
    })
    .call(yAxis);

var renderData = function(){

    var numData = Math.floor(10 * Math.random());

    var rollValue = d3.range(numData).map(Math.random);

    var bars = root.selectAll('rect')
        .data(rollValue)

    var newBars = bars
      .enter()
      .append('rect')
    //.attr('opacity', 0)
        .attr({
	          'x': function(d, i) { return xScale(i); },
	          'width': xScale(1) - xScale(0),
	          'y': yScale(0),
	      //    'y': yScale,
	          'height': 0,
	        })
        .classed({
	          'bar_alert': function(d, i) { return d>0.5 ? true : false ; },
	          'bar_normal': function(d, i) { return d>0.5 ? false : true ; },
	        });
    
    newBars.transition().duration(100)
    .attr('height', function(d) { return yScale(0) - yScale(d); })
    .attr('y', yScale);
    //  .attr('opacity', 1);
    
    bars.exit().transition().duration(100)
    //    .attr('opacity', 0)      
    .attr('height', 0)
    .attr('y', yScale(0))
    .remove();
    
}

d3.select('#chart').append('button')
    .text('Shake fun!')
    .on('click', renderData);
