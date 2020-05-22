class Bar {

    constructor(state, setGlobalState) {

        this.state = state;

        // State of the bar charts
        this.barState = {
            math: state.allMath,
            ela: state.allELA,
            selectedPop: "All Students",
        }

        // Dimensions of the SVG canvas
        this.canvasWidth = 700;
        this.canvasHeight = 300;

        this.svgMath = d3
            .select("#chart3-visual-1")
            .append("svg")
            .attr("class", "bar-svg")
            .attr("viewBox", "0 0 700 400")
            .append("g")
            .attr("transform", "translate(0,0)");

        // Color scale for bar chart
        this.waffleMathColor = d3.scaleOrdinal().domain([0, 1, 2]).range(["grey", "#cccccc", "#2E86AB"]);

        // Format numbers with commas (syntax: formatNumber(1000) = 1,000)
        this.formatNumber = d3.format(",")

        // Define chart margins
        this.margin = {
            top: 10,
            bottom: 10,
            left: 45,
            right: 10
        };

        // Dropdown Setup
        let selectPopulation = d3
            .selectAll("#pop-dropdown-bar")

        selectPopulation
            .selectAll("option")
            .data(state.populationList)
            .join("option")
            .attr("value", (d) => d)
            .text((d) => d)

        selectPopulation = d3
        .select("#pop-dropdown-bar")
            .on("change", function () {
                barstate = this.value;
                console.log(barstate);
                drawBar;
            });
    }

    // Update the bar chart state
    chooseBarDataset(state, setGlobalState) {
        console.log("choosing bar dataset")

        // All students
        if (state.selectedPop === "All Students") {
            this.barState.math = this.state.allMath.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = this.state.allELA.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Economic disadvantaged
        } else if (state.selectedPop === "Economic Disadvantaged") {
            this.barState.math = state.mathEcon.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaEcon.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // English learners
        } else if (state.selectedPop === "English Learners") {
            this.barState.math = state.mathEng.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaEng.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Female
        } else if (state.selectedPop === "Female") {
            this.barState.math = state.mathFemale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaFemale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Male
        } else if (state.selectedPop === "Male") {
            this.barState.math = state.mathMale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaMale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Students with disabilities
        } else if (state.selectedPop === "Students with Disabilities") {
            this.barState.math = state.mathDis.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaDis.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
        }
    }

    // Clear bar chart contents
    clearBar(canvas) {
        canvas.selectAll("rect")
            .remove();

        canvas.selectAll("path")
            .remove();

        canvas.select(".avg-subtitle")
            .remove();

        canvas.select(".national-subtitle")
            .remove();
    }

    // Create the bar chart
    createBar(canvas, data, titleID, newTitle, subtitleID, newSubtitle, colorScale, state, setGlobalState) {

        // Sort the data by percent that are proficient and bus distance
        data = data
            .filter(d => {return d.BusDistance > 0})
            .sort((a, b) => {
                return d3.descending(b.PercentMeet, a.PercentMeet)
            })
            .sort((a, b) => {
                return d3.descending(b.BusDistance, a.BusDistance)
            });

        let height = this.canvasHeight
        let width = this.canvasWidth

        // Set the xScale and yScale of the bar chart
        let xScale = d3
            .scaleBand()
            .domain(data.map(d => d.School))
            .range([this.margin.left, width]);

        let yScale = d3
            .scaleLinear()
            .domain([0, 2665]) // hard coded max distance to 2665 to keep scale the same
            .range([height, this.margin.top])

         // Y Axis
         let yAxis = canvas
         .append("g")
         .attr("class", "y axis")
         .call(d3.axisLeft(yScale).ticks(5))
         .attr("transform", "translate(40, 0)")
         .style("opacity", 0)
         .transition()
         .duration(400)
         .style("opacity", 1);

        // Draw bar chart
        let bar = canvas
            .selectAll(".bar")
            .data(data, key => key)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.School))
            .attr("y", d => yScale(d.BusDistance))
            .attr("width", xScale.bandwidth())
            .attr("height", d => (height - yScale(d.BusDistance)))
            .style("fill", d => colorScale(d.category))
            .attr("opacity", 0)
            .attr("id", function (d, i) {
                return d.School.replace(/[^A-Z0-9]/ig, "")
            })
            .on("mouseover", function (d) {
                d3.selectAll("#" + this.id)
                    .style("opacity", "0.5")

                // tooltip
                d3.select('body')
                    .append('div')
                    .attr('class', 'waffle-tooltip')
                    .attr('style', 'position: absolute;')
                    .style('left', (d3.event.pageX - 40) + 'px')
                    .style('top', (d3.event.pageY - 250) + 'px')
                    .html("<b style='font-size: 18px;'>" + d.School + "</b><br>" + d.City + ", " + d.State + "<br><br>Buses have to travel an average of <b style='font-size: 14px; color: white;'>" + Math.floor(d.BusDistance) + " miles</b> to take students to this school per day <br><br><b style='font-size: 10px; font-weight: 400;'>" + Math.floor(d.PercentMeet * 100) + "% of the chosen population in this school (" + state.selectedPop + ") is proficient in " + d.Subject + "</b>")
                    .style("opacity", 0)
                    .transition()
                    .duration(200)
                    .style("opacity", 0.9);
            })
            .on("mouseout", function (d) {
                d3.selectAll("#" + this.id)
                    .transition(d3.easeElastic)
                    .duration(50)
                    .style("opacity", "1")

                d3.selectAll(".waffle-tooltip")
                    .remove();
            })
            .transition()
            .delay(d => d.Index)
            .attr("opacity", 1)

        // Transition the title
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

        // Define the average
        const average = d3.sum(data, d => d.BusDistance) / data.length;

        // Tribal school average line function
        let avgLine = d3.line()
            .x(function (d, i) {
                return xScale(d.School);
            })
            .y(function (d, i) {
                return yScale(average);
            });

            canvas.append("path")
            .datum(data)
            .attr("class", "mean")
            .attr("d", avgLine)
            .style("opacity", "0")
            .transition(d3.easeElastic)
            .duration(800)
            .style("opacity", "0.4");

        canvas
            .append("text")
            .attr("class", "avg-subtitle")
            .attr("transform", "translate(" + (width - 3) + "," + yScale(average) + ")")
            .attr("dy", "1.2em")
            .attr("text-anchor", "end")
            .style("fill", "#212121")
            .html("Average distance for population (" + state.selectedPop + "): " + Math.floor(average) + " miles")
            .style("opacity", "0")
            .transition(d3.easeElastic)
            .duration(200)
            .style("opacity", "1");

    }

    // Update the state and draw the bar chart
    draw(state, setGlobalState) {

        // Update state data
        this.chooseBarDataset(state, setGlobalState);

        // Clear out the bar chart
        this.clearBar(this.svgMath);

        // Draw the bar: canvas, data, titleID, newTitle, subtitleID, newSubtitle, colorscale
        this.createBar(this.svgMath, 
            this.barState.math,
            "#chart3-title", 
            "Average Miles School Bus Travels Per Day",
            "#chart3-subtitle", 
            "Bars are colored by Math test proficiency. Blue: >50% of the population was proficient in 2016; Dark Gray: 0% proficiency.", 
            this.waffleMathColor,state, setGlobalState);
    }

    
    
}

export {
    Bar
};