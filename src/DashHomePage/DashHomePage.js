import React, { Component } from "react";
import "./DashHomePage.css";

export default class DashHomePage extends Component {
  render() {
    return (
      <div className="DashHomePage">
        <div className="dash-home-group-slide">
          <div className="dash-home-group">
            <div>Group #1</div>
          </div>
          <div className="dash-home-group">
            <div>Group #2</div>
          </div>
          <div className="dash-home-group">
            <div>Group #3</div>
          </div>
          <div className="dash-home-group">
            <div>Group #4</div>
          </div>
        </div>
        <div className="dash-home-event-banner">
          <div className='dash-home-event'>View Events</div>
          <div className='dash-home-event'>Create Event</div>
        </div>
        <div className="dash-home-prayer-wall">
          <div className="dash-home-prayer-request">
            <div className='dash-home-prayer'>Prayer Request #1</div>
          </div>
          <div className="dash-home-prayer-request">
            <div className='dash-home-prayer'>Prayer Request #2</div>
          </div>
          <div className="dash-home-prayer-request">
            <div className='dash-home-prayer'>Prayer Request #3</div>
          </div>
        </div>
      </div>
    );
  }
}
