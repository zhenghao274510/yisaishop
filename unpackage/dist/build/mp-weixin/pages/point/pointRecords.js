(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/point/pointRecords"],{"4c49":function(t,n,e){"use strict";e.r(n);var o=e("601b"),i=e("567a");for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);var a,u=e("f0c5"),r=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"45d017f9",null,!1,o["a"],a);n["default"]=r.exports},"567a":function(t,n,e){"use strict";e.r(n);var o=e("6394"),i=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);n["default"]=i.a},"601b":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},c=[]},6394:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){Promise.all([e.e("common/vendor"),e.e("components/s-pull-scroll/index")]).then(function(){return resolve(e("57aa"))}.bind(null,e)).catch(e.oe)},i=function(){e.e("components/mycom/user-point-goods").then(function(){return resolve(e("6746"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("components/mycom/compline-item").then(function(){return resolve(e("42b4"))}.bind(null,e)).catch(e.oe)},a=function(){e.e("components/mycom/group-x-title").then(function(){return resolve(e("4ef8"))}.bind(null,e)).catch(e.oe)},u={components:{sPullScroll:o,groupXTitle:a,complineItem:c,userPointGoods:i},data:function(){return{tabIndex:0,tabList:[{name:"商品记录"},{name:"优惠券记录"}],dataList:[]}},onLoad:function(){this.refresh()},methods:{tapNavClick:function(t){this.tabIndex=t.ind,this.dataList=[],this.refresh()},refresh:function(){var t=this;this.$nextTick((function(){t.$refs.pullScroll.refresh()}))},pullDown:function(t){var n=this;setTimeout((function(){n.loadData(t)}),200)},loadData:function(n){var e=this;1==n.page&&(this.dataList=[]);var o={cmd:"getPointRecordList",uid:t.getStorageSync("uid"),type:this.tabIndex-0+1,nowPage:n.page},i=[];this._reqw.post(o).then((function(t){0==t.result?(0==t.body.dataList.length?n.empty():t.body.dataList.forEach((function(t){i.push(t)})),e.dataList=e.dataList.concat(i),n.page>=t.body.totalPage?n.finish():n.success()):e.$api.tip(t.resultNote)}))}}};n.default=u}).call(this,e("543d")["default"])},fc7b:function(t,n,e){"use strict";(function(t){e("b4b3");o(e("66fd"));var n=o(e("4c49"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["fc7b","common/runtime","common/vendor"]]]);