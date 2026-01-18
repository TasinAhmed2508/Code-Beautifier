const TOKEN_RULES = [
  { type: 'comment', regex: /\/\/.*|\/\*[\s\S]*?\*\//g, className: 'token-comment' },
  { type: 'string', regex: /(['"`])(.*?)\1/g, className: 'token-string' },
  { type: 'keyword', regex: /\b(const|let|var|function|return|if|else|for|while|import|from|export|default|class|extends|new|this|try|catch|async|await)\b/g, className: 'token-keyword' },
  { type: 'hook', regex: /\b(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef)\b/g, className: 'token-hook' },
  { type: 'function', regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g, className: 'token-function' },
  { type: 'component', regex: /\b([A-Z][a-zA-Z0-9_$]*)\b/g, className: 'token-component' },
  { type: 'number', regex: /\b\d+\b/g, className: 'token-number' },
  { type: 'operator', regex: /[=+\-*/&|!<>?:]/g, className: 'token-operator' },
  { type: 'brace', regex: /[{}\[\]()]/g, className: 'token-brace' }
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const splitWithToken = (text, rule) => {
  const segments = [];
  rule.regex.lastIndex = 0;
  const matches = [...text.matchAll(rule.regex)];

  if (matches.length === 0) {
    segments.push({ text, className: 'token-plain' });
    return segments;
  }

  let cursor = 0;
  matches.forEach((match) => {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), className: 'token-plain' });
    }
    segments.push({ text: match[0], className: rule.className });
    cursor = end;
  });

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), className: 'token-plain' });
  }

  return segments;
};

export const highlightLine = (line) => {
  let parts = [{ text: line, className: 'token-plain' }];

  TOKEN_RULES.forEach((rule) => {
    const nextParts = [];
    parts.forEach((part) => {
      if (part.className !== 'token-plain') {
        nextParts.push(part);
        return;
      }
      splitWithToken(part.text, rule).forEach((segment) => {
        nextParts.push(segment);
      });
    });
    parts = nextParts;
  });

  return parts
    .map((part) => {
      const safeText = escapeHtml(part.text || '');
      if (!safeText) {
        return '<span class="token-plain">&nbsp;</span>';
      }
      return `<span class="${part.className}">${safeText}</span>`;
    })
    .join('');
};

