import React, { Component } from 'react';
import PrayerPraiseComponent from './PrayerPraiseComponent/PrayerPraiseComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPrayingHands,
  faChild,
} from '@fortawesome/free-solid-svg-icons';
import friends1 from '../Images/friends1.jpg';
import './AddPrayerPage.css';

export default class AddPrayerPage extends Component {
  state = {
    groupid: this.props.groupId,
    prayer_type: '',
  };
  submitHandler = (e) => {
    // this.props.resetError();
    e.preventDefault();
    this.props.onCreatePrayer(this.state);
  };
  changeHandler = (e, prayer_type) => {
    // this.props.resetError();
    if (e.target.name === 'group_name') {
      let element = document.querySelector(
        `#${e.target.value.split(' ').join('_')}`
      );
      let groupid;
      groupid = element.getAttribute('groupid');

      this.setState({
        [e.target.name]: e.target.value,
        groupid: groupid,
      });
    } else {
      if (e.target.name) {
        this.setState({
          [e.target.name]: e.target.value,
          user_id: this.props.userId,
          group_prayer: this.props.groupId,
        });
      }
    }
    if (prayer_type) {
      this.setState({
        prayer_type: prayer_type,
      });
    }
  };
  onChangePrayerType = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  static getDerivedStateFromProps(props) {
    return { groupid: props.groupId };
  }
  render() {
    let BackgroundImage = {
      backgroundImage: `url(${friends1})`,
    };
    const { events = [], userId } = this.props;
    const { groups = [], groupId } = this.props;
    return (
      <div className='AddPrayerPage' onClick={this.props.onHandleHam}>
        <div id='anchor'></div>
        <div className='add-prayer-form'>
          <form className='add-prayer-form' onSubmit={this.submitHandler}>
            <div className='Prayer-Praise-Component'>
              <button
                type='button'
                name='prayer_type'
                value='Prayer'
                className='prayer-button'
                onClick={(e) => {
                  this.changeHandler(e, 'Prayer');
                }}
              >
                <FontAwesomeIcon id='prayer-hands-icon' icon={faPrayingHands} />
                <p>Prayer</p>
              </button>
              <h2>Or</h2>
              <button
                name='prayer_type'
                type='button'
                value='Praise'
                className='praise-button prayertype'
                onClick={(e) => {
                  this.changeHandler(e, 'Praise');
                }}
              >
                <FontAwesomeIcon id='prayer-hands-icon' icon={faChild} />
                <p>Praise</p>
              </button>
            </div>
            {groups.map((group) => {
              let selectedGroup = this.props.groupId;
              if (selectedGroup && selectedGroup == group.id) {
                return (
                  <div key={group.id} className='add-event-header-top'>
                    
                    <p  groupid={group.id}>Group: {group.group_name}</p>
                  </div>
                );
              }
            })}
            <div className='add-prayer-prayer-div'>
              <label
                htmlFor='prayer-input'
                className='add-prayer-request-label'
              >
                <textarea
                  id='prayer-input'
                  name='prayer_body'
                  className='add-prayer-request-input'
                  placeholder='Prayer Request'
                  onChange={this.changeHandler}
                  required
                ></textarea>
              </label>
            </div>
            <p className='error-alert'>{this.props.eventMessage}</p>

            <button type='submit' className='add-prayer-button'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
