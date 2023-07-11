# WebLN Docs

This houses the documentation for [WebLN](https://github.com/wbobeirne/webln), a client
library and spec for Lightning web apps to interface with web-enabled Lightning clients.

## Requirements

- Node 16+
- Yarn 1

### Run in Development

```sh
yarn && yarn dev
```

### Build for Production

```sh
yarn && yarn build
```

### Continuous Deployments

Pull requests will deploy a preview build to Vercel automatically. Merges into `master`
will deploy the latest version of the site to https://webln.dev automatically.
