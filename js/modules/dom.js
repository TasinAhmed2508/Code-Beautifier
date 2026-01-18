export const getDomRefs = () => {
  const exportButton = document.getElementById('export-image');
  return {
    app: document.querySelector('.app'),
    exportCard: document.getElementById('export-card'),
    themeSwatches: document.getElementById('theme-swatches'),
    paddingToggle: document.getElementById('padding-toggle'),
    windowStyleButton: document.getElementById('window-style'),
    toggleLines: document.getElementById('toggle-lines'),
    highlightLines: document.getElementById('highlight-lines'),
    ghostLines: document.getElementById('ghost-lines'),
    codeInput: document.getElementById('code-input'),
    toggleMode: document.getElementById('toggle-mode'),
    exportButton,
    exportText: exportButton ? exportButton.querySelector('.cta__text') : null
  };
};
