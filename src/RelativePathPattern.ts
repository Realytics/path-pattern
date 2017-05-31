import { PathPattern, MatchOptions, Match, IMatchable } from './PathPattern';
import { Location } from 'history';
import { InheritedPathPattern } from './InheritedPathPattern';

export class RelativePathPattern<ParentParams, Params>
  implements IMatchable<ParentParams, Params> {

  constructor(private path: string) {}

  match(options: MatchOptions = {}): (location: Location, parentMatch: Match<ParentParams>) => Match<Params> {
    return (location: Location, parentMatch: Match<ParentParams>) => {
      if (parentMatch === false) {
        return false;
      }
      const parentPattern: PathPattern<ParentParams> = new PathPattern<ParentParams>(parentMatch.path);
      const pattern: InheritedPathPattern<ParentParams, Params> = new InheritedPathPattern<ParentParams, Params>(
        parentPattern,
        this.path,
      );
      return pattern.match(options)(location);
    };
  }

  compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string {
    const pattern: InheritedPathPattern<ParentParams, Params> = new InheritedPathPattern<ParentParams, Params>(
      parentPattern,
      this.path,
    );
    return pattern.compile(params);
  }

}
