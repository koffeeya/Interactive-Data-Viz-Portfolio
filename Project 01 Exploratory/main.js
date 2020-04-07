// Import components
import { Waffle } from "./chart.js";
import { Gender } from "./gender.js";

let chart;
let gender;


// Set global state variables
let state = {
    data: [],
    dataSource: "data/genderSummary.csv",
    summaryData: [],
    filteredData: [],
    sortBy: "Year",
    selectedArtist: "All Artists",
    selectedGender: "All Genders",
    artistActive: false,
    genderActive: true,
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
    gender = new Gender(state, setGlobalState);
    draw();
}


// Draw
function draw() {
    chart.draw(state, setGlobalState);
    gender.draw(state, setGlobalState);
}


// Global State utility function
function setGlobalState(nextState) {
    state = {
        ...state,
        ...nextState
    };
    console.log("new state:", state);
    draw();
}
