import { DEFAULT_CODE, THEMES, PADDINGS, WINDOW_STYLES } from './modules/data.js';
import { renderEditor } from './modules/editor.js';
import { exportAsImage } from './modules/exporter.js';

const app = document.querySelector('.app');
const exportCard = document.getElementById('export-card');
const themeSwatches = document.getElementById('theme-swatches');
const paddingToggle = document.getElementById('padding-toggle');
const windowStyleButton = document.getElementById('window-style');
const toggleLines = document.getElementById('toggle-lines');
const highlightLines = document.getElementById('highlight-lines');
const ghostLines = document.getElementById('ghost-lines');
const codeInput = document.getElementById('code-input');
const toggleMode = document.getElementById('toggle-mode');
const exportButton = document.getElementById('export-image');
const exportText = exportButton.querySelector('.cta__text');

const state = {
  code: DEFAULT_CODE,
  theme: 'ray',
  padding: 'medium',
  windowStyle: 'mac',
  showLineNumbers: true,
  mode: 'dark'
};

const buildSwatches = () => {
  themeSwatches.innerHTML = '';
  Object.entries(THEMES).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.className = `swatch${state.theme === key ? ' is-active' : ''}`;
    button.dataset.theme = key;

    const fill = document.createElement('span');
    fill.className = 'swatch__fill';
    fill.style.background = value;

    button.appendChild(fill);
    themeSwatches.appendChild(button);
  });
};

const updateExportCard = () => {
  exportCard.dataset.theme = state.theme;
  exportCard.dataset.padding = state.padding;
  exportCard.dataset.window = state.windowStyle;
};

const updateToolbar = () => {
  paddingToggle.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.padding === state.padding);
  });

  toggleLines.classList.toggle('is-active', state.showLineNumbers);
  toggleLines.setAttribute('aria-pressed', state.showLineNumbers.toString());

  const label = state.windowStyle === 'mac' ? 'macOS' : state.windowStyle === 'win' ? 'Windows' : 'No Window';
  windowStyleButton.textContent = label;
};

const updateMode = () => {
  app.dataset.theme = state.mode;
};

const renderAll = () => {
  buildSwatches();
  updateExportCard();
  updateToolbar();
  updateMode();
  renderEditor({
    code: state.code,
    showLineNumbers: state.showLineNumbers,
    highlightTarget: highlightLines,
    ghostTarget: ghostLines
  });
};

const cycleWindowStyle = () => {
  const currentIndex = WINDOW_STYLES.indexOf(state.windowStyle);
  const nextIndex = (currentIndex + 1) % WINDOW_STYLES.length;
  state.windowStyle = WINDOW_STYLES[nextIndex];
};

const handlePaddingClick = (event) => {
  const button = event.target.closest('button');
  if (!button || !button.dataset.padding) return;
  state.padding = button.dataset.padding;
  renderAll();
};

const handleThemeClick = (event) => {
  const button = event.target.closest('.swatch');
  if (!button) return;
  state.theme = button.dataset.theme;
  renderAll();
};

codeInput.value = state.code;

codeInput.addEventListener('input', (event) => {
  state.code = event.target.value;
  renderEditor({
    code: state.code,
    showLineNumbers: state.showLineNumbers,
    highlightTarget: highlightLines,
    ghostTarget: ghostLines
  });
});

themeSwatches.addEventListener('click', handleThemeClick);
paddingToggle.addEventListener('click', handlePaddingClick);

windowStyleButton.addEventListener('click', () => {
  cycleWindowStyle();
  renderAll();
});

toggleLines.addEventListener('click', () => {
  state.showLineNumbers = !state.showLineNumbers;
  renderAll();
});

toggleMode.addEventListener('click', () => {
  state.mode = state.mode === 'dark' ? 'light' : 'dark';
  updateMode();
});

exportButton.addEventListener('click', async () => {
  await exportAsImage({
    element: exportCard,
    button: exportButton,
    status: exportText
  });
});

renderAll();

