(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mineoptions/customerCenter"],{"16e3":function(n,t,e){},"17a0":function(n,t,e){"use strict";(function(n){e("b4b3");o(e("66fd"));var t=o(e("6a09"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},4813:function(n,t,e){"use strict";e.r(t);var o=e("a48f"),c=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=c.a},"5d5d":function(n,t,e){"use strict";var o=e("16e3"),c=e.n(o);c.a},"6a09":function(n,t,e){"use strict";e.r(t);var o=e("a961"),c=e("4813");for(var a in c)"default"!==a&&function(n){e.d(t,n,(function(){return c[n]}))}(a);e("5d5d");var u,i=e("f0c5"),l=Object(i["a"])(c["default"],o["b"],o["c"],!1,null,"3e1207fa",null,!1,o["a"],u);t["default"]=l.exports},a48f:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){Promise.all([e.e("common/vendor"),e.e("components/s-pull-scroll/index")]).then(function(){return resolve(e("57aa"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("components/uni-collapse/uni-collapse").then(function(){return resolve(e("ab2d"))}.bind(null,e)).catch(e.oe)},a=function(){e.e("components/uni-collapse-item/uni-collapse-item").then(function(){return resolve(e("dc55"))}.bind(null,e)).catch(e.oe)},u={components:{uniCollapse:c,sPullScroll:o,uniCollapseItem:a},data:function(){return{dataobject:{merchantphone:"",cutomerphone:"",dataList:[]}}},onLoad:function(){this.refresh()},methods:{contactPhone:function(){var t=new Array,e=this;t[0]=e.dataobject.merchantphone,t[1]=e.dataobject.cutomerphone,n.showActionSheet({itemList:t,success:function(n){e.$api.callPhone(t[n.tapIndex])}})},refresh:function(){var n=this;this.$nextTick((function(){n.$refs.pullScroll.refresh()}))},pullDown:function(n){var t=this;setTimeout((function(){t.loadData(n)}),200)},loadData:function(t){var e=this;1==t.page&&(this.dataList=[]);var o={cmd:"getQuestionList",merchant_id:n.getStorageSync("merchantId")};this._reqw.post(o).then((function(n){0==n.result?(t.finish(),e.dataobject=n.body):e.$api.tip(n.resultNote)})).catch((function(n){}))}}};t.default=u}).call(this,e("543d")["default"])},a961:function(n,t,e){"use strict";e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var o={uniCollapse:function(){return e.e("components/uni-collapse/uni-collapse").then(e.bind(null,"ab2d"))},uniCollapseItem:function(){return e.e("components/uni-collapse-item/uni-collapse-item").then(e.bind(null,"dc55"))}},c=function(){var n=this,t=n.$createElement;n._self._c},a=[]}},[["17a0","common/runtime","common/vendor"]]]);