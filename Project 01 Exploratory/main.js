// Import components
import {
    Chart
} from "./chart.js";

let chart;


// Set global state variables
let state = {
    data: [],
    selectedTitle: null,
    selectedYear: null,
    selectedArtist: null,
    selectedGender: null,
    hover: null,
}


// Read in data
d3.csv("data/artworks.csv", d3.autoType).then(
    data => {
        console.log("raw data", data);
        state.data = data.flat();
        console.log("state data", state.data["rgbString"]);
        init();
    }
);


// Init
function init() {
    chart = new Chart(state, setGlobalState);
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