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
  faThList
} from '@fortawesome/free-solid-svg-icons';
import guy1 from '../../Images/guy1.jpg';
import friends1 from '../../Images/friends1.jpg';
import './ChatWallComponent.css';

export default class ChatWallComponent extends Component {
  state={
    message_type:'',
    message_body:'',
    showChatAddPhoto: false,
  }
  toggleChatAddPhoto = () => {
    this.setState({
      showChatAddPhoto: !this.state.showChatAddPhoto,
    });
  };

  handleChatAddPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }
  submitHandler = (e) => {
    e.preventDefault();
this.props.onCreateMessage(this.state)
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      message_type: e.target.type,
      user_id: this.props.userId,
      group_chat: this.props.groupId
    });
  };
  render() {
    const { profilePic } = this.props
    return (
      <>
      {this.state.showChatAddPhoto ? <div className='chat-add-photo-background'>
        <div className='chat-add-photo-model'>
          <p onClick={this.toggleChatAddPhoto}>X</p>
          <form>
            <div id='chat-drop-area'>
            <input id='handle-chat-add-photo'type='file' onChange={this.handleChatAddPhoto} ></input>
            </div>
            
          </form>
        </div>
      </div>: ''}

      <div className='Chat-Wall-Component'>
        <div className='chat-component-container'>
          <div className='chat-header'>
            <div className='chat-header-top'>
              <div>
                <img id='chat-user-icon' src={profilePic} alt='guy' />
              </div>
              <div>
                <img id='chat-users-icon' src={friends1} alt='Friends' />
              </div>
            </div>
          </div>
          <div className='chat-main'>
            <ComponentChatBubble 
            groups={this.props.groups}
            groupId={this.props.groupId}
            users={this.props.users}
            userId={this.props.userId}
            profilePic={this.props.profilePic}
            messages={this.props.messages}
            />
          </div>

          <div className='chat-footer'>
            <div className='chat-footer-left'>
              <FontAwesomeIcon id='chat-heart-icon' icon={faHeart} />
              <FontAwesomeIcon id='chat-thumbs-up-icon' icon={faThumbsUp} />
              <FontAwesomeIcon id='chat-comment-icon' icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id='chat-dots-icon' icon={faEllipsisH} />
          </div>
          <form className='chat-input-container' onSubmit={this.submitHandler}>
            <div name='message_type' className='chat-input-option' onChange={this.changeHandler} type='image'>
              <FontAwesomeIcon id='chat-camera-icon' onClick={this.toggleChatAddPhoto} icon={faCamera} />
            </div>
            <input
              name='message_body'
              className='chat-input-text'
              type='text'
              placeholder='Message'
              onChange={this.changeHandler}
            ></input>
            <button className='message-submit-button' type='submit'>
              <FontAwesomeIcon className='chat-wall-submit' icon={faPaperPlane}/>
            </button>
          </form>
        </div>
      </div>
      </>
    );
  }
}
