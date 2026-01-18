export const bindPaddingToggle = (refs, state, renderAll) => {
  if (!refs.paddingToggle) return;
  refs.paddingToggle.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || !button.dataset.padding) return;
    state.padding = button.dataset.padding;
    renderAll(refs, state);
  });
};
