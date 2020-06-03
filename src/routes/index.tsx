import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import CartContainer from '../containers/CartContainer';
import Header from '../components/Header';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeContainer} />
          <Route path="/cart" exact component={CartContainer} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
