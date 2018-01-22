import React, { Component } from 'react';
import {Link} from "react-router";
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass(  {

   getInitialState() {
    return {
      name: "",
      email: "",
      password: "",
      expectedKcal: "",
      role: "",
      status: "EDITING",
      message: "Create user without email verification"
    }
  },

  handleSubmit() {
    //validate fields
    if (this.state.name == "" || this.state.email == "" || this.state.role == "" || this.state.password == "") {
      this.setState({message: "Please enter at least name, email, role, and password"});
      return;
    }
    if (this.state.role != "admin" && this.state.role != "user" && this.state.role != "userManager") {
      this.setState({message: "Role must be admin, user or userManager"});
      return;
    }
    //lock fields
    this.setState({status: "LOADING", message: "Saving profile..."});

    //create payload
    let url = "/api/users";
    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      expectedKcal: this.state.expectedKcal,
    }
    console.log(payload);

    axios.post(url, payload, {headers:{token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        this.setState({
          message: response.data.message
        });

        //unlock fields
        this.handleReset();
        this.setState({message: "Record created", status: "EDITING"});
      })
      .catch((err) => {
        this.setState({message: err.response.status + ": " + err.response.data.message});
        //unlock fields
        this.setState({status: "EDITING", message: ""});
      });

  },

  handleReset() {
    let localFields = document.getElementsByClassName("localField");
    for (let i = 0; i < localFields.length; i++) {
      localFields[i]["value"] = "";
    }
  },

  render() {

    return (
        <div>
          <h3>User profile</h3>

          <MessageBox message={this.state.message}/>

          <div>
            <label>Local name: </label>
            <input
              className="localField"
              type="text"
              disabled={this.state.status=="EDITING" ? false : true}
              onChange={event => this.setState({name: event.target.value})} />

            <br/>
            <label>Email: </label>
            <input
              className="localField"
              type="email"
              disabled={this.state.status=="EDITING" ? false : true}
              onChange={event => this.setState({email: event.target.value})} />

            <br/>
            <label>Password: </label>
            <input
              className="localField"
              type="password"
              disabled={this.state.status=="EDITING" ? false : true}
              onChange={event => this.setState({password: event.target.value})} />
            <br/>

            <label>Planned daily energy intake: </label>
            <input
              className="localField"
              type="number"
              disabled={(this.state.status=="EDITING" ? false : true)}
              onChange={event => this.setState({expectedKcal: event.target.value})} />
            <br/>

            <label>User role: </label>
            <input
              className="localField"
              type="text"
              disabled={(this.state.status=="EDITING" ? false : true)}
              onChange={event => this.setState({role: event.target.value})} />
            <br/>
          </div>

          <input
            type="button"
            value="Save"
            onClick={this.handleSubmit} />
          <input
            type="button"
            value="Reset"
            onClick={this.handleReset} />
          <br/>

        </div>
    );
  }
});


/*


*/