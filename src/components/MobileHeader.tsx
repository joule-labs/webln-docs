import React from 'react';
import { Icon, Drawer } from 'antd';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import { VERSION } from '../constants';
import SideMenu from './SideMenu';
import './MobileHeader.less';

interface State {
  isDrawerOpen: boolean;
}

class MobileHeader extends React.Component<RouteComponentProps, State> {
  state: State = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.closeDrawer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.closeDrawer);
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.closeDrawer();
    }
  }

  render() {
    const { isDrawerOpen } = this.state;
    console.log(this.props.location);

    return (
      <div className="MobileHeader">
        <Icon className="MobileHeader-open" type="menu-unfold" onClick={this.openDrawer} />
        <div className="MobileHeader-title">
          WebLN
          <div className="MobileHeader-title-version">
            v{VERSION}
          </div>
        </div>
        <Drawer
          className="MobileHeader-drawer"
          visible={isDrawerOpen}
          onClose={this.closeDrawer}
          placement="left"
          width="90%"
        >
          <SideMenu />
        </Drawer>
      </div>
    );
  }

  private openDrawer = () => this.setState({ isDrawerOpen: true });
  private closeDrawer = () => this.setState({ isDrawerOpen: false });
}

export default withRouter(MobileHeader);
