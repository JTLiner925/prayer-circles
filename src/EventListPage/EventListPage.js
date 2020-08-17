import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import guy1 from '../Images/guy1.jpg';
import friends1 from '../Images/friends1.jpg';
import './EventListPage.css';

export default class EventListPage extends Component {
  render() {
    let i = window.location.search;
    let x = new URLSearchParams(i);
    let id;
    let y;
    for (let [key, value] of x) {
      if (key === 'groupId') {
        y = `?groupId=${value}`;
        id = value;
      }
    }

    const { eventId, events = [], groups = [], groupId, needed } = this.props;
    const groupEvents = []
      .concat(groups)
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const sortEvents = [].concat(events).sort((a, b) => (a.id > b.id ? 1 : -1));
    return (
      <div className='EventListPage' onClick={this.props.onHandleHam}>
        <div className='event-list-event-banner'>
          <Link className='event-list-event' to='/events'>
            View Events
          </Link>
          <h2>Or</h2>
          <Link className='event-list-event' to='/add-event'>
            Add Event
          </Link>
        </div>
        <div className='event-list-form'>
          {sortEvents.map((event) => {
            if (event.group_event && event.group_event == groupId)
              return (
                <div key={event.id} className='event-list-request'>
                  <div className='event-time-date'>
                    <p className='event-date'>{event.event_date}</p>
                    <p className='event-time'>{event.event_time}</p>
                  </div>
                  <div className='event-list-text'>
                    <div className='event-header-top'>
                      <div className='event-user-side'>
                        <img id='event-user-icon' src={guy1} alt='guy' />
                        <div className='event-user'>
                          <p>Host</p>
                          <p>
                            <strong>
                              {window.localStorage.getItem('userName')}
                            </strong>
                          </p>
                        </div>
                        <div>
                          <img
                            id='event-users-icon'
                            src={friends1}
                            alt='Friends'
                          />
                        </div>
                      </div>

                      <div className='event-main-section'>
                        <p className='event-announcements'>
                          {event.announcements}
                        </p>
                        <div>
                          <p>{event.lesson_title}</p>
                          <p>{event.bible_passage}</p>
                        </div>
                      </div>
                      <div className='event-question-section'>
                        <p>{event.question}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}
