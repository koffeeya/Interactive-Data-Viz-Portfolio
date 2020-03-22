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
}

// Read in data
d3.csv("data/artworks.csv", d3.autoType).then(
    data => {
        console.log("data", data);
        state.data = data;
        init();
    }
);


// Init
function init() {

    const waffle = d3.select('.waffle');

    waffle
        .selectAll('.block')
        .data(state.data, d => d.ObjectID)
        .enter()
        .append('div')
        .attr('class', 'block')
        .style('background-color', d3.rgb("rgb(140, 25, 90)"));

}

// Draw
function draw() {

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