# Introduction

WebLN is a library and set of specifications for lightning apps and client providers to facilitate communication between apps and users' lightning nodes in a secure way. It provides a programmatic, permissioned interface for letting applications ask users to send payments, generate invoices to receive payments, and much more. This documentation covers both how to use WebLN in your Lightning-driven applications, but also how to implement a provider.

You may be interested in using WebLN if you...

* Have an application that accepts or makes Lightning payments to users
* Want to have decentralized identity and authentication in your application
* Are working on a Lightning node wallet, and want to make it easier for your users to interact with Lightning web apps

## WebLN In the Wild

Some WebLN client providers include

* [Alby](https://github.com/getAlby) - a general and versatile open-source browser extension for the Bitcoin Lightning Network
* [Joule](https://lightningjoule.com) - a WebLN-enabled browser extension that uses your own node
* [BlueWallet](https://bluewallet.io/) - a mobile wallet with a WebLN browser
* [kwh](https://github.com/fiatjaf/kwh/) - A firefox/chrome extension for WebLN to your c-lightning node
* [Blixt Wallet](https://blixtwallet.github.io/) - a non-custodial open-source Lightning Wallet with a WebLN browser

Some applications that use WebLN on the web include

* [Bitrefill](https://www.bitrefill.com/) - Purchase gift cards with Bitcoin
* [Lightning Spin](https://lightningspin.com) - A roulette-style game where you can bet and win Satoshis
* [LNMarkets](https://lnmarkets.com/) - LN-powered Bitcoin derivatives trading platform
* [Sparkshot](https://sparkshot.io/) - Platform for artists to monetize the release of their art.
* [Stacker News](https://stacker.news/) - A reddit like platform with Lightning payments for upvotes of posts

## For App Developers

Jump into the [Getting Started](/getting-started) section to see how to install and use WebLN in your app.

## For Provider Developers

Jump into the [WebLN Provider](/webln-provider) docs to see what a provider is, and the functions it should implement.

<br/>

#### A Quick Note About TypeScript

<small>
  Code samples in this documentation will be in <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>, a statically-typed variant of JavaScript. WebLN is fully typed, and it's highly recommended you use TypeScript when using it for the best developer experience. Likewise, it's also recommended if you're implementing a provider, to make certain that you're compliant to the spec.
</small>
