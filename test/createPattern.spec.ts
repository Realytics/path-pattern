import { Location } from 'history';
import { createPattern } from '../src';

describe(`createPattern('/home')`, () => {
  const pattern = createPattern('/home');
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
  it(`does not match with no location or no pathname`, () => {
    expect(pattern.match(null)).toBeFalsy();
    expect(pattern.match(undefined)).toBeFalsy();
  });
  it(`compile to '/home'`, () => {
    expect(pattern.compile({})).toEqual('/home');
  });
});

describe(`createPattern('/home', { exact: true })`, () => {
  const pattern = createPattern('/home');
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

describe(`createPattern('/home/', { exact: true, strict: true })`, () => {
  const pattern = createPattern('/home/');
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
    expect(pattern.compile({})).toEqual('/home/');
  });
  it(`get getPattern`, () => {
    expect(pattern.getPattern()).toEqual('/home/');
  });
});

// create twice the same path for coverage
describe(`createPattern('/home/', { exact: true, strict: true }) bis`, () => {
  const pattern = createPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.matchStrict('/home/')).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.matchStrict('/home')).toBeFalsy();
  });
  it(`compile to '/home'`, () => {
    expect(pattern.compile({})).toEqual('/home/');
  });
});

describe(`createPattern('/home/', { strict: true })`, () => {
  const pattern = createPattern('/home/');
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

describe(`createPattern('/user/:user')`, () => {
  const pattern = createPattern('/user/:user');
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

describe(`createPattern('/user/:userName')`, () => {
  const pattern = createPattern('/user/:userName');
  it(`compile with user userName`, () => {
    expect(pattern.compile({ userName: 'jane' })).toEqual('/user/jane');
  });
  it(`does not compile with wrong param`, () => {
    expect(() => pattern.compile({ yolo: 'jane' })).toThrowErrorMatchingSnapshot();
  });
  it(`compile with user username`, () => {
    expect(() => pattern.compile({ username: 'john' })).toThrowErrorMatchingSnapshot();
  });
});

describe(`createPattern('/')`, () => {
  const pattern = createPattern('/');
  it(`does not match ''`, () => {
    expect(pattern.match('')).toBeFalsy();
    expect(pattern.matchAdvanced({})('')).toBeFalsy();
  });
  it(`match '/'`, () => {
    expect(pattern.match('/')).toMatchSnapshot();
  });
});

describe(`createPattern('home')`, () => {
  const pattern = createPattern('home');
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
