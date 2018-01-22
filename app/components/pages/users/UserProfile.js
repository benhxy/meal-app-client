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
      expectedKcal: "",
      role: "",
      loginFailCount: "",

      profileUrl: "",
      localFile: "",
      imagePreviewUrl: "",

      name: "",
      email: "",
      password: "",

      facebook: "",
      google: "",
      
      status: "EDITING",
      userCopy: "",
      message: ""
    }
  },

  componentDidMount() {

    let url = `/api/users?userId=` + localStorage.getItem("MealAppUserId");
    axios.get(url, {headers:{token: localStorage.getItem("MealAppToken")}})
      .then((response) => {
        let userResult = response.data.user;
        //make a copy for reset
        this.setState({userCopy: userResult});
        //load into state
        this.updateUserState(userResult);
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));
      
  },

  updateUserState(userResult) {
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
      loginFailCount: userResult.local.loginFailCount,
      profileUrl: "/api/images?imageId=" + userResult.profilePic
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
    
  },

  handleUserInfoUpdate() {
    //validate fields
    if (this.state.name == "") {
      this.setState({message: "Please enter a valid name"});
      return;
    }
    //lock fields
    this.setState({status: "LOADING", message: "Saving profile..."});

    //create payload
    let url = "/api/users?userId=" + this.state.id;
    const payload = {
      name: this.state.name,
      expectedKcal: this.state.expectedKcal
    }
    if (this.state.password != "") {
      payload.password = this.state.password;
    }
    console.log(payload);

    axios.put(url, payload, {headers:{token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        this.setState({
          message: response.data.message,
          password: ""
        });
        //update local storage
        localStorage.setItem("MealAppExpectedKcal", this.state.expectedKcal);

        //unlock fields
        this.setState({status: "EDITING", message: "Record updated"});
      })
      .catch((err) => {
        this.setState({message: err.response.status + ": " + err.response.data.message});
        //unlock fields
        this.setState({status: "EDITING", message: ""});
      });

  },

  handleReset() {
    this.updateUserState(this.state.userCopy);
  },

  handleFileSelect(event) {
    event.preventDefault();
    this.setState({localFile: event.target.files[0]});
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.addEventListener("load", function () {
      document.getElementById("profileImg").src = reader.result;
    }, false);
    reader.readAsDataURL(file);
  },

  handleSubmit(event) {
    event.preventDefault();
    //prepare url
    let uploadUrl = "/api/images?userId=" + localStorage.getItem("MealAppUserId");
    //prepare form data
    let formData = new FormData();
    formData.append("file", localFile);
    //prepare headers
    let axiosConfig = {
      headers: {
        "content-type": "multipart/form-data",
        "token": localStorage.getItem("MealAppToken")
      }
    };
    //upload to backend
    axios.post(uploadUrl, formData, axiosConfig)
      .then(response => {
        //show message
        this.setState({message: response.data.message});
        //clear file input field
        document.getElementById("file").value = "";
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

    
  },

  render() {

    return (
        <div>
          <h3>User profile</h3>

          <MessageBox message={this.state.message}/>

          <div>
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
              value={this.state.password}
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
          </div>

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

          <input
            type="button"
            value="Save"
            onClick={this.handleUserInfoUpdate} />
          <input
            type="button"
            value="Reset"
            onClick={this.handleReset} />
          <br/>

          <img id="profileImg" src={this.state.profileUrl}/>

          <form onSubmit={this.handleSubmit}>
            <input
              type="file"
              id="file"
              accept="image/jpg"
              onChange={this.handleFileSelect}/>
            <input
              type="submit"
              value="Upload profile picture"/>
          </form>
        </div>
    );
  }
});


/*

          


//this.setState({hasLocal: false})

*/