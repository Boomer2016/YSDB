(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{653:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=f(n(132)),a=f(n(53)),i=f(n(130)),u=f(n(54)),l=f(n(55)),c=n(0),d=f(c),s=(n(656),n(657));n(363);function f(e){return e&&e.__esModule?e:{default:e}}new(f(n(658)).default);var p,v=(0,s.observer)((p=c.Component,(0,l.default)(m,p),(0,i.default)(m,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return d.default.createElement("div",{className:"page-home"},"home")}}]),r=m))||r;function m(){return(0,a.default)(this,m),(0,u.default)(this,(m.__proto__||(0,o.default)(m)).apply(this,arguments))}t.default=v},658:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o,a=v(n(365)),i=v(n(659)),u=v(n(366)),l=v(n(367)),c=v(n(53)),d=v(n(130)),s=n(656),f=n(363),p=v(n(662));function v(e){return e&&e.__esModule?e:{default:e}}function m(n,r,e,t,o){var a={};return Object.keys(t).forEach(function(e){a[e]=t[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=e.slice().reverse().reduce(function(e,t){return t(n,r,e)||e},a),o&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(o):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(n,r,a),a=null),a}var b,h=((0,d.default)(y,[{key:"getContent",value:(b=(0,l.default)(u.default.mark(function e(){var t,n=this;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.default.getContent({param:"1"});case 3:t=e.sent,(0,s.runInAction)(function(){n.content=t.story}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),f.message.error(e.t0.message);case 10:case"end":return e.stop()}},e,this,[[0,7]])})),function(){return b.apply(this,arguments)})},{key:"clearContent",value:function(){this.content=""}}]),o=m((r=y).prototype,"content",[s.observable],{enumerable:!0,initializer:function(){return""}}),m(r.prototype,"getContent",[s.action],(0,i.default)(r.prototype,"getContent"),r.prototype),m(r.prototype,"clearContent",[s.action],(0,i.default)(r.prototype,"clearContent"),r.prototype),r);function y(){var e,t,n,r;(0,c.default)(this,y),t="content",r=e=this,(n=o)&&(0,a.default)(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}t.default=h},662:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(663),a=(r=o)&&r.__esModule?r:{default:r};a.default.create("home",{getContent:{mock:!0,mockUrl:"page-home/getContent",url:""}}),t.default=a.default.api.home},663:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(e){{if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}}(n(664)),a=n(0),i=(r=a)&&r.__esModule?r:{default:r},u=n(363);var l=o.context({urlPrefix:"/",method:"POST",mock:!1,rest:!0,header:{"Content-Type":"application/json; charset=utf-8"},data:{userId:1,tenantId:4,productId:89},withCredentials:!1,mockUrlPrefix:"/mock/",urlMark:!1,urlStamp:!1,fit:function(e){if(e){if(e.code&&403===e.code||403===e.status){var t=e.message||e.errorMsg||"登录超时，请重新登录";throw document.getElementById("login_timeout")||u.Modal.confirm({title:i.default.createElement("span",{id:"login_timeout"},t),content:"",onOk:function(){return window.location.reload()}}),new Error(t)}return{success:e.success,content:null===e.content?{}:e.content,error:{message:e.message||e.errorMsg,code:e.code||e.errorCode}}}return{success:!1,content:{},error:{message:"网络异常，请刷新页面重试！",code:""}}}});t.default=l}}]);