import React, { Component } from 'react'
import PrayerPraiseComponent from './PrayerPraiseComponent/PrayerPraiseComponent'
import './AddPrayerPage.css'

export default class AddPrayerPage extends Component {
  render() {
    return (
      <div className="AddPrayerPage">
        <PrayerPraiseComponent />
        <div className="add-prayer-form">
          <div className="add-prayer-request">
            <div className='add-prayer-text'>Prayer Request Form</div>
          </div>
        </div>
      </div>
    );
  }
}
