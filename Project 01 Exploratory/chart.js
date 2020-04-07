class Waffle {

    constructor(state, setGlobalState) {
        console.log("Constructing Chart!")

        // Dropdowns
        this.artists = d3.map(state.data, d => d.Artist).keys().sort()
        this.artists.unshift(["All Artists"])

        this.genders = d3.map(state.data, d => d.Gender).keys().sort()
        this.genders.unshift(["All Genders"])

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
                    })
                })

        this.selectGender = d3
            .select("#dropdown-gender")
            .on("change",
                function () {
                    console.log("The new selected gender is", this.value)
                    setGlobalState({
                        selectedGender: this.value,
                    })
                })

        this.sortColor = d3
            .select("#sort-color")
            .on("change", function () {
                console.log("sorting clicked")
                if (this.checked == true) {
                    setGlobalState({
                        sortBy: "Color",
                    })
                } else(
                    setGlobalState({
                        sortBy: "Year",
                    })
                )
            });

        this.changeArtistActive = d3
            .select("#artist-button")
            .on("click", function () {
                console.log("artist clicked")
                setGlobalState({
                    selectedArtist: "All Artists",
                    selectedGender: "All Genders",
                    artistActive: true,
                    genderActive: false,
                    sortBy: "Year",
                    dataSource: "data/artistSummary.csv",
                })
                d3.csv(state.dataSource, d3.autoType).then(data => {
                    setGlobalState({summaryData: data.flat()})
                })
            })

        this.changeGenderActive = d3
            .select("#gender-button")
            .on("click", function () {
                console.log("gender clicked")
                setGlobalState({
                    selectedArtist: "All Artists",
                    selectedGender: "All Genders",
                    artistActive: false,
                    genderActive: true,
                    sortBy: "Year",
                    dataSource: "data/genderSummary.csv",
                })
                d3.csv(state.dataSource, d3.autoType).then(data => {
                    setGlobalState({summaryData: data.flat()})
                })
            })

    }

    draw(state, setGlobalState) {
        console.log("Drawing Chart!")

        if (state.artistActive === true) {
            d3.select("#gender-container.dropdown").attr("style", "display: none")
            d3.select("#artist-container.dropdown").attr("style", "display: visible")
            d3.select("#artist-button")
                .attr("style", "color: #060606; background-color: white; font-weight: 800;")
            d3.select("#gender-button")
                .attr("style", "color: white; background-color: #060606; color: grey; border: 1px solid grey;")


        } else if (state.genderActive === true) {
            d3.select("#gender-container.dropdown").attr("style", "display: visible")
            d3.select("#artist-container.dropdown").attr("style", "display: none")
            d3.select("#gender-button")
                .attr("style", "color: #060606; background-color: white; font-weight: 800;")
            d3.select("#artist-button")
                .attr("style", "background-color: #060606; color: #868686; border: 1px solid grey;")
        }

        // Apply gender and artist filters to state data
        let filteredData = state.data
            .filter(d => {
                if (state.selectedArtist !== "All Artists") {
                    return d.Artist === state.selectedArtist;
                } else if (state.selectedGender !== "All Genders") {
                    return d.Gender === state.selectedGender;
                } else if (state.selectedGender === "All Genders" || state.selectedArtist === "All Artists") {
                    return state.data
                }
            })
            .sort((a, b) => {
                if (state.sortBy === "Color") {
                    return d3.ascending(+a.sum, +b.sum)
                } else return (d3.ascending(a.Date, b.Date))
            });
        

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
            .on("click", d => {
                d3.select(".img").remove()
                d3.select("#tooltip")
                    .append("div")
                    .attr('class', 'img')
                    .html('<img src="' + d.ThumbnailURL + '">')
                    .append("div")
                    .attr('class', 'subtitle')
                    .html('<i><b><p style="font-size: 25px; line-height: 26px;">' + d.Title + '</i></b> &nbsp(' + d.Date + ') ' + '</p>' + '<p style="font-size: 25px; line-height: 26px;">' + d.Artist + '</p> <p style="color:grey; font-size: 15px; line-height: 16px;">' + d.Medium + ', &nbsp' + d.Dimensions + '</p>' + '<p>' + d.Artist + ' has ' + d.ArtistCount + ' painting(s) in the collection.</p>')
                    .append("div")
                    .attr('class', 'button-container')
                    .html('<button id="learn-more-button" class="filter-buttons"><a style="text-decoration: none;" href=' + d.URL + 'target="_new">About the Work</a></button> <button id="view-artist-button" class="filter-buttons">View Artist</button>')
            })



        if (document.getElementById('chart').clientHeight < window.innerHeight) {
            d3.select('#scroll-indicator')
                .style("opacity", 0)
        } else {
            d3.select('#scroll-indicator')
                .style("opacity", 1)
        }

    }
}

export {
    Waffle
};