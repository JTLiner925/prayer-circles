import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <Link className='dash-home-add-group' to='/add-group'>Add Group</Link>
          </div>
        </div>
        <div className="dash-home-event-banner">
        <Link className='dash-home-event' to='/events'>View Events</Link>
          <Link className='dash-home-event' to='/add-event'>Add Event</Link>

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
