let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";
        lapButton.style.display = "inline-block";
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startButton.style.display = "inline-block";
        stopButton.style.display = "none";
        lapButton.style.display = "none";
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00.000";
    startButton.style.display = "inline-block";
    stopButton.style.display = "none";
    lapButton.style.display = "none";
    laps = [];
    renderLaps();
    difference = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds) + "." + 
        (milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds);
}

function recordLap() {
    if (running) {
        laps.push(display.innerHTML);
        renderLaps();
    }
}

function renderLaps() {
    lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join("");
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
