class Waffle {

    constructor(state, setGlobalState) {

        height = window.innerHeight;

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
                        selectedArtist: this.value,
                        height: height,
                    })
                })

        this.selectGender = d3
            .select("#dropdown-gender")
            .on("change",
                function () {
                    console.log("The new selected gender is", this.value)
                    setGlobalState({
                        selectedGender: this.value,
                        height: height,
                    })
                })

        this.sortColor = d3
            .select("#sort-color")
            .on("change", function () {
                if (this.checked == true) {
                    setGlobalState({
                        sortBy: "Color",
                        height: height,
                    })
                } else(
                    setGlobalState({
                        sortBy: "Year",
                        height: height,
                    })
                )
            });

        this.changeArtistActive = d3
            .select("#artist-button")
            .on("click", function() {
                console.log("artist clicked")
                setGlobalState({
                    selectedArtist: "All",
                    selectedGender: "All",
                    artistActive: true,
                    genderActive: false,
                    sortBy: "Year",
                    height: height,
                })
            })

        this.changeGenderActive = d3
            .select("#gender-button")
            .on("click", function() {
                console.log("gender clicked")
                setGlobalState({
                    selectedArtist: "All",
                    selectedGender: "All",
                    artistActive: false,
                    genderActive: true,
                    sortBy: "Year",
                    height: height,
                })
            })
    

    }

    draw(state, setGlobalState) {

        console.log("HEIGHT", state.height)

        if (state.artistActive === true) {
            d3.select("#gender-container.dropdown").attr("style", "display: none")
            d3.select("#artist-container.dropdown").attr("style", "display: visible")
            d3.select("#artist-button")
                .attr("style", "color: #060606; background-color: white; font-weight: 800;")
                d3.select("#gender-button")
                .attr("style", "color: white; background-color: #060606;")
                

        } else if (state.genderActive === true) {
            d3.select("#gender-container.dropdown").attr("style", "display: visible")
            d3.select("#artist-container.dropdown").attr("style", "display: none")
            d3.select("#gender-button")
                .attr("style", "color: #060606; background-color: white; font-weight: 800;")
                d3.select("#artist-button")
                .attr("style", "background-color: #060606;")
                .attr("style", "color: white;")
        } 

        
        let filteredData = state.data
            .filter(d => {
                if (state.selectedArtist !== "All") {
                    return d.Artist === state.selectedArtist;
                } else if (state.selectedGender !== "All") {
                    return d.Gender === state.selectedGender;
                }
            })
            .sort((a, b) => {
                if(state.sortBy === "Color") {
                    return d3.ascending(+a.sum, +b.sum)
                } else return (d3.ascending(a.Date, b.Date))
            });

            console.log("FILTERED DATA", filteredData)


        this.waffle = d3
            .select('.waffle')
            .selectAll('.block')
            .data(filteredData, d => d.ObjectID)
            .join(

            enter => enter
                .append('div')
                .attr('class', 'block')
                .style('background-color', d => d.rgbString),
                update => update,
                exit => exit.remove())

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
            });

    }
}

export {
    Waffle
};