export const updateToolbar = (paddingToggle, toggleLines, windowStyleButton, resolutionSelect, state) => {
  paddingToggle.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.padding === state.padding);
  });

  toggleLines.classList.toggle('is-active', state.showLineNumbers);
  toggleLines.setAttribute('aria-pressed', state.showLineNumbers.toString());

  const label = state.windowStyle === 'mac' ? 'macOS' : state.windowStyle === 'win' ? 'Windows' : 'No Window';
  windowStyleButton.textContent = label;

  if (resolutionSelect) {
    resolutionSelect.value = String(state.resolution);
  }
};
