import { normalizePathPattern } from './normalizePathPattern';
import { createPattern } from './createPattern';
import { PathPattern } from './types';

export function createInheritedPattern<ParentParams extends object = {}, Params extends object = {}>(
  parentPathPattern: PathPattern<ParentParams>,
  pattern: string
): PathPattern<ParentParams & Params> {
  return createPattern(parentPathPattern.getPattern() + normalizePathPattern(pattern));
}
