import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import config from '../config';
import ComponentGroupList from '../ComponentGroupList/ComponentGroupList';
import DashHomePage from '../DashHomePage/DashHomePage';
import EventListPage from '../EventListPage/EventListPage';
import ChatPage from '../ChatPage/ChatPage';
import AddGroupPage from '../AddGroupPage/AddGroupPage';
import AddEventPage from '../AddEventPage/AddEventPage';
import AddPrayerPage from '../AddPrayerPage/AddPrayerPage';
import Footer from '../Footer/Footer';
import userphoto from '../Images/user-photo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './Dashboard.css';

export default class Dashboard extends Component {
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

  componentDidMount(e) {
    //batch api calls to set state for user
    this.refreshData(e);
  }
  refreshData() {
    let i = window.location.search;
    let x = new URLSearchParams(i);
    let eventId;
    let gId;
    for (let [key, value] of x) {
      if (key === 'eventId') {
        eventId = value;
      }
      if (key === 'groupId') {
        gId = value;
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
      }),
      fetch(`${config.HOST}/api/messages`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        method: 'GET',
      }),
      fetch(`${config.HOST}/api/prayers`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        method: 'GET',
      }),
    ])
      .then(
        ([userRes, groupRes, eventRes, needRes, messagesRes, prayersRes]) => {
          return Promise.all([
            userRes.json(),
            groupRes.json(),
            eventRes.json(),
            needRes.json(),
            messagesRes.json(),
            prayersRes.json(),
          ]);
        }
      )
      .then(([users, groups, events, needed, messages, prayers]) => {
        let userId = users.find(
          //set userId in state
          (user) => user.first_name === window.localStorage.getItem('userName')
        );

        let testGroup = {};
        let myGroupPhotos = {};
        groups.forEach((group) => {
          //get photo for each group
          if(group.group_pic){

          
          fetch(`${config.HOST}/api/getUrl/get-photo-url`, {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
            method: 'POST',
            body: JSON.stringify({
              fileName: `${group.id}_${group.group_pic}`,
              location: 'groups-photo',
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((resData) => {
              let trimmedUrl = resData.url.split('?')[0];
              let url = trimmedUrl;
              myGroupPhotos[group.group_name] = { profilePic: url };
            })
            .catch((error) => {});}
        });
      
        if (gId) {
          let matchedGroup = groups.find((g) => {
            return g.id === parseInt(gId);
          });
          if (matchedGroup) {
            let userIds = matchedGroup.user_ids;
            userIds.forEach((id) => {
              users.forEach((usr) => {
                if (parseInt(id) === usr.id) {
                  fetch(`${config.HOST}/api/getUrl/get-photo-url`, {
                    headers: {
                      'Content-Type': 'application/json',
                      // Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    },
                    method: 'POST',
                    body: JSON.stringify({
                      fileName: `${usr.id}_${usr.profile_pic}`,
                      location: 'user-photo',
                    }),
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((resData) => {
                      let trimmedUrl = resData.url.split('?')[0];
                      let url = trimmedUrl;
                      testGroup[usr.first_name] = { profilePic: url };
                    })
                    .catch((error) => {});
                }
              });
            });
          }
        }
       let storedPhoto = localStorage.getItem('completedS3Upload');
       if(storedPhoto){
          this.handleProfilePic(users);
      
       }
          
        

        this.setState({
          users: users,
          groups: groups,
          events: events,
          userId: userId.id,
          needed: needed,
          eventId: eventId,
          messages: messages,
          prayers: prayers,
          testGroup: testGroup,
          myGroupPhotos: myGroupPhotos,
        });
        //maintain bible passage even if page refreshes
        this.handleBiblePassage(this.state.eventId);
      })
      .catch((error) => {
        this.setState({ error });
      });
    setInterval(() => {
      //api call to messages uses setInterval to get new messages
      fetch(`${config.HOST}/api/messages`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
        method: 'GET',
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          this.setState({
            messages: resData,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000);
  }
  componentDidUpdate(prevProps) {
    //update page with new data in state
    let storedPhoto = localStorage.getItem('completedS3Upload');
       if(storedPhoto){
          this.handleProfilePic(this.state.users);
      
       }
    if (this.props.location.search === prevProps.location.search) {
      return;
    }
    this.refreshData();
  }
  handleGroupPic = (groups) => {
    //api call to get group photo
    let group = groups.find((g) => {
      if (g.user_ids.includes(this.props.userId)) {
        return g.group_name;
      }
    });
    let fileName = `${group.id}_${group.group_pic}`;
    let url;
    fetch(`${config.HOST}/api/getUrl/get-photo-url`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify({ fileName, location: 'groups-photo' }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        let groupPic = `${resData.group.id}_${group.group_pic}`;

        let trimmedGroupUrl = resData.url.split('?')[0];
        url = trimmedGroupUrl;
        this.setState({
          group_Pic: trimmedGroupUrl,
        });
      })
      .catch((error) => {});
  };
  handleProfilePic = (users, savePhoto) => {
    //get user photo
    let userName;
    let user;
    if(users){
      userName = window.localStorage.getItem('userName');
    user = users.find((u) => {
      return u.first_name === userName;
    });
    }
    

  
    if(user && user.profile_pic){
      let fileName = `${user.id}_${user.profile_pic}`;
    let url;
    fetch(`${config.HOST}/api/getUrl/get-photo-url`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify({ fileName, location: 'user-photo' }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        let trimmedUrl = resData.url.split('?')[0];
        url = trimmedUrl;
        if(savePhoto){
          localStorage.setItem('profilePic', url)
        }
        this.setState({
          profilePic: trimmedUrl,
        });
      })
      .catch((error) => {});}
  };
  handleGroupUsersPic = (users) => {
    //get user pics for specific group
    let userName = window.localStorage.getItem('userName');
    let user = users.find((u) => {
      return u.first_name === userName;
    });
    let fileName = `${user.id}_${user.profile_pic}`;
    let url;
    fetch(`${config.HOST}/api/getUrl/get-photo-url`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify({ fileName, location: 'user-photo' }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        let trimmedUrl = resData.url.split('?')[0];
        url = trimmedUrl;
        this.setState({
          profilePic: trimmedUrl,
        });
      })
      .catch((error) => {});
  };
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
  uploadDashFile = (file, newFileName) => {
    let url;
    fetch(`${config.HOST}/api/getUrl`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: newFileName,
        type: file.type,
        location: 'groups-photo',
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        url = resData.url;
        let reader = new FileReader();
        reader.addEventListener('loadend', (event) => {
          fetch(url, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': '*',
            },
            method: 'PUT',
            body: new Blob([reader.result], { type: file.type }),
          });
        });
        reader.readAsArrayBuffer(file);
      })
      .catch();
  };
  createGroup = (formData) => {
    //add group to api
    formData.GroupFileName = formData.groupProfilePic.name;

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
        let groupPic = `${resData.group.id}_${formData.groupProfilePic.name}`;

        this.uploadDashFile(formData.groupProfilePic, groupPic);
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        this.setState({ eventMessage: error.message });
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
    //set needed items for specific event
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
  createMessage = (formData) => {
    //add new message
    fetch(`${config.HOST}/api/messages/send-message`, {
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
        this.setState({
          message_body: resData.message_body,
          message_type: resData.message_type,
          group_chat: this.state.groupId,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  createPrayer = (formData) => {
    //add new prayer
    fetch(`${config.HOST}/api/prayers/send-prayer`, {
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
        this.setState({
          prayer_body: resData.prayer_body,
          prayer_type: this.state.prayer_type,
          group_prayer: this.state.groupId,
        });
        this.props.history.push('/dashboard');
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
            <div>
              {this.state.profilePic ? (
                <img
                  id='header-user-icon'
                  src={this.state.profilePic}
                  //user photo on header or use default photo - so it doesn't break
                  alt='user'
                />
              ) : (
                <img
                  id='header-user-icon'
                  src={userphoto}
                  //user photo on header or use default photo - so it doesn't break
                  alt='user'
                />
              )}
            </div>
          </div>
          <h1 className='header-h1'>Prayer Circles</h1>
          <div className='header-nav-icons' onClick={this.HamNavPage}>
            <Link to='/' className='header-sign-out-icon'>
              <span>sign out</span>
              <FontAwesomeIcon id='head-sign-out-icon' icon={faSignOutAlt} />
            </Link>
          </div>
        </nav>

        {[
          '/dashboard',
          '/events',
          '/chat',
          '/invite',
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
                  handleGroupPic={this.handleGroupPic}
                  myGroupPhotos={this.state.myGroupPhotos}
                  groupUsers={this.state.testGroup}
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
                prayers={this.state.prayers}
                onHandleHam={this.HamNavPage}
                handleEvent={this.handleEvent}
                handleBiblePassage={this.handleBiblePassage}
                groupUsers={this.state.testGroup}
                myGroupPhotos={this.state.myGroupPhotos}
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
                profilePic={this.state.profilePic}
                groupUsers={this.state.testGroup}
                myGroupPhotos={this.state.myGroupPhotos}
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
                messages={this.state.messages}
                onHandleHam={this.HamNavPage}
                onCreateMessage={this.createMessage}
                profilePic={this.state.profilePic}
                handleProfilePic={this.handleProfilePic}
                groupUsers={this.state.testGroup}
                myGroupPhotos={this.state.myGroupPhotos}
              ></ChatPage>
            );
          }}
        />

        <Route
          path='/add-group'
          render={() => {
            return (
              <AddGroupPage
                eventMessage={this.state.eventMessage}
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
                myGroupPhotos={this.state.myGroupPhotos}
              ></AddEventPage>
            );
          }}
        />
        <Route
          path='/add-prayer'
          render={() => {
            return (
              <AddPrayerPage
                resetError={this.resetError}
                eventMessage={this.state.eventMessage}
                groups={this.state.groups}
                groupId={this.state.groupId}
                users={this.state.users}
                userId={this.state.userId}
                events={this.state.events}
                eventId={this.state.eventId}
                onHandleHam={this.HamNavPage}
                onCreatePrayer={this.createPrayer}
                myGroupPhotos={this.state.myGroupPhotos}
              ></AddPrayerPage>
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
