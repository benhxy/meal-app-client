import React, { Component } from 'react';

export default React.createClass({

  render() {
    if (this.props.account == "") {
      return (
        <div>
        </div>
      );
    } else {
      return(
        <div className="card-green">
          <div className="card-content white-text">
            
          </div>
          <div className="card-content white-text">
            
          </div>
        </div>
      );
    }
  }
});

/*


{this.props.accountType}

Name: {this.props.account.name}
            <br/>
            Email: {this.props.account.email}
            <br/>
            ID: {this.props.account.id}
*/
