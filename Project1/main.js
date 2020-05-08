// Import components
import { Waffle } from "./chart.js";
import { Summary } from "./summary.js";

let chart;
let summary;


// Set global state variables
let state = {
    data: [],
    dataSource: "data/genderSummary.csv",
    summaryData: [],
    filteredData: [],
    sortBy: "Year",
    selectedArtist: "All Artists",
    selectedGender: "All Genders",
    selectedCountry: "All Countries",
    artistActive: false,
    genderActive: true,
    countryActive: false,
}

// Read in data
d3.csv("data/artworks.csv", d3.autoType).then(
    data => {
        /* console.log("raw data", data); */
        console.log("Artist data loaded!")
        state.data = data.flat();
        init();
    }
);


// Init
function init() {
    chart = new Waffle(state, setGlobalState);
    summary = new Summary(state, setGlobalState);
    draw();
}


// Draw
function draw() {
    chart.draw(state, setGlobalState);
    summary.draw(state, setGlobalState);
}


// Global State utility function
function setGlobalState(nextState) {
    state = {
        ...state,
        ...nextState
    };
    draw();
}
