import React, { Component } from 'react';
import {Link} from "react-router";
import moment from "moment";
import axios from "axios";
import MessageBox from "../shared/MessageBox";

export default React.createClass({

  getInitialState() {
    return {
      date: this.props.item.date,
      time: this.props.item.time,
      food: this.props.item.food,
      kcal: this.props.item.kcal,
      status: "DISPLAY",
      message: ""
    };
  },

  handleSave(){
    let url = "/api/meals?mealId=" + this.props.item._id;
    let payload = {
      date: this.state.date,
      time: this.state.time,
      food: this.state.food,
      kcal: this.state.kcal,
    }
    axios.put(url, payload, {headers: {token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        this.props.handleUpdateRefresh(this.props.item._id, response.data.meal);
        this.setState({status: "DISPLAY"});
      })
      .catch((err) => {
        this.setState({
          message: err.response.status + ": " + err.response.data.message,
          status: "EDITING"
        });
      });
  },

  handleDelete(){
    console.log(this.props.item._id);
    let url = "/api/meals?mealId=" + this.props.item._id;
    axios.delete(url, {headers: {token: localStorage.getItem("MealAppToken")}})
      .then(response => {
        this.props.handleDeleteRefresh(this.props.item._id);
      })
      .catch((err) => {
        this.setState({
          message: err.response.status + ": " + err.response.data.message,
          status: "EDITING"
        });
      });
  },

  render() {
    return (
        <tr>
          <td>
            <p className="displayField">{this.props.item.user}</p>
          </td>
          <td>
            <p className="displayField" hidden={this.state.status == "DISPLAY" ? false : true}>{moment(this.state.date).format("YYYY-MM-DD")}</p>
            <input
              type="date"
              className="editField"
              value={moment(this.state.date).format("YYYY-MM-DD")}
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false}
              onChange={event => this.setState({date: event.target.value})} />
          </td>
          <td>
            <p className="displayField" hidden={this.state.status == "DISPLAY" ? false : true}>{this.state.time}</p>
            <input
              type="time"
              className="editField"
              value={this.state.time}
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false}
              onChange={event => this.setState({time: event.target.value})} />
          </td>
          <td>
            <p className="displayField" hidden={this.state.status == "DISPLAY" ? false : true}>{this.state.food}</p>
            <input
              type="text"
              className="editField"
              value={this.state.food}
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false}
              onChange={event => this.setState({food: event.target.value})} />
          </td>
          <td>
            <p className="displayField" hidden={this.state.status == "DISPLAY" ? false : true}>{this.state.kcal}</p>
            <input
              type="number"
              className="editField"
              value={this.state.kcal}
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false}
              onChange={event => this.setState({kcal: event.target.value})} />
          </td>
          <td>
            <MessageBox message={this.state.message} />
            <input
              type="button"
              hidden={this.state.status == "DISPLAY" ? false : true}
              value="Edit"
              onClick={event => this.setState({status: "EDITING"})}/>
            <input
              type="button"
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false}
              value="Delete"
              onClick={this.handleDelete}/>
            <input
              type="button"
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false} 
              value="Save"
              onClick={this.handleSave}/>
            <input
              type="button"
              hidden={this.state.status == "DISPLAY" ? true : false}
              disabled={this.state.status == "LOADING" ? true : false} 
              value="Cancel"
              onClick={event => this.setState({
                date: this.props.item.date,
                time: this.props.item.time,
                food: this.props.item.food,
                kcal: this.props.item.kcal,
                user: this.props.item.user,
                status: "DISPLAY",
                message: ""
              })}/>
          </td>
        </tr>
    );
  }
});


/*
DISPLAY: show Edit
EDITING: hide Edit, show Delete, Save
LOADING: disable Delete, Save
*/