export type Match<P> = {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
};

export interface IPathPattern<P extends {}> {
  match(path: string): (Match<P> | false);
  compile(params: P): string;
}
