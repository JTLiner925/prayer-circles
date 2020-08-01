import React, { Component } from 'react'
import './PrayerPraiseComponent.css'

export default class PrayerPraiseComponent extends Component {
  render() {
    return (
      <div className="Prayer-Praise-Component">
      <button className="prayer-button">
        Prayer
      </button>
      <h2>Or</h2>
      <button className="praise-button">
        Praise
      </button>
    </div>
    )
  }
}
