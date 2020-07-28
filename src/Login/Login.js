import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1 className="login-header">Prayer Circles</h1>
        <form className="login-form">
          <legend className='login-legend'>Welcome Back</legend>
          <label className='login-user-label'>
          <input className="login-user" placeholder="Email"></input>
          </label>
          <label className='login-password-label'>
          <input className="login-password" placeholder="Password"></input>
          </label>
          <Link className='login-button' to="/dashboard">
            <button>Login</button>
          </Link>
        </form>
      </div>
    );
  }
}
