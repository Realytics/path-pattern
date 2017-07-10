import { Location } from 'history';
import * as pathToRegexp from 'path-to-regexp';
import { Key, ParseOptions, PathFunction, PathRegExp, RegExpOptions } from 'path-to-regexp';
import { AbstractPathPattern } from './AbstractPathPattern';
import { Match } from './Match';
import { MatchOptions } from './Matchable';
import { Matcher } from './Matcher';

type CacheContainer = {
  [key: string]: {
    compile: PathFunction | null,
    re: { [key: string]: PathRegExp },
  };
};

export class PathPattern<Params = any> extends AbstractPathPattern<Params> {

  private static cache: CacheContainer = {};

  matchAdvanced(options: MatchOptions = {}): Matcher<Params> {
    return (location: Location) => {
      if (!location || location.pathname === null || location.pathname === undefined) {
        return false;
      }
      const regExp = this.getRegExp(options);
      const match = regExp.exec(location.pathname);

      if (!match) {
        return false;
      }

      const [url, ...values] = match;

      return {
        path: this.pattern, // the path pattern used to match
        url: (this.pattern === '/' && url === '') ? '/' : url, // the matched portion of the URL
        isExact: location.pathname === url, // whether or not we matched exactly
        params: regExp.keys.reduce(
          (params: any, key: Key, index: number) => {
            params[key.name] = values[index];
            return params;
          },
          {},
        ),
      };
    };
  }

  match(location: Location): Match<Params> {
    return this.matchAdvanced()(location);
  }

  matchExact(location: Location): Match<Params> {
    return this.matchAdvanced({ exact: true })(location);
  }

  matchStrict(location: Location): Match<Params> {
    return this.matchAdvanced({ exact: true, strict: true })(location);
  }

  compile(params?: Params): string {
    return this.getRegExpCompile()(params);
  }

  private getRegExp(options: MatchOptions): PathRegExp {
    this.ensureCacheExist();
    const optionKey = `${options.exact}-${options.strict}`;
    const regExpCache: PathRegExp | undefined = PathPattern.cache[this.pattern].re[optionKey];

    if (regExpCache === undefined) {
      const { exact = false, strict = false } = options;
      const matchOptions: RegExpOptions & ParseOptions = { end: exact, strict };

      const regExp = pathToRegexp(this.pattern, matchOptions);
      PathPattern.cache[this.pattern].re[optionKey] = regExp;

      return regExp;
    } else {
      return regExpCache;
    }
  }

  private getRegExpCompile(): PathFunction {
    this.ensureCacheExist();
    const compileCache: PathFunction | null = PathPattern.cache[this.pattern].compile;

    if (compileCache === null) {
      const compile = pathToRegexp.compile(this.pattern);
      PathPattern.cache[this.pattern].compile = compile;

      return compile;
    } else {
      return compileCache;
    }
  }

  private ensureCacheExist(): void {
    if (!PathPattern.cache[this.pattern]) {
      PathPattern.cache[this.pattern] = {
        re: {},
        compile: null,
      };
    }
  }
}
