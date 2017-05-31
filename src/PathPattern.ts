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

export type ContructorOptions = {
  exact?: boolean;
  strict?: boolean;
};

export type CacheContainer = {
  [key: string]: { [key: string]: { re?: PathRegExp, compile?: PathFunction } };
};

export interface IMatchable<ParentParams, Params> {
  match(location: Location, parentMatch: Match<ParentParams>): Match<Params>;
}

export class PathPattern<P> implements IMatchable<any, P> {

  static cache: CacheContainer = {};

  private matchOptions: RegExpOptions & ParseOptions;
  private _optionsKey: string;

  private path: string;

  private get optionsKey(): string {
    if (!this._optionsKey) {
      this._optionsKey = `${this.matchOptions.end}-${this.matchOptions.strict}`;
    }
    return this._optionsKey;
  }

  private get re(): PathRegExp {
    this.ensureCacheExist();
    const reCache: PathRegExp | undefined = PathPattern.cache[this.path][this.optionsKey].re;
    if (reCache === undefined) {
      const re: PathRegExp = pathToRegexp(this.path, this.matchOptions);
      PathPattern.cache[this.path][this.optionsKey].re = re;
      return re;
    } else {
      return reCache;
    }
  }

  private get reCompile(): PathFunction {
    this.ensureCacheExist();
    const compileCache: PathFunction | undefined = PathPattern.cache[this.path][this.optionsKey].compile;
    if (compileCache === undefined) {
      const compile: PathFunction = pathToRegexp.compile(this.path);
      PathPattern.cache[this.path][this.optionsKey].compile = compile;
      return compile;
    } else {
      return compileCache;
    }
  }

  constructor(
    path: string,
    private options: ContructorOptions = {},
  ) {
    // make sure path start with '/'
    this.path = '/' + path.replace(/^(\/+)/, '');
    const { exact = false, strict = false } = options;
    this.matchOptions = { end: exact, strict };
  }

  match(location: Location): Match<P> {
    const match: RegExpExecArray | null = this.re.exec(location.pathname);

    if (!match) {
      return false;
    }

    const [url, ...values]: RegExpExecArray = match;
    const isExact: boolean = location.pathname === url;

    return {
      path: this.path, // the path pattern used to match
      url: (this.path === '/' && url === '') ? '/' : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: this.re.keys.reduce(
        (memo: any, key: Key, index: number) => {
          memo[key.name] = values[index];
          return memo;
        },
        {},
      ),
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

  getOptions(): ContructorOptions {
    return this.options;
  }

  private ensureCacheExist(): void {
    if (!PathPattern.cache[this.path]) {
      PathPattern.cache[this.path] = {};
    }
    if (!PathPattern.cache[this.path][this.optionsKey]) {
      PathPattern.cache[this.path][this.optionsKey] = {};
    }
  }

}
