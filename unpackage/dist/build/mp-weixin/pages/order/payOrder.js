(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/payOrder"],{"0f15":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("a34a")),r=i(n("c5eb"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,r,i,o){try{var u=e[i](o),c=u.value}catch(s){return void n(s)}u.done?t(c):Promise.resolve(c).then(a,r)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function u(e){o(i,a,r,u,c,"next",e)}function c(e){o(i,a,r,u,c,"throw",e)}u(void 0)}))}}var c=function(){n.e("components/mycom/homePoup").then(function(){return resolve(n("ae97"))}.bind(null,n)).catch(n.oe)},s={components:{homePoup:c},data:function(){return{payArray:[{name:"微信支付",image:"/static/img/wxpay.png",value:"0"},{name:"余额支付",image:"/static/img/yue.png",value:"1"}],payType:"0",money:"",id:"",type:"",payword:0,balance:0}},onLoad:function(e){this.money=this.$api.parsePrice(e.money),this.id=e.id,this.type=e.type},onShow:function(){this.getUserInfo()},methods:{payChange:function(e){this.payType=e.detail.value},getUserInfo:function(){var t=this;return u(a.default.mark((function n(){var r,i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e.getStorageSync("uid")){n.next=7;break}return r={cmd:"userInfo",uid:e.getStorageSync("uid")},n.next=4,t._reqw.post(r);case 4:i=n.sent,t.payword=i.body.payword,t.balance=i.body.balance;case 7:case"end":return n.stop()}}),n)})))()},payPingTai:function(){var e=this;1==this.payType?1==this.payword?this.$refs.homePoup.open():this.$api.showTip("你还没有设置支付密码,是否前往设置?",(function(t){t.confirm&&e.$api.navTo("/pages/mineoptions/setpossword?id=2")})):this.payOrder()},payMoney:function(){var t=this;this.throttle((function(){e.requestSubscribeMessage({tmplIds:["5uglIwp5OjeQagJu7Zcdsyo9DRZZHM79QQkJ6KkpSYY"],complete:function(){t.payPingTai()}})}))},payOrder:function(){var t=this;return u(a.default.mark((function n(){var r,i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.$api.loading("提交中..."),r={cmd:"payOrder",uid:e.getStorageSync("uid"),id:t.id,orderMoney:t.money},r.pay_type=2,n.next=5,t._reqw.post(r);case 5:if(i=n.sent,e.hideLoading(),0==i.result){n.next=10;break}return t.$api.tip(i.resultNote),n.abrupt("return");case 10:t.payTypeOrder(i.body.body);case 11:case"end":return n.stop()}}),n)})))()},paymimaOrder:function(t){var n=this;return u(a.default.mark((function i(){var o,u;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n.$api.loading("提交中..."),o={cmd:"payByBalance",uid:e.getStorageSync("uid"),orderId:n.id,orderMoney:n.money,payword:(0,r.default)(t)},o.pay_type=2,a.next=5,n._reqw.post(o);case 5:if(u=a.sent,e.hideLoading(),0==u.result){a.next=10;break}return n.$api.tip(u.resultNote),a.abrupt("return");case 10:n.$api.tip("支付成功!"),n.navigar();case 12:case"end":return a.stop()}}),i)})))()},payTypeOrder:function(e){var t=this;this.$api.PayBywx(JSON.parse(e).sign_package,(function(e){t.$api.tip("支付成功！"),t.navigar()}))},onPay:function(e){this.paymimaOrder(e)},navigar:function(){this.$api.redirectTo("/pages/order/paySuccess?type=".concat(this.type))}}};t.default=s}).call(this,n("543d")["default"])},1818:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"1cf8":function(e,t,n){"use strict";n.r(t);var a=n("1818"),r=n("cc20");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("ca4b");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"5bab1342",null,!1,a["a"],o);t["default"]=c.exports},"8d0e":function(e,t,n){},a46d:function(e,t,n){"use strict";(function(e){n("b4b3");a(n("66fd"));var t=a(n("1cf8"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ca4b:function(e,t,n){"use strict";var a=n("8d0e"),r=n.n(a);r.a},cc20:function(e,t,n){"use strict";n.r(t);var a=n("0f15"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a}},[["a46d","common/runtime","common/vendor"]]]);