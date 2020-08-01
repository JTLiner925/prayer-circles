import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './AddEventPage.css'

export default class AddEventPage extends Component {
  render() {
    return (
      <div className="AddEventPage">
        <h2>Select Group</h2>
        <div className="add-event-event-banner">
          <Link className='add-event-event' to='/events'>View Events</Link>
          <h2>Or</h2>
          <Link className='add-event-event' to='/add-event'>Add Event</Link>
        </div>
        <div className="add-event-form">
          <div className="add-event-request">
            <div className='add-event-text'>Add/Edit Event</div>
          </div>
        </div>
      </div>
    );
  }
}
