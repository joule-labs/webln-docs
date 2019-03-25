import React from 'react';
import Markdown from '../components/Markdown';
import text from './SignMessage.md';
import DemoContainer from '../components/DemoContainer';
import SignMessageDemo from '../components/SignMessageDemo';

export default class SignMessage extends React.Component {
  render() {
    return (
      <>
        <Markdown source={text} />
        <DemoContainer sourcePath="components/SignMessageDemo.tsx">
          <SignMessageDemo />
        </DemoContainer>
      </>
    );
  }
}
