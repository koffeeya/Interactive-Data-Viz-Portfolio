class Bar {

    constructor(state, setGlobalState) {}

    draw(state, setGlobalState) {

        /* STATE & CONSTANTS */

        // State of the bar charts
        let barState = {
            math: state.allMath,
            ela: state.allELA,
            selectedPop: "All Students"
        }

        // Dimensions of the SVG canvas
        let canvasWidth = state.width
        let canvasHeight = state.height

        let svgMath = d3
            .select("#chart3-visual-1")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight * 0.5);

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

        // Color scales
        let waffleMathColor = d3.scaleOrdinal().domain([0, 1, 2]).range(["grey", "#ddd", "#2E86AB"]);

        let chart3Text = d3.select("#chart3-tooltip-1")

        function chooseBarDataset() {
            // All students
            if (barState.selectedPop === "All Students") {
                barState.math = state.allMath.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                barState.ela = state.allELA.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                // Economic disadvantaged
            } else if (barState.selectedPop === "Economic Disadvantaged") {
                barState.math = state.mathEcon.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                barState.ela = state.elaEcon.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                // English learners
            } else if (barState.selectedPop === "English Learners") {
                barState.math = state.mathEng.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                barState.ela = state.elaEng.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                // Female
            } else if (barState.selectedPop === "Female") {
                barState.math = state.mathFemale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                barState.ela = state.elaFemale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                // Male
            } else if (barState.selectedPop === "Male") {
                barState.math = state.mathMale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                barState.ela = state.elaMale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                // Students with disabilities
            } else if (barState.selectedPop === "Students with Disabilities") {
                barState.math = state.mathDis.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                barState.ela = state.elaDis.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
            }
        }


        function createBar(canvas, data, xLabel, titleID, newTitle, subtitleID, newSubtitle, colorscale, ) {
            canvas.selectAll("rect")
                .remove();

            canvas.selectAll("path")
                .remove();

            canvas.select(".avg-subtitle")
                .remove();

            canvas.select(".national-subtitle")
                .remove();

            // Sort the data by percent that are proficient and bus distance
            data.sort((a, b) => {
                    return d3.descending(b.PercentMeet, a.PercentMeet)
                })
                .sort((a, b) => {
                    return d3.descending(b.BusDistance, a.BusDistance)
                });

            let margin = {
                top: 0,
                bottom: 0,
                left: 40,
                right: 0
            };

            xScale = d3
                .scaleBand()
                .domain(data.map(d => d.School))
                .range([canvasWidth - margin.right, margin.left]);

            yScale = d3
                .scaleLinear()
                .domain([0, 2665]) // hard coded max distance to keep scale the same
                .range([margin.top, canvasHeight - margin.bottom])

            // DRAW
            let bar = canvas
                .selectAll(".bar")
                .data(data, key => key)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d.School))
                .attr("y", yScale(d => d.BusDistance))
                .attr("width", xScale.bandwidth())
                .attr("height", d => yScale(d.BusDistance))
                .style("fill", d => colorscale(d.category))
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
                        .html("The average bus at <b>" + d.School + "</b> in " + d.City + ", " + d.State + " travels a distance of <b>" + d.BusDistance + " miles</b> per day to get students to school.")
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

            let subtitleVar = d3.select(subtitleID)
                .style("opacity", "1")
                .transition(d3.easeElastic)
                .duration(200)
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(200)
                .text(newSubtitle)
                .style("opacity", "1");

            const average = d3.sum(data, d => d.BusDistance) / data.length;

            let avgLine = d3.line()
                .x(function (d, i) {
                    return xScale(d.School);
                })
                .y(function (d, i) {
                    return yScale(average);
                });

            let nationalLine = d3.line()
                .x(function (d, i) {
                    return xScale(d.School);
                })
                .y(function (d, i) {
                    return yScale(74);
                });

            canvas.append("path")
                .datum(data)
                .attr("class", "mean")
                .attr("d", avgLine)
                .on("mouseover", function (d) {
                    d3.select(".mean")
                        .style("stroke", "#9a3106")
                        .attr("pointer", "cursor")
                })
                .on("mouseout", function (d) {
                    d3.select(".mean")
                        .style("stroke", "#ff743d")
                })
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(800)
                .style("opacity", "0.4");

            canvas
                .append("text")
                .attr("class", "avg-subtitle")
                .attr("transform", "translate(" + (canvasWidth - 3) + "," + yScale(average) + ")")
                .attr("dy", "1.2em")
                .attr("text-anchor", "end")
                .style("fill", "#ff743d")
                .html("Average distance for population: " + Math.floor(average) + " miles")
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(200)
                .style("opacity", "0.7");

            canvas.append("path")
                .datum(data)
                .attr("class", "national-avg")
                .attr("d", nationalLine)
                .on("mouseover", function (d) {
                    d3.select(".national-avg")
                        .style("stroke", "black")

                    canvas
                        .append("text")
                        .attr("class", "national-subtitle")
                        .attr("transform", "translate(" + (canvasWidth - 3) + "," + yScale(74) + ")")
                        .attr("dy", "1.2em")
                        .attr("text-anchor", "end")
                        .style("fill", "black")
                        .html("National average distance: " + 74 + " miles")
                        .style("opacity", "0")
                        .transition(d3.easeElastic)
                        .duration(200)
                        .style("opacity", "0.7");
                })
                .on("mouseout", function (d) {
                    d3.select(".national-avg")
                        .style("stroke", "#aaa")

                    d3.select(".national-subtitle")
                        .style("opacity", "0.7")
                        .transition(d3.easeElastic)
                        .duration(100)
                        .style("opacity", "0")
                        .remove();
                })
                .style("opacity", "0")
                .transition(d3.easeElastic)
                .duration(800)
                .style("opacity", "0.4");

            


        }


        

        function drawBars() {
            createBar(svgMath, barState.math, "Average Daily Bus Distance", "#chart3-title", "How far does a school bus have to travel per day to get students to school?", "#chart3-subtitle", "Each bar represents one school, colored by % proficiency in math or reading. Blue or yellow = more than 50% of the population was proficient in the subject. Dark Gray = 0% proficiency.", waffleMathColor);
        }
        
        chooseBarDataset();
        drawBars();

        let selectPopulation = d3
            .select("#pop-dropdown-waffle")
            .on("change", function () {
                barState.selectedPop = this.value;
                chooseBarDataset();
                drawBars();
            })


            


    }
}

export {
    Bar
};