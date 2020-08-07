import React, { Component } from 'react'
import { Link } from "react-router-dom";
import guy1 from '../Images/guy1.jpg';
import friends1 from '../Images/friends1.jpg';
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
            <div className='event-time-date'>
              <p className='event-date'>Aug<strong> 11 </strong>Tue</p>
              <p className='event-time'><strong>4:00 </strong>AM</p>
            </div>
            <div className='event-list-text'>
            <div className='event-header-top'>
              <div>
                <img id='event-user-icon' src={guy1} alt='guy' />
              </div>
              <div className='event-user'>
                <p>Host</p>
              <p><strong>JT Liner</strong></p>
              </div>
              <div>
                <img id='event-users-icon' src={friends1} alt='Friends' />
              </div>
            </div>
            </div>
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
