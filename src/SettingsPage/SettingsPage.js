import React, { Component } from 'react'
import './SettingsPage.css'

export default class SettingsPage extends Component {
  render() {
    return (
      <div className="SettingsPage">
         <h2>Profile Page</h2>
        <div className="settings-wall">
          <div className="settings-bubble">
            <div className='settings-bubble-text'>Edit Profile</div>
          </div>
        </div>
      </div>
    );
  }
}
