import React from 'react';
import Markdown from '../components/Markdown';
import text from './Introduction.md';

export default class Introduction extends React.Component {
  render() {
    return <Markdown source={text} />;
  }
}
