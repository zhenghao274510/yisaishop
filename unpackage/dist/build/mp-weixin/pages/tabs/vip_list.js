(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabs/vip_list"],{3167:function(t,e,n){"use strict";(function(t){n("b4b3");o(n("66fd"));var e=o(n("3ec0"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"3ebb":function(t,e,n){"use strict";n.r(e);var o=n("bec4"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},"3ec0":function(t,e,n){"use strict";n.r(e);var o=n("a331"),a=n("3ebb");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("bd3e");var i,u=n("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,"185a590c",null,!1,o["a"],i);e["default"]=c.exports},a331:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.dataList,(function(e,n){var o=t.__get_orig(e),a=t._f("parsePrice")(e.price),r=t._f("parsePrice")(e.old_price);return{$orig:o,f0:a,f1:r}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},r=[]},bd3e:function(t,e,n){"use strict";var o=n("d5db"),a=n.n(o);a.a},bec4:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,a,r,i){try{var u=t[r](i),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,a)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function u(t){r(i,o,a,u,c,"next",t)}function c(t){r(i,o,a,u,c,"throw",t)}u(void 0)}))}}var u=function(){Promise.all([n.e("common/vendor"),n.e("components/s-pull-scroll/index")]).then(function(){return resolve(n("57aa"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/mycom/homeList").then(function(){return resolve(n("5d06"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/mycom/index-one-sku").then(function(){return resolve(n("73c5"))}.bind(null,n)).catch(n.oe)},d={components:{homeList:c,sPullScroll:u,oneSkuSwiper:s},data:function(){return{skuobject:{},dataList:[],send_type:0,qty:1}},onLoad:function(){this.refresh(),this.getUserBuyType()},methods:{getUserBuyType:function(){2!=t.getStorageSync("open")?t.getStorageSync("defaultValue")&&(0==t.getStorageSync("defaultValue")?this.send_type=2:this.send_type=1):this.send_type=3},toggleSpec:function(e){t.getStorageSync("uid")?(this.skuobject=e,this.$refs["oneSKuSwiper"].open()):this.$api.navTo("/pages/index/author")},choseSku:function(t){this.currentobj=t},changeNum:function(t){this.qty=t},addCart:function(){var e=this;this.$api.loading("提交中...");var n={cmd:"addCart",uid:t.getStorageSync("uid"),merchantId:t.getStorageSync("merchantId"),type:this.send_type,skuId:this.currentobj.id,count:this.qty};console.log(n),this._reqw.post(n).then((function(n){t.hideLoading(),e.$api.tip(n.resultNote),0==n.result&&(e.$refs["oneSKuSwiper"].hide(),e.getCartNum())})).catch((function(t){}))},stockDetails:function(e){t.getStorageSync("uid")?this.$api.navTo("/pages/details/goodsDetails?id=".concat(e,"&type=5")):this.$api.navTo("/pages/index/author")},refresh:function(){var t=this;this.$nextTick((function(){t.$refs.pullScroll.refresh()}))},pullDown:function(t){var e=this;setTimeout((function(){e.loadData(t)}),200)},loadData:function(e){var n=this;return i(o.default.mark((function a(){var r,i,u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return 1==e.page&&(n.dataList=[]),r={cmd:"getProductList",merchantId:t.getStorageSync("merchantId"),uid:t.getStorageSync("uid"),nowPage:e.page,top:1,flag:2},i=[],o.next=5,n._reqw.post(r);case 5:if(u=o.sent,0==u.result){o.next=9;break}return n.$api.tip(u.resultNote),o.abrupt("return");case 9:0==u.body.dataList.length?e.empty():u.body.dataList.forEach((function(t){i.push(t)})),n.dataList=n.dataList.concat(i),e.page>=u.body.totalPage?e.finish():e.success();case 10:case"end":return o.stop()}}),a)})))()}}};e.default=d}).call(this,n("543d")["default"])},d5db:function(t,e,n){}},[["3167","common/runtime","common/vendor"]]]);