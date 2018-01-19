import React, { Component } from 'react';
import axios from "axios";
import MessageBox from "../shared/MessageBox";

export default React.createClass( {

  getInitialState() {
    return {
      message: "",
      name: "",
      email: "",
      password: "",
      role: ""
    }
  },

  handleSubmit(event) {
    evt.preventDefault();

    if (this.state.name == "" || this.state.email == "" || this.state.password == "" || this.state.role == "") {
      this.setState({message: "Please enter name, email, role, and password"});
    }

    if (this.state.role != "user" && this.state.role != "userManager" && this.state.role != "admin") {
      this.setState({message: "Please use user, admin or userManager role"});
      return;
    }

    let signupData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    };

    axios.post("/api/users/", signupData, {crossdomain: true})
      .then(response => {
        if (response.status < 400) {
          this.props.history.push("/users");
        } else {
          this.setState({message: response.data.message});
        }
      })
      .catch((err) => console.log(err));

  },

  render() {
    return (
        <div>
          <h3>Create user</h3>

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

          <h5>Role</h5>
          <div className="input-field">
            <input type="text" name="role" onChange={event => this.setState({role: event.target.value})} />
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
