//Creates bar chart

var margin = {top: 20, right: 20, bottom: 30, left: 40},
				    width = 1360 - margin.left - margin.right,
				    height = 500 - margin.top - margin.bottom;


				//Allows for band grouping of bars
				var x0 = d3.scale.ordinal()
				    .rangeRoundBands([0, width], 0.1);

				var x1 = d3.scale.ordinal();

				var y = d3.scale.linear()
				    .range([height, 0]);


				//Color scale
				var color = d3.scale.ordinal()
				    .range(["#98abc5", "#7b6888", "#a05d56","#ff8c00"]);

				var xAxis = d3.svg.axis()
				    .scale(x0)
				    .orient("bottom");

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
				    .tickFormat(d3.format(".2s"));

				var svg = d3.select(".bar-container").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				 //Read in csv data
				d3.csv("ebola-outbreak-monthly-totals.csv", function(error, data) {
				  if (error) throw error;

				 
				 //Creates dictionary of country names and removes unwanted fields/keys
				var countryNames = d3.keys(data[0]).filter(function(key) { return key !== "date" && key !== "guinea_d" && key !== "liberia_d" && key !== "sierra_d"; });

					//Uses countryNames dictionary to create name-value dictionary
				  data.forEach(function(d) {
				    d.cases = countryNames.map(function(name) { return {name: name, value: +d[name]}; });
				  });
				 
				  //Full X domain
				  x0.domain(data.map(function(d) { return d.date; }));

				  //X domain for each band
				  x1.domain(countryNames).rangeRoundBands([0, x0.rangeBand()]);

				  //Y domain from 0 to highest case count
				  y.domain([0, d3.max(data, function(d) { return d3.max(d.cases, function(d) { return d.value; }); })]);

				  svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis);


				  //Y axis text
				  svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis)
				    .append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 6)
				      .attr("dy", ".71em")
				      .style("text-anchor", "end")
				      .text("Reported Cases");

				    //Sections for each date
				  var date = svg.selectAll(".date")
				      .data(data)
				    .enter().append("g")
				      .attr("class", "date")
				      .attr("transform", function(d) { return "translate(" + x0(d.date) + ",0)"; });

				   //Appends bars to each date section
				  date.selectAll("rect")
				      .data(function(d) { return d.cases; })
				    .enter().append("rect")
				      .attr("width", x1.rangeBand())
				      .attr("x", function(d) { return x1(d.name); })
				      .attr("y", function(d) { return y(d.value); })
				      .attr("height", function(d) { return height - y(d.value); })
				      .style("fill", function(d) { return color(d.name); });


				  //Creates color legend for country names
				  var legend = svg.selectAll(".legend")
				      .data(countryNames.slice().reverse())
				    .enter().append("g")
				      .attr("class", "legend")
				      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

				  legend.append("rect")
				      .attr("x", width - 18)
				      .attr("width", 18)
				      .attr("height", 18)
				      .style("fill", color);

				  legend.append("text")
				      .attr("x", width - 24)
				      .attr("y", 9)
				      .attr("dy", ".35em")
				      .style("text-anchor", "end")
				      .text(function(d) { return d; });

				   
				});

				