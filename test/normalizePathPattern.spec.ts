import { normalizePathPattern } from '../src';

describe(`normalizePathPattern`, () => {
  it('Throw if no pattern is passed', () => {
    expect(() => (normalizePathPattern as any)()).toThrowErrorMatchingSnapshot();
  });

  it('adds slash at the begin', () => {
    expect(normalizePathPattern('home')).toEqual('/home');
    expect(normalizePathPattern('home', { strict: true })).toEqual('/home');
  });

  it('replace multiple slash at the begin by one slash', () => {
    expect(normalizePathPattern('//home')).toEqual('/home');
    expect(normalizePathPattern('///home')).toEqual('/home');
    expect(normalizePathPattern('////home')).toEqual('/home');
    expect(normalizePathPattern('//home', { strict: true })).toEqual('/home');
  });

  it('strips trailing slash on strict: false', () => {
    expect(normalizePathPattern('home/', { strict: true })).toEqual('/home/');
    expect(normalizePathPattern('home/', { strict: false })).toEqual('/home');
    expect(normalizePathPattern('home/')).toEqual('/home/');
    expect(normalizePathPattern('/home/', { strict: true })).toEqual('/home/');
    expect(normalizePathPattern('/home/', { strict: false })).toEqual('/home');
    expect(normalizePathPattern('/home/')).toEqual('/home/');
  });

  it('should work for empty path', () => {
    expect(normalizePathPattern('')).toEqual('/');
    expect(normalizePathPattern('/')).toEqual('/');
    expect(normalizePathPattern('', { strict: false })).toEqual('/');
  });
});
