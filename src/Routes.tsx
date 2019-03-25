import React from 'react';
import { Switch, Route } from 'react-router';
import { menu, Page, SubMenu } from './menu';

export default class Routes extends React.Component {
  render() {
    const pages = menu.reduce((prev, page) => {
      if ((page as SubMenu).pages) {
        return [...prev, ...(page as SubMenu).pages];
      }
      return [...prev, page as Page];
    }, [] as Page[]);

    return (
      <Switch>
        {pages.map(page => (
          <Route
            key={page.path}
            path={page.path}
            component={page.component}
          />
        ))}
      </Switch>
    )
  }
}