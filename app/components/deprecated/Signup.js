import React, { Component } from 'react';
import axios from 'axios';
import MessageBox from "./MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      message: "",
      name: "",
      email: "",
      password: ""
    }
  },

  handleSubmit(event) {

    event.preventDefault();

    let signupData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios.post("/api/auth/signup/", signupData, {crossdomain: true})
      .then(response => {
        if (response.status < 400) {
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
          <h3>Signup</h3>

          <MessageBox message={this.state.message} />

          <form onSubmit={this.handleSubmit}>

            <h5>Name</h5>
            <div className="input-field">
              <input type="text" name="name" onChange={event => this.setState({name: event.target.value})} />
            </div>

            <h5>Email</h5>
            <div className="input-field">
              <input type="text" name="email" onChange={event => this.setState({email: event.target.value})} />
            </div>

            <h5>Password</h5>
            <div className="input-field">
              <input type="password" name="password" onChange={event => this.setState({password: event.target.value})} />
            </div>

            <input type="submit" value= "Sign up" className="btn red"/>
            <span>  </span>
            <input type="reset" value= "Reset" className="btn blue"/>

          </form>
        </div>
    );
  }
});
