import * as React from 'react';
import { PathPatternDoc } from './PathPatternDoc';
import { Row } from '../components/Row';

const logo = require('../../assets/logo.svg');

export interface ContentProps {}

export const Content: React.SFC<ContentProps> = () => {
  return (
    <div className="content">
      <Row>
        <h1>
          <img src={logo} alt="PathPattern" className="logo" />
        </h1>
      </Row>
      <PathPatternDoc />
    </div>
  );
};
