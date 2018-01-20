import React, { Component } from 'react';
import {Link} from "react-router";
import moment from "moment";

import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      date: "",
      time: "",
      food: "",
      kcal: "",
      user: "",
      status: "EDIT",
      message: ""
    };
  },

  handleSubmit() {

    //validate fields

    alert(JSON.stringify(this.state))


  },

  handleReset() {

    this.setState({
      date: "",
      time: "",
      food: "",
      kcal: "",
      user: "",
      status: "EDIT",
      message: ""
    });

  },

  render() {
    return (
        <tr>
          <td>
            <input type="date" onChange={event => this.setState({date: event.target.value})} />
          </td>
          <td>
            <input type="time" onChange={event => this.setState({time: event.target.value})} />
          </td>
          <td>
            <input type="text" onChange={event => this.setState({food: event.target.value})} />
          </td>
          <td>
            <input type="text" onChange={event => this.setState({kcal: event.target.value})} />
          </td>
          
          <td>
            <MessageBox message={this.state.message}/>
            <br/>
            <div className="btn blue" onClick={this.handleSubmit}>Submit</div>
            <br/>
            <div className="btn red" onClick={this.handleReset}>Reset</div>
          </td>
        </tr>
    );
  }
});

/*
issues:
1) why is MessageBox not rendered?
2) why is onChange not triggered?

<p contentEditable={true} onChange={event => alert("Hello")}>
            {this.state.date}
            </p>


*/