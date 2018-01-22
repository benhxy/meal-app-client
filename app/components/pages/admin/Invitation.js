import React, { Component } from 'react';
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      email: "",
      message: ""
    }
  },

  handleSubmit() {


    let url = "/api/users/invite";
    axios.post(url, {email: this.state.email}, {headers: {token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        this.setState({message: response.data.message});
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

  },

  render() {
    return (
        <div>
          <h3>Send invitation</h3>

          <MessageBox message={this.state.message} />

          <input type="email" name="email" onChange={event => this.setState({email: event.target.value})} />

          <input type="button" value= "Send invitation email" onClick={this.handleSubmit}/>

        </div>
    );
  }
});
