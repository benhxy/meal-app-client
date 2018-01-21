import React, { Component } from 'react';
import moment from "moment";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      expectedKcal: localStorage.getItem("MealAppExpectedKcal"),
      todayKcal: 0,
      boxColor: "green"
    };
  },

  componentDidMount() {
  	console.log(JSON.stringify(this.props.mealList))
  	
  	let todaySum = 0;
    this.props.mealList.forEach(item => {
		  console.log(item)
	    if (true) {
	    	todaySum += item.kcal;
	    }
	  });

    this.setState({todayKcal: todaySum});

    if (todaySum <= this.state.expectedKcal) {
  		this.setState({boxColor: "card-green"});
  	} else {
  		this.setState({boxColor: "card"});
  	}
  },

  sumTodayKcal() {
  	//sum today's kcal and update state



    
    
  },

  updateBoxColor() {
  	
  },

  render() {

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
console.log(moment(item.date).isSame(moment("2018-01-17"), "day"));
*/