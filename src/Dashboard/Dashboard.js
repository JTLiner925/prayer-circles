import React, { Component } from "react";
import { Route } from "react-router-dom";
import config from '../config'
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
  static defaultProps = {
    userId: "",
    groupId: "",
    eventId: "",
  };
  state={
    passage: "",
    users: [],
    groups: [],
    events: [],
    userId: "",
    groupId: "",
    eventId: "",
    error: null,
    needed: [],
  }
  setPassage = (passage) => {
    this.setState({
      passage,
      error: null,
    });
  };

  componentDidMount() {
    let i = window.location.search;
    let x = new URLSearchParams(i);
    let eventId;

    for (let [key, value] of x) {
      if (key === "eventId") {
        eventId = value;
      }
      this.setState({
        [key]: value,
      });
    }

    //call api for data to display in dashboard
    this.setState({
      eventMessage: "",
      
    });
    Promise.all([
      fetch(`${config.HOST}/api/users`, {
        headers: {
          "Content-Type": "application/json",
        },

        method: "GET",
      }),
      fetch(`${config.HOST}/api/groups`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        method: "GET",
      }),
      fetch(`${config.HOST}/api/events`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        method: "GET",
      }),
      fetch(`${config.HOST}/api/needed`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        method: "GET",
        // body: JSON.stringify({ event_id: eventId }),
      }),
    ])
      .then(([userRes, groupRes, eventRes, needRes]) => {
        return Promise.all([
          userRes.json(),
          groupRes.json(),
          eventRes.json(),
          needRes.json(),
        ]);
      })
      .then(([users, groups, events, needed]) => {
        
        let userId = users.find(
          (user) => user.first_name === window.localStorage.getItem("userName")
        );
       
        this.setState({
          users: users,
          groups: groups,
          events: events,
          userId: userId.id,
          needed: needed,
          eventId: eventId,
        });
        //maintain bible passage even if page refreshes
        this.handleBiblePassage(this.state.eventId);
        
      })
      .catch((error) => {
        this.setState({ error });
      });
  }
handleBiblePassage = (eventId) => {
    //bible api call
    let selectedEvent = this.state.events.find((event) => {
      return event.id.toString() == eventId;
    });
    if (selectedEvent) {
      let url = new URL(`${config.API_ENDPOINT}text/`);
      url.searchParams.set("q", selectedEvent.bible_passage);
      url.searchParams.set("include-passage-reference", false);
      url.searchParams.set("include-verse-number", true);
      url.searchParams.set("include-first-verse-number", false);
      url.searchParams.set("include-footnotes", true);
      url.searchParams.set("include-footnote-body", false);
      url.searchParams.set("include-heading", false);
      url.searchParams.set("include-short-copyright", true);
      url.searchParams.set("indent-using", "tab");
      const options = {
        method: "GET",

        headers: {
          Authorization: `Token ${config.API_KEY}`,
        },
      };
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong, please try again later.");
          }
          return res.json();
        })
        .then((passage) => {
          this.setPassage(passage);
          this.setState({
            eventId: eventId,
          });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  }; 
  resetError = () => {
    //reset error message when I leave page
    this.setState({
      eventMessage: "",
    });
  };
  createGroup = (formData) => {
    //add group to api
    fetch(`${config.HOST}/api/groups/creategroup`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            return Promise.reject(new Error(data.error.message));
          });
        } else {
          return res.json();
        }
      })
      .then((resData) => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        this.setState({ createMessage: error.message });
      });
  };
  pushNeededItems = (id, neededItems) => {
    fetch(`${config.HOST}/api/needed/add-item`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ id, neededItems }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createEvent = (formData) => {
    //add event for group
    fetch(`${config.HOST}/api/events/createevent`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            return Promise.reject(new Error(data.error.message));
          });
        } else {
          return res.json();
        }
      })
      .then((resData) => {
        this.pushNeededItems(resData.eventId, formData.needed_items);
      })
      .catch((error) => {
        this.setState({ eventMessage: error.message });
      });
  };

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
        <Route
          path="/add-group"
          render={() => {
            return (
              <AddGroupPage
                createMessage={this.state.createMessage}
                message={this.state.message}
                groups={this.state.groups}
                onCreateGroup={this.createGroup}
                // onJoinGroup={this.joinGroup}
              ></AddGroupPage>
            );
          }}
        />
        <Route path="/add-event" component={AddEventPage} />
        <Route
          path="/createevent"
          render={() => {
            return (
              <AddEventPage
                resetError={this.resetError}
                eventMessage={this.state.eventMessage}
                groups={this.state.groups}
                userId={this.state.userId}
                onCreateEvent={this.createEvent}
                // onHandleHam={this.HamNavPage}
              ></AddEventPage>
            );
          }}
        />
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
