import * as React from 'react';
import { mdIt } from '../utils';

export interface MarkdownProps {
  children: string;
  className?: string;
  tag?: 'div' | 'span';
  onClick?: () => void;
}

export const Markdown: React.SFC<MarkdownProps> = ({ children, className = '', tag = 'div', onClick }) => {
  return React.createElement(tag, {
    dangerouslySetInnerHTML: {
      __html: mdIt.render(children),
    },
    className,
    onClick,
  });
};
