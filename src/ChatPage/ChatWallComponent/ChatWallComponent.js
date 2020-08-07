import React, { Component } from 'react';
import ComponentChatBubble from '../../ComponentChatBubble/ComponentChatBubble';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faThumbsUp,
  faCommentAlt,
  faEllipsisH,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import guy1 from '../../Images/guy1.jpg';
import friends1 from '../../Images/friends1.jpg';
import './ChatWallComponent.css';

export default class ChatWallComponent extends Component {
  state={
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
  render() {
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
                <img id='chat-user-icon' src={guy1} alt='guy' />
              </div>
              <div>
                <img id='chat-users-icon' src={friends1} alt='Friends' />
              </div>
            </div>
          </div>
          <div className='chat-main'>
            <ComponentChatBubble />
          </div>

          <div className='chat-footer'>
            <div className='chat-footer-left'>
              <FontAwesomeIcon id='chat-heart-icon' icon={faHeart} />
              <FontAwesomeIcon id='chat-thumbs-up-icon' icon={faThumbsUp} />
              <FontAwesomeIcon id='chat-comment-icon' icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id='chat-dots-icon' icon={faEllipsisH} />
          </div>
          <div className='chat-input-container'>
            <div className='chat-input-option'>
              <FontAwesomeIcon id='chat-camera-icon' onClick={this.toggleChatAddPhoto} icon={faCamera} />
            </div>
            <input
              className='chat-input-text'
              type='text'
              placeholder='Message'
            ></input>
          </div>
        </div>
      </div>
      </>
    );
  }
}
