/*
Reference:
https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
*/

//shared variables
const margin = { top: 20, right: 30, bottom: 40, left: 90 }

const width = 500;
const height = 400;

const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

let chartProperty = '';

const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom} )`)

const yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)

//Creates a chart of value by index
const NumericChart = (props) => {

    const data = props.data;
    chartProperty = props.header;

    const drawChart = (property) => {
        
        chartProperty = property; //store for reload on new

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d=> parseFloat(d[property]))])
            .range([ margin.left, width-margin.right]);

        const yScale = d3.scaleBand().padding(.1)
            .range([ margin.top, height - margin.bottom])
            .domain(data.map((d, i) => i));

        svg.selectAll("rect")
          .data(data, (d, i) => i) //map by index
          .join(
              enter => enter
                .append("rect")
                .attr("x", xScale(0) )
                .attr("y", (d, i) => yScale(i))
                .attr("width", (d) => xScale(parseFloat(d[property]) || 0)-xScale(0))
                .attr("height", yScale.bandwidth())
                .attr("fill", "#008b8b"),
            update => update
                .call(update => update
                    .transition()
                    .duration(500)
                    .attr("x", xScale(0) )
                    .attr("y", (d, i) => yScale(i))
                    .attr("width", (d) => xScale(parseFloat(d[property]) || 0)-xScale(0))
                    .attr("height", yScale.bandwidth() )
                )
          );

          xAxis.call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

          yAxis.call(d3.axisLeft(yScale));
    }

    drawChart(chartProperty);

    return(
        <h3>Chart for {props.header}</h3>
    );
}

const CategoricalChart = (props) => {

    const data = props.counts;
    const keys = Object.keys(data);
    chartProperty = props.header;

    const drawChart = (property) => {
        
        chartProperty = property; //store for reload on new

        const xScale = d3.scaleBand().padding(.1)
            .range([ margin.left, width-margin.right])
            .domain(keys.map((d, i) => d));

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(keys, d => parseFloat(data[d]))])
            .range([height - margin.bottom  , margin.top]);

        
        svg.selectAll("rect")
          .data(keys, (d, i) => d) //map by key
          .join(
              enter => enter
                .append("rect")
                .attr("x", (d) => xScale(d) )
                .attr("y", (d) => yScale(data[d] || 0))
                .attr("width", xScale.bandwidth())
                .attr("height", (d) => yScale(0) - yScale(data[d] || 0))
                .attr("fill", "#008b8b"),
            update => update
                .call(update => update
                    .transition()
                    .duration(500)
                    .attr("x", d => xScale(d) )
                    .attr("y", (d) => yScale(data[d] || 0))
                    .attr("width", xScale.bandwidth())
                    .attr("height", (d) => yScale(0) - yScale(data[d] || 0))
                )
            
          );

          xAxis.call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

          yAxis.call(d3.axisLeft(yScale));
    }

    drawChart(chartProperty);

    return(
        <h3>Chart for {props.header}</h3>
    );
}