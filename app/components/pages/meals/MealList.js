import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";

import MealLineItem from "./MealLineItem";
import MealNewLine from "./MealNewLine";
import MessageBox from "../shared/MessageBox";
import TodayEnergyMessageBox from "./TodayEnergyMessageBox";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      message: "",
      mealList: [],
      mealListFiltered: [],
      fromDate: "",
      toDate: "",
      fromTime: "",
      toTime: ""
    };
  },

  componentDidMount() {
    this.handleOnlineRefresh();
  },

  handleOnlineRefresh() {
    //load list from server, sort and deep copy into states
    axios.get("/api/meals?userId=" + localStorage.getItem("MealAppUserId"), {headers:{token: localStorage.getItem("MealAppToken")}})
      .then(response => {

        let sortedList = response.data.meals
        .sort(
          function compare(a, b) {
            if (moment(a.date) == moment(b.date)) {
              if (moment(a.time) == moment(b.time)) {
                return 0;
              } else if (moment(a.time) > moment(b.time)) {
                return -1;
              } else {
                return 1;
              }
            } else if (moment(a.date) > moment(b.date)) {
              return -1;
            } else {
              return 1;
            }
          }
        );

        this.setState({
          mealList: JSON.parse(JSON.stringify(sortedList)),
          mealListFiltered: JSON.parse(JSON.stringify(sortedList)),
          message: ""
        });

      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));
  },

  handleFilter() {

    //validate input, control error message
    if (this.state.fromDate != "" 
      && this.state.toDate != "" 
      && moment(this.state.fromDate) > moment(this.state.toDate)) {
      this.setState({message: "From date must be earlier than To date"});
      return;
    }
    if (this.state.fromTime != "" 
      && this.state.toTime != "" 
      && moment(this.state.fromTime) > moment(this.state.toTime)) {
      this.setState({message: "From time must be earlier than To time"});
      return;
    }

    //filter result
    let filteredResult = [];
    this.state.mealList.forEach(item => {
      if (this.state.fromDate != "" && moment(item.date) < moment(this.state.fromDate)) {
        return;
      }
      if (this.state.toDate != "" && moment(item.date) > moment(this.state.toDate)) {
        return;
      }
      if (this.state.fromTime != "" && moment(item.time) < moment(this.state.fromTime)) {
        return;
      }
      if (this.state.fromTime != "" && moment(item.time) > moment(this.state.toTime)) {
        return;
      }
      filteredResult.push(item);
    });

    this.setState({mealListFiltered: filteredResult});
  },

  handleResetFilter() {
    this.setState({
      mealListFiltered: mealList,
      message: ""
    });
    let filters = document.getElementsByClassName("filter");
    for (let i = 0; i < filters.length; i++) {
      filters[i].value = "";
    }
  },

  handleDeleteRefresh(childId) {
    let mealListCopy = [];
    this.state.mealList.forEach(item => {
      if (item._id == childId) {
        console.log("found")
        return;
      } else {
        mealListCopy.push(item);
      }
    });
    this.setState({
      mealList: mealListCopy,
      mealListFiltered: mealListCopy,
      message: "Record deleted"
    });
  },

  handleUpdateRefresh(childId, childObj) {
    let mealListCopy = [];
    this.state.mealList.forEach(item => {
      if (item._id == childId) {
        let updatedItem = {
          _id: item._id,
          user: item.user,
          date: childObj.date,
          time: childObj.time,
          food: childObj.food,
          kcal: childObj.kcal
        }
        mealListCopy.push(updatedItem);
      } else {
        mealListCopy.push(item);
      }
    });
    this.setState({
      mealList: mealListCopy,
      mealListFiltered: mealListCopy,
      message: "Record updated"
    });
  },

  handleCreateRefresh(childObj, childMessage) {
    let mealListCopy = this.state.mealList;
    mealListCopy.push(childObj);
    this.setState({
      mealList: mealListCopy,
      mealListFiltered: mealListCopy,
      message: childMessage
    });
  },

  render() {

    return(
      <div className="content-wrapper">
        <h3>Meal records</h3>

        <MessageBox message={this.state.message}/>

        <TodayEnergyMessageBox mealList={this.state.mealList} />


        <div>
          <label>From date (YYYY-MM-DD)</label> <span> </span>
          <input className="filter" type="date" name="fromDate" onChange={event => this.setState({fromDate: event.target.value})}/>
          <br/>
          <label>To date (YYYY-MM-DD)</label> <span> </span>
          <input className="filter" type="date" name="toDate" onChange={event => this.setState({toDate: event.target.value})}/>
          <br/>
          <label>From time (HH:MM)</label> <span> </span>
          <input className="filter" type="time" name="fromTime" onChange={event => this.setState({fromTime: event.target.value})}/>
          <br/>
          <label>To time (HH:MM)</label> <span> </span>
          <input className="filter" type="time" name="toTime" onChange={event => this.setState({toTime: event.target.value})}/>

        </div>

        <br/>

        <div>
          <input type="button" value="Filter" onClick={this.handleFilter} />
          <input type="button" value="Reset" onClick={this.handleResetFilter} />
          <input type="button" value="Online refresh" onClick={this.handleOnlineRefresh} />
        </div>

        <br/>

        <table className="striped">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Food</th>
              <th>Kcal</th>
              <th>Actions</th>
            </tr>
            {this.state.mealListFiltered.map(
              function(item) {
                return (
                  <MealLineItem
                    item={item}
                    handleDeleteRefresh={this.handleDeleteRefresh}
                    handleUpdateRefresh={this.handleUpdateRefresh} 
                    />
                );
              }.bind(this)
            )}
            <MealNewLine handleCreateRefresh={this.handleCreateRefresh} />
          </tbody>
        </table>
      </div>
    );
  }
});


/*



*/