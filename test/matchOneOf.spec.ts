import { matchOneOf, PathPattern, createPattern } from '../src';
import { createLocation } from './utils/createLocation';

describe('matchOneOf', () => {
  const pattern1 = createPattern('/home');
  const pattern2 = createPattern('/hello');
  it('match /home & /hello & /hello/welcome', () => {
    const matcher = matchOneOf(pattern1.match, pattern2.match);
    expect(matcher(createLocation('/home'))).toBeTruthy();
    expect(matcher(createLocation('/hello'))).toBeTruthy();
    expect(matcher(createLocation('/hello/welcome'))).toBeTruthy();
  });

  it('match /home & /hello exact but not /hello/welcome', () => {
    const matcher = matchOneOf(pattern1.match, pattern2.matchExact);
    expect(matcher(createLocation('/home'))).toBeTruthy();
    expect(matcher(createLocation('/hello'))).toBeTruthy();
    expect(matcher(createLocation('/hello/welcome'))).toBeFalsy();
  });
});
