(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mineoptions/walletTopUpDetails"],{"5fa1":function(t,n,e){},"6a94":function(t,n,e){"use strict";var a=e("5fa1"),o=e.n(a);o.a},8386:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){Promise.all([e.e("common/vendor"),e.e("components/s-pull-scroll/index")]).then(function(){return resolve(e("57aa"))}.bind(null,e)).catch(e.oe)},o={components:{sPullScroll:a},data:function(){return{dataList:[],showEmpty:!1}},onLoad:function(){this.refresh()},methods:{refresh:function(){var t=this;this.$nextTick((function(){t.$refs.pullScroll.refresh()}))},pullDown:function(t){var n=this;setTimeout((function(){n.loadData(t)}),200)},loadData:function(n){var e=this;1==n.page&&(this.dataList=[]);var a={cmd:"getBalanceDetailList",uid:getApp().globalData.uid||t.getStorageSync("uid"),nowPage:n.page},o=[];this._reqw.post(a).then((function(t){0==t.result?(0==t.body.dataList.length?n.empty():t.body.dataList.forEach((function(t){o.push(t)})),e.dataList=e.dataList.concat(o),n.page>=t.body.totalPage?n.finish():n.success()):e.$api.tip(t.resultNote)}))}}};n.default=o}).call(this,e("543d")["default"])},b374:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},i=[]},eddb:function(t,n,e){"use strict";e.r(n);var a=e("b374"),o=e("fe54");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("6a94");var u,c=e("f0c5"),r=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,"3734c2f1",null,!1,a["a"],u);n["default"]=r.exports},fd68:function(t,n,e){"use strict";(function(t){e("b4b3");a(e("66fd"));var n=a(e("eddb"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},fe54:function(t,n,e){"use strict";e.r(n);var a=e("8386"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a}},[["fd68","common/runtime","common/vendor"]]]);