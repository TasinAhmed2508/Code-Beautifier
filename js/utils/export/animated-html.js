import { detectLanguage } from '../lang/detect.js';
import { highlightLine } from '../highlighter.js';
import { buildSegments } from './segments.js';

const escapeForTemplate = (value) =>
  value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');

const safeJson = (value) => JSON.stringify(value).replace(/<\//g, '<\\/');

export const buildAnimatedHtml = (card, code, title) => {
  const cardStyle = getComputedStyle(card);
  const windowEl = card.querySelector('.window');
  const barEl = card.querySelector('.window__bar');
  const windowStyle = windowEl ? getComputedStyle(windowEl) : null;
  const barStyle = barEl ? getComputedStyle(barEl) : null;
  const bgImage = cardStyle.backgroundImage || 'none';
  const bgColor = cardStyle.backgroundColor || '#0b0d11';
  const panelBg = windowStyle ? windowStyle.backgroundColor : 'rgba(20,20,24,0.9)';
  const barBg = barStyle ? barStyle.backgroundColor : 'rgba(24,24,28,0.9)';
  const safeTitle = escapeForTemplate(title || 'App.js');
  const language = detectLanguage(code);
  const segments = buildSegments(code, language, highlightLine, cardStyle);
  const payload = safeJson(segments);

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    `  <title>${safeTitle} - TA ZEN Export</title>`,
    '  <style>',
    '    :root { color-scheme: dark; }',
    '    * { box-sizing: border-box; }',
    `    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: 'Space Grotesk', sans-serif; background-image: ${bgImage}; background-color: ${bgColor}; }`,
    `    .card { padding: 48px; border-radius: 20px; background-image: ${bgImage}; background-color: ${bgColor}; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }`,
    `    .window { width: 640px; border-radius: 14px; overflow: hidden; background: ${panelBg}; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 24px 48px rgba(0,0,0,0.45); }`,
    `    .bar { background: ${barBg}; padding: 12px 16px; display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.6); font-size: 12px; }`,
    '    .dot { width: 12px; height: 12px; border-radius: 999px; }',
    '    .dot.red { background: #ff5f56; }',
    '    .dot.yellow { background: #ffbd2e; }',
    '    .dot.green { background: #27c93f; }',
    '    .title { margin: 0 auto; }',
    '    pre { margin: 0; padding: 24px; color: #f8fafc; font-family: "JetBrains Mono", monospace; font-size: 14px; line-height: 24px; white-space: pre; }',
    '    .caret { display: inline-block; width: 8px; height: 16px; background: #f8fafc; margin-left: 2px; animation: blink 0.9s steps(1) infinite; }',
    '    @keyframes blink { 50% { opacity: 0; } }',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="card">',
    '    <div class="window">',
    '      <div class="bar">',
    '        <span class="dot red"></span>',
    '        <span class="dot yellow"></span>',
    '        <span class="dot green"></span>',
    `        <span class="title">${safeTitle}</span>`,
    '      </div>',
    '      <pre id="code"></pre>',
    '    </div>',
    '  </div>',
    '  <script>',
    `    const segments = ${payload};`,
    '    const target = document.getElementById("code");',
    '    let segIndex = 0;',
    '    let charIndex = 0;',
    '    let span = null;',
    '    const speed = 12;',
    '    const nextSpan = (color) => {',
    '      span = document.createElement("span");',
    '      span.style.color = color;',
    '      target.appendChild(span);',
    '    };',
    '    const tick = () => {',
    '      const seg = segments[segIndex];',
    '      if (!seg) {',
    '        const caret = document.createElement("span");',
    '        caret.className = "caret";',
    '        target.appendChild(caret);',
    '        return;',
    '      }',
    '      if (!span) nextSpan(seg.c);',
    '      span.textContent += seg.t.charAt(charIndex);',
    '      charIndex += 1;',
    '      if (charIndex >= seg.t.length) {',
    '        charIndex = 0;',
    '        segIndex += 1;',
    '        span = null;',
    '      }',
    '      setTimeout(tick, speed);',
    '    };',
    '    tick();',
    '  </script>',
    '</body>',
    '</html>'
  ].join('\n');
};
