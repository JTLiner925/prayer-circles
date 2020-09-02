import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import guy1 from '../Images/guy1.jpg';
import friends1 from '../Images/friends1.jpg';
import './EventListPage.css';
import UserSideNav from '../UserSideNav/UserSideNav';

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

    const {
      eventId,
      events = [],
      groups = [],
      groupId,
      groupUsers,
      profilePic,
      users,
    } = this.props;
    let selectedGroup = groups.find((group) => {
      return group.id === parseInt(groupId);
    });
    const groupEvents = []
      .concat(groups)
      .sort((a, b) => (a.event_date > b.event_date ? 1 : -1));
    const sortEvents = []
      .concat(events)
      .sort((a, b) => (a.event_date > b.event_date ? 1 : -1));
    return (
      <div className='EventListPage' onClick={this.props.onHandleHam}>
        <div className='event-list-event-banner'>
          {/* <Link className='event-list-event' to='/events'>
            View Events
          </Link>
          <h2>Or</h2> */}
          <Link className='event-list-event' to='/add-event'>
            Add Event
          </Link>
        </div>
        <div className='event-list-form'>
          {sortEvents.map((event) => {
            if (event.group_event && event.group_event == groupId) {
              let hostUser = users.find((u) => {
                return event.event_leader === u.id;
              });
              console.log(hostUser, profilePic);
              return (
                <div key={event.id} className='event-list-request'>
                  <div className='event-time-date'>
                    <p className='event-date'>
                      {new Date(event.event_date).toDateString()}
                    </p>
                    <p className='event-time'>{event.event_time}</p>
                  </div>
                  <div className='event-list-text'>
                    <div className='event-header-top'>
                      <div className='event-user-side'>
                        <img
                          id='event-user-icon'
                          src={
                            hostUser &&
                            groupUsers &&
                            groupUsers[hostUser.first_name]
                              ? groupUsers[hostUser.first_name].profilePic
                              : ''
                          }
                          alt='guy'
                        />
                        <div className='event-user'>
                          <p>Host</p>
                          <p>
                            <strong>
                              {hostUser ? hostUser.first_name : ''}
                            </strong>
                          </p>
                        </div>
                        <div>
                          <p classname='select-group-name'>{selectedGroup.group_name}</p>
                          {/* <img
                            id='event-users-icon'
                            src={friends1}
                            alt='Friends'
                          /> */}
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
                      {/* <div className='event-question-section'>
                        <p>{event.question}</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
