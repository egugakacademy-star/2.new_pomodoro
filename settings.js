const STORAGE_KEY = 'pomodoroMinutes';
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const input = document.getElementById('timer-minutes');
const saveBtn = document.querySelector('.done-button');

function isValid(value) {
  if (value.trim() === '') return false;
  const n = Number(value);
  return Number.isInteger(n) && n >= MIN_MINUTES && n <= MAX_MINUTES;
}

function updateSaveState() {
  saveBtn.disabled = !isValid(input.value);
}

function loadSaved() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}
  input.value = isValid(String(saved ?? '')) ? saved : DEFAULT_MINUTES;
}

input.addEventListener('input', updateSaveState);

saveBtn.addEventListener('click', () => {
  if (!isValid(input.value)) return;
  try {
    localStorage.setItem(STORAGE_KEY, String(Number(input.value)));
  } catch (e) {}
  saveBtn.textContent = '저장됨!';
  setTimeout(() => (saveBtn.textContent = '저장'), 1000);
});

loadSaved();
updateSaveState();
