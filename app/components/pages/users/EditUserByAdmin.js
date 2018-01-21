import React, { Component } from 'react';
import {Link} from "react-router";
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass(  {

   getInitialState() {
    return {
      hasLocal: false,
      hasFacebook: false,
      hasGoogle: false,

      id: "",
      name: "",
      email: "",
      password: "",
      expectedKcal: "",
      profilePic: "",

      role: "",
      loginFailCount: "",
      
      facebookName: "",
      facebookEmail: "",
      facebookId: "",
      googleName: "",
      googleEmail: "",
      googleId: "",
      
      message: ""
    }
  },

  componentDidMount() {

    let url = `/api/users?userId=` + localStorage.getItem("MealAppUserId");
    axios.get(url, {headers:{token: localStorage.getItem("MealAppToken")}})
      .then((response) => {
        let userResult = response.data.user;
/*
        //define if each account type exists
        if (userResult.local.email != null && userResult.local.email != undefined) {
          this.setState({hasLocal: true});
        }
        if (userResult.facebook.email != null && userResult.facebook.email != undefined) {
          this.setState({hasFacebook: true});
        }
        if (userResult.google.email != null && userResult.google.email != undefined) {
          this.setState({hasGoogle: true});
        }
*/
        //load data into state
        this.setState({
          id: userResult._id,
          name: userResult.local.name,
          email: userResult.local.email,
          expectedKcal: userResult.expectedKcal,
          profilePic: userResult.profilePic,

          role: userResult.role,
          loginFailCount: userResult.local.loginFailCount,
          facebookAccount: userResult.facebook,
          googleAccount: userResult.google,

          message: JSON.stringify(userResult)
        });
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

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

          <p>User ID:    {this.state.id}</p>

          <div>
            <label>Name </label> <span> </span>

            

          </div>

        </div>
    );
  }
});


/*


*/