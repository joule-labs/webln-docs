import React from 'react';
import Markdown from '../components/Markdown';
import text from './VerifyMessage.md';
import DemoContainer from '../components/DemoContainer';
import VerifyMessageDemo from '../components/VerifyMessageDemo';

export default class VerifyMessage extends React.Component {
  render() {
    return (
      <>
        <Markdown source={text} />
        <DemoContainer sourcePath="components/VerifyMessageDemo.tsx">
          <VerifyMessageDemo />
        </DemoContainer>
      </>
    );
  }
}
