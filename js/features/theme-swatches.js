export const bindThemeSwatches = (refs, state, renderAll) => {
  if (!refs.themeSwatches) return;
  refs.themeSwatches.addEventListener('click', (event) => {
    const button = event.target.closest('.swatch');
    if (!button) return;
    state.theme = button.dataset.theme;
    renderAll(refs, state);
  });
};
