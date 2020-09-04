import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import './Register.css';

export default class Register extends Component {
  state = {
    first_name: '',
    user_email: '',
    user_password: '',
    password_confirmation: '',
    showUserPhoto: false,
    profilePic: {},
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
  toggleUserPhoto = () => {
    this.setState({
      showUserPhoto: !this.state.showUserPhoto,
    });
  };
  dropHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          let file = e.dataTransfer.items[i].getAsFile();
          this.setState({
            profilePic: file,
            photoMessage: '✅ Photo uploaded successfully!',
          });
        } else {
          this.setState({
            photoMessage: '❌ Try again or pick different photo.',
          });
        }
      }
    }
  };

  handleUserPhoto = (e) => {
    this.setState({
      profilePic: e,
      photoMessage: '✅ Photo uploaded successfully!',
    });
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <>
        {this.state.showUserPhoto ? (
          <div className='user-photo-background'>
            <div className='user-photo-model'>
              <p onClick={this.toggleUserPhoto}> <FontAwesomeIcon className='photo-model-x' icon={faTimesCircle} /></p>
              <form>
                <div
                  name='drop-area'
                  id='drop-area'
                  onDragEnter={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    this.dropHandler(e);
                  }}
                >
                  <input
                    id='handle-user-photo'
                    type='file'
                    onChange={(e) => {
                      e.preventDefault();
                      this.handleUserPhoto(
                        document.getElementById('handle-user-photo')['files'][0]
                      );
                    }}
                    style={{ display: 'none' }}
                  ></input>
                  <p className='browse-div'>
                    <span
                      className='register-browse-button'
                      onClick={() => {
                        document.getElementById('handle-user-photo').click();
                      }}
                    >
                      Browse
                    </span>
                    <br></br>
                  </p>
                  <p className='drag-p'>or Drag and Drop<br></br>JPG or PNG files only</p>
                  <p className='photo-message'>{this.state.photoMessage}</p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className='Register'>
          <div className='register-header'>
            <Link to='/'>
              <h1 className='register-header-content'>Prayer Circles</h1>
            </Link>{' '}
          </div>
          <form className='register-form' onSubmit={this.submitHandler}>
            <div
              className='register-fontawesome'
              onClick={this.toggleUserPhoto}
            >
              <FontAwesomeIcon
                id='user-icon'
                className='register-avatar'
                icon={faUserPlus}
              />
            </div>
            <div className='register-name-div'>
              <label
                htmlFor='first-name-input'
                className='register-first-label'
              >first name
                <input
                  id='first-name-input'
                  name='first_name'
                  className='register-first'
                  placeholder='First Name'
                  onChange={this.changeHandler}
                  // required
                ></input>
              </label>
              <label htmlFor='last-name-input' className='register-last-label'>
                last name
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
              email
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
              password
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
            <label
              htmlFor='password-confirm'
              className='register-password-label'
            >confirm password
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
            <p className="error-alert">{this.props.message}</p>
            <button type='submit' className='register-button'>
              Create Account
            </button>
          </form>
        </div>
      </>
    );
  }
}
