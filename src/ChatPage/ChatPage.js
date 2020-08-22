import React, { Component } from 'react'
import PrivateChatSelect from './PrivateChatSelect/PrivateChatSelect'
import ChatWallComponent from './ChatWallComponent/ChatWallComponent'
import socketIOClient from 'socket.io-client';
import config from '../config';
import './ChatPage.css'

export default class ChatPage extends Component {
  state = {
    group: '',
    messages: '',
    profilePic: {},
  }

 
  
  
  render() {
    console.log(this.state)
    return (
      <div className="ChatPage" onClick={this.props.onHandleHam}>
        <PrivateChatSelect 
        groups={this.props.groups}
        groupId={this.props.groupId}
        users={this.props.users}
        userId={this.props.userId}
        messages={this.props.messages}
        profilePic={this.props.profilePic}
        handleProfilePic={this.props.handleProfilePic}
        />
        <div className='chat-page-component'>
        <ChatWallComponent 
        groups={this.props.groups}
        groupId={this.props.groupId}
        users={this.props.users}
        userId={this.props.userId}
        messages={this.props.messages}
        onCreateMessage={this.props.onCreateMessage}
        profilePic={this.props.profilePic}
        handleProfilePic={this.handleProfilePic}

        />
        </div>
        
      </div>
    );
  }
}
