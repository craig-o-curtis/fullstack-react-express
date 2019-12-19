import React from 'react';
import { store } from '../store';
import { Redirect } from 'react-router';

export const RouteGuard = (Component) => ({match}) => {
  console.info('Route guard', match);
  if (!store.getState().session.authenticated) {
    // reroute
    return <Redirect to="/" />;
  }
  return <Component match={match} />;
}
