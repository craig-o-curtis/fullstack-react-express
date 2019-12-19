import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

const SignupComponent = ({ requestCreateUserAccount, authenticated }) => {
  return (
    <div className="card p-3 col-xs-12 col-md-6 offset-md-3">
      <h4>Complete the following form to create a new account.</h4>

      <form onSubmit={requestCreateUserAccount}>
        <div className="form-group">
          <label htmlFor="username" l>
            User Name
          </label>
          <input
            id="username"
            type="text"
            placeholder="username"
            name="username"
            defaultValue="Morty"
            className="form-control"
          />

<br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="password"
            name="password"
            defaultValue="COURAGE"
            className="form-control mt-2"
          />
        </div>

        {authenticated == mutations.USERNAME_RESERVED ? (
          <p>A user by that name already exists.</p>
        ) : null}
        <button type="submit" className="form-control mt-2 btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  authenticated: state.session.authenticated
});

const mapDispatchToProps = dispatch => ({
  requestCreateUserAccount(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    console.log("Creating!", username, password);
    dispatch(mutations.requestCreateUserAccount(username, password));
  }
});

export const ConnectedSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupComponent);
