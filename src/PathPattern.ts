import * as pathToRegexp from 'path-to-regexp';
import { PathRegExp, PathFunction, RegExpOptions, ParseOptions, Key } from 'path-to-regexp';
import { Location } from 'history';

export type MatchSuccess<P> = {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
};

export type Match<P> = false | MatchSuccess<P>;

export type MatchOptions = {
  exact?: boolean;
  strict?: boolean;
};

export type CacheContainer = {
  [key: string]: {
    compile: PathFunction | null,
    re: { [key: string]: PathRegExp },
  };
};

export interface IMatchable<ParentParams, Params> {
  match(options: MatchOptions): (location: Location, parentMatch: Match<ParentParams>) => Match<Params>;
}

export class PathPattern<P> implements IMatchable<any, P> {

  static cache: CacheContainer = {};

  private path: string;

  private getOptionsKey(options: MatchOptions): string {
    return `${options.exact}-${options.strict}`;
  }

  private getRe(options: MatchOptions): PathRegExp {
    this.ensureCacheExist();
    const optionKey: string = this.getOptionsKey(options);
    const reCache: PathRegExp | undefined = PathPattern.cache[this.path].re[optionKey];
    if (reCache === undefined) {
      const { exact = false, strict = false } = options;
      const matchOptions: RegExpOptions & ParseOptions = { end: exact, strict };
      const re: PathRegExp = pathToRegexp(this.path, matchOptions);
      PathPattern.cache[this.path].re[optionKey] = re;
      return re;
    } else {
      return reCache;
    }
  }

  private get reCompile(): PathFunction {
    this.ensureCacheExist();
    const compileCache: PathFunction | null = PathPattern.cache[this.path].compile;
    if (compileCache === null) {
      const compile: PathFunction = pathToRegexp.compile(this.path);
      PathPattern.cache[this.path].compile = compile;
      return compile;
    } else {
      return compileCache;
    }
  }

  constructor(path: string) {
    // make sure path start with '/'
    this.path = '/' + path.replace(/^(\/+)/, '');
  }

  match(options: MatchOptions = {}): (location: Location) => Match<P> {
    return (location: Location) => {
      const re: PathRegExp = this.getRe(options);
      const match: RegExpExecArray | null = re.exec(location.pathname);

      if (!match) {
        return false;
      }

      const [url, ...values]: RegExpExecArray = match;
      const isExact: boolean = location.pathname === url;

      return {
        path: this.path, // the path pattern used to match
        url: (this.path === '/' && url === '') ? '/' : url, // the matched portion of the URL
        isExact, // whether or not we matched exactly
        params: re.keys.reduce(
          (memo: any, key: Key, index: number) => {
            memo[key.name] = values[index];
            return memo;
          },
          {},
        ),
      };
    };
  }

  compile(params?: P): string {
    return this.reCompile(params);
  }

  /**
   * @returns {string} The path starting with / and eding without /
   * @memberof PathPattern
   */
  getFormatedPath(): string {
    return '/' + this.path.replace(/(\/+)$/, '').replace(/^(\/+)/, '');
  }

  private ensureCacheExist(): void {
    if (!PathPattern.cache[this.path]) {
      PathPattern.cache[this.path] = {
        re: {},
        compile: null,
      };
    }
  }

}
