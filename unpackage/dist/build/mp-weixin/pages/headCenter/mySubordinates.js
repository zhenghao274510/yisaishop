(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/headCenter/mySubordinates"],{"1ca9":function(t,e,n){"use strict";(function(t){n("b4b3");a(n("66fd"));var e=a(n("6a46"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},2244:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){Promise.all([n.e("common/vendor"),n.e("components/s-pull-scroll/index")]).then(function(){return resolve(n("57aa"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/mycom/group-x-title").then(function(){return resolve(n("4ef8"))}.bind(null,n)).catch(n.oe)},o={components:{sPullScroll:a,groupXTitle:i},data:function(){return{title:"超级团长",type:2,merchant_id:"",group_number:0,tabIndex:0,tabList:[{name:"我的团长(0)"},{name:"我的团员(0)"}],dataList:[]}},onLoad:function(t){2==t.type?this.title="普通团长":this.title="超级团长",this.$api.setNav(this.title),this.type=t.type,this.merchant_id=t.id,console.log(this.type),this.refresh()},methods:{tapNavClick:function(t){this.tabIndex=t.ind,this.refresh()},refresh:function(){var t=this;this.$nextTick((function(){t.$refs.pullScroll.refresh()}))},pullDown:function(t){var e=this;setTimeout((function(){e.loadData(t)}),200)},formData:function(t){3==this.type?(this.tabList[0].name="我的团长(".concat(t.group_number,")"),this.tabList[1].name="我的团员(".concat(t.member_number,")")):this.group_number=t.member_number},loadData:function(t){var e,n=this;1==t.page&&(this.dataList=[]),e=2==this.type?2:0==this.tabIndex?1:2;var a={cmd:"getChildDetailList",merchant_id:this.merchant_id,nowPage:t.page,type:e};console.log(a);var i=[];this._reqw.post(a).then((function(e){0==e.result?(1==t.page&&n.formData(e.body),0==e.body.dataList.length?t.empty():e.body.dataList.forEach((function(t){i.push(t)})),n.dataList=n.dataList.concat(i),t.page>=e.body.totalPage?t.finish():t.success()):n.$api.tip(e.resultNote)}))}}};e.default=o},"54a8":function(t,e,n){"use strict";n.r(e);var a=n("2244"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"6a46":function(t,e,n){"use strict";n.r(e);var a=n("90fc"),i=n("54a8");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("88a3");var c,r=n("f0c5"),u=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"bccc3188",null,!1,a["a"],c);e["default"]=u.exports},"88a3":function(t,e,n){"use strict";var a=n("cbfc"),i=n.n(a);i.a},"90fc":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},cbfc:function(t,e,n){}},[["1ca9","common/runtime","common/vendor"]]]);