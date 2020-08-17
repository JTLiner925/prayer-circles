import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import './UserSideNav.css';

export default class UserSideNav extends Component {
  render() {
    return (
      <div className='UserSideNav'>
        <div className='user-message-div'>
          <p className='user-message'>user message user message user message user message user message</p>
          <FontAwesomeIcon className='user-message-x' icon={faTimesCircle} />
          <FontAwesomeIcon
            className='user-message-check'
            icon={faCheckCircle}
          />
        </div>
      </div>
    );
  }
}
