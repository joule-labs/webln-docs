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
  // Inherit ant design's styles for tables
  table: props => (
    <div className="ant-table ant-table-default">
      <div className="ant-table-content">
        <div className="ant-table-body">
          <table {...props} />
        </div>
      </div>
    </div>
  ),
  tableHead: props => (
    <thead {...props} className="ant-table-thead" />
  ),
  tableBody: props => (
    <tbody {...props} className="ant-table-tbody" />
  ),
  tableRow: props => (
    <tr {...props} className="ant-table-row" />
  ),
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
