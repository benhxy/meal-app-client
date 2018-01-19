import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from "react-google-login";
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      message: "",
      email: "",
      password: ""
    }
  },

  handleSubmit(event) {

    event.preventDefault();

    let loginData = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post("/api/auth/login/", loginData, {crossdomain: true})
      .then(response => {
        localStorage.setItem("MealAppToken", response.data.token);
        localStorage.setItem("MealAppRole", response.data.role);
        localStorage.setItem("MealAppUserId", response.data.userId);
        localStorage.setItem("MealAppExpectedKcal", response.data.expectedKcal);
        this.props.history.push("/meals");
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

  },

  responseFacebook(fbResponse) {

    axios.post("/api/auth/facebook-login", {fbObj: fbResponse})
      .then(response => {
        localStorage.setItem("MealAppToken", response.data.token);
        localStorage.setItem("MealAppRole", response.data.role);
        localStorage.setItem("MealAppUserId", response.data.userId);
        localStorage.setItem("MealAppExpectedKcal", response.data.expectedKcal);
        //this.setState({message: JSON.stringify(response.data)});
        this.props.history.push("/meals");
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

  },

  render() {
    return (
        <div>
          <h3>Login</h3>

          <MessageBox message={this.state.message} />

          <form onSubmit={this.handleSubmit}>

            <h5>Email</h5>
            <div className="input-field">
              <input type="text" name="email" onChange={event => this.setState({email: event.target.value})} />
            </div>

            <h5>Password</h5>
            <div className="input-field">
              <input type="password" name="password" onChange={event => this.setState({password: event.target.value})} />
            </div>

            <input type="submit" value= "Log in" className="btn red"/>
            <span>  </span>
            <input type="reset" value= "Reset" className="btn blue"/>

          </form>

          <div>
            <FacebookLogin
              appId="2000714743477067"
              autoLoad={true}
              fields="name,email,picture"
              onClick={this.componentClicked}
              callback={this.responseFacebook} 
              />
          </div>
          

        </div>
    );
  }
});
