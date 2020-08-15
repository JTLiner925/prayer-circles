import React, { Component } from 'react'
import config from '../config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import './InvitePage.css'

export default class InvitePage extends Component {
  state = {
    invite_friends: [],
    invite_value:'',

  }
  submitHandler = (e) => {
    // this.props.resetError();
    this.setState({
      error: "",
    });
    e.preventDefault();

    let checkVerse = this.state.bible_passage;

    let url = new URL(`${config.API_ENDPOINT}text/`);
    url.searchParams.set("q", checkVerse);
    url.searchParams.set("include-passage-reference", true);

    const options = {
      method: "GET",

      headers: {
        Authorization: `Token ${config.API_KEY}`,
      },
    };

    fetch(url.href, options)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.passages.length === 0) {
          //fix bible passages
          throw new Error(
            'Please check Bible passage, write out in long form. i.e. "Matthew 28:18-20"'
          );
        }
        if (
          //select group before submitting
          this.state.group_name === "Select Group" ||
          this.state.group_name === undefined
        ) {
          throw new Error("Must Select Group");
        }
        this.props.onCreateEvent(this.state);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };
  changeHandler = (e) => {
    // this.props.resetError();
    if (e.target.name === "group_name") {
      let element = document.querySelector(
        `#${e.target.value.split(" ").join("_")}`
      );
      let groupid;
      groupid = element.getAttribute("groupid");

      this.setState({
        [e.target.name]: e.target.value,
        groupid: groupid,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  onChangeInviteValue = (event) => {
    // this.props.resetError();
    this.setState({ invite_value: event.target.value });
  };
  addInviteHandler = () => {
    this.setState((state) => {
      const invite_friends = [...state.invite_friends, state.invite_value];

      return {
        invite_friends,
        invite_value: "",
      };
    });
  };
  removeInviteHandler = (i) => {
    this.setState({
      invite_friends: this.state.invite_friends.filter((friend, j) => i !== j),
    });
  };
  render() {
    return (
      <div className="InvitePage">
        <div className='invite-icons'>
          <div className='invite-user'><FontAwesomeIcon 
          id="invite-user-icon"
          
          icon={faUser}
        /></div>
          <div className='invite-arrow'><FontAwesomeIcon 
          id="invite-users-icon"
          
          icon={faArrowCircleRight}
        /></div>
          <div className='invite-users'><FontAwesomeIcon 
          id="invite-users-icon"
          
          icon={faUsers}
        /></div>
        </div>
        <div className="invite-wall">
          <div className="invite-bubble">
          <div className="invite-header">
            <div className="invite-header-top">
              <FontAwesomeIcon id="invite-header-user-icon" icon={faUser} />
              <FontAwesomeIcon id="invite-header-users-icon" icon={faUsers} />
            </div>
          </div>
       
            <div className='invite-bubble-text'>Invite your friends!</div>
            <form className='invite-form'>
              <label>
              <input 
                className='invite-input' 
                type='email'
                placeholder='johnDoe@gmail.com'
                name='invite_email'
                value={this.state.invite_value}
                onChange={this.onChangeInviteValue}
                ></input>
              <button 
                className='invite-add-more'
                type='button'
                onClick={this.addInviteHandler}
                disabled={!this.state.invite_value}>+ add</button>
              </label>
              <ul className=" list-items">
                {(this.state.invite_friends || []).map((friend, index) => {
                  return (
                    <div key={index} className="list-div" name="invite_friends">
                      <button
                        id="delete-button"
                        onClick={() => this.removeInviteHandler(index)}
                      >
                        X
                      </button>
                      <li name="invite_friends">{friend}</li>
                    </div>
                  );
                })}
              </ul>
              <button className='invite-form-submit' type='submit' >Invite</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
