import React from 'react';
import Markdown from '../components/Markdown';
import text from './Errors.md';

export default class Page extends React.Component {
  render() {
    return <Markdown source={text} />;
  }
}
