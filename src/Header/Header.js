import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="header-user-icon">
          <FontAwesomeIcon id="head-user-icon" icon={faUser} />
        </div>
        <div className="header-nav-icons">
          <Link to="/settings" className="header-settings-icon">
            <FontAwesomeIcon id="head-settings-icon" icon={faUserCog} />
          </Link>
          <Link to="/" className="header-sign-out-icon">
            <FontAwesomeIcon id="head-sign-out-icon" icon={faSignOutAlt} />
          </Link>
        </div>
      </div>
    );
  }
}
