import * as pathToRegexp from 'path-to-regexp';
import { Key, ParseOptions, PathFunction, RegExpOptions } from 'path-to-regexp';
import { normalizePathPattern } from './normalizePathPattern';
import { Match, MatchOptions, Matcher, Path, PathPattern } from './types';

type CacheContainer = {
  [key: string]: {
    compile: PathFunction | null;
    keys: Key[];
    re: { [key: string]: RegExp };
  };
};

const cache: CacheContainer = {};

export function createPattern<Params>(pattern: string): PathPattern<Params> {
  const nomalizedPettern = normalizePathPattern(pattern);

  function getPattern() {
    return nomalizedPettern;
  }

  function matchAdvanced(options: MatchOptions = {}): Matcher<Params> {
    return (path: Path) => {
      if (path === null || path === undefined) {
        return false;
      }
      const regExp = getRegExp(options);
      const keys = cache[nomalizedPettern].keys;
      const thematch = regExp.exec(path);

      if (!thematch) {
        return false;
      }

      const [url, ...values] = thematch;

      return {
        path: nomalizedPettern, // the path pattern used to match
        url: url, // the matched portion of the URL
        isExact: path === url, // whether or not we matched exactly
        params: keys.reduce((params: any, key: Key, index: number) => {
          params[key.name] = values[index];
          return params;
        }, {}),
      };
    };
  }

  function match(path: Path): Match<Params> {
    return matchAdvanced()(path);
  }

  function matchExact(path: Path): Match<Params> {
    return matchAdvanced({ exact: true })(path);
  }

  function matchStrict(path: Path): Match<Params> {
    return matchAdvanced({ exact: true, strict: true })(path);
  }

  function compile(params: Params): string {
    return getRegExpCompile()(params);
  }

  function getRegExp(options: MatchOptions): RegExp {
    ensureCacheExist();
    const optionKey = `${options.exact}-${options.strict}`;
    const regExpCache: RegExp | undefined = cache[nomalizedPettern].re[optionKey];

    if (regExpCache === undefined) {
      const { exact = false, strict = false } = options;
      const matchOptions: RegExpOptions & ParseOptions = { end: exact, strict };
      const keys: Key[] = [];
      const regExp = pathToRegexp(nomalizedPettern, keys, matchOptions);
      cache[nomalizedPettern].re[optionKey] = regExp;
      cache[nomalizedPettern].keys = keys;

      return regExp;
    } else {
      return regExpCache;
    }
  }

  function getRegExpCompile(): PathFunction {
    ensureCacheExist();
    const compileCache: PathFunction | null = cache[nomalizedPettern].compile;

    if (compileCache === null) {
      const compileFunc = pathToRegexp.compile(nomalizedPettern);
      cache[nomalizedPettern].compile = compileFunc;

      return compileFunc;
    } else {
      return compileCache;
    }
  }

  function ensureCacheExist(): void {
    if (!cache[nomalizedPettern]) {
      cache[nomalizedPettern] = {
        re: {},
        compile: null,
        keys: [],
      };
    }
  }

  return {
    match,
    matchAdvanced,
    matchExact,
    matchStrict,
    getPattern,
    compile,
  };
}
