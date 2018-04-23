export type Path = string | null;

export type Matcher<Params extends object = {}> = (path: string | null) => Match<Params>;

export type MatchSuccess<Params = any> = {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
};

export type Match<Params extends object = {}> = false | MatchSuccess<Params>;

export type MatchOptions = {
  exact?: boolean;
  strict?: boolean;
};

export interface PatternWithParams<Params extends object = {}> {
  getPattern(): string | false;
  matchAdvanced(options?: MatchOptions): (path: Path) => Match<Params>;
  match(path: Path): Match<Params>;
  matchExact(path: Path): Match<Params>;
  matchStrict(path: Path): Match<Params>;
  compile(params: Params): string;
  extends(subpattern: string): PatternWithParams<Params>;
  extends<ParentParams extends object>(subpattern: string): PatternWithParams<ParentParams & Params>;
}

export interface Pattern {
  getPattern(): string | false;
  matchAdvanced(options?: MatchOptions): (path: Path) => Match<{}>;
  match(path: Path): Match<{}>;
  matchExact(path: Path): Match<{}>;
  matchStrict(path: Path): Match<{}>;
  compile(): string;
  extends(subpattern: string): Pattern;
  extends<ParentParams extends object>(subpattern: string): PatternWithParams<ParentParams>;
}
