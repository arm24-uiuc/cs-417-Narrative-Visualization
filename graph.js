const data = [10, 20, 30, 40, 50];

// Select the body and append an SVG element
const svg = d3.select("#visualization")
  .append("svg")
  .attr("width", 300)
  .attr("height", 200);

// Create circles based on the data
svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d, i) => i * 50 + 25)
  .attr("cy", 100)
  .attr("r", d => d / 2)
  .attr("fill", "steelblue");