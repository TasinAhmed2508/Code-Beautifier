export const updateStatus = (state, statusLanguage, statusTheme, statusResolution) => {
  if (statusLanguage) {
    statusLanguage.textContent = `Language: ${state.language || 'auto'}`;
  }
  if (statusTheme) {
    statusTheme.textContent = `Theme: ${state.theme || 'default'}`;
  }
  if (statusResolution) {
    const label = state.resolution === 2 ? '1K'
      : state.resolution === 3 ? '2K'
      : state.resolution === 4 ? '4K'
      : state.resolution === 6 ? '6K'
      : state.resolution === 8 ? '8K'
      : `${state.resolution}x`;
    statusResolution.textContent = `Export: ${label}`;
  }
};
