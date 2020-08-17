import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import config from '../config';
import Header from '../Header/Header';
import UserSideNav from '../UserSideNav/UserSideNav';
import ComponentGroupList from '../ComponentGroupList/ComponentGroupList';
import DashHomePage from '../DashHomePage/DashHomePage';
import EventListPage from '../EventListPage/EventListPage';
import ChatPage from '../ChatPage/ChatPage';
import InvitePage from '../InvitePage/InvitePage';
import AddGroupPage from '../AddGroupPage/AddGroupPage';
import AddEventPage from '../AddEventPage/AddEventPage';
import AddPrayerPage from '../AddPrayerPage/AddPrayerPage';
import SettingsPage from '../SettingsPage/SettingsPage';
import Footer from '../Footer/Footer';
import guy1 from '../Images/guy1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserCog,
  faSignOutAlt,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

import './Dashboard.css';

export default class Dashboard extends Component {
  // static defaultProps = {
  //   userId: '',
  //   groupId: '',
  //   eventId: '',
  // };
  state = {
    passage: '',
    users: [],
    groups: [],
    events: [],
    userId: '',
    groupId: '',
    eventId: '',
    error: null,
    needed: [],
    selectedGroup: '',
  };
  setPassage = (passage) => {
    this.setState({
      passage,
      error: null,
    });
  };
  HamNav = (e) => {
    console.log(e);
    //event handler for hamburger menu
    let elem = document.querySelector('.UserSideNav');
    if (elem.style.display === 'block') {
      elem.style.display = 'none';
    } else {
      elem.style.display = 'block';
    }
  };
  HamNavPage = () => {
    //event handler for menu to collapse by clicking in other places other than hamburger icon
    let elem = document.querySelector('.UserSideNav');
    if (elem.style.display === 'none') {
      elem.style.display = 'none';
    } else {
      elem.style.display = 'none';
    }
  };

  componentDidMount() {
    let i = window.location.search;
    let x = new URLSearchParams(i);
    let eventId;

    for (let [key, value] of x) {
      if (key === 'eventId') {
        eventId = value;
      }
      this.setState({
        [key]: value,
      });
    }

    //call api for data to display in dashboard
    this.setState({
      eventMessage: '',
    });
    Promise.all([
      fetch(`${config.HOST}/api/users`, {
        headers: {
          'Content-Type': 'application/json',
        },

        method: 'GET',
      }),
      fetch(`${config.HOST}/api/groups`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        method: 'GET',
      }),
      fetch(`${config.HOST}/api/events`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        method: 'GET',
      }),
      fetch(`${config.HOST}/api/needed`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        method: 'GET',
        // body: JSON.stringify({ event_id: eventId }),
      }),
    ])
      .then(([userRes, groupRes, eventRes, needRes]) => {
        return Promise.all([
          userRes.json(),
          groupRes.json(),
          eventRes.json(),
          needRes.json(),
        ]);
      })
      .then(([users, groups, events, needed]) => {
        let userId = users.find(
          (user) => user.first_name === window.localStorage.getItem('userName')
        );

        this.setState({
          users: users,
          groups: groups,
          events: events,
          userId: userId.id,
          needed: needed,
          eventId: eventId,
        });
        //maintain bible passage even if page refreshes
        this.handleBiblePassage(this.state.eventId);
      })
      .catch((error) => {
        this.setState({ error });
      });
  }
  handleBiblePassage = (eventId) => {
    //bible api call
    let selectedEvent = this.state.events.find((event) => {
      return event.id.toString() == eventId;
    });
    if (selectedEvent) {
      let url = new URL(`${config.API_ENDPOINT}text/`);
      url.searchParams.set('q', selectedEvent.bible_passage);
      url.searchParams.set('include-passage-reference', false);
      url.searchParams.set('include-verse-number', true);
      url.searchParams.set('include-first-verse-number', false);
      url.searchParams.set('include-footnotes', true);
      url.searchParams.set('include-footnote-body', false);
      url.searchParams.set('include-heading', false);
      url.searchParams.set('include-short-copyright', true);
      url.searchParams.set('indent-using', 'tab');
      const options = {
        method: 'GET',

        headers: {
          Authorization: `Token ${config.API_KEY}`,
        },
      };
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Something went wrong, please try again later.');
          }
          return res.json();
        })
        .then((passage) => {
          this.setPassage(passage);
          this.setState({
            eventId: eventId,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  };
  resetError = () => {
    //reset error message when I leave page
    this.setState({
      eventMessage: '',
    });
  };
  createGroup = (formData) => {
    //add group to api
    fetch(`${config.HOST}/api/groups/creategroup`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            return Promise.reject(new Error(data.error.message));
          });
        } else {
          return res.json();
        }
      })
      .then((resData) => {
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        this.setState({ createMessage: error.message });
      });
  };
  joinGroup = (formData) => {
    //join current group
    fetch(`${config.HOST}/api/groups/joingroup`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.message !== 'Already Joined Group') {
          this.props.history.push('/dashboard');
        } else {
          this.setState({
            message: resData.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  pushNeededItems = (id, neededItems) => {
    fetch(`${config.HOST}/api/needed/add-item`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify({ id, neededItems }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createEvent = (formData) => {
    //add event for group

    fetch(`${config.HOST}/api/events/createevent`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            return Promise.reject(new Error(data.error.message));
          });
        } else {
          return res.json();
        }
      })
      .then((resData) => {
        this.pushNeededItems(resData.eventId, formData.needed_items);
      })
      .catch((error) => {
        this.setState({ eventMessage: error.message });
      });
  };
  handleEvent = (eventId) => {
    this.setState({
      eventId: eventId,
    });
  };
  handleGroup = (groupId) => {
    this.setState({
      groupId: groupId,
    });
  };
  render() {
    let i = window.location.search;
    let x = new URLSearchParams(i);
    for (let [key, value] of x) {
      if (key === 'groupId') {
        if (value !== this.state.groupId) {
          this.handleGroup(value);
        }
      }
      if (key === 'eventId') {
        if (value !== this.state.eventId) {
          this.handleBiblePassage(value);
          this.handleEvent(value);
        }
      }
    }
    return (
      <main className='Dashboard'>
        <nav className='DashHeader'>
          <div className='header-user-icon'>
            <div onClick={this.HamNav}>
              {/* <img
                id='header-user-icon'
                src='https://user-photo.s3.us-east-2.amazonaws.com/14_IMG_2314.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJKON4ODYPQTLBE2A%2F20200815%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200815T144547Z&X-Amz-Expires=900&X-Amz-Signature=d62fb050087858393b1207ddc9503bc76f84cce7472956a77d2a837e098252a5&X-Amz-SignedHeaders=host'
                alt='user avatar'
              /> */}
              <img id='header-user-icon' src={guy1} alt='guy' />
              <FontAwesomeIcon className='notification-alert'icon={faCircle}/>
            </div>
          </div>
          <div className='header-nav-icons' onClick={this.HamNavPage}>
            <Link to='/settings' className='header-settings-icon'>
              <FontAwesomeIcon id='head-settings-icon' icon={faUserCog} />
            </Link>
            <Link to='/' className='header-sign-out-icon'>
              <FontAwesomeIcon id='head-sign-out-icon' icon={faSignOutAlt} />
            </Link>
          </div>
        </nav>

        {[
          '/dashboard',
          '/events',
          '/chat',
          '/invite',
          '/add-group',
          '/add-event',
          '/add-prayer',
          '/settings',
        ].map((path) => (
          <Route
            key={path}
            path={path}
            render={() => {
              return (
                <UserSideNav
                  users={this.state.users}
                  // onHamNav={this.HamNav}
                ></UserSideNav>
              );
            }}
          />
        ))}
        {[
          '/dashboard',
          '/events',
          '/chat',
          '/invite',
          '/add-group',
          '/add-event',
          '/add-prayer',
        ].map((path) => (
          <Route
            key={path}
            path={path}
            render={() => {
              return (
                <ComponentGroupList
                  events={this.state.events}
                  eventId={this.state.eventId}
                  groups={this.state.groups}
                  groupId={this.state.groupId}
                  users={this.state.users}
                  userId={this.state.userId}
                  onHandleHam={this.HamNavPage}
                ></ComponentGroupList>
              );
            }}
          />
        ))}
        <Route
          path='/dashboard'
          render={() => {
            return (
              <DashHomePage
                passage={this.state.passage}
                groups={this.state.groups}
                events={this.state.events}
                groupId={this.state.groupId}
                eventId={this.state.eventId}
                users={this.state.users}
                userId={this.state.userId}
                needed={this.state.needed}
                onHandleHam={this.HamNavPage}
                handleEvent={this.handleEvent}
                handleBiblePassage={this.handleBiblePassage}
              ></DashHomePage>
            );
          }}
        />
        <Route
          path='/events'
          render={() => {
            return (
              <EventListPage
                passage={this.state.passage}
                groups={this.state.groups}
                events={this.state.events}
                groupId={this.state.groupId}
                eventId={this.state.eventId}
                users={this.state.users}
                userId={this.state.userId}
                needed={this.state.needed}
                onHandleHam={this.HamNavPage}
                handleEvent={this.handleEvent}
                handleBiblePassage={this.handleBiblePassage}
              ></EventListPage>
            );
          }}
        />
        <Route
          path='/chat'
          render={() => {
            return (
              <ChatPage
                groups={this.state.groups}
                events={this.state.events}
                groupId={this.state.groupId}
                eventId={this.state.eventId}
                users={this.state.users}
                userId={this.state.userId}
                needed={this.state.needed}
                onHandleHam={this.HamNavPage}
              ></ChatPage>
            );
          }}
        />
        <Route
          path='/invite'
          render={() => {
            return (
              <InvitePage
                groups={this.state.groups}
                events={this.state.events}
                groupId={this.state.groupId}
                eventId={this.state.eventId}
                users={this.state.users}
                userId={this.state.userId}
                needed={this.state.needed}
                onHandleHam={this.HamNavPage}
              ></InvitePage>
            );
          }}
        />
        <Route
          path='/add-group'
          render={() => {
            return (
              <AddGroupPage
                createMessage={this.state.createMessage}
                message={this.state.message}
                groups={this.state.groups}
                onHandleHam={this.HamNavPage}
                onCreateGroup={this.createGroup}
                onJoinGroup={this.joinGroup}
              ></AddGroupPage>
            );
          }}
        />
        <Route
          path='/add-event'
          render={() => {
            return (
              <AddEventPage
                resetError={this.resetError}
                eventMessage={this.state.eventMessage}
                groups={this.state.groups}
                groupId={this.state.groupId}
                users={this.state.users}
                userId={this.state.userId}
                events={this.state.events}
                eventId={this.state.eventId}
                onHandleHam={this.HamNavPage}
                onCreateEvent={this.createEvent}
                handleEvent={this.handleEvent}
              ></AddEventPage>
            );
          }}
        />
        <Route
          path='/add-prayer'
          render={() => {
            return (
              <AddPrayerPage
                groups={this.state.groups}
                groupId={this.state.groupId}
                users={this.state.users}
                userId={this.state.userId}
                events={this.state.events}
                eventId={this.state.eventId}
                onHandleHam={this.HamNavPage}
              ></AddPrayerPage>
            );
          }}
        />
        <Route
          path='/settings'
          render={() => {
            return (
              <SettingsPage
                groups={this.state.groups}
                groupId={this.state.groupId}
                users={this.state.users}
                userId={this.state.userId}
                events={this.state.events}
                eventId={this.state.eventId}
                onHandleHam={this.HamNavPage}
              ></SettingsPage>
            );
          }}
        />
        {[
          '/dashboard',
          '/events',
          '/chat',
          '/invite',
          '/add-group',
          '/add-event',
          '/add-prayer',
          '/settings',
        ].map((path) => (
          <Route key={path} path={path} component={Footer} />
        ))}
      </main>
    );
  }
}
