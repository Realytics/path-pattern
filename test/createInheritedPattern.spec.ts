import { Location } from 'history';
import { createPattern, createInheritedPattern } from '../src';

describe('IneritedPathPattern', () => {
  const parentPattern = createPattern('/home');
  const pattern = createInheritedPattern(parentPattern, '/user');

  it('match /home/user', () => {
    expect(pattern.match('/home/user')).toBeTruthy();
  });
  it('does not match /home', () => {
    expect(pattern.match('/home')).toBeFalsy();
  });
});

describe('IneritedPathPattern with /', () => {
  const parentPattern = createPattern('/');
  const pattern = createInheritedPattern(parentPattern, '/user');

  it('match /user', () => {
    expect(pattern.match('/user')).toBeTruthy();
  });
  it('does not match /', () => {
    expect(pattern.match('/')).toBeFalsy();
  });
});
