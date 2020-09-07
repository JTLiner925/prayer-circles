import React, { Component } from 'react';
import userphoto from '../../Images/user-photo.png';
import './PrayerWallComponent.css';

export default class PrayerWallComponent extends Component {
  state = {
    showAddPhoto: false,
    picture: '',
  };
  toggleAddPhoto = () => {
    this.setState({
      showAddPhoto: !this.state.showAddPhoto,
    });
  };

  handleAddPhoto = (e) => {
    e.preventDefault();
  };
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
      groupId,
      groups = [],
      prayers,
      userId,
      users,
      groupUsers,
      myGroupPhotos = {},
    } = this.props;
    let sortPrayers = []
      .concat(prayers)
      .sort((a, b) => (a.prayer_time > b.prayer_time ? 1 : -1));
    let filteredUsers = [];
    let selectedGroup = groups.find((group) => {
      return group.id === parseInt(groupId);
    });
    if (selectedGroup) {
      filteredUsers = users.filter((user) => {
        return selectedGroup.user_ids.includes(user.id.toString());
      });
    }
    if (filteredUsers) {
      if (prayers) {
        sortPrayers = prayers.filter((prayer) => {
          let match = filteredUsers.find((usr) => {
            if (
              prayer.user_id === usr.id &&
              prayer.group_prayer === parseInt(groupId)
            ) {
              return prayer;
            }
          });
          if (match) {
            return match;
          }
        });
      }
    }
    return (
      <>
        <div className='Prayer-Wall-Component'>
          {groupId ? (
            sortPrayers.map((prayer) => {
              let eachUserId;
              let picture = `url(${userphoto})`;
              let usr;

              if (prayer && prayer.user_id) {
                eachUserId = prayer.user_id;
              }
              if (
                groupUsers &&
                Object.keys(groupUsers).length > 0
              ) {
                usr = users.find((u) => {
                  if (eachUserId) {
                    return u.id == parseInt(eachUserId);
                  }
                });
                if (usr && groupUsers[usr.first_name]) {
                  picture = groupUsers[usr.first_name].profilePic;
                }
              }
              if (!usr) {
                usr = {};
              }
              if (eachUserId && eachUserId === usr.id) {
                return (
                  <div
                    key={prayer.id}
                    className='prayer-wall-component-request'
                  >
                    <div className='prayer-header'>
                      <div className='prayer-header-top'>
                        <img id='header-user-icon' src={picture ? picture : `url(${userphoto})`} alt={`${usr.first_name} user`}></img>
                        <div className='prayer-user'>
                          <h2>{usr.first_name}</h2>
                          <h3>
                            {prayer.prayer_type}
                            <span className='prayer-days-ago'>
                              {new Date(prayer.prayer_time).toDateString()}
                            </span>
                          </h3>
                        </div>
                        <h4>{selectedGroup.group_name}</h4>
                      </div>
                    </div>
                    <div className='prayer-main'>
                      <p>{prayer.prayer_body}</p>
                    </div>
                    <div className='prayer-footer'></div>
                  </div>
                );
              }
            })
          ) : (
            <div className='pre-prayer-wall'>
              <h3 className='pre-prayer-wall-text'>
                Select Group<br></br>to view prayer requests
              </h3>
            </div>
          )}
          <div id='anchor'></div>
        </div>
      </>
    );
  }
}
