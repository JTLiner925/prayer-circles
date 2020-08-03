import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../Header/Header";
import ComponentGroupList from '../ComponentGroupList/ComponentGroupList'
import DashHomePage from "../DashHomePage/DashHomePage";
import EventListPage from "../EventListPage/EventListPage";
import ChatPage from "../ChatPage/ChatPage";
import InvitePage from "../InvitePage/InvitePage";
import AddGroupPage from "../AddGroupPage/AddGroupPage";
import AddEventPage from "../AddEventPage/AddEventPage";
import AddPrayerPage from "../AddPrayerPage/AddPrayerPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import Footer from "../Footer/Footer";
import "./Dashboard.css";

export default class Dashboard extends Component {
  render() {
    return (
      <main className="Dashboard">
        {[
          "/dashboard",
          "/events",
          "/chat",
          "/invite",
          "/add-group",
          "/add-event",
          "/add-prayer",
          "/settings",
        ].map((path) => (
          <Route key={path} path={path} component={Header} />
        ))}
        {[
          "/dashboard",
          "/events",
          "/chat",
          "/invite",
          "/add-group",
          "/add-event",
          "/add-prayer",
        ].map((path) => (
          <Route key={path} path={path} component={ComponentGroupList} />
        ))}
        <Route path="/dashboard" component={DashHomePage} />
        <Route path="/events" component={EventListPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/invite" component={InvitePage} />
        <Route path="/add-group" component={AddGroupPage} />
        <Route path="/add-event" component={AddEventPage} />
        <Route path="/add-prayer" component={AddPrayerPage} />
        <Route path="/settings" component={SettingsPage} />
        {[
          "/dashboard",
          "/events",
          "/chat",
          "/invite",
          "/add-group",
          "/add-event",
          "/add-prayer",
          "/settings",
        ].map((path) => (
          <Route key={path} path={path} component={Footer} />
        ))}
      </main>
    );
  }
}
