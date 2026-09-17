import { formatFormula, rollDice } from './roller.js';
import { DddicePresenter } from './dddice.js';

const state = { count: 2, sides: 6, modifier: 2, difficulty: 8, history: [] };
const $ = (selector) => document.querySelector(selector);
const controls = ['count', 'modifier', 'difficulty'].reduce((items, id) => ({ ...items, [id]: $(`#${id}`) }), {});
const dddice = new DddicePresenter({ container: '#dddice-box', assetPath: import.meta.env.VITE_DDDICE_ASSET_PATH || '/dddice-assets/' });

function syncState() {
  state.count = Number(controls.count.value); state.modifier = Number(controls.modifier.value); state.difficulty = Number(controls.difficulty.value);
  $('#formula-display').textContent = formatFormula(state);
  document.querySelectorAll('[data-die]').forEach((button) => button.classList.toggle('selected', Number(button.dataset.die) === state.sides));
}
function renderHistory() {
  const list = $('#history-list'); list.replaceChildren();
  if (!state.history.length) { list.innerHTML = '<li class="empty">No rolls recorded.</li>'; return; }
  state.history.forEach((entry) => {
    const item = $('#history-item').content.cloneNode(true);
    item.querySelector('.history-total').textContent = entry.total;
    item.querySelector('.history-formula').textContent = entry.formula;
    item.querySelector('.history-detail').textContent = `[${entry.dice.join(', ')}] ${entry.modifier ? `${entry.modifier > 0 ? '+' : '−'} ${Math.abs(entry.modifier)}` : ''}`;
    const outcome = item.querySelector('.history-outcome');
    outcome.textContent = entry.success === null ? 'ROLL' : entry.success ? 'SUCCESS' : 'MISS'; outcome.className = `history-outcome ${entry.success ? 'success' : entry.success === false ? 'miss' : ''}`;
    list.append(item);
  });
}
function roll() {
  syncState();
  try {
    const result = rollDice(state); const formula = formatFormula(state);
    $('#total-display').textContent = result.total;
    $('#result-label').textContent = result.success === null ? 'RESULT' : result.success ? 'PROTOCOL SUCCESS' : 'PROTOCOL MISSED';
    $('#result-label').className = result.success ? 'success-label' : result.success === false ? 'miss-label' : '';
    state.history.unshift({ ...result, formula, modifier: state.modifier }); state.history.splice(8); renderHistory();
    dddice.present(state).catch(() => { $('#dddice-status').textContent = '3D dice unavailable — using the built-in roller.'; });
  } catch (error) { $('#result-label').textContent = error.message; }
}
document.querySelectorAll('[data-die]').forEach((button) => button.addEventListener('click', () => { state.sides = Number(button.dataset.die); syncState(); }));
Object.values(controls).forEach((control) => control.addEventListener('input', syncState));
document.querySelectorAll('[data-preset]').forEach((button) => button.addEventListener('click', () => { const [, count, sides, modifier, difficulty] = button.dataset.preset.match(/(\d+)d(\d+)([+-]\d+)@(\d+)/); Object.assign(state, { count: Number(count), sides: Number(sides), modifier: Number(modifier), difficulty: Number(difficulty) }); Object.entries(controls).forEach(([key, input]) => input.value = state[key]); syncState(); roll(); }));
$('#roll-button').addEventListener('click', roll); $('#clear-history').addEventListener('click', () => { state.history = []; renderHistory(); });
dddice.initialize().then(() => { $('#dddice-status').textContent = '3D dice powered by dddice.'; }).catch(() => { $('#dddice-status').textContent = '3D dice unavailable — using the built-in roller.'; });
syncState();
