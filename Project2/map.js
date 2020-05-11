class Map {
    constructor(state, setGlobalState) {

    }

    draw(state, setGlobalState) {
        // Color scale for operators
        let colorScale = d3.scaleOrdinal().domain(state.operatorList).range(["#ff743d", "#2E86AB"]);

        let subtitle = d3.select("#chart1-subtitle");

        // Set up SVG canvas
        let svg = d3
            .select("#chart1-visual")
            .append("svg")
            .attr("width", state.width)
            .attr("height", state.height)

        // Title of chart
        let title = d3
            .select("#chart1-title")
            .text("Tribal nation boundaries")
            .style("opacity", "0")
            .transition(d3.easeElastic)
            .duration(1200)
            .style("opacity", "1");

        // US map background
        svg
            .selectAll(".landUSA")
            .append("g")
            .data(state.geoUSA.features)
            .join("path")
            .attr("d", state.pathUSA)
            .attr("class", "landUSA")
            .attr("fill", "#ccc")
            .style("opacity", "0")
            .transition(d3.easeElastic)
            .duration(900)
            .style("opacity", "1");


        // SET UP SCROLLAMA
        let scroller = scrollama();
        let step = d3.selectAll(".narrative");
        scroller
            .setup({
                step: ".narrative",
                debug: true,
                offset: 0.9,
            })
            .onStepEnter(handleStepEnter)


        // SCROLLAMA STEP HANDLER
        function handleStepEnter(response) {
            step.classed("is-active");

            // STEP 1: TRIBAL LANDS

            // Step 1 Down
            if (step.classed("is-active", true) && response.index === 0 && response.direction === "down") {
                // Add tribal lands
                svg
                    .selectAll(".landTribal")
                    .append("g")
                    .data(state.geoTribal.features)
                    .join("path")
                    .attr("d", state.pathUSA)
                    .attr("class", "landTribal")
                    .attr("fill", "#9a3106")
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1");
            }


            // STEP 2: SCHOOLS

            // Step 2 Up
            if (step.classed("is-active", true) && response.index === 1 && response.direction === "up") {
                // Change title
                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal nation boundaries");

                // Lighten US map background
                svg
                    .selectAll(".landUSA")
                    .attr("fill", "#212121")
                    .transition(d3.easeElastic)
                    .duration(1200)
                    .attr("fill", "#ccc")

                // Remove school dots
                svg
                    .selectAll(".dot")
                    .style("opacity", "1")
                    .attr("r", "4")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .attr("r", "6")
                    .style("opacity", "0")
                    .remove();

                // Add tribal lands
                svg
                    .selectAll(".landTribal")
                    .attr("fill", "#9a3106")
                    .style("opacity", "0.3")
                    .transition(d3.easeElastic)
                    .duration(1200)
                    .style("opacity", "1");
            }

            // Step 2 Down
            if (step.classed("is-active", true) && response.index === 1 && response.direction === "down") {
                // Change title
                title = d3
                    .select("#chart1-title")
                    .text("Tribal nation boundaries")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools")
                    .style("opacity", "1");

                // Darken US map background
                svg
                    .selectAll(".landUSA")
                    .attr("fill", "#ccc")
                    .transition(d3.easeElastic)
                    .duration(600)
                    .attr("fill", "#212121")

                // Lighten tribal lands
                svg
                    .selectAll(".landTribal")
                    .attr("fill", "white")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(600)
                    .style("opacity", "0.3");

                // Add school dots and mouseover events
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
                            d3.select(this)
                                .attr("r", "8")
                                .attr("opacity", 1)
                                .attr("cursor", "pointer")
                                .attr("style", "stroke: white; stroke-width: 1px; z-index: 100;");
                            d3.select(".tooltip").html("<p>" + d.School + "</p> <p>" + d.City + ", " + d.State + "</p>")
                        })
                        .on('mouseout', function (d) {
                            d3.select(this)
                                .attr("r", "4")
                                .attr("opacity", 0.7)
                                .attr("cursor", "default")
                                .attr("style", "stroke: grey; stroke-width: 1px; z-index: 0;");
                            d3.select(".tooltip").attr("opacity", 0);
                        }),
                        update => update,
                        exit => exit
                    )
                    .call(selection =>
                        selection
                        .transition(d3.easeElastic)
                        .delay(d => 25 * d.Latitude)
                        .attr("opacity", 0.7)
                    );
            }


            // STEP 3: OPERATOR

            // Step 3 Up
            if (step.classed("is-active", true) && response.index === 2 && response.direction === "up") {
                // Change title
                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools, color coded by operator")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools")
                    .style("opacity", "1");

                // Change subtitle
                subtitle
                    .attr("style", "display: none;")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0");

                // Change school dot color to white
                svg
                    .selectAll(".dot")
                    .attr("fill", d => colorScale(d['Operator']))
                    .transition(d3.easeElastic)
                    .delay(d => 5 * d.Latitude)
                    .attr("fill", "white")
            }

            // Step 3 Down
            if (step.classed("is-active", true) && response.index === 2 && response.direction === "down") {
                // Change title
                title = d3
                    .select("#chart1-title")
                    .text("Tribal schools")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(100)
                    .text("Tribal schools, color coded by operator")
                    .style("opacity", "1");

                // Change subtitle
                subtitle
                    .attr("style", "display: visible;")
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
        }
    }
}

export {
    Map
};