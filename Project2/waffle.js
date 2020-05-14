class Waffle {

    constructor(state, setGlobalState) {

    }

    draw(state, setGlobalState) {

        console.log(state.geoTribal);

        /* CONSTANTS */

        // Dimensions of the SVG canvas
        let canvasWidth = state.width / 2.1
        let canvasHeight = state.height * 0.8

        // Number of items in each waffle, and the cols and rows
        let numItems = state.allMath.length
        let numCols = 7
        let numRows = Math.floor(numItems / numCols) + 1 // to cover overflow

        // Dimensions of each waffle column and waffle row
        let waffleWidth = canvasWidth / numCols
        let waffleHeight = canvasHeight / numRows

        // Color scales
        let waffleMathColor = d3.scaleOrdinal().domain([0, 1, 2]).range([ "grey", "#cccccc", "#2E86AB" ]);
        let waffleELAColor = d3.scaleOrdinal().domain([0, 1, 2]).range(["grey", "#cccccc", "#EDAE49"]);



        /* SELECTIONS & SETUP */

        let filter = {
            math: state.allMath,
            ela: state.allELA,
            mathMaj: 12,
            elaMaj: 26,
        }

        // Chart titles
        let leftTitle = d3.select("#chart2-left-title");
        let rightTitle = d3.select("#chart2-right-title");
        let leftSubtitle = d3.select("#chart2-left-subtitle");
        let rightSubtitle = d3.select("#chart2-right-subtitle");

        // Dropdown Setup
        let selectPopulation = d3
            .select("#pop-dropdown")
            .selectAll("option")
            .data(state.populationList)
            .join("option")
            .attr("value", (d) => d)
            .text((d) => d);



        /* CHART CREATION FUNCTIONS */

        // Choose the right dataset based on filter
        function chooseDataset() {
            if (state.selectedPop === "All Students") {
                filter.math = state.allMath;
                filter.ela = state.allELA;
                state.selectedCount = state.allMath.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
            } else if (state.selectedPop === "Economic Disadvantaged") {
                filter.math = state.mathEcon;
                filter.ela = state.elaEcon;
                state.selectedCount = state.mathEcon.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
            } else if (state.selectedPop === "English Learners") {
                filter.math = state.mathEng;
                filter.ela = state.elaEng;
                state.selectedCount = state.mathEng.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
            } else if (state.selectedPop === "Female") {
                filter.math = state.mathFemale;
                filter.ela = state.elaFemale;
                state.selectedCount = state.mathFemale.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
            } else if (state.selectedPop === "Male") {
                filter.math = state.mathMale;
                filter.ela = state.elaMale;
                state.selectedCount = state.mathMale.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
            } else if (state.selectedPop === "Students with Disabilities") {
                filter.math = state.mathDis;
                filter.ela = state.elaDis;
                state.selectedCount = state.mathDis.length;
                filter.mathMaj = d3.sum(filter.math, d => d.majority);
                filter.elaMaj = d3.sum(filter.ela, d => d.majority);
            }
        }

        // Create the waffle
        function createWaffle(canvas, key, data, colorscale) {

            canvas
                .selectAll("rect")
                .remove();

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
                .attr("opacity", 0)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("opacity", "0.5")
                        .style("cursor", "pointer")
                        
                    d3.select("#chart2-tooltip")
                        .style("opacity", 1)
                        .html("<b>" + d.School + "</b><br><br><b>" + Math.floor(d.PercentMeet * 100) + "% </b>of students in the selected population <b>(" + d.Population + ")</b> are proficient in <b>" + d.Subject + "</b><br><br><p id='tooltip-small'>Located in " + d.City + ", " + d.State + " | " + d.N + " students tested (" + Math.floor(d.ParticipationRate * 100) + "% of population)</p>")
                })
                .on("mouseout" , function (d) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .style("opacity", "1")

                    d3.select("#chart2-tooltip")
                        .style("opacity", "0")
                })
                .transition()
                .delay(d => d.Index)
                .attr("opacity", 1)
        }

        // Transition the title of the waffle
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

        // Draw each waffle, title, and subtitle
        changeTitle(leftTitle, "MATH");
        changeTitle(rightTitle, "READING (ELA)");

        function drawWaffles() {
            createWaffle(waffleLeft, "d.School", filter.math, waffleMathColor);
            createWaffle(waffleRight, "d.School", filter.ela, waffleELAColor);
            // Update subtitles
            changeTitle(leftSubtitle, state.selectedPop + " | " + filter.mathMaj + " out of " + state.selectedCount + " tribal schools had at least half of students in the chosen population test proficient in math.");
            changeTitle(rightSubtitle, state.selectedPop + " | " + filter.elaMaj + " out of " + state.selectedCount + " tribal schools had at least half of students in the chosen population test proficient in reading.");
        }


        /* EVENT LISTENER */

        // Set up math SVG canvas
        let waffleLeft = d3
            .select("#chart2-left")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .append("g");


        // Set up ELA SVG canvas
        let waffleRight = d3
            .select("#chart2-right")
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .append("g");

        chooseDataset();
        drawWaffles();


        selectPopulation = d3
            .select("#pop-dropdown")
            .on("change", function () {
                state.selectedPop = this.value;
                chooseDataset();
                drawWaffles();
            })

    }
}

export {
    Waffle
};