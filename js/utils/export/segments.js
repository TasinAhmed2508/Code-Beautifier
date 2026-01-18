import { tokenizeLine } from '../svg/tokens.js';

const getVar = (style, name, fallback) => style.getPropertyValue(name).trim() || fallback;

export const buildSegments = (code, language, highlightLine, style) => {
  const tokens = {
    plain: getVar(style, '--token-foreground', '#ffffff'),
    comment: getVar(style, '--token-comment', '#8a757d'),
    string: getVar(style, '--token-string', '#e9aefe'),
    keyword: getVar(style, '--token-keyword', '#6599ff'),
    function: getVar(style, '--token-function', '#f8518d'),
    component: getVar(style, '--token-constant', '#49e8f2'),
    number: getVar(style, '--token-number', '#55e7b2'),
    operator: getVar(style, '--token-punctuation', '#a78bfa'),
    brace: getVar(style, '--token-punctuation', '#facc15')
  };

  const mapColor = (className) => {
    if (className.includes('comment')) return tokens.comment;
    if (className.includes('string')) return tokens.string;
    if (className.includes('keyword')) return tokens.keyword;
    if (className.includes('function')) return tokens.function;
    if (className.includes('component')) return tokens.component;
    if (className.includes('number')) return tokens.number;
    if (className.includes('operator')) return tokens.operator;
    if (className.includes('brace')) return tokens.brace;
    return tokens.plain;
  };
  

  const lines = code.split('\n');
  const segments = [];
  lines.forEach((line, index) => {
    const parts = tokenizeLine(highlightLine, line, language);
    parts.forEach((part) => {
      segments.push({ t: part.text, c: mapColor(part.className) });
    });
    if (index < lines.length - 1) {
      segments.push({ t: '\n', c: tokens.plain });
    }
  });
  return segments;
};
