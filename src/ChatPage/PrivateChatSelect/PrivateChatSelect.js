import React, { Component } from 'react';
import girl1 from '../../Images/girl1.jpg';
import thinker from '../../Images/thinker.jpg';
import guy1 from '../../Images/guy1.jpg';
import guy2 from '../../Images/guy2.jpg';
import woman1 from '../../Images/woman1.jpg';
import './PrivateChatSelect.css';

export default class PrivateChatSelect extends Component {
  state = {
    groups: [],
  }

  render() {
    const { users = [], userId,  profilePic } = this.props;
    // const { groups = [] } = this.props;
    const groupUsers = []
      .concat(this.state.groups)
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const sortUsers = [].concat(users).sort((a, b) => (a.id > b.id ? 1 : -1));
    // console.log(groupUsers, this.state)
    // console.log(sortUsers)
    return (
      <div className='Private-Chat-Select'>
        <div className='chat-people'>
          {/* <div className='chat-person'>
            <img className='person-image' src={guy1} alt='guy' />
          </div> */}
          {users.map((u) => {
            console.log(u, this.props.groupUsers)
            let picture;
            if(Object.keys(this.props.groupUsers).length > 0){
              picture = this.props.groupUsers[u.first_name].profilePic
            }
            // if(u.user_ids == userId){
            //   console.log(u)
              return (
                <div key={u.id} className='chat-person'>
                <img className='person-image' src={picture ? picture : null} alt='girl' />
              </div>)
            // }
            
          })}
        </div>
      </div>
    );
  }
}
