import React, { Component } from 'react';
import axios from 'axios';
import MessageBox from "./MessageBox";

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
        if (response.status < 400) {
          localStorage.setItem("MealAppToken", response.data.token);
          localStorage.setItem("MealAppRole", response.data.role);
          localStorage.setItem("MealAppUserId", response.data.userId);
          this.props.history.push("/run");
        } else {
          this.setState({message: response.data.message});
        }
      })
      .catch((err) => console.log(err));

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
        </div>
    );
  }
});
