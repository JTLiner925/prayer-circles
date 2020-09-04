import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  state = {};
  submitHandler = (e) => {
    e.preventDefault();
    this.props.onLogin(this.state);
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form className="Login" onSubmit={this.submitHandler}>
        <div className="login-header">
        <Link to='/'><h1 className="login-header-content">Prayer Circles</h1></Link>

        
        </div>
        <label className='login-user-label' htmlFor="email-input">
          {/* Demo Email: demoemail@gmail.com */}
         email
        <input
        className='login-user'
          id="email-input"
          type="email"
          name="user_email"
          placeholder="Email"
          onChange={this.changeHandler}
          // required
        />
         </label>
        <label className='login-password-label' htmlFor="password-input">
          {/* Demo Password: password123 */}
         password
        <input
          id="password-input"
          type="password"
          name="user_password"
          className="login-password" 
          placeholder="Password"
          onChange={this.changeHandler}
          // required      
        />
         </label>
        <p className="error-alert">{this.props.message}</p>
        <div className="buttons">
          <button
            type="submit"
            className="login-button"
            onClick={this.props.resetError}
          >
            Login
          </button>
        {/* <form className="login-form">
          <legend className='login-legend'>Welcome Back</legend>
          <label className='login-user-label'>
          <input className="login-user" placeholder="Email"></input>
          </label>
          <label className='login-password-label'>
          <input className="login-password" placeholder="Password"></input>
          </label> 
            </form> */}
            <Link to="/register" onClick={this.props.resetError}>
            <button className="login-register-button">Sign Up Now!</button>
          </Link>
          {/* <Link className='login-button' to="/dashboard">
            <button>Login</button>
          </Link> */}
          </div>
      </form>
    );
  }
}
