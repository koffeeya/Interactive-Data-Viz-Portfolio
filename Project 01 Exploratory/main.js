// Import components
import {
    Waffle
} from "./chart.js";

let chart;


// Set global state variables
let state = {
    data: [],
    sortBy: "Year",
    selectedTitle: "All",
    selectedYear: "All",
    selectedArtist: "All",
    selectedGender: "All",
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