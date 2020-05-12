class Waffle {
    constructor(state, setGlobalState) {
        console.log("constructing!")

    }

    draw(state, setGlobalState) {
        // CONSTANTS

        // Dimensions of the SVG canvas
        let canvasWidth = state.width / 2.1
        let canvasHeight = state.height * 0.8

        // Number of items in each waffle, and the cols and rows
        let numItems = state.allMath.length
        let numCols = 7
        let numRows = Math.floor(numItems / numCols) + 1 // to cover overflow

        // Dimensions of each waffle column and row
        let waffleWidth = canvasWidth / numCols
        let waffleHeight = canvasHeight / numRows

        // Color scales
        let waffleMathColor = d3.scaleLinear().domain([0,1]).range(["#cccccc", "#2E86AB"])
        let waffleELAColor = d3.scaleLinear().domain([0,1]).range(["#cccccc", "#EDAE49"])

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

        
        waffleLeft
            .selectAll(".rect")
            .data(state.allMath, d => d.School)
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
            .attr("rx", (d, i) => {
                return "0px"
            })
            .style("fill", d => waffleMathColor(d.majority))
            .attr("opacity", 0)
            .transition(d3.easeElastic)
            .duration(4500)
            .attr("opacity", 1);

        let leftTitle = d3
            .select("#chart2-left-title")
            .text("Tribal schools where >50% of students are proficient in math");

        waffleRight
            .selectAll(".rect")
            .data(state.allELA, d => d.School)
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
            .attr("rx", (d, i) => {
                return "0px"
            })
            .style("fill", d => waffleELAColor(d.majority))
            .attr("opacity", 0)
            .transition(d3.easeElastic)
            .duration(4500)
            .attr("opacity", 1);

        let rightTitle = d3
            .select("#chart2-right-title")
            .text("Tribal schools where >50% of students are proficient in reading");

    }
}

export {
    Waffle
};