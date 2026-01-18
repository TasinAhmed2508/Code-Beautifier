import { renderEditor } from './editor-renderer.js';
import { detectLanguage } from '../utils/lang/detect.js';

export const renderEditorView = (state, highlightLines, ghostLines) => {
  state.language = detectLanguage(state.code);
  renderEditor({
    code: state.code,
    showLineNumbers: state.showLineNumbers,
    highlightTarget: highlightLines,
    ghostTarget: ghostLines,
    language: state.language
  });
};
