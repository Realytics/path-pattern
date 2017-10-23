import { Match, PathPattern, createRelativePattern, RelativePathPattern, createPattern } from '../src';

describe('RelativePathPattern', () => {
  const pattern: RelativePathPattern<any, {}> = createRelativePattern('/all');
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

  it('get pattern', () => {
    expect(pattern.getPattern()).toEqual('/all');
  });
  it('match /user/all', () => {
    expect(pattern.match('/user/all', parentMatchUser)).toBeTruthy();
  });
  it('match /user/all/desc', () => {
    expect(pattern.match('/user/all/desc', parentMatchUser)).toBeTruthy();
  });
  it('does not match /user', () => {
    expect(pattern.match('/user', parentMatchUser)).toBeFalsy();
  });
  it('match /post/all', () => {
    expect(pattern.match('/post/all', parentMatchPost)).toBeTruthy();
  });
  it('does not match /post', () => {
    expect(pattern.match('/post', parentMatchPost)).toBeFalsy();
  });
  it('does not match if false parentMatch', () => {
    expect(pattern.match('/post/all', false)).toBeFalsy();
  });
  it('does not match if no parentMatch', () => {
    expect(pattern.match('/post/all')).toBeFalsy();
  });
  it('compile', () => {
    expect(pattern.compile(createPattern('/post'))).toEqual('/post/all');
  });

  it('match exact /user/all', () => {
    expect(pattern.matchExact('/user/all', parentMatchUser)).toBeTruthy();
  });
  it('match exact /user/all/desc', () => {
    expect(pattern.matchExact('/user/all/desc', parentMatchUser)).toBeFalsy();
  });
  it('does not match exact /user', () => {
    expect(pattern.matchExact('/user', parentMatchUser)).toBeFalsy();
  });

  it('match strict /user', () => {
    expect(pattern.matchStrict('/user/all', parentMatchUser)).toBeTruthy();
  });
  it('does not match strict /user/', () => {
    expect(pattern.matchStrict('/user/all/', parentMatchUser)).toBeFalsy();
  });
});
