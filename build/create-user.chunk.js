webpackJsonp([7],{14:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(4),n=l(s);t.default=n.default.createClass({displayName:"MessageBox",render:function(){return""===this.props.message?n.default.createElement("div",null):n.default.createElement("div",{className:"card red"},n.default.createElement("div",{className:"card-content white-text"},this.props.message))}})},398:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(4),n=l(s),r=(a(39),a(24)),u=l(r),i=a(14),d=l(i);t.default=n.default.createClass({displayName:"CreateUserByAdmin",getInitialState:function(){return{name:"",email:"",password:"",expectedKcal:"",role:"",status:"EDITING",message:"Create user without email verification"}},handleSubmit:function(){var e=this;if(""==this.state.name||""==this.state.email||""==this.state.role||""==this.state.password)return void this.setState({message:"Please enter at least name, email, role, and password"});if("admin"!=this.state.role&&"user"!=this.state.role&&"userManager"!=this.state.role)return void this.setState({message:"Role must be admin, user or userManager"});this.setState({status:"LOADING",message:"Saving profile..."});var t="/api/users",a={name:this.state.name,email:this.state.email,password:this.state.password,role:this.state.role,expectedKcal:this.state.expectedKcal};console.log(a),u.default.post(t,a,{headers:{token:localStorage.getItem("MealAppToken")}}).then(function(t){e.setState({message:t.data.message}),e.handleReset(),e.setState({message:"Record created",status:"EDITING"})}).catch(function(t){e.setState({message:t.response.status+": "+t.response.data.message}),e.setState({status:"EDITING",message:""})})},handleReset:function(){for(var e=document.getElementsByClassName("localField"),t=0;t<e.length;t++)e[t].value=""},render:function(){var e=this;return n.default.createElement("div",null,n.default.createElement("h3",null,"User profile"),n.default.createElement(d.default,{message:this.state.message}),n.default.createElement("div",null,n.default.createElement("label",null,"Local name: "),n.default.createElement("input",{className:"localField",type:"text",disabled:"EDITING"!=this.state.status,onChange:function(t){return e.setState({name:t.target.value})}}),n.default.createElement("br",null),n.default.createElement("label",null,"Email: "),n.default.createElement("input",{className:"localField",type:"email",disabled:"EDITING"!=this.state.status,onChange:function(t){return e.setState({email:t.target.value})}}),n.default.createElement("br",null),n.default.createElement("label",null,"Password: "),n.default.createElement("input",{className:"localField",type:"password",disabled:"EDITING"!=this.state.status,onChange:function(t){return e.setState({password:t.target.value})}}),n.default.createElement("br",null),n.default.createElement("label",null,"Planned daily energy intake: "),n.default.createElement("input",{className:"localField",type:"number",disabled:"EDITING"!=this.state.status,onChange:function(t){return e.setState({expectedKcal:t.target.value})}}),n.default.createElement("br",null),n.default.createElement("label",null,"User role: "),n.default.createElement("input",{className:"localField",type:"text",disabled:"EDITING"!=this.state.status,onChange:function(t){return e.setState({role:t.target.value})}}),n.default.createElement("br",null)),n.default.createElement("input",{type:"button",value:"Save",onClick:this.handleSubmit}),n.default.createElement("input",{type:"button",value:"Reset",onClick:this.handleReset}),n.default.createElement("br",null))}})}});