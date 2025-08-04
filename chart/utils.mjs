export function cleanupChart(svg) {
  svg.selectAll(".main-path").remove();
  svg.selectAll(".legend").remove();
  svg.selectAll(".x-axis").remove();
  svg.selectAll(".y-axis").remove();
  svg.selectAll(".yTempAxisG").remove();
}
