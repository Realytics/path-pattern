import { Location } from 'history';
import { AbstractPathPattern } from './AbstractPathPattern';
import { InheritedPathPattern } from './InheritedPathPattern';
import { Match } from './Match';
import { MatchOptions, RelativeMatchable } from './Matchable';
import { PathPattern } from './PathPattern';

export class RelativePathPattern<ParentParams = any, Params = any> extends AbstractPathPattern<Params>
  implements RelativeMatchable<ParentParams, Params> {

  matchAdvanced(options: MatchOptions = {}): (location: Location, parentMatch?: Match<ParentParams>) => Match<Params> {
    return (location, parentMatch = false) => {
      if (parentMatch === false) {
        return false;
      }

      const parentPattern = new PathPattern<ParentParams>(parentMatch.path);
      const pattern = new InheritedPathPattern<ParentParams, Params>(parentPattern, this.pattern);

      return pattern.matchAdvanced(options)(location);
    };
  }

  match(location: Location, parentMatch?: Match<ParentParams>): Match<Params> {
    return this.matchAdvanced()(location, parentMatch);
  }

  matchExact(location: Location, parentMatch?: Match<ParentParams>): Match<Params> {
    return this.matchAdvanced({ exact: true })(location, parentMatch);
  }

  matchStrict(location: Location, parentMatch?: Match<ParentParams>): Match<Params> {
    return this.matchAdvanced({ exact: true, strict: true })(location, parentMatch);
  }

  compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string {
    const pattern = new InheritedPathPattern<ParentParams, Params>(parentPattern, this.pattern);

    return pattern.compile(params);
  }
}
