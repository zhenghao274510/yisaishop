(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabs/userInfo"],{"0870":function(t,e,n){"use strict";(function(t){n("b4b3");i(n("66fd"));var e=i(n("f016"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"0eef":function(t,e,n){"use strict";n.r(e);var i=n("8a5a"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"35c4":function(t,e,n){"use strict";var i=n("7dcf"),o=n.n(i);o.a},"7dcf":function(t,e,n){},"8a5a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{rTime:"获取验证码",btnState:!1,interval:null,code:"",dataobject:{sex:"",nickname:"",icon:"",phone:""}}},onLoad:function(){this.getUserInfo()},methods:{userOptions:function(t){0==t?this.$api.navTo("/pages/mineoptions/setpossword?id=".concat(this.dataobject.payword)):this.$api.navTo("/pages/mineoptions/changePhone")},getUserInfo:function(){var e=this,n={cmd:"userInfo",uid:t.getStorageSync("uid")};this._reqw.post(n).then((function(t){0==t.result?e.dataobject=t.body:e.$api.tip(t.resultNote)})).catch((function(t){}))},saveUserInfo:function(){var e=this,n=this.userInfo;if(""==n.name)this.$api.tip("请输入昵称!");else if(""==n.mobile)this.$api.tip("请输入手机号!");else if(""==n.code)this.$api.tip("请输入验证码!");else if(this.$api.regPhone(n.mobile)){var i={cmd:"",uid:t.getStorageSync("uid"),nickname:this.dataobject.nickname,icon:this.dataobject.icon};this._reqw.post(i,"userInfoEdit").then((function(t){0==t.result?(e.$api.tip("修改成功!"),e.$api.back()):e.$api.tip(t.resultNote)})).catch((function(t){}))}else this.$api.tip("手机号格式不正确!")},formImg:function(t){var e=this;this._reqw.upflie(t).then((function(t){var n=JSON.parse(t);0==n.result?e.dataobject.icon=n.object:e.$api.tip(n.resultNote)})).catch((function(t){}))},uploads:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera","album"],success:function(t){console.log(t),e.formImg(t.tempFiles[0])}})}}};e.default=n}).call(this,n("543d")["default"])},a4e2:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},f016:function(t,e,n){"use strict";n.r(e);var i=n("a4e2"),o=n("0eef");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("35c4");var c,s=n("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"5ee69425",null,!1,i["a"],c);e["default"]=u.exports}},[["0870","common/runtime","common/vendor"]]]);