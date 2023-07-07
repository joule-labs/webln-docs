import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Table,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { requestProvider, RequestInvoiceResponse } from "webln";
import QRCode from "qrcode.react";
import { decode, FallbackAddress } from "bolt11";
// import "./MakeInvoiceDemo.less";

export const MakeInvoiceDemo: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [defaultAmount, setDefaultAmount] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [maximumAmount, setMaximumAmount] = useState("");
  const [defaultMemo, setDefaultMemo] = useState("");
  const [amountType, setAmountType] = useState("dynamic");
  const [invoice, setInvoice] = useState<RequestInvoiceResponse>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeAmountType = (value: string) => {
    if (value === "fixed") {
      setDefaultAmount("");
      setMinimumAmount("");
      setMaximumAmount("");
    } else {
      setAmount("");
    }
    setAmountType(value);
  };

  const makeInvoice = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setInvoice(undefined);
    setError(undefined);

    setIsLoading(true);
    try {
      const webln = await requestProvider();
      const invoice = await webln.makeInvoice({
        amount,
        defaultAmount,
        minimumAmount,
        maximumAmount,
        defaultMemo,
      });
      setInvoice(invoice);
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  };

  const reset = () => {
    setInvoice(undefined);
    setError(undefined);
    setIsLoading(false);
  };

  let content;
  if (invoice) {
    content = (
      <div className="MakeInvoiceDemo">
        <PaymentRequestTable paymentRequest={invoice.paymentRequest} />
        <div className="MakeInvoiceDemo-invoice">
          <div className="MakeInvoiceDemo-invoice-qr">
            <QRCode value={invoice.paymentRequest.toUpperCase()} />
          </div>
          <form className="MakeInvoiceDemo-invoice-pr">
            <FormControl>
              <FormLabel>Payment Request</FormLabel>
              <Textarea disabled rows={6} value={invoice.paymentRequest} />
            </FormControl>
          </form>
        </div>

        <Button size="lg" width="100%" onClick={reset}>
          Generate another
        </Button>
      </div>
    );
  } else {
    let amountInputs;
    if (amountType === "fixed") {
      amountInputs = (
        <FormControl label="Amount">
          <Input
            name="amount"
            type="number"
            value={amount}
            onChange={(ev) => setAmount(ev.currentTarget.value)}
          />
        </FormControl>
      );
    } else {
      amountInputs = (
        <>
          <FormControl label="Default">
            <Input
              name="defaultAmount"
              type="number"
              value={defaultAmount}
              onChange={(ev) => setDefaultAmount(ev.currentTarget.value)}
            />
          </FormControl>
          <FormControl label="Min">
            <Input
              name="minimumAmount"
              type="number"
              value={minimumAmount}
              onChange={(ev) => setMinimumAmount(ev.currentTarget.value)}
            />
          </FormControl>
          <FormControl label="Max">
            <Input
              name="maximumAmount"
              type="number"
              value={maximumAmount}
              onChange={(ev) => setMaximumAmount(ev.currentTarget.value)}
            />
          </FormControl>
        </>
      );
    }
    content = (
      <form className="MakeInvoiceDemo-form" onSubmit={makeInvoice}>
        <div className="MakeInvoiceDemo-form-amounts">
          <div className="MakeInvoiceDemo-form-amounts-toggle">
            <RadioGroup value={amountType} onChange={handleChangeAmountType}>
              <Radio value="dynamic">Dynamic values</Radio>
              <Radio value="fixed">Fixed value</Radio>
            </RadioGroup>
          </div>
          {amountInputs}
        </div>
        <FormControl>
          <FormLabel>Default memo</FormLabel>
          <Textarea
            name="defaultMemo"
            value={defaultMemo}
            onChange={(ev) => setDefaultMemo(ev.currentTarget.value)}
          />
        </FormControl>

        {error && (
          <Alert status="error" style={{ marginBottom: "1rem" }}>
            <AlertIcon />
            <AlertTitle>An error occured</AlertTitle>
            <AlertDescription>{error.toString()}</AlertDescription>
          </Alert>
        )}

        <Button size="lg" type="submit" isLoading={isLoading} width="100%">
          Make Invoice
        </Button>
      </form>
    );
  }

  return content;
};

// Payment request decoded info table
interface PRTableProps {
  paymentRequest: string;
}

const PaymentRequestTable: React.FC<PRTableProps> = ({ paymentRequest }) => {
  // Decode and provide helper for snagging informal
  const decoded = decode(paymentRequest);
  const getTag = (name: string, def: React.ReactNode = <em>N/A</em>) => {
    const tag = decoded.tags.find((t) => t.tagName === name);
    return tag && tag.data ? tag.data : def;
  };
  const paymentHash = getTag("payment_hash");
  const description = getTag("description");
  const cltvExpiry = getTag("min_final_cltv_expiry");
  const address = getTag("fallback_address");
  const expiry = getTag("expiry", 3600) as number;

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];
  const data = [
    {
      key: "Amount",
      value: `${decoded.satoshis} sats`,
    },
    {
      key: "Memo",
      value: description,
    },
    {
      key: "Fallback address",
      value: (address as FallbackAddress).address ? (
        <code>{(address as FallbackAddress).address}</code>
      ) : (
        address
      ),
    },
    {
      key: "Created",
      value: decoded.timestamp ? (
        new Date(decoded.timestamp * 1000).toLocaleString()
      ) : (
        <em>N/A</em>
      ),
    },
    {
      key: "Expires",
      value: decoded.timestamp
        ? `${new Date(
            (decoded.timestamp + expiry) * 1000
          ).toLocaleString()} (${expiry} seconds)`
        : `${expiry} seconds`,
    },
    {
      key: "CLTV Expiry",
      value: `${cltvExpiry} blocks`,
    },
    {
      key: "Payment hash",
      value: <code>{paymentHash as string}</code>,
    },
    {
      key: "Pubkey",
      value: <code>{decoded.payeeNodeKey}</code>,
    },
  ];

  return (
    <Table
      className="PaymentRequestTable"
      dataSource={data}
      columns={columns}
      pagination={false}
      size="small"
    />
  );
};
