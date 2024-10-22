let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;
let interval;
let lapCount = 0;

// DOM Elements
const startPauseBtn = document.getElementById('start-pause-btn');
const lapResetBtn = document.getElementById('lap-reset-btn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

// Function to update the time
function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    millisecondsDisplay.textContent = milliseconds < 100 ? `0${Math.floor(milliseconds / 10)}` : Math.floor(milliseconds / 10);
}

// Start/Pause Button Functionality
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        startPauseBtn.textContent = 'Resume';
        startPauseBtn.classList.replace('bg-red-500', 'bg-blue-500');
        startPauseBtn.classList.replace('hover:bg-red-600', 'hover:bg-blue-600');
        lapResetBtn.textContent = 'Reset';
    } else {
        interval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.replace('bg-blue-500', 'bg-red-500');
        startPauseBtn.classList.replace('hover:bg-blue-600', 'hover:bg-red-600');
        lapResetBtn.textContent = 'Lap';
        lapResetBtn.disabled = false;
    }
    isRunning = !isRunning;
});

// Lap/Reset Button Functionality
lapResetBtn.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    } else {
        resetStopwatch();
    }
});

// Function to record a lap
function recordLap() {
    lapCount++;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    lapsList.appendChild(lapItem);
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    lapCount = 0;
    updateDisplay();
    lapsList.innerHTML = ''; // Clear the lap list
    lapResetBtn.textContent = 'Lap';
    lapResetBtn.disabled = true;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.replace('bg-red-500', 'bg-blue-500');
    startPauseBtn.classList.replace('hover:bg-red-600', 'hover:bg-blue-600');
    isRunning = false;
}
