import * as React from 'react';
import { CodeObject } from '../utils';
import { RenderOptions, Row } from './Row';
import { tagColors } from '../const/colors';

export interface TitleProps {
  name: string;
  type?: string;
  codeObj?: CodeObject<any> | Array<CodeObject<any>> | null;
  options?: RenderOptions;
}


export const Title: React.SFC<TitleProps> = ({ type, name, codeObj, options }) => {
  return (
    <Row codeObj={codeObj} options={options}>
      <h2>
        <code>
          {name}
          {type && (
            <code className="title-type" style={{ background: (tagColors as any)[type] || '' }}>
              {type}
            </code>
          )}
        </code>
      </h2>
    </Row>
  );
};
