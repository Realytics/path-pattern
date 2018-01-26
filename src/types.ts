export interface PatternAware {
  getPattern(): string;
}

export type Path = string | null;

export type Matcher<Params extends object = {}> = (path: string | null) => Match<Params>;

export type MatchSuccess<Params = any> = {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
};

export type Match<Params extends object = {}> = false | MatchSuccess<Params>;

export interface PathPattern<Params extends object = {}> extends Matchable<Params>, PatternAware {
  compile(params: Params): string;
}

export interface RelativePathPattern<ParentParams extends object = {}, Params extends object = {}>
  extends RelativeMatchable<ParentParams, Params>,
    PatternAware {
  compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string;
}

export type MatchOptions = {
  exact?: boolean;
  strict?: boolean;
};

export interface Matchable<Params extends object = {}> {
  matchAdvanced(options?: MatchOptions): (path: Path) => Match<Params>;
  match(path: Path): Match<Params>;
  matchExact(path: Path): Match<Params>;
  matchStrict(path: Path): Match<Params>;
}

export interface RelativeMatchable<ParentParams extends object = {}, Params extends object = {}>
  extends Matchable<Params> {
  matchAdvanced(options?: MatchOptions): (path: Path, parentMatch?: Match<ParentParams>) => Match<Params>;
  match(path: Path, parentMatch?: Match<ParentParams>): Match<Params>;
  matchExact(path: Path, parentMatch?: Match<ParentParams>): Match<Params>;
  matchStrict(path: Path, parentMatch?: Match<ParentParams>): Match<Params>;
}
