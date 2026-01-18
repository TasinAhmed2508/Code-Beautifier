export const bindLineNumbersToggle = (refs, state, renderAll) => {
  if (!refs.toggleLines) return;
  refs.toggleLines.addEventListener('click', () => {
    state.showLineNumbers = !state.showLineNumbers;
    renderAll(refs, state);
  });
};
