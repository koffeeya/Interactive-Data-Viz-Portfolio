class Map {
    constructor(state, setGlobalState) {
        console.log(state, "Now I am constructing");

        this.svg = d3
            .select("#chart1-visual")
            .append("svg")
            .attr("width", state.width)
            .attr("height", state.height)



        this.svg
            .selectAll(".landUSA")
            .append("g")
            .data(state.geoUSA.features)
            .join("path")
            .attr("d", state.pathUSA)
            .attr("class", "land")
            .attr("fill", "black");

    }

    draw(state, setGlobalState) {
        console.log("Drawing", state)

        this.title = d3
            .select("#chart1-title")
            .text("Tribal nations and schools in the United States")
            .style("opacity", "0")
            .transition(d3.easeElastic)
            .duration(3500)
            .style("opacity", "1");

        this.svg
            .selectAll(".landTribal")
            .append("g")
            .data(state.geoTribal.features)
            .join("path")
            .attr("d", state.pathUSA)
            .attr("class", "land")
            .attr("fill", "transparent")
            .transition(d3.easeElastic)
            .duration(2000)
            .attr("fill", "#ccc");

        const dot = this.svg
            .selectAll(".circle")
            .data(state.dataSchools, d => d.School)
            .join(
                enter =>
                enter
                .append("circle")
                .attr("class", "dot")
                .attr("opacity", 0)
                .attr("r", "4")
                .attr("style", "stroke: #ff743d; stroke-width: 0.5px")
                .attr("fill", "#9a3106")
                .attr("transform", d => {
                    const [x, y] = state.projectionUSA([+d.Longitude, +d.Latitude]);
                    return `translate(${x}, ${y})`;
                })
                ,
                update => update,
                exit => exit
            )
            .call(selection =>
                selection
                .transition(d3.easeElastic)
                .delay(d => 50 * d.Latitude)
                .attr("opacity", 0.9)
            );

    }
}

export {
    Map
};