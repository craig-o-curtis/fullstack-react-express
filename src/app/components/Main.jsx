import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { store } from '../store';
import { history } from '../store/history';

import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { ConnectedSignup } from './Signup';
import { ConnectedLogin } from './Login';
import { RouteGuard } from './RouteGuard';

export const Main = () => (
  <Router history={history} >
    <Provider store={store}>
      <div className="container mt-3">
        <ConnectedNavigation />
        <Route
          exact
          path="/"
          component={ConnectedLogin}
        />
        <Route
          exact
          path="/signup"
          component={ConnectedSignup}
        />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetail)}
        />
      </div>
    </Provider>
  </Router>
);
