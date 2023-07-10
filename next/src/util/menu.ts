export interface Section {
  id: string;
  name: string;
}

export const sections: Array<Section> = [
  {
    id: "overview",
    name: "Overview",
  },
  {
    id: "client",
    name: "Client API Reference",
  },
  {
    id: "provider",
    name: "Provider Reference",
  },
];

export interface Page {
  path: string;
  name: string;
  section: string;
}

export const pages: Array<Page> = [
  {
    path: "/",
    name: "Introduction",
    section: "overview",
  },
  {
    path: "/getting-started",
    name: "Getting Started",
    section: "overview",
  },
  {
    path: "/ux-best-practices",
    name: "UX Best Practices",
    section: "overview",
  },
  {
    path: "/client/request-provider",
    name: "requestProvider",
    section: "client",
  },
  {
    path: "/client/get-info",
    name: "webln.getInfo",
    section: "client",
  },
  {
    path: "/client/send-payment",
    name: "webln.sendPayment",
    section: "client",
  },
  {
    path: "/client/make-invoice",
    name: "webln.makeInvoice",
    section: "client",
  },
  {
    path: "/client/sign-message",
    name: "webln.signMessage",
    section: "client",
  },
  {
    path: "/client/verify-message",
    name: "webln.verifyMessage",
    section: "client",
  },
  {
    path: "/client/errors",
    name: "Errors",
    section: "client",
  },
];
