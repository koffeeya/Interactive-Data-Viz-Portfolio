class Waffle {

    constructor(state, setGlobalState) {

        this.canvasWidth = 600
        this.canvasHeight = 600

    }

    draw(state, setGlobalState) {

        /* STATE & CONSTANTS */

        // State of the waffle
        let filter = {
            math: state.allMath,
            ela: state.allELA,
            mathMaj: 12,
            elaMaj: 26,
            mathAbove: 0,
            mathBelow: 0,
            elaAbove: 0,
            elaBelow: 0,
        }

        // Number of items in each waffle, and the cols and rows
        let numItems = state.allMath.length
        let numCols = 7
        let numRows = Math.floor(numItems / numCols) + 1 // to cover overflow

        // Dimensions of each waffle column and waffle row
        let waffleWidth = this.canvasWidth / numCols
        let waffleHeight = this.canvasHeight / numRows

        // Color scales
        let waffleMathColor = d3.scaleOrdinal().domain([0, 1, 2]).range(["grey", "#cccccc", "#2E86AB"]);
        let waffleELAColor = d3.scaleOrdinal().domain([0, 1, 2]).range(["grey", "#cccccc", "#EDAE49"]);

        console.log(this.canvasWidth)



        /* SELECTIONS & SETUP */

        // Set up math SVG canvas
        let waffleLeft = d3
            .select("#chart2-left")
            .append("svg")
            .attr("viewBox", "0 0 700 700")
            .append("g")
            .attr("transform", "translate(0,0)");

        // Set up ELA SVG canvas
        let waffleRight = d3
            .select("#chart2-right")
            .append("svg")
            .attr("viewBox", "0 0 700 700")
            .append("g")
            .attr("transform", "translate(0,0)");

        // Chart titles
        let leftTitle = d3.select("#chart2-left-title");
        let rightTitle = d3.select("#chart2-right-title");
        let leftSubtitle = d3.select("#chart2-left-subtitle");
        let rightSubtitle = d3.select("#chart2-right-subtitle");

        // Chart topline numbers
        let mathAboveNum = d3.select("#math-above-num")
        let mathBelowNum = d3.select("#math-below-num")
        let elaAboveNum = d3.select("#ela-above-num")
        let elaBelowNum = d3.select("#ela-below-num")

        // Dropdown Setup
        let selectPopulation = d3
            .select("#pop-dropdown-waffle")
            .selectAll("option")
            .data(state.populationList)
            .join("option")
            .attr("value", (d) => d)
            .text((d) => d);




        /* CHART CREATION FUNCTIONS */

        // Format numbers with commas (syntax: formatNumber(1000) = 1,000)
        let formatNumber = d3.format(",")

        // Set waffle state based on chosen population
        function chooseWaffleDataset() {
            // All students
            if (state.selectedPop === "All Students") {
                filter.math = state.allMath.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                filter.ela = state.allELA.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                state.selectedCount = state.allMath.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
                filter.mathAbove = d3.sum(filter.math, d => d.NumProf);
                filter.mathBelow = d3.sum(filter.math, d => d.NumBelow);
                filter.elaAbove = d3.sum(filter.ela, d => d.NumProf);
                filter.elaBelow = d3.sum(filter.ela, d => d.NumBelow);
                // Economic disadvantaged
            } else if (state.selectedPop === "Economic Disadvantaged") {
                filter.math = state.mathEcon.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                filter.ela = state.elaEcon.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                state.selectedCount = state.mathEcon.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
                filter.mathAbove = d3.sum(filter.math, d => d.NumProf);
                filter.mathBelow = d3.sum(filter.math, d => d.NumBelow);
                filter.elaAbove = d3.sum(filter.ela, d => d.NumProf);
                filter.elaBelow = d3.sum(filter.ela, d => d.NumBelow);
                // English learners
            } else if (state.selectedPop === "English Learners") {
                filter.math = state.mathEng.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                filter.ela = state.elaEng.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                state.selectedCount = state.mathEng.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
                filter.mathAbove = d3.sum(filter.math, d => d.NumProf);
                filter.mathBelow = d3.sum(filter.math, d => d.NumBelow);
                filter.elaAbove = d3.sum(filter.ela, d => d.NumProf);
                filter.elaBelow = d3.sum(filter.ela, d => d.NumBelow);
                // Female
            } else if (state.selectedPop === "Female") {
                filter.math = state.mathFemale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                filter.ela = state.elaFemale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                state.selectedCount = state.mathFemale.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
                filter.mathAbove = d3.sum(filter.math, d => d.NumProf);
                filter.mathBelow = d3.sum(filter.math, d => d.NumBelow);
                filter.elaAbove = d3.sum(filter.ela, d => d.NumProf);
                filter.elaBelow = d3.sum(filter.ela, d => d.NumBelow);
                // Male
            } else if (state.selectedPop === "Male") {
                filter.math = state.mathMale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                filter.ela = state.elaMale.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                state.selectedCount = state.mathMale.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
                filter.mathAbove = d3.sum(filter.math, d => d.NumProf);
                filter.mathBelow = d3.sum(filter.math, d => d.NumBelow);
                filter.elaAbove = d3.sum(filter.ela, d => d.NumProf);
                filter.elaBelow = d3.sum(filter.ela, d => d.NumBelow);
                // Students with disabilities
            } else if (state.selectedPop === "Students with Disabilities") {
                filter.math = state.mathDis.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                filter.ela = state.elaDis.sort((a, b) => {
                    return d3.descending(a.PercentMeet, b.PercentMeet)
                });
                state.selectedCount = state.mathDis.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
                filter.mathAbove = d3.sum(filter.math, d => d.NumProf);
                filter.mathBelow = d3.sum(filter.math, d => d.NumBelow);
                filter.elaAbove = d3.sum(filter.ela, d => d.NumProf);
                filter.elaBelow = d3.sum(filter.ela, d => d.NumBelow);
            }
        }


        // Create the waffle
        function createWaffle(canvas, key, data, colorscale) {

            // Clear the waffle before redrawing
            canvas
                .selectAll("rect")
                .remove();

            // Draw the waffle
            canvas
                .selectAll(".rect")
                .data(data, d => key)
                .enter()
                .append("rect")
                .attr("width", waffleWidth * 0.95)
                .attr("height", waffleHeight * 0.95)
                .attr("x", (d, i) => {
                    let rowIndex = Math.floor(i / numRows)
                    return (rowIndex * waffleWidth)
                })
                .attr("y", (d, i) => {
                    let colIndex = i % numRows
                    return (colIndex * waffleHeight)
                })

                .style("fill", d => colorscale(d.category))
                .attr("id", function(d, i) {return d.School.replace(/[^A-Z0-9]/ig, "")})
                .attr("opacity", 0)
                .on("mouseover", function (d) {
                    d3.selectAll("#" + this.id)
                        .style("opacity", "0.5")
                        .style("cursor", "pointer")

                    // tooltip
                d3.select('body')
                    .append('div')
                    .attr('class', 'waffle-tooltip')
                    .attr('style', 'position: absolute;')
                    .style('left', (d3.event.pageX + 10) + 'px')
                    .style('top', d3.event.pageY + 'px')
                    .html("<b style='font-size: 18px;'>" + d.School + "</b><br>" + d.City + ", " + d.State + "<br><br><b style='font-size: 18px; color: white;'>" + Math.floor(d.PercentMeet * 100) + "%</b><b> of the chosen population in this school (" + state.selectedPop + ") is proficient in " + d.Subject + "</b>")
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
        }


        // Transition the text of the waffle
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


        // Draw each title and subtitle
        changeTitle(leftTitle, "MATH");
        changeTitle(rightTitle, "READING (ELA)");


        // DRAW THE WAFFLES
        function drawWaffles() {
            // Create waffles
            createWaffle(waffleLeft, "d.School", filter.math, waffleMathColor);
            createWaffle(waffleRight, "d.School", filter.ela, waffleELAColor);

            // Update subtitles
            changeTitle(leftSubtitle, state.selectedPop + " | " + filter.mathMaj + " out of " + state.selectedCount + " tribal schools had at least half of students in the chosen population test proficient in math.");
            changeTitle(rightSubtitle, state.selectedPop + " | " + filter.elaMaj + " out of " + state.selectedCount + " tribal schools had at least half of students in the chosen population test proficient in reading.");

            // Update topline numbers
            changeTitle(mathAboveNum, formatNumber(filter.mathAbove));
            changeTitle(mathBelowNum, formatNumber(filter.mathBelow));
            changeTitle(elaAboveNum, formatNumber(filter.elaAbove));
            changeTitle(elaBelowNum, formatNumber(filter.elaBelow));
        }

        // Call functions for inital setup
        chooseWaffleDataset();
        drawWaffles();

       /* EVENT LISTENER ON POPULATION DROPDOWN */
        selectPopulation = d3
            .select("#pop-dropdown-waffle")
            .on("change", function () {
                state.selectedPop = this.value;
                chooseWaffleDataset();
                drawWaffles();
            })

    
    }
}

export {
    Waffle
};