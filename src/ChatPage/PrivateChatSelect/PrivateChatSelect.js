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
    const { users = [], userId,  profilePic, groupId, groups } = this.props;
    // const { groups = [] } = this.props;
    const groupUsers = []
      .concat(this.state.groups)
      .sort((a, b) => (a.id > b.id ? 1 : -1));
    const sortUsers = [].concat(users).sort((a, b) => (a.id > b.id ? 1 : -1));
    let filteredUsers = []
    let selectedGroup =  groups.find((group) => {
      return group.id === parseInt(groupId)
      })
      if(selectedGroup){
        filteredUsers = users.filter((user) => {
          return selectedGroup.user_ids.includes(user.id.toString())
        })
      }
    
    // console.log(selectedGroup, filteredUsers, this.props)
    // console.log(sortUsers)
    return (
      <div className='Private-Chat-Select'>
        <div className='chat-people'>
          {/* <div className='chat-person'>
            <img className='person-image' src={guy1} alt='guy' />
          </div> */}
          {filteredUsers.map((u) => {
            // console.log(u, this.props.groupUsers)

            let picture;
            if(Object.keys(this.props.groupUsers).length > 0){
              if(this.props.groupUsers[u.first_name] && this.props.groupUsers[u.first_name].profilePic ){
                picture = this.props.groupUsers[u.first_name].profilePic
              } else {
                picture = null;
              }
              
            }
            // if(u.user_ids == userId){
            //   console.log(u)
              return (
                <div key={u.id} className='chat-person'>
                <img id='userid' className='person-image' src={picture ? picture : null} alt='user' />
              </div>)
            // }
            
          })}
        </div>
      </div>
    );
  }
}
