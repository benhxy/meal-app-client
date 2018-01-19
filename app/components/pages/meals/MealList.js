import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";

import MealLineItem from "./MealLineItem";
import MealNewLine from "./MealNewLine";
import MessageBox from "../shared/MessageBox";

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

  componentWillMount() {
    //load run list from server, sort and deep copy into states
    //fetch(url, config{method, body{}})
    axios.get("/api/meals?userId=" + localStorage.getItem("MealAppUserId"), {headers:{token: localStorage.getItem("MealAppToken")}})
      .then(response => {

        let sortedList = response.data.meals
        .sort(
          function compare(a, b) {
            if (moment(a.date) == moment(b.date)) {
              if (a.time == b.time) {
                return 0;
              } else if (a.time > b.time) {
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
          mealListFiltered: JSON.parse(JSON.stringify(sortedList))
        });

      })
      .catch((err) => this.setState({message: err.response.status + ": " + err.response.data.message}));

  },

  handleFilter(event) {
    //validate filter input, change this.state.runListFiltered
    event.preventDefault();

    //validate input, control error message
    if (moment(this.state.fromDate) >= moment(this.state.toDate)) {
      this.setState({message: "From date must be earlier than To date"});
      return;
    }
    if (this.state.fromTime >= this.state.toTime) {
      this.setState({message: "From time must be earlier than To time"});
      return;
    }
    this.setState({message: ""});

    //filter result
    let filteredResult = [];
    this.state.mealList.forEach(
      function(item) {
        if (moment(item.date) >= moment(this.state.fromDate) && 
          moment(item.date) <= moment(this.state.toDate) &&
          item.time >= this.state.fromTime &&
          item.time <= this.state.toTime) {
          filteredResult.push(item);
        }
      }
    );
    this.setState({runListFiltered: filteredResult});
  },

  handleResetFilter(event) {
    event.preventDefault();
    this.setState({mealListFiltered: JSON.parse(JSON.stringify(this.state.mealList))});
  },

  render() {
    const lineItems = this.state.mealListFiltered.map(
      function(item, index) {
        return (
          <MealLineItem 
            key={item._id} 
            item={item} 
            index={index}
            />);
      }
    );

    return(
      <div className="content-wrapper">
        <h3>{this.state.compName}</h3>

        <MessageBox message={this.state.message}/>

        <form onSubmit={this.handleFilter}>

          <div className="input-field">
            <p>From date (YYYY-MM-DD)</p>
            <input type="date" name="fromDate" onChange={event => this.setState({fromDate: event.target.value})}/>
          </div>
          <div className="input-field">
            <p>To date (YYYY-MM-DD)</p>
            <input type="date" name="toDate" onChange={event => this.setState({toDate: event.target.value})}/>
          </div>
          <div className="input-field">
            <p>From time (HH:MM)</p>
            <input type="time" name="fromTime" onChange={event => this.setState({fromTime: event.target.value})}/>
          </div>
          <div className="input-field">
            <p>To time (HH:MM)</p>
            <input type="time" name="toTime" onChange={event => this.setState({toTime: event.target.value})}/>
          </div>

          <input type="submit" value= "Filter" className="btn red"/>
          <span> </span>
          <div className="btn blue" onClick={this.handleResetFilter}>Reset</div>

        </form>
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
          {lineItems}
          <MealNewLine />
        </tbody>
        </table>
      </div>
    );
  }
});
