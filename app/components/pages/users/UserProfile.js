import React, { Component } from 'react';
import {Link} from "react-router";
import axios from "axios";

import MessageBox from "../shared/MessageBox";
import SocialAccountBox from "./SocialAccountBox";

export default React.createClass(  {

   getInitialState() {
    return {
      hasLocal: false,
      hasFacebook: false,
      hasGoogle: false,

      id: "",
      expectedKcal: "",
      role: "",
      loginFailCount: "",
      profilePic: "",

      name: "",
      email: "",
      password: "",

      facebook: "",
      google: "",
      
      status: "EDITING",
      message: ""
    }
  },

  componentDidMount() {

    let url = `/api/users?userId=` + localStorage.getItem("MealAppUserId");
    axios.get(url, {headers:{token: localStorage.getItem("MealAppToken")}})
      .then((response) => {
        let userResult = response.data.user;

        //define if each account type exists
        if (userResult.local.email != undefined) {
          this.setState({hasLocal: true});
        }
        if (userResult.facebook != undefined) {
          this.setState({hasFacebook: true});
        }
        if (userResult.google != undefined) {
          this.setState({hasGoogle: true});
        }

        //load common data into state
        this.setState({
          id: userResult._id,
          expectedKcal: userResult.expectedKcal,
          role: userResult.role,
          loginFailCount: userResult.local.loginFailCount
        });

        //load local account data
        if (this.state.hasLocal) {
          this.setState({
            name: userResult.local.name,
            email: userResult.local.email
          });
        }

        //load facebook account data
        if (this.state.hasFacebook) {
          this.setState({
            facebook: userResult.facebook
          });
        }

        //load local account data
        if (this.state.hasGoogle) {
          this.setState({
            google: userResult.google
          });
        }

        //load profile pic
        if (userResult.profilePic != undefined) {
          this.setState({profilePic: userResult.profilePic});
        }

        
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));
      
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

  render() {



    return (
        <div>
          <h3>User profile</h3>

          <MessageBox message={this.state.message}/>

          <p>User ID: {this.state.id}</p>
          <p>User role: {this.state.role}</p>

          <label>Local name: </label>
          <input
            className="localField"
            type="text"
            value={this.state.name}
            disabled={(this.state.status=="EDITING" ? false : true) || !this.state.hasLocal}
            onChange={event => this.setState({name: event.target.value})} />

          <br/>
          <label>New password: </label>
          <input
            className="localField"
            type="password"
            value=""
            disabled={(this.state.status=="EDITING" ? false : true) || !this.state.hasLocal}
            onChange={event => this.setState({password: event.target.value})} />
          <br/>

          <label>Planned daily energy intake: </label>
          <input
            className="localField"
            type="number"
            value={this.state.expectedKcal}
            disabled={(this.state.status=="EDITING" ? false : true)}
            onChange={event => this.setState({expectedKcal: event.target.value})} />
          <br/>

          <div className="card-green">
            <div  className="card-content white-text">
              <p>Facebook ID: {this.state.facebook == undefined ? "N/A" : this.state.facebook.id}</p>
              <p>Facebook name: {this.state.facebook == undefined ? "N/A" : this.state.facebook.name}</p>
              <p>Facebook email: {this.state.facebook == undefined ? "N/A" : this.state.facebook.email}</p>
              <br/>
              <p>Google ID: {this.state.google == undefined ? "N/A" : this.state.google.id}</p>
              <p>Google name: {this.state.google == undefined ? "N/A" : this.state.google.name}</p>
              <p>Google email: {this.state.google == undefined ? "N/A" : this.state.google.email}</p>
            </div>
          </div>
          
        </div>
    );
  }
});


/*

          


//this.setState({hasLocal: false})

*/