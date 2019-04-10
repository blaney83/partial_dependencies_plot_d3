
var x = d3.scaleLinear()
.domain([10, 130])
.range([0, 960]);

x(20); // 80
x(50); // 320

const axis = d3.axisLeft(x);

d3.select("body").append("svg")
    .attr("width", 1440)
    .attr("height", 30)
  .append("g")
    .attr("transform", "translate(0,30)")
    .call(axis);