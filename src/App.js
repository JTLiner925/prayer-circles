import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    users: [],
  };
  register = (formData) => {
    //sign up for an account - feeds into login()
    formData.FileName = formData.profilePic.name;
    fetch(`${config.HOST}/api/users/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          return Promise.reject(new Error(data.error.message));
        });
      } else {
        return res.json();
      }
    })
      .then((resData) => {
        console.log(resData, formData)
        let userPic = `${resData.user.id}_${formData.profilePic.name}`;

        this.uploadFile(formData.profilePic, userPic );
        this.logIn(formData);
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  };
  uploadFile = (file, newFileName) => {
    let url;
    fetch(`${config.HOST}/api/getUrl`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name: newFileName, type: file.type, location: 'user-photo' }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        url = resData.url;
        console.log(url)
        let reader = new FileReader();
        console.log(reader)
        reader.addEventListener('loadend', (event) => {
          fetch(url, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': '*',
            },
            method: 'PUT',
            body: new Blob([reader.result], { type: file.type }),
          });
        });
        reader.readAsArrayBuffer(file);
      })
      .catch();
  };
  resetError = () => {
    this.setState({
      message: '',
    });
  };
  logIn = (formData) => {
    //logs into dashboard
    fetch(`${config.HOST}/api/users/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            return Promise.reject(new Error(data.error.message));
          });
        }
      })
      .then((userData) => {
        window.localStorage.setItem('token', userData.token);
        window.localStorage.setItem('userName', userData.userName);
        this.props.history.push('/dashboard');
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  };

  render() {
    return (
      <main className='App'>
        <Route
          exact
          path='/'
          render={() => {
            return <HomePage resetError={this.resetError}></HomePage>;
          }}
        />
        <Route
          path='/login'
          render={() => {
            return (
              <Login
                message={this.state.message}
                resetError={this.resetError}
                onLogin={this.logIn}
              ></Login>
            );
          }}
        />
        <Route
          path='/register'
          render={() => {
            return (
              <Register
              message={this.state.message}
                resetError={this.resetError}
                onRegister={this.register}
              ></Register>
            );
          }}
        />
        {[
          '/dashboard',
          '/events',
          '/chat',
          '/invite',
          '/add-group',
          '/add-event',
          '/add-prayer',
          '/settings',
        ].map((path) => (
          <Route key={path} path={path} component={Dashboard} />
        ))}
      </main>
    );
  }
}

export default withRouter(App);
