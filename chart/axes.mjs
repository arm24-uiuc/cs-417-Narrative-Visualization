export function drawAxes(svg, data, tempData, config) {
  const { WIDTH, HEIGHT, X_PADDING, Y_PADDING, X_RANGE, Y_RANGE } = config;
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range(X_RANGE);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.average))
    .range(Y_RANGE);
  const yTempScale = d3
    .scaleLinear()
    .domain(d3.extent(tempData, (d) => d.temp))
    .range(Y_RANGE);

  let xAxis;
  if (
    data.length > 0 &&
    data.every((d) => d.date.getFullYear() === data[0].date.getFullYear())
  ) {
    xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%b"));
  } else {
    xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeYear.every(5))
      .tickFormat(d3.timeFormat("%Y"));
  }
  const yAxis = d3.axisLeft(yScale);
  const yTempAxis = d3.axisRight(yTempScale);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${Y_RANGE[0]})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${X_RANGE[0]},0)`)
    .call(yAxis);
  svg
    .append("text")
    .attr("class", "y-axis-label")
    .attr("x", X_RANGE[0] - 40)
    .attr("y", HEIGHT / 2)
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90,${X_RANGE[0] - 40},${HEIGHT / 2})`)
    .attr("fill", "#333")
    .attr("font-size", "1rem")
    .text("CO2 (ppm)");
  svg
    .append("g")
    .attr("class", "yTempAxisG")
    .attr("transform", `translate(${WIDTH - X_PADDING},0)`)
    .call(yTempAxis);
  svg
    .append("text")
    .attr("class", "y-temp-axis-label")
    .attr("x", WIDTH - X_PADDING + 40)
    .attr("y", HEIGHT / 2)
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90,${WIDTH - X_PADDING + 40},${HEIGHT / 2})`)
    .attr("fill", "#333")
    .attr("font-size", "1rem")
    .text("Temperature (°C)");
}
