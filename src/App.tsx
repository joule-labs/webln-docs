import '@babel/polyfill';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './Routes';
import SideMenu from './components/SideMenu';
import MobileHeader from './components/MobileHeader';
import './App.less';

const App: React.SFC<{}> = () => (
  <HashRouter>
    <div className="App">
      <MobileHeader />
      <div className="App-sidebar">
        <SideMenu />
      </div>
      <div className="App-content">
        <Routes />
      </div>
    </div>
  </HashRouter>
);

export default App;
