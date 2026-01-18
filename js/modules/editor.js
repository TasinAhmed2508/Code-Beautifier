import { highlightLine } from './highlighter.js';

const buildLineNumbers = (lines) =>
  lines
    .map((_, index) => `<div class="line-number">${index + 1}</div>`)
    .join('');

const buildCodeLines = (lines) =>
  lines
    .map((line) => `<div class="code-line">${highlightLine(line)}</div>`)
    .join('');

export const renderEditor = ({
  code,
  showLineNumbers,
  highlightTarget,
  ghostTarget
}) => {
  const lines = code.split('\n');
  const lineNumbers = showLineNumbers
    ? `<div class="line-numbers">${buildLineNumbers(lines)}</div>`
    : '';

  const highlighted = `<div class="code-block">${buildCodeLines(lines)}</div>`;

  highlightTarget.innerHTML = `<div class="editor__lines">${lineNumbers}${highlighted}</div>`;
  ghostTarget.innerHTML = showLineNumbers
    ? `<div class="editor__lines editor__lines--ghost">${lineNumbers}</div>`
    : '';
};

