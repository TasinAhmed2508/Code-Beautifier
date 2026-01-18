import { THEMES } from './data.js';
import { renderEditor } from './editor.js';
import { detectLanguage } from './lang/detect.js';

export const buildSwatches = (themeSwatches, state) => {
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

export const updateExportCard = (exportCard, state) => {
  exportCard.dataset.theme = state.theme;
  exportCard.dataset.padding = state.padding;
  exportCard.dataset.window = state.windowStyle;
};

export const updateToolbar = (paddingToggle, toggleLines, windowStyleButton, state) => {
  paddingToggle.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.padding === state.padding);
  });

  toggleLines.classList.toggle('is-active', state.showLineNumbers);
  toggleLines.setAttribute('aria-pressed', state.showLineNumbers.toString());

  const label = state.windowStyle === 'mac' ? 'macOS' : state.windowStyle === 'win' ? 'Windows' : 'No Window';
  windowStyleButton.textContent = label;
};

export const updateMode = (app, state) => {
  app.dataset.theme = state.mode;
};

export const renderEditorView = (state, highlightLines, ghostLines) => {
  state.language = detectLanguage(state.code);
  renderEditor({
    code: state.code,
    showLineNumbers: state.showLineNumbers,
    highlightTarget: highlightLines,
    ghostTarget: ghostLines,
    language: state.language
  });
};

export const renderAll = (refs, state) => {
  buildSwatches(refs.themeSwatches, state);
  updateExportCard(refs.exportCard, state);
  updateToolbar(refs.paddingToggle, refs.toggleLines, refs.windowStyleButton, state);
  updateMode(refs.app, state);
  renderEditorView(state, refs.highlightLines, refs.ghostLines);
};
