import React, { Component } from 'react';
import Grid from './Grid'


class GamePage extends Component {
  state = {
    data: null
  };


  componentDidMount() {
    this.callBackendAPI(this.props.match.params.gameid)
      .then(res => this.setState({ data: res.hello}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async (id) => {
    const response = await fetch('/games/' + id);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {
    return (
      <div className="GamePage">
        <p>{this.state.data}</p>
        <Grid />
      </div>
    );
  }
}

export default GamePage;
