import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import friends1 from '../Images/friends1.jpg';
import friends2 from '../Images/friends2.jpg';
import './ComponentGroupList.css';

export default class ComponentGroupList extends Component {
  state = {
    group: '',
    event: '',
    user: '',
    selectedGroup: '',
    groups: '',
    users: '',
  };
  static defaultProps = {
    match: {
      params: {},
    },
  };
  componentDidMount(groups) {
    this.setState({
      groups: groups,
      users: this.props.users,
    });
  }
  changeHandler = (e) => {
    // this.props.resetError();
    
    this.reload();
    if (e.target.name === 'group_name') {
      let element = document.querySelector(
        `#${e.target.value.split(' ').join('_')}`
      );
      let groupid;
      groupid = element.getAttribute('groupid');

      this.setState({
        [e.target.name]: e.target.value,
        groupid: groupid,
        groups: this.props.groups,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  render() {
    let BackgroundImage = {
      backgroundImage: `url(${friends1})`,
    };
    let addGroupBackgroundImage = {
      backgroundImage: `url(${friends2})`,
    };
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
    //nav bar displays groups that you have join and events for each group
    const { events = [], userId, myGroupPhotos = {} } = this.props;
    const { groups = [] } = this.props;
    const groupEvents = []
      .concat(groups)
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const sortEvents = [].concat(events).sort((a, b) => (a.id > b.id ? 1 : -1));
    return (
     
      <div className='Group-List-Slider' onClick={this.props.onHandleHam}>
        <div className='group-list-div'>
        <h2>Select Group</h2>
        <ul className='group-list-slides'>
          
          {groups.map((group) => {
            //display group photo
            let BackgroundImage = `url(${friends1})`;
            if(myGroupPhotos && Object.keys(myGroupPhotos).length > 0){
              
              if(myGroupPhotos[group.group_name] && myGroupPhotos[group.group_name].profilePic){
                BackgroundImage = myGroupPhotos[group.group_name].profilePic
              }
              console.log(BackgroundImage)
            }
            let addGroupBackgroundImage = {
              backgroundImage: `url(${friends2})`,
            };
            let idee = group.id;
            let { pathname } = document.location;
            let userIds = group.user_ids;

            for (let i = 0; i < userIds.length; i++) {
              //display group if userId is in the ids of the group
              let idsArray = userIds[i];
              if (idsArray && idsArray == userId) {
                return (
                  <li
                    className='group-list-slide'
                    key={group.id}
                    name='group_name'
                    onChange={this.changeHandler}
                  >
                    <NavLink
                      style={{backgroundImage: BackgroundImage ? `url(${BackgroundImage})`: `url(${friends1})`}}
                      id='groupid'
                      className='group-image'
                      to={`${pathname}?groupId=${idee}`}
                    >
                      <div name='group_name'>{group.group_name}</div>
                    </NavLink>
                  </li>
                );
              }
            }
          })}
        </ul>
        </div>
        <div className='add-group-section'>
          <div className='add-group-slide'>
            <NavLink
              className='add-group-image'
              to='/add-group'
              style={addGroupBackgroundImage}
            >

              <div>Add Group</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
