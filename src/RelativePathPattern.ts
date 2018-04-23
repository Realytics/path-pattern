import { MatchSuccess, Pattern, PatternWithParams } from './types';
import { normalizePathPattern } from './normalizePathPattern';
import { PathPattern, PathPatternWithParams } from './PathPattern';

export abstract class RelativePathPatternBase {
  private nomalizedPattern: string;

  constructor(pattern: string) {
    this.nomalizedPattern = normalizePathPattern(pattern);
  }

  getPattern() {
    return this.nomalizedPattern;
  }

  resolve(parentMatch: MatchSuccess<any>): PatternWithParams<any> | Pattern {
    if (!parentMatch || typeof parentMatch.path !== 'string') {
      throw new Error(`RelativePathPattern must be resolved with a MatchSuccess, received: ${parentMatch}`);
    }
    const parentPattern = new PathPatternWithParams<any>(parentMatch.path);
    const resultPattern = parentPattern.extends(this.getPattern());

    return resultPattern as any;
  }
}

export class RelativePathPattern extends RelativePathPatternBase {
  resolve(parentMatch: MatchSuccess<{}>): Pattern;
  resolve<ParentParams extends object>(parentMatch: MatchSuccess<ParentParams>): PatternWithParams<ParentParams> {
    return super.resolve(parentMatch) as any;
  }

  inherit(parentPattern: PathPattern): PathPattern;
  inherit<ParentParams extends object>(
    parentPattern: PathPattern | PathPatternWithParams<ParentParams>
  ): PathPatternWithParams<ParentParams> {
    return parentPattern.extends(this.getPattern()) as any;
  }

  inheritWithParams<ParentParams extends object>(
    parentPattern: PathPattern | PathPatternWithParams<ParentParams>
  ): PathPatternWithParams<ParentParams> {
    return parentPattern.extends(this.getPattern()) as any;
  }
}

export class RelativePathPatternWithParams<Params extends object> extends RelativePathPatternBase {
  resolve(parentMatch: MatchSuccess<{}>): PatternWithParams<Params>;
  resolve<ParentParams extends object>(
    parentMatch: MatchSuccess<ParentParams>
  ): PatternWithParams<Params & ParentParams> {
    return super.resolve(parentMatch) as any;
  }

  inherit(parentPattern: PathPattern): PathPatternWithParams<Params> {
    return parentPattern.extends(this.getPattern()) as any;
  }

  inheritWithParams<ParentParams extends object>(
    parentPattern: PathPattern | PathPatternWithParams<ParentParams>
  ): PathPatternWithParams<Params & ParentParams> {
    return parentPattern.extends(this.getPattern()) as any;
  }
}
