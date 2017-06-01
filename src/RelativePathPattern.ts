import { PathPattern, MatchOptions, Match, IMatchable } from './PathPattern';
import { Location } from 'history';
import { InheritedPathPattern } from './InheritedPathPattern';

export class RelativePathPattern<ParentParams, Params>
  implements IMatchable<ParentParams, Params> {

  constructor(private path: string) {
    this.matchAdvanced = this.matchAdvanced.bind(this);
    this.match = this.match.bind(this);
    this.matchExact = this.matchExact.bind(this);
    this.matchStrict = this.matchStrict.bind(this);
  }

  matchAdvanced(options: MatchOptions = {}): (location: Location, parentMatch: Match<ParentParams>) => Match<Params> {
    return (location: Location, parentMatch: Match<ParentParams>) => {
      if (parentMatch === false) {
        return false;
      }
      const parentPattern: PathPattern<ParentParams> = new PathPattern<ParentParams>(parentMatch.path);
      const pattern: InheritedPathPattern<ParentParams, Params> = new InheritedPathPattern<ParentParams, Params>(
        parentPattern,
        this.path,
      );
      return pattern.matchAdvanced(options)(location);
    };
  }

  match(location: Location, parentMatch: Match<ParentParams>): Match<Params> {
    return this.matchAdvanced()(location, parentMatch);
  }

  matchExact(location: Location, parentMatch: Match<ParentParams>): Match<Params> {
    return this.matchAdvanced({ exact: true })(location, parentMatch);
  }

  matchStrict(location: Location, parentMatch: Match<ParentParams>): Match<Params> {
    return this.matchAdvanced({ exact: true, strict: true })(location, parentMatch);
  }

  compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string {
    const pattern: InheritedPathPattern<ParentParams, Params> = new InheritedPathPattern<ParentParams, Params>(
      parentPattern,
      this.path,
    );
    return pattern.compile(params);
  }

}
