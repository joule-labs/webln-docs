import React from 'react';
import Markdown from '../components/Markdown';
import text from './RequestProvider.md';

export default class RequestProvider extends React.Component {
  render() {
    return <Markdown source={text} />;
  }
}
