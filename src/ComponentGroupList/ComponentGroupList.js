import React, { Component } from "react";
import { Link } from "react-router-dom";
import church  from '../Images/church.jpg'
import communion from '../Images/communion.jpg'
import family1 from '../Images/family1.jpg'
import friends1 from '../Images/friends1.jpg'
import friends2 from '../Images/friends2.jpg'
import "./ComponentGroupList.css";

export default class ComponentGroupList extends Component {
  render() {
    return (
      <div className="Group-List-Slider">
        <div className="group-list-slides">
          <div className="group-list-slide">
            <img className='group-image' src={friends1} alt='Friends' />
            <div >Friends</div>
          </div>
          <div className="group-list-slide">
            <img className='group-image' src={communion} alt='Communion' />
            <div >Community Group</div>
          </div>
          <div className="group-list-slide">
            <img className='group-image' src={family1} alt='Family' />
            <div >Family</div>
          </div>
          <div className="group-list-slide">
            <img className='group-image' src={church} alt='Church' />
            <div >Church Group</div>
          </div>
          <div className="group-list-slide">
            <img className='group-image' src={friends2} alt='Friends' />
            <div >Friends</div>
          </div>
        </div>
        <div className="add-group-section">
          <div className="add-group-slide">
            {/* <Link className="dash-home-add-group" to="/add-group"> */}
            <img className='add-group-image' src={friends2} alt='Friends' />
            
            <div >Add Group</div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    );
  }
}
