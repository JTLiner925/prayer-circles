import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faClone, faPlusSquare, faUsers, faComments } from "@fortawesome/free-solid-svg-icons";
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className='Footer'>
        <div className="footer-home-icon">
        <FontAwesomeIcon 
          id="home-icon"
          
          icon={faHome}
        />
        </div>
        <div className="footer-group-icon">
        <FontAwesomeIcon 
          id="group-icon"
          
          icon={faClone}
        />
        </div>
        <div className="footer-plus-icon">
        <FontAwesomeIcon 
          id="plus-icon"
          
          icon={faPlusSquare}
        />
        </div>
        <div className="footer-invite-icon">
        <FontAwesomeIcon 
          id="invite-icon"
          
          icon={faUsers}
        />
        </div>
        <div className="footer-chat-icon">
        <FontAwesomeIcon 
          id="chat-icon"
          
          icon={faComments}
        />
        </div>
      </div>
    )
  }
}
