import { Match, PathPattern, createRelativePattern, RelativePathPattern, createPattern } from '../src';
import { createLocation } from './utils/createLocation';

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

  it('match /user/all', () => {
    expect(pattern.match(createLocation('/user/all'), parentMatchUser)).toBeTruthy();
  });
  it('match /user/all/desc', () => {
    expect(pattern.match(createLocation('/user/all/desc'), parentMatchUser)).toBeTruthy();
  });
  it('does not match /user', () => {
    expect(pattern.match(createLocation('/user'), parentMatchUser)).toBeFalsy();
  });
  it('match /post/all', () => {
    expect(pattern.match(createLocation('/post/all'), parentMatchPost)).toBeTruthy();
  });
  it('does not match /post', () => {
    expect(pattern.match(createLocation('/post'), parentMatchPost)).toBeFalsy();
  });
  it('does not match if no parentMatch', () => {
    expect(pattern.match(createLocation('/post/all'), false)).toBeFalsy();
  });
  it('compile', () => {
    expect(pattern.compile(createPattern('/post'))).toEqual('/post/all');
  });

  it('match exact /user/all', () => {
    expect(pattern.matchExact(createLocation('/user/all'), parentMatchUser)).toBeTruthy();
  });
  it('match exact /user/all/desc', () => {
    expect(pattern.matchExact(createLocation('/user/all/desc'), parentMatchUser)).toBeFalsy();
  });
  it('does not match exact /user', () => {
    expect(pattern.matchExact(createLocation('/user'), parentMatchUser)).toBeFalsy();
  });

  it('match strict /user', () => {
    expect(pattern.matchStrict(createLocation('/user/all'), parentMatchUser)).toBeTruthy();
  });
  it('does not match strict /user/', () => {
    expect(pattern.matchStrict(createLocation('/user/all/'), parentMatchUser)).toBeFalsy();
  });
});
