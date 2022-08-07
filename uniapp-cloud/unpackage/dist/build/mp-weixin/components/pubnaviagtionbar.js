(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pubnaviagtionbar"],{"1c76":function(t,n,e){"use strict";var o=e("b957"),a=e.n(o);a.a},"53b2":function(t,n,e){"use strict";e.r(n);var o=e("5523"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},5523:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{showBackButton:!1,showHomeButton:!1}},props:{hasHomeButton:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#fff"},titleColor:{type:String,default:"#000"},hasBottomLine:{type:Boolean,default:!0},bottomlineColor:{type:String,default:"#00aaff"}},methods:{btnBack:function(){t.navigateBack({})},btnHome:function(){t.navigateBack({delta:999})}},mounted:function(){var n=getCurrentPages();t.getSystemInfoSync();n.length>1&&(this.showBackButton=!0),n.length>2&&(this.showHomeButton=!0)}};n.default=e}).call(this,e("543d")["default"])},"6f13":function(t,n,e){"use strict";e.r(n);var o=e("ddd1"),a=e("53b2");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("1c76");var r,c=e("f0c5"),f=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=f.exports},b957:function(t,n,e){},ddd1:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pubnaviagtionbar-create-component',
    {
        'components/pubnaviagtionbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6f13"))
        })
    },
    [['components/pubnaviagtionbar-create-component']]
]);
