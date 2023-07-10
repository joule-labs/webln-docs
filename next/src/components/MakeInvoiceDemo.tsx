import React, { useMemo, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { requestProvider, RequestInvoiceResponse } from "webln";
import QRCode from "qrcode.react";
import { decode, FallbackAddress } from "bolt11";
import { Alert } from "./Alert";
import { DemoContainer } from "./DemoContainer";
import styled from "@emotion/styled";

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

  const code = useMemo(() => {
    const args = {
      amount,
      defaultAmount,
      minimumAmount,
      maximumAmount,
      defaultMemo,
    };
    Object.keys(args).forEach((key) => {
      if (!args[key as keyof typeof args]) {
        delete args[key as keyof typeof args];
      }
    });

    let argsStr = JSON.stringify(args, null, 2);
    if (argsStr === "{}") {
      argsStr = "";
    } else {
      // Remove quotes around properties to make it look more typescript-y
      argsStr = argsStr.replace(/"([^(")]+)":/g, "$1:");
    }

    return `webln.makeInvoice(${argsStr});`;
  }, [amount, defaultAmount, minimumAmount, maximumAmount, defaultMemo]);

  let content;
  if (invoice) {
    content = (
      <Root>
        <PaymentRequestTable paymentRequest={invoice.paymentRequest} />
        <Invoice>
          <QR>
            <QRCode value={invoice.paymentRequest.toUpperCase()} />
          </QR>
          <PaymentRequest>
            <FormControl>
              <FormLabel>Payment Request</FormLabel>
              <Textarea isDisabled rows={6} value={invoice.paymentRequest} />
            </FormControl>
          </PaymentRequest>
        </Invoice>

        <Button size="lg" width="100%" onClick={reset}>
          Generate another
        </Button>
      </Root>
    );
  } else {
    let amountInputs;
    if (amountType === "fixed") {
      amountInputs = (
        <FormControl>
          <FormLabel>Amount</FormLabel>
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
          <FormControl>
            <FormLabel>Default</FormLabel>
            <Input
              name="defaultAmount"
              type="number"
              value={defaultAmount}
              onChange={(ev) => setDefaultAmount(ev.currentTarget.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Min</FormLabel>
            <Input
              name="minimumAmount"
              type="number"
              value={minimumAmount}
              onChange={(ev) => setMinimumAmount(ev.currentTarget.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Max</FormLabel>
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
      <Form onSubmit={makeInvoice}>
        <Amounts>
          <AmountTypeToggle>
            <ButtonGroup isAttached size="sm">
              <Button
                variant={amountType === "dynamic" ? "solid" : "outline"}
                onClick={() => handleChangeAmountType("dynamic")}
              >
                Dynamic values
              </Button>
              <Button
                variant={amountType === "fixed" ? "solid" : "outline"}
                onClick={() => handleChangeAmountType("fixed")}
              >
                Fixed value
              </Button>
            </ButtonGroup>
          </AmountTypeToggle>
          {amountInputs}
        </Amounts>
        <FormControl>
          <FormLabel>Default memo</FormLabel>
          <Textarea
            name="defaultMemo"
            value={defaultMemo}
            onChange={(ev) => setDefaultMemo(ev.currentTarget.value)}
          />
        </FormControl>

        {error && (
          <Alert
            status="error"
            title="An error occured"
            description={error.toString()}
          />
        )}

        <Button size="lg" type="submit" isLoading={isLoading} width="100%">
          Make Invoice
        </Button>
      </Form>
    );
  }

  return (
    <DemoContainer code={code} componentFileName="MakeInvoiceDemo.tsx">
      {content}
    </DemoContainer>
  );
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

  const data = [
    {
      key: "Amount",
      value: `${decoded.satoshis} sats`,
    },
    {
      key: "Memo",
      value: description as string,
    },
    {
      key: "Fallback address",
      value: (address as FallbackAddress).address ? (
        <code>{(address as FallbackAddress).address}</code>
      ) : (
        (address as string)
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
    <Box
      p="0.5rem"
      border="1px solid var(--chakra-colors-chakra-border-color)"
      borderRadius="4"
      marginBottom="1rem"
    >
      <Table className="PaymentRequestTable" size="small">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.key}>
              <Td>{row.key}</Td>
              <Td>{row.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const Root = styled.div``;

const Invoice = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
`;

const QR = styled.div`
  width: 12rem;
  height: 12rem;
  padding: 0.75rem;
  margin-right: 1rem;
  border-radius: 4px;
  border: 1px solid var(--chakra-colors-chakra-border-color);
  background: #ffffff;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const PaymentRequest = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;

const Amounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 1.5rem 1rem 1rem;
  border: 1px solid var(--chakra-colors-chakra-border-color);
  border-radius: 4px;
`;

const AmountTypeToggle = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  background: var(--chakra-colors-chakra-body-bg);
`;

// .PaymentRequestTable {
//   margin-bottom: 2rem;

//   table {
//     table-layout: fixed;
//     width: 100%;
//   }

//   colgroup col:first-child {
//     width: 160px;
//   }

//   td {
//     overflow-wrap: break-word;
//   }

//   .ant-table-row em {
//     opacity: 0.5;
//     font-size: 0.8rem;
//   }
// }
