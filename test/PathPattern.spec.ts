import { Location } from 'history';
import { PathPattern, PathPatternWithParams } from '../src';

describe(`new PathPattern('/home')`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => {
    expect(pattern.match('/home')).toBeTruthy();
  });
  it(`match '/home/user'`, () => {
    expect(pattern.match('/home/user')).toBeTruthy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.match('/welcome')).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.match('/')).toBeFalsy();
  });
  it(`does not match with no path`, () => {
    expect(pattern.match(null)).toBeFalsy();
    expect(pattern.match(undefined)).toBeFalsy();
  });
  it(`compile to '/home'`, () => {
    expect(pattern.compile()).toEqual('/home');
  });
});

describe(`new PathPattern('/home') -> matchExact`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => {
    expect(pattern.matchExact('/home')).toBeTruthy();
  });
  it(`match '/home/'`, () => {
    expect(pattern.matchExact('/home/')).toBeTruthy();
  });
  it(`does not match '/home/user'`, () => {
    expect(pattern.matchExact('/home/user')).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.matchExact('/welcome')).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.matchExact('/')).toBeFalsy();
  });
  it(`get getPattern`, () => {
    expect(pattern.getPattern()).toEqual('/home');
  });
});

describe(`new PathPattern('/home/') -> matchStrict`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.matchStrict('/home/')).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.matchStrict('/home')).toBeFalsy();
  });
  it(`does not match '/home/user'`, () => {
    expect(pattern.matchStrict('/home/user')).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.matchStrict('/welcome')).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.matchStrict('/')).toBeFalsy();
  });
  it(`compile to '/home'`, () => {
    expect(pattern.compile()).toEqual('/home/');
  });
  it(`get getPattern`, () => {
    expect(pattern.getPattern()).toEqual('/home/');
  });
});

// create twice the same path for coverage
describe(`new PathPattern('/home/') -> matchStrict (bis)`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.matchStrict('/home/')).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.matchStrict('/home')).toBeFalsy();
  });
  it(`compile to '/home'`, () => {
    expect(pattern.compile()).toEqual('/home/');
  });
});

describe(`new PathPattern('/home/', { strict: true })`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.matchStrict('/home/')).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.matchStrict('/home')).toBeFalsy();
  });
  it(`match '/home/user'`, () => {
    expect(pattern.matchStrict('/home/user')).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.matchStrict('/welcome')).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.matchStrict('/')).toBeFalsy();
  });
});

describe(`new PathPatternWithParams('/user/:user')`, () => {
  const pattern = new PathPatternWithParams<{ user: string }>('/user/:user');
  it(`does not match '/'`, () => {
    expect(pattern.match('/')).toBeFalsy();
  });
  it(`does not match '/user'`, () => {
    expect(pattern.match('/user')).toBeFalsy();
  });
  it(`does not match '/user/'`, () => {
    expect(pattern.match('/user/')).toBeFalsy();
  });
  it(`match '/user/john'`, () => {
    expect(pattern.match('/user/john')).toBeTruthy();
  });
  it(`match '/user/john'`, () => {
    expect(pattern.match('/user/john')).toMatchSnapshot();
  });
  it(`compile with user jane`, () => {
    expect(pattern.compile({ user: 'jane' })).toEqual('/user/jane');
  });
  it(`compile with user john`, () => {
    expect(pattern.compile({ user: 'john' })).toEqual('/user/john');
  });
  it(`get getPattern`, () => {
    expect(pattern.getPattern()).toEqual('/user/:user');
  });
});

describe(`extends new PathPatternWithParams('/user/:userName')`, () => {
  const pattern = new PathPatternWithParams<{ userName: string }>('/user/:userName');
  const extendedParams = pattern.extendsWithParams<{ page: string }>('/:page');
  const extended = pattern.extends('/hello');
  it(`Create a new pattern`, () => {
    expect(extendedParams).toBeInstanceOf(PathPatternWithParams);
  });
  it(`Match with all params`, () => {
    expect(extendedParams.match('/user/etienne/home')).toMatchSnapshot();
  });
  it(`Create a new pattern`, () => {
    expect(extended).toBeInstanceOf(PathPatternWithParams);
  });
  it(`Match with all params`, () => {
    expect(extended.match('/user/hello')).toMatchSnapshot();
  });
});

describe(`extends new PathPattern('/user')`, () => {
  const pattern = new PathPattern('/user');
  const extendedParams = pattern.extendsWithParams<{ page: string }>('/:page');
  const extended = pattern.extends('/hello');
  it(`Create a new pattern`, () => {
    expect(extendedParams).toBeInstanceOf(PathPatternWithParams);
  });
  it(`Match with all params`, () => {
    expect(extendedParams.match('/user/home')).toMatchSnapshot();
  });
  it(`Create a new pattern`, () => {
    expect(extended).toBeInstanceOf(PathPattern);
  });
  it(`Match /user/hello`, () => {
    expect(extendedParams.match('/user/hello')).toMatchSnapshot();
  });
});

describe(`new PathPatternWithParams('/user/:userName')`, () => {
  const pattern = new PathPatternWithParams<{ userName: string }>('/user/:userName');
  it(`compile with user userName`, () => {
    expect(pattern.compile({ userName: 'jane' })).toEqual('/user/jane');
  });
  it(`does not compile with wrong param`, () => {
    expect(() => pattern.compile({ yolo: 'jane' } as any)).toThrowErrorMatchingSnapshot();
  });
  it(`throw error when wrong case`, () => {
    expect(() => pattern.compile({ username: 'john' } as any)).toThrowErrorMatchingSnapshot();
  });
});

describe('PathPattern / PathPatternWithParams', () => {
  it('warn when PathPattern has params', () => {
    const originalConsole = console.warn;
    console.warn = jest.fn();
    const pattern = new PathPattern('/user/:userName');
    pattern.match('/user/etienne');
    expect(console.warn).toHaveBeenCalled();
    console.warn = originalConsole;
  });

  it('warn when PathPatternWithParams has no params', () => {
    const originalConsole = console.warn;
    console.warn = jest.fn();
    const pattern = new PathPatternWithParams('/user');
    pattern.match('/user');
    expect(console.warn).toHaveBeenCalled();
    console.warn = originalConsole;
  });
});

describe(`new PathPattern('/')`, () => {
  const pattern = new PathPattern('/');
  it(`does not match ''`, () => {
    expect(pattern.match('')).toBeFalsy();
    expect(pattern.matchAdvanced({})('')).toBeFalsy();
  });
  it(`match '/'`, () => {
    expect(pattern.match('/')).toMatchSnapshot();
  });
});

describe(`new PathPattern('home')`, () => {
  const pattern = new PathPattern('home');
  it(`match '/home/'`, () => {
    expect(pattern.match('/home/')).toBeTruthy();
  });
  it(`match '/home'`, () => {
    expect(pattern.match('/home')).toBeTruthy();
  });
  it(`match '/home/user'`, () => {
    expect(pattern.match('/home/user')).toBeTruthy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.match('/welcome')).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.match('/')).toBeFalsy();
  });
  it(`get getPattern`, () => {
    expect(pattern.getPattern()).toEqual('/home');
  });
});

describe('IneritedPathPattern', () => {
  const parentPattern = new PathPattern('/home');
  const pattern = parentPattern.extends('/user');

  it('match /home/user', () => {
    expect(pattern.match('/home/user')).toBeTruthy();
  });
  it('does not match /home', () => {
    expect(pattern.match('/home')).toBeFalsy();
  });
});

describe('IneritedPathPattern with /', () => {
  const parentPattern = new PathPattern('/');
  const pattern = parentPattern.extends('/user');

  it('match /user', () => {
    expect(pattern.match('/user')).toBeTruthy();
  });
  it('does not match /', () => {
    expect(pattern.match('/')).toBeFalsy();
  });
});
