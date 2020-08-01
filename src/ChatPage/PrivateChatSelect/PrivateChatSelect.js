import React, { Component } from "react";
import "./PrivateChatSelect.css";

export default class PrivateChatSelect extends Component {
  render() {
    return (
      <div className="Private-Chat-Select">
        <div className='chat-people'>
          <div className="chat-person">
            <div>Pers1</div>
          </div>
          <div className="chat-person">
            <div>Pers2</div>
          </div>
          <div className="chat-person">
            <div>Pers3</div>
          </div>
          <div className="chat-person">
            <div>Pers4</div>
          </div>
          <div className="chat-person">
            <div>Pers5</div>
          </div>
          <div className="chat-person">
            <div>Pers6</div>
          </div>
          <div className="chat-person">
            <div>Pers7</div>
          </div>
        </div>
      </div>
    );
  }
}
