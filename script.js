let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('lapsContainer');

function formatTime(time) {
  const ms = Math.floor((time % 1000) / 10);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);
  const h = Math.floor(time / (1000 * 60 * 60));
  return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${ms.toString().padStart(2,'0')}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  lapsContainer.innerHTML = '';
}

function lap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapDiv = document.createElement('div');
    lapDiv.textContent = lapTime;
    lapsContainer.appendChild(lapDiv);
    lapsContainer.scrollTop = lapsContainer.scrollHeight; // keep newest visible
  }
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);
