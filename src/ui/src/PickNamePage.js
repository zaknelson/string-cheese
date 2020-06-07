import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';

import './PickNamePage.css';

class PickNamePage extends Component {
  state = {
    data: null,
  };

  componentDidMount() {}

  pickName = async () => {
    const response = await fetch(
      '/games/' + this.props.match.params.gameid + '/players',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.state.name }),
      }
    );

    const body = await response.json();
    this.setState({
      redirect: true,
      id: body.id,
    });
  };

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={
            '/games/' +
            this.props.match.params.gameid +
            '/players/' +
            this.state.id
          }
        />
      );
    }
  };

  render() {
    return (
      <div className="PickNamePage page">
        {this.renderRedirect()}
        <form noValidate autoComplete="off">
          <div className="pickNameContainer">
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={this.setName}
            />
            <div className="pickNameButton">
              <Button
                variant="contained"
                color="primary"
                onClick={this.pickName}
              >
                Pick Name
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PickNamePage;
