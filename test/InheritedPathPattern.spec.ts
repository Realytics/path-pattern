import { InheritedPathPattern } from '../src/InheritedPathPattern';
import { PathPattern, Match } from '../src/PathPattern';
import { Location } from 'history';

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

  const parentPattern: PathPattern<{}> = new PathPattern<{}>('/home');
  const pattern: InheritedPathPattern<{}, {}> = new InheritedPathPattern<{}, {}>(parentPattern, '/user');

  it('match /home/user', () => {
    expect(pattern.match(createLocation('/home/user'))).toBeTruthy();
  });
  it('does not match /home', () => {
    expect(pattern.match(createLocation('/home'))).toBeFalsy();
  });

});
