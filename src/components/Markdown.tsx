import React from 'react';
import ReactMarkdown, { Renderer } from 'react-markdown';
import Code from './Code';
import './Markdown.less';

interface Props {
  source: string;
}

const renderers: { [key: string]: Renderer<any> } = {
  code: props => <Code language={props.language}>{props.value}</Code>,
}

const Markdown: React.SFC<Props> = ({ source }) => (
  <div className="Markdown">
    <ReactMarkdown
      source={source}
      renderers={renderers}
      escapeHtml={false}
    />
  </div>
);

export default Markdown;
