(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{a55b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login container-fluid"},[e._m(0),s("main",{staticClass:"row bg-secondary"},[s("div",{staticClass:"col-10 col-lg-6 m-auto login-form"},[s("div",{staticClass:"card p-2 bg-primary"},[e.loginForm?s("form",{staticClass:"form-row m-2",on:{submit:function(t){return t.preventDefault(),e.loginUser(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.creds.email,expression:"creds.email"}],staticClass:"m-3 form-control",attrs:{type:"email",placeholder:"email"},domProps:{value:e.creds.email},on:{input:function(t){t.target.composing||e.$set(e.creds,"email",t.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.creds.password,expression:"creds.password"}],staticClass:"m-3 form-control",attrs:{type:"password",placeholder:"password"},domProps:{value:e.creds.password},on:{input:function(t){t.target.composing||e.$set(e.creds,"password",t.target.value)}}}),s("button",{staticClass:"btn btn-success m-2",attrs:{type:"submit"}},[e._v("Login")]),s("button",{staticClass:"btn btn-danger m-2"},[e._v("No Work Yet")])]):s("form",{staticClass:"m-2 form-row",on:{submit:function(t){return t.preventDefault(),e.register(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.name,expression:"newUser.name"}],staticClass:"m-3 form-control",attrs:{type:"text",placeholder:"name"},domProps:{value:e.newUser.name},on:{input:function(t){t.target.composing||e.$set(e.newUser,"name",t.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.email,expression:"newUser.email"}],staticClass:"m-3 form-control",attrs:{type:"email",placeholder:"email"},domProps:{value:e.newUser.email},on:{input:function(t){t.target.composing||e.$set(e.newUser,"email",t.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.password,expression:"newUser.password"}],staticClass:"m-3 form-control",attrs:{type:"password",placeholder:"password"},domProps:{value:e.newUser.password},on:{input:function(t){t.target.composing||e.$set(e.newUser,"password",t.target.value)}}}),s("button",{staticClass:"btn btn-warning",attrs:{type:"submit"}},[e._v("Create Account")])]),s("div",{staticClass:"action",on:{click:function(t){e.loginForm=!e.loginForm}}},[e.loginForm?s("p",[e._v("Create an account")]):s("p",[e._v("Already have an account? Click here to Login")])])])])]),s("footer",{staticClass:"row bg-secondary"},[s("div",{staticClass:"col-12 joinPoll"},[s("router-link",{attrs:{to:"/join"}},[e._v("Join Poll")])],1)])])},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",{staticClass:"bg-secondary row"},[s("div",{staticClass:"col-12 text-center"},[s("h1",{staticClass:"main-title"},[e._v("Docket.Live")])])])}],r=(s("a18c"),{name:"login",mounted(){},data(){return{loginForm:!0,creds:{email:"",password:""},newUser:{email:"",password:"",name:""}}},methods:{register(){this.$store.dispatch("register",this.newUser)},loginUser(){this.$store.dispatch("login",this.creds)}},computed:{}}),n=r,i=(s("d6db"),s("2877")),l=Object(i["a"])(n,a,o,!1,null,null,null);t["default"]=l.exports},d6db:function(e,t,s){"use strict";var a=s("e67a"),o=s.n(a);o.a},e67a:function(e,t,s){}}]);
//# sourceMappingURL=login.e5c4c5aa.js.map