import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import Header from '../components/Header';

export default function Router() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomeContainer} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
