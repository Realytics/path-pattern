<p align="center">
  <img src="https://github.com/Realytics/path-pattern/blob/master/assets/logo.svg" width="597" alt="path-pattern logo">
</p>
<h1 align="center">
	Path Pattern
	<a href="https://www.npmjs.org/package/path-pattern"><img src="https://img.shields.io/npm/v/path-pattern.svg?style=flat" alt="npm"></a>
  <a href="https://travis-ci.org/Realytics/path-pattern"><img src="https://travis-ci.org/Realytics/path-pattern.svg?branch=master" alt="travis"></a>
</h1>

<p align="center">A small library to match and compile paths like <code>/user/:name</code>
 </p>
<p align="center">
This is a a wrapper around <a href="https://github.com/pillarjs/path-to-regexp">path-to-regexp</a>.
 </p>

## This package might contain a few bugs

Even if we use this package in production at [Realytics](https://www.realytics.io/) and it is quite well tested, we can't garanty it won't break.
If you want to use this, do it carefully and feel free to report issue so we can improve it 😉.

## Prerequisites

You need [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/) to install this package.

## Installing

`yarn add path-pattern` or `npm install path-pattern --save`

## Motivations

This package is inspired from the `match` function from [React Router](https://github.com/ReactTraining/react-router). The main difference is that you don't have to pass the path everytime, instead you just create a "pattern" once and use it everywhere you need.

## Import in your project

#### ES6 or Typescript

> Note : If you use Typescript, typings are include in the package !

```js
import { createPattern } from 'path-pattern';
```

#### Node

```js
const PathPattern = require('path-pattern').PathPattern;
```

## Some examples

```ts
// A basic route
const userRoute = new PathPattern('/home');

// You can then try to match it with apath
const noMatch = userRoute.match('/foo'); // => false
const match = userRoute.match('/home'); // => { isExact: true, params: {}, path: "/home", "url": "/home" }
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
