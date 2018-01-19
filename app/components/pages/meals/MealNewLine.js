import React, { Component } from 'react';
import {Link} from "react-router";
import moment from "moment";

export default React.createClass({

  getInitialState() {
    return {
      date: "XXX",
      time: "",
      food: "",
      kcal: "",
      user: "",
      status: "EDIT",
      message: ""
    };
  },

  render() {
    return (
        <tr>
          <td><div contenteditable="true" onChange={event => this.setState({date: event.target.value})}>{this.state.date}</div></td>
          <td>{this.state.time}</td>
          <td>{this.state.food}</td>
          <td>{this.state.kcal}</td>
          <td>
            <div className="btn blue">Submit</div>
            <span> </span>
            <div className="btn red">Reset</div>
          </td>
        </tr>
    );
  }
});
