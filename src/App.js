import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {[
          "/dashboard",
          "/groups",
          "/events",
          "/chat",
          "/invite",
          "/add-group",
          "/add-event",
          "/add-prayer",
          "/settings",
        ].map((path) => (
          <Route key={path} path={path} component={Dashboard} />))}
      </main>
    );
  }
}

export default withRouter(App);
