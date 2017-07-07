// Total dimensions
var w = 900,
    h = 500;

// Select the SVG element
var svggamma = d3.select(".gamma")
    .attr("width", w)
    .attr("height", h);

// Margins
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = +svggamma.attr("width") - margin.left - margin.right,
    height = +svggamma.attr("height") - margin.top - margin.bottom,
    gamma = svggamma.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// From now on, add stuff to gamma and use width and height

d3.csv("gamma.csv",
    function(d) {
        return {
            time: +d.time,
            gamma_x: +d.gamma_x,
            gamma_y: +d.gamma_y,
            gamma_z: +d.gamma_z
        };
    },
    function(data) {
        dataset = data;
        generateVizGamma();
    });

var generateVizGamma = function() {
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
    var g_x = gamma.append("g")
	.attr("class", "x");
    
    var yScale_x = d3.scaleLinear()
	.rangeRound([height/3 - padding, 0])
	.domain([Math.min(0, d3.min(dataset, function (d) { return d.gamma_x; })),
		 d3.max(dataset, function (d) { return d.gamma_x; })])
	.nice();

    // Plot
    var line = d3.line()
	.x(function(d) { return xScale(d.time); })
	.y(function(d) { return yScale_x(d.gamma_x); });

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
    var g_y = gamma.append("g")
	.attr("class", "y")
	.attr("transform", "translate(0," + (height/3) + ")");
    
    var yScale_y = d3.scaleLinear()
	.rangeRound([height/3 - padding, 0])
	.domain([Math.min(0, d3.min(dataset, function (d) { return d.gamma_y; })),
		 d3.max(dataset, function (d) { return d.gamma_y; })])
	.nice();

    // Plot
    var line = d3.line()
	.x(function(d) { return xScale(d.time); })
	.y(function(d) { return yScale_y(d.gamma_y); });

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
    var g_z = gamma.append("g")
	.attr("class", "z")
	.attr("transform", "translate(0," + (height/3)*2 + ")");
    
    var yScale_z = d3.scaleLinear()
	.rangeRound([height/3 - padding, 0])
	.domain([Math.min(0, d3.min(dataset, function (d) { return d.gamma_z; })),
		 d3.max(dataset, function (d) { return d.gamma_z; })])
	.nice();

    // Plot
    var line = d3.line()
	.x(function(d) { return xScale(d.time); })
	.y(function(d) { return yScale_z(d.gamma_z); });

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

    svggamma.on("click", function(){
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

    gamma.append("text")
	.attr("y", height + 5)
	.attr("x", width/2)
	.attr("text-anchor", "middle")
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.text("Temps [s]");

    gamma.append("text")
	.attr("y", -30)
	.attr("x", -height/2)
	.attr("transform", "rotate(-90)")
	.attr("text-anchor", "middle")
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.text("Accélération γ [m/s²]");
    
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
    //         yScale.domain([Math.min(0, d3.min(dataset, function (d) { return d.gamma_y })), d3.max(dataset, function (d) { return d.gamma_y })])
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
