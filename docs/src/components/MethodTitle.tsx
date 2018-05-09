import * as React from 'react';
import { Row } from './Row';
import { tagColors } from '../const/colors';

export interface MethodTitleProps {
  name: string;
  type?: string;
}

export const MethodTitle: React.SFC<MethodTitleProps> = ({ type, name }) => {
  return (
    <Row>
      <h4>
        <code>{name}</code>
        {type && (
          <code className="method-title-type" style={{ background: (tagColors as any)[type] || '' }}>
            {type}
          </code>
        )}
      </h4>
    </Row>
  );
};
