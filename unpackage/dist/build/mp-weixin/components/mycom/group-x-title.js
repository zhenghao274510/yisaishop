(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/mycom/group-x-title"],{"1c15":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"1e1a":function(t,n,e){"use strict";var r=e("cf69"),a=e.n(r);a.a},"4ef8":function(t,n,e){"use strict";e.r(n);var r=e("1c15"),a=e("ae03");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("1e1a");var c,o=e("f0c5"),i=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],c);n["default"]=i.exports},ae03:function(t,n,e){"use strict";e.r(n);var r=e("e28f"),a=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=a.a},cf69:function(t,n,e){},e28f:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"ss-scroll-navbar2",props:{navArr:{type:Array,default:function(){return[]}},tabCurrentIndex:{type:[Number,String],default:0}},data:function(){return{isFixed:!0}},computed:{parmentWidth:function(){return"".concat(100/this.navArr.length,"%")}},methods:{tabChange:function(t,n){console.log(n),this.tabCurrentIndex!=n&&this.$emit("navbarTap",{obj:t,ind:n})}}};n.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/mycom/group-x-title-create-component',
    {
        'components/mycom/group-x-title-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4ef8"))
        })
    },
    [['components/mycom/group-x-title-create-component']]
]);
