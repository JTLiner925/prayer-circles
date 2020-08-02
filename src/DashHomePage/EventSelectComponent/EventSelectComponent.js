import React from "react";
import "./EventSelectComponent.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function EventSelectComponent() {
  return (
    <div className="Event-Select-Component">
      <div className="event-select-view">
        <Link  to="/events">
          <FontAwesomeIcon id="event-calendar-icon" icon={faCalendarAlt} />
          <p>View Events</p>
        </Link>
        </div>
        <div className="event-select-add">
          <Link to="/add-event">
            <FontAwesomeIcon id="add-event-icon" icon={faCalendarPlus} />
          <p>Add Event</p>
          </Link>
        </div>
      
    </div>
  );
}
