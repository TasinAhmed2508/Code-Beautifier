export const updateExportCard = (exportCard, state) => {
  exportCard.dataset.theme = state.theme;
  exportCard.dataset.padding = state.padding;
  exportCard.dataset.window = state.windowStyle;
};
