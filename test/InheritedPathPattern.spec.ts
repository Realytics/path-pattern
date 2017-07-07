import { Location } from 'history';
import { InheritedPathPattern, PathPattern } from '../src';

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

  const parentPattern = new PathPattern('/home');
  const pattern = new InheritedPathPattern(parentPattern, '/user');

  it('match /home/user', () => {
    expect(pattern.match(createLocation('/home/user'))).toBeTruthy();
  });
  it('does not match /home', () => {
    expect(pattern.match(createLocation('/home'))).toBeFalsy();
  });

});
