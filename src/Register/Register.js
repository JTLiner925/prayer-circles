import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

export default class Register extends Component {
  render() {
    return (
      <div className="Register">
        <h1 className="register-header">Prayer Circles</h1>
        <form className="register-form">
          <legend className="register-legend">Welcome Back</legend>
          <div className='register-fontawesome'>
            <FontAwesomeIcon
              id="user-icon"
              className="register-avatar"
              icon={faUser}
            />
          </div>
          <div className="register-name-div">
            <label className="register-first-label">
              <input
                className="register-first"
                placeholder="First Name"
              ></input>
            </label>
            <label className="register-last-label">
              <input className="register-last" placeholder="Last Name"></input>
            </label>
          </div>

          <label className="register-user-label">
            <input className="register-user" placeholder="Email"></input>
          </label>
          <label className="register-password-label">
            <input className="register-password" placeholder="Password"></input>
          </label>
          <Link className="register-button" to="/dashboard">
            <button>Create Account</button>
          </Link>
        </form>
      </div>
    );
  }
}
