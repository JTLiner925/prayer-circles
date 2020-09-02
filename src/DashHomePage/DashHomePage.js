import React, { Component } from "react";
import EventSelectComponent from './EventSelectComponent/EventSelectComponent'
import PrayerWallComponent from'./PrayerWallComponent/PrayerWallComponent'
import "./DashHomePage.css";

export default class DashHomePage extends Component {
  render() {
    return (
      <div className="DashHomePage" onClick={this.props.onHandleHam}>
        <EventSelectComponent />       
        <div className='dash-prayer-container'>
        <PrayerWallComponent 
        prayers = {this.props.prayers}
        groupUsers = {this.props.groupUsers}
        userId = {this.props.userId}
        users = {this.props.users}
        groups = {this.props.groups}
        groupId = {this.props.groupId}
        myGroupPhotos={this.props.myGroupPhotos}
        />
        
        </div>
     
        
      </div>
    );
  }
}
