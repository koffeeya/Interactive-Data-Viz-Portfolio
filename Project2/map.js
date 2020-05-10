class Map {
    constructor(state, setGlobalState) {
        console.log(state, "Now I am constructing");

    }

    draw(state, setGlobalState) {
        console.log("Drawing", state)

        // SVG SETUP

        let svg, title, colorScale;

        colorScale = d3.scaleOrdinal().domain(state.operatorList).range(["#ff743d", "#2E86AB"]);

        svg = d3
            .select("#chart1-visual")
            .append("svg")
            .attr("width", state.width)
            .attr("height", state.height)

        title = d3
            .select("#chart1-title")
            .text("Tribal nations and schools in the United States")
            .style("opacity", "0")
            .transition(d3.easeElastic)
            .duration(200)
            .style("opacity", "1")
            .attr("fill", "#212121");

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


        // SCROLLAMA SETUP

        const scroller = scrollama();

        let step = d3.selectAll(".narrative");

        scroller
            .setup({
                step: ".narrative",
                debug: true,
                offset: 0.9,
            })
            .onStepEnter(handleStepEnter)
            .onStepExit(response => {
                console.log(response);
            })


        // SCROLLAMA STEP HANDLER

        function handleStepEnter(response) {
            step.classed("is-active");


            // STEP 1: TRIBAL LANDS

            if (step.classed("is-active", true) && response.index === 0 && response.direction === "up") {
                console.log("This is step 1 up!")

                svg
                    .selectAll(".landTribal")
                    .style("opacity", "0.5")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0")
                    .remove();
            }

            if (step.classed("is-active", true) && response.index === 0 && response.direction === "down") {
                console.log("This is step 1 down!");

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

            if (step.classed("is-active", true) && response.index === 1 && response.direction === "up") {
                console.log("This is step 2 up!")
                svg
                    .selectAll(".landUSA")
                    .attr("fill", "#212121")
                    .transition(d3.easeElastic)
                    .duration(1200)
                    .attr("fill", "#ccc")

                svg
                    .selectAll(".dot")
                    .style("opacity", "1")
                    .attr("r", "4")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .attr("r", "6")
                    .style("opacity", "0")
                    .remove();

                svg
                    .selectAll(".landTribal")
                    .attr("fill", "#9a3106")
                    .style("opacity", "0.3")
                    .transition(d3.easeElastic)
                    .duration(1200)
                    .style("opacity", "1");

            }

            if (step.classed("is-active", true) && response.index === 1 && response.direction === "down") {
                console.log("This is step 2 down!");

                svg
                    .selectAll(".landUSA")
                    .attr("fill", "#ccc")
                    .transition(d3.easeElastic)
                    .duration(600)
                    .attr("fill", "#212121")

                svg
                    .selectAll(".landTribal")
                    .attr("fill", "white")
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(600)
                    .style("opacity", "0.3");

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
                        .attr("style", "stroke: #212121; stroke-width: 0.5px")
                        .attr("fill", "white")
                        .attr("transform", d => {
                            const [x, y] = state.projectionUSA([+d.Longitude, +d.Latitude]);
                            return `translate(${x}, ${y})`;
                        })
                        .on('mouseover', function (d) {
                            d3.select(this).attr("r", "6").attr("opacity", 1);
                            d3.select(".tooltip").html("<p>" + d.School + "</p> <p>" + d.City + ", " + d.State + "</p>")
                        })
                        .on('mouseout', function (d) {
                            d3.select(this).attr("r", "4").attr("opacity", 0.7);
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
                        .transition(d3.easeElastic)
                        .delay(d => 25 * d.Latitude)
                        .attr("opacity", 0.7)
                    );

            }


            // STEP 3: OPERATOR

            if (step.classed("is-active", true) && response.index === 2 && response.direction === "up") {
                console.log("This is step 3 up!")
                svg
                    .selectAll(".dot")
                    .attr("fill", d => colorScale(d['Operator']))
                    .transition(d3.easeElastic)
                    .delay(d => 5 * d.Latitude)
                    .attr("fill", "white");

            }

            if (step.classed("is-active", true) && response.index === 2 && response.direction === "down") {
                console.log("This is step 3 down!")
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

        window.addEventListener("resize", scroller.resize);




    }
}

export {
    Map
};