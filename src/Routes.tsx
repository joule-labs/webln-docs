import React from 'react';
import { Switch, Route } from 'react-router';
import { pages } from './menu';
import Navigation from './components/Navigation';
import Placeholder from './components/Placeholder';

export default class Routes extends React.Component {
  render() {
    return (
      <>
        <Switch>
          {pages.map(page => (
            <Route
              key={page.path}
              path={page.path}
              component={page.component}
              exact
            />
          ))}
          <Route path="*" render={() => (
            <Placeholder>Uh oh, maybe try another page</Placeholder>
          )} />
        </Switch>
        <Navigation />
      </>
    )
  }
}