import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      message: ""
    };
  },

  componentClicked() {

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

    return(
      <div className="content-wrapper">
        <h3>Facebook login test</h3>
        <MessageBox message={this.state.message} />
        <FacebookLogin
          appId="2000714743477067"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} 
          />
        
      </div>
    );
  }
});
