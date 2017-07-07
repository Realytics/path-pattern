export type PathNormalizeOptions = {
  strict?: boolean;
  sensitive?: boolean;
};

/**
 * Normalize path pattern - ensure it starts with slash and
 *  - if options.sensitive is false - ensure it's lowercase, default false
 *  - if options.strict is false - ensure it doesn't end with slash, default true
 *
 * @param pattern Pattern to normalize
 * @param options Additional options for path normalization - { sensitive: boolean, strict: boolean }
 * @returns {string} Normalized path
 */
export function normalizePathPattern(pattern: string, options: PathNormalizeOptions = {}): string {
  const { sensitive = false, strict = true } = options;

  let normalizedPattern = pattern;

  while (normalizedPattern[0] === '/') {
    normalizedPattern = normalizedPattern.substr(1);
  }

  normalizedPattern = '/' + normalizedPattern;

  if (!sensitive) {
    normalizedPattern = normalizedPattern.toLowerCase();
  }

  if (!strict) {
    normalizedPattern = normalizedPattern.length > 1 && normalizedPattern[normalizedPattern.length - 1] === '/' ?
      normalizedPattern.substr(0, normalizedPattern.length - 1) : normalizedPattern;
  }

  return normalizedPattern;
}
