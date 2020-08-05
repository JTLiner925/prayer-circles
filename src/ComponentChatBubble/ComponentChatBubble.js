import React, { Component } from 'react';
import './ComponentChatBubble.css';
import guy1 from '../Images/guy1.jpg';
import guy2 from '../Images/guy2.jpg';

export default class ChatBubbleComponent extends Component {
  render() {
    return (
      <div className='Chat-Bubble-Component'>
        <div className='chat-single-rt'>
          <div className='chat-single-header-rt'>
            <p>
              <strong>JT Liner</strong>
            </p>
            <p>08/11/20 7:36am</p>
          </div>
          <div className='speech-bubble-rt'>
            <p>Pray for this app!Pray for this app! Pray for this app! </p>
            <div className='speech-bubble-ds__arrow-rt'></div>
          </div>
          
            <img id='chat-user-icon-rt' src={guy1} alt='guy' />
          
        </div>
        <div className='chat-single-lf'>
          <div className='chat-single-header-lf'>
            <p>08/11/20 4:53pm</p>
            <p>
              <strong>Christy Liner</strong>
            </p>
          </div>
          <div className='speech-bubble-lf'>
            <p>
              Pray for this app!Pray for this app! Pray for this app! Pray for
              this app! Pray for this app!Pray for this app! Pray for this app!{' '}
            </p>
            <div className='speech-bubble-ds__arrow-lf'></div>
          </div>
          <img id='chat-user-icon-lf' src={guy2} alt='guy' />
        </div>
        <div className='chat-single-rt'>
          <div className='chat-single-header-rt'>
            <p>
              <strong>JT Liner</strong>
            </p>
            <p>08/12/20 2:10pm</p>
          </div>
          <div className='speech-bubble-rt'>
            <p>Pray for this app!Pray for this app! Pray for this app! </p>
            <div className='speech-bubble-ds__arrow-rt'></div>
          </div>
          <img id='chat-user-icon-rt' src={guy1} alt='guy' />
        </div>
      </div>
    );
  }
}
