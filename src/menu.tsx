import Introduction from './pages/Introduction';
import GettingStarted from './pages/GettingStarted';
import UXBestPractices from './pages/UXBestPractices';
import RequestProvider from './pages/RequestProvider';
import GetInfo from './pages/GetInfo';
import SendPayment from './pages/SendPayment';
import MakeInvoice from './pages/MakeInvoice';
import SignMessage from './pages/SignMessage';
import VerifyMessage from './pages/VerifyMessage';
import Errors from './pages/Errors';

export interface Section {
  id: string;
  name: string;
}

export const sections: Array<Section> = [{
  id: 'overview',
  name: 'Overview',
}, {
  id: 'api',
  name: 'API Reference',
}, { 
  id: 'provider',
  name: 'Provider Reference',
}];

export interface Page {
  path: string;
  name: string;
  section: string;
  component: React.ComponentClass;
}

export const pages: Array<Page> = [{
  path: '/introduction',
  name: 'Introduction',
  section: 'overview',
  component: Introduction,
}, {
  path: '/getting-started',
  name: 'Getting Started',
  section: 'overview',
  component: GettingStarted,
}, {
  path: '/ux-best-practices',
  name: 'UX Best Practices',
  section: 'overview',
  component: UXBestPractices,
}, {
  path: '/api/request-provider',
  name: 'requestProvider',
  section: 'client-api',
  component: RequestProvider,
}, {
  path: '/api/get-info',
  name: 'webln.getInfo',
  section: 'api',
  component: GetInfo,
}, {
  path: '/api/send-payment',
  name: 'webln.sendPayment',
  section: 'api',
  component: SendPayment,
}, {
  path: '/api/make-invoice',
  name: 'webln.makeInvoice',
  section: 'api',
  component: MakeInvoice,
}, {
  path: '/api/sign-message',
  name: 'webln.signMessage',
  section: 'api',
  component: SignMessage,
}, {
  path: '/api/verify-message',
  name: 'webln.verifyMessage',
  section: 'api',
  component: VerifyMessage,
}, {
  path: '/api/errors',
  name: 'Errors',
  section: 'api',
  component: Errors
}];