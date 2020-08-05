import React, { Component } from 'react';
import girl1 from '../../Images/girl1.jpg';
import thinker from '../../Images/thinker.jpg';
import guy1 from '../../Images/guy1.jpg';
import guy2 from '../../Images/guy2.jpg';
import woman1 from '../../Images/woman1.jpg';
import './PrivateChatSelect.css';

export default class PrivateChatSelect extends Component {
  render() {
    return (
      <div className='Private-Chat-Select'>
        <div className='chat-people'>
          {/* <div className='chat-person'>
            <img className='person-image' src={guy1} alt='guy' />
          </div> */}
          <div className='chat-person'>
            <img className='person-image' src={thinker} alt='thinker statue' />
          </div>
          <div className='chat-person'>
            <img className='person-image' src={girl1} alt='girl' />
          </div>
          <div className='chat-person'>
            <img className='person-image' src={guy2} alt='guy' />
          </div>
          <div className='chat-person'>
            <img className='person-image' src={woman1} alt='woman' />
          </div>
          <div className='chat-person'>
            <img className='person-image' src={woman1} alt='woman' />
          </div>
          <div className='chat-person'>
            <img className='person-image' src={woman1} alt='woman' />
          </div>
          {/* <div className="chat-person">
            <div>P-6</div>
          </div>
          <div className="chat-person">
            <div>P-7</div>
          </div>
          <div className="chat-person">
            <div>P-8</div>
          </div>
          <div className="chat-person">
            <div>P-9</div>
          </div> */}
        </div>
      </div>
    );
  }
}
