import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ComponentGroupList.css";

export default class ComponentGroupList extends Component {
  render() {
    return (
      <div className="Group-List-Slider">
        <div className="group-list-slides">
          <div className="group-list-slide">
            <div>Group #1</div>
          </div>
          <div className="group-list-slide">
            <div>Group #2</div>
          </div>
          <div className="group-list-slide">
            <div>Group #3</div>
          </div>
          <div className="group-list-slide">
            <div>Group #4</div>
          </div>
          <div className="group-list-slide">
            <div>Group #5</div>
          </div>
        </div>
        <div className="add-group-section">
          <div className="add-group-slide">
            <Link className="dash-home-add-group" to="/add-group">
              Add Group
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
