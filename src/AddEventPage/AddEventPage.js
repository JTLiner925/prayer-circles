import React, { Component } from 'react';
import config from '../config';
import friends1 from '../Images/friends1.jpg';
import './AddEventPage.css';

export default class AddEventPage extends Component {
  state = {
    event: '',
    group: '',
    passage: '',
    needed_items: [],
    item_value: '',
    question: [],
    question_value: '',
    selectedGroup: '',
  };

  setEvent = (event, group) => {
    this.setState({
      event,

      error: '',
    });
  };
  componentDidMount() {
    fetch(`${config.HOST}/api/events`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res.json();
      })
      .then((event) => {
        this.setState({
          event: event,
       
        });
        this.setEvent(event);
      })

      .catch((error) => {
        this.setState({ error });
      });
  }

  submitHandler = (e) => {
    // this.props.resetError();
    this.setState({
      error: '',
    });
    e.preventDefault();

    let checkVerse = this.state.bible_passage;

    let url = new URL(`${config.API_ENDPOINT}text/`);
    url.searchParams.set('q', checkVerse);
    url.searchParams.set('include-passage-reference', true);

    const options = {
      method: 'GET',

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
        // if (
        //   //select group before submitting
        //   this.state.group_name === 'Select Group' ||
        //   this.state.group_name === undefined
        // ) {
        //   throw new Error('Must Select Group');
        // }
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
    if (e.target.name === 'group_name') {
      let element = document.querySelector(
        `#${e.target.value.split(' ').join('_')}`
      );
      let groupid;
      groupid = element.getAttribute('groupid');

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
  onChangeItemValue = (event) => {
    // this.props.resetError();
    this.setState({ item_value: event.target.value });
  };
  onChangeQuestionValue = (event) => {
    // this.props.resetError();
    this.setState({ question_value: event.target.value });
  };
  addItemHandler = () => {
    this.setState((state) => {
      const needed_items = [...state.needed_items, state.item_value];

      return {
        needed_items,
        item_value: '',
      };
    });
  };
  removeItemHandler = (i) => {
    this.setState({
      needed_items: this.state.needed_items.filter((item, j) => i !== j),
    });
  };
  addQuestionHandler = () => {
    this.setState((state) => {
      const question = [...state.question, state.question_value];

      return {
        question,
        question_value: '',
      };
    });
  };
  removeQuestionHandler = (i) => {
    this.setState({
      question: this.state.question.filter((question, j) => i !== j),
    });
  };
  static getDerivedStateFromProps(props){
    return {groupid : props.groupId}
  }
  render() {
    let BackgroundImage = {
      backgroundImage: `url(${friends1})`,
    };
    const { events = [], userId } = this.props;
    const { groups = [], groupId } = this.props;

    
    return (
      <div className='AddEventPage' onClick={this.props.onHandleHam}>
        {/* <div className="add-event-event-banner">
          <Link className='add-event-event' to='/events'>View Events</Link>
          <h2>Or</h2>
          <Link className='add-event-event' to='/add-event'>Add Event</Link>
        </div> */}
        <form className='add-event-form' onSubmit={this.submitHandler}>
          <h2>Create New Event</h2>
          {groups.map((group) => {
            let selectedGroup = this.props.groupId;
            if (selectedGroup && selectedGroup == group.id) {

              return (
                <div key={group.id} className='add-event-header-top'>
                  <div
                    style={BackgroundImage}
                    className='event-group-icon'
                    name='group_name'
                  >
                    <div groupid={group.id}>{group.group_name}</div>
                  </div>
                </div>
              );
            }
          })}
          <label
            htmlFor='announcements'
            className='add-event-announcements-label'
          >
            <textarea
              placeholder='Announcements'
              id='announcements'
              name='announcements'
              className='add-event-announcements'
              onChange={this.changeHandler}
            ></textarea>
          </label>
          <label
            htmlFor='needed-items'
            className='add-event-needed-items-label'
          >
            <input
              placeholder='Needed Items'
              id='needed-items'
              className='add-event-needed-items'
              name='needed_items'
              type='text'
              value={this.state.item_value}
              onChange={this.onChangeItemValue}
            ></input>
            <button
              id='add-button'
              type='button'
              onClick={this.addItemHandler}
              disabled={!this.state.item_value}
            >
              +
            </button>
          </label>
          <ul className=' list-items'>
            {(this.state.needed_items || []).map((item, index) => {
              return (
                <div key={index} className='list-div' name='needed_items'>
                  <button
                    id='delete-button'
                    onClick={() => this.removeItemHandler(index)}
                  >
                    X
                  </button>
                  <li name='needed_items'>{item}</li>
                </div>
              );
            })}
          </ul>
          <div className='add-event-date-time-div'>
            <label htmlFor='date-input' className='add-event-date-label'>
              <input
                id='date-input'
                name='event_date'
                type='date'
                className='add-event-date'
                placeholder='Date'
                onChange={this.changeHandler}
                required
              ></input>
            </label>
            <label htmlFor='time-input' className='add-event-time-label'>
              <input
                className='add-event-time'
                placeholder='Time'
                type='time'
                id='time-input'
                name='event_time'
                onChange={this.changeHandler}
              ></input>
            </label>
          </div>

          <label
            htmlFor='lesson-title-input'
            className='add-event-lesson-label'
          >
            <input
              className='add-event-lesson'
              placeholder='Lesson Title'
              id='lesson-title'
              name='lesson_title'
              onChange={this.changeHandler}
              required
            ></input>
          </label>
          <label
            htmlFor='bible-passage-input'
            className='add-event-bible-passage-label'
          >
            <input
              className='add-event-bible-passage'
              placeholder='Bible Passage'
              id='bible-passage'
              name='bible_passage'
              onChange={this.changeHandler}
              required
            ></input>
          </label>
          <label htmlFor='question' className='add-event-question-label'>
            <input
              className='add-event-question'
              placeholder='Questions for passage'
              id='question'
              name='question'
              value={this.state.question_value}
              onChange={this.onChangeQuestionValue}
            ></input>
            <button
              id='add-button'
              type='button'
              onClick={this.addQuestionHandler}
              disabled={!this.state.question_value}
            >
              +
            </button>
          </label>
          <ul className='list-questions'>
            {(this.state.question || []).map((question, index) => {
              return (
                <div key={index} className='list-div'>
                  <button
                    id='delete-button'
                    onClick={() => this.removeQuestionHandler(index)}
                  >
                    X
                  </button>
                  <li name='question'>{question}</li>
                </div>
              );
            })}
          </ul>

          <div className='create-button'>
            <p className='error-alert'>{this.props.eventMessage}</p>
            <p className='error-alert'>{this.state.error}</p>
            {/* <button type="submit" className="create-event">
              Create Event
            </button> */}
            <button type='submit' className='add-event-button'>
              Add Event
            </button>
          </div>
        </form>
      </div>
    );
  }
}
