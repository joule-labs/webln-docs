import React from 'react';
import { Form, Input, Row, Col, Button, Alert } from 'antd';
import { requestProvider, SignMessageResponse } from 'webln';

interface State {
  message: string;
  signature: string;
  error: Error | null;
  isLoading: boolean;
};

export default class VerifyMessageDemo extends React.Component<{}, State> {
  state: State = {
    message: "WebLN is the bee's knees",
    signature: 'rbpr1o6qfqtgrsqmnhgsq7tkch9aet5ze7wstxqjo87zqybg38tzy3pmiwi36c5mcqnnep179dhjziog5jsam41ce7hdaf4dmjfhiys9',
    error: null,
    isLoading: false,
  };

  render() {
    const { message, signature, error, isLoading } = this.state;

    return (
      <Form layout="vertical">
        <Row gutter={20}>
          <Col xs={24} sm={12}>
            <Form.Item label="Message">
              <Input.TextArea
                name="message"
                rows={5}
                value={message}
                onChange={this.handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Signature">
            <Input.TextArea
                name="signature"
                rows={5}
                value={signature}
                onChange={this.handleChange}
              />
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
          onClick={this.verifyMessage}
          block
        >
          Verify message
        </Button>
      </Form>
    )
  }


  private handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ [ev.target.name]: ev.target.value } as any);
  };

  private verifyMessage = async () => {
    this.setState({ error: null });
    try {
      const { signature, message } = this.state;
      const webln = await requestProvider();
      await webln.verifyMessage(signature, message);
    } catch(error) {
      this.setState({ error });
    }
  };
}
