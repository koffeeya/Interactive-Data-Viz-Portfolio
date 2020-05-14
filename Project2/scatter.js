class Scatter {

    constructor(state, setGlobalState) {}

    draw(state, setGlobalState) {

        // Dimensions of the SVG canvas
        let canvasWidth = state.width * 0.9
        let canvasHeight = state.height * 0.65

        let filter = {
            math: state.allMath,
            ela: state.allELA,
        }

        let svgMath = d3
            .select("#chart3-visual")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight);

        let svgELA = d3
            .select("#chart3-visual")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight);

        let xScale, yScale;

        function createScatter(canvas, key, data, xLabel, yLabel, radius) {

            let margin = {
                    top: 40,
                    bottom: 40,
                    left: 40,
                    right: 10
                },

                xScale = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d.BusDistance))
                .range([margin.left, canvasWidth - margin.right]);

            yScale = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d.PercentMeet))
                .range([canvasHeight - margin.bottom, margin.top]);


            // AXES
            let xAxis = (d3.axisBottom(xScale));
            let yAxis = (d3.axisLeft(yScale));

            canvas
                .append("g")
                .attr("class", "axis x-axis")
                .attr("transform", `translate(0, ${canvasHeight - margin.bottom})`)
                .call(xAxis)
                .append("text")
                .attr("class", "axis-label")
                .attr("x", "50%")
                .attr("dy", "3em")
                .text(xLabel);

            canvas
                .append("g")
                .attr("class", "axis y-axis")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(yAxis)
                .append("text")
                .attr("class", "axis-label")
                .attr("y", "50%")
                .attr("dx", "-3em")
                .attr("writing-mode", "vertical-rl")
                .text(yLabel);


            // DRAW
            let dot = canvas
                .selectAll(".dot")
                .data(data, d => key)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", radius)
                .attr("cy", d => yScale(d.PercentMeet))
                .attr("cx", d => xScale(d.BusDistance))
                .attr("fill", "grey")
                .attr("opacity", 0)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("opacity", "0.5")
                        .attr("r", radius * 2)
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .transition(d3.easeElastic)
                        .duration(100)
                        .style("opacity", "1")
                        .attr("r", radius)
                })
                .transition(d3.easeElastic)
                .delay(d => 10 * d.Index)
                .attr("opacity", 1)

        }

        // Transition the title of the chart
        function changeTitle(titleVar, newText) {
            titleVar
                .style("opacity", "1")
                .transition(d3.easeElastic)
                .duration(200)
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(200)
                .text(newText)
                .style("opacity", "1");
        }


        createScatter(svgMath, "d.School", state.allMath, "Bus Distance", "Percent Meet", 5);

        createScatter(svgELA, "d.School", state.allELA, "Bus Distance", "Percent Meet", 5);

    }
}

export {
    Scatter
};