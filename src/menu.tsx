import Introduction from './pages/Introduction';
import GettingStarted from './pages/GettingStarted';
import RequestProvider from './pages/RequestProvider';
import GetInfo from './pages/GetInfo';
import SendPayment from './pages/SendPayment';
import MakeInvoice from './pages/MakeInvoice';
import SignMessage from './pages/SignMessage';
import VerifyMessage from './pages/VerifyMessage';
import Errors from './pages/Errors';

export interface Page {
  path: string;
  name: string;
  component: React.ComponentClass;
}

export interface SubMenu {
  path: string;
  name: string;
  pages: Page[];
}

export const menu: Array<Page | SubMenu> = [{
  path: '/introduction',
  name: 'Introduction',
  component: Introduction,
}, {
  path: '/getting-started',
  name: 'Getting Started',
  component: GettingStarted,
}, {
  path: '/api',
  name: 'API Reference',
  pages: [{
    path: '/api/request-provider',
    name: 'requestProvider',
    component: RequestProvider,
  }, {
    path: '/api/get-info',
    name: 'webln.getInfo',
    component: GetInfo,
  }, {
    path: '/api/send-payment',
    name: 'webln.sendPayment',
    component: SendPayment,
  }, {
    path: '/api/make-invoice',
    name: 'webln.makeInvoice',
    component: MakeInvoice,
  }, {
    path: '/api/sign-message',
    name: 'webln.signMessage',
    component: SignMessage,
  }, {
    path: '/api/verify-message',
    name: 'webln.verifyMessage',
    component: VerifyMessage,
  }],
}, {
  path: '/errors',
  name: 'Errors',
  component: Errors
}];