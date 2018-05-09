import * as print from 'print';
import * as React from 'react';
import { Markdown } from './Markdown';
import { Toggle } from 'react-powerplug';

export interface ExpendableJsonProps {
  data: object;
  header?: string;
  initial?: boolean;
}

export const ExpendableJson: React.SFC<ExpendableJsonProps> = ({ data, header, initial = true }) => {
  const printed = print(data);
  const small = `{ ${Object.keys(data).join(', ')} }`;
  return (
    <Toggle initial={initial}>
      {({ on, toggle }) => {
        return (
          <Markdown
            className="output toggle"
            children={`\n\`\`\`typescript\n${on ? '' : '// click to expand\n'}${header ? header + '\n' : ''}${
              on ? printed : small
            }\n\`\`\``}
            onClick={() => toggle()}
          />
        );
      }}
    </Toggle>
  );
};
