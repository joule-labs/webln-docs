import React from 'react';
import { Form, Input, Button, Alert, Table } from 'antd';
import { requestProvider, RequestInvoiceResponse } from 'webln';
import QRCode from 'qrcode.react';
import { decode, FallbackAddress } from 'bolt11';
import './MakeInvoiceDemo.less';

interface Props {
  onChangeForm(fields: FormState): void;
}

export interface FormState {
  amount: string;
  defaultAmount: string;
  minimumAmount: string;
  maximumAmount: string;
  defaultMemo: string;
}

interface State {
  form: FormState;
  invoice: RequestInvoiceResponse | null;
  error: Error | null;
  isLoading: boolean;
}

export default class MakeInvoiceDemo extends React.Component<Props, State> {
  state: State = {
    form: {
      amount: '',
      defaultAmount: '',
      minimumAmount: '',
      maximumAmount: '',
      defaultMemo: '',
    },
    invoice: null,
    error: null,
    isLoading: false,
  };

  render() {
    const { form, invoice, error, isLoading } = this.state;

    let content;
    if (invoice) {
      content = (
        <div className="MakeInvoiceDemo">
          <PaymentRequestTable paymentRequest={invoice.paymentRequest} />
          <div className="MakeInvoiceDemo-invoice">
            <div className="MakeInvoiceDemo-invoice-qr">
              <QRCode value={invoice.paymentRequest.toUpperCase()} />
            </div>
            <Form className="MakeInvoiceDemo-invoice-pr" layout="vertical">
              <Form.Item label="Payment Request">
                <Input.TextArea disabled rows={6} value={invoice.paymentRequest} />
              </Form.Item>
            </Form>
          </div>
          
          <Button type="primary" size="large" block onClick={this.reset}>
            Generate another
          </Button>
        </div>
      );
    } else {
      content = (
        <Form layout="vertical" onSubmit={this.makeInvoice}>
          <Form.Item label="Amount">
            <Input
              name="amount"
              type="number"
              value={form.amount}
              onChange={this.handleInput}
            />
          </Form.Item>
          <Form.Item label="Default">
            <Input
              name="defaultAmount"
              type="number"
              value={form.defaultAmount}
              onChange={this.handleInput}
            />
          </Form.Item>
          <Form.Item label="Min">
            <Input
              name="minimumAmount"
              type="number"
              value={form.minimumAmount}
              onChange={this.handleInput}
            />
          </Form.Item>
          <Form.Item label="Max">
            <Input
              name="maximumAmount"
              type="number"
              value={form.maximumAmount}
              onChange={this.handleInput}
            />
          </Form.Item>
          <Form.Item label="Default memo">
            <Input.TextArea
              name="defaultMemo"
              value={form.defaultMemo}
              onChange={this.handleInput}
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
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Make Invoice
          </Button>
        </Form>
      );
    }

    return content;
  }

  private handleInput = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form = {
      ...this.state.form,
      [ev.target.name]: ev.target.value,
    };
    this.setState({ form }, () => {
      this.props.onChangeForm(this.state.form);
    });
  };

  private makeInvoice = async (ev: React.FormEvent) => {
    ev.preventDefault();
    this.setState({
      isLoading: true,
      invoice: null,
      error: null,
    });

    try {
      const webln = await requestProvider();
      const invoice = await webln.makeInvoice(this.state.form);
      this.setState({ invoice });
    } catch(error) {
      this.setState({ error });
    }
    this.setState({ isLoading: false });
  };

  private reset = () => {
    this.setState({
      invoice: null,
      error: null,
      isLoading: false,
    });
  };
}

// Payment request decoded info table
interface PRTableProps {
  paymentRequest: string;
}

const PaymentRequestTable: React.SFC<PRTableProps> = ({ paymentRequest }) => {
  // Decode and provide helper for snagging informal 
  const decoded = decode(paymentRequest);
  const getTag = (name: string, def: any = <em>N/A</em>) => {
    const tag = decoded.tags.find(t => t.tagName === name);
    return tag && tag.data ? tag.data : def;
  };
  const paymentHash = getTag('payment_hash');
  const description = getTag('description');
  const cltvExpiry = getTag('min_final_cltv_expiry');
  const address = getTag('fallback_address');
  const expiry = getTag('expiry', 3600) as number;


  console.log(decoded);
  const columns = [{
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
  }, {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  }];
  const data: any = [{
    key: 'Coin',
    value: decoded.coinType,
  }, {
    key: 'Amount',
    value: `${decoded.satoshis} sats`,
  }, {
    key: 'Memo',
    value: description,
  }, {
    key: 'Fallback address',
    value: (address as FallbackAddress).address ? <code>{address.address}</code> : address,
  }, {
    key: 'Created',
    value: decoded.timestamp
      ? new Date(decoded.timestamp * 1000).toLocaleString()
      : <em>N/A</em>,
  }, {
    key: 'Expires',
    value: decoded.timestamp
      ? `${new Date((decoded.timestamp + expiry) * 1000).toLocaleString()} (${expiry} seconds)`
      : `${expiry} seconds`,
  }, {
    key: 'CLTV Expiry',
    value: `${cltvExpiry} blocks`,
  }, {
    key: 'Payment hash',
    value: <code>{paymentHash}</code>,
  }, {
    key: 'Pubkey',
    value: <code>{decoded.payeeNodeKey}</code>,
  }];

  return (
    <Table
      className="PaymentRequestTable"
      dataSource={data}
      columns={columns}
      pagination={false}
      size="small"
    />
  )
};