import React, { Component } from 'react';
import './ComponentChatBubble.css';
import guy1 from '../Images/guy1.jpg';
import guy2 from '../Images/guy2.jpg';

export default class ChatBubbleComponent extends Component {
  render() {
    const { users = [], userId, messages = [], profilePic } = this.props;
    const user = users.find(
      (user) => user.first_name === window.localStorage.getItem('userName')
    );
    const { groups = [] } = this.props;
    const groupMessages = []
      .concat(groups)
      .sort((a, b) => (a.message_time > b.message_time ? 1 : -1));
    const sortMessages = []
      .concat(messages)
      .sort((a, b) => (a.message_time > b.message_time ? 1 : -1));
      console.log(groupMessages)
    return (
      <div className='Chat-Bubble-Component'>
        {groupMessages.map((message) => {
          if (message.user_id && message.user_id == user.id) {
            return (
            <div key={message.id} className='chat-single-rt'>
              <div className='chat-single-header-rt'>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>08/11/20 7:36am</p>
              </div>
              <div className='speech-bubble-rt'>
                <p>Pray for this app!Pray for this app! Pray for this app! </p>
                <div className='speech-bubble-ds__arrow-rt'></div>
              </div>

              <img id='chat-user-icon-rt' src={profilePic} alt='guy' />
            </div>);
          } else {
            return( 
            <div key={message.id}  className='chat-single-lf'>
              <div className='chat-single-header-lf'>
                <p>08/11/20 4:53pm</p>
                <p>
                  <strong>Christy Liner</strong>
                </p>
              </div>
              <div className='speech-bubble-lf'>
                <p>
                  Pray for this app!Pray for this app! Pray for this app! Pray
                  for this app! Pray for this app!Pray for this app! Pray for
                  this app!{' '}
                </p>
                <div className='speech-bubble-ds__arrow-lf'></div>
              </div>
              <img id='chat-user-icon-lf' src={guy2} alt='guy' />
            </div>);
          }
        })}
      </div>
    );
  }
}
