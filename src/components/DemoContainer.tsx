import React from 'react';
import { Icon } from 'antd';
import Code from './Code';
import './DemoContainer.less';

interface Props {
  children: React.ReactNode;
  sourcePath: string;
  code?: string;
}

const DemoContainer: React.SFC<Props> = ({ code, sourcePath, children }) => (
  <div className="DemoContainer">
    <div className="DemoContainer-header">
      <h2 className="DemoContainer-header-title" id="demo">Demo</h2>
      <a
        className="DemoContainer-header-source"
        href={`https://github.com/wbobeirne/webln-docs/tree/master/src/${sourcePath}`}
        target="_blank"
      >
        See source on GitHub <Icon type="github" />
      </a>
    </div>
    <div className="DemoContainer-content">
      {code && (
        <div className="DemoContainer-content-code">
          <Code language="typescript">{code}</Code>
        </div>
      )}
      <div className="DemoContainer-content-demo">
        {children}
      </div>
    </div>
  </div>
);

export default DemoContainer;
