import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
      </Switch>
    </BrowserRouter>
  );
}
