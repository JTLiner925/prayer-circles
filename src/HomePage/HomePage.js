import React, { Component } from "react";
import { Link } from "react-router-dom";
import Carousel from "nuka-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
export default class HomePage extends Component {
  render() {
    return (
      <div className="Home">
        <div className="home-hero">
          <div className='home-hero-content'>
            <Link to='/'><h1>Welcome to Prayer Circles</h1></Link>
            {/* <p>Stay connected even when you're apart from oneAnother</p>
            <p>You can post a prayer request or even encourage oneAnother</p> */}
          </div>
        </div>
        <Carousel className="carousel">
          <div className="slide slide1">
            <FontAwesomeIcon id="home-user-icon" icon={faUser} />
            <h2>Join Prayer Circles and pray for your small group</h2>
          </div>
          <div className="slide slide2">
            <FontAwesomeIcon id="home-user-friends-icon" icon={faUserFriends} />
            <h2>Create Groups and Events in Prayer Circles</h2>
          </div>
          <div className="slide slide3">
            <FontAwesomeIcon id="home-users-icon" icon={faUsers} />
            <h2>Chat in Prayer Circles</h2>
          </div>
        </Carousel>
        <div className="home-buttons" id="wave">
          <Link to="/register">
            <button className="home-register">Register New User</button>
          </Link>
          <Link className="home-login" to="/login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
