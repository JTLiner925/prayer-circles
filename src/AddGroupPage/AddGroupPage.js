import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { default as NumberFormat } from 'react-number-format';
import './AddGroupPage.css';

export default class AddGroupPage extends Component {
  state = {
    group: '',
    showGroupPhoto: false,
  };
  toggleGroupPhoto = () => {
    this.setState({
      showGroupPhoto: !this.state.showGroupPhoto,
    });
  };

  handleGroupPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value);
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
  submitJoinHandler = (e) => {
    e.preventDefault();
    let group = this.props.groups.find((g) => {
      return g.group_name === this.state.group_name;
    });
    //join group from dashboard
    this.props.onJoinGroup(group);
  };
  accessHandler = (event) => {
    this.setState({
      group_access: event.target.value
    })
  }
  render() {
    return (
      <>
        {this.state.showGroupPhoto ? (
          <div className='group-photo-background'>
            <div className='group-photo-model'>
              <p onClick={this.toggleGroupPhoto}>X</p>
              <form>
                <div id='group-drop-area'>
                  <input
                    id='handle-group-photo'
                    type='file'
                    onChange={this.handleGroupPhoto}
                  ></input>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className='AddGroupPage' onClick={this.props.onHandleHam}>
          <div className='add-group-container'>
        <form className=" join-form" onSubmit={this.submitJoinHandler}>
          <h2>Join Group</h2>
          <div className="join-div">
            <p className="error-alert">{this.props.message}</p>
            <label htmlFor="group-names"></label>
            <select
              id="group-names"
              name="group_names"
              className='add-group-name-label'
              onChange={this.changeHandler}
            >
              {" "}
              <option>Select Group</option>
              {this.props.groups &&
                this.props.groups.map((gr) => (
                  <option
                    label={gr.group_name}
                    className="group-option"
                    id={gr.group_name.split(" ").join("_")}
                    groupid={gr.id}
                    key={gr.id}
                  >
                    {gr.group_name}
                  </option>
                ))}
            </select>
            <div className="join-group">
              <button className='join-group-button'type="submit">Request to Join Group</button>
            </div>
          </div>
        </form>
          <form className='add-group-form' onSubmit={this.submitHandler}>
          <h2>Create Group</h2>

            <div
              className='add-group-fontawesome'
              onClick={this.toggleGroupPhoto}
            >
              <FontAwesomeIcon
                id='user-icon'
                className='add-group-avatar'
                icon={faUser}
              />
            </div>
            <select id='group-public-private' onChange={this.accessHandler}>
              <option selected disabled hidden>Chooses Access Setting</option>
              <option value='public'>Public Group</option>
              <option value='private'>Private Group</option>
            </select>
            <label
              name='group_names'
              htmlFor='group-name-input'
              className='add-group-name-label'
            >
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
            <label
              htmlFor='pitch-textarea'
              className='add-group-pitch-textarea-label'
            >
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
              <label
                htmlFor='location-input'
                className='add-group-location-label'
              >
                <input
                  className='add-group-location'
                  placeholder='Location'
                  id='location-input'
                  name='group_location'
                  onChange={this.changeHandler}
                ></input>
              </label>
            </div>
            <label
              htmlFor='time-date-input'
              className='add-group-time-date-label'
            >
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
        </div>
      </>
    );
  }
}
