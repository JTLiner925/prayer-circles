import React, { Component } from 'react'
import './AddPrayerPage.css'

export default class AddPrayerPage extends Component {
  render() {
    return (
      <div className="AddPrayerPage">
        <h2>Select Group</h2>
        <div className="add-prayer-group-slide">
          <div className="add-prayer-group">
            <div>Group #1</div>
          </div>
          <div className="add-prayer-group">
            <div>Group #2</div>
          </div>
          <div className="add-prayer-group">
            <div>Group #3</div>
          </div>
          <div className="add-prayer-group">
            <div>Group #4</div>
          </div>
        </div>
        <div className="add-prayer-event-banner">
          <div className='add-prayer-event'>Prayer</div>
          <h2>Or</h2>
          <div className='add-prayer-event'>Praise</div>
        </div>
        <div className="add-prayer-form">
          <div className="add-prayer-request">
            <div className='add-prayer-text'>Prayer Request Form</div>
          </div>
        </div>
      </div>
    );
  }
}
