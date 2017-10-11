import { normalizePathPattern } from './normalizePathPattern';
import { PathPattern } from './PathPattern';
import { createPattern } from './createPattern';

export function createInheritedPattern<ParentParams = any, Params = any>(
  parentPathPattern: PathPattern<ParentParams>,
  pattern: string
): PathPattern<ParentParams & Params> {
  return createPattern(parentPathPattern.getPattern() + normalizePathPattern(pattern));
}
