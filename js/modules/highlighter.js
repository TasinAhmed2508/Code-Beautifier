import { getTokenRules } from './lang/rules.js';

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

export const highlightLine = (line, language = 'generic') => {
  let parts = [{ text: line, className: 'token-plain' }];
  const tokenRules = getTokenRules(language);

  tokenRules.forEach((rule) => {
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
