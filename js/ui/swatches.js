import { THEMES } from '../core/data.js';

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
