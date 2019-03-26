# `requestProvider`

To begin interacting with a user's Lightning node, you'll first need to request a `WebLNProvider` from them. `WebLNProvider` is a class that various clients implement and attach to your web session. Calling `requestProvider` will retrieve the provider for you, and prompt the client for permission to use it. Once you get the provider, you're free to call all of the other API methods.

Note that this is an asynchronous operation, and the client can reject access to the provider even if it's available. The request will also fail if there's no provider available.

<div data-show="true" class="ant-alert ant-alert-warning ant-alert-with-description">
  <i aria-label="icon: exclamation-circle" class="anticon anticon-exclamation-circle ant-alert-icon">
    <svg viewBox="64 64 896 896" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
      <path d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
    </svg>
  </i>
  <span class="ant-alert-message">Wait for the document to be ready</span>
  <span class="ant-alert-description">
    To ensure that the user's client has adequate time to inject WebLN, it's recommended that all of your code be executed once the document is ready. In a normal javascript environment, this can be done by waiting on the document <code>DOMContentReady</code> listener. In a framework environment, such as React, this is once your application has mounted.
  </span>
</div>

## Example

```ts
import { requestProvider } from 'webln';

try {
  const webln = await requestProvider();
  // Now you can call all of the webln.* methods
}
catch(err) {
  // Tell the user what went wrong
  alert(err.message);
}
```