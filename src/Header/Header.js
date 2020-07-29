import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCog } from "@fortawesome/free-solid-svg-icons";
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <div className="header-user-icon">
        <FontAwesomeIcon 
          id="head-user-icon"
          
          icon={faUser}
        />
        </div>
        <div className="header-settings-icon">
        <FontAwesomeIcon 
          id="head-settings-icon"
          
          icon={faUserCog}
        />
        </div>
      </div>
    )
  }
}
