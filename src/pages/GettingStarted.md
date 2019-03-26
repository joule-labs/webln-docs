# Getting Started

To start using WebLN, you'll need access to the client library. You can either install the package, or include a script. **It's highly recommended that you install the package and bundle it rather than relying on an external script**.

## Installation

### EITHER Install with Package Manager

Install the `webln` library using your package manager of choice:

* npm: `npm install --save webln`
* yarn: `yarn add webln`

### OR Include Script

Alternatively you can include a script in your page that will load the library. **Be sure to keep the integrity check to prevent malicious Javascript from loading.**

```html
<script
  src="https://unpkg.com/webln@0.2.0/dist/webln.min.js"
  integrity="sha384-mTReBqbhPO7ljQeIoFaD1NYS2KiYMwFJhUNpdwLj+VIuhhjvHQlZ1XpwzAvd93nQ"
  crossorigin="anonymous"
></script>
```

This will provide a global `WebLN` object in your code, so anywhere you see an `import` statement, you can ignore that and access the same code from the global `WebLN` object. For instance, the following code:

```ts
import { requestProvider } from 'webln';
requestProvider(/* ... */);
```

would instead look like this:

```js
WebLN.requestProvider(/* ... */);
```

## You're All Set

From here, check out how to use [`requestProvider`](/api/request-provider) and the provider API methods. Make sure you take a look at the source code for each method's demo to fully understand it.