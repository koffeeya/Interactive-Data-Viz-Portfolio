class Bar {

    constructor(state, setGlobalState) {}

    draw(state, setGlobalState) {

        // Dimensions of the SVG canvas
        let canvasWidth = state.width * 0.9
        let canvasHeight = state.height * 0.8

        let filter = {
            math: state.allMath,
            ela: state.allELA,
        }

        let svgMath = d3
            .select("#chart3-visual")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight);

        let xScale, yScale;
        // AXES
        let xAxis = (d3.axisBottom(xScale));
        let yAxis = (d3.axisLeft(yScale));

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

        let chart3Text = d3.select("#chart3-tooltip")

        function createBar(canvas, data, xLabel, titleID, newTitle) {

            data = data.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                })
                .sort((a, b) => {
                    return d3.descending(a.BusDistance, b.BusDistance)
                });

            let margin = {
                top: 40,
                bottom: 40,
                left: 40,
                right: 10
            };

            xScale = d3
                .scaleLinear()
                .domain(d3.extent(data, d => d.BusDistance))
                .range([margin.left, canvasWidth - margin.right]);

            yScale = d3
                .scaleBand()
                .domain(data.map(d => d.School))
                .range([canvasHeight - margin.bottom, margin.top])
                .paddingInner("0.3")

            // DRAW
            let bar = canvas
                .selectAll(".bar")
                .data(data, key => key)
                .enter()
                .append("rect")
                .attr("y", d => yScale(d.School))
                .attr("x", d => xScale(margin.left + (canvasWidth * 0.04)))
                .attr("width", d => xScale(d.BusDistance))
                .attr("height", yScale.bandwidth())
                .attr("fill", "#EDAE49")
                .attr("opacity", 0)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("opacity", "0.5")
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .transition(d3.easeElastic)
                        .duration(50)
                        .style("opacity", "1")

                    d3.select("#chart3-tooltip")
                        .text(d.BusDistance)
                })
                .transition()
                .delay(d => d.Index)
                .attr("opacity", 1)

            let titleVar = d3.select(titleID)
                .style("opacity", "1")
                .transition(d3.easeElastic)
                .duration(200)
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(200)
                .text(newTitle)
                .style("opacity", "1");
        }


        // createBar(canvas, data, xLabel, titleID, newTitle)

        createBar(svgMath, state.allMath, "Average Daily Bus Distance", "#chart3-title", "How far do students have to travel to get to school?");

        

    }
}

export {
    Bar
};