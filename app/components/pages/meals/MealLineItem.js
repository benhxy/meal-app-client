import React, { Component } from 'react';
import {Link} from "react-router";
import moment from "moment";

export default React.createClass({

  getInitialState() {
    return {
      date: this.props.item.date,
      time: this.props.item.time,
      food: this.props.item.food,
      kcal: this.props.item.kcal,
      user: this.props.item.user,
      status: "DISPLAY",
      message: ""
    };
  },

  render() {
    return (
        <tr>
          <td>{this.state.date}</td>
          <td>{this.state.time}</td>
          <td>{this.state.food}</td>
          <td>{this.state.kcal}</td>
          <td>
            <div className="btn blue">Edit</div>
            <span> </span>
            <div className="btn red">Delete</div>
            <span> </span>
            <div className="btn blue">Save</div>
          </td>
        </tr>
    );
  }
});
