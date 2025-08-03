// Select the body and append an SVG element
const svg = d3
  .select("#visualization")
  .append("svg")
  .attr("width", 300)
  .attr("height", 300);

const data = d3.csv("./data/co2_mm_mlo.csv").then((data) => {
  // Create circles based on the data
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => i * 50 + 25)
    .attr("cy", 100)
    .attr("r", (d) => d / 2)
    .attr("fill", "steelblue");
});
