import { PathPattern, ContructorOptions, Match, IMatchable } from './PathPattern';
import { Location } from 'history';
import { InheritedPathPattern } from './InheritedPathPattern';

export class RelativePathPattern<ParentParams, Params>
  implements IMatchable<ParentParams, Params> {

  constructor(
    private path: string,
    private options: ContructorOptions = {},
  ) { }

  match(location: Location, parentMatch: Match<ParentParams>): Match<Params> {
    if (parentMatch === false) {
      return false;
    }
    const parentPattern: PathPattern<ParentParams> = new PathPattern<ParentParams>(parentMatch.path);
    const pattern: InheritedPathPattern<ParentParams, Params> = new InheritedPathPattern<ParentParams, Params>(
      parentPattern,
      this.path,
      this.options,
    );
    return pattern.match(location);
  }

  compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string {
    const pattern: InheritedPathPattern<ParentParams, Params> = new InheritedPathPattern<ParentParams, Params>(
      parentPattern,
      this.path,
      this.options,
    );
    return pattern.compile(params);
  }

}
