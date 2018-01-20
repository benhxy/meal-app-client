import React, { Component } from 'react';
import {Link} from "react-router";
import moment from "moment";

const DISPLAY = 0;
const EDIT = 1;
const LOADING = 2;

export default React.createClass({

  getInitialState() {
    return {
      date: "",
      time: "",
      food: "",
      kcal: "",
      user: "",
      status: EDIT,
      message: ""
    };
  },

  handleSubmit() {

  },

  render() {
    return (
        <tr>
          <td><input type="date" onChange={event => this.setState({date: event.target.value})}>{this.state.date}</input></td>
          <td>{this.state.time}</td>
          <td>{this.state.food}</td>
          <td>{this.state.kcal}</td>
          <td>{this.state.user}</td>
          <td>
            <div className="btn blue" onclick={this.handleSubmit}>Submit</div>
            <span> </span>
            <div className="btn red">Reset</div>
          </td>
        </tr>
    );
  }
});
