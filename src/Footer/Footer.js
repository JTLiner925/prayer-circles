import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClone,
  faPlusSquare,
  faUsers,
  faComments,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <Link to="/dashboard" type='text' className="footer-home-icon">
          <FontAwesomeIcon id="home-icon" icon={faHome} />
          <span>home</span>
        </Link>

        <Link to="/add-group" className="footer-group-icon">
          <FontAwesomeIcon id="group-icon" icon={faClone} />
          <span>add group</span>
        </Link>

        <Link to="/add-prayer" className="footer-plus-icon">
          <FontAwesomeIcon id="plus-icon" icon={faPlusSquare} />
          <span>add prayer</span>
        </Link>

        <Link to='/chat' className="footer-chat-icon">
          <FontAwesomeIcon id="chat-icon" icon={faComments} />
          <span>chat</span>
        </Link>
        
      </div>
    );
  }
}
