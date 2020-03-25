class Waffle {

    constructor(state, setGlobalState) {

        this.waffle = d3
            .select('.waffle')
            .selectAll('.block')
            .data(state.data, d => d.Date)
            .join(

                enter => enter
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
                        .html('</br><i><b><h2>' + d.Title + '</h2></b></i><p>' + d.Medium + ' , ' + d.Date + '</p>' + '<p>' + d.Artist + '</p><p>' + d.ArtistBio + '</p>')
                })

                .on("mouseout", d => {
                    d3.select(".img")
                        .remove()
                }));

        this.artists = d3.map(state.data, d => d.Artist).keys().sort()
        this.artists.unshift(["All"])

        this.genders = d3.map(state.data, d => d.Gender).keys().sort()
        this.genders.unshift(["All"])

        this.selectArtist = d3
            .select("#dropdown-artist")
            .selectAll("option")
            .data(this.artists)
            .join("option")
            .attr("value", d => d)
            .text(d => d);

        this.selectGender = d3
            .select("#dropdown-gender")
            .selectAll("option")
            .data(this.genders)
            .join("option")
            .attr("value", d => d)
            .text(d => d);

        this.selectArtist = d3
            .select("#dropdown-artist")
            .on("change",
                function () {
                    console.log("The new selected artist is", this.value)
                    setGlobalState({
                        selectedArtist: d.Artist
                    })
                })

    }

    draw(state, setGlobalState) {
        console.log("now I am drawing my waffle")

        this.selectArtist = d3
            .select("#dropdown-artist")
            .on("change",
                function () {
                    console.log("The new selected artist is", this.value)
                    setGlobalState({
                        selectedArtist: d.Artist
                    })
                })




    }
}

export {
    Waffle
};