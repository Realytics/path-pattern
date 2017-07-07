import { Location } from 'history';
import { Match } from './Match';

export type MatchOptions = {
  exact?: boolean;
  strict?: boolean;
};

export interface Matchable<Params> {
  matchAdvanced(options: MatchOptions): (location: Location) => Match<Params>;
  match(location: Location): Match<Params>;
  matchExact(location: Location): Match<Params>;
  matchStrict(location: Location): Match<Params>;
}

export interface RelativeMatchable<ParentParams, Params> extends Matchable<Params> {
  matchAdvanced(options: MatchOptions): (location: Location, parentMatch?: Match<ParentParams>) => Match<Params>;
  match(location: Location, parentMatch?: Match<ParentParams>): Match<Params>;
  matchExact(location: Location, parentMatch?: Match<ParentParams>): Match<Params>;
  matchStrict(location: Location, parentMatch?: Match<ParentParams>): Match<Params>;
}
