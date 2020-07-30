import React, { Component } from 'react'
import './AddGroupPage.css'

export default class AddGroupPage extends Component {
  render() {
    return (
      <div className="AddGroupPage">
        <h2>Select Group</h2>
        <div className="add-group-groups-slide">
          <div className="add-group-group">
            <div>Group #1</div>
          </div>
          <div className="add-group-group">
            <div>Group #2</div>
          </div>
          <div className="add-group-group">
            <div>Group #3</div>
          </div>
          <div className="add-group-group">
            <div>Add Group</div>
          </div>
        </div>
        <div className="add-group-form">
          <div className="add-group-request">
            <div className='add-group-text'>Add/Edit Group</div>
          </div>
        </div>
      </div>
    );
  }
}
