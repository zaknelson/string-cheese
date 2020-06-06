import React, { Component } from 'react';
import './App.css';
import Grid from './Grid'


class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.hello}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/games');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.data}</p>
        <Grid />
      </div>
    );
  }
}

export default App;
