# Path Pattern
> A small library to match and compile paths

This is a a wrapper around [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

## This package is not Production ready!

This package is under developement, do not use it in production. 

## Prerequisites

You need [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/).

## Installing

```bash
npm install path-pattern --save
```

or

```bash
yarn add path-pattern
```

## Motivations

This package is made to work with [react-router-magic](https://github.com/Realytics/react-router-magic).
It provide the same functionnalyties as `react-router`'s path props.

## Import in your project

### ES6 or Typescript

> Note : If you use Typescript, typings are include in the package !

```js
import { PathPattern } from 'path-pattern';
```

### Node

```js
const PathPattern = require('path-pattern').PathPattern;
```

## Usage

```js
// a simple pattern

const homePattern = new PathPattern('/home');
// test if the path match with a location
homePattern.match({ pathname: '/home' }) // { path: '/home', url: '/home', isExact: true, params: {} }
// match test only the start :
homePattern.match({ pathname: '/home/hello' }) // { path: '/home', url: '/home', isExact: false, params: {} }
// you can use matchExact to match only exact path
homePattern.matchExact({ pathname: '/home' }) // { path: '/home', url: '/home', isExact: true, params: {} }
homePattern.matchExact({ pathname: '/home/hello' }) // false
// compile it
homePattern.compile() // '/home'

// A pattern with params
const userPattern = new PathPattern('/user/:user');
userPattern.match({ pathname: '/user' }) // false
userPattern.match({ pathname: '/user/john' }) // { path: '/user/:user', url: '/user/john', isExact: true, params: { user: 'john' } }
// compile it
userPattern.compile({ user: 'john' }) // '/user/john'

// A pattern that inherite from another
const pagePattern = new InheritedPathPattern(homePattern, '/:page');
pagePattern.match({ pathname: '/home/hello' }) // { path: '/home/:page', url: '/home/hello', isExact: true, params: { page: 'hello' } }
pagePattern.compile({ page: 'yolo' }) // '/home/yolo'
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details