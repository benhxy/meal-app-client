import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from "axios";

import MessageBox from "../shared/MessageBox";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      message: ""
    };
  },

  responseGoogle(gResponse) {

    let resObj = JSON.parse(JSON.stringify(gResponse));
    let payload = {
      id: resObj.profileObj.googleId,
      name: resObj.profileObj.name,
      email: resObj.profileObj.email,
      profilePicUrl: resObj.profileObj.imageUrl,
      accessToken: resObj.tokenObj.access_token,
      idToken: resObj.tokenObj.id_token
    }

    axios.post("/api/auth/google-login", payload)
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
        <h3>Google login test</h3>
        <MessageBox message={this.state.message} />
        <GoogleLogin
          clientId="224684001964-oacus7a8d2j200348v9l4iavf0qu7an5.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        
      </div>
    );
  }
});

/*

        */