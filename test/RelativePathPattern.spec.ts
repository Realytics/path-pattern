import { Match, PathPattern, RelativePathPattern } from '../src';

describe('RelativePathPattern', () => {
  const pattern = new RelativePathPattern('/all');
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
    expect(pattern.resolve(parentMatchUser).match('/user/all')).toBeTruthy();
  });
  it('match /user/all/desc', () => {
    expect(pattern.resolve(parentMatchUser).match('/user/all/desc')).toBeTruthy();
  });
  it('does not match /user', () => {
    expect(pattern.resolve(parentMatchUser).match('/user')).toBeFalsy();
  });
  it('match /post/all', () => {
    expect(pattern.resolve(parentMatchPost).match('/post/all')).toBeTruthy();
  });
  it('does not match /post', () => {
    expect(pattern.resolve(parentMatchPost).match('/post')).toBeFalsy();
  });
  it('does not allow false', () => {
    expect(() => pattern.resolve(false as any).match('/post/all')).toThrowErrorMatchingSnapshot();
  });
  it('compile', () => {
    expect(pattern.inherit(new PathPattern('/post')).compile()).toEqual('/post/all');
  });

  it('match exact /user/all', () => {
    expect(pattern.resolve(parentMatchUser).matchExact('/user/all')).toBeTruthy();
  });
  it('match exact /user/all/desc', () => {
    expect(pattern.resolve(parentMatchUser).matchExact('/user/all/desc')).toBeFalsy();
  });
  it('does not match exact /user', () => {
    expect(pattern.resolve(parentMatchUser).matchExact('/user')).toBeFalsy();
  });

  it('match strict /user', () => {
    expect(pattern.resolve(parentMatchUser).matchStrict('/user/all')).toBeTruthy();
  });
  it('does not match strict /user/', () => {
    expect(pattern.resolve(parentMatchUser).matchStrict('/user/all/')).toBeFalsy();
  });
});
