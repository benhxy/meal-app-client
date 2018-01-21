webpackJsonp([4],{18:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(4),r=o(a);t.default=r.default.createClass({displayName:"MessageBox",render:function(){return""===this.props.message?r.default.createElement("div",null):r.default.createElement("div",{className:"card red"},r.default.createElement("div",{className:"card-content white-text"},this.props.message))}})},388:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(4),r=o(a),i=n(702),s=o(i),u=n(703),l=o(u),c=n(24),p=o(c),f=n(18),d=o(f);t.default=r.default.createClass({displayName:"Login",getInitialState:function(){return{message:"",email:"",password:""}},handleSubmit:function(e){var t=this;e.preventDefault();var n={email:this.state.email,password:this.state.password};p.default.post("/api/auth/login/",n,{crossdomain:!0}).then(function(e){localStorage.setItem("MealAppToken",e.data.token),localStorage.setItem("MealAppRole",e.data.role),localStorage.setItem("MealAppUserId",e.data.userId),localStorage.setItem("MealAppExpectedKcal",e.data.expectedKcal),t.props.history.push("/meals")}).catch(function(e){return t.setState({message:e.response.status+": "+e.response.data.message})})},responseFacebook:function(e){var t=this,n=JSON.parse(JSON.stringify(e)),o={id:n.id,name:n.name,email:n.email,profilePicUrl:n.picture.data.url,accessToken:n.accessToken};p.default.post("/api/auth/facebook-login",o).then(function(e){localStorage.setItem("MealAppToken",e.data.token),localStorage.setItem("MealAppRole",e.data.role),localStorage.setItem("MealAppUserId",e.data.userId),localStorage.setItem("MealAppExpectedKcal",e.data.expectedKcal),t.props.history.push("/meals")}).catch(function(e){return t.setState({message:e.response.status+": "+e.response.data.message})})},responseGoogle:function(e){var t=this,n=JSON.parse(JSON.stringify(e)),o={id:n.profileObj.googleId,name:n.profileObj.name,email:n.profileObj.email,profilePicUrl:n.profileObj.imageUrl,accessToken:n.tokenObj.access_token,idToken:n.tokenObj.id_token};p.default.post("/api/auth/google-login",o).then(function(e){localStorage.setItem("MealAppToken",e.data.token),localStorage.setItem("MealAppRole",e.data.role),localStorage.setItem("MealAppUserId",e.data.userId),localStorage.setItem("MealAppExpectedKcal",e.data.expectedKcal),t.props.history.push("/meals")}).catch(function(e){return t.setState({message:e.response.status+": "+e.response.data.message})})},render:function(){var e=this;return r.default.createElement("div",null,r.default.createElement("h3",null,"Login"),r.default.createElement(d.default,{message:this.state.message}),r.default.createElement("form",{onSubmit:this.handleSubmit},r.default.createElement("h5",null,"Email"),r.default.createElement("div",{className:"input-field"},r.default.createElement("input",{type:"text",name:"email",onChange:function(t){return e.setState({email:t.target.value})}})),r.default.createElement("h5",null,"Password"),r.default.createElement("div",{className:"input-field"},r.default.createElement("input",{type:"password",name:"password",onChange:function(t){return e.setState({password:t.target.value})}})),r.default.createElement("input",{type:"submit",value:"Log in",className:"btn red"}),r.default.createElement("span",null,"  "),r.default.createElement("input",{type:"reset",value:"Reset",className:"btn blue"})),r.default.createElement("div",null,r.default.createElement(s.default,{appId:"2000714743477067",autoLoad:!0,fields:"name,email,picture",onClick:this.componentClicked,callback:this.responseFacebook}),r.default.createElement("span",null," "),r.default.createElement(l.default,{clientId:"224684001964-oacus7a8d2j200348v9l4iavf0qu7an5.apps.googleusercontent.com",buttonText:"Login with Google",onSuccess:this.responseGoogle,onFailure:this.responseGoogle})))}})},702:function(e,t,n){!function(t,o){e.exports=o(n(4))}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(11),c=o(l),p=n(9),f=o(p),d=n(4),h=o(d),g=n(3),m=o(g),b=function(){var e=!1;try{e=!!(window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i))}catch(e){}return e},y=function(e){return["button","input","select","textarea","optgroup","option","fieldset"].indexOf((e+"").toLowerCase())>=0},v=function(e){function t(){var e,n,o,i;a(this,t);for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c];return n=o=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.state={isSdkLoaded:!1,isProcessing:!1},o.responseApi=function(e){window.FB.api("/me",{locale:o.props.language,fields:o.props.fields},function(t){s(t,e),o.props.callback(t)})},o.checkLoginState=function(e){o.setStateIfMounted({isProcessing:!1}),e.authResponse?o.responseApi(e.authResponse):o.props.onFailure?o.props.onFailure({status:e.status}):o.props.callback({status:e.status})},o.checkLoginAfterRefresh=function(e){"connected"===e.status?o.checkLoginState(e):window.FB.login(function(e){return o.checkLoginState(e)},!0)},o.click=function(e){if(o.state.isSdkLoaded&&!o.state.isProcessing&&!o.props.isDisabled){o.setState({isProcessing:!0});var t=o.props,n=t.scope,a=t.appId,r=t.onClick,i=t.reAuthenticate,s=t.returnScopes,u=t.redirectUri,l=t.disableMobileRedirect;if("function"!=typeof r||(r(e),!e.defaultPrevented)){var c={client_id:a,redirect_uri:u,state:"facebookdirect",return_scopes:s,scope:n};i&&(c.auth_type="reauthenticate"),o.props.isMobile&&!l?window.location.href="//www.facebook.com/dialog/oauth"+(0,m.default)(c):window.FB.login(o.checkLoginState,{scope:n,return_scopes:s,auth_type:c.auth_type})}}},i=n,r(o,i)}return i(t,e),u(t,[{key:"componentDidMount",value:function(){if(this._isMounted=!0,document.getElementById("facebook-jssdk"))return void this.sdkLoaded();this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||(e=document.createElement("div"),e.id="fb-root",document.body.appendChild(e))}},{key:"componentWillReceiveProps",value:function(e){this.state.isSdkLoaded&&e.autoLoad&&!this.props.autoLoad&&window.FB.getLoginStatus(this.checkLoginAfterRefresh)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,t=this.props,n=t.appId,o=t.xfbml,a=t.cookie,r=t.version,i=t.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+r,appId:n,xfbml:o,cookie:a}),e.setStateIfMounted({isSdkLoaded:!0}),(i||window.location.search.includes("facebookdirect"))&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(t,n,o){var a=t.getElementsByTagName(n)[0],r=a,i=a;t.getElementById(o)||(i=t.createElement(n),i.id=o,i.src="https://connect.facebook.net/"+e+"/sdk.js",r.parentNode.insertBefore(i,r))}(document,"script","facebook-jssdk")}},{key:"style",value:function(){var e=this.constructor.defaultProps.cssClass;return this.props.cssClass===e&&c.default.createElement("style",{dangerouslySetInnerHTML:{__html:h.default}})}},{key:"containerStyle",value:function(){var e={transition:"opacity 0.5s"};return(this.state.isProcessing||!this.state.isSdkLoaded||this.props.isDisabled)&&(e.opacity=.6),s(e,this.props.containerStyle)}},{key:"renderOwnButton",value:function(){var e=this.props,t=e.cssClass,n=e.size,o=e.icon,a=e.textButton,r=e.typeButton,i=e.buttonStyle,u="string"==typeof o,l={};return this.props.isDisabled&&y(this.props.tag)&&(l.disabled=!0),c.default.createElement("span",{style:this.containerStyle()},u&&c.default.createElement("link",{rel:"stylesheet",href:"//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"}),c.default.createElement(this.props.tag,s({type:r,className:t+" "+n,style:i,onClick:this.click},l),o&&u&&c.default.createElement("i",{className:"fa "+o}),o&&!u&&o,a),this.style())}},{key:"render",value:function(){var e=this.props.children;return e?c.default.createElement("span",{onClick:this.click},e):this.renderOwnButton()}}]),t}(c.default.Component);v.propTypes={isDisabled:f.default.bool,callback:f.default.func.isRequired,appId:f.default.string.isRequired,xfbml:f.default.bool,cookie:f.default.bool,reAuthenticate:f.default.bool,scope:f.default.string,returnScopes:f.default.bool,redirectUri:f.default.string,textButton:f.default.string,typeButton:f.default.string,autoLoad:f.default.bool,disableMobileRedirect:f.default.bool,isMobile:f.default.bool,size:f.default.string,fields:f.default.string,cssClass:f.default.string,version:f.default.string,icon:f.default.any,language:f.default.string,onClick:f.default.func,containerStyle:f.default.object,buttonStyle:f.default.object,children:f.default.node,tag:f.default.oneOfType([f.default.node,f.default.func]),onFailure:f.default.func},v.defaultProps={textButton:"Login with Facebook",typeButton:"button",redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",returnScopes:!1,xfbml:!1,cookie:!1,reAuthenticate:!1,size:"metro",fields:"name",cssClass:"kep-login-facebook",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:b(),tag:"button",onFailure:null},t.default=v},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(1),r=o(a);t.default=r.default},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"?"+Object.keys(e).map(function(t){return t+"="+encodeURIComponent(e[t])}).join("&")}},function(e,t,n){t=e.exports=n(5)(),t.push([e.id,".kep-login-facebook{font-family:Helvetica,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;color:#fff;cursor:pointer;display:inline-block;font-size:calc(.27548vw + 12.71074px);text-decoration:none;text-transform:uppercase;transition:background-color .3s,border-color .3s;background-color:#4c69ba;border:calc(.06887vw + .67769px) solid #4c69ba;padding:calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)}.kep-login-facebook.small{padding:calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)}.kep-login-facebook.medium{padding:calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)}.kep-login-facebook.metro{border-radius:0}.kep-login-facebook .fa{margin-right:calc(.34435vw + 3.38843px)}",""]),t.locals={"kep-login-facebook":"kep-login-facebook",small:"small",medium:"medium",metro:"metro",fa:"fa"}},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(o[r]=!0)}for(a=0;a<t.length;a++){var i=t[a];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(e,t){"use strict";function n(e){return function(){return e}}var o=function(){};o.thatReturns=n,o.thatReturnsFalse=n(!1),o.thatReturnsTrue=n(!0),o.thatReturnsNull=n(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,n){"use strict";function o(e,t,n,o,r,i,s,u){if(a(t),!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,r,i,s,u],p=0;l=new Error(t.replace(/%s/g,function(){return c[p++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}}var a=function(e){};e.exports=o},function(e,t,n){"use strict";var o=n(6),a=n(7),r=n(10);e.exports=function(){function e(e,t,n,o,i,s){s!==r&&a(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){e.exports=n(8)()},function(e,t){"use strict";var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";e.exports=n},function(t,n){t.exports=e}])})},703:function(e,t,n){!function(t,o){e.exports=o(n(4))}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(1),s=n.n(i),u=n(2),l=(n.n(u),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),c=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.signIn=n.signIn.bind(n),n.enableButton=n.enableButton.bind(n),n.state={disabled:!0},n}return r(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.clientId,o=t.cookiePolicy,a=t.loginHint,r=t.hostedDomain,i=t.autoLoad,s=t.isSignedIn,u=t.fetchBasicProfile,l=t.redirectUri,c=t.discoveryDocs,p=t.onFailure,f=t.uxMode,d=t.scope,h=t.responseType;!function(e,t,n,o){var a=e.getElementsByTagName(t)[0],r=a,i=a;i=e.createElement(t),i.id="google-login",i.src="//apis.google.com/js/client:platform.js",r.parentNode.insertBefore(i,r),i.onload=o}(document,"script",0,function(){var t={client_id:n,cookie_policy:o,login_hint:a,hosted_domain:r,fetch_basic_profile:u,discoveryDocs:c,ux_mode:f,redirect_uri:l,scope:d};"code"===h&&(t.access_type="offline"),window.gapi.load("auth2",function(){e.enableButton(),window.gapi.auth2.getAuthInstance()||window.gapi.auth2.init(t).then(function(t){s&&t.isSignedIn.get()&&e._handleSigninSuccess(t.currentUser.get())},function(e){return p(e)}),i&&e.signIn()})})}},{key:"componentWillUnmount",value:function(){this.enableButton=function(){}}},{key:"enableButton",value:function(){this.setState({disabled:!1})}},{key:"signIn",value:function(e){var t=this;if(e&&e.preventDefault(),!this.state.disabled){var n=window.gapi.auth2.getAuthInstance(),o=this.props,a=o.onSuccess,r=o.onRequest,i=o.onFailure,s=o.prompt,u=o.responseType,l={prompt:s};r(),"code"===u?n.grantOfflineAccess(l).then(function(e){return a(e)},function(e){return i(e)}):n.signIn(l).then(function(e){return t._handleSigninSuccess(e)},function(e){return i(e)})}}},{key:"_handleSigninSuccess",value:function(e){var t=e.getBasicProfile(),n=e.getAuthResponse();e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},this.props.onSuccess(e)}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.type,o=e.style,a=e.className,r=e.disabledStyle,i=e.buttonText,u=e.children,l=this.state.disabled||this.props.disabled,c={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},p=function(){return o||(a&&!o?{}:c)}(),f=function(){return l?Object.assign({},p,r):p}();return s.a.createElement(t,{onClick:this.signIn,style:f,type:n,disabled:l,className:a},u||i)}}]),t}(i.Component);c.defaultProps={type:"button",tag:"button",buttonText:"Login with Google",scope:"profile email",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},onRequest:function(){}},t.a=c},function(t,n){t.exports=e},function(e,t,n){"function"==typeof Symbol&&Symbol.iterator,e.exports=n(5)()},function(e,t,n){e.exports=n(4)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0);n.d(t,"default",function(){return o.a}),n.d(t,"GoogleLogin",function(){return o.a});var a=n(9);n.d(t,"GoogleLogout",function(){return a.a})},function(e,t,n){"use strict";var o=n(6),a=n(7),r=n(8);e.exports=function(){function e(e,t,n,o,i,s){s!==r&&a(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";function o(e){return function(){return e}}var a=function(){};a.thatReturns=o,a.thatReturnsFalse=o(!1),a.thatReturnsTrue=o(!0),a.thatReturnsNull=o(null),a.thatReturnsThis=function(){return this},a.thatReturnsArgument=function(e){return e},e.exports=a},function(e,t,n){"use strict";function o(e,t,n,o,r,i,s,u){if(a(t),!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,o,r,i,s,u],p=0;l=new Error(t.replace(/%s/g,function(){return c[p++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}}var a=function(e){};e.exports=o},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(1),s=n.n(i),u=n(2),l=(n.n(u),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),c=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={disabled:!0},n.signOut=n.signOut.bind(n),n}return r(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this;!function(e,t,n,o){var a=e.getElementsByTagName(t)[0],r=a,i=a;i=e.createElement(t),i.id="google-login",i.src="//apis.google.com/js/client:platform.js",r.parentNode.insertBefore(i,r),i.onload=o}(document,"script",0,function(){window.gapi.load("auth2",function(){e.setState({disabled:!1})})})}},{key:"signOut",value:function(){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.signOut().then(this.props.onLogoutSuccess)}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.style,o=e.className,a=e.disabledStyle,r=e.buttonText,i=e.children,u=this.state.disabled||this.props.disabled,l={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},c=function(){return n||(o&&!n?{}:l)}(),p=function(){return u?Object.assign({},c,a):c}();return s.a.createElement(t,{onClick:this.signOut,style:p,disabled:u,className:o},i||r)}}]),t}(i.Component);c.defaultProps={tag:"button",buttonText:"Logout",responseType:"permission",disabledStyle:{opacity:.6},onRequest:function(){}},t.a=c}])})}});