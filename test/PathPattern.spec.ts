import { PathPattern } from '../src/PathPattern';

describe(`new PathPattern('/home')`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => { expect(pattern.match('/home')).toBeTruthy(); });
  it(`match '/home/user'`, () => { expect(pattern.match('/home/user')).toBeTruthy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match('/welcome')).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match('/')).toBeFalsy(); });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home'); });
});

describe(`new PathPattern('/home', { exact: true })`, () => {
  const pattern = new PathPattern('/home', { exact: true });
  it(`match '/home'`, () => { expect(pattern.match('/home')).toBeTruthy(); });
  it(`match '/home/'`, () => { expect(pattern.match('/home/')).toBeTruthy(); });
  it(`does not match '/home/user'`, () => { expect(pattern.match('/home/user')).toBeFalsy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match('/welcome')).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match('/')).toBeFalsy(); });
});

describe(`new PathPattern('/home/', { exact: true, strict: true })`, () => {
  const pattern = new PathPattern('/home/', { exact: true, strict: true });
  it(`match '/home/'`, () => { expect(pattern.match('/home/')).toBeTruthy(); });
  it(`does not match '/home'`, () => { expect(pattern.match('/home')).toBeFalsy(); });
  it(`does not match '/home/user'`, () => { expect(pattern.match('/home/user')).toBeFalsy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match('/welcome')).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match('/')).toBeFalsy(); });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home/'); });
});

// create twice the same path for coverage
describe(`new PathPattern('/home/', { exact: true, strict: true }) bis`, () => {
  const pattern = new PathPattern('/home/', { exact: true, strict: true });
  it(`match '/home/'`, () => { expect(pattern.match('/home/')).toBeTruthy(); });
  it(`does not match '/home'`, () => { expect(pattern.match('/home')).toBeFalsy(); });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home/'); });
});

describe(`new PathPattern('/home/', { strict: true })`, () => {
  const pattern = new PathPattern('/home/', { strict: true });
  it(`match '/home/'`, () => { expect(pattern.match('/home/')).toBeTruthy(); });
  it(`does not match '/home'`, () => { expect(pattern.match('/home')).toBeFalsy(); });
  it(`match '/home/user'`, () => { expect(pattern.match('/home/user')).toBeTruthy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match('/welcome')).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match('/')).toBeFalsy(); });
});

describe(`new PathPattern('/user/:user')`, () => {
  const pattern = new PathPattern('/user/:user');
  it(`does not match '/'`, () => { expect(pattern.match('/')).toBeFalsy(); });
  it(`does not match '/user'`, () => { expect(pattern.match('/user')).toBeFalsy(); });
  it(`does not match '/user/'`, () => { expect(pattern.match('/user/')).toBeFalsy(); });
  it(`match '/user/john'`, () => { expect(pattern.match('/user/john')).toBeTruthy(); });
  it(`match '/user/john'`, () => {
    expect(pattern.match('/user/john')).toMatchSnapshot();
  });
  it(`compile with user jane`, () => {
    expect(pattern.compile({ user: 'jane' })).toEqual('/user/jane');
  });
  it(`compile with user john`, () => {
    expect(pattern.compile({ user: 'john' })).toEqual('/user/john');
  });
});

describe(`new PathPattern('/')`, () => {
  const pattern = new PathPattern('/');
  it(`match ''`, () => { expect(pattern.match('')).toBeTruthy(); });
});
