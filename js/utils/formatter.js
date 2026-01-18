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

export const formatCode = async (code, language) => {
  const parser = getParser(language);
  if (!parser || !window.prettier) {
    return code;
  }

  try {
    const result = window.prettier.format(code, {
      parser,
      plugins: window.prettierPlugins,
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      singleQuote: true
    });
    if (result && typeof result.then === 'function') {
      return await result;
    }
    return result;
  } catch (error) {
    console.warn('Format failed', error);
    return code;
  }
};
