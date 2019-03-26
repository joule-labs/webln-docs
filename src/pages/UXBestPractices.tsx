import React from 'react';
import Markdown from '../components/Markdown';
import text from './UXBestPractices.md';

export default class UXBestPractices extends React.Component {
  render() {
    return <Markdown source={text} />;
  }
}
