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
      if (key === "groupId") {
        y = `?groupId=${value}`;
        id = value;
      }
    }

    const { eventId, events = [], groups = [], groupId, needed } = this.props;
    const groupEvents = []
    .concat(groups)
    .sort((a, b) => (a.id > b.id ? 1 : -1));
  const sortEvents = [].concat(events).sort((a, b) => (a.id > b.id ? 1 : -1));
    console.log(sortEvents);
    return (
      <div className='EventListPage'>
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
              // let idee = event.id;
              console.log(event)
                if (event.group_event && event.group_event == groupId)
                  return (
                    <div key={event.id}className='event-list-request'>
                      <div className='event-time-date'>
                        <p className='event-date'>
                         {event.event_date}
                        </p>
                        <p className='event-time'>
                          {event.event_time}
                        </p>
                      </div>
                      <div className='event-list-text'>
                        <div className='event-header-top'>
                          <div>
                            <img id='event-user-icon' src={guy1} alt='guy' />
                          </div>
                          <div className='event-user'>
                            <p>Host</p>
                            <p>
                              <strong>JT Liner</strong>
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
                      </div>
                    </div>
                  );
              })
            }

          {/* <div className='event-list-request'>
            <div className='event-list-text'>Event #2</div>
          </div>
          <div className='event-list-request'>
            <div className='event-list-text'>Event #3</div>
          </div>
          <div className='event-list-request'>
            <div className='event-list-text'>Event #4</div>
          </div> */}
        </div>
      </div>
    );
  }
}
