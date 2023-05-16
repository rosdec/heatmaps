import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (data && heatmapRef.current) {
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 500 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Create the SVG container
      const svg = d3
        .select(heatmapRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Define the color scale
      const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, d3.max(data)]);

      // Create the heatmap
      const heatmap = svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (_, i) => Math.floor(i / data.length) * width / data.length)
        .attr('y', (_, i) => (i % data.length) * height / data.length)
        .attr('width', width / data.length)
        .attr('height', height / data.length)
        .style('fill', d => colorScale(d));

      // Add labels
      svg
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (_, i) => Math.floor(i / data.length) * width / data.length + width / (2 * data.length))
        .attr('y', (_, i) => (i % data.length) * height / data.length + height / (2 * data.length))
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .text(d => d);
    }
  }, [data]);

  return <div ref={heatmapRef}></div>;
};

export default Heatmap;
