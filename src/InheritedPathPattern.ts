import { PathPattern } from './PathPattern';

export class InheritedPathPattern<ParentParams, Params> extends PathPattern<ParentParams & Params> {

  constructor(
    parentPath: PathPattern<ParentParams>,
    path: string,
  ) {
    const subPath: string = '/' + path.replace(/^(\/+)/, '');
    const combinedPath: string = parentPath.getFormatedPath() + subPath;
    super(combinedPath);
  }

}
