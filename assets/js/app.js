

var svgWidth=900;
var svgHeight=500;

var margin={
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width=svgWidth-margin.right-margin.left;
var height=svgHeight-margin.top-margin.bottom;

var svg=d3.select("scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height",svgHeight);

var chartGroup=svg.append("g")
	.attr("transform", `translate(${margin.left+40}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(csvdata){

	csvdata.forEach(function(data){
		data.obesity= +data.obesity
		data.smokes= +data.smokes		
	})


	var xLineScale=d3.scaleLinear()
		.domain([24, d3.max(csvdata, d=> d.obesity)])
		.range([o,width]);

	var yLineScale=de.scaleLinear()
		.domain([8, d3.max(csvdata, d=>d.smokes)])
		.range([height,0])

	var bottomAxis=d3.axisBottom(xLineScale);
	var leftAxis=de.axisLeft(yLineScale);

	chartGroup.append("g")
		.attr("transform", `translate(0, ${height)}`)
		.attr(bottomAxis);
	chartGroup.append("g")
		.call(leftAxis);


	var circle_text=chartGroup.selectAll("g")
		.data(csvdata)

	var circle_text_enter=circle_text.enter()
		.append("g")

	var circle=circle_text_enter.append("circle")
		.attr("cx", d=>xLineScale(d.obesity))
		.attr("cy", d=>yLineScale(d.smokes))
		.attr("r", 15)
		.attr("fill", "purple")
		.attr("opaque", "0.5")


	circle_text_enter.appned("text")
		.attr("dx", d=> xLineScale(d.obesity))
		.attr("dy", d=> yLineScale(d.smokes))
		.attr("text-anchor", "middle")
		.attr("fill", "white")
		.attr("font-family", "Saira")
	//	.text(function(d){
	//		return d.abbr
	//	})


	var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Obesity Rate: ${d.obesity}%<br>Smokers: ${d.smokes}%`);
      });


    chartGroup.call(toolTip);

    
    circlesAndTextEnter.on("click", function(data) {
      toolTip.show(data, this);
    })
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height /1.5))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokers ");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 3}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Obesity rate ");





});
