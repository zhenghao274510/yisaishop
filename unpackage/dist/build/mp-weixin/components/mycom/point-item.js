(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/mycom/point-item"],{"027d":function(t,n,e){"use strict";e.r(n);var i=e("6eb6"),c=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=c.a},"0da7":function(t,n,e){"use strict";var i=e("c6e6"),c=e.n(i);c.a},"6eb6":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={props:{type:{type:String||Number},list:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{set:function(t){var n=this;t.forEach((function(t){n.list.push(t)}))},onClick:function(t){this.$emit("click",t)},stockDetails:function(t){console.log(111),1==t.cun?this.$api.navTo("/pages/details/goodsDetails?id=".concat(t.id,"&type=4")):this.$api.tip("该商品已下架!")}}};n.default=i},c6e6:function(t,n,e){},cfed:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var c=function(){var t=this,n=t.$createElement;t._self._c},u=[]},f2e3:function(t,n,e){"use strict";e.r(n);var i=e("cfed"),c=e("027d");for(var u in c)"default"!==u&&function(t){e.d(n,t,(function(){return c[t]}))}(u);e("0da7");var o,a=e("f0c5"),r=Object(a["a"])(c["default"],i["b"],i["c"],!1,null,"5f399002",null,!1,i["a"],o);n["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/mycom/point-item-create-component',
    {
        'components/mycom/point-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f2e3"))
        })
    },
    [['components/mycom/point-item-create-component']]
]);
