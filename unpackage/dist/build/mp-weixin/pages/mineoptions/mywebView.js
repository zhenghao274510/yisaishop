(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mineoptions/mywebView"],{"42a7":function(t,e,n){"use strict";var o=n("730a"),i=n.n(o);i.a},"71b3":function(t,e,n){"use strict";n.r(e);var o=n("c0c9"),i=n("fcc9");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("42a7");var r,a=n("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"068db847",null,!1,o["a"],r);e["default"]=u.exports},"730a":function(t,e,n){},"8e6c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(function(){return resolve(n("f9bf"))}.bind(null,n)).catch(n.oe)},i={components:{jyfParser:o},data:function(){return{type:"",content:"",title:""}},onLoad:function(t){t.type?(this.type=t.type,this.loadData()):t.content&&(this.content=this.$api.formText(decodeURIComponent(t.content))),1==t.type?this.title="关于我们":2==t.type?this.title="会员专享":3==t.type?this.title="积分兑好礼":4==t.type?this.title="充值说明":5==t.type?this.title="签到活动规则":6==t.type?this.title="积分商城规则":this.title="伊赛商城",this.$api.setNav(this.title)},methods:{loadData:function(){var t=this,e=this.type,n={cmd:"getAgreementList"};this._reqw.post(n).then((function(n){0==n.result?n.body.dataList.forEach((function(n){n.type==e&&(t.content=t.$api.formText(n.content))})):t.$api.tip(n.resultNote)})).catch((function(t){}))}}};e.default=i},ba6f:function(t,e,n){"use strict";(function(t){n("b4b3");o(n("66fd"));var e=o(n("71b3"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},c0c9:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return o}));var o={jyfParser:function(){return Promise.all([n.e("common/vendor"),n.e("components/jyf-parser/jyf-parser")]).then(n.bind(null,"f9bf"))}},i=function(){var t=this,e=t.$createElement;t._self._c},c=[]},fcc9:function(t,e,n){"use strict";n.r(e);var o=n("8e6c"),i=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e["default"]=i.a}},[["ba6f","common/runtime","common/vendor"]]]);