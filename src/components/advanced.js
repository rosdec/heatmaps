import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


function getWeekOfYear(date) {
  var target = new Date(date.valueOf()),
    dayNumber = (date.getDay() + 6) % 7,
    firstThursday;

  target.setDate(target.getDate() - dayNumber + 3);
  firstThursday = target.valueOf();
  target.setMonth(0, 1);

  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  return Math.ceil((firstThursday - target) / (7 * 24 * 3600 * 1000)) + 1;
}

const Heatmap = ({ data }) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    var values = []

    data.forEach(datum => {
      var date = new Date(datum.date)

      values.push({
        day: date.getDay(),
        week: getWeekOfYear(date),
        type: datum.count
      })
    });

    // first, initialize the variables that are independent of the data
    var margin = { top: 30, right: 10, bottom: 30, left: 30 }
    var width = 1000 - margin.left - margin.right
    var gridSize = Math.floor(width / 53)
    var height = (gridSize * 10) - margin.top - margin.bottom
    // varlegendElementWidth = gridSize * 3,

    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var weeks = ["", "J", "", "", "", "F", "", "", "", "M", "", "", "", "", "A", "", "", "", "M", "", "", "", "J", "", "", "", "", "J", "", "", "", "A", "", "", "", "S", "", "", "", "", "O", "", "", "", "N", "", "", "", "D", "", "", "", ""]


    var svg = d3.select(heatmapRef.current).append("svg") // attach chart to the DOM and center it within an svg element based on margins
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g") // an svg "group", similar to an html "div"
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(['#EBEDF0', '#7BC96F', '#C6E48B', '#239A3B', '#196127']);

    var colorScale = d3.scaleQuantize()
      .domain([0, 100])
      .range(["white", "pink", "red"])

    svg.selectAll(".day") // add day labels
      .data(days)
      .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", 0)
      .attr("y", function (d, i) { return i * gridSize; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.3 + ")")
      .attr("class", "label");

    svg.selectAll(".week") // add week labels
      .data(d3.range(values[0].week, values[values.length-1].week))
      .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", function (d, i) { return i * gridSize; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("class", "label");

    // var newValues = [] // optional code to generate color domain from the data
    // // make an object first
    // var valueObj = data.reduce(function (obj, key) {
    //   obj[key.type] = 0
    //   return obj
    // }, {})
    // for (key in valueObj) {
    //   newValues.push(key)
    // }
    // newValues.sort()
    // console.log(newValues);


    var heatMap = svg.selectAll(".grid") // make heatMap with data, data can be a hard coded array or an array of objects brought in through another file
      .data(values) // play with this, but later change this it to the data that is passed in on line 24
      .enter()
      .append("rect")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .attr("x", function (d) { return (d.week - 1) * gridSize; })
      .attr("y", function (d) { return (d.day) * gridSize; })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "bordered")
      .style("fill", function (d) { return colorScale(d.type); }) // use this line if you are not using the transition() to a new color

    heatMap.transition().duration(1000) // example d3 animation
      .style("fill", function (d) { return colorScale(d.type); })
      .style("fill-opacity", "60%");

    heatMap.append("title") // append and format title element
      .text(function (d) {
        var title = d.type + ' ' + d.date
        return title;
      });

    // var legend = svg.selectAll(".legend") // create legend, legend data is the color domain
    //     .data(colorScale.domain(), function(d) { return d; }) // d is each element in the data
    //     .enter().append("g")
    //       .attr("class", "legend");

    // legend.append("rect") // define legend rectangles
    //   .attr("x", function(d, i) { return legendElementWidth * i; })
    //   .attr("y", gridSize * 6)
    //   .attr("width", legendElementWidth)
    //   .attr("height", gridSize)
    //   .attr("class", "bordered")
    //   .attr("rx", 4)
    //   .attr("ry", 4)
    //   .style("fill", function(d, i) { return colors[i]; }) // map color domain array (d) to color range array
    //   .style("fill-opacity", "60%");


    // legend.append("text") // add legend text labels to same coordinates as legend rectangles, center
    //   .text(function(d) { return d; })
    //   .attr("x", function(d, i) { return (legendElementWidth * i) + legendElementWidth/2; })
    //   .attr("y", (gridSize * 6) + (gridSize/1.4))
    //   .attr("class", "label")
    //   .style("text-anchor", "middle");

  }, [data]);

  return <div ref={heatmapRef}></div>;
};

export default Heatmap;
