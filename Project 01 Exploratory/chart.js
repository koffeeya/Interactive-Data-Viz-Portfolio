class Chart {

    constructor(state, setGlobalState){

        const waffle = d3.select('.waffle');

        waffle
            .selectAll('.block')
            .data(state.data, d => d.Date)
            .join(
                enter =>
                enter
                    .append('div')
                    .attr('class', 'block')
                    .style('background-color', d => d.rgbString)
                    .on("mouseover", d => {
                        d3.select("#tooltip")
                        .append("div")
                        .attr('class', 'img')
                        .html('<img src="' + d.ThumbnailURL + '">' + d.Date + ", " + d.Title + ", " + d.Artist)})
                    .on("mouseout", d => {
                        d3.select(".img")
                        .remove()
                    }));
    }
    
    draw(){}
}

export { Chart };