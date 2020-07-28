import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './HomePage.css'

export default class HomePage extends Component {
  render() {
    return (
      <div className='Home'>
        <div className="home-hero">Welcome to Prayer Circles</div>
        <div className="home-carousel">Carousel</div>
        <div className='home-buttons'>
        <Link to="/register">
          <button className="home-register">Register New User</button>
        </Link>
        <Link className="home-login" to="/login">
          Login
        </Link>
        </div>
      </div>
    )
  }
}
