class Map {
    constructor(state, setGlobalState) {

    }

    draw(state, setGlobalState) {

        // Color scale for operators
        let colorScale = d3.scaleOrdinal().domain(state.operatorList).range(["#ff743d", "#2E86AB"]);
        let incomeScale = d3.scaleOrdinal().domain(["above", "below"]).range(["#9a3106", "#b5e5f9"]);

        let subtitle = d3.select("#chart1-subtitle");
        let subtitle2 = d3
            .select("#chart1-subtitle-2")
            .style("transform", "translateY(-20px)")

        this.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        let svg = d3
            .select("#chart1-visual")
            .append("svg")
            /*.attr("preserveAspectRatio", "xMinYMin meet") */
            .attr("viewBox", "0 0 600 200")
            .append("g")
            .attr("transform", "translate(0,0)");

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
                    .attr("r", "3")
                    .attr("style", "stroke: white; stroke-width: 0.75px")
                    .attr("fill", "#aaa")
                    .attr("transform", d => {
                        const [x, y] = state.projectionUSA([+d.Longitude, +d.Latitude]);
                        return `translate(${x}, ${y})`;
                    })
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                            .attr("style", "stroke: #ff743d; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer");

                        // tooltip
                        d3.select('body')
                            .append('div')
                            .attr('class', 'map-tooltip')
                            .attr('style', 'position: absolute;')
                            .style('left', (d3.event.pageX + 10) + 'px')
                            .style('top', d3.event.pageY + 'px')
                            .html("<b>" + d.School + "</b><br>" + d.City + ", " + d.State)
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9);

                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                            .attr("style", "stroke: white; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "default")

                        // tooltip
                        d3.selectAll(".map-tooltip")
                            .remove();
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
                offset: 0.8,
            })
            .onStepEnter(handleStepEnter)


        // SCROLLAMA STEP HANDLER
        function handleStepEnter(response) {
            step.classed("is-active");

            // STEP 1 DOWN
            if (step.classed("is-active", true) && response.index === 0 && response.direction === "down") {

                // Add school dots and mouseover events
                svg
                    .selectAll(".dot")
                    .style("opacity", 0)
                    .transition(d3.easeElastic)
                    .delay(d => 5 * d.Latitude)
                    .style("opacity", 1)
            }


            // STEP 2 DOWN
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

                subtitle2
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0");

                // Change school dot color to scale by operator
                const dot = svg
                    .selectAll(".dot")
                    .call(selection =>
                        selection
                        .attr("fill", "#aaa")
                        .transition(d3.easeElastic)
                        .delay(d => 10 * d.Latitude)
                        .attr("fill", d => colorScale(d['Operator']))
                    );
            }


            // STEP 3 DOWN
            if (step.classed("is-active", true) && response.index === 2 && response.direction === "down") {
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
                    .text("Tribal schools, by average county per capita income")
                    .style("opacity", "1");

                // Change subtitle
                subtitle
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0");

                subtitle2
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1");

                // Change school dot color to scale by income
                const dot = svg
                    .selectAll(".dot")
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                        .attr("style", "stroke: #ff743d; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer");
                        // tooltip
                        d3.select('body')
                            .append('div')
                            .attr('class', 'map-tooltip')
                            .attr('style', 'position: absolute;')
                            .style('left', (d3.event.pageX + 10) + 'px')
                            .style('top', d3.event.pageY + 'px')
                            .html("<b>" + d.School + "</b><br>" + d.City + ", " + d.State + "<br><br>$" + formatNumber(d.Income) + " per capita income in " + d.County + " county")
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9);
                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                        .attr("style", "stroke: white; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "default")
                        // tooltip
                        d3.selectAll(".map-tooltip")
                            .remove();
                    })
                    .call(selection =>
                        selection
                        .attr("fill", d => colorScale(d['Operator']))
                        .transition(d3.easeElastic)
                        .delay(d => 10 * d.Latitude)
                        .attr("fill", d => incomeScale(d['category']))
                    );
            }


            // STEP 1 UP
            if (step.classed("is-active", true) && response.index === 0 && response.direction === "up") {

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
                    .style("opacity", 0);

                subtitle2
                    .style("opacity", 0);

                svg
                    .selectAll(".dot")
                    .attr("fill", d => colorScale(d['Operator']))
                    .transition(d3.easeElastic)
                    .delay(d => 5 * d.Latitude)
                    .attr("fill", "#aaa")
            }



            // STEP 2 UP
            if (step.classed("is-active", true) && response.index === 1 && response.direction === "up") {
                // Change title

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

                // Change subtitle
                subtitle
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1");

                subtitle2
                    .style("opacity", "1")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "0");

                // Change school dot color to white
                const dot = svg
                    .selectAll(".dot")
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                        .attr("style", "stroke: #ff743d; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer");
                        // tooltip
                        
                        d3.select('body')
                            .append('div')
                            .attr('class', 'map-tooltip')
                            .attr('style', 'position: absolute;')
                            .style('left', (d3.event.pageX + 10) + 'px')
                            .style('top', d3.event.pageY + 'px')
                            .html("<b>" + d.School + "</b><br>" + d.City + ", " + d.State)
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9);
                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                        .attr("style", "stroke: white; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "default")
                        // tooltip
                        d3.selectAll(".map-tooltip")
                            .remove();
                    })
                    .call(selection =>
                        selection
                        .attr("fill", d => incomeScale(d['category']))
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
                    .style("opacity", "1");

                subtitle
                    .style("display", "visible");

                subtitle2
                    .style("opacity", "0")
                    .transition(d3.easeElastic)
                    .duration(300)
                    .style("opacity", "1");

                const dot = svg
                    .selectAll(".dot")
                    .on('mouseover', function (d) {
                        // dot
                        d3.select(this)
                        .attr("style", "stroke: #ff743d; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "pointer");
                        // tooltip
                        d3.select('body')
                            .append('div')
                            .attr('class', 'map-tooltip')
                            .attr('style', 'position: absolute;')
                            .style('left', (d3.event.pageX + 10) + 'px')
                            .style('top', d3.event.pageY + 'px')
                            .html("<b>" + d.School + "</b><br>" + d.City + ", " + d.State + "<br><br>$" + formatNumber(d.Income) + " per capita income in " + d.County + " county")
                            .style("opacity", 0)
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9);
                    })
                    .on('mouseout', function (d) {
                        // dot
                        d3.select(this)
                        .attr("style", "stroke: white; stroke-width: 0.75px")
                            .attr("opacity", 1)
                            .attr("cursor", "default")
                        // tooltip
                        d3.selectAll(".map-tooltip")
                            .remove();
                    })
                    .call(selection =>
                        selection
                        .transition(d3.easeElastic)
                        .delay(d => 10 * d.Latitude)
                        .attr("fill", d => incomeScale(d['category']))
                    );
            }




        }

        // Format numbers with commas (syntax: formatNumber(1000) = 1,000)
        let formatNumber = d3.format(",")
    }
}

export {
    Map
};