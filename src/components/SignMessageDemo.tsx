import React from 'react';
import { Form, Input, Row, Col, Button, Alert } from 'antd';
import { requestProvider, SignMessageResponse } from 'webln';

interface State {
  message: string;
  sig: SignMessageResponse | null;
  error: Error | null;
  isLoading: boolean;
};

export default class SignMessageDemo extends React.Component<{}, State> {
  state: State = {
    message: "WebLN is the bee's knees",
    sig: null,
    error: null,
    isLoading: false,
  };

  render() {
    const { message, sig, error, isLoading } = this.state;

    return (
      <Form layout="vertical">
        <Row gutter={20}>
          <Col xs={24} sm={12}>
            <Form.Item label="Message">
              <Input.TextArea rows={5} value={message} onChange={this.handleChangeMessage} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Signature">
              <Input.TextArea rows={5} disabled value={sig ? sig.signature : ''} />
            </Form.Item>
          </Col>
        </Row>
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
          onClick={this.signMessage}
          block
        >
          Sign message
        </Button>
      </Form>
    )
  }

  private handleChangeMessage = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      message: ev.target.value,
      sig: null,
    });
  };

  private signMessage = async () => {
    this.setState({
      error: null,
      sig: null,
      isLoading: true,
    });

    try {
      const webln = await requestProvider();
      const sig = await webln.signMessage(this.state.message);
      this.setState({
        sig,
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
