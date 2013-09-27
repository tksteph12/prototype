var drawGroupedBars = function(datas, id) {
	jQuery('#' + id).empty();

	var defaultColors = ["#00a7ba", "#0b6f7e", "#5d76ec", "#265e8d", "#9b7fc9", "#b93082", "#ff8c00"];
	var defaultHeight = 300; // taille par défaut
	var defaultWidth = 800;
	var margin = {
		top: 20,
		right: 80,
		bottom: 30,
		left: 80
	};
	var width = undefined; // width - margin.left - margin.right

	var height = undefined; // height -margin.top - margin.bottom

	var container = document.getElementById(id);
	var elastic_ease = "elastic";
	var ease = "cubic-in-out";
	var linear_ease = "linear";

	//------------------------------------------------------
	var data = datas.valeurs;
	var label = datas.unite;
	//-------------------------------------------------------

	if ((height === undefined) || (height === 0)) {
		height = defaultHeight;
	}
	if ((width === undefined) || (width === 0)) {
		width = defaultWidth;
	}
	var param = 0;
	if (width < 300) {
		param = 7 / 10;
		//space = 5;
		space = width / 60;
		height = 155;
	} else if (width < 600) {
		param = 8 / 10;
		//space = 5;
		height = 155;
	}


	width = width - margin.left - margin.right;
	height = height + margin.top;

	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
		.range([height, 0]);

	var color = d3.scale.ordinal()
		.range(defaultColors);

	var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");

	var yLAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
	//.tickFormat(d3.format(".2s"))
	;

	var svg = d3.select("#" + id).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



	var values = d3.keys(data[0]).filter(function(key) {
		return key !== "periode" && key !== "val";
	});

	var toolTip = d3.select("#" + id).append("div")
		.attr("class", "tooltip")
		.style("opacity", 1e-6);


	data.forEach(function(d) {
		d.val = values.map(function(name) {
			return {
				name: name,
				value: +d[name]
			};
		});
	});

	x0.domain(data.map(function(d) {
		return d.periode;
	}));
	x1.domain(values).rangeRoundBands([0, x0.rangeBand()]);
	y.domain([0, d3.max(data, function(d) {
			return d3.max(d.val, function(d) {
				return d.value;
			});
		})]);

	svg.append("g")
		.transition().delay(function(d, i) {
		return i * 90;
	})
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yLAxis)
		.append("text")
	//.transition().delay(function (d,i){ return i * 90;})
	.attr("transform", "rotate(-90)")
		.attr("y", 2)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(label);

	var chart = svg.selectAll(".chart")
		.data(data)
		.enter().append("g")
		.attr("class", "g")
		.attr("transform", function(d) {
		return "translate(" + x0(d.periode) + ",0)";
	});

	chart.selectAll("rect")
		.data(function(d) {
		return d.val;
	})
		.enter().append("rect")
		.attr("width", x1.rangeBand())
		.attr("x", function(d) {
		return x1(d.name);
	})

	.attr("y", function(d) {
		return y(d.value);
	})
		.attr("height", function(d) {
		return height - y(d.value);
	})
		.style("fill", function(d) {
		return color(d.name);
	})
		.style('opacity', 0)
		.on("mouseover", function(d) {
		toolTip.transition().duration(200).style("opacity", 1)
	})
		.on("mousemove", function(d) {
			toolTip.html(function(){
				var val = d.value;
				var name = d.name;
				var html = "<div><h>" + name + "</h></div> <div><a> " +val + "</a></div>";
				return html;
		})
			.style("left", (d3.event.pageX - 100) + "px").style("top", (d3.event.pageY - 120) + "px");

	})
		.on("mouseout", function(d) {
		toolTip.transition().duration(200).style("opacity", 1e-6);
	})
	/*.transition().delay(function (d,i){ return i*100;}).duration(900)
			.ease(ease, 10, .45)*/
	.transition()
		.delay(function(d, i) {
		return i * 100
	})
		.duration(800)
		.style('width', x1.rangeBand())
		.style('opacity', 1);



	var legend = svg.selectAll(".legend")
		.data(values.slice().reverse())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
		return "translate(0," + i * 20 + ")";
	});

	legend.append("rect")
		.transition().delay(function(d, i) {
		return i * 90;
	})
		.attr("x", width + 60)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);

	legend.append("text")
		.attr("x", width + 55)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {
		return d;
	});
}