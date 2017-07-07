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