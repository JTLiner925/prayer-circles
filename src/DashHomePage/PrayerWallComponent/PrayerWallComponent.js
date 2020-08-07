import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faHeart,
  faImage,
  faThumbsUp,
  faCommentAlt,
  faEllipsisH,
  faCamera
} from "@fortawesome/free-solid-svg-icons";
import "./PrayerWallComponent.css";

export default class PrayerWallComponent extends Component {
  state={
    showAddPhoto: false,
  }
  toggleAddPhoto = () => {
    this.setState({
      showAddPhoto: !this.state.showAddPhoto,
    });
  };

  handleAddPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }
  render() {
    return (
      <>
      {this.state.showAddPhoto ? <div className='add-photo-background'>
        <div className='add-photo-model'>
          <p onClick={this.toggleAddPhoto}>X</p>
          <form>
            <div id='prayer-drop-area'>
            <input id='handle-add-photo'type='file' onChange={this.handleAddPhoto} ></input>
            </div>
            
          </form>
        </div>
      </div>: ''}

      <div className="Prayer-Wall-Component">
        <div className="prayer-wall-component-request">
          <div className="prayer-header">
            <div className="prayer-header-top">
              <FontAwesomeIcon id="prayer-user-icon" icon={faUser} />
              <div className="prayer-user">
                <h2>JT Liner</h2>
                <h3>
                  Prayer <span className="prayer-days-ago">5 Days Ago</span>
                </h3>
              </div>
              <FontAwesomeIcon id="prayer-users-icon" icon={faUsers} />
            </div>
            <div className="prayer-header-bottom">
              <div>&#9734; Answered &#9734;</div>
              <p>3 Days Ago</p>
            </div>
          </div>
          <div className="prayer-main">
            <p>Pray for this app!</p>
            <FontAwesomeIcon id="prayer-image-icon" icon={faImage} />
          </div>
          <div className="prayer-footer">
            <div className="prayer-footer-left">
              <FontAwesomeIcon id="prayer-heart-icon" icon={faHeart} />
              <FontAwesomeIcon id="prayer-thumbs-up-icon" icon={faThumbsUp} />
              <FontAwesomeIcon id="prayer-comment-icon" icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id="prayer-heart-icon" icon={faEllipsisH} />
          </div>
          <div className='prayer-input-container'>
            <div className='prayer-input-option'>
            <FontAwesomeIcon id="prayer-camera-icon" onClick={this.toggleAddPhoto} icon={faCamera} />
            </div>
            <input className='prayer-input-text'type='text' placeholder='Message'></input>
          </div>
        </div>
        <div className="prayer-wall-component-request">
          <div className="prayer-header">
            <div className="prayer-header-top">
              <FontAwesomeIcon id="prayer-user-icon" icon={faUser} />
              <div className="prayer-user">
                <h2>JT Liner</h2>
                <h3>
                  Prayer <span className="prayer-days-ago">5 Days Ago</span>
                </h3>
              </div>
              <FontAwesomeIcon id="prayer-users-icon" icon={faUsers} />
            </div>
            <div className="prayer-header-bottom">
              <div>&#9734; Answered &#9734;</div>
              <p>3 Days Ago</p>
            </div>
          </div>
          <div className="prayer-main">
            <p>Pray for this app!</p>
            <FontAwesomeIcon id="prayer-image-icon" icon={faImage} />
          </div>
          <div className="prayer-footer">
            <div className="prayer-footer-left">
              <FontAwesomeIcon id="prayer-heart-icon" icon={faHeart} />
              <FontAwesomeIcon id="prayer-thumbs-up-icon" icon={faThumbsUp} />
              <FontAwesomeIcon id="prayer-comment-icon" icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id="prayer-heart-icon" icon={faEllipsisH} />
          </div>
          <div className='prayer-input-container'>
            <div className='prayer-input-option'>
            <FontAwesomeIcon id="prayer-camera-icon" onClick={this.toggleAddPhoto} icon={faCamera} />
            </div>
            <input className='prayer-input-text'type='text' placeholder='Message'></input>
          </div>
        </div>
        <div className="prayer-wall-component-request">
          <div className="prayer-header">
            <div className="prayer-header-top">
              <FontAwesomeIcon id="prayer-user-icon" icon={faUser} />
              <div className="prayer-user">
                <h2>JT Liner</h2>
                <h3>
                  Prayer <span className="prayer-days-ago">5 Days Ago</span>
                </h3>
              </div>
              <FontAwesomeIcon id="prayer-users-icon" icon={faUsers} />
            </div>
            <div className="prayer-header-bottom">
              <div>&#9734; Answered &#9734;</div>
              <p>3 Days Ago</p>
            </div>
          </div>
          <div className="prayer-main">
            <p>Pray for this app!</p>
            <FontAwesomeIcon id="prayer-image-icon" icon={faImage} />
          </div>
          <div className="prayer-footer">
            <div className="prayer-footer-left">
              <FontAwesomeIcon id="prayer-heart-icon" icon={faHeart} />
              <FontAwesomeIcon id="prayer-thumbs-up-icon" icon={faThumbsUp} />
              <FontAwesomeIcon id="prayer-comment-icon" icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id="prayer-heart-icon" icon={faEllipsisH} />
          </div>
          <div className='prayer-input-container'>
            <div className='prayer-input-option'>
            <FontAwesomeIcon id="prayer-camera-icon" onClick={this.toggleAddPhoto} icon={faCamera} />
            </div>
            <input className='prayer-input-text'type='text' placeholder='Message'></input>
          </div>
        </div>

      </div>
      </>
    );
  }
}
