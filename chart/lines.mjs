export function drawLines(svg, data, tempData, config) {
  const { CO2_LINE_COLOR, TEMP_LINE_COLOR } = config;

  const xDomain = d3.extent(data, (d) => d.date);
  const xScale = d3.scaleTime().domain(xDomain).range(config.X_RANGE);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.average))
    .range(config.Y_RANGE);
  const yTempScale = d3
    .scaleLinear()
    .domain(d3.extent(tempData, (d) => d.temp))
    .range(config.Y_RANGE);

  const co2Line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.average));

  const tempDataClipped = tempData.filter(
    (d) => d.date >= xDomain[0] && d.date <= xDomain[1]
  );
  const tempLine = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yTempScale(d.temp));

  svg
    .append("path")
    .datum(data)
    .attr("class", "main-path co2-path")
    .attr("fill", "none")
    .attr("stroke", CO2_LINE_COLOR)
    .attr("stroke-width", 2)
    .attr("d", co2Line);

  svg
    .append("path")
    .datum(tempDataClipped)
    .attr("class", "main-path temp-path")
    .attr("fill", "none")
    .attr("stroke", TEMP_LINE_COLOR)
    .attr("stroke-width", 2)
    .attr("d", tempLine);
}
