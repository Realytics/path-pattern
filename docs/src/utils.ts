import * as hljs from 'highlight.js';
import * as MarkdownIt from 'markdown-it';

export const mdIt: MarkdownIt.MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
      } catch (error) {
        // do nothing
        console.error(error);
      }
    }

    return '<pre class="hljs"><code>' + mdIt.utils.escapeHtml(str) + '</code></pre>';
  },
});

export type CodeObject<T> = {
  source: string;
  // cb: () => T;
  output: T;
  key: string;
};

export function code<T>(codeContent: any, id: string, cb: () => T): CodeObject<T> {
  return {
    source: codeContent[id],
    // cb,
    output: cb(),
    key: id,
  };
}

export function codeParams<T, P>(codeContent: any, id: string, cb: (params: P) => T, params: P): CodeObject<T> {
  return {
    source: codeContent[id],
    // cb: () => cb(params),
    output: cb(params),
    key: id,
  };
}
