const decodeHtml = (value) =>
  value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export const tokenizeLine = (highlightLine, line, language) => {
  const html = highlightLine(line, language);
  const regex = /<span class="([^"]+)">([\s\S]*?)<\/span>/g;
  const tokens = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    tokens.push({
      className: match[1],
      text: decodeHtml(match[2] || '')
    });
  }
  if (tokens.length === 0) {
    tokens.push({ className: 'token-plain', text: line });
  }
  return tokens;
};
