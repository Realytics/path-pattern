import { PathPattern, ContructorOptions } from './PathPattern';

export class InheritedPathPattern<ParentParams, Params> extends PathPattern<ParentParams & Params> {

  constructor(
    parentPath: PathPattern<ParentParams>,
    path: string,
    options: ContructorOptions = {},
  ) {
    const subPath: string = '/' + path.replace(/^(\/+)/, '');
    const combinedPath: string = parentPath.getFormatedPath() + subPath;
    const combinedOptions: ContructorOptions = {
      ...parentPath.getOptions(),
      ...options,
    };
    super(combinedPath, combinedOptions);
  }

}
