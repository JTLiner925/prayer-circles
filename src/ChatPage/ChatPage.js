import React, { Component } from 'react'
import PrivateChatSelect from './PrivateChatSelect/PrivateChatSelect'
import ChatWallComponent from './ChatWallComponent/ChatWallComponent'
import './ChatPage.css'

export default class ChatPage extends Component {
  render() {
    return (
      <div className="ChatPage">
        <PrivateChatSelect />
        <div className='chat-page-component'>
        <ChatWallComponent />
        </div>
        
      </div>
    );
  }
}
