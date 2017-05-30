# Path Pattern
> A small library to match and compile paths

This is a a wrapper aroud [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

## This package is not Production ready !

This package is under developement, do not use it in production. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/).

### Installing

```bash
npm install path-pattern --save
```

or

```bash
yarn add path-pattern
```

## Import in your project

### Node

```js
const PathPattern = require('path-pattern').PathPattern;
```

### ES6 or Typescript

> Note : If you use Typescript, typings are include in the package !

```js
import { PathPattern } from 'path-pattern';
```

##Usage

```js
const homePattern = new PathPattern('/home');
// same as
const homePattern = new PathPattern('/home', { exact: false, strict: false });
```

## API

### `PathPattern`

#### `new PathPattern<P>(path: string, options?: { strict?: boolean, exact?: boolean })`

- `P`: Type of params object (in Match resulr)
- `path`: The path pattern to parse, see [path-to-regexp docs](https://github.com/pillarjs/path-to-regexp)
- `option.strict`: (`false` by default) When `true`, a path that has a trailing slash will only match a location.pathname with a trailing slash. This has no effect when there are additional URL segments in the location.pathname
- `option.exact`: (`false` by default) When `true`, the path will not match sub path (see table below)

##### Examples

- `new PathPattern('/home')` (any path that start with home)
  - Will match
    - `/home`
    - `/home/`
    - `/home/user`
    - `/home/user/`
    - `/home/user/john`
  - Will not match
    - `/`
    - `/welcome`
- `new PathPattern('/home', { exact: true })` (home path)
  - Will match
    - `/home`
    - `/home/`
  - Will not match
    - `/home/user`
    - `/home/user/`
    - `/home/user/john`
    - `/`
    - `/welcome`
- `new PathPattern('/home/', { exact: true, strict: true })` (home path with a trailing slash)
  - Will match
    - `/home/`
  - Will not match
    - `/home`
    - `/home/user`
    - `/home/user/`
    - `/home/user/john`
    - `/`
    - `/welcome`

#### `match(location: string): (Match<P> | false)`

- `location`: the `location.pathname` you want to match
- Result : a `Match` object is the location match the path, false if not. See Match object bellow

#### `compile(params: P): string`

#### `Match`

Match is a plain object that contain the following keys:   
- `path: string`: The path that match, example: `/user/:user`
- `url: string`: The url that match, example: `/user/john`,
- `isExact: boolean`: Is the match an exact match example: `false`,
- `params: {[paramName: string]: any}`: Params found, example: `{ 'user': 'john' }`

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details