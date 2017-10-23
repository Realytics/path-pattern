import { Matcher, Path, Match } from './types';

/**
 * Reduce matchers to one matcher that selects first match.
 *
 * @param matchers Matchers to reduce
 * @returns {Matcher} Reduced matcher
 */
export function matchOneOf(...matchers: Matcher[]): Matcher {
  return (path: Path) => matchers.reduce<Match>((match, matcher) => match || matcher(path), false);
}
