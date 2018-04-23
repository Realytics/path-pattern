import * as pathToRegexp from 'path-to-regexp';
import {
  Key,
  ParseOptions,
  PathFunction,
  RegExpOptions
  } from 'path-to-regexp';
import {
  Match,
  Matcher,
  MatchOptions,
  Path,
  Pattern,
  PatternWithParams
  } from './types';
import { normalizePathPattern } from './normalizePathPattern';

type CacheContainer = {
  [key: string]: {
    compiled: PathFunction | null;
    keys: Key[];
    re: { [key: string]: RegExp };
  };
};

export abstract class PathPatternBase<Params extends object> {
  private static cache: CacheContainer = {};

  private nomalizedPattern: string;

  constructor(pattern: string) {
    this.nomalizedPattern = normalizePathPattern(pattern);

    this.compile = this.compile.bind(this);
    this.match = this.match.bind(this);
    this.matchAdvanced = this.matchAdvanced.bind(this);
    this.matchExact = this.matchExact.bind(this);
    this.matchStrict = this.matchStrict.bind(this);
  }

  getPattern() {
    return this.nomalizedPattern;
  }

  matchAdvanced(options: MatchOptions = {}): Matcher<Params> {
    return (path: Path) => {
      if (path === null || path === undefined) {
        return false;
      }
      const regExp = this.getRegExp(options);
      const keys = PathPatternBase.cache[this.nomalizedPattern].keys;
      const thematch = regExp.exec(path);

      if (!thematch) {
        return false;
      }

      const [url, ...values] = thematch;

      return {
        path: this.nomalizedPattern, // the path pattern used to match
        url: url, // the matched portion of the URL
        isExact: path === url, // whether or not we matched exactly
        params: keys.reduce((params: any, key: Key, index: number) => {
          params[key.name] = values[index];
          return params;
        }, {}),
      };
    };
  }

  match(path: Path): Match<Params> {
    return this.onMatch(this.matchAdvanced()(path));
  }

  matchExact(path: Path): Match<Params> {
    return this.onMatch(this.matchAdvanced({ exact: true })(path));
  }

  matchStrict(path: Path): Match<Params> {
    return this.onMatch(this.matchAdvanced({ exact: true, strict: true })(path));
  }

  compile(params?: Params): string {
    return this.getRegExpCompiled()(params);
  }

  protected onMatch(match: Match<Params>): Match<Params> {
    return match;
  }

  protected getRegExp(options: MatchOptions): RegExp {
    this.ensureCacheExist();
    const optionKey = `${options.exact}-${options.strict}`;
    const regExpCache: RegExp | undefined = PathPatternBase.cache[this.nomalizedPattern].re[optionKey];

    if (regExpCache === undefined) {
      const { exact = false, strict = false } = options;
      const matchOptions: RegExpOptions & ParseOptions = { end: exact, strict };
      const keys: Key[] = [];
      const regExp = pathToRegexp(this.nomalizedPattern, keys, matchOptions);
      PathPatternBase.cache[this.nomalizedPattern].re[optionKey] = regExp;
      PathPatternBase.cache[this.nomalizedPattern].keys = keys;

      return regExp;
    } else {
      return regExpCache;
    }
  }

  protected getRegExpCompiled(): PathFunction {
    this.ensureCacheExist();
    const compiledCache: PathFunction | null = PathPatternBase.cache[this.nomalizedPattern].compiled;

    if (compiledCache === null) {
      const compiled = pathToRegexp.compile(this.nomalizedPattern);
      PathPatternBase.cache[this.nomalizedPattern].compiled = compiled;

      return compiled;
    } else {
      return compiledCache;
    }
  }

  protected ensureCacheExist(): void {
    if (!PathPatternBase.cache[this.nomalizedPattern]) {
      PathPatternBase.cache[this.nomalizedPattern] = {
        re: {},
        compiled: null,
        keys: [],
      };
    }
  }
}

export class PathPattern extends PathPatternBase<{}> implements Pattern {
  compile(): string {
    return super.getRegExpCompiled()({});
  }

  extends(subpattern: string): Pattern;
  extends<ParentParams extends object>(subpattern: string): PatternWithParams<ParentParams> {
    return new PathPattern(this.getPattern() + normalizePathPattern(subpattern)) as any;
  }

  protected onMatch(match: Match<{}>): Match<{}> {
    if (match !== false && Object.keys(match.params).length > 0) {
      console.warn(`PathPattern found params, use PathPatternWithParams instead`);
    }
    return match;
  }
}

export class PathPatternWithParams<Params extends object> extends PathPatternBase<Params>
  implements PatternWithParams<Params> {
  compile(params: Params): string {
    return super.getRegExpCompiled()(params);
  }

  extends(subpattern: string): PatternWithParams<Params>;
  extends<ParentParams extends object>(subpattern: string): PatternWithParams<ParentParams & Params> {
    return new PathPatternWithParams<Params>(this.getPattern() + normalizePathPattern(subpattern)) as any;
  }
}
