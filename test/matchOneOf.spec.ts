import { matchOneOf, PathPattern, createPattern } from '../src';

describe('matchOneOf', () => {
  const pattern1 = createPattern('/home');
  const pattern2 = createPattern('/hello');
  it('match /home & /hello & /hello/welcome', () => {
    const matcher = matchOneOf(pattern1.match, pattern2.match);
    expect(matcher('/home')).toBeTruthy();
    expect(matcher('/hello')).toBeTruthy();
    expect(matcher('/hello/welcome')).toBeTruthy();
  });

  it('match /home & /hello exact but not /hello/welcome', () => {
    const matcher = matchOneOf(pattern1.match, pattern2.matchExact);
    expect(matcher('/home')).toBeTruthy();
    expect(matcher('/hello')).toBeTruthy();
    expect(matcher('/hello/welcome')).toBeFalsy();
  });
});
