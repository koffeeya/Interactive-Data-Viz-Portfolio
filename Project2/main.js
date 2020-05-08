/* IMPORT COMPONENTS */
import {
    Map
} from "./map.js"

let map;


/* APPLICATION STATE */

let state = {
    geoUSA: null,
    geoTribal: null,
    schoolsData: null,
    scorecardData: null,
    figureHeight: 0,
    figureWidth: 0,
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
    state.schoolsData = schoolsData;
    state.scorecardData = scorecardsData;
    console.log("data loaded", state.geoTribal);
    init();
});

/* UTILITY FUNCTIONS */
function setGlobalState(nextState) {
    state = {
        ...state,
        ...nextState
    };
}



/* SCROLLAMA */
let container = d3.select('#scroll');
let graphic = d3.select('.scroll__graphic');
let chart = d3.select('.chart');
let text = d3.select('.scroll__text');
let step = d3.selectAll('.step');

// Initialize the scrollama
let scroller = scrollama();


function handleResize() {
    setGlobalState({
        figureHeight: window.innerHeight * 0.65,
        figureWidth: window.innerWidth * 0.75,
        /* figureMarginTop: (window.innerHeight - (window.innerHeight / 2)) / 2, */
    })
    scroller.resize();
}


function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }
    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });
    // update graphic based on step
    chart.select("p").text(response.index + 1);
}


function setupStickyfill() {
    d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
    });
}



/* INIT */
function init() {
    console.log("initializing");
    setupStickyfill();
    handleResize(); // force a resize to update DOM elements
    // Initialize scrollama instance
    scroller.setup({
            step: "#scroll article .step",
            offset: 0.75, // set the trigger to be halfway down screen
            debug: true, // display the trigger offset for testing
        })
        .onStepEnter(handleStepEnter)
    // set up resize event
    window.addEventListener('resize', handleResize)
    map = new Map(state, setGlobalState);
    draw();
}



/* DRAW */
function draw() {
    console.log("drawing");
    map.draw(state, setGlobalState);
}