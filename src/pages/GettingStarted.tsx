import React from 'react';
import Markdown from '../components/Markdown';
import text from './GettingStarted.md';

export default class GettingStarted extends React.Component {
  render() {
    return <Markdown source={text} />;
  }
}
