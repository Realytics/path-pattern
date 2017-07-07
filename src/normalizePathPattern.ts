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

  let normalizedPath = '/' + (pattern[0] === '/' ? pattern.substr(1) : pattern);

  if (!sensitive) {
    normalizedPath = normalizedPath.toLowerCase();
  }

  if (!strict) {
    normalizedPath = normalizedPath.length > 1 && normalizedPath[normalizedPath.length - 1] === '/' ?
      normalizedPath.substr(0, normalizedPath.length - 1) : normalizedPath;
  }

  return normalizedPath;
}
