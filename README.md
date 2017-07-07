# Path Pattern
> A small library to match and compile paths

This is a a wrapper aroud [path-to-regexp](https://github.com/pillarjs/path-to-regexp).

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
const homePattern = new PathPattern('/home');
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases on this repository](https://github.com/Realytics/path-pattern/releases). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details