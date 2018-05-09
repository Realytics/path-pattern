import * as print from 'print';
import * as React from 'react';
import { CodeObject, mdIt } from '../utils';
import { ExpendableJson } from './ExpendableJson';
import { isArray, isObject, isString } from 'lodash';
import { Markdown } from './Markdown';
import { PathPattern, PathPatternWithParams } from '../../src';

export type RenderOptions = {
  ignoreLastLine?: boolean;
  resultHeader?: string;
  commentOutput?: boolean;
  expanded?: boolean;
  ignoreOutput?: boolean;
};

export type RowProps<T> = {
  children?: JSX.Element | Array<JSX.Element>;
  codeObj?: CodeObject<T> | Array<CodeObject<T>> | null;
  options?: RenderOptions;
  flex?: boolean;
};

export const Row: React.SFC<RowProps<any>> = ({ options = {}, children = null, codeObj = null, flex = false }) => {
  const codeObjArr = codeObj === null ? [] : isArray(codeObj) ? codeObj : [codeObj];
  return (
    <div className="doc-row" style={{ ...(flex ? { flex: 1 } : {}) }}>
      <div className="txt">{children}</div>
      <div className={'code' + (codeObjArr.length === 0 ? ' code-empty' : '')}>
        {React.Children.toArray(codeObjArr.map(obj => renderCodeObject(obj, options)))}
      </div>
    </div>
  );
};

function renderCodeObject<T>(codeObj: CodeObject<T>, options: RenderOptions = {}): JSX.Element {
  const { ignoreOutput = false } = options;
  return (
    <div className="code-row">
      {renderCodeSource(codeObj, options)}
      {!ignoreOutput && renderCodeResult(codeObj, options)}
    </div>
  );
}

function renderCodeSource<T>(codeObj: CodeObject<T>, options: RenderOptions = {}): JSX.Element {
  const { ignoreLastLine = false } = options;
  const sourceTransformed = (() => {
    if (!codeObj.source) {
      return `// Missing code for ${codeObj.key}`;
    }
    return ignoreLastLine
      ? codeObj.source
          .split('\n')
          .slice(0, -1)
          .join('\n')
          .replace(/[\n]+$/g, '')
      : codeObj.source;
  })();
  return <Markdown className="codesource" children={mdIt.render(`\n\`\`\`typescript\n${sourceTransformed}\n\`\`\``)} />;
}

function renderCodeResult<T>(codeObj: CodeObject<T>, options: RenderOptions = {}): JSX.Element {
  const { resultHeader, commentOutput = false, expanded = false } = options;

  let data = ((): any => {
    const output = codeObj.output;
    if (output instanceof PathPattern) {
      return `PathPattern {\n\tpattern: '${output.getPattern()}'\n}`;
    }
    if (output instanceof PathPatternWithParams) {
      return `PathPatternWithParams {\n\tpattern: '${output.getPattern()}'\n}`;
    }
    return output;
  })();
  if (isString(data)) {
    data = commentOutput
      ? data
          .split('\n')
          .map(v => `//  ${v}`)
          .join('\n')
      : data;
    return (
      <Markdown
        className="output"
        children={`\n\`\`\`typescript\n${resultHeader ? resultHeader + '\n' : ''}${data}\n\`\`\``}
      />
    );
  }
  if (isObject(data)) {
    return <ExpendableJson data={data as any} initial={expanded} />;
  }
  return (
    <Markdown
      className="output"
      children={`\n\`\`\`typescript\n${resultHeader ? resultHeader + '\n' : ''}${print(data)}\n\`\`\``}
    />
  );
}
