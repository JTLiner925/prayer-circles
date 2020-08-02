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
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import "./PrayerWallComponent.css";

export default class PrayerWallComponent extends Component {
  render() {
    return (
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
        </div>
        <div className="prayer-wall-component-request">
          <div className="prayer-header">
            <div className="prayer-header-top">
              <FontAwesomeIcon id="prayer-user-icon" icon={faUser} />
              <div className="prayer-user">
                <h2>Christy Liner</h2>
                <h3>
                  Prayer <span className="prayer-days-ago">2 Days Ago</span>
                </h3>
              </div>
              <FontAwesomeIcon id="prayer-users-icon" icon={faUsers} />
            </div>
            {/* <div className="prayer-header-bottom">
              <div>&#9734; Answered &#9734;</div>
              <p>3 Days Ago</p>
            </div> */}
          </div>
          <div className="prayer-main">
            <p>My husband drives me crazy!</p>
          </div>
          <div className="prayer-footer">
            <div className="prayer-footer-left">
              <FontAwesomeIcon id="prayer-heart-icon" icon={faHeart} />
              <FontAwesomeIcon id="prayer-thumbs-up-icon" icon={faThumbsUp} />
              <FontAwesomeIcon id="prayer-comment-icon" icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id="prayer-heart-icon" icon={faEllipsisH} />
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
            <FontAwesomeIcon id="prayer-images-icon" icon={faImages} />

          </div>
          <div className="prayer-footer">
            <div className="prayer-footer-left">
              <FontAwesomeIcon id="prayer-heart-icon" icon={faHeart} />
              <FontAwesomeIcon id="prayer-thumbs-up-icon" icon={faThumbsUp} />
              <FontAwesomeIcon id="prayer-comment-icon" icon={faCommentAlt} />
            </div>
            <FontAwesomeIcon id="prayer-heart-icon" icon={faEllipsisH} />
          </div>
        </div>
      </div>
    );
  }
}
