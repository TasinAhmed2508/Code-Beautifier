import { detectLanguage } from '../lang/detect.js';
import { highlightLine } from '../highlighter.js';
import { tokenizeLine } from './tokens.js';
import { buildGradientLayers } from './gradients.js';

const getPx = (value) => parseFloat(value || '0') || 0;
const tokenColor = (style, name, fallback) => style.getPropertyValue(name).trim() || fallback;

export const buildSvgFromCard = (card, scale = 1) => {
  const cardRect = card.getBoundingClientRect();
  const windowEl = card.querySelector('.window');
  const barEl = card.querySelector('.window__bar');
  const titleEl = card.querySelector('#window-title');
  const linesEl = card.querySelector('.line-numbers');
  const codeInput = card.querySelector('#code-input');

  const width = Math.round(cardRect.width * scale);
  const height = Math.round(cardRect.height * scale);
  const windowRect = windowEl.getBoundingClientRect();
  const barRect = barEl.getBoundingClientRect();
  const offsetX = Math.round((windowRect.left - cardRect.left) * scale);
  const offsetY = Math.round((windowRect.top - cardRect.top) * scale);
  const windowWidth = Math.round(windowRect.width * scale);
  const windowHeight = Math.round(windowRect.height * scale);
  const barHeight = Math.round(barRect.height * scale);

  const cardStyle = getComputedStyle(card);
  const winStyle = getComputedStyle(windowEl);
  const barStyle = getComputedStyle(barEl);
  const code = codeInput ? codeInput.value : '';
  const language = detectLanguage(code);
  const lines = code.split('\n');

  const padding = getPx(winStyle.paddingLeft) * scale || 24 * scale;
  const lineHeight = getPx(winStyle.lineHeight) * scale || 24 * scale;
  const fontSize = getPx(winStyle.fontSize) * scale || 14 * scale;
  const numberWidth = linesEl ? Math.round(linesEl.getBoundingClientRect().width * scale) : 0;
  const codeX = offsetX + padding + numberWidth;
  const codeY = offsetY + barHeight + padding + lineHeight;

  const tokens = {
    plain: tokenColor(cardStyle, '--token-foreground', '#ffffff'),
    comment: tokenColor(cardStyle, '--token-comment', '#8a757d'),
    string: tokenColor(cardStyle, '--token-string', '#e9aefe'),
    keyword: tokenColor(cardStyle, '--token-keyword', '#6599ff'),
    function: tokenColor(cardStyle, '--token-function', '#f8518d'),
    component: tokenColor(cardStyle, '--token-constant', '#49e8f2'),
    number: tokenColor(cardStyle, '--token-number', '#55e7b2'),
    operator: tokenColor(cardStyle, '--token-punctuation', '#a78bfa'),
    brace: tokenColor(cardStyle, '--token-punctuation', '#facc15')
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

  const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const textLines = lines.map((line, index) => {
    const segments = tokenizeLine(highlightLine, line, language);
    const x = codeX;
    const y = codeY + index * lineHeight;
    const tspans = segments.map((seg) =>
      `<tspan fill="${mapColor(seg.className)}">${escapeText(seg.text)}</tspan>`
    ).join('');
    return `<text x="${x}" y="${y}" font-size="${fontSize}" font-family="JetBrains Mono, monospace">${tspans}</text>`;
  }).join('');

  const numberLines = linesEl ? lines.map((_, index) => {
    const x = offsetX + padding + numberWidth - 8 * scale;
    const y = codeY + index * lineHeight;
    return `<text x="${x}" y="${y}" font-size="${fontSize}" text-anchor="end" fill="rgba(255,255,255,0.4)" font-family="JetBrains Mono, monospace">${index + 1}</text>`;
  }).join('') : '';

  const { defs, rects } = buildGradientLayers(cardStyle.backgroundImage);
  const cardRadius = Math.round(getPx(cardStyle.borderRadius) * scale) || 20 * scale;
  const windowRadius = Math.round(getPx(winStyle.borderRadius) * scale) || 12 * scale;

  const title = escapeText((titleEl ? titleEl.value : 'App.js'));
  return { svg: `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">` +
    `<defs>${defs}</defs>` +
    `<rect width="100%" height="100%" rx="${cardRadius}" ry="${cardRadius}" fill="${cardStyle.backgroundColor}"/>` +
    rects +
    `<rect x="${offsetX}" y="${offsetY}" width="${windowWidth}" height="${windowHeight}" rx="${windowRadius}" ry="${windowRadius}" fill="${winStyle.backgroundColor}"/>` +
    `<rect x="${offsetX}" y="${offsetY}" width="${windowWidth}" height="${barHeight}" rx="${windowRadius}" ry="${windowRadius}" fill="${barStyle.backgroundColor}"/>` +
    `<text x="${offsetX + windowWidth / 2}" y="${offsetY + barHeight / 2 + fontSize / 3}" font-size="${fontSize}" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Space Grotesk, sans-serif">${title}</text>` +
    `<circle cx="${offsetX + 18 * scale}" cy="${offsetY + barHeight / 2}" r="${6 * scale}" fill="#ff5f56"/>` +
    `<circle cx="${offsetX + 34 * scale}" cy="${offsetY + barHeight / 2}" r="${6 * scale}" fill="#ffbd2e"/>` +
    `<circle cx="${offsetX + 50 * scale}" cy="${offsetY + barHeight / 2}" r="${6 * scale}" fill="#27c93f"/>` +
    numberLines + textLines + `</svg>` };
};
