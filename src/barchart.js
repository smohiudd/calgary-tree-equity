import { forwardRef } from "react";
import * as d3 from "d3";

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", -8)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", -8)
          .attr("y", -10)
          .attr("dy", `${++lineNumber * lineHeight + -0.5}em`)
          .text(word);
      }
    }
  });
}

const Barchart = forwardRef(function Barchart(props, ref) {
  d3.select(ref.current).selectAll("*").remove();

  const string_map = {
    age: "Children and Seniors",
    visible_minority: "Visible Minority",
    language: "Lang. Isolation",
    low_income: "Low Income",
    unemployed: "Unempl. Rate",
  };

  const barHeight = 22;
  const marginTop = 10;
  const marginRight = 30;
  const marginBottom = 20;
  const marginLeft = 80;
  const width = 230;
  const height =
    Math.ceil((props.barchartContent.length + 0.1) * barHeight) +
    marginTop +
    marginBottom;

  let svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .append("g");

  const y = d3
    .scaleBand()
    .domain(props.barchartContent.map((d) => string_map[d.property]))
    .rangeRound([marginTop, height - marginBottom])
    .padding(0.1);

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
    .selectAll(".tick text")
    .call(wrap, marginLeft);

  const x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([marginLeft, width - marginRight]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).ticks(4, "%"));

  svg
    .append("g")
    .attr("fill", "black")
    .selectAll()
    .data(props.barchartContent)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(string_map[d.property]))
    .attr("width", (d) => x(d.value) - x(0))
    .attr("height", y.bandwidth());

  return <svg ref={ref} />;
});

export default Barchart;
