import{v as n,n as i}from"./index.404bbd5c.js";var l={name:"Login",data(){return{loginForm:{username:"admin",password:"111111"},loginRules:{username:[{required:!0,trigger:"blur",validator:(s,r,o)=>{n(r)?o():o(new Error("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7528\u6237\u540D"))}}],password:[{required:!0,trigger:"blur",validator:(s,r,o)=>{r.length<6?o(new Error("\u8BF7\u8F93\u5165\u5BC6\u7801\u4E0D\u80FD\u5C11\u4E8E6\u4E2A\u6570\u5B57")):o()}}]},passwordType:"password",capsTooltip:!1,loading:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(e){const t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},created(){},mounted(){this.loginForm.username===""?this.$refs.username.focus():this.loginForm.password===""&&this.$refs.password.focus()},destroyed(){},methods:{checkCapslock({shiftKey:e,key:t}={}){t&&t.length===1&&(e&&t>="a"&&t<="z"||!e&&t>="A"&&t<="Z"?this.capsTooltip=!0:this.capsTooltip=!1),t==="CapsLock"&&this.capsTooltip===!0&&(this.capsTooltip=!1)},showPwd(){this.passwordType==="password"?this.passwordType="":this.passwordType="password",this.$nextTick(()=>{this.$refs.password.focus()})},handleLogin(){this.$refs.loginForm.validate(e=>{if(e)this.loading=!0,this.$store.dispatch("user/login",this.loginForm).then(()=>{this.$router.push({path:this.redirect||"/",query:this.otherQuery}),this.loading=!1}).catch(()=>{this.loading=!1});else return console.log("error submit!!"),!1})},getOtherQuery(e){return Object.keys(e).reduce((t,s)=>(s!=="redirect"&&(t[s]=e[s]),t),{})}}},p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[e._v("Login Form")])]),s("el-form-item",{attrs:{prop:"username"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),s("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}})],1),s("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(r){e.capsTooltip=r},expression:"capsTooltip"}},[s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),s("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(r){e.capsTooltip=!1}},nativeOn:{keyup:[function(r){return e.checkCapslock.apply(null,arguments)},function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.handleLogin.apply(null,arguments)}]},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}}),s("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[s("svg-icon",{attrs:{"icon-class":e.passwordType==="password"?"eye":"eye-open"}})],1)],1)],1),s("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(r){return r.preventDefault(),e.handleLogin.apply(null,arguments)}}},[e._v("Login")])],1)],1)},u=[];const a={};var c=i(l,p,u,!1,d,"e00bf44c",null,null);function d(e){for(let t in a)this[t]=a[t]}var h=function(){return c.exports}();export{h as default};