export const getDomRefs = () => {
  const exportTrigger = document.getElementById('export-trigger');
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
    resolutionSelect: document.getElementById('resolution-select'),
    statusLanguage: document.getElementById('status-language'),
    statusTheme: document.getElementById('status-theme'),
    statusResolution: document.getElementById('status-resolution'),
    exportMenu: document.getElementById('export-menu'),
    exportTrigger,
    exportPanel: document.getElementById('export-panel'),
    exportText: exportTrigger ? exportTrigger.querySelector('.cta__text') : null
  };
};
