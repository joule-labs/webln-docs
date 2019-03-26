import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/styles/prism/prism';

interface Props {
  children: string;
  language: string;
}

const Code: React.SFC<Props> = ({ language, children }) => (
  <SyntaxHighlighter language={language} style={style}>
    {children}
  </SyntaxHighlighter>
);

export default Code;
