
import { Location } from 'history';
import { normalizePathPattern } from './normalizePathPattern';
import { Match } from './Match';
import { Matchable, MatchOptions } from './Matchable';
import { PatternAware } from './PatternAware';

export abstract class AbstractPathPattern<Params> implements Matchable<Params>, PatternAware {

  protected pattern: string;

  constructor(pattern: string) {
    this.pattern = normalizePathPattern(pattern);

    this.matchAdvanced = this.matchAdvanced.bind(this);
    this.match = this.match.bind(this);
    this.matchExact = this.matchExact.bind(this);
    this.matchStrict = this.matchStrict.bind(this);
  }

  getPattern(): string {
    return this.pattern;
  }

  abstract matchAdvanced(options: MatchOptions): (location: Location) => Match<Params>;
  abstract match(location: Location): Match<Params>;
  abstract matchExact(location: Location): Match<Params>;
  abstract matchStrict(location: Location): Match<Params>;
}
