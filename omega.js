// Total dimensions
var w = 900,
    h = 500;

// Select the SVG element
var svg = d3.select(".omega")
    .attr("width", w)
    .attr("height", h);

// Margins
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// From now on, add stuff to g and use width and height


// Dataset import
var dataset = [
    [0, 15], [5, 20], [10, 90], [15, 50], [20, 33], [25, 95],
    [30, 12], [35, 44], [40, 67], [45, 21], [50, 88]
];

d3.csv("omega.csv",
    function(d) {
        return {
            time: +d.time,
            omega_x: +d.omega_x,
            omega_y: +d.omega_y,
            omega_z: +d.omega_z
        };
    },
    function(data) {
        dataset = data;
        generateVizOmega();
    });

var generateVizOmega = function() {
    // x scale and axis (common to every plot)
    // var xScale = d3.scaleLinear()
    // 	.rangeRound([0, width])
    // 	.domain([Math.min(0, d3.min(dataset, function (d) { return d.time; })),
    // 		 d3.max(dataset, function (d) { return d.time; })]);
    var xScale = d3.scaleLinear()
	.rangeRound([0, width])
	.domain([d3.min(dataset, function(d) { return d.time; }),
		 d3.max(dataset, function(d) { return d.time; })]);

    var xAxis = d3.axisBottom(xScale);

    var padding = 25;

    // ==================== x ====================
    var g_x = g.append("g")
	.attr("class", "x");
    
    var yScale_x = d3.scaleLinear()
	.rangeRound([height/3 - padding, 0])
	.domain([Math.min(0, d3.min(dataset, function (d) { return d.omega_x; })),
		 d3.max(dataset, function (d) { return d.omega_x; })])
	.nice();

    // Plot
    var line = d3.line()
	.x(function(d) { return xScale(d.time); })
	.y(function(d) { return yScale_x(d.omega_x); });

    var path_x = g_x.append("path")
	.datum(dataset)
	.attr("fill", "none")
	.attr("stroke", "steelblue")
	.attr("stroke-linejoin", "round")
	.attr("stroke-linecap", "round")
	.attr("stroke-width", 1.5)
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

    // Axes
    var yAxis_x = d3.axisLeft(yScale_x).ticks(5);
    
    g_x.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (height/3 - padding) + ")")
	.call(xAxis);

    g_x.append("g")
	.attr("class", "y axis")
	.call(yAxis_x);

    // ==================== y ====================
    var g_y = g.append("g")
	.attr("class", "y")
	.attr("transform", "translate(0," + (height/3) + ")");
    
    var yScale_y = d3.scaleLinear()
	.rangeRound([height/3 - padding, 0])
	.domain([Math.min(0, d3.min(dataset, function (d) { return d.omega_y; })),
		 d3.max(dataset, function (d) { return d.omega_y; })])
	.nice();

    // Plot
    var line = d3.line()
	.x(function(d) { return xScale(d.time); })
	.y(function(d) { return yScale_y(d.omega_y); });

    var path_y = g_y.append("path")
	.datum(dataset)
	.attr("fill", "none")
	.attr("stroke", "forestgreen")
	.attr("stroke-linejoin", "round")
	.attr("stroke-linecap", "round")
	.attr("stroke-width", 1.5)
	.attr("d", line)
	.on("mouseover", function(d) {
	    d3.select(this)
		.transition()
		.attr("stroke", "green");
	})
	.on("mouseout", function(d) {
	    d3.select(this)
		.transition()
		.attr("stroke", "forestgreen");
	});

    // Axes
    var yAxis_y = d3.axisLeft(yScale_y).ticks(5);
    
    g_y.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (height/3 - padding) + ")")
	.call(xAxis);

    g_y.append("g")
	.attr("class", "y axis")
	.call(yAxis_y);

    // ==================== z ====================
    var g_z = g.append("g")
	.attr("class", "z")
	.attr("transform", "translate(0," + (height/3)*2 + ")");
    
    var yScale_z = d3.scaleLinear()
	.rangeRound([height/3 - padding, 0])
	.domain([Math.min(0, d3.min(dataset, function (d) { return d.omega_z; })),
		 d3.max(dataset, function (d) { return d.omega_z; })])
	.nice();

    // Plot
    var line = d3.line()
	.x(function(d) { return xScale(d.time); })
	.y(function(d) { return yScale_z(d.omega_z); });

    var path_z = g_z.append("path")
	.datum(dataset)
	.attr("fill", "none")
	.attr("stroke", "tomato")
	.attr("stroke-linejoin", "round")
	.attr("stroke-linecap", "round")
	.attr("stroke-width", 1.5)
	.attr("d", line)
	.on("mouseover", function(d) {
	    d3.select(this)
		.transition()
		.attr("stroke", "red");
	})
	.on("mouseout", function(d) {
	    d3.select(this)
		.transition()
		.attr("stroke", "tomato");
	});

    svg.on("click", function(){
	g_x.append("rect")
	    .attr("x", -1*width)
	    .attr("y", -1*(height/3-padding))
	    .attr("height", height/3-padding)
	    .attr("width", width)
	    .attr("class", "curtain")
	    .attr("transform", "rotate(180)")
	    .style("fill", "#222")
	    .transition()
	    .duration(3000)
	    .ease(d3.easeLinear)
	    .attr("width", 0);
	g_y.append("rect")
	    .attr("x", -1*width)
	    .attr("y", -1*(height/3-padding))
	    .attr("height", height/3-padding)
	    .attr("width", width)
	    .attr("class", "curtain")
	    .attr("transform", "rotate(180)")
	    .style("fill", "#222")
	    .transition()
	    .duration(3000)
	    .ease(d3.easeLinear)
	    .attr("width", 0);
	g_z.append("rect")
	    .attr("x", -1*width)
	    .attr("y", -1*(height/3-padding))
	    .attr("height", height/3-padding)
	    .attr("width", width)
	    .attr("class", "curtain")
	    .attr("transform", "rotate(180)")
	    .style("fill", "#222")
	    .transition()
	    .duration(3000)
	    .ease(d3.easeLinear)
	    .attr("width", 0);
    });

    // Axes
    var yAxis_z = d3.axisLeft(yScale_z).ticks(5);
    
    g_z.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (height/3 - padding) + ")")
	.call(xAxis);

    g_z.append("g")
	.attr("class", "y axis")
	.call(yAxis_z);

    g.append("text")
	.attr("y", height + 5)
	.attr("x", width/2)
	.attr("text-anchor", "middle")
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.text("Temps [s]");

    g.append("text")
	.attr("y", -30)
	.attr("x", -height/2)
	.attr("transform", "rotate(-90)")
	.attr("text-anchor", "middle")
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.text("Vitesse angulaire ω [rad/s]");
    
    // d3.select("svg")
    //     .on("click", function() {
    //         // dataset = [
    //         //     [0, 30], [5, 5], [10, 120], [15, 70], [20, 40], [25, 20],
    //         //     [30, 86], [35, 54], [40, 67], [45, 35], [50, 45]
    //         // ];
    //         var maxValue = 200;
    //         var newNumber = Math.floor(Math.random() * maxValue);
    //         var newx = d3.max(dataset, function(d) { return d.time }) + 0.7;
    //         dataset.push([newx, newNumber]);

    //         xScale.domain([Math.min(0, d3.min(dataset, function (d) { return d.time })), d3.max(dataset, function (d) { return d.time })])
    //             .nice();
    //         yScale.domain([Math.min(0, d3.min(dataset, function (d) { return d.omega_y })), d3.max(dataset, function (d) { return d.omega_y })])
    //             .nice();

    //         xAxis = d3.axisBottom(xScale);
    //         yAxis = d3.axisLeft(yScale);

    //         g.select("path")
    //             .datum(dataset)
    //             .transition()
    //             .duration(500)
    //             // .on("start", function() {
    //             //     d3.select(this)
    //             //         .attr("stroke", "magenta");
    //             // })
    //             // .on("end", function() {
    //             //     d3.select(this)
    //             //         .attr("stroke", "steelblue");
    //             // })
    //             .attr("d", line);

    //         g.selectAll(".x.axis")
    //             .transition()
    //             .duration(500)
    //             .call(xAxis);
    //         g.selectAll(".y.axis")
    //             .transition()
    //             .duration(500)
    //             .call(yAxis);
    //     });
};
