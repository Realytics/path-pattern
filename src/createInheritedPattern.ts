import { normalizePathPattern } from './normalizePathPattern';
import { createPattern } from './createPattern';
import { PathPattern } from './types';

export function createInheritedPattern<ParentParams = any, Params = any>(
  parentPathPattern: PathPattern<ParentParams>,
  pattern: string
): PathPattern<ParentParams & Params> {
  return createPattern(parentPathPattern.getPattern() + normalizePathPattern(pattern));
}
