# Path Pattern
[![Build Status](https://travis-ci.org/Realytics/path-pattern.svg?branch=master)](https://travis-ci.org/Realytics/path-pattern)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/Realytics/path-pattern)

> A small library to match and compile paths

This is a a wrapper around [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

## This package is ~~not~~ almost production ready!

Even if we use this package in production at [Realytics](https://www.realytics.io/) we can't garanty it won't break.
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

This package was originally made to work with [react-router-magic](https://github.com/Realytics/react-router-magic) but can be used separatly.  

## Import in your project

### ES6 or Typescript

> Note : If you use Typescript, typings are include in the package !

```js
import { createPattern } from 'path-pattern';
```

### Node

```js
const createPattern = require('path-pattern').createPattern;
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details