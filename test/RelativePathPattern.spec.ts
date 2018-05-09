import {
  Match,
  PathPattern,
  PathPatternWithParams,
  RelativePathPattern
  } from '../src';
import { RelativePathPatternWithParams } from '../src/RelativePathPattern';

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
    expect(pattern.resolve(parentMatchUser).match('/user/all')).toMatchSnapshot();
  });
  it('match /user/all/desc', () => {
    expect(pattern.resolve(parentMatchUser).match('/user/all/desc')).toMatchSnapshot();
  });
  it('does not match /user', () => {
    expect(pattern.resolve(parentMatchUser).match('/user')).toEqual(false);
  });
  it('match /post/all', () => {
    expect(pattern.resolve(parentMatchPost).match('/post/all')).toMatchSnapshot();
  });
  it('does not match /post', () => {
    expect(pattern.resolve(parentMatchPost).match('/post')).toEqual(false);
  });
  it('does not allow false', () => {
    expect(() => pattern.resolve(false as any).match('/post/all')).toThrowErrorMatchingSnapshot();
  });
  it('compile when inherit', () => {
    expect(pattern.inherit(new PathPattern('/post')).compile()).toEqual('/post/all');
  });
  it('compile when inheritWithParams', () => {
    expect(
      pattern.inheritWithParams(new PathPatternWithParams<{ user: string }>('/:user')).compile({ user: 'etienne' })
    ).toEqual('/etienne/all');
  });

  it('match exact /user/all', () => {
    expect(pattern.resolve(parentMatchUser).matchExact('/user/all')).toMatchSnapshot();
  });
  it('match exact /user/all/desc', () => {
    expect(pattern.resolve(parentMatchUser).matchExact('/user/all/desc')).toEqual(false);
  });
  it('does not match exact /user', () => {
    expect(pattern.resolve(parentMatchUser).matchExact('/user')).toEqual(false);
  });

  it('match strict /user', () => {
    expect(pattern.resolve(parentMatchUser).matchStrict('/user/all')).toMatchSnapshot();
  });
  it('does not match strict /user/', () => {
    expect(pattern.resolve(parentMatchUser).matchStrict('/user/all/')).toEqual(false);
  });
});

describe('RelativePathPatternWithParams', () => {
  const pattern = new RelativePathPatternWithParams<{ user: string }>('/:user');
  const parentMatchUser: Match<{}> = {
    path: '/user',
    isExact: false,
    params: {},
    url: '/user',
  };
  const parentMatchPost: Match<{ post: string }> = {
    path: '/:post',
    isExact: false,
    params: {
      post: 'my-post',
    },
    url: '/my-post',
  };

  it('get pattern', () => {
    expect(pattern.getPattern()).toEqual('/:user');
  });
  it('match /user/etienne', () => {
    expect(pattern.resolve(parentMatchUser).match('/user/etienne')).toMatchSnapshot();
  });
  it('match /user/all/desc', () => {
    expect(pattern.resolve(parentMatchUser).match('/user/etienne/desc')).toMatchSnapshot();
  });
  it('does not match /user', () => {
    expect(pattern.resolve(parentMatchUser).match('/user')).toEqual(false);
  });
  it('match /my-post/etienne', () => {
    expect(pattern.resolve(parentMatchPost).match('/my-post/etienne')).toMatchSnapshot();
  });
  it('Match /other-post/etienne', () => {
    expect(pattern.resolve(parentMatchPost).match('/other-post/etienne')).toMatchSnapshot();
  });
  it('does not allow false', () => {
    expect(() => pattern.resolve(false as any).match('/my-post/etienne')).toThrowErrorMatchingSnapshot();
  });
  it('compile when inherit', () => {
    expect(pattern.inherit(new PathPattern('/post')).compile({ user: 'etienne' })).toEqual('/post/etienne');
  });
  it('compile when inheritWithParams', () => {
    expect(
      pattern
        .inheritWithParams(new PathPatternWithParams<{ group: string }>('/:group'))
        .compile({ user: 'etienne', group: 'student' })
    ).toEqual('/student/etienne');
  });
});
