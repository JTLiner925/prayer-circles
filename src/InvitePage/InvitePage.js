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
          <div className="invite-header">
            <div className="invite-header-top">
              <FontAwesomeIcon id="invite-header-user-icon" icon={faUser} />
              <FontAwesomeIcon id="invite-header-users-icon" icon={faUsers} />
            </div>
          </div>
       
            <div className='invite-bubble-text'>Invite your friends!</div>
            <form className='invite-form'>
              <div>
              <input className='invite-input' type='email' placeholder='johnDoe@gmail.com'></input>
              <button className='invite-add-more'>+ add</button>
              </div>
              <button className='invite-form-submit' type='submit' >Invite</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
