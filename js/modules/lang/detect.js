const RULES = [
  { lang: 'html', test: /<\/?[a-z][\s\S]*>/i },
  { lang: 'xml', test: /<\?xml|<\/?[A-Z_:-]+[\s\S]*>/ },
  { lang: 'markdown', test: /^#{1,6}\s|```|\*\*/m },
  { lang: 'css', test: /\{[^}]*:[^}]*\}/ },
  { lang: 'json', test: /"\s*:\s*[^\n]+/ },
  { lang: 'yaml', test: /^\s*[\w-]+:\s+/m },
  { lang: 'sql', test: /\bselect\b[\s\S]*\bfrom\b/i },
  { lang: 'shell', test: /^#!/m },
  { lang: 'python', test: /\bdef\s+\w+|\bimport\s+\w+|\bclass\s+\w+/ },
  { lang: 'php', test: /<\?php|\$\w+/ },
  { lang: 'ruby', test: /\bdef\s+\w+|\bmodule\b|\bend\b/ },
  { lang: 'swift', test: /\bfunc\s+\w+|\bimport\s+Foundation\b/ },
  { lang: 'kotlin', test: /\bfun\s+\w+|\bval\s+\w+|\bdata\s+class\b/ },
  { lang: 'go', test: /\bpackage\s+\w+|\bfunc\s+\w+/ },
  { lang: 'rust', test: /\bfn\s+\w+|\buse\s+\w+::/ },
  { lang: 'csharp', test: /\busing\s+System\b|\bnamespace\s+\w+/ },
  { lang: 'java', test: /\bpublic\s+class\b|System\.out\.println/ },
  { lang: 'cpp', test: /\bstd::|#include\s+<.+>|cout\s*<</ },
  { lang: 'c', test: /#include\s+<.+>|printf\s*\(/ },
  { lang: 'typescript', test: /\binterface\s+\w+|\btype\s+\w+\s*=/ },
  { lang: 'javascript', test: /\bimport\b|\bconst\b|\bfunction\b/ }
];

export const detectLanguage = (code = '') => {
  for (const rule of RULES) {
    if (rule.test.test(code)) {
      return rule.lang;
    }
  }
  return 'generic';
};
