const STORAGE_KEY = 'pomodoroMinutes';

function getSeconds() {
  let n = NaN;
  try {
    n = Number(localStorage.getItem(STORAGE_KEY));
  } catch (e) {}
  const minutes = Number.isInteger(n) && n >= 1 && n <= 60 ? n : 25;
  return minutes * 60;
}

let DEFAULT_SECONDS = getSeconds();

const timerEl = document.querySelector('.timer');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');

let remaining = DEFAULT_SECONDS;
let intervalId = null;

function render() {
  const m = String(Math.floor(remaining / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
  document.title = `${m}:${s} - Pomodoro`;
}

function startTimer() {
  if (intervalId !== null || remaining <= 0) return;
  intervalId = setInterval(() => {
    remaining--;
    render();
    if (remaining <= 0) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remaining = DEFAULT_SECONDS;
  render();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 설정 페이지에서 저장하면 즉시 반영 (다른 탭 / 뒤로가기 복원 포함)
function applySavedTime() {
  DEFAULT_SECONDS = getSeconds();
  resetTimer();
}

window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) applySavedTime();
});

window.addEventListener('pageshow', (e) => {
  if (e.persisted) applySavedTime();
});

render();
