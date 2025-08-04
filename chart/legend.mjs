export function drawLegend(svg, config) {
  const { WIDTH, CO2_LINE_COLOR, TEMP_LINE_COLOR } = config;
  const legend = svg.append("g").attr("class", "legend");
  legend
    .append("rect")
    .attr("x", config.X_PADDING + 10)
    .attr("y", 30)
    .attr("width", 18)
    .attr("height", 3)
    .attr("fill", CO2_LINE_COLOR);
  legend
    .append("text")
    .attr("x", config.X_PADDING + 30)
    .attr("y", 35)
    .text("CO2 (ppm)")
    .attr("alignment-baseline", "middle")
    .attr("fill", CO2_LINE_COLOR);
  legend
    .append("rect")
    .attr("x", config.X_PADDING + 10)
    .attr("y", 50)
    .attr("width", 18)
    .attr("height", 3)
    .attr("fill", TEMP_LINE_COLOR);
  legend
    .append("text")
    .attr("x", config.X_PADDING + 30)
    .attr("y", 55)
    .text("Temperature (°C)")
    .attr("alignment-baseline", "middle")
    .attr("fill", TEMP_LINE_COLOR);
}
