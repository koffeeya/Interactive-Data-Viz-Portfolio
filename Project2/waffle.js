class Waffle {

    constructor(state, setGlobalState) {

    }

    draw(state, setGlobalState) {

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
        let waffleMathColor = d3.scaleLinear().domain([0, 1]).range(["#cccccc", "#2E86AB"]);
        let waffleELAColor = d3.scaleLinear().domain([0, 1]).range(["#cccccc", "#EDAE49"]);



        /* SELECTIONS & SETUP */

        let filteredData = {
            math: state.allMath,
            ela: state.allELA,
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
                filteredData.math = state.allMath;
                filteredData.ela = state.allELA;
                state.selectedCount = state.allMath.length;
            } else if (state.selectedPop === "Economic Disadvantaged") {
                filteredData.math = state.mathEcon;
                filteredData.ela = state.elaEcon;
                state.selectedCount = state.mathEcon.length;
            } else if (state.selectedPop === "English Learners") {
                filteredData.math = state.mathEng;
                filteredData.ela = state.elaEng;
                state.selectedCount = state.mathEng.length;
            } else if (state.selectedPop === "Female") {
                filteredData.math = state.mathFemale;
                filteredData.ela = state.elaFemale;
                state.selectedCount = state.mathFemale.length;
            } else if (state.selectedPop === "Male") {
                filteredData.math = state.mathMale;
                filteredData.ela = state.elaMale;
                state.selectedCount = state.mathMale.length;
            } else if (state.selectedPop === "Students with Disabilities") {
                filteredData.math = state.mathDis;
                filteredData.ela = state.elaDis;
                state.selectedCount = state.mathDis.length;
            }
        }

        // Create the waffle
        function createWaffle(canvas, key, data, colorscale, colorkey) {
            canvas
                .selectAll("rect")
                .remove();

            canvas
                .selectAll(".rect")
                .data(data, d => key)
                .enter()
                .append("rect")
                .attr("width", waffleWidth * 0.9)
                .attr("height", waffleHeight * 0.9)
                .attr("x", (d, i) => {
                    let rowIndex = Math.floor(i / numRows)
                    return (rowIndex * waffleWidth)
                })
                .attr("y", (d, i) => {
                    let colIndex = i % numRows
                    return (colIndex * waffleHeight)
                })
                .style("fill", d => colorscale(d.majority))
                .attr("opacity", 0)
                .transition()
                .delay(d => d.Index)
                .attr("opacity", 1);
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
        changeTitle(rightTitle, "READING");

        function drawWaffles() {
            createWaffle(waffleLeft, "d.School", filteredData.math, waffleMathColor);
            createWaffle(waffleRight, "d.School", filteredData.ela, waffleELAColor);
            // Update subtitles
            changeTitle(leftSubtitle, state.selectedPop + " | Showing results for " + state.selectedCount + " tribal schools from 2015-16.");
            changeTitle(rightSubtitle, state.selectedPop + " | Showing 2015-16 results for " + state.selectedCount + " tribal schools from 2015-16.");
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