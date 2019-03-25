# `webln.getInfo`

Ask the user for some information about their node. The request may be rejected by the user depending on the provider implementation.

### Parameters

```ts
function getInfo(): Promise<GetInfoResponse>;
```

### Response

```ts
interface GetInfoResponse = {
  node: {
    alias: string;
    pubkey: string;
    color?: string;
  };
}
```
