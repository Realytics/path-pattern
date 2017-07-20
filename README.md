# Path Pattern
[![Build Status](https://travis-ci.org/Realytics/path-pattern.svg?branch=master)](https://travis-ci.org/Realytics/path-pattern)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/Realytics/path-pattern)

> A small library to match and compile paths

This is a a wrapper around [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

## This package is ~~not~~ almost production ready!

Even if we use this package in production at [Realytics](https://www.realytics.io/) we can't garanty it wont break.
If you want to use this, do it carefully and feel free to report issue so we can improve it 😉.

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

This package was originally made to work with [react-router-magic](https://github.com/Realytics/react-router-magic) but can be used sparatly.  

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

### Basic example

```js
// let's create a simple pattern
const homePattern = new PathPattern('/home');

// test if the path match with a location
homePattern.match({ pathname: '/home' })
// => { path: '/home', url: '/home', isExact: true, params: {} }

// match only the start of the path :
homePattern.match({ pathname: '/home/hello' })
// => { path: '/home', url: '/home', isExact: false, params: {} }

// you can use matchExact to match only exact path
homePattern.matchExact({ pathname: '/home' })
// => { path: '/home', url: '/home', isExact: true, params: {} }

homePattern.matchExact({ pathname: '/home/hello' })
// => false

// You can get a path from a pattern with compile
// this is more useful when parameters are envolved (see bellow)
homePattern.compile()
// => '/home'
```

### Pattern with parameters

```js
// A pattern with params
const userPattern = new PathPattern('/user/:user');

userPattern.match({ pathname: '/user' })
// => false

userPattern.match({ pathname: '/user/john' })
// => { path: '/user/:user', url: '/user/john', isExact: true, params: { user: 'john' } }

// you can pass params value to compile it
userPattern.compile({ user: 'john' })
// => '/user/john'
```

### Inherited pattern

```js
// A pattern that inherite from another
const pagePattern = new InheritedPathPattern(homePattern, '/:page');

pagePattern.match({ pathname: '/home/hello' })
// => { path: '/home/:page', url: '/home/hello', isExact: true, params: { page: 'hello' } }

// compile works as expected
pagePattern.compile({ page: 'yolo' })
// => '/home/yolo'

```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details