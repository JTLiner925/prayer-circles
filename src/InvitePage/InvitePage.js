import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import './InvitePage.css'

export default class InvitePage extends Component {
  render() {
    return (
      <div className="InvitePage">
        <div className='invite-icons'>
          <div className='invite-user'><FontAwesomeIcon 
          id="invite-user-icon"
          
          icon={faUser}
        /></div>
          <div className='invite-arrow'><FontAwesomeIcon 
          id="invite-users-icon"
          
          icon={faArrowCircleRight}
        /></div>
          <div className='invite-users'><FontAwesomeIcon 
          id="invite-users-icon"
          
          icon={faUsers}
        /></div>
        </div>
        <div className="invite-wall">
          <div className="invite-bubble">
            <div className='invite-bubble-text'>invite Bubble #1</div>
          </div>
        </div>
      </div>
    );
  }
}
