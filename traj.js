// Total dimensions
var w = 300,
    h = 500;

// Create the SVG element
var svgtraj = d3.select(".traj")
    .attr("width", w)
    .attr("height", h);

// Margins
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width_traj = +svgtraj.attr("width") - margin.left - margin.right,
    height_traj = +svgtraj.attr("height") - margin.top - margin.bottom,
    gtraj = svgtraj.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// From now on, add stuff to g and use width_traj and height_traj

d3.csv("traj.csv",
    function(d) {
        return {
            time: +d.time,
            coord_x: +d.coord_x,
            coord_y: +d.coord_y,
            coord_z: +d.coord_z
        };
    },
    function(data) {
        traj = data;
        trajViz();
    });

var trajViz = function() {

    var xmin = d3.min(traj, function(d) { return d.coord_x; });
    var xmax = d3.max(traj, function(d) { return d.coord_x; });
    var ymin = d3.min(traj, function(d) { return d.coord_y; });
    var ymax = d3.max(traj, function(d) { return d.coord_y; });

    var ratio = Math.min(width_traj/(xmax-xmin), height_traj/(ymax-ymin));

    var xScale = d3.scaleLinear()
	.rangeRound([0, ratio*(xmax-xmin)])
	.domain([xmin, xmax])
	.nice();

    var xAxis = d3.axisBottom(xScale)
	.ticks(5);

    var yScale = d3.scaleLinear()
	.rangeRound([ratio*(ymax-ymin), 0])
	.domain([ymin, ymax])
	.nice();

    var yAxis = d3.axisLeft(yScale);

    var line = d3.line()
	.x(function(d) { return xScale(d.coord_x); })
	.y(function(d) { return yScale(d.coord_y); });

    var path = gtraj.append("path")
	.datum(traj)
	.attr("fill", "none")
	.attr("stroke", "steelblue")
	.attr("stroke-linejoin", "round")
	.attr("stroke-linecap", "round")
	.attr("stroke-width_traj", 1.5)
	.attr("d", line)
	.on("mouseover", function(d) {
	    d3.select(this)
		.transition()
		.attr("stroke", "blue");
	})
	.on("mouseout", function(d) {
	    d3.select(this)
		.transition()
		.attr("stroke", "steelblue");
	});

    var totalLength = path.node().getTotalLength();

    path
	.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
	.transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

    svgtraj.on("click", function(){
	path
	    .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    })
    
    gtraj.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height_traj + ")")
	.call(xAxis);

    gtraj.append("g")
	.attr("class", "y axis")
	.call(yAxis);


};
