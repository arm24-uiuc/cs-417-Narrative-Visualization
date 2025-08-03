// Select the body and append an SVG element
const svg = d3
  .select("#visualization")
  .append("svg")
  .attr("width", 300)
  .attr("height", 300);

// Load CSV data (works on GitHub Pages and any server)
d3.csv("./data/co2_mm_mlo.csv", (d) => ({
  year: +d["1958"], // adjust if your CSV has headers
  month: +d["3"], // adjust if your CSV has headers
  average: +d["315.71"], // adjust if your CSV has headers
})).then((co2Data) => {
  svg
    .selectAll("circle")
    .data(co2Data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => i * 50 + 25)
    .attr("cy", 100)
    .attr("r", (d) => d.average / 10)
    .attr("fill", "steelblue");
});
