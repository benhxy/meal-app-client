import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";

import UserLineItem from "./UserLineItem";
import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      userList: [],
      message: ""
    };
  },

  componentDidMount() {
    //load run list from server, sort and deep copy into states
    axios.get("/api/users/", {headers:{token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        let sortedList = response.data.users.sort(
          function compare(a, b) {
            if (a.name == b.name) {
              return 0;
            } else if (a.name < b.name) {
              return -1;
            }
            return 1;
          }
        );
        this.setState({userList: sortedList});
      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));
  },

  render() {
    const lineItems = this.state.userList.map(
      function(item) {
        return (
          <UserLineItem 
            item={item}
            key={item._id}
            />);
      }
    );

    return(
      <div className="content-wrapper">
        <h3>User list</h3>

        <MessageBox message={this.state.message}/>

        <table className="striped">
        <tbody>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Account type</th>
            <th>Role</th>
            <th>Expected Kcal</th>
          </tr>
          {lineItems}
        </tbody>
        </table>
      </div>
    );
  }
});
