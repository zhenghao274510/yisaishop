(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/point/pointShop"],{"02eb":function(t,n,e){"use strict";(function(t){e("b4b3");o(e("66fd"));var n=o(e("6ed0"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},2906:function(t,n,e){"use strict";e.r(n);var o=e("ce99"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},"4e52":function(t,n,e){},"6ed0":function(t,n,e){"use strict";e.r(n);var o=e("bbf6"),i=e("2906");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("ca39");var r,u=e("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"4ce6814e",null,!1,o["a"],r);n["default"]=c.exports},bbf6:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},ca39:function(t,n,e){"use strict";var o=e("4e52"),i=e.n(o);i.a},ce99:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function a(t,n,e,o,i,a,r){try{var u=t[a](r),c=u.value}catch(s){return void e(s)}u.done?n(c):Promise.resolve(c).then(o,i)}function r(t){return function(){var n=this,e=arguments;return new Promise((function(o,i){var r=t.apply(n,e);function u(t){a(r,o,i,u,c,"next",t)}function c(t){a(r,o,i,u,c,"throw",t)}u(void 0)}))}}var u=function(){Promise.all([e.e("common/vendor"),e.e("components/s-pull-scroll/index")]).then(function(){return resolve(e("57aa"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("components/mycom/point-item").then(function(){return resolve(e("f2e3"))}.bind(null,e)).catch(e.oe)},s=function(){e.e("components/mycom/point-compline-item").then(function(){return resolve(e("50df"))}.bind(null,e)).catch(e.oe)},d={components:{pointItem:c,sPullScroll:u,pointComplineItem:s},data:function(){return{point:0,navsList:[{icon:"/static/img/youhuijuan.png",name:"积分兑商品"},{icon:"/static/img/jifenhuanjuan.png",name:"积分兑券"},{icon:"/static/img/duihuanjilu.png",name:"兑换记录"}],pointProductList:[],pointComplineList:[]}},onLoad:function(t){this.point=t.id,this.loadData()},methods:{loadData:function(){this.getPointProductList(),this.getPointComplineList()},getPointProductList:function(){var n=this;return r(o.default.mark((function e(){var i,a;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.$api.loading("加载中...."),i={cmd:"getPointProductList",uid:t.getStorageSync("uid"),merchantId:t.getStorageSync("merchantId"),nowPage:"1",pageCount:"4"},e.next=4,n._reqw.post(i);case 4:if(a=e.sent,t.hideLoading(),0==a.result){e.next=9;break}return n.$api.tip(a.resultNote),e.abrupt("return");case 9:n.pointProductList=a.body.dataList;case 10:case"end":return e.stop()}}),e)})))()},getPointComplineList:function(){var n=this;return r(o.default.mark((function e(){var i,a;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={cmd:"getPointCouponList",uid:t.getStorageSync("uid"),merchant_id:t.getStorageSync("merchantId"),nowPage:"1",pageCount:"4"},e.next=3,n._reqw.post(i);case 3:if(a=e.sent,0==a.result){e.next=7;break}return n.$api.tip(a.resultNote),e.abrupt("return");case 7:n.pointComplineList=a.body.dataList;case 8:case"end":return e.stop()}}),e)})))()},tabNavTap:function(t){switch(t){case 0:this.$api.navTo("/pages/point/pointGoods");break;case 1:this.$api.navTo("/pages/point/pointCompline");break;case 2:this.$api.navTo("/pages/point/pointRecords");break}}}};n.default=d}).call(this,e("543d")["default"])}},[["02eb","common/runtime","common/vendor"]]]);