import { exportAsImage } from './exporter.js';

export const bindExportMenu = (refs, state) => {
  const { exportMenu, exportTrigger, exportPanel, exportText, exportCard } = refs;
  if (!exportMenu || !exportTrigger || !exportPanel || !exportText || !exportCard) {
    return;
  }

  const openMenu = () => {
    exportMenu.classList.add('is-open');
    exportTrigger.setAttribute('aria-expanded', 'true');
    exportPanel.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    exportMenu.classList.remove('is-open');
    exportTrigger.setAttribute('aria-expanded', 'false');
    exportPanel.setAttribute('aria-hidden', 'true');
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    if (exportMenu.classList.contains('is-open')) {
      closeMenu();
      return;
    }
    openMenu();
  };

  exportTrigger.addEventListener('click', toggleMenu);

  exportPanel.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-export]');
    if (!button) return;
    const mode = button.dataset.export;
    await exportAsImage({
      element: exportCard,
      button: exportTrigger,
      status: exportText,
      mode,
      scale: state.resolution,
      onDone: closeMenu
    });
  });

  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
};
