import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './ChatPage.css'

export default class ChatPage extends Component {
  render() {
    return (
      <div className="ChatPage">
        <div className="chat-group-slide">
          <div className="chat-group">
            <div>Group #1</div>
          </div>
          <div className="chat-group">
            <div>Group #2</div>
          </div>
          <div className="chat-group">
            <div>Group #3</div>
          </div>
          <div className="chat-group">
            <div>Group #4</div>
          </div>
        </div>
        <div className="chat-person-banner">
        <div className="chat-person">
            <div>Person1</div>
          </div>
          <div className="chat-person">
            <div>Person2</div>
          </div>
          <div className="chat-person">
            <div>Person3</div>
          </div>
          <div className="chat-person">
            <div>Person4</div>
          </div>
          <div className="chat-person">
            <div>Person5</div>
          </div>

        </div>
        <div className="chat-wall">
          <div className="chat-bubble">
            <div className='chat-bubble-text'>Chat Bubble #1</div>
          </div>
          <div className="chat-bubble">
            <div className='chat-bubble-text'>Chat Bubble #2</div>
          </div>
          <div className="chat-bubble">
            <div className='chat-bubble-text'>Chat Bubble #3</div>
          </div>
        </div>
      </div>
    );
  }
}
