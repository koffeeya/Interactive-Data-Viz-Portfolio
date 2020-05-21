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
        this.canvasWidth = state.width
        this.canvasHeight = state.height * 0.5

        this.svgMath = d3
            .select("#chart3-visual-1")
            .append("svg")
            .attr("width", this.canvasWidth)
            .attr("height", this.canvasHeight);

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

    }

    // Update the bar chart state
    chooseBarDataset(state, setGlobalState) {
        // All students
        if (this.barState.selectedPop === "All Students") {
            this.barState.math = this.state.allMath.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = this.state.allELA.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Economic disadvantaged
        } else if (this.barState.selectedPop === "Economic Disadvantaged") {
            this.barState.math = state.mathEcon.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaEcon.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // English learners
        } else if (this.barState.selectedPop === "English Learners") {
            this.barState.math = state.mathEng.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaEng.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Female
        } else if (this.barState.selectedPop === "Female") {
            this.barState.math = state.mathFemale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaFemale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Male
        } else if (this.barState.selectedPop === "Male") {
            this.barState.math = state.mathMale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            this.barState.ela = state.elaMale.sort((a, b) => {
                return d3.descending(a.PercentMeet, b.PercentMeet)
            });
            // Students with disabilities
        } else if (this.barState.selectedPop === "Students with Disabilities") {
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

        console.log(state)

        // Sort the data by percent that are proficient and bus distance
        data = data
            .filter(d => {return d.BusDistance > 0})
            .sort((a, b) => {
                return d3.descending(b.PercentMeet, a.PercentMeet)
            })
            .sort((a, b) => {
                return d3.descending(b.BusDistance, a.BusDistance)
            });

        let height = this.canvasHeight - this.margin.top - this.margin.bottom
        let width = this.canvasWidth - this.margin.left - this.margin.right

        console.log("dimensions", height, width)

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
            })
            .on("mouseout", function (d) {
                d3.selectAll("#" + this.id)
                    .transition(d3.easeElastic)
                    .duration(50)
                    .style("opacity", "1")

                d3.select("#chart3-tooltip")
                    .html("The average bus at <b>" + d.School + "</b> in " + d.City + ", " + d.State + " travels a distance of <b>" + d.BusDistance + " miles</b> per day to get students to school.")
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

        // Transition the subtitle
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

    }

    // Update the state and draw the bar chart
    draw(state, setGlobalState) {



        // Update state data
        this.chooseBarDataset();

        // Clear out the bar chart
        this.clearBar(this.svgMath);

        // Draw the bar: canvas, data, titleID, newTitle, subtitleID, newSubtitle, colorscale
        this.createBar(this.svgMath, 
            this.barState.math,
            "#chart3-title", 
            "Average Miles School Bus Travels Per Day",
            "#chart3-subtitle", 
            "", 
            this.waffleMathColor,state, setGlobalState);
    }
}

export {
    Bar
};