import React, { Component } from 'react';
import {Link, browserHistory} from "react-router";
import moment from "moment";
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      user: "",
      date: "",
      time: "",
      food: "",
      kcal: "",
      status: "EDITING",
      message: ""
    };
  },

  handleSubmit() {

    //validate fields
    if (this.state.date == "" || this.state.time == "" || this.state.food == "") {
      this.setState({message: "Incomplete information"});
      return;
    }

    //loading status, disable all fields, display loading message
    this.setState({
      message: "Saving record...",
      status: "LOADING"
    });

    //create meal object
    let mealObj = {
      user: this.state.user,
      date: this.state.date,
      time: this.state.time,
      food: this.state.food,
      kcal: this.state.kcal
    }

    //post to backend
    axios.post("/api/meals", mealObj, {headers: {token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        //refresh page
        this.handleReset();
        this.props.handleCreateRefresh(mealObj);
      })
      .catch((err) => {
        this.setState({
          message: err.response.status + ": " + err.response.data.message,
          status: "EDITING"
        });
      });

  },

  handleReset() {
    this.setState({message: ""});
    let newLineFields = document.getElementsByClassName("newLineField");
    for (let i = 0; i < newLineFields.length; i++) {
      newLineFields[i]["value"] = "";
    }
  },

  render() {
    return (
        <tr>
          <td>
            <input type="text" className="newLineField" disabled={this.state.status == "LOADING" ? true : false} onChange={event => this.setState({user: event.target.value})} />
          </td>
          <td>
            <input type="date" className="newLineField" disabled={this.state.status == "LOADING" ? true : false} onChange={event => this.setState({date: event.target.value})} />
          </td>
          <td>
            <input type="time" className="newLineField" disabled={this.state.status == "LOADING" ? true : false} onChange={event => this.setState({time: event.target.value})} />
          </td>
          <td>
            <input type="text" className="newLineField" disabled={this.state.status == "LOADING" ? true : false} onChange={event => this.setState({food: event.target.value})} />
          </td>
          <td>
            <input type="number" className="newLineField" disabled={this.state.status == "LOADING" ? true : false} onChange={event => this.setState({kcal: event.target.value})} />
          </td>
          
          <td>
            <MessageBox message={this.state.message}/>
            <input type="button" disabled={this.state.status == "LOADING" ? true : false} value="Submit" onClick={this.handleSubmit}/>
            <input type="button" disabled={this.state.status == "LOADING" ? true : false} value="Reset" onClick={this.handleReset}/>
          </td>
        </tr>
    );
  }
});

/*

*/