import React, { Component } from 'react';
import './ComponentChatBubble.css';

export default class ChatBubbleComponent extends Component {
  render() {
    let element = document.getElementById('anchor')
    if(element){
  element.scrollIntoView()
    }
  
    const { users = [], userId, messages = [], profilePic } = this.props;
    const user = users.find(
      (user) => user.first_name === window.localStorage.getItem('userName')
    );
    const { groups = [], groupId } = this.props;
    const groupMessages = []
      .concat(groups)
      .sort((a, b) => (a.message_time > b.message_time ? 1 : -1));
    const sortMessages = []
      .concat(messages)
      .sort((a, b) => (a.message_time > b.message_time ? 1 : -1))
      .filter((msg) => msg.group_chat === parseInt(this.props.groupId));
    return (
      <div className='Chat-Bubble-Component' id='scroller'>
        {groupId ? sortMessages.map((message) => {
          let picture;
          let usr;
          if (Object.keys(this.props.groupUsers).length > 0) {
            usr = this.props.users.find(
              (u) => u.id == parseInt(message.user_id)
            );
            if (usr && this.props.groupUsers[usr.first_name]) {
              picture = this.props.groupUsers[usr.first_name].profilePic;
            }
          }
          if (!usr) {
            usr = {};
          }
          if (message.user_id && message.user_id == user.id) {
            return (
              <div key={message.id} className='chat-single-rt'>
                <div className='chat-single-header-rt'>
                  <p>
                    <strong>
                      {usr.first_name} {usr.last_name}
                    </strong>
                  </p>
                  <p>{new Date(message.message_time).toDateString()}</p>
                </div>
                <div className='speech-bubble-rt'>
                  <p>{message.message_body}</p>
                  <div className='speech-bubble-ds__arrow-rt'></div>
                </div>

                <img
                  id='chat-user-icon-rt'
                  src={picture ? picture : ''}
                  alt='guy'
                />
              </div>
            );
          } else {
            return (
              <div key={message.id} className='chat-single-lf'>
                <div className='chat-single-header-lf'>
                  <p>
                    <strong>
                      {usr.first_name} {usr.last_name}
                    </strong>
                  </p>
                  <p>{new Date(message.message_time).toDateString()}</p>
                </div>
                <div className='speech-bubble-lf'>
                  <p>{message.message_body}</p>
                  <div className='speech-bubble-ds__arrow-lf'></div>
                </div>
                <img
                  id='chat-user-icon-lf'
                  src={picture ? picture : ''}
                  alt='guy'
                />
              </div>
            );
          }
        }): (<div className='pre-chat-wall'><h3 className='pre-chat-wall-p'>Select Group<br></br> and start a chat</h3></div>)}
        <div id='anchor'></div>
      </div>
    );
  }
}
