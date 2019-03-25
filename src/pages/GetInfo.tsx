import React from 'react';
import { Row, Col } from 'antd';
import Markdown from '../components/Markdown';
import Code from '../components/Code';
import GetInfoDemo from '../components/GetInfoDemo';
import DemoContainer from '../components/DemoContainer';
import text from './GetInfo.md';

export default class Page extends React.Component {
  render() {
    return (
      <>
        <Markdown source={text} />
        <DemoContainer>
          <GetInfoDemo />
        </DemoContainer>
      </>
    );
  }
}
