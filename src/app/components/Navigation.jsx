import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <Link to="/dashboard">
      <h1>Dashboard</h1>
    </Link>
  </div>
);

// pass state directly for now
export const ConnectedNavigation = connect(state => state)(Navigation);
