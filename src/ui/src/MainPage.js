import React, { Component } from 'react';
import './MainPage.css';


class MainPage extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.hello}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/games/123');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {
    return (
      <div className="MainPage">
      </div>
    );
  }
}

export default MainPage;
