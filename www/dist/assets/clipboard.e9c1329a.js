import{c as B,a as J,V as j}from"./index.404bbd5c.js";var M={exports:{}};/*!
 * clipboard.js v2.0.10
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */(function(C,O){(function(x,b){C.exports=b()})(B,function(){return function(){var E={686:function(l,c,t){t.d(c,{default:function(){return X}});var a=t(279),f=t.n(a),s=t(370),g=t.n(s),y=t(817),h=t.n(y);function d(o){try{return document.execCommand(o)}catch{return!1}}var v=function(n){var e=h()(n);return d("cut"),e},p=v;function _(o){var n=document.documentElement.getAttribute("dir")==="rtl",e=document.createElement("textarea");e.style.fontSize="12pt",e.style.border="0",e.style.padding="0",e.style.margin="0",e.style.position="absolute",e.style[n?"right":"left"]="-9999px";var i=window.pageYOffset||document.documentElement.scrollTop;return e.style.top="".concat(i,"px"),e.setAttribute("readonly",""),e.value=o,e}var k=function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body},i="";if(typeof n=="string"){var r=_(n);e.container.appendChild(r),i=h()(r),d("copy"),r.remove()}else i=h()(n),d("copy");return i},L=k;function w(o){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?w=function(e){return typeof e}:w=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(o)}var D=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.action,i=e===void 0?"copy":e,r=n.container,u=n.target,m=n.text;if(i!=="copy"&&i!=="cut")throw new Error('Invalid "action" value, use either "copy" or "cut"');if(u!==void 0)if(u&&w(u)==="object"&&u.nodeType===1){if(i==="copy"&&u.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if(i==="cut"&&(u.hasAttribute("readonly")||u.hasAttribute("disabled")))throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`)}else throw new Error('Invalid "target" value, use a valid Element');if(m)return L(m,{container:r});if(u)return i==="cut"?p(u):L(u,{container:r})},F=D;function S(o){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?S=function(e){return typeof e}:S=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(o)}function H(o,n){if(!(o instanceof n))throw new TypeError("Cannot call a class as a function")}function N(o,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(o,i.key,i)}}function I(o,n,e){return n&&N(o.prototype,n),e&&N(o,e),o}function z(o,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");o.prototype=Object.create(n&&n.prototype,{constructor:{value:o,writable:!0,configurable:!0}}),n&&P(o,n)}function P(o,n){return P=Object.setPrototypeOf||function(i,r){return i.__proto__=r,i},P(o,n)}function U(o){var n=$();return function(){var i=T(o),r;if(n){var u=T(this).constructor;r=Reflect.construct(i,arguments,u)}else r=i.apply(this,arguments);return V(this,r)}}function V(o,n){return n&&(S(n)==="object"||typeof n=="function")?n:Y(o)}function Y(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function $(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function T(o){return T=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},T(o)}function R(o,n){var e="data-clipboard-".concat(o);if(!!n.hasAttribute(e))return n.getAttribute(e)}var G=function(o){z(e,o);var n=U(e);function e(i,r){var u;return H(this,e),u=n.call(this),u.resolveOptions(r),u.listenClick(i),u}return I(e,[{key:"resolveOptions",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.action=typeof r.action=="function"?r.action:this.defaultAction,this.target=typeof r.target=="function"?r.target:this.defaultTarget,this.text=typeof r.text=="function"?r.text:this.defaultText,this.container=S(r.container)==="object"?r.container:document.body}},{key:"listenClick",value:function(r){var u=this;this.listener=g()(r,"click",function(m){return u.onClick(m)})}},{key:"onClick",value:function(r){var u=r.delegateTarget||r.currentTarget,m=this.action(u)||"copy",A=F({action:m,container:this.container,target:this.target(u),text:this.text(u)});this.emit(A?"success":"error",{action:m,text:A,trigger:u,clearSelection:function(){u&&u.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(r){return R("action",r)}},{key:"defaultTarget",value:function(r){var u=R("target",r);if(u)return document.querySelector(u)}},{key:"defaultText",value:function(r){return R("text",r)}},{key:"destroy",value:function(){this.listener.destroy()}}],[{key:"copy",value:function(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{container:document.body};return L(r,u)}},{key:"cut",value:function(r){return p(r)}},{key:"isSupported",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:["copy","cut"],u=typeof r=="string"?[r]:r,m=!!document.queryCommandSupported;return u.forEach(function(A){m=m&&!!document.queryCommandSupported(A)}),m}}]),e}(f()),X=G},828:function(l){var c=9;if(typeof Element!="undefined"&&!Element.prototype.matches){var t=Element.prototype;t.matches=t.matchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector}function a(f,s){for(;f&&f.nodeType!==c;){if(typeof f.matches=="function"&&f.matches(s))return f;f=f.parentNode}}l.exports=a},438:function(l,c,t){var a=t(828);function f(y,h,d,v,p){var _=g.apply(this,arguments);return y.addEventListener(d,_,p),{destroy:function(){y.removeEventListener(d,_,p)}}}function s(y,h,d,v,p){return typeof y.addEventListener=="function"?f.apply(null,arguments):typeof d=="function"?f.bind(null,document).apply(null,arguments):(typeof y=="string"&&(y=document.querySelectorAll(y)),Array.prototype.map.call(y,function(_){return f(_,h,d,v,p)}))}function g(y,h,d,v){return function(p){p.delegateTarget=a(p.target,h),p.delegateTarget&&v.call(y,p)}}l.exports=s},879:function(l,c){c.node=function(t){return t!==void 0&&t instanceof HTMLElement&&t.nodeType===1},c.nodeList=function(t){var a=Object.prototype.toString.call(t);return t!==void 0&&(a==="[object NodeList]"||a==="[object HTMLCollection]")&&"length"in t&&(t.length===0||c.node(t[0]))},c.string=function(t){return typeof t=="string"||t instanceof String},c.fn=function(t){var a=Object.prototype.toString.call(t);return a==="[object Function]"}},370:function(l,c,t){var a=t(879),f=t(438);function s(d,v,p){if(!d&&!v&&!p)throw new Error("Missing required arguments");if(!a.string(v))throw new TypeError("Second argument must be a String");if(!a.fn(p))throw new TypeError("Third argument must be a Function");if(a.node(d))return g(d,v,p);if(a.nodeList(d))return y(d,v,p);if(a.string(d))return h(d,v,p);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function g(d,v,p){return d.addEventListener(v,p),{destroy:function(){d.removeEventListener(v,p)}}}function y(d,v,p){return Array.prototype.forEach.call(d,function(_){_.addEventListener(v,p)}),{destroy:function(){Array.prototype.forEach.call(d,function(_){_.removeEventListener(v,p)})}}}function h(d,v,p){return f(document.body,d,v,p)}l.exports=s},817:function(l){function c(t){var a;if(t.nodeName==="SELECT")t.focus(),a=t.value;else if(t.nodeName==="INPUT"||t.nodeName==="TEXTAREA"){var f=t.hasAttribute("readonly");f||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),f||t.removeAttribute("readonly"),a=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var s=window.getSelection(),g=document.createRange();g.selectNodeContents(t),s.removeAllRanges(),s.addRange(g),a=s.toString()}return a}l.exports=c},279:function(l){function c(){}c.prototype={on:function(t,a,f){var s=this.e||(this.e={});return(s[t]||(s[t]=[])).push({fn:a,ctx:f}),this},once:function(t,a,f){var s=this;function g(){s.off(t,g),a.apply(f,arguments)}return g._=a,this.on(t,g,f)},emit:function(t){var a=[].slice.call(arguments,1),f=((this.e||(this.e={}))[t]||[]).slice(),s=0,g=f.length;for(s;s<g;s++)f[s].fn.apply(f[s].ctx,a);return this},off:function(t,a){var f=this.e||(this.e={}),s=f[t],g=[];if(s&&a)for(var y=0,h=s.length;y<h;y++)s[y].fn!==a&&s[y].fn._!==a&&g.push(s[y]);return g.length?f[t]=g:delete f[t],this}},l.exports=c,l.exports.TinyEmitter=c}},x={};function b(l){if(x[l])return x[l].exports;var c=x[l]={exports:{}};return E[l](c,c.exports,b),c.exports}return function(){b.n=function(l){var c=l&&l.__esModule?function(){return l.default}:function(){return l};return b.d(c,{a:c}),c}}(),function(){b.d=function(l,c){for(var t in c)b.o(c,t)&&!b.o(l,t)&&Object.defineProperty(l,t,{enumerable:!0,get:c[t]})}}(),function(){b.o=function(l,c){return Object.prototype.hasOwnProperty.call(l,c)}}(),b(686)}().default})})(M);var K=J(M.exports);function Q(){j.prototype.$message({message:"\u590D\u5236\u6210\u529F",type:"success",duration:1500})}function W(){j.prototype.$message({message:"\u590D\u5236\u5931\u8D25",type:"error"})}function tt(C,O){const E=new K(O.target,{text:()=>C});E.on("success",()=>{Q(),E.destroy()}),E.on("error",()=>{W(),E.destroy()}),E.onClick(O)}export{tt as h};
