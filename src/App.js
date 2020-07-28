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
        <Route path="/dashboard" component={Dashboard} />
      </main>
    );
  }
}

export default withRouter(App);
