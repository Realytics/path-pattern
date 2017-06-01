import { PathPattern } from '../src/PathPattern';
import { Location } from 'history';

function createLocation(path: string = ''): Location {
  return {
    pathname: path,
    hash: '',
    key: '0uicnx',
    search: '',
    state: null,
  };
}

describe(`new PathPattern('/home')`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => { expect(pattern.match()(createLocation('/home'))).toBeTruthy(); });
  it(`match '/home/user'`, () => { expect(pattern.match()(createLocation('/home/user'))).toBeTruthy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match()(createLocation('/welcome'))).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match()(createLocation('/'))).toBeFalsy(); });
  it(`does not match with no location or no pathname`, () => {
    const fakeLocation: Location = {} as any;
    expect(pattern.match()(null)).toBeFalsy();
    expect(pattern.match()(fakeLocation)).toBeFalsy();
  });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home'); });
});

describe(`new PathPattern('/home', { exact: true })`, () => {
  const pattern = new PathPattern('/home');
  it(`match '/home'`, () => { expect(pattern.match({ exact: true })(createLocation('/home'))).toBeTruthy(); });
  it(`match '/home/'`, () => { expect(pattern.match({ exact: true })(createLocation('/home/'))).toBeTruthy(); });
  it(`does not match '/home/user'`, () => {
    expect(pattern.match({ exact: true })(createLocation('/home/user'))).toBeFalsy();
  });
  it(`match '/home/user' with createMatcher`, () => {
    expect(pattern.match({ exact: false })(createLocation('/home/user'))).toBeTruthy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.match({ exact: true })(createLocation('/welcome'))).toBeFalsy();
  });
  it(`does not match '/'`, () => { expect(pattern.match({ exact: true })(createLocation('/'))).toBeFalsy(); });
  it(`get getFormatedPath`, () => { expect(pattern.getFormatedPath()).toEqual('/home'); });
});

describe(`new PathPattern('/home/', { exact: true, strict: true })`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/home/'))).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/home'))).toBeFalsy();
  });
  it(`does not match '/home/user'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/home/user'))).toBeFalsy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/welcome'))).toBeFalsy();
  });
  it(`does not match '/'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/'))).toBeFalsy();
  });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home/'); });
  it(`get getFormatedPath`, () => { expect(pattern.getFormatedPath()).toEqual('/home'); });
});

// create twice the same path for coverage
describe(`new PathPattern('/home/', { exact: true, strict: true }) bis`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/home/'))).toBeTruthy();
  });
  it(`does not match '/home'`, () => {
    expect(pattern.match({ exact: true, strict: true })(createLocation('/home'))).toBeFalsy();
  });
  it(`compile to '/home'`, () => { expect(pattern.compile()).toEqual('/home/'); });
});

describe(`new PathPattern('/home/', { strict: true })`, () => {
  const pattern = new PathPattern('/home/');
  it(`match '/home/'`, () => { expect(pattern.match({ strict: true })(createLocation('/home/'))).toBeTruthy(); });
  it(`does not match '/home'`, () => { expect(pattern.match({ strict: true })(createLocation('/home'))).toBeFalsy(); });
  it(`match '/home/user'`, () => {
    expect(pattern.match({ strict: true })(createLocation('/home/user'))).toBeTruthy();
  });
  it(`does not match '/welcome'`, () => {
    expect(pattern.match({ strict: true })(createLocation('/welcome'))).toBeFalsy();
  });
  it(`does not match '/'`, () => { expect(pattern.match({ strict: true })(createLocation('/'))).toBeFalsy(); });
});

describe(`new PathPattern('/user/:user')`, () => {
  const pattern = new PathPattern('/user/:user');
  it(`does not match '/'`, () => { expect(pattern.match()(createLocation('/'))).toBeFalsy(); });
  it(`does not match '/user'`, () => { expect(pattern.match()(createLocation('/user'))).toBeFalsy(); });
  it(`does not match '/user/'`, () => { expect(pattern.match()(createLocation('/user/'))).toBeFalsy(); });
  it(`match '/user/john'`, () => { expect(pattern.match()(createLocation('/user/john'))).toBeTruthy(); });
  it(`match '/user/john'`, () => {
    expect(pattern.match()(createLocation('/user/john'))).toMatchSnapshot();
  });
  it(`compile with user jane`, () => {
    expect(pattern.compile({ user: 'jane' })).toEqual('/user/jane');
  });
  it(`compile with user john`, () => {
    expect(pattern.compile({ user: 'john' })).toEqual('/user/john');
  });
  it(`get getFormatedPath`, () => { expect(pattern.getFormatedPath()).toEqual('/user/:user'); });
});

describe(`new PathPattern('/')`, () => {
  const pattern = new PathPattern('/');
  it(`match ''`, () => { expect(pattern.match()(createLocation(''))).toBeTruthy(); });
});

describe(`new PathPattern('home')`, () => {
  const pattern = new PathPattern('home');
  it(`match '/home/'`, () => { expect(pattern.match()(createLocation('/home/'))).toBeTruthy(); });
  it(`match '/home'`, () => { expect(pattern.match()(createLocation('/home'))).toBeTruthy(); });
  it(`match '/home/user'`, () => { expect(pattern.match()(createLocation('/home/user'))).toBeTruthy(); });
  it(`does not match '/welcome'`, () => { expect(pattern.match()(createLocation('/welcome'))).toBeFalsy(); });
  it(`does not match '/'`, () => { expect(pattern.match()(createLocation('/'))).toBeFalsy(); });
  it(`get getFormatedPath`, () => { expect(pattern.getFormatedPath()).toEqual('/home'); });
});

describe('PathPattern.matchOneOf', () => {
  const pattern1 = new PathPattern('/home');
  const pattern2 = new PathPattern('/hello');
  it('match /home & /hello & /hello/welcome', () => {
    const matcher = PathPattern.matchOneOf(
      pattern1.match(),
      pattern2.match(),
    );
    expect(matcher(createLocation('/home'))).toBeTruthy();
    expect(matcher(createLocation('/hello'))).toBeTruthy();
    expect(matcher(createLocation('/hello/welcome'))).toBeTruthy();
  });

  it('match /home & /hello exact but not /hello/welcome', () => {
    const matcher = PathPattern.matchOneOf(
      pattern1.match(),
      pattern2.match({ exact: true }),
    );
    expect(matcher(createLocation('/home'))).toBeTruthy();
    expect(matcher(createLocation('/hello'))).toBeTruthy();
    expect(matcher(createLocation('/hello/welcome'))).toBeFalsy();
  });
});
