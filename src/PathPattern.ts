import * as pathToRegexp from 'path-to-regexp';
import { PathRegExp, PathFunction, RegExpOptions, ParseOptions, Key } from 'path-to-regexp';
import { IPathPattern, Match } from './interface.d';

export type ContructorOptions = {
  exact?: boolean;
  strict?: boolean;
};

export type CacheContainer = {
  [key: string]: { [key: string]: { re?: PathRegExp, compile?: PathFunction } };
};

export class PathPattern<P> implements IPathPattern<P> {

  static cache: CacheContainer = {};

  private options: RegExpOptions & ParseOptions;
  private _optionsKey: string;

  private get optionsKey(): string {
    if (!this._optionsKey) {
      this._optionsKey = `${this.options.end}-${this.options.strict}`;
    }
    return this._optionsKey;
  }

  private get re(): PathRegExp {
    this.ensureCacheExist();
    const reCache: PathRegExp | undefined = PathPattern.cache[this.path][this.optionsKey].re;
    if (reCache === undefined) {
      const re: PathRegExp = pathToRegexp(this.path, this.options);
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
    private path: string,
    options: ContructorOptions = {},
  ) {
    const { exact = false, strict = false } = options;
    this.options = { end: exact, strict };
  }

  match(location: string): Match<P> | false {
    const match: RegExpExecArray | null = this.re.exec(location);

    if (!match) {
      return false;
    }

    const [url, ...values]: RegExpExecArray = match;
    const isExact: boolean = location === url;

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

  private ensureCacheExist(): void {
    if (!PathPattern.cache[this.path]) {
      PathPattern.cache[this.path] = {};
    }
    if (!PathPattern.cache[this.path][this.optionsKey]) {
      PathPattern.cache[this.path][this.optionsKey] = {};
    }
  }

}
