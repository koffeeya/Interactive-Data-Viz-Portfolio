/* IMPORT COMPONENTS */
import {
    Map
} from "./map.js"

let map

/* APPLICATION STATE */

let state = {
    geoUSA: null,
    geoTribal: null,
    dataSchools: [],
    dataScorecard: [],
    schoolsList: null,
    operatorList: null,
    projectionUSA: null,
    pathUSA: null,
    height: 300,
    width: 300,
    mapRatio: 0,
    hover: null,
}

/* LOAD DATA */
Promise.all([
    d3.json("./data/usState.json"),
    d3.json("./data/tribalBoundaries.geo.json"),
    d3.csv("./data/schools.csv", d3.autoType),
    d3.csv("./data/scorecards.csv", d3.autoType)
]).then(([usaData, tribalData, schoolsData, scorecardsData]) => {
    state.geoUSA = usaData;
    state.geoTribal = tribalData;
    state.dataSchools = schoolsData;
    state.dataScorecard = scorecardsData;
    findWidth();
    setScales();
    init();
});

function setScales() {
    state.projectionUSA = d3.geoAlbersUsa().fitSize([state.width, state.height], state.geoUSA);
    state.pathUSA = d3.geoPath().projection(state.projectionUSA);
    state.schoolsList = d3.map(state.dataSchools, d => d.School).keys();
    state.operatorList = d3.map(state.dataSchools, d => d.Operator).keys();
}


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
    state = {
      ...state,
      ...nextState,
    };
  }

function findWidth() {
    let element = document.querySelector("chart")
    let rect = element.getBoundingClientRect();
    setGlobalState({
        width: Math.floor(rect.width * 0.9),
        height: Math.floor(rect.height / 3.5),
    });
}


window.addEventListener("resize", function() {
    findWidth();
})


/* INTERSECTION OBSERVER */