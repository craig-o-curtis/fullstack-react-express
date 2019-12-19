import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as mutations from '../store/mutations';

// authenticateUser defined in mapDispatchToProps
const Login = ({authenticateUser, authenticated}) => {
  return (
    <div className="card p-3 col-xs-12 col-md-6 offset-md-3">
      <h4>Please Login</h4>
      <form onSubmit={authenticateUser}>
        <div className="form-group">
        <label htmlFor="username">
          Username:
        </label>
        <input id="username" type="text" placeholder="username" name="username" defaultValue="Dev" className="form-control mt-2"/>
        
        <br />
        <label htmlFor="password">
          Password:
          </label>
          <input type="password" placeholder="password" name="password" defaultValue="" className="form-control mt-2" />
          </div>
        
        {authenticated === mutations.NOT_AUTHENTICATED 
          ? <div className="alert alert-danger" role="alert">Login incorrect</div>
          : null}
        <button type="submit" disabled={authenticated === `PROCESSING`} className="form-control mt-2 btn btn-primary">
          Login
        </button>
      </form>
      <h6>
        <Link to="signup">
          Don't have an account? Sign up.
        </Link>
      </h6>
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
