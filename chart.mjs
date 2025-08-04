import { cleanupChart } from "./chart/utils.mjs";
import { drawLines } from "./chart/lines.mjs";
import { drawAnnotations } from "./chart/annotations.mjs";
import { drawAxes } from "./chart/axes.mjs";
import { drawLegend } from "./chart/legend.mjs";

export function drawChart(svg, data, tempData, config, annotations) {
  cleanupChart(svg); // Clear previous chart elements

  // order of drawing matters
  drawLines(svg, data, tempData, config);
  drawAxes(svg, data, tempData, config);
  drawLegend(svg, config);
  drawAnnotations(svg, data, config, annotations);
}
