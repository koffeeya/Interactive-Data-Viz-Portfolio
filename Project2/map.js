class Map {
    constructor(state, setGlobalState) {

    }

    draw(state, setGlobalState) {

        // Color scale for operators
        let colorScale = d3.scaleOrdinal().domain(state.operatorList).range(["#ff743d", "#2E86AB"]);
        let incomeScale = d3.scaleOrdinal().domain(["above", "below"]).range(["#EDAE49", "#cccccc"]);

        let subtitle = d3.select("#chart1-subtitle");
        let subtitle2 = d3.select("#chart1-subtitle-2")

        let svg = d3
            .select("#chart1-visual")
            .append("svg")
            .attr("width", state.width)
            .attr("height", state.height);

        // Title of chart
        let title = d3
            .select("#chart1-title")
            .text("Tribal Schools in the United States");

        let tooltip = d3.select("#chart1-visual")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);





        function setUpUSA() {
            // US map background
            svg
                .selectAll(".landUSA")
                .append("g")
                .data(state.geoUSA.features)
                .join("path")
                .attr("d", state.pathUSA)
                .attr("class", "landUSA")
                .attr("fill", "#212121")
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(900)
                .style("opacity", "1");

                const dot = svg
                .selectAll(".circle")
                .data(state.dataSchools, d => d.School)
                .join(
                    enter =>
                    enter
                    .append("circle")
                    .attr("class", "dot")
                    .attr("opacity", 0)
                    .attr("r", "4")
                    .attr("style", "stroke: grey; stroke-width: 0.5px")
                    .attr("fill", "white")
                    .attr("transform", d => {
                        const [x, y] = state.projectionUSA([+d.Longitude, +d.Latitude]);
                        return `translate(${x}, ${y})`;
                    })
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                            .attr("r", "8")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer")
                            .attr("style", "stroke: white; stroke-width: 1px; z-index: 100;");
                        // tooltip
                        d3.select("#chart1-tooltip")
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .text(d.School + " " + " | " + d.City + ", " + d.State)
                            .style("opacity", .9);
                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                            .attr("r", "4")
                            .attr("opacity", 1)
                            .attr("cursor", "default")
                            .attr("style", "stroke: grey; stroke-width: 1px; z-index: 0;")
                        // tooltip
                        d3.select("#chart1-tooltip")
                            .style("opacity", 1)
                            .transition()
                            .duration(50)
                            .style("opacity", 0);
                    }),
                    update => update,
                    exit => exit
                )
        }

        setUpUSA();



        // SET UP SCROLLAMA
        let scroller = scrollama();
        let step = d3.selectAll(".part1");
        scroller
            .setup({
                step: ".part1",
                debug: false,
                offset: 0.4,
            })
            .onStepEnter(handleStepEnter)


        // SCROLLAMA STEP HANDLER
        function handleStepEnter(response) {
            step.classed("is-active");
            console.log(response);

            if (step.classed("is-active", true) && response.index === 0 && response.direction === "down") {

                // Add school dots and mouseover events
                svg
                    .selectAll(".dot")
                    .style("opacity", 0)
                    .transition(d3.easeElastic)
                    .delay(d => 5 * d.Latitude)
                    .attr("fill", "white")
                    .style("opacity", 1)
            }


            // STEP 3: OPERATOR

            // Step 2 Up
            if (step.classed("is-active", true) && response.index === 1 && response.direction === "up") {
                // Change title

                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools, by operator")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools in the United States")
                    .style("opacity", "1");

                // Change subtitle
                subtitle
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0");

                 subtitle2
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0")
                    .attr("display", "none");

                // Change school dot color to white
                svg
                    .selectAll(".dot")
                    .attr("fill", d => colorScale(d['Operator']))
                    .transition(d3.easeElastic)
                    .delay(d => 5 * d.Latitude)
                    .attr("fill", "white")
            }

            // Step 2 Down
            if (step.classed("is-active", true) && response.index === 1 && response.direction === "down") {
                // Change title
                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools in the United States")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools, by operator")
                    .style("opacity", "1");

                // Change subtitle
                subtitle
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1");

                // Change school dot color to scale by operator
                const dot = svg
                    .selectAll(".dot")
                    .call(selection =>
                        selection
                        .attr("fill", "white")
                        .transition(d3.easeElastic)
                        .delay(d => 10 * d.Latitude)
                        .attr("fill", d => colorScale(d['Operator']))
                    );
            }

            // STEP 3 UP
            if (step.classed("is-active", true) && response.index === 2 && response.direction === "up") {
                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools, by average county per capita income")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools, by operator")
                    .style("opacity", "1");

                subtitle
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1")
                    .attr("display", "visible");

                subtitle2
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0")
                    .attr("display", "none");

                    const dot = svg
                    .selectAll(".dot")
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                            .attr("r", "8")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer")
                            .attr("style", "stroke: white; stroke-width: 1px; z-index: 100;");
                        // tooltip
                        d3.select("#chart1-tooltip")
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .text(d.School + " " + " | " + d.City + ", " + d.State)
                            .style("opacity", .9);
                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                            .attr("r", "4")
                            .attr("opacity", 1)
                            .attr("cursor", "default")
                            .attr("style", "stroke: grey; stroke-width: 1px; z-index: 0;")
                        // tooltip
                        d3.select("#chart1-tooltip")
                            .style("opacity", 1)
                            .transition()
                            .duration(50)
                            .style("opacity", 0);
                    })
                    .call(selection =>
                        selection
                        .attr("fill", "white")
                        .transition(d3.easeElastic)
                        .delay(d => 10 * d.Latitude)
                        .attr("fill", d => colorScale(d['Operator']))
                    );
            }



            // STEP 3 DOWN

            if (step.classed("is-active", true) && response.index === 2 && response.direction === "down") {

                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools, by operator")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools, by average county per capita income")
                    .style("opacity", "1");

                subtitle
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0")
                    .attr("display", "none");

                subtitle2
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1")
                    .attr("display", "visible");

                const dot = svg
                    .selectAll(".dot")
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                            .attr("r", "8")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer")
                            .attr("style", "stroke: white; stroke-width: 1px; z-index: 100;");
                        // tooltip
                        d3.select("#chart1-tooltip")
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .text(d.School + " " + " | " + d.City + ", " + d.State + " | $" + d.Income + " per capita income for " + d.County + " county")
                            .style("opacity", .9);
                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                            .attr("r", "4")
                            .attr("opacity", 1)
                            .attr("cursor", "default")
                            .attr("style", "stroke: grey; stroke-width: 1px; z-index: 0;")
                        // tooltip
                        d3.select("#chart1-tooltip")
                            .style("opacity", 1)
                            .transition()
                            .duration(50)
                            .style("opacity", 0);
                    })
                    .call(selection =>
                        selection
                        .attr("fill", "white")
                        .transition(d3.easeElastic)
                        .delay(d => 10 * d.Latitude)
                        .attr("fill", d => incomeScale(d['category']))
                    );
            }
        }
    }
}

export {
    Map
};