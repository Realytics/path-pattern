import { normalizePathPattern } from './normalizePathPattern';
import { PathPattern } from './PathPattern';

export class InheritedPathPattern<ParentParams = any, Params = any> extends PathPattern<ParentParams & Params> {

  constructor(
    parentPathPattern: PathPattern<ParentParams>,
    pattern: string
  ) {
    super(parentPathPattern.getPattern() + normalizePathPattern(pattern));
  }

}
