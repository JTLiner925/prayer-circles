import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

export default class Register extends Component {
  state = {
    first_name: '',
    user_email: '',
    user_password: '',
    password_confirmation: '',
  };
  submitHandler = (e) => {
    //check passwords before submitting
    e.preventDefault();
    let pswd = this.state.user_password;
    let checkPswd = this.state.password_confirmation;
    if (pswd === checkPswd) {
      this.props.onRegister(this.state);
    } else {
      this.setState({
        error: 'Passwords do not match, try again.',
      });
    }
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className='Register'>
        <div className='register-header'>
        <Link to='/'><h1 className="register-header-content">Prayer Circles</h1></Link>        </div>
        <form className='register-form' onSubmit={this.submitHandler}>
          <div className='register-fontawesome'>
            <FontAwesomeIcon
              id='user-icon'
              className='register-avatar'
              icon={faUser}
            />
          </div>
          <div className='register-name-div'>
            <label htmlFor='first-name-input' className='register-first-label'>
              <input
                id='first-name-input'
                name='first_name'
                className='register-first'
                placeholder='First Name'
                onChange={this.changeHandler}
                required
              ></input>
            </label>
            <label htmlFor='last-name-input' className='register-last-label'>
              <input
                className='register-last'
                placeholder='Last Name'
                id='last-name-input'
                name='last_name'
                onChange={this.changeHandler}
              ></input>
            </label>
          </div>

          <label htmlFor='email-input' className='register-user-label'>
            <input
              className='register-user'
              placeholder='Email'
              id='email-input'
              type='email'
              name='user_email'
              onChange={this.changeHandler}
              required
            ></input>
          </label>
          <label htmlFor='password-input' className='register-password-label'>
            <input
              className='register-password'
              placeholder='Password'
              id='password-input'
              type='password'
              name='user_password'
              onChange={this.changeHandler}
              required
            ></input>
          </label>
          <label htmlFor='password-confirm' className='register-password-label'>
            <input
              className='register-password'
              placeholder='Confirm Password'
              id='password-confirm'
              type='password'
              name='password_confirmation'
              onChange={this.changeHandler}
              required
            ></input>
          </label>
          <button type='submit' className='register-button'>
            Create Account
          </button>
        </form>
      </div>
    );
  }
}
