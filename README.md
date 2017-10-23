# Path Pattern


[![Build Status](https://travis-ci.org/Realytics/path-pattern.svg?branch=master)](https://travis-ci.org/Realytics/path-pattern)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/Realytics/path-pattern)

> A small library to match and compile paths like `/user/:name`

This is a a wrapper around [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

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
const createPattern = require('path-pattern').createPattern;
```

## Some examples

```ts

// A basic route
const UserRoute = createPattern('/home');

// You can then try to match it
// with a Location object from the history package
const match = UserRoute.match(history.location);
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details