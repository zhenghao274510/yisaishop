(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mineoptions/shopCenter"],{"0363":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("components/mycom/group-x-title").then(function(){return resolve(n("4ef8"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/mycom/firstList").then(function(){return resolve(n("0a46"))}.bind(null,n)).catch(n.oe)},c=function(){Promise.all([n.e("common/vendor"),n.e("components/s-pull-scroll/index")]).then(function(){return resolve(n("57aa"))}.bind(null,n)).catch(n.oe)},o={components:{dishManageList:a,groupXTitle:i,sPullScroll:c},data:function(){return{tabIndex:0,allChecked:!1,merchantId:"",tabList:[{name:"上架商品"},{name:"下架商品"}],dataList:[],checkedList:[]}},onLoad:function(t){this.merchantId=t.id,this.refresh()},methods:{refresh:function(){var t=this;this.$nextTick((function(){t.$refs.pullScroll.refresh()}))},pullDown:function(t){var e=this;setTimeout((function(){e.loadData(t)}),200)},gotoDetails:function(t){},useroptions:function(t,e){if(0==t)e.checked=!e.checked,this.checkedList=this.dataList.filter((function(t){return t.checked})),this.checkedList.length==this.dataList.length?this.allChecked=!0:this.allChecked=!1;else{var n=!this.allChecked;this.dataList.forEach((function(t){t.checked=n})),this.checkedList=n?this.dataList:[],this.allChecked=n}},loadData:function(t){var e=this;1==t.page&&(this.dataList=[]);var n={cmd:"getProductList",merchantId:this.merchantId,state:this.tabIndex,flag:1,nowPage:t.page},i=[];this._reqw.post(n).then((function(n){0==n.result?(0==n.body.dataList.length?t.empty():n.body.dataList.forEach((function(t){t.checked=!1,i.push(t)})),e.dataList=e.dataList.concat(i),t.page>=n.body.totalPage?t.finish():t.success()):e.$api.tip(n.resultNote)}))},downOrUpGoods:function(t,e){var n=this,i="",a=[];if(i=0==this.tabIndex?"下架":"上架",1==t){if(this.dataList.forEach((function(t){t.checked&&a.push(t.id)})),0==a.length)return void this.$api.tip("请选择商品!")}else a.push(e.id);var c={cmd:"updateProductState",ids:a};this._reqw.post(c).then((function(t){0==t.result?(n.$api.tip("".concat(i,"成功!")),n.refresh()):n.$api.tip(t.resultNote)})).catch((function(t){}))},tapNavClick:function(t){this.tabIndex=t.ind,this.allChecked=!1,this.refresh()}}};e.default=o},"471a":function(t,e,n){"use strict";(function(t){n("b4b3");i(n("66fd"));var e=i(n("b13e"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7e6d":function(t,e,n){},"90f2":function(t,e,n){"use strict";n.r(e);var i=n("0363"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a},"986c":function(t,e,n){"use strict";var i=n("7e6d"),a=n.n(i);a.a},aa61:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement;t._self._c},c=[]},b13e:function(t,e,n){"use strict";n.r(e);var i=n("aa61"),a=n("90f2");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("986c");var o,s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"ce0a07c0",null,!1,i["a"],o);e["default"]=r.exports}},[["471a","common/runtime","common/vendor"]]]);