import { detectLanguage } from '../utils/lang/detect.js';
import { formatCode } from '../utils/formatter.js';

export const bindPasteFormat = (refs, state, renderAll) => {
  if (!refs.codeInput) {
    return;
  }

  const applyText = (text) => {
    if (!text) return;
    const language = detectLanguage(text);
    const formatted = formatCode(text, language);
    state.code = formatted;
    refs.codeInput.value = state.code;
    renderAll(refs, state);
  };

  refs.codeInput.addEventListener('paste', async (event) => {
    const clipboardText = event.clipboardData ? event.clipboardData.getData('text') : '';
    if (clipboardText) {
      event.preventDefault();
      applyText(clipboardText);
      return;
    }

    setTimeout(() => applyText(refs.codeInput.value || ''), 0);
  });
};
