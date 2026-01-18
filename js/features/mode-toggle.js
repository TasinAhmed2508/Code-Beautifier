export const bindModeToggle = (refs, state, renderAll) => {
  if (!refs.toggleMode) return;
  refs.toggleMode.addEventListener('click', () => {
    state.mode = state.mode === 'dark' ? 'light' : 'dark';
    renderAll(refs, state);
  });
};
