import { detectLanguage } from '../utils/lang/detect.js';
import { formatCode } from '../utils/formatter.js';

export const bindPasteFormat = (refs, state, renderAll) => {
  if (!refs.codeInput) {
    return;
  }

  refs.codeInput.addEventListener('paste', (event) => {
    const text = event.clipboardData ? event.clipboardData.getData('text') : '';
    if (!text) return;

    event.preventDefault();
    const language = detectLanguage(text);
    const formatted = formatCode(text, language);
    state.code = formatted;
    refs.codeInput.value = state.code;
    renderAll(refs, state);
  });
};
