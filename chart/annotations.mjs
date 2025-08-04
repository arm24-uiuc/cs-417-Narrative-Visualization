export function drawAnnotations(svg, data, config, annotations) {
  const { WIDTH, HEIGHT, X_RANGE, Y_RANGE } = config;
  if (!annotations || annotations.length === 0) return;

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range(X_RANGE);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.average))
    .range(Y_RANGE);

  const d3Annotations = annotations
    .map((ann) => {
      let target = data.find(
        (d) =>
          d.date.getFullYear() === ann.year &&
          (ann.month === undefined || d.date.getMonth() + 1 === ann.month)
      );
      if (!target) return null;
      return {
        note: {
          label: ann.text,
          title: ann.year,
          align: ann.align || "right",
          orientation: "topBottom",
        },
        x: xScale(target.date),
        y: yScale(target.average),
        dx: ann.x,
        dy: ann.y,
        subject: { radius: 4 },
        color: "#7b2ff2",
      };
    })
    .filter((a) => a !== null);

  svg.selectAll(".annotation-group").remove();

  const makeAnnotations = d3
    .annotation()
    .type(d3.annotationCalloutCircle)
    .annotations(d3Annotations);

  svg.append("g").attr("class", "annotation-group").call(makeAnnotations);
}
