import { Matchable, RelativeMatchable } from './Matchable';
import { PatternAware } from './PatternAware';

export interface PathPattern<Params = any> extends Matchable<Params>, PatternAware {
  compile(params?: Params): string;
}

export interface RelativePathPattern<ParentParams = any, Params = any>
  extends RelativeMatchable<ParentParams, Params>,
    PatternAware {
  compile(parentPattern: PathPattern<ParentParams>, params?: ParentParams & Params): string;
}
