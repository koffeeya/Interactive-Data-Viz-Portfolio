/* IMPORT COMPONENTS */
import { Map } from "./map.js"

let map;


/* APPLICATION STATE */

let state = {
    geojson: null,
    schoolsData: null,
    scorecardData: null,
}



/* LOAD DATA */
Promise.all([
    d3.json("./data/tribalBoundaries.geo.json"),
    d3.csv("./data/schools.csv", d3.autoType),
    d3.csv("./data/scorecards.csv", d3.autoType)
]).then(([geojson, schools, scorecards]) => {
    state.geojson = geojson;
    state.schoolsData = schools;
    state.scorecardData = scorecards;
    console.log("data loaded");
    init();
});



/* INIT */
function init() {
    console.log("initializing");
    map = new Map(state, setGlobalState);
    draw();
}



/* DRAW */
function draw() {
    console.log("drawing");
    map.draw(state, setGlobalState);
}


/* UTILITY FUNCTIONS */
function setGlobalState(nextState) {
    state = { ...state, ...nextState };
    console.log("new state:", state);
    draw();
  }