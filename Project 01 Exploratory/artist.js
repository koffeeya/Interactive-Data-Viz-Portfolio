class Gender {
    constructor(state, setGlobalState){
        console.log("Constructing Tooltip!")

        const width = 200,
            height = 200,
            margin = {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              }

        // Gender Data
        const genderSummary = d3
          .rollups(
            state.data,
            xs => d3.count(xs, d => d.ObjectID),
            d => d.Gender
          )
          .map(([k, v]) => ({ gender: k, value: v}))
        
        // Artist Data
        const artistSummary = d3
          .rollups(
            state.data,
            xs => d3.count(xs, d => d.ObjectID),
            d => d.Artist
          )
          .map(([k, v]) => ({ artist: k, value: v}))
          .sort((a, b) => (b.value - a.value))

        // Year Data
        const yearSummary = d3
          .rollups(
            state.data,
            xs => d3.count(xs, d => d.ObjectID),
            d => d.Date
          )
          .map(([k, v]) => ({ year: k, value: v}))
          .sort((a, b) => (a.year - b.year))


    }
    draw(state, setGlobalState) {

    }
}

export {
    Gender
};