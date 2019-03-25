# `webln.verifyMessage`

Opens an external view where the user's client verifies the signature against the raw message, and let's the user know if it was valid. There's no return value, this method is intended purely for the user to verify a signature themselves without having to trus your website.

### Parameters

```ts
function verifyMessage(signature: string, message: string): Promise<void>;
```