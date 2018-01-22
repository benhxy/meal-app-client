import React from 'react'
import { Link, browserHistory } from 'react-router'
let _ = require('lodash')

require('../../css/app.scss')

const App = React.createClass({
  getInitialState() {
    return {
      id: "",
      role: "",
      ifLogin: false,
      showMenu: false
    }
  },

  componentDidMount() {
    this.setState({
    	id: localStorage.getItem("MealAppUserId"),
    	role: localStorage.getItem('MealAppRole'), 
    	ifLogin: localStorage.getItem('MealAppToken') ? true : false
    });
  },

  componentWillReceiveProps() {
  	this.setState({
  		showMenu: false, 
  		role: localStorage.getItem('MealAppRole'), 
  		ifLogin: localStorage.getItem('MealAppToken') ? true : false
  	});
  },

  toggleMenu() {
  	this.setState({showMenu: !this.state.showMenu});
  },

  render() {
    return (
      <div className="container">

      	<div className="header-container">
      		<a href="javascript:;" className="menu-btn" onClick={this.toggleMenu}><span className="menu-btn-line"></span></a>
      		<Link className="title" to="/" className="title-text">Meal App</Link>
      		<div className="clearfix"></div>
      	</div>

      	<div className={"menu-container " + (this.state.showMenu ? "show" : "")}>
			<div className="menu-bg" onClick={this.toggleMenu}></div>
			<ul className="menu-list">
				
				<li className="menu-item">
					{this.state.ifLogin ? <span></span> : <Link to="/auth/login" className={"menu-link " + (this.props.location.pathname == "/auth/ogin" ? "current" : "")}>Login</Link>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <span></span> : <Link to="/auth/signup" className={"menu-link " + (this.props.location.pathname == "/auth/signup" ? "current" : "")}>Sign up</Link>}
				</li>

				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/meals" className={"menu-link " + (this.props.location.pathname == "/meals" ? "current" : "")}>Manage meal records</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/profile" className={"menu-link " + (this.props.location.pathname == "/profile" ? "current" : "")}>My profile</Link> : <span></span>}
				</li>

				<li className="menu-item">
					{(this.state.ifLogin && (this.state.role == "userManager" || this.state.role == "admin")) ? <Link to="/new-user" className={"menu-link " + (this.props.location.pathname == "/new-user" ? "current" : "")}>Create new user</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{(this.state.ifLogin && (this.state.role == "userManager" || this.state.role == "admin")) ? <Link to="/users" className={"menu-link " + (this.props.location.pathname == "/users" ? "current" : "")}>Manage users</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{(this.state.ifLogin && (this.state.role == "admin")) ? <Link to="/all-meals" className={"menu-link " + (this.props.location.pathname == "/all-meals" ? "current" : "")}>Manage all users' meal records</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{(this.state.ifLogin && (this.state.role == "admin")) ? <Link to="/invite" className={"menu-link " + (this.props.location.pathname == "/invite" ? "current" : "")}>Invite user</Link> : <span></span>}
				</li>


				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/logout" className="menu-link">Logout</Link> : <span></span>}
				</li>

			</ul>
        </div>
        <div className="content-container">{React.cloneElement(this.props.children)}</div>
      </div>
    )
  }
})

export default App;

/*
<li className="menu-item">
					{this.state.ifLogin ? <Link to="/run_new" className="menu-link">Add a running record</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/run" className="menu-link">Running records</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/run_report" className="menu-link">Running report</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.roleName == "admin" ? <Link to="/run_admin" className="menu-link">Manage records as Admin</Link> : <span></span>}
				</li>
        		<li className="menu-item">
					{this.state.roleName == "admin" ? <Link to="/run_admin_new" className="menu-link">Add a record as Admin</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.roleName == "admin" ? <Link to="/user" className="menu-link">Manage users as Admin</Link> : (this.state.roleName == "userManager" ? <Link to="/user" className="menu-link">Manage users as Admin</Link> : <span></span>)}
				</li>
        		<li className="menu-item">
					{this.state.roleName == "admin" ? <Link to="/user_new" className="menu-link">Create a user as Admin</Link> : (this.state.roleName == "userManager" ? <Link to="/user_new" className="menu-link">Manage users as Admin</Link> : <span></span>)}
				</li>
				<li className="menu-item">
					<Link to="/about" className={"menu-link " + (this.props.location.pathname == "/about" ? "current" : "")}>About</Link>
				</li>
				
*/
