import React from 'react';
import Placeholder from '../components/Placeholder';
import Markdown from '../components/Markdown';
import text from './SendPayment.md';

export default class MakeInvoice extends React.Component {
  render() {
    return (
      <>
        <Markdown source={text} />
        <Placeholder>There's no demo for this method yet</Placeholder>
      </>
    );
  }
}
