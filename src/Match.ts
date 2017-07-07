
export type MatchSuccess<Params = any> = {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
};

export type Match<Params = any> = false | MatchSuccess<Params>;
