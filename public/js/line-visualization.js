//Creates line chart

var margin = {top: 20, right: 120, bottom: 30, left: 50},
				    width = 1260 - margin.left - margin.right,
				    height = 500 - margin.top - margin.bottom;

				//Parses date into acceptable format
				var parseDate = d3.time.format("%m/%d/%Y").parse;

				//Scale for time
				var x = d3.time.scale()
				    .range([0, width]);

				//Scale for values
				var y1 = d3.scale.linear()
				    .range([height, 0]);

				//Create xAxis
				var xAxis2 = d3.svg.axis()
				    .scale(x)
				    .orient("bottom");

				//Create yAxis
				var yAxis2 = d3.svg.axis()
				    .scale(y1)
				    .orient("left");

				//Draws lines based on x-date and y-numCases
				var line = d3.svg.line()
				    .interpolate("basis")
				    .x(function(d) { return x(d.date); })
				    .y(function(d) { return y1(d.cases); });

				var svg2 = d3.select(".line-container").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				//Reads in csv data
				d3.csv("ebola-outbreak-totals.csv", function(error, data) {
				  if (error) throw error;

				  //Maps keys to colors
				  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date" && key !== "guinea_d" && key !== "liberia_d" && key !== "sierra_d"; }));

				  //Changes date field to easier format
				  data.forEach(function(d) {
				    d.date = parseDate(d.date);
				  });

				  //Creates dictionary of countries with name and value fields
				  //Value field contains date and number of cases
				  //Allows easier handling of data
				  var countries = color.domain().map(function(name) {
				    return {
				      name: name,
				      values: data.map(function(d) {
				        return {date: d.date, cases: +d[name]};
				      })
				    };
				  });

				  //X domain to last date
				  x.domain(d3.extent(data, function(d) { return d.date; }));


				  //Y domain from lowest to highest case count
				  y1.domain([
				    d3.min(countries, function(c) { return d3.min(c.values, function(v) { return v.cases; }); }),
				    d3.max(countries, function(c) { return d3.max(c.values, function(v) { return v.cases; }); })
				  ]);

				  svg2.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis2);

				  //Y axis text
				  svg2.append("g")
				      .attr("class", "y1 axis")
				      .call(yAxis2)
				    .append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 6)
				      .attr("dy", ".71em")
				      .style("text-anchor", "end")
				      .text("Total Reported Cases");

				  var country = svg2.selectAll(".country")
				      .data(countries)
				    .enter().append("g")
				      .attr("class", "country");


				  country.append("path")
				      .attr("class", "line")
				      .attr("d", function(d) { return line(d.values); })
				      .style("stroke", function(d) { return color(d.name); });

				  //Append country name to end of line drawn
				  country.append("text")
				      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
				      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y1(d.value.cases) + ")"; })
				      .attr("x", 3)
				      .attr("dy", ".35em")
				      .text(function(d) { return d.name; });
				});