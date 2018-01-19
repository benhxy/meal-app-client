import React, { Component } from 'react';
import {Link} from "react-router";


export default React.createClass(  {

  render() {

    let user = this.props.item;

    return (

        <tr>
          <Link to={`/user/${user._id}`}>
            <td>{user.name}</td>
          </Link>
          <td>{user.email}</td>
          <td>{user.accountType}</td>
          <td>{user.role}</td>
          <td>{user.expectedKcal}</td>
        </tr>

    );
  }
});
