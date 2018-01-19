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

    let resObj = JSON.parse(JSON.stringify(fbResponse));
    let payload = {
      id: resObj.id,
      name: resObj.name,
      email: resObj.email,
      profilePicUrl: resObj.picture.data.url,
      accessToken: resObj.accessToken
    }
    axios.post("/api/auth/facebook-login", payload)
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
            <span> </span>
            <GoogleLogin
              clientId="224684001964-oacus7a8d2j200348v9l4iavf0qu7an5.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
          

        </div>
    );
  }
});
