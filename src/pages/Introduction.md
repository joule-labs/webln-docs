# Introduction

WebLN is a library for applications, and a specification for client providers to facilitate  communication between apps and user's lightning nodes in a secure way. It provides a programatic and permissioned interface to let applications get users to send payments, generate invoices to receive payments, and much more. This documentation covers both how to use WebLN in your Lightning-driven applications, but also how to implement a provider.

You may be interested in using WebLN if you...

* Have an application that accepts or makes Lightning payments to users
* Want to have decentralized identity and authentication in your application
* Are working on a Lightning node wallet, and want to make it easier for your users to interact with Lightning web apps

## WebLN In the Wild

Some WebLN client providers include

* [Joule](https://lightningjoule.com) - a WebLN-enabled browser extension
* [BlueWallet](https://bluewallet.io/) - a mobile app with a WebLN browser

Some applications that use WebLN on the web include

* [Lightning Spin](https://lightningspin.com) - A roulette-style game where you can bet and win Satoshis
* [Bitrefill](https://www.bitrefill.com/) - Purchase gift cards with Bitcoin
* [Lightning Chess](https://koalastud.io) - Wager satoshis on chess games with friends
* [Tippin.me](https://tippin.me) - A custodial Lightning tipping service for Twitter
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
