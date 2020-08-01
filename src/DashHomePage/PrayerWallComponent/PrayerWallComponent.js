import React, { Component } from 'react'
import './PrayerWallComponent.css'

export default class PrayerWallComponent extends Component {
  render() {
    return (
      <div className="Prayer-Wall-Component">
          <div className="prayer-wall-component-requests">
            <div className="prayer-wall-component-request">
              <div className="prayer-wall-component-prayer">Prayer Request #1</div>
            </div>
            <div className="prayer-wall-component-request">
              <div className="prayer-wall-component-prayer">Prayer Request #2</div>
            </div>
            <div className="prayer-wall-component-request">
              <div className="prayer-wall-component-prayer">Prayer Request #3</div>
            </div>
            <div className="prayer-wall-component-request">
              <div className="prayer-wall-component-prayer">Prayer Request #4</div>
            </div>
            <div className="prayer-wall-component-request">
              <div className="prayer-wall-component-prayer">Prayer Request #5</div>
            </div>
          </div>
        </div>
    )
  }
}
