import React from 'react';
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { menu, Page, SubMenu } from '../menu';
import './SideMenu.less';

class SideMenu extends React.Component<RouteComponentProps> {
  render() {
    const { location } = this.props;
    const allMenuKeys = menu.map(item => item.path);
    const selectedKeys = allMenuKeys.filter(key => location.pathname == key);

    return (
      <div className="SideMenu">
        <div className="SideMenu-title">
          WebLN
          <div className="SideMenu-title-version">
            v0.2.0
          </div>
        </div>
        <div className="SideMenu-menu">
          <Menu mode="inline" defaultOpenKeys={allMenuKeys} selectedKeys={selectedKeys}>
            {menu.map(item => this.renderMenuItem(item))}
          </Menu>
        </div>
        <div className="SideMenu-footer">
          WebLN is dope
        </div>
      </div>
    );
  }

  private renderMenuItem(item: Page | SubMenu) {
    if ((item as SubMenu).pages) {
      return (
        <Menu.SubMenu key={item.path} title={item.name}>
          {(item as SubMenu).pages.map(subItem => this.renderMenuItem(subItem))}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>
    );
  }
}

export default withRouter(SideMenu);
