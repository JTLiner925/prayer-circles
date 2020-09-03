import React, { Component } from 'react';
import './PrivateChatSelect.css';

export default class PrivateChatSelect extends Component {
  state = {
    groups: [],
  }
 
  render() {
    const { users = [], userId,  profilePic, groupId, groups } = this.props;
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
    
    return (
      <div className='Private-Chat-Select'>
        <div className='chat-people'>
          
          {filteredUsers.map((u) => {

            let picture;
            if(Object.keys(this.props.groupUsers).length > 0){
              if(this.props.groupUsers[u.first_name] && this.props.groupUsers[u.first_name].profilePic ){
                picture = this.props.groupUsers[u.first_name].profilePic
              } else {
                picture = null;
              }
              
            }
              return (
                <div key={u.id} className='chat-person'>
                <img id='userid' className='person-image' src={picture ? picture : null} alt='user' />
              </div>)
          
            
          })}
        </div>
      </div>
    );
  }
}
