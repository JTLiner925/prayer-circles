import React, { Component } from "react";
import EventSelectComponent from './EventSelectComponent/EventSelectComponent'
import PrayerWallComponent from'./PrayerWallComponent/PrayerWallComponent'
import "./DashHomePage.css";

export default class DashHomePage extends Component {
  render() {
    return (
      <div className="DashHomePage">
        {/* <div className='dash-container'> */}
        <div className='dash-event-container'>
        <EventSelectComponent />
        </div>
        <div className='dash-prayer-container'>
        <PrayerWallComponent />
        </div>
     
        {/* </div> */}
      </div>
    );
  }
}
