import { Match, Path, MatchOptions, RelativePathPattern, PathPattern } from './types';
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

  function matchAdvanced(options: MatchOptions = {}): (path: Path, parentMatch?: Match<ParentParams>) => Match<Params> {
    return (path: Path, parentMatch = false) => {
      if (parentMatch === false) {
        return false;
      }

      const parentPattern = createPattern<ParentParams>(parentMatch.path);
      const thePattern = createInheritedPattern<ParentParams, Params>(parentPattern, nomalizedPettern);

      return thePattern.matchAdvanced(options)(path);
    };
  }

  function match(path: Path, parentMatch?: Match<ParentParams>): Match<Params> {
    return matchAdvanced()(path, parentMatch);
  }

  function matchExact(path: Path, parentMatch?: Match<ParentParams>): Match<Params> {
    return matchAdvanced({ exact: true })(path, parentMatch);
  }

  function matchStrict(path: Path, parentMatch?: Match<ParentParams>): Match<Params> {
    return matchAdvanced({ exact: true, strict: true })(path, parentMatch);
  }

  function compile(parentPattern: PathPattern<ParentParams>, params: ParentParams & Params): string {
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
