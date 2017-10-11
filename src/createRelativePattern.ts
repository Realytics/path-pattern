import { Location } from 'history';
import { Match } from './Match';
import { MatchOptions } from './Matchable';
import { RelativePathPattern, PathPattern } from './PathPattern';
import { normalizePathPattern } from './normalizePathPattern';
import { createPattern } from './createPattern';
import { createInheritedPattern } from './createInheritedPattern';

export function createRelativePattern<ParentParams = any, Params = any>(
  pattern: string
): RelativePathPattern<ParentParams, Params> {
  const nomalizedPettern = normalizePathPattern(pattern);

  function getPattern() {
    return nomalizedPettern;
  }

  function matchAdvanced(
    options: MatchOptions = {}
  ): (location: Location, parentMatch?: Match<ParentParams>) => Match<Params> {
    return (location, parentMatch = false) => {
      if (parentMatch === false) {
        return false;
      }

      const parentPattern = createPattern<ParentParams>(parentMatch.path);
      const thePattern = createInheritedPattern<ParentParams, Params>(parentPattern, nomalizedPettern);

      return thePattern.matchAdvanced(options)(location);
    };
  }

  function match(location: Location, parentMatch?: Match<ParentParams>): Match<Params> {
    return matchAdvanced()(location, parentMatch);
  }

  function matchExact(location: Location, parentMatch?: Match<ParentParams>): Match<Params> {
    return matchAdvanced({ exact: true })(location, parentMatch);
  }

  function matchStrict(location: Location, parentMatch?: Match<ParentParams>): Match<Params> {
    return matchAdvanced({ exact: true, strict: true })(location, parentMatch);
  }

  function compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string {
    const thePattern = createInheritedPattern<ParentParams, Params>(parentPattern, nomalizedPettern);

    return thePattern.compile(params);
  }

  return {
    getPattern,
    compile,
    match,
    matchAdvanced,
    matchExact,
    matchStrict,
  };
}
