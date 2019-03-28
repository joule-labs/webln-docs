# `webln.makeInvoice`

Request that the user create an invoice for use by the app. This will return a [BOLT-11](https://github.com/lightningnetwork/lightning-rfc/blob/master/11-payment-encoding.md) invoice. Invoices can be requested in a few forms:

* By specifying an explicit `amount`, the user's provider should enforce that the user generate an invoice with a specific amount
* By specifying a `minimumAmount` and / or `maximumAmount`, the user's provider should enforce that the user generate an invoice with an amount field constrained by that amount
* When an explicit `amount` is _not_ set, the user can return an invoice that has no amount specified, allowing the payment maker to send any amount

Note that these constraints are enforced by the client's provider, and therefore should not be completely trusted. If you want to check the fields that come back, or otherwise use the data encoded in the invoice, you'll want to use a library to decode it such as the [bolt11 npm package](https://www.npmjs.com/package/bolt11).

Amounts are denominated in satoshis. For large amounts, it's recommended you use a big number library such as [bn.js](https://www.npmjs.com/package/bn.js) as Javascript only supports 53 bit integers.

### Parameters

```ts
function makeInvoice(args: RequestInvoiceArgs): Promise<RequestInvoiceResponse>;

interface RequestInvoiceArgs {
  amount?: string | number;
  defaultAmount?: string | number;
  minimumAmount?: string | number;
  maximumAmount?: string | number;
  defaultMemo?: string;
}
```

### Response

```ts
interface RequestInvoiceResponse {
  paymentRequest: string;
}
```
