(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-goods-nav/group-goods-nav"],{"1cc8":function(t,n,o){"use strict";var c;o.d(n,"b",(function(){return e})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return c}));var e=function(){var t=this,n=t.$createElement,o=(t._self._c,t.__map(t.buttonGroup,(function(n,o){var c=t.__get_orig(n),e=0==o?t._f("parsePrice")(t.dataobject.old_price):null,i=0!=o?t._f("parsePrice")(t.dataobject.price):null;return{$orig:c,f0:e,f1:i}})));t.$mp.data=Object.assign({},{$root:{l0:o}})},i=[]},"29ba":function(t,n,o){"use strict";var c=o("420b"),e=o.n(c);e.a},"420b":function(t,n,o){},6508:function(t,n,o){"use strict";o.r(n);var c=o("7c3c"),e=o.n(c);for(var i in c)"default"!==i&&function(t){o.d(n,t,(function(){return c[t]}))}(i);n["default"]=e.a},"7c3c":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"UniGoodsNav",data:function(){return{options:[{icon:"/static/img/gouwuche.png",text:"购物车"},{icon:"/static/img/fenxiang.png",text:"分享"}],buttonGroup:[{text:"单独购买",color:"#fff"},{text:"发起拼团",color:"#fff"}]}},props:{collect:{type:[String,Number],default:0},fill:{type:Boolean,default:!1},dataobject:{type:Object,default:{}}},watch:{collect:function(t){this.options[1].icon=1==t?"/static/img/yishoucang.png":"/static/img/shoucang.png"}},methods:{onClick:function(t,n){console.log(this.collect),this.$emit("click",{index:t,content:n})},buttonClick:function(n,o){t.report&&t.report(o.text,o.text),this.$emit("buttonClick",{index:n,content:o})}}};n.default=o}).call(this,o("543d")["default"])},"8c93":function(t,n,o){"use strict";o.r(n);var c=o("1cc8"),e=o("6508");for(var i in e)"default"!==i&&function(t){o.d(n,t,(function(){return e[t]}))}(i);o("29ba");var a,u=o("f0c5"),r=Object(u["a"])(e["default"],c["b"],c["c"],!1,null,"29bfaed8",null,!1,c["a"],a);n["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-goods-nav/group-goods-nav-create-component',
    {
        'components/uni-goods-nav/group-goods-nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8c93"))
        })
    },
    [['components/uni-goods-nav/group-goods-nav-create-component']]
]);
