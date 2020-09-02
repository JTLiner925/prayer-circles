import React, { Component } from 'react';
import ComponentChatBubble from '../../ComponentChatBubble/ComponentChatBubble';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faThumbsUp,
  faCommentAlt,
  faEllipsisH,
  faCamera,
  faPaperPlane,
  faThList,
} from '@fortawesome/free-solid-svg-icons';
import guy1 from '../../Images/guy1.jpg';
import friends1 from '../../Images/friends1.jpg';
import './ChatWallComponent.css';

export default class ChatWallComponent extends Component {
  state = {
    message_type: '',
    message_body: '',
    showChatAddPhoto: false,
  };
  toggleChatAddPhoto = () => {
    this.setState({
      showChatAddPhoto: !this.state.showChatAddPhoto,
    });
  };

  handleChatAddPhoto = (e) => {
    e.preventDefault();
  };
  submitHandler = (e) => {
    e.preventDefault();
    e.persist();
    let element = document.getElementById('reset')
    element.click()
    this.props.onCreateMessage(this.state);
    this.props.sendMessage(this.state.message_body);
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      message_type: e.target.type,
      user_id: this.props.userId,
      group_chat: this.props.groupId,
    });
  };
  render() {
    const { profilePic, groups = [], groupId } = this.props;
    let selectedGroup = groups.find((group) => {
      return group.id === parseInt(groupId);
    });

    return (
      <>
        {this.state.showChatAddPhoto ? (
          <div className='chat-add-photo-background'>
            <div className='chat-add-photo-model'>
              <p onClick={this.toggleChatAddPhoto}>X</p>
              <form>
                <div id='chat-drop-area'>
                  <input
                    id='handle-chat-add-photo'
                    type='file'
                    onChange={this.handleChatAddPhoto}
                  ></input>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className='Chat-Wall-Component'>
          <div className='chat-component-container'>
            {/* <div className='bubble-container'> */}
            <div className='chat-header'>
              <div className='chat-header-top'>
                <div>
                  <p className='selected-group-name-chat'>{selectedGroup ? selectedGroup.group_name : ''}</p>
                </div>
              </div>
            </div>
            <div className='chat-main'>
              <ComponentChatBubble
                className='chat-bubble'
                groups={this.props.groups}
                groupId={this.props.groupId}
                users={this.props.users}
                userId={this.props.userId}
                profilePic={this.props.profilePic}
                messages={this.props.messages}
                groupUsers={this.props.groupUsers}
              />
            </div>

            {/* <div className='chat-footer'>
              <div className='chat-footer-left'>
                <FontAwesomeIcon id='chat-heart-icon' icon={faHeart} />
                <FontAwesomeIcon id='chat-thumbs-up-icon' icon={faThumbsUp} />
                <FontAwesomeIcon id='chat-comment-icon' icon={faCommentAlt} />
              </div>
              <FontAwesomeIcon id='chat-dots-icon' icon={faEllipsisH} />
            </div> */}
            {/* </div> */}
            <form
              className='chat-input-container'
              onSubmit={this.submitHandler}
            >
              {/* <div
                name='message_type'
                className='chat-input-option'
                onChange={this.changeHandler}
                type='image'
              > */}
              {/* <FontAwesomeIcon
                  id='chat-camera-icon'
                  onClick={this.toggleChatAddPhoto}
                  icon={faCamera}
                /> */}
              {/* <FontAwesomeIcon id='chat-thumbs-up-icon' icon={faThumbsUp} /> */}
              {/* </div> */}
              <input
                name='message_body'
                className='chat-input-text'
                type='text'
                placeholder='Message'
                onChange={this.changeHandler}
              ></input>
              <input type='reset' id='reset' style={{display:'none'}}></input>
              <button className='message-submit-button' type='submit'>
                <FontAwesomeIcon
                  className='chat-wall-submit'
                  icon={faPaperPlane}
                />
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
