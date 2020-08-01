import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './EventListPage.css'

export default class EventListPage extends Component {
  render() {
    return (
      <div className="EventListPage">
        <div className="event-list-event-banner">
          <Link className='event-list-event' to='/events'>View Events</Link>
          <h2>Or</h2>
          <Link className='event-list-event' to='/add-event'>Add Event</Link>
        </div>
        <div className="event-list-form">
          <div className="event-list-request">
            <div className='event-list-text'>Event #1</div>
          </div>
          <div className="event-list-request">
            <div className='event-list-text'>Event #2</div>
          </div>
          <div className="event-list-request">
            <div className='event-list-text'>Event #3</div>
          </div>
          <div className="event-list-request">
            <div className='event-list-text'>Event #4</div>
          </div>
        </div>
      </div>
    );
  }
}
