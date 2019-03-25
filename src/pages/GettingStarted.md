# Getting Started

To start using WebLN, you'll need access to the client library. You can either install the package, or include a script. **It's highly recommended that you install the package and bundle it rather than relying on an external script**.

## Install with Package Manager

Install the `webln` library using your package manager of choice:

* npm: `npm install --save webln`
* yarn: `yarn add webln`

## Include Script

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

## Wait For Document Ready

To ensure that the user's client has adequate time to inject WebLN, it's recommended that all of your code be executed once the document is ready. In a normal javascript environment, this can be done by waiting on the document `DOMContentReady` listener. In a React environment, this is once your components have mounted.