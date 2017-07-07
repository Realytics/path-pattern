
import { normalizePathPattern } from '../src';

describe(`normalizePathPattern`, () => {
  it('adds slash at the begin', () => {
    expect(normalizePathPattern('home')).toEqual('/home');
    expect(normalizePathPattern('home', { strict: true })).toEqual('/home');
    expect(normalizePathPattern('home', { sensitive: false })).toEqual('/home');
  });

  it('replace multiple slash at the begin by one slash', () => {
    expect(normalizePathPattern('//home')).toEqual('/home');
    expect(normalizePathPattern('///home')).toEqual('/home');
    expect(normalizePathPattern('////home')).toEqual('/home');
    expect(normalizePathPattern('//home', { strict: true })).toEqual('/home');
    expect(normalizePathPattern('//home', { sensitive: false })).toEqual('/home');
  });

  it('strips trailing slash on strict: false', () => {
    expect(normalizePathPattern('home/', { strict: true })).toEqual('/home/');
    expect(normalizePathPattern('home/', { strict: false })).toEqual('/home');
    expect(normalizePathPattern('home/')).toEqual('/home/');
    expect(normalizePathPattern('/home/', { strict: true })).toEqual('/home/');
    expect(normalizePathPattern('/home/', { strict: false })).toEqual('/home');
    expect(normalizePathPattern('/home/')).toEqual('/home/');
  });

  it('lowercase path on sensitive: false', () => {
    expect(normalizePathPattern('/HoMe', { sensitive: true })).toEqual('/HoMe');
    expect(normalizePathPattern('/HoMe', { sensitive: false })).toEqual('/home');
    expect(normalizePathPattern('/HoMe')).toEqual('/home');
  });

  it('should work for empty path', () => {
    expect(normalizePathPattern('')).toEqual('/');
    expect(normalizePathPattern('', { sensitive: true })).toEqual('/');
    expect(normalizePathPattern('', { strict: false })).toEqual('/');
    expect(normalizePathPattern('', { sensitive: true, strict: false })).toEqual('/');
  });
});
