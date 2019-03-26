import React from 'react';
import { Menu } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { pages, sections } from '../menu';
import './SideMenu.less';

const allPageKeys = pages.map(p => p.path);
const sectionsWithPages = sections.map(s => ({
  ...s,
  pages: pages.filter(p => p.section === s.id),
}));

class SideMenu extends React.Component<RouteComponentProps> {
  render() {
    const { location } = this.props;
    const selectedKeys = allPageKeys.filter(key => location.pathname == key);

    return (
      <div className="SideMenu">
        <div className="SideMenu-title">
          WebLN
          <div className="SideMenu-title-version">
            v0.2.0
          </div>
        </div>
        <div className="SideMenu-menu">
          <Menu mode="inline" selectedKeys={selectedKeys}>
            {sectionsWithPages.map(s => (
              <Menu.ItemGroup title={s.name}>
                {s.pages.map(p => (
                  <Menu.Item key={p.path}>
                    <Link to={p.path}>{p.name}</Link>
                  </Menu.Item>
                ))}
                {!s.pages.length && (
                  <div className="SideMenu-menu-empty">Coming soon!</div>
                )}
              </Menu.ItemGroup>
            ))}
          </Menu>
        </div>
        <div className="SideMenu-footer">
          <a href="https://github.com/wbobeirne/webln" target="_blank" rel="noopener nofollow">
            GitHub
          </a>
          <a href="https://twitter.com/lightningjoule" target="_blank" rel="noopener nofollow">
            Twitter
          </a>
          <a href="https://lightningjoule.com" target="_blank" rel="noopener nofollow">
            Powered by Joule
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(SideMenu);
