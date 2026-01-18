import { buildSvgFromCard } from '../svg/renderer.js';
import { buildAnimatedHtml } from './animated-html.js';

export const downloadSvg = (card, scale) => {
  const { svg } = buildSvgFromCard(card, scale);
  triggerDownload(svg, 'code-snippet.svg', 'image/svg+xml');
};

export const downloadHtml = (card, code, title) => {
  const html = buildAnimatedHtml(card, code, title);
  triggerDownload(html, 'code-snippet.html', 'text/html');
};

export const downloadPng = (canvas) => {
  const link = document.createElement('a');
  link.download = 'code-snippet.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const triggerDownload = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
