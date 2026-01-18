import { buildSwatches } from './swatches.js';
import { updateExportCard } from './card.js';
import { updateToolbar } from './toolbar.js';
import { updateMode } from './mode.js';
import { renderEditorView } from './editor-view.js';

export const renderAll = (refs, state) => {
  buildSwatches(refs.themeSwatches, state);
  updateExportCard(refs.exportCard, state);
  updateToolbar(refs.paddingToggle, refs.toggleLines, refs.windowStyleButton, refs.resolutionSelect, state);
  updateMode(refs.app, state);
  renderEditorView(state, refs.highlightLines, refs.ghostLines);
};
