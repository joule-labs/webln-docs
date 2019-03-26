import React from 'react';
import { Icon, Button } from 'antd';
import { RouteComponentProps, withRouter, matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { pages } from '../menu';
import './Navigation.less';

class Navigation extends React.Component<RouteComponentProps> {
  render() {
    const { pathname } = this.props.location;
    const currentPage = pages.find(p => !!matchPath(pathname, p.path)) || pages[0];
    const nextPage = pages[pages.indexOf(currentPage) + 1];
    const prevPage = pages[pages.indexOf(currentPage) - 1];

    return (
      <div className="Navigation">
        <div className="Navigation-link is-prev">
          {prevPage && (
            <Link to={prevPage.path}>
              <Button ghost type="primary" size="large">
                <Icon type="arrow-left" />
                Previous
              </Button>
            </Link>
          )}
        </div>
        <div className="Navigation-link is-next">
          {nextPage && (
            <Link to={nextPage.path}>
              <Button ghost type="primary" size="large">
                Next
                <Icon type="arrow-right" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Navigation);