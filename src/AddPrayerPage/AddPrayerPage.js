import React, { Component } from 'react'
import PrayerPraiseComponent from './PrayerPraiseComponent/PrayerPraiseComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './AddPrayerPage.css'

export default class AddPrayerPage extends Component {
  render() {
    return (
      <div className="AddPrayerPage">
        <PrayerPraiseComponent />
        <div className="add-prayer-form">
        <form className='add-prayer-form' onSubmit={this.submitHandler}>
            <div
              className='add-prayer-fontawesome'
              onClick={this.toggleUpdateUserPhoto}
            >
              <FontAwesomeIcon
                id='user-icon'
                className='add-prayer-avatar'
                icon={faUser}
              />
            </div>
            <div className='add-prayer-prayer-div'>
              <label
                htmlFor='prayer-input'
                className='add-prayer-request-label'
              >
                <textarea
                  id='prayer-input'
                  name='prayer_input'
                  className='add-prayer-request-input'
                  placeholder='Prayer Request'
                  onChange={this.changeHandler}
                  required
                ></textarea>
              </label>
            </div>
            <button type='submit' className='add-prayer-button'>
              Submit
            </button>
          </form>
      </div>
      </div>
    );
  }
}
