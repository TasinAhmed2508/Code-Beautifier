const PARSERS = {
  javascript: 'babel',
  typescript: 'typescript',
  json: 'json',
  html: 'html',
  xml: 'html',
  css: 'css',
  markdown: 'markdown',
  yaml: 'yaml'
};

const getParser = (language) => PARSERS[language] || null;

export const formatCode = (code, language) => {
  const parser = getParser(language);
  if (!parser || !window.prettier) {
    return code;
  }

  try {
    return window.prettier.format(code, {
      parser,
      plugins: window.prettierPlugins,
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      singleQuote: true
    });
  } catch (error) {
    console.warn('Format failed', error);
    return code;
  }
};
