import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import guy1 from '../Images/guy1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import config from '../config'
import './Header.css';

export default class Header extends Component {
  static getDerivedStateFromProps(props){
    let userName = window.localStorage.getItem('userName')
    let user = props.users.find((u) => {
      return u.first_name === userName
    })
    let url
    fetch(`${config.HOST}/api/getUrl/get-profile-pic`,{
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user)
    }
    )
    .then((res) => {
      return res.json()
    })
    .then((resData) => {
      url = resData
    })
    .catch((error) => {
    
    });
    return url
  }
  
  render() {
    return (
      <nav className='Header'>
        <div className='header-user-icon'>
          <div onClick={this.props.onHamNav}>
            <img id='header-user-icon' src="https://user-photo.s3.us-east-2.amazonaws.com/14_IMG_2314.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJKON4ODYPQTLBE2A%2F20200815%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200815T144547Z&X-Amz-Expires=900&X-Amz-Signature=d62fb050087858393b1207ddc9503bc76f84cce7472956a77d2a837e098252a5&X-Amz-SignedHeaders=host"/>
            {/* <img id='header-user-icon' src={guy1} alt='guy' /> */}
          </div>
        </div>
        <div className='header-nav-icons'>
          <Link to='/settings' className='header-settings-icon'>
            <FontAwesomeIcon id='head-settings-icon' icon={faUserCog} />
          </Link>
          <Link to='/' className='header-sign-out-icon'>
            <FontAwesomeIcon id='head-sign-out-icon' icon={faSignOutAlt} />
          </Link>
        </div>
      </nav>
    );
  }
}
