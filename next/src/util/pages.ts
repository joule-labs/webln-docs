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
  description: string;
  section: string;
}

export const pages: Array<Page> = [
  {
    path: "/",
    name: "Introduction",
    description:
      "WebLN is a library and set of specifications for lightning apps and client providers to facilitate communication between apps and users' lightning nodes in a secure way.",
    section: "overview",
  },
  {
    path: "/getting-started",
    name: "Getting Started",
    description:
      "Instructions to get started building your WebLN integration for sending and receiving Lightning payments.",
    section: "overview",
  },
  {
    path: "/ux-best-practices",
    name: "UX Best Practices",
    description:
      "Suggestions on how best to integrate WebLN into your Lightning app.",
    section: "overview",
  },
  {
    path: "/client/request-provider",
    name: "requestProvider",
    description:
      "To begin interacting with a user's Lightning node, you'll first need to request a `WebLNProvider` from them.",
    section: "client",
  },
  {
    path: "/client/get-info",
    name: "webln.getInfo",
    description:
      "Ask the user for some information about their node. The request may be rejected by the user depending on the provider implementation.",
    section: "client",
  },
  {
    path: "/client/send-payment",
    name: "webln.sendPayment",
    description: "Request that the user send a payment for an invoice.",
    section: "client",
  },
  {
    path: "/client/make-invoice",
    name: "webln.makeInvoice",
    description: "Request that the user create an invoice for use by the app.",
    section: "client",
  },
  {
    path: "/client/sign-message",
    name: "webln.signMessage",
    description: "Request that the user sign an arbitrary string message.",
    section: "client",
  },
  {
    path: "/client/verify-message",
    name: "webln.verifyMessage",
    description:
      "Opens an external view where the user's client verifies the signature against the raw message.",
    section: "client",
  },
  {
    path: "/client/errors",
    name: "Errors",
    description:
      "WebLN provides some common error types to try to formalize error handling across applications.",
    section: "client",
  },
];
