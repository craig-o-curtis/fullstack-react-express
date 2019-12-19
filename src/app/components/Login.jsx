import React from 'react';
import { connect } from 'react-redux';

import * as mutations from '../store/mutations';

// authenticateUser defined in mapDispatchToProps
const Login = ({authenticateUser, authenticated}) => {
  return (
    <div>
      <h2>Please Login</h2>
      <form onSubmit={authenticateUser}>
        <label>
          Username:
          <input type="text" placeholder="username" name="username" defaultValue="Dev" />
        </label>
        <br />

        <label>
          Password:
          <input type="password" placeholder="password" name="password" defaultValue="" />
        </label>
        <br />
        {authenticated === mutations.NOT_AUTHENTICATED 
          ? <p>Login incorrect</p>
          : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
  // when submit form
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target['username'].value;
    let password = e.target['password'].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
