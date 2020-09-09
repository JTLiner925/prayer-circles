import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { default as NumberFormat } from 'react-number-format';
import './AddGroupPage.css';

export default class AddGroupPage extends Component {
  state = {
    group: '',
    showGroupPhoto: false,
    groupProfilePic: {},
  };
  toggleGroupPhoto = () => {
    this.setState({
      showGroupPhoto: !this.state.showGroupPhoto,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    //create group from dashboard
    this.props.onCreateGroup(this.state);
  };
  dropHandler = (e) => {
    //model to select group photo from local files
    e.preventDefault();
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          let file = e.dataTransfer.items[i].getAsFile();
          let imageType = ['png', 'jpg', 'jpeg'];
          let acceptedType = false;
          imageType.forEach((type) => {
            if (file.type.includes(type)) {
              acceptedType = true;
            }
          });
          if (acceptedType) {
            let element = document.getElementById('preview-group-photo');
            element.src = URL.createObjectURL(file);
            this.toggleGroupPhoto();
            this.setState({
              groupProfilePic: file,
              groupPhotoMessage: '✅ Photo uploaded successfully!',
            });
          } else {
            this.setState({
              badGroupPhotoMessage:
                ' ❌ Must be image file (png, jpg, jpeg)',
            });
          }
        } else {
          this.setState({
            badGroupPhotoMessage: ' ❌ Must be image file (png, jpg, jpeg)',
          });
        }
      }
    }
  };
  handleGroupPhoto = (e) => {
    //sets profilePic in state
    let imageType = ['png', 'jpg', 'jpeg'];
    let acceptedType = false;
    imageType.forEach((type) => {
      if (e.type.includes(type)) {
        acceptedType = true;
      }
    });
    if (acceptedType) {
      let element = document.getElementById('preview-group-photo');
      element.src = URL.createObjectURL(e);
      this.toggleGroupPhoto()
      this.setState({
        groupProfilePic: e,
      groupPhotoMessage: '✅ Photo uploaded successfully!',
      });
    } else {
      this.setState({
        badGroupPhotoMessage: ' ❌ Must be image file (png, jpg, jpeg)',
      });
    }
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
    //api call to join group
    e.preventDefault();
    let group = this.props.groups.find((g) => {
      return g.group_name === this.state.group_name;
    });
    //join group from dashboard
    this.props.onJoinGroup(group);
  };
  accessHandler = (event) => {
    this.setState({
      group_access: event.target.value,
    });
  };
  render() {
    return (
      <>
        {this.state.showGroupPhoto ? (
          <div className='group-photo-background'>
            <div className='group-photo-model'>
              <p onClick={this.toggleGroupPhoto}>
                <FontAwesomeIcon
                  className='group-photo-model-x'
                  icon={faTimesCircle}
                />
              </p>
              <form>
                <div
                  name='group-drop-area'
                  id='group-drop-area'
                  onDragEnter={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    this.dropHandler(e);
                  }}
                >
                  <input
                    id='handle-group-photo'
                    type='file'
                    onChange={(e) => {
                      e.preventDefault();
                      this.handleGroupPhoto(
                        document.getElementById('handle-group-photo')[
                          'files'
                        ][0]
                      );
                    }}
                    style={{ display: 'none' }}
                  ></input>
                  <p className='browse-group-div'>
                    <span
                      className='group-browse-button'
                      onClick={() => {
                        document.getElementById('handle-group-photo').click();
                      }}
                    >
                      Browse
                    </span>
                    <br></br>
                  </p>
                  <p className='group-drag-p'>
                    or Drag and Drop<br></br>JPG or PNG files only
                  </p>
                  <p className='bad-group-photo-message'>
                    {this.state.badGroupPhotoMessage}
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className='AddGroupPage' onClick={this.props.onHandleHam}>
          <div className='add-group-container'>
            <form className=' join-form' onSubmit={this.submitJoinHandler}>
              <h2>Join Group</h2>
              <div className='join-div'>
                <p className='join-group-error-alert'>{this.props.message}</p>
                <label htmlFor='group-names' className='group-label'>
                  group names
                </label>
                <select
                  id='group-names'
                  name='group_names'
                  className='add-group-name-label'
                  onChange={this.changeHandler}
                >
                  {' '}
                  <option>Select Group</option>
                  {this.props.groups &&
                    this.props.groups.map((gr) => (
                      <option
                        label={gr.group_name}
                        className='group-option'
                        id={gr.group_name.split(' ').join('_')}
                        groupid={gr.id}
                        key={gr.id}
                      >
                        {gr.group_name}
                      </option>
                    ))}
                </select>
                <div className='join-group'>
                  <button className='join-group-button' type='submit'>
                    Request to Join Group
                  </button>
                </div>
              </div>
            </form>
            <form className='add-group-form' onSubmit={this.submitHandler}>
              <h2>Create Group</h2>

              <div
                className='add-group-fontawesome'
                onClick={this.toggleGroupPhoto}
              >
                <div className='preview-group-photo-container'>
                <img id='preview-group-photo' />

              </div>
                <FontAwesomeIcon
                  id='group-user-icon'
                  className='add-group-avatar'
                  icon={faUserPlus}
                />
              </div>
              <div className='good-group-photo-div'>
              <p className='group-photo-message'>{this.state.groupPhotoMessage}</p>
              </div>
              <div className='group-inputs-div'>
              <label
                name='group_names'
                htmlFor='group-name-input'
                className='label add-group-name-label'
              >
                group name
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
                className='label add-group-pitch-textarea-label'
              >
                {' '}
                pitch
                <textarea
                  className='add-group-pitch-textarea'
                  placeholder='Tell us about your group!'
                  id='pitch-textarea'
                  name='pitch'
                  onChange={this.changeHandler}
                ></textarea>
              </label>
              <div className='add-group-phone-location-div'>
                <label
                  htmlFor='phone-input'
                  className='label add-group-phone-label'
                >
                  phone
                  <NumberFormat
                    id='phone-input'
                    name='leader_phone'
                    className='add-group-phone'
                    placeholder='(###) ###-####'
                    onChange={this.changeHandler}
                    format=' (###) ###-####'
                    mask='_'
                  />
                </label>
                <label
                  htmlFor='location-input'
                  className='label add-group-location-label'
                >
                  {' '}
                  location
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
                className='label add-group-time-date-label'
              >
                {' '}
                time and date
                <input
                  className='add-group-time-date'
                  placeholder='Time and Day i.e. 6pm Fridays'
                  id='time-date-input'
                  name='time_date'
                  onChange={this.changeHandler}
                ></input>
              </label>
              <label
                htmlFor='more-info'
                className='label add-group-more-info-label'
              >
                more info
                <textarea
                  className='add-group-more-info'
                  placeholder='More Info'
                  id='more-info'
                  name='more_info'
                  onChange={this.changeHandler}
                  required
                ></textarea>
              </label>
              </div>
              <p className='add-group-error-alert'>{this.props.eventMessage}</p>
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
