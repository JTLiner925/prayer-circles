import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrayingHands, faChild } from "@fortawesome/free-solid-svg-icons";
import "./PrayerPraiseComponent.css";

export default class PrayerPraiseComponent extends Component {
  render() {
    return (
      <div className="Prayer-Praise-Component">
        <button className="prayer-button">
          <FontAwesomeIcon id="prayer-hands-icon" icon={faPrayingHands} />
          <p>Prayer</p>
        </button>
        <h2>Or</h2>
        <button className="praise-button">
          <FontAwesomeIcon id="prayer-hands-icon" icon={faChild} />
          <p>Praise</p>
        </button>
      </div>
    );
  }
}
