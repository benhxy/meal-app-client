import React, { Component } from 'react';
import {Link} from "react-router";
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass(  {

   getInitialState() {
    return {
      name: "",
      password: "",
      role: "",
      loginFailCount: "",
      expectedKcal: "",
      message: ""
    }
  },

  componentDidMount() {

    let url = `/api/user?userId=` + this.props.params.id;
    axios.get(url, {headers:{token: localStorage.getItem("MealAppToken")}})
      .then((response) => {
        this.setState({message: JSON.stringify(response.data.user)});

        this.setState({
          name: response.data.user.name,
          password: response.data.message.password,
          role: response.data.message.role,
        });
      })
      .catch((err) => {
        this.setState({warning: err});
      });

  },

  getUserDetail(){
    let userId = this.props.params.id;
    console.log(userId);

    axios.get(`/api/user/${userId}`, {headers:{token: localStorage.getItem("RunAppToken")}})
      .then((response) => {

        console.log(response.data);

        if (response.data.success) {
          this.setState({
            id: userId,
            name: response.data.message.name,
            password: response.data.message.password,
            role: response.data.message.role,
          });
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: err});
      });
  },

  handleNameChange(evt){
    this.setState({name: evt.target.value});
  },

  handlePasswordChange(evt){
    this.setState({password: evt.target.value});
  },

  handleRoleChange(evt){
    this.setState({role: evt.target.value});
  },

  handleSubmit(evt) {
    evt.preventDefault();
    //validate data
    //validate input
    if (this.state.name == "") {
      this.setState({warning: "Please enter a valid name"});
      return;
    }
    if (this.state.password == "") {
      this.setState({warning: "Please enter a password"});
      return;
    }
    if (this.state.role !== "user" && this.state.role !== "userManager" && this.state.role !== "admin") {
      this.setState({warning: "Please enter a role from user, userManager or admin"});
      return;
    }

    this.putUser();
  },

  putUser() {
    const userId = this.state.id;
    const updatedUser = {
      name: this.state.name,
      password: this.state.password,
      role: this.state.role
    }

    axios.put(`/api/user/${userId}`, updatedUser, {headers:{token: localStorage.getItem("RunAppToken")}})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/user");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: err});
      });
  },

  handleDelete() {
    const userId = this.state.id;
    axios.delete(`/api/user/${userId}`, {headers:{token: localStorage.getItem("RunAppToken")}})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/user");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: err});
      });
  },

  render() {
    return (
        <div>
          <h3>User profile</h3>

          <MessageBox message={this.state.message}/>

          <div>
            <label>Name</label> <span> </span>
            <input className="field" type="text" name="name" onChange={event => this.setState({name: event.target.value})}/>
            <br/>
            <label>To date (YYYY-MM-DD)</label> <span> </span>
            <input className="filter" type="date" name="toDate" onChange={event => this.setState({toDate: event.target.value})}/>
            <br/>
            <label>From time (HH:MM)</label> <span> </span>
            <input className="filter" type="time" name="fromTime" onChange={event => this.setState({message: event.target.value.toString()})}/>
            <br/>
            <label>To time (HH:MM)</label> <span> </span>
            <input className="filter" type="time" name="toTime" onChange={event => this.setState({toTime: event.target.value})}/>

          </div>



        </div>
    );
  }
});
