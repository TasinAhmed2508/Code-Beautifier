export const bindResolutionSelect = (refs, state) => {
  if (!refs.resolutionSelect) return;
  refs.resolutionSelect.addEventListener('change', (event) => {
    const value = Number(event.target.value);
    state.resolution = Number.isFinite(value) ? value : 3;
  });
};
