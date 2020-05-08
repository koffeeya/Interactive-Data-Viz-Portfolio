class Map {
    constructor(state, setGlobalState) {
        console.log(state, "Now I am constructing");

        let svg, radiusScale, projectionUSA, projectionTribal, pathUSA, pathTribal, div, width, height, margin, mapRatio;

        margin = {
                top: 10,
                left: 10,
                bottom: 10,
                right: 10
            }, width = parseInt(d3.select('.chart').style('width')),
            width = width - margin.left - margin.right,
            mapRatio = .7,
            height = width * mapRatio;

        projectionUSA = d3.geoAlbersUsa()
            .scale(width)
            .translate([width / 2, height / 2]);

        pathUSA = d3.geoPath().projection(projectionUSA);
/* 
        projectionTribal = d3.geoAlbersUsa().fitSize([width, height], state.geoTribal); */

        this.svg = d3
            .select(".chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .classed("svg-content", true);

        this.svg
            .selectAll(".landUSA")
            .data(state.geoUSA.features)
            .join("path")
            .attr("d", pathUSA)
            .attr("class", "land")
            .attr("fill", "#212121");

      /*   this.svg
            .selectAll(".landTribal")
            .data(state.geoTribal.features)
            .join("path")
            .attr("d", pathUSA)
            .attr("class", "land")
            .attr("fill", "#2E86AB")
            .on("mouseover", d => {
                d3.select("#tooltip-text")
                    .text(d.properties.NAME)
            }); */


        this.draw();

        d3.select(window).on('resize', resize);

        function resize() {
            // adjust things when the window size changes
            width = parseInt(d3.select('.chart').style('width'));
            width = width - margin.left - margin.right;
            height = width * mapRatio;

            // update projection
            projectionUSA
                .translate([width / 2, height / 2])
                .scale(width);

            // resize the map container
            d3.select("svg")
            .attr("width", width + "px")
            .attr("height", height + "px");

            d3.select(".land").attr("d", pathUSA);
        }

    }

    draw(state, setGlobalState) {
        console.log("Now I am drawing")
        

    }
}

export {
    Map
};