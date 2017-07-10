import { Location } from 'history';
import { PathPattern } from '../src';
import { createLocation } from './utils/createLocation';

describe(`new PathPattern('/home')`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => { expect(pattern.match(createLocation('/home'))).toBeTruthy(); });
  it(`match '/home/user'`, () => { expect(pattern.match(createLocation('/home/user'))).toBeTruthy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match(createLocation('/welcome'))).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match(createLocation('/'))).toBeFalsy(); });
  it(`does not match with no location or no pathname`, () => {
    const fakeLocation: Location = {} as any;
    expect(pattern.match(null)).toBeFalsy();
    expect(pattern.match(fakeLocation)).toBeFalsy();
  });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home'); });
});

describe(`new PathPattern('/home', { exact: true })`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => { expect(pattern.matchExact(createLocation('/home'))).toBeTruthy(); });
  it(`match '/home/'`, () => { expect(pattern.matchExact(createLocation('/home/'))).toBeTruthy(); });
  it(`does not match '/home/user'`, () => {
    expect(pattern.matchExact(createLocation('/home/user'))).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.matchExact(createLocation('/welcome'))).toBeFalsy();
  });
  it(`does not match '/'`, () => { expect(pattern.matchExact(createLocation('/'))).toBeFalsy(); });
  it(`get getPattern`, () => { expect(pattern.getPattern()).toEqual('/home'); });
});

describe(`new PathPattern('/home/', { exact: true, strict: true })`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.matchStrict(createLocation('/home/'))).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.matchStrict(createLocation('/home'))).toBeFalsy();
  });
  it(`does not match '/home/user'`, () => {
    expect(pattern.matchStrict(createLocation('/home/user'))).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.matchStrict(createLocation('/welcome'))).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.matchStrict(createLocation('/'))).toBeFalsy();
  });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home/'); });
  it(`get getPattern`, () => { expect(pattern.getPattern()).toEqual('/home/'); });
});

// create twice the same path for coverage
describe(`new PathPattern('/home/', { exact: true, strict: true }) bis`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.matchStrict(createLocation('/home/'))).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.matchStrict(createLocation('/home'))).toBeFalsy();
  });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home/'); });
});

describe(`new PathPattern('/home/', { strict: true })`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => { expect(pattern.matchStrict(createLocation('/home/'))).toBeTruthy(); });
  it(`does not match '/home'`, () => { expect(pattern.matchStrict(createLocation('/home'))).toBeFalsy(); });
  it(`match '/home/user'`, () => {
    expect(pattern.matchStrict(createLocation('/home/user'))).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.matchStrict(createLocation('/welcome'))).toBeFalsy();
  });
  it(`does not match '/'`, () => { expect(pattern.matchStrict(createLocation('/'))).toBeFalsy(); });
});

describe(`new PathPattern('/user/:user')`, () => {
  const pattern = new PathPattern('/user/:user');
  it(`does not match '/'`, () => { expect(pattern.match(createLocation('/'))).toBeFalsy(); });
  it(`does not match '/user'`, () => { expect(pattern.match(createLocation('/user'))).toBeFalsy(); });
  it(`does not match '/user/'`, () => { expect(pattern.match(createLocation('/user/'))).toBeFalsy(); });
  it(`match '/user/john'`, () => { expect(pattern.match(createLocation('/user/john'))).toBeTruthy(); });
  it(`match '/user/john'`, () => {
    expect(pattern.match(createLocation('/user/john'))).toMatchSnapshot();
  });
  it(`compile with user jane`, () => {
    expect(pattern.compile({ user: 'jane' })).toEqual('/user/jane');
  });
  it(`compile with user john`, () => {
    expect(pattern.compile({ user: 'john' })).toEqual('/user/john');
  });
  it(`get getPattern`, () => { expect(pattern.getPattern()).toEqual('/user/:user'); });
});

describe(`new PathPattern('/user/:userName')`, () => {
  const pattern = new PathPattern('/user/:userName');
  it(`compile with user userName`, () => {
    expect(pattern.compile({ userName: 'jane' })).toEqual('/user/jane');
  });
  it(`compile with user username`, () => {
    expect(() => {
      pattern.compile({ username: 'john' });
    }).toThrowErrorMatchingSnapshot();
  });
});

describe(`new PathPattern('/')`, () => {
  const pattern = new PathPattern('/');
  it(`match ''`, () => { expect(pattern.match(createLocation(''))).toBeTruthy(); });
});

describe(`new PathPattern('home')`, () => {
  const pattern = new PathPattern('home');
  it(`match '/home/'`, () => { expect(pattern.match(createLocation('/home/'))).toBeTruthy(); });
  it(`match '/home'`, () => { expect(pattern.match(createLocation('/home'))).toBeTruthy(); });
  it(`match '/home/user'`, () => { expect(pattern.match(createLocation('/home/user'))).toBeTruthy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match(createLocation('/welcome'))).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match(createLocation('/'))).toBeFalsy(); });
  it(`get getPattern`, () => { expect(pattern.getPattern()).toEqual('/home'); });
});
