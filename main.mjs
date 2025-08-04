import { loadData } from "./dataLoader.mjs";
import { drawChart } from "./chart.mjs";
import { setupControls } from "./controls.mjs";
import { scenes } from "./scenes.mjs";

const WIDTH = 600;
const HEIGHT = 600;
const X_PADDING = 60;
const Y_PADDING = 30;
const X_RANGE = [X_PADDING, WIDTH - X_PADDING];
const Y_RANGE = [HEIGHT - Y_PADDING, Y_PADDING];
const CO2_LINE_COLOR = "steelblue";
const TEMP_LINE_COLOR = "tomato";
const START_YEARS = 5;

const config = {
  WIDTH,
  HEIGHT,
  X_PADDING,
  Y_PADDING,
  X_RANGE,
  Y_RANGE,
  CO2_LINE_COLOR,
  TEMP_LINE_COLOR,
};

const svg = d3
  .select("#visualization")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

let nextButton = document.getElementById("next-scene");
let prevButton = document.getElementById("prev-scene");

let isPlaying = false;
let intervalId = null;
let currentIndex = 1;
let co2DataGlobal = [];
let getTempSlice = null;
let tempDataGlobal = [];
let sceneIndex = 0;

const playButton = document.getElementById("play-pause-button");
const resetButton = document.getElementById("reset-button");
resetButton.disabled = true;

loadData(
  "./data/co2_mm_mlo.csv",
  "./data/global_temperatures.csv",
  START_YEARS
).then((result) => {
  const {
    co2Data,
    tempData,
    currentIndex: idx,
    getTempSlice: tempSliceFn,
  } = result;
  co2DataGlobal = co2Data;
  tempDataGlobal = tempData;
  getTempSlice = tempSliceFn;
  currentIndex = idx;

  const yearMinSlider = document.getElementById("year-range-min");
  const yearMaxSlider = document.getElementById("year-range-max");
  const yearMinValue = document.getElementById("year-range-min-value");
  const yearMaxValue = document.getElementById("year-range-max-value");
  let yearMin = parseInt(yearMinSlider.value);
  let yearMax = parseInt(yearMaxSlider.value);

  function play() {
    isPlaying = true;
    playButton.textContent = "Pause";
    resetButton.disabled = false;
    intervalId = setInterval(() => {
      if (currentIndex < co2DataGlobal.length) {
        currentIndex++;
        renderScene();
      } else {
        clearInterval(intervalId);
        isPlaying = false;
        playButton.textContent = "Play";
      }
    }, 10);
  }

  function reset() {
    currentIndex = idx;
    renderScene();
    if (isPlaying) {
      clearInterval(intervalId);
      isPlaying = false;
      playButton.textContent = "Play";
    }
    resetButton.disabled = true;
  }

  function renderScene() {
    const scene = scenes[sceneIndex];
    const showAnnotationsContainer = document.getElementById(
      "show-annotations-container"
    );
    if (sceneIndex === scenes.length - 1) {
      showAnnotationsContainer.style.visibility = "visible";
    } else {
      showAnnotationsContainer.style.visibility = "hidden";
    }
    const co2Filtered = co2DataGlobal.filter(
      (d) => d.date.getFullYear() >= yearMin && d.date.getFullYear() <= yearMax
    );
    const tempFiltered = tempDataGlobal.filter(
      (d) => d.date.getFullYear() >= yearMin && d.date.getFullYear() <= yearMax
    );

    const {
      co2,
      temp,
      description,
      annotations,
      controls = {},
    } = scene.getData(co2Filtered, (idx) => tempFiltered, currentIndex);
    svg.selectAll("*").remove();

    let showAnnotations = true;
    if (sceneIndex === scenes.length - 1) {
      const showAnnotationsCheckbox =
        document.getElementById("show-annotations");
      showAnnotations =
        showAnnotationsCheckbox && showAnnotationsCheckbox.checked;
    }
    drawChart(svg, co2, temp, config, showAnnotations ? annotations : []);

    const playbackControlsDiv = document.getElementById("playback-controls");
    playbackControlsDiv.style.visibility = controls.play ? "visible" : "hidden";

    const yearRangeControlsDiv = document.getElementById("year-range-controls");
    yearRangeControlsDiv.style.visibility = controls.yearSlider
      ? "visible"
      : "hidden";

    const sceneTextDiv = document.getElementById("scene-text");
    sceneTextDiv.innerHTML = `<h2 style='margin-bottom:0.5rem;'>${scene.title}</h2><p style='margin-top:0;'>${description}</p>`;
  }

  function updateYearRange() {
    yearMin = parseInt(yearMinSlider.value);
    yearMax = parseInt(yearMaxSlider.value);

    if (yearMin > yearMax) {
      if (this === yearMinSlider) {
        yearMax = yearMin;
        yearMaxSlider.value = yearMax;
      } else {
        yearMin = yearMax;
        yearMinSlider.value = yearMin;
      }
    }
    yearMinValue.textContent = yearMin;
    yearMaxValue.textContent = yearMax;
    renderScene();
  }
  yearMinSlider.addEventListener("input", updateYearRange);
  yearMaxSlider.addEventListener("input", updateYearRange);

  nextButton.onclick = () => {
    if (sceneIndex < scenes.length - 1) {
      if (sceneIndex === scenes.length - 1 - 1) {
        yearMin = parseInt(yearMinSlider.min);
        yearMax = parseInt(yearMaxSlider.max);
        yearMinSlider.value = yearMin;
        yearMaxSlider.value = yearMax;
        yearMinValue.textContent = yearMin;
        yearMaxValue.textContent = yearMax;
      }
      sceneIndex++;
      renderScene();
    }
  };
  prevButton.onclick = () => {
    if (sceneIndex > 0) {
      if (sceneIndex === scenes.length - 1) {
        yearMin = parseInt(yearMinSlider.min);
        yearMax = parseInt(yearMaxSlider.max);
        yearMinSlider.value = yearMin;
        yearMaxSlider.value = yearMax;
        yearMinValue.textContent = yearMin;
        yearMaxValue.textContent = yearMax;
      }
      sceneIndex--;
      renderScene();
    }
  };

  function onPlayPause() {
    if (!isPlaying) {
      play();
    } else {
      isPlaying = false;
      playButton.textContent = "Play";
      clearInterval(intervalId);
    }
  }

  function onReset() {
    reset();
  }

  const showAnnotationsCheckbox = document.getElementById("show-annotations");
  if (showAnnotationsCheckbox) {
    showAnnotationsCheckbox.addEventListener("change", () => {
      if (sceneIndex === scenes.length - 1) {
        renderScene();
      }
    });
  }

  setupControls({ playButton, resetButton, onPlayPause, onReset });
  renderScene();
  play();
});
