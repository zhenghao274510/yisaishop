(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mineoptions/setpossword"],{"089d":function(t,e,i){"use strict";var n=i("d9d4"),a=i.n(n);a.a},"42cc":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("c5eb"));function a(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{phone:"",rTime:"获取验证码",interval:null,btnState:!1,YZM:"",code:"",password:"",title:""}},onLoad:function(t){1==t.id?this.title="修改支付密码":this.title="设置支付密码",this.$api.setNav(this.title)},methods:{getYZM:function(){var t=this;""==this.phone?this.$api.tip("手机号不能为空!"):this.$api.regPhone(this.phone)?"获取验证码"==this.rTime&&this._reqw.post({cmd:"sendSms",phone:this.phone}).then((function(e){0==e.result?(t.rTime=60,t.btnState=!0,t.interval=setInterval((function(){--t.rTime<=0&&(t.rTime="获取验证码",clearInterval(t.interval),t.btnState=!1)}),1e3),t.$api.tip(e.resultNote)):t.$api.tip(e.resultNote)})).catch((function(t){})):this.$api.tip("请输入正确的手机号!")},subOrder:function(){var e=this;if(t.showLoading({title:"提交中..."}),""==this.phone)this.$api.tip("手机号不能为空!");else if(this.$api.regPhone(this.phone))if(""==this.YZM)this.$api.tip("请输入验证码");else{var i={cmd:"editPayword",uid:t.getStorageSync("uid"),code:this.YZM,payword:(0,n.default)(this.password)};console.log(i),this._reqw.post(i).then((function(i){0==i.result?(t.hideLoading(),e.$api.tip(i.resultNote),e.$api.back()):e.$api.tip(i.resultNote)})).catch((function(t){}))}else this.$api.tip("请输入正确的手机号!")}},onHide:function(){this.interval&&clearInterval(this.interval)}};e.default=o}).call(this,i("543d")["default"])},5754:function(t,e,i){"use strict";i.r(e);var n=i("42cc"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"73cd":function(t,e,i){"use strict";(function(t){i("b4b3");n(i("66fd"));var e=n(i("f5ae"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"769a":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},d9d4:function(t,e,i){},f5ae:function(t,e,i){"use strict";i.r(e);var n=i("769a"),a=i("5754");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("089d");var r,s=i("f0c5"),u=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"59982470",null,!1,n["a"],r);e["default"]=u.exports}},[["73cd","common/runtime","common/vendor"]]]);