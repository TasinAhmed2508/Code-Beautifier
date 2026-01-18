import { detectLanguage } from '../utils/lang/detect.js';
import { formatCode } from '../utils/formatter.js';

export const bindPasteFormat = (refs, state, renderAll) => {
  if (!refs.codeInput) {
    return;
  }

  refs.codeInput.addEventListener('paste', (event) => {
    const clipboardText = event.clipboardData ? event.clipboardData.getData('text') : '';
    if (clipboardText) {
      event.preventDefault();
      const language = detectLanguage(clipboardText);
      const formatted = formatCode(clipboardText, language);
      state.code = formatted;
      refs.codeInput.value = state.code;
      renderAll(refs, state);
      return;
    }

    setTimeout(() => {
      const text = refs.codeInput.value || '';
      if (!text) return;
      const language = detectLanguage(text);
      const formatted = formatCode(text, language);
      state.code = formatted;
      refs.codeInput.value = state.code;
      renderAll(refs, state);
    }, 0);
  });
};
