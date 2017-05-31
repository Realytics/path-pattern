import { RelativePathPattern } from '../src/RelativePathPattern';
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

  const pattern: RelativePathPattern<any, {}> = new RelativePathPattern('/all');
  const parentMatchUser: Match<{}> = {
    path: '/user',
    isExact: false,
    params: {},
    url: '/user',
  };
  const parentMatchPost: Match<{}> = {
    path: '/post',
    isExact: false,
    params: {},
    url: '/post',
  };

  it('match /user/all', () => {
    expect(pattern.match()(createLocation('/user/all'), parentMatchUser)).toBeTruthy();
  });
  it('match /user/all/desc', () => {
    expect(pattern.match()(createLocation('/user/all/desc'), parentMatchUser)).toBeTruthy();
  });
  it('does not match /user', () => {
    expect(pattern.match()(createLocation('/user'), parentMatchUser)).toBeFalsy();
  });
  it('match /post/all', () => {
    expect(pattern.match()(createLocation('/post/all'), parentMatchPost)).toBeTruthy();
  });
  it('does not match /post', () => {
    expect(pattern.match()(createLocation('/post'), parentMatchPost)).toBeFalsy();
  });
  it('does not match if no parentMatch', () => {
    expect(pattern.match()(createLocation('/post/all'), false)).toBeFalsy();
  });
  it('compile', () => {
    expect(pattern.compile(new PathPattern('/post'))).toEqual('/post/all');
  });

  it('match /user/all', () => {
    expect(pattern.match({ exact: true })(createLocation('/user/all'), parentMatchUser)).toBeTruthy();
  });
  it('match /user/all/desc', () => {
    expect(pattern.match({ exact: true })(createLocation('/user/all/desc'), parentMatchUser)).toBeFalsy();
  });
  it('does not match /user', () => {
    expect(pattern.match({ exact: true })(createLocation('/user'), parentMatchUser)).toBeFalsy();
  });

});
