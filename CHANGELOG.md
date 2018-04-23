## [2.0.1](https://github.com/Realytics/path-pattern/compare/v2.0.0...v2.0.1) (2018-04-23)

### Bug Fixes

* **ci:** Fix CI NPM access Closes [#2](https://github.com/Realytics/path-pattern/issues/2) ([d238976](https://github.com/Realytics/path-pattern/commit/d238976))

## v1.0.1

## v0.9.0

### Breaking changes:

* Removing `sensitive` option in `normalizePathPattern` because it cause problems with params names.

## v0.8.0

### Changes:

* Publish `normalizePathPattern` function
* Publish `AbstractPathPattern` - super class of `PathPattern` and `RelativePathPattern`
* Improve normalization - use string functions instead of regexp and add normalization options
* Make params generic types optional (`any` by default)

### Breaking changes:

* Move `PathPattern.matchOneOf` to the external function `matchOneOf`
* Rename `PathPattern.getFormatedPath()` to `PathPattern.getPattern()`

## v0.7.0

* Initial release
