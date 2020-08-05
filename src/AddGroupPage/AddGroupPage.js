import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { default as NumberFormat } from "react-number-format";
import './AddGroupPage.css';

export default class AddGroupPage extends Component {
  state = {
    group: '',
  };
  submitHandler = (e) => {
    e.preventDefault();
    //create group from dashboard
    this.props.onCreateGroup(this.state);
  };
  changeHandler = (e) => {
    //grabs the group name to join
    if (e.target.name === 'group_names') {
      let element = document.querySelector(
        `#${e.target.value.split(' ').join('_')}`
      );
      let groupid;

      groupid = element.getAttribute('groupid');

      this.setState({
        group_name: e.target.value,
        groupid: groupid,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  render() {
    return (
      <div className='AddGroupPage'>
        <form className='add-group-form' onSubmit={this.submitHandler}>
          <div className='add-group-fontawesome'>
            <FontAwesomeIcon
              id='user-icon'
              className='add-group-avatar'
              icon={faUser}
            />
          </div>
          <label htmlFor='group-name-input' className='add-group-name-label'>
            <input
              className='add-group-name'
              placeholder='Group Name'
              id='group-name-input'
              type='text'
              name='group_name'
              onChange={this.changeHandler}
              required
            ></input>
          </label>
          <label htmlFor='pitch-textarea' className='add-group-pitch-textarea-label'>
            <textarea
              className='add-group-pitch-textarea'
              placeholder='Tell us about your group!'
              id='pitch-textarea'
              name='pitch'
              onChange={this.changeHandler}
              // required
            ></textarea>
          </label>
          <div className='add-group-phone-location-div'>
            <label htmlFor='phone-input' className='add-group-phone-label'>
              <NumberFormat
                id='phone-input'
                name='leader_phone'
                className='add-group-phone'
                placeholder='(###) ###-####'
                onChange={this.changeHandler}
                format=' (###) ###-####'
                mask='_'
                // required
              />
            </label>
            <label htmlFor='location-input' className='add-group-location-label'>
              <input
                className='add-group-location'
                placeholder='Location'
                id='location-input'
                name='group_location'
                onChange={this.changeHandler}
              ></input>
            </label>
          </div>
          <label htmlFor='time-date-input' className='add-group-time-date-label'>
            <input
              className='add-group-time-date'
              placeholder='Time and Day i.e. 6pm Fridays'
              id='time-date-input'
              name='time_date'
              onChange={this.changeHandler}
            ></input>
          </label>
          <label htmlFor='more-info' className='add-group-more-info-label'>
            <textarea
              className='add-group-more-info'
              placeholder='More Info'
              id='more-info'
              name='more_info'
              onChange={this.changeHandler}
              required
            ></textarea>
          </label>
          <p className='error-alert'>{this.props.createMessage}</p>
          <button type='submit' className='add-group-button'>
            Create New Group
          </button>
        </form>
      </div>
    );
  }
}
