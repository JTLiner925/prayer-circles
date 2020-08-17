import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './SettingsPage.css'

export default class SettingsPage extends Component {
  state = {
    first_name: '',
    user_email: '',
    user_password: '',
    password_confirmation: '',
    showUpdateUserPhoto: false,
  };
  submitHandler = (e) => {
    //check passwords before submitting
    e.preventDefault();
    let pswd = this.state.user_password;
    let checkPswd = this.state.password_confirmation;
    if (pswd === checkPswd) {
      this.props.onsettings(this.state);
    } else {
      this.setState({
        error: 'Passwords do not match, try again.',
      });
    }
  };
  toggleUpdateUserPhoto = () => {
    this.setState({
      showUpdateUserPhoto: !this.state.showUpdateUserPhoto,
    });
  };

  handleUpdateUserPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        {this.state.showUpdateUserPhoto ? <div className='update-user-photo-background'>
          <div className='update-user-photo-model' >
            <p onClick={this.toggleUpdateUserPhoto}>X</p>
            <form>
              <div id='udpate-drop-area'>
              <input id='handle-update-user-photo'type='file' onChange={this.handleUpdateUserPhoto} ></input>
              </div>
              
            </form>
          </div>
        </div>: ''}

        <div className='Settings' onClick={this.props.onHandleHam}>
          <div className='settings-header'>
         
              <h1 className='settings-header-content'>Prayer Circles</h1>
       
          </div>
          <form className='settings-form' onSubmit={this.submitHandler}>
            <div
              className='settings-fontawesome'
              onClick={this.toggleUpdateUserPhoto}
            >
              <FontAwesomeIcon
                id='user-icon'
                className='settings-avatar'
                icon={faUser}
              />
            </div>
            <div className='settings-name-div'>
              <label
                htmlFor='first-name-input'
                className='settings-first-label'
              >
                <input
                  id='first-name-input'
                  name='first_name'
                  className='settings-first'
                  placeholder='First Name'
                  onChange={this.changeHandler}
                  required
                ></input>
              </label>
              <label htmlFor='last-name-input' className='settings-last-label'>
                <input
                  className='settings-last'
                  placeholder='Last Name'
                  id='last-name-input'
                  name='last_name'
                  onChange={this.changeHandler}
                ></input>
              </label>
            </div>

            {/* <label htmlFor='email-input' className='settings-user-label'>
              <input
                className='settings-user'
                placeholder='Email'
                id='email-input'
                type='email'
                name='user_email'
                onChange={this.changeHandler}
                required
              ></input>
            </label>
            <label htmlFor='password-input' className='settings-password-label'>
              <input
                className='settings-password'
                placeholder='Password'
                id='password-input'
                type='password'
                name='user_password'
                onChange={this.changeHandler}
                required
              ></input>
            </label>
            <label
              htmlFor='password-confirm'
              className='settings-password-label'
            >
              <input
                className='settings-password'
                placeholder='Confirm Password'
                id='password-confirm'
                type='password'
                name='password_confirmation'
                onChange={this.changeHandler}
                required
              ></input>
            </label> */}
            <button type='submit' className='settings-button'>
              Update Account
            </button>
          </form>
        </div>
      </>
    );
  }
}
