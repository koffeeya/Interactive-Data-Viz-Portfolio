class Map {
    constructor(state, setGlobalState) {
        console.log(state, "Now I am constructing");

        let svg, radiusScale, projection, path, div, width, height, margin;

        margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        }
        width = 200 - margin.left - margin.right;
        height = 250 - margin.top - margin.bottom;

        projection = d3.geoAlbers().fitSize([width, height], state.geojson);
        path = d3.geoPath().projection(projection);

        this.svg = d3
            .select("#part1-map-boundaries")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 300 300")
            .classed("svg-content", true);

        this.svg
            .selectAll(".land")
            .data(state.geojson.features)
            .join("path")
            .attr("d", path)
            .attr("class", "land")
            .attr("fill", "green");

        const GradCenterCoord = {
            latitude: 40.7423,
            longitude: -73.9833
        };
        
        this.svg
            .selectAll("circle")
            .data([GradCenterCoord])
            .join("circle")
            .attr("r", 5)
            .attr("fill", "steelblue")
            .attr("transform", d => {
                const [x, y] = projection([d.longitude, d.latitude]);
                return `translate(${x}, ${y})`;
            });

        this.draw();

    }

    draw(state, setGlobalState) {
        console.log("Now I am drawing")


    }
}

export {
    Map
};