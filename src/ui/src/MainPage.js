import React, { Component } from 'react';
import './MainPage.css';
import Grid from './Grid'


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
    console.log('hi')
    const response = await fetch('/games/123');
    const body = await response.json();

    console.log(body)
    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {
    return (
      <div className="MainPage">
        <p>{this.state.data}</p>
        <Grid />
      </div>
    );
  }
}

export default MainPage;
