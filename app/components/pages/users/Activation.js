import React, { Component } from 'react';
import {browserHistory} from "react-router";
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      message: ""
    }
  },

  componentDidMount() {

    let url = "/api/auth/activate";
    let payload = {
      nonce: this.props.query.nonce,
      userId: this.props.query.userId
    }
    axios.post(url, payload)
      .then(response => {
        this.setState({message: response.data.message});
        browserHistory.push("/auth/login");
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

  },

  render() {
    return (
        <div>
          <h3>Activate account</h3>

          <MessageBox message={this.state.message} />

        </div>
    );
  }
});
