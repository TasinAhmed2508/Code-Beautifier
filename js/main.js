import { DEFAULT_CODE, WINDOW_STYLES } from './modules/data.js';
import { exportAsImage } from './modules/exporter.js';
import { getDomRefs } from './modules/dom.js';
import { renderAll } from './modules/ui.js';

const refs = getDomRefs();

const state = {
  code: DEFAULT_CODE,
  theme: 'ray',
  padding: 'medium',
  windowStyle: 'mac',
  showLineNumbers: true,
  mode: 'dark',
  language: 'generic'
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
  renderAll(refs, state);
};

const handleThemeClick = (event) => {
  const button = event.target.closest('.swatch');
  if (!button) return;
  state.theme = button.dataset.theme;
  renderAll(refs, state);
};

refs.codeInput.value = state.code;
refs.codeInput.addEventListener('input', (event) => {
  state.code = event.target.value;
  renderAll(refs, state);
});

refs.themeSwatches.addEventListener('click', handleThemeClick);
refs.paddingToggle.addEventListener('click', handlePaddingClick);

refs.windowStyleButton.addEventListener('click', () => {
  cycleWindowStyle();
  renderAll(refs, state);
});

refs.toggleLines.addEventListener('click', () => {
  state.showLineNumbers = !state.showLineNumbers;
  renderAll(refs, state);
});

refs.toggleMode.addEventListener('click', () => {
  state.mode = state.mode === 'dark' ? 'light' : 'dark';
  renderAll(refs, state);
});

if (refs.exportButton && refs.exportText) {
  refs.exportButton.addEventListener('click', async () => {
    await exportAsImage({
      element: refs.exportCard,
      button: refs.exportButton,
      status: refs.exportText
    });
  });
}

renderAll(refs, state);
