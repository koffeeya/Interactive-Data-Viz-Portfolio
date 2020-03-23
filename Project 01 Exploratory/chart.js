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
                        .html('<img src="' + d.ThumbnailURL + '">')
                        .append("div")
                        .attr('class', 'subtitle')
                        .html('</br><i><b>' + d.Title + '</b></i> <p>(' + d.Date + ')</p>' + '</br><p>' + d.Artist + '</p></br><p>' + d.ArtistBio + '</p')
                        .transition()
                        .duration(200)
                    }
                        )
                    .on("mouseout", d => {
                        d3.select(".img")
                        .remove()
                    }));
    }
    
    draw(){}
}

export { Chart };