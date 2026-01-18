const STRING = /(['"`])(?:\\.|(?!\\1)[^\\\\])*\\1/g;
const NUMBER = /\b\d+(?:\.\d+)?\b/g;
const OPERATOR = /[=+\-*/&|!<>?:]/g;
const BRACE = /[{}\[\]()]/g;
const FUNCTION = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g;
const COMPONENT = /\b([A-Z][a-zA-Z0-9_$]*)\b/g;

const makeRules = (comment, keyword, string = STRING) => [
  { type: 'comment', regex: comment, className: 'token-comment' },
  { type: 'string', regex: string, className: 'token-string' },
  { type: 'keyword', regex: keyword, className: 'token-keyword' },
  { type: 'function', regex: FUNCTION, className: 'token-function' },
  { type: 'component', regex: COMPONENT, className: 'token-component' },
  { type: 'number', regex: NUMBER, className: 'token-number' },
  { type: 'operator', regex: OPERATOR, className: 'token-operator' },
  { type: 'brace', regex: BRACE, className: 'token-brace' }
];

const RULES = {
  generic: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:const|let|var|function|return|if|else|for|while)\b/g),
  javascript: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:const|let|var|function|return|if|else|for|while|import|from|export|class|new|this|async|await)\b/g),
  typescript: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:const|let|type|interface|enum|return|if|else|for|while|import|from|export|class|new|this|async|await)\b/g),
  python: makeRules(/#.*/g, /\b(?:def|class|return|if|elif|else|for|while|import|from|as|try|except|with|lambda|async|await|yield|pass|break|continue)\b/g),
  c: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:int|char|float|double|void|struct|typedef|enum|return|if|else|for|while|switch|case|break|continue|static|const|sizeof)\b/g),
  cpp: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:int|char|float|double|void|class|struct|namespace|using|template|return|if|else|for|while|switch|case|break|continue|const|constexpr|new|delete|nullptr)\b/g),
  java: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:class|interface|extends|implements|public|private|protected|static|final|return|if|else|for|while|try|catch|new)\b/g),
  csharp: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:class|interface|namespace|public|private|protected|static|return|if|else|for|while|try|catch|using|new)\b/g),
  go: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:package|import|func|return|if|else|for|range|struct|type|go|defer)\b/g),
  rust: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:fn|let|mut|pub|impl|trait|struct|enum|use|mod|match|return)\b/g),
  php: makeRules(/\/\/.*|#.*|\/\*[\s\S]*?\*\//g, /\b(?:function|class|public|private|protected|return|if|else|foreach|as|try|catch|namespace|use|new)\b/g),
  ruby: makeRules(/#.*/g, /\b(?:def|class|module|end|if|elsif|else|while|do|return|yield|require|include)\b/g),
  swift: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:func|class|struct|enum|let|var|return|if|else|for|while|import|guard|protocol|extension)\b/g),
  kotlin: makeRules(/\/\/.*|\/\*[\s\S]*?\*\//g, /\b(?:fun|class|object|interface|val|var|return|if|else|for|while|when|import)\b/g),
  shell: makeRules(/#.*/g, /\b(?:if|then|fi|for|while|do|done|case|esac|function|in|echo|export|return)\b/g),
  sql: makeRules(/--.*|\/\*[\s\S]*?\*\//g, /\b(?:select|from|where|join|inner|left|right|on|group|by|order|insert|into|values|update|set|delete|create|table|alter|drop|and|or|as|limit|offset)\b/gi),
  html: makeRules(/<!--[\s\S]*?-->/g, /<\/?[a-zA-Z][^>]*>/g, /"[^"]*"|'[^']*'/g),
  xml: makeRules(/<!--[\s\S]*?-->/g, /<\/?[^>]+>/g, /"[^"]*"|'[^']*'/g),
  css: makeRules(/\/\*[\s\S]*?\*\//g, /\b(?:color|background|display|flex|grid|position|margin|padding|border|font|width|height)\b/g),
  json: makeRules(/$^/g, /"(?:\\.|[^"\\])*"(?=\s*:)/g, /"(?:\\.|[^"\\])*"/g),
  yaml: makeRules(/#.*/g, /[\w-]+:(?=\s)/g, /"[^"]*"|'[^']*'/g),
  markdown: makeRules(/$^/g, /^(#{1,6}\s.*)|(```.*)|(\*\*.+?\*\*)|(__.+?__)/g, /`[^`]*`/g)
};

export const getTokenRules = (language = 'generic') => RULES[language] || RULES.generic;
