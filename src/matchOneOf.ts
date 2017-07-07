
import { Matcher } from './Matcher';

/**
 * Reduce matchers to one matcher that selects first match.
 *
 * @param matchers Matchers to reduce
 * @returns {Matcher} Reduced matcher
 */
export function matchOneOf(...matchers: Matcher[]): Matcher {
  return location => matchers.reduce((match, matcher) => match || matcher(location), false as any);
}
