import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown, { Renderer } from 'react-markdown';
import Code from './Code';
import './Markdown.less';

interface Props {
  source: string;
}

const renderers: { [key: string]: Renderer<any> } = {
  // Syntax highlighting
  code: props => <Code language={props.language}>{props.value}</Code>,
  // External links are normal, internal are React Router
  link: props => {
    if (props.href.startsWith('http')) {
      return <a {...props} target="_blank" rel="nofollow noopener" />;
    } else {
      return <Link to={props.href}>{props.children}</Link>;
    }
  },
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
