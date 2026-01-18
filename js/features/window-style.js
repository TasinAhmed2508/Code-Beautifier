import { WINDOW_STYLES } from '../core/data.js';

const cycleWindowStyle = (state) => {
  const currentIndex = WINDOW_STYLES.indexOf(state.windowStyle);
  const nextIndex = (currentIndex + 1) % WINDOW_STYLES.length;
  state.windowStyle = WINDOW_STYLES[nextIndex];
};

export const bindWindowStyle = (refs, state, renderAll) => {
  if (!refs.windowStyleButton) return;
  refs.windowStyleButton.addEventListener('click', () => {
    cycleWindowStyle(state);
    renderAll(refs, state);
  });
};
