import React from "react";
import "./EventSelectComponent.css";
import { Link } from "react-router-dom";

export default function EventSelectComponent() {
  return (
    <div className="Event-Select-Component">
      <Link className="event-select-view" to="/events">
        View Events
      </Link>
      <Link className="event-select-add" to="/add-event">
        Add Event
      </Link>
    </div>
  );
}
