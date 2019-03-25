import React from 'react';
import Placeholder from '../components/Placeholder';
import Markdown from '../components/Markdown';
import DemoContainer from '../components/DemoContainer';
import MakeInvoiceDemo, { FormState } from '../components/MakeInvoiceDemo';
import text from './MakeInvoice.md';

interface State {
  form: FormState;
}

export default class MakeInvoice extends React.Component<{}, State> {
  state: State = {
    form: {} as any,
  };

  render() {
    const code = this.makeCode();
    return (
      <>
        <Markdown source={text} />
        <DemoContainer code={code} sourcePath="components/MakeInvoiceDemo.tsx">
          <MakeInvoiceDemo onChangeForm={this.handleFormChange} />
        </DemoContainer>
      </>
    );
  }

  private handleFormChange = (form: FormState) => {
    this.setState({ form });
  };

  private makeCode = () => {
    let args = { ...this.state.form };
    Object.keys(args).forEach(key => {
      if (!(args as any)[key]) {
        delete (args as any)[key];
      }
    });

    let argsStr = JSON.stringify(args, null, 2);
    if (argsStr === '{}') {
      argsStr = '';
    } else {
      // Remove quotes around properties to make it look more typescript-y
      argsStr = argsStr.replace(/\"([^(\")"]+)\":/g,"$1:")
    }

    return `webln.makeInvoice(${argsStr});`;
  };
}
