webpackJsonp([6],{18:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(4),l=s(n);t.default=l.default.createClass({displayName:"MessageBox",render:function(){return""===this.props.message?l.default.createElement("div",null):l.default.createElement("div",{className:"card red"},l.default.createElement("div",{className:"card-content white-text"},this.props.message))}})},397:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(4),l=s(n),o=(a(47),a(24)),r=s(o),i=a(18),u=s(i);t.default=l.default.createClass({displayName:"EditUserByAdmin",getInitialState:function(){return{hasLocal:!1,hasFacebook:!1,hasGoogle:!1,id:"",name:"",email:"",password:"",expectedKcal:"",profilePic:"",role:"",loginFailCount:"",facebookName:"",facebookEmail:"",facebookId:"",googleName:"",googleEmail:"",googleId:"",message:""}},componentDidMount:function(){var e=this,t="/api/users?userId="+localStorage.getItem("MealAppUserId");r.default.get(t,{headers:{token:localStorage.getItem("MealAppToken")}}).then(function(t){var a=t.data.user;e.setState({id:a._id,name:a.local.name,email:a.local.email,expectedKcal:a.expectedKcal,profilePic:a.profilePic,role:a.role,loginFailCount:a.local.loginFailCount,facebookAccount:a.facebook,googleAccount:a.google,message:JSON.stringify(a)})}).catch(function(t){return e.setState({message:t.response.status+": "+t.response.data.message})})},getUserDetail:function(){var e=this,t=this.props.params.id;console.log(t),r.default.get("/api/user/"+t,{headers:{token:localStorage.getItem("RunAppToken")}}).then(function(a){console.log(a.data),a.data.success?e.setState({id:t,name:a.data.message.name,password:a.data.message.password,role:a.data.message.role}):e.setState({warning:a.data.message})}).catch(function(t){e.setState({warning:t})})},handleNameChange:function(e){this.setState({name:e.target.value})},handlePasswordChange:function(e){this.setState({password:e.target.value})},handleRoleChange:function(e){this.setState({role:e.target.value})},handleSubmit:function(e){return e.preventDefault(),""==this.state.name?void this.setState({warning:"Please enter a valid name"}):""==this.state.password?void this.setState({warning:"Please enter a password"}):"user"!==this.state.role&&"userManager"!==this.state.role&&"admin"!==this.state.role?void this.setState({warning:"Please enter a role from user, userManager or admin"}):void this.putUser()},putUser:function(){var e=this,t=this.state.id,a={name:this.state.name,password:this.state.password,role:this.state.role};r.default.put("/api/user/"+t,a,{headers:{token:localStorage.getItem("RunAppToken")}}).then(function(t){t.data.success?e.props.history.push("/user"):e.setState({warning:t.data.message})}).catch(function(t){e.setState({warning:t})})},handleDelete:function(){var e=this,t=this.state.id;r.default.delete("/api/user/"+t,{headers:{token:localStorage.getItem("RunAppToken")}}).then(function(t){t.data.success?e.props.history.push("/user"):e.setState({warning:t.data.message})}).catch(function(t){e.setState({warning:t})})},render:function(){return l.default.createElement("div",null,l.default.createElement("h3",null,"User profile"),l.default.createElement(u.default,{message:this.state.message}),l.default.createElement("p",null,"User ID:    ",this.state.id),l.default.createElement("div",null,l.default.createElement("label",null,"Name ")," ",l.default.createElement("span",null," ")))}})}});