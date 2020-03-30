// Import components
import {
    Waffle
} from "./chart.js";

let chart;


// Set global state variables
let state = {
    data: [],
    sortBy: "Year",
    selectedArtist: "All",
    selectedGender: "All",
    artistActive: false,
    genderActive: true,
    height: null,
}


// Read in data
d3.csv("data/artworks.csv", d3.autoType).then(
    data => {
        console.log("raw data", data);
        state.data = data.flat();
        init();
    }
);


// Init
function init() {
    chart = new Waffle(state, setGlobalState);
    draw();
}


// Draw
function draw() {
    chart.draw(state, setGlobalState);
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