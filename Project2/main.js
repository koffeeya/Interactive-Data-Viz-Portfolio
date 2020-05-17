/* IMPORT COMPONENTS */
import {
    Map
} from "./map.js"
import {
    Waffle
} from "./waffle.js"
import {
    Bar
} from "./bar.js"

let map, waffle, bar;


/* APPLICATION STATE */
let state = {
    // Dataset
    geoUSA: null,
    dataSchools: [],
    dataScorecard: [],
    schoolsList: null,
    operatorList: null,
    populationList: null,
    projectionUSA: null,
    pathUSA: null,
    height: 300,
    width: 300,
    // Math scorecard populations
    allMath: [],
    mathMale: [],
    mathFemale: [],
    mathEng: [],
    mathEcon: [],
    mathDis: [],
    // ELA scorecard populations
    allELA: [],
    elaMale: [],
    elaFemale: [],
    elaEng: [],
    elaEcon: [],
    elaDis: [],
    //
    selectedPop: "All Students",
    selectedCount: 137,
    //
    intro: 0,
}

/* LOAD DATA */
Promise.all([
    d3.json("./data/usState.json"),
    d3.csv("./data/schools.csv", d3.autoType),
    d3.csv("./data/scorecards.csv", d3.autoType),
]).then(([usaData, schoolsData, scorecardsData, math]) => {
    state.geoUSA = usaData;
    state.dataSchools = schoolsData;
    state.dataScorecard = scorecardsData.flat()
        .sort((a, b) => { return d3.descending(a.PercentMeet, b.PercentMeet) })
        .sort((a, b) => { return d3.descending(b.Population, a.Population) });
    findWidth();
    setScales();
    init();
});




// Create scales and filtered datasets
function setScales() {
    state.projectionUSA = d3.geoAlbersUsa().fitSize([state.width, state.height], state.geoUSA);
    state.pathUSA = d3.geoPath().projection(state.projectionUSA);
    state.schoolsList = d3.map(state.dataSchools, d => d.School).keys();
    state.operatorList = d3.map(state.dataSchools, d => d.Operator).keys();
    state.populationList = d3.map(state.dataScorecard, d => d.Population).keys();

    // Math scores for all student population
    state.allMath = state.dataScorecard.filter(d => {
        return d.Subject === "Math" && d.Population === "All Students"
    })

    // ELA scores for all student population
    state.allELA = state.dataScorecard.filter(d => { return d.Subject === "ELA" && d.Population === "All Students" })

    // Math scores by population
    state.mathMale = state.dataScorecard.filter(d => { return d.Subject === 'Math' && d.Population === 'Male' });
    state.mathFemale = state.dataScorecard.filter(d => { return d.Subject === 'Math' && d.Population === 'Female' });
    state.mathEng = state.dataScorecard.filter(d => { return d.Subject === 'Math' && d.Population === 'English Learners' });
    state.mathEcon = state.dataScorecard.filter(d => { return d.Subject === 'Math' && d.Population === 'Economic Disadvantaged' });
    state.mathDis = state.dataScorecard.filter(d => { return d.Subject === 'Math' && d.Population === 'Students with Disabilities' });

    // Math scores by population
    state.elaMale = state.dataScorecard.filter(d => { return d.Subject === 'ELA' && d.Population === 'Male' });
    state.elaFemale = state.dataScorecard.filter(d => { return d.Subject === 'ELA' && d.Population === 'Female' });
    state.elaEng = state.dataScorecard.filter(d => { return d.Subject === 'ELA' && d.Population === 'English Learners' });
    state.elaEcon = state.dataScorecard.filter(d => { return d.Subject === 'ELA' && d.Population === 'Economic Disadvantaged' });
    state.elaDis = state.dataScorecard.filter(d => { return d.Subject === 'ELA' && d.Population === 'Students with Disabilities' });
}


/* INIT */
function init() {
    map = new Map(state, setGlobalState);
    waffle = new Waffle(state, setGlobalState);
    bar = new Bar(state, setGlobalState);
    draw();
}

/* DRAW */
function draw() {
    map.draw(state, setGlobalState);
    waffle.draw(state, setGlobalState);
    bar.draw(state, setGlobalState);
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
        height: Math.floor(rect.height / 5),
    });
}
