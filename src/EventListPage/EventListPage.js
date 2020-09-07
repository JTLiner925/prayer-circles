import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './EventListPage.css';
// import UserSideNav from '../UserSideNav/UserSideNav';

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
      //group that is selected from ComponentGroupList
      return group.id === parseInt(groupId);
    });
    const groupEvents = []
      .concat(groups)
      .sort((a, b) => (a.event_date > b.event_date ? 1 : -1));
    const sortEvents = []
    //sort events by date
      .concat(events)
      .sort((a, b) => (a.event_date > b.event_date ? 1 : -1));
    return (
      <div className='EventListPage' onClick={this.props.onHandleHam}>
        <div className='event-list-event-banner'>
          <Link className='event-list-event' to='/add-event'>
            Add Event
          </Link>
        </div>
        <div className='event-list-form'>
          {sortEvents.map((event) => {
            if (event.group_event && event.group_event == groupId) {
              //only get events that match the selected groupId
              let hostUser = users.find((u) => {
                //hostUser is the creator of the event
                return event.event_leader === u.id;
              });
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
                              : null
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
