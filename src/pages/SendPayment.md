# `webln.sendPayment`

Request that the user send a payment for an invoice. The application needs to provide a [BOLT-11](https://github.com/lightningnetwork/lightning-rfc/blob/master/11-payment-encoding.md) invoice. Note that WebLN does not yet support invoiceless payments (e.g. Sphinx) so you will need to have a service that dynamically generates invoices per user.

### Parameters

```ts
function sendPayment(paymentRequest: string): Promise<SendPaymentResponse>;
```

### Response

```ts
interface SendPaymentResponse {
  node: {
    alias: string;
    pubkey: string;
    color?: string;
  };
}
```
