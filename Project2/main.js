/* IMPORT COMPONENTS */
import {
    Map
} from "./map.js"
import {
    Waffle
} from "./waffle.js"

let map, waffle

/* APPLICATION STATE */

let state = {
    geoUSA: null,
    geoTribal: null,
    dataSchools: [],
    dataScorecard: [],
    allMath: [],
    allELA: [],
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
    d3.csv("./data/scorecards.csv", d3.autoType),
]).then(([usaData, tribalData, schoolsData, scorecardsData, math]) => {
    state.geoUSA = usaData;
    state.geoTribal = tribalData;
    state.dataSchools = schoolsData;
    state.dataScorecard = scorecardsData.flat();
    findWidth();
    setScales();
    init();
});

function setScales() {
    state.projectionUSA = d3.geoAlbersUsa().fitSize([state.width, state.height], state.geoUSA);
    state.pathUSA = d3.geoPath().projection(state.projectionUSA);
    state.schoolsList = d3.map(state.dataSchools, d => d.School).keys();
    state.operatorList = d3.map(state.dataSchools, d => d.Operator).keys();

    // Math scores for all student population
    state.allMath = state.dataScorecard.filter(d => {
        return d.Subject === "Math" && d.Population === "All Students"
    }).sort((a, b) => {
        return d3.descending(a.PercentBelow, b.PercentBelow)
    });
    
    // ELA scores for all student population
    state.allELA = state.dataScorecard.filter(d => {
        return d.Subject === "ELA" && d.Population === "All Students"
    }).sort((a, b) => {
        return d3.descending(a.PercentBelow, b.PercentBelow)
    });
}

/* INIT */
function init() {
    map = new Map(state, setGlobalState);
    waffle = new Waffle(state, setGlobalState);
    draw();
}


/* DRAW */
function draw() {
    map.draw(state, setGlobalState);
    waffle.draw(state, setGlobalState);
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
        height: Math.floor(rect.height / 4),
    });
}