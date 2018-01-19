import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";

import UserLineItem from "./UserLineItem";
import MessageBox from "../shared/MessageBox";

export default React.createClass(  {

  getInitialState() {
    return {
      userList: [],
      message: ""
    };
  },

  componentWillMount() {
    //load run list from server, sort and deep copy into states
    axios.get("/api/user/", {headers:{token: localStorage.getItem("MealAppToken")}})
      .then((response) => {
        if (response.ok) {
          let sortedList = response.data.users.sort(
            function compare(a, b) {
              if (a.name == b.name) {
                return 0;
              }
              //latest run logs first
              if (a.name < b.name) {
                return -1;
              }
              return 1;
            }
          );
          this.setState({userList: sortedList});
        } else {
          this.setState({message: response.status + ": " + response.data.message});
        }
      })
      .catch((err) => this.setState({message: JSON.stringify(err)}));
  },

  render() {
    const lineItems = this.state.userList.map(
      function(item, index) {
        return (
          <UserListLineItem 
            key={item._id} 
            item={item} 
            index={index}
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
