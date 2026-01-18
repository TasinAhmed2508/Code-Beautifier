const splitTopLevel = (value) => {
  const parts = [];
  let depth = 0;
  let buf = '';
  for (const char of value) {
    if (char == '(') depth += 1;
    if (char == ')') depth -= 1;
    if (char == ',' && depth == 0) {
      parts.push(buf.trim());
      buf = '';
      continue;
    }
    buf += char;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
};

const parseColors = (items) => items.filter((item) => /#|rgb/.test(item));

const angleToCoords = (deg) => {
  const rad = (deg - 90) * Math.PI / 180;
  const x2 = 50 + Math.cos(rad) * 50;
  const y2 = 50 + Math.sin(rad) * 50;
  return { x1: 100 - x2, y1: 100 - y2, x2, y2 };
};

const parsePosition = (value) => {
  const pos = value.match(/at\s+([^,]+)/i);
  const words = pos ? pos[1].trim().split(/\s+/) : ['center'];
  const map = { left: 0, center: 50, right: 100, top: 0, bottom: 100 };
  const x = map[words[0]] ?? 50;
  const y = map[words[1]] ?? map[words[0]] ?? 50;
  return { cx: x, cy: y };
};

const parseGradient = (value) => {
  const inner = value.slice(value.indexOf('(') + 1, -1);
  const parts = splitTopLevel(inner);
  if (value.startsWith('linear-gradient')) {
    const angle = /deg/.test(parts[0]) ? parseFloat(parts.shift()) : 180;
    return { type: 'linear', angle, colors: parseColors(parts) };
  }
  if (value.startsWith('radial-gradient')) {
    const position = /at\s/.test(parts[0]) ? parts.shift() : '';
    return { type: 'radial', position, colors: parseColors(parts) };
  }
  return null;
};

export const buildGradientLayers = (cssValue) => {
  if (!cssValue || cssValue === 'none') return { defs: '', rects: '' };
  const layers = splitTopLevel(cssValue).map(parseGradient).filter(Boolean);
  const defs = [];
  const rects = [];
  layers.forEach((layer, index) => {
    const id = `g${index}`;
    const colors = layer.colors.length ? layer.colors : ['#0b0d11', '#0b0d11'];
    if (layer.type === 'linear') {
      const { x1, y1, x2, y2 } = angleToCoords(layer.angle);
      defs.push(`<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">` +
        `<stop offset="0%" stop-color="${colors[0]}"/>` +
        `<stop offset="100%" stop-color="${colors[1]}"/></linearGradient>`);
    } else {
      const { cx, cy } = parsePosition(layer.position || '');
      defs.push(`<radialGradient id="${id}" cx="${cx}%" cy="${cy}%" r="70%">` +
        `<stop offset="0%" stop-color="${colors[0]}"/>` +
        `<stop offset="100%" stop-color="${colors[1]}"/></radialGradient>`);
    }
    rects.push(`<rect width="100%" height="100%" fill="url(#${id})"/>`);
  });
  return { defs: defs.join(''), rects: rects.join('') };
};
