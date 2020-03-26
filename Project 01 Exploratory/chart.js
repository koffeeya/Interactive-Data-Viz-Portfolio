class Waffle {

    constructor(state, setGlobalState) {



        console.log("SORTED", state.data.slice().sort((a, b) => d3.descending(a.rgbString, b.rgbString)))

        this.waffle = d3
            .select('.waffle')
            .selectAll('.block')
            .data(state.data, d => d.Date)
            .join(

                enter => enter
                .append('div')
                .attr('class', 'block')
                .style('background-color', d => d.rgbString)

                // Tooltip
                .on("mouseover", d => {
                    d3.select("#tooltip")
                        .append("div")
                        .attr('class', 'img')
                        .html('<img src="' + d.ThumbnailURL + '">')
                        .append("div")
                        .attr('class', 'subtitle')
                        .html('<i><b><h3>' + d.Title + '</i></b> &nbsp(' + d.Date + ') ' + '</h3>' + '<p><b>' + d.Artist + '</b>' + ', &nbsp' + d.ArtistBio + '</p><p style="color:grey;">' + d.Medium + '</p>')
                })

                .on("mouseout", d => {
                    d3.select(".img")
                        .remove()
                }));


        // Dropdowns
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
                        selectedArtist: this.value
                    })
                })

        this.selectGender = d3
            .select("#dropdown-gender")
            .on("change",
                function () {
                    console.log("The new selected gender is", this.value)
                    setGlobalState({
                        selectedGender: this.value
                    })
                })

        this.sortColor = d3
            .select("#sort-color")
            .on("change", function () {
                if (this.checked == true) {
                    setGlobalState({
                        sortBy: "Color"
                    })
                } else(
                    setGlobalState({
                        sortBy: "Year"
                    })
                )
            });

    }

    draw(state, setGlobalState) {
        console.log("now I am drawing my waffle")

        let filteredData = state.data;

        if (state.sortBy === "Color") {
            filteredData = filteredData.slice().sort((a, b) => d3.ascending(+a.sum, +b.sum)),
                console.log("Now sorting by color!")
        } else(filteredData = filteredData.slice().sort((a, b) => d3.ascending(a.Date, b.Date)),
            console.log("Now sorting by year!"))

        if (state.selectedArtist !== "All") {
            filteredData = state.data.filter(d => d.Artist === state.selectedArtist)
        } else(state.data.filter(d => "All" === state.selectedArtist))

        if (state.selectedGender !== "All") {
            filteredData = state.data.filter(d => d.Gender === state.selectedGender)
        } else(state.data.filter(d => "All" === state.selectedGender))


        this.waffle = d3
            .select('.waffle')
            .selectAll('.block')
            .data(filteredData, d => d.rgbString)
            .join(

                enter => enter
                .append('div')
                .attr('class', 'block')
                .style('background-color', d => d.rgbString)

                // Tooltip
                .on("mouseover", d => {
                    d3.select("#tooltip")
                        .append("div")
                        .attr('class', 'img')
                        .html('<img src="' + d.ThumbnailURL + '">')
                        .append("div")
                        .attr('class', 'subtitle')
                        .html('<i><b><h3>' + d.Title + '</i></b> &nbsp(' + d.Date + ') ' + '</h3>' + '<p><b>' + d.Artist + '</b>' + ', &nbsp' + d.ArtistBio + '</p><p style="color:grey;">' + d.Medium + '</p>')
                })

                .on("mouseout", d => {
                    d3.select(".img")
                        .remove()
                }));

    }
}

export {
    Waffle
};