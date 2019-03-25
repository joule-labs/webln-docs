import React from 'react';
import { Form, Input, Icon, Button, Alert } from 'antd';
import { requestProvider, GetInfoResponse } from 'webln';

interface State {
  info: GetInfoResponse | null;
  error: Error | null;
  isLoading: boolean;
};

export default class GetInfoDemo extends React.Component<{}, State> {
  state: State = {
    info: null,
    error: null,
    isLoading: false,
  };

  render() {
    const { info, error, isLoading } = this.state;

    return (
      <Form layout="vertical">
        <Form.Item label="Pubkey">
          <Input disabled value={info ? info.node.pubkey : ''} />
        </Form.Item>
        <Form.Item label="Alias">
          <Input disabled value={info ? info.node.alias : ''} />
        </Form.Item>
        <Form.Item label="Color">
          <Input
            disabled
            value={info ? info.node.color : ''}
            addonBefore={info && info.node.color && (
              <div style={{
                height: '1rem',
                width: '1rem',
                borderRadius: '100%',
                background: info.node.color,
              }}/>
            )}
          />
        </Form.Item>
        {error && 
          <Alert
            type="error"
            message="An error occured"
            description={error.toString()}
            style={{ marginBottom: '1rem' }}
            showIcon
          />
        }
        <Button
          size="large"
          type="primary"
          loading={isLoading}
          onClick={this.getInfo}
          block
        >
          Run webln.getInfo
        </Button>
      </Form>
    )
  }

  private getInfo = async () => {
    this.setState({
      error: null,
      info: null,
      isLoading: true,
    });

    try {
      const webln = await requestProvider();
      const info = await webln.getInfo();
      this.setState({
        info,
        isLoading: false,
      });
    } catch(error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  };
}