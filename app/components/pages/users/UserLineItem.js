import React, { Component } from 'react';
import {Link} from "react-router";


export default React.createClass(  {

  render() {

    let user = this.props.item;

    return (

        <tr>
          <Link to={`/users/${user._id}`}><td>{user._id}</td></Link>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.accountType}</td>
          <td>{user.role}</td>
          <td>{user.expectedKcal}</td>
        </tr>

    );
  }
});
