import { Location } from 'history';
import { createPattern, createInheritedPattern } from '../src';

function createLocation(path: string = ''): Location {
  return {
    pathname: path,
    hash: '',
    key: '0uicnx',
    search: '',
    state: null,
  };
}

describe('RelativePathPattern', () => {
  const parentPattern = createPattern('/home');
  const pattern = createInheritedPattern(parentPattern, '/user');

  it('match /home/user', () => {
    expect(pattern.match(createLocation('/home/user'))).toBeTruthy();
  });
  it('does not match /home', () => {
    expect(pattern.match(createLocation('/home'))).toBeFalsy();
  });
});

describe('RelativePathPattern with /', () => {
  const parentPattern = createPattern('/');
  const pattern = createInheritedPattern(parentPattern, '/user');

  it('match /user', () => {
    expect(pattern.match(createLocation('/user'))).toBeTruthy();
  });
  it('does not match /', () => {
    expect(pattern.match(createLocation('/'))).toBeFalsy();
  });
});
