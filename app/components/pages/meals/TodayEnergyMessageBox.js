import React, { Component } from 'react';
import moment from "moment";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      expectedKcal: localStorage.getItem("MealAppExpectedKcal"),
      todayKcal: 0,
      boxColor: ""
    };
  },

  componentWillReceiveProps(nextProps) {
    //calculate today's kcal sum
    let todaySum = 0;
    nextProps.mealList.forEach(item => {
      if (moment(item.date).isSame(moment(), "day")) {
        todaySum += item.kcal;
      }
    });
    //set box style
    if (todaySum <= this.state.expectedKcal) {
      this.setState({boxColor: "card-green"});
    } else {
      this.setState({boxColor: "card"});
    }
    this.setState({todayKcal: todaySum});
  },

  render() {

    console.log(JSON.stringify(this.props.mealList))

    return(
      <div className={this.state.boxColor}>
        <div className="card-content white-text">
          Expected daily energy: {this.state.expectedKcal}
          <br/>
          Today's energy: {this.state.todayKcal}
        </div>
	  </div>
    );
  }
});

/*
console.log(;
*/