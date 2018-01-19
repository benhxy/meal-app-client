webpackJsonp([9],{2:function(e,t,n){"use strict";function r(e){return"[object Array]"===b.call(e)}function o(e){return"[object ArrayBuffer]"===b.call(e)}function a(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function i(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function l(e){return"[object Date]"===b.call(e)}function d(e){return"[object File]"===b.call(e)}function p(e){return"[object Blob]"===b.call(e)}function h(e){return"[object Function]"===b.call(e)}function m(e){return f(e)&&h(e.pipe)}function g(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function y(e,t){if(null!==e&&"undefined"!=typeof e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)y(arguments[n],e);return t}function E(e,t,n){return y(t,function(t,r){n&&"function"==typeof t?e[r]=S(t,n):e[r]=t}),e}var S=n(14),C=n(39),b=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:a,isArrayBufferView:s,isString:i,isNumber:u,isObject:f,isUndefined:c,isDate:l,isFile:d,isBlob:p,isFunction:h,isStream:m,isURLSearchParams:g,isStandardBrowserEnv:v,forEach:y,merge:x,extend:E,trim:w}},6:function(e,t,n){(function(t){"use strict";function r(e,t){!a.isUndefined(e)&&a.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(10):"undefined"!=typeof t&&(e=n(10)),e}var a=n(2),s=n(35),i={"Content-Type":"application/x-www-form-urlencoded"},u={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),a.isFormData(e)||a.isArrayBuffer(e)||a.isBuffer(e)||a.isStream(e)||a.isFile(e)||a.isBlob(e)?e:a.isArrayBufferView(e)?e.buffer:a.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):a.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},a.forEach(["delete","get","head"],function(e){u.headers[e]={}}),a.forEach(["post","put","patch"],function(e){u.headers[e]=a.merge(i)}),e.exports=u}).call(t,n(3))},10:function(e,t,n){(function(t){"use strict";var r=n(2),o=n(27),a=n(30),s=n(36),i=n(34),u=n(13),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(29);e.exports=function(e){return new Promise(function(f,l){var d=e.data,p=e.headers;r.isFormData(d)&&delete p["Content-Type"];var h=new XMLHttpRequest,m="onreadystatechange",g=!1;if(window.XMLHttpRequest||"test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||i(e.url)||(h=new window.XDomainRequest,m="onload",g=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var w=e.auth.username||"",v=e.auth.password||"";p.Authorization="Basic "+c(w+":"+v)}if(h.open(e.method.toUpperCase(),a(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[m]=function(){if(h&&(4===h.readyState||g)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in h?s(h.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?h.response:h.responseText,r={data:n,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:t,config:e,request:h};o(f,l,r),h=null}},h.onerror=function(){l(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){l(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var y=n(32),x=(e.withCredentials||i(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;x&&(p[e.xsrfHeaderName]=x)}if("setRequestHeader"in h&&r.forEach(p,function(e,t){"undefined"==typeof d&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),l(e),h=null)}),void 0===d&&(d=null),h.send(d)})}}).call(t,n(3))},11:function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},12:function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},13:function(e,t,n){"use strict";var r=n(26);e.exports=function(e,t,n,o,a){var s=new Error(e);return r(s,t,n,o,a)}},14:function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},20:function(e,t,n){e.exports=n(21)},21:function(e,t,n){"use strict";function r(e){var t=new s(e),n=a(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),a=n(14),s=n(23),i=n(6),u=r(i);u.Axios=s,u.create=function(e){return r(o.merge(i,e))},u.Cancel=n(11),u.CancelToken=n(22),u.isCancel=n(12),u.all=function(e){return Promise.all(e)},u.spread=n(37),e.exports=u,e.exports.default=u},22:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(11);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},23:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(6),a=n(2),s=n(24),i=n(25);r.prototype.request=function(e){"string"==typeof e&&(e=a.merge({url:arguments[0]},arguments[1])),e=a.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase();var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},a.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(a.merge(n||{},{method:e,url:t}))}}),a.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(a.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},24:function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},25:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),a=n(28),s=n(12),i=n(6),u=n(33),c=n(31);e.exports=function(e){r(e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=a(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||i.adapter;return t(e).then(function(t){return r(e),t.data=a(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=a(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},26:function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},27:function(e,t,n){"use strict";var r=n(13);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},28:function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},29:function(e,t){"use strict";function n(){this.message="String contains an invalid character"}function r(e){for(var t,r,a=String(e),s="",i=0,u=o;a.charAt(0|i)||(u="=",i%1);s+=u.charAt(63&t>>8-i%1*8)){if(r=a.charCodeAt(i+=.75),r>255)throw new n;t=t<<8|r}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r},30:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(o.isURLSearchParams(t))a=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),a=s.join("&")}return a&&(e+=(e.indexOf("?")===-1?"?":"&")+a),e}},31:function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},32:function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,a,s){var i=[];i.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),r.isString(o)&&i.push("path="+o),r.isString(a)&&i.push("domain="+a),s===!0&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},33:function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},34:function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},35:function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},36:function(e,t,n){"use strict";var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,a,s={};return e?(r.forEach(e.split("\n"),function(e){if(a=e.indexOf(":"),t=r.trim(e.substr(0,a)).toLowerCase(),n=r.trim(e.substr(a+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n}}),s):s}},37:function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},38:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(5),a=r(o);t.default=a.default.createClass({displayName:"WarningCard",render:function(){return""===this.props.warning?a.default.createElement("div",null):a.default.createElement("div",{className:"card red"},a.default.createElement("div",{className:"card-content white-text"},this.props.warning))}})},39:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},402:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(5),a=r(o),s=n(178),i=n(20),u=r(i),c=n(38),f=r(c);t.default=a.default.createClass({displayName:"UserDetail",getInitialState:function(){return{compName:"User details",id:"",name:"",password:"",role:"",warning:""}},componentWillMount:function(){this.getUserDetail()},getUserDetail:function(){var e=this,t=this.props.params.id;console.log(t),u.default.get("/api/user/"+t,{headers:{token:localStorage.getItem("RunAppToken")}}).then(function(n){console.log(n.data),n.data.success?e.setState({id:t,name:n.data.message.name,password:n.data.message.password,role:n.data.message.role}):e.setState({warning:n.data.message})}).catch(function(t){e.setState({warning:t})})},handleNameChange:function(e){this.setState({name:e.target.value})},handlePasswordChange:function(e){this.setState({password:e.target.value})},handleRoleChange:function(e){this.setState({role:e.target.value})},handleSubmit:function(e){return e.preventDefault(),""==this.state.name?void this.setState({warning:"Please enter a valid name"}):""==this.state.password?void this.setState({warning:"Please enter a password"}):"user"!==this.state.role&&"userManager"!==this.state.role&&"admin"!==this.state.role?void this.setState({warning:"Please enter a role from user, userManager or admin"}):void this.putUser()},putUser:function(){var e=this,t=this.state.id,n={name:this.state.name,password:this.state.password,role:this.state.role};u.default.put("/api/user/"+t,n,{headers:{token:localStorage.getItem("RunAppToken")}}).then(function(t){t.data.success?e.props.history.push("/user"):e.setState({warning:t.data.message})}).catch(function(t){e.setState({warning:t})})},handleDelete:function(){var e=this,t=this.state.id;u.default.delete("/api/user/"+t,{headers:{token:localStorage.getItem("RunAppToken")}}).then(function(t){t.data.success?e.props.history.push("/user"):e.setState({warning:t.data.message})}).catch(function(t){e.setState({warning:t})})},render:function(){return a.default.createElement("div",null,a.default.createElement("h3",null,this.state.compName),a.default.createElement(f.default,{warning:this.state.warning}),a.default.createElement("form",null,a.default.createElement("h5",null,"User name"),a.default.createElement("div",{className:"input-field"},a.default.createElement("input",{type:"text",value:this.state.name,onChange:this.handleNameChange})),a.default.createElement("h5",null,"Password"),a.default.createElement("div",{className:"input-field"},a.default.createElement("input",{type:"text",value:this.state.password,onChange:this.handlePasswordChange})),a.default.createElement("h5",null,"Role"),a.default.createElement("div",{className:"input-field"},a.default.createElement("input",{type:"text",value:this.state.role,onChange:this.handleRoleChange})),a.default.createElement("a",{href:"javascript:;",className:"btn blue",onClick:this.handleSubmit},"Submit"),a.default.createElement("span",null,"  "),a.default.createElement(s.Link,{to:"/run",className:"btn blue"},"Cancel"),a.default.createElement("span",null,"  "),a.default.createElement("a",{href:"javascript:;",className:"btn red",onClick:this.handleDelete},"Delete")))}})}});