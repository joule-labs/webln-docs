# Introduction

WebLN outlines a spec that is implemented by a myriad of providers. This documentation covers both how to use WebLN in your Lightning-driven applications, but also how to implement a provider.

Popular clients include

* [Joule](https://lightningjoule.com) - a WebLN-enabled browser extension
* [BlueWallet](https://bluewallet.io/) - a mobile app with a WebLN browser

Popular applications include

* [Lightning Spin](https://lightningspin.com) - A roulette-style game where you can bet and win Satoshis
* [BitRefill](https://www.bitrefill.com/) - Purchase gift cards with Bitcoin
* [Lightning Chess](https://koalastud.io) - Wager satoshis on chess games with friends
* And many more!

## For App Developers

Jump into the [Getting Started](/getting-started) section to see how to install and use WebLN in your app.

## For Provider Developers

Jump into the [WebLN Provider](/webln-provider) docs to see what a provider is, and the functions it should implement.

<br/>

#### A Quick Note About TypeScript

<small>
  Code samples in this documentation will be in <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>, a statically-typed variant of JavaScript. WebLN is fully typed, and it's highly recommended you use TypeScript when using it for the best developer experience. Likewise, it's also recommended if you're implementing a provider, to make certain that you're compliant to the spec.
</small>
