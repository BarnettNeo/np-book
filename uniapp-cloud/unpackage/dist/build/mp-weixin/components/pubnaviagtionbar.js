(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pubnaviagtionbar"],{3813:function(t,n,e){},"3c91":function(t,n,e){"use strict";e.r(n);var o=e("f561"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},"51b8":function(t,n,e){"use strict";e.r(n);var o=e("7ad1"),a=e("3c91");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("7684");var r,f=e("f0c5"),c=Object(f["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=c.exports},7684:function(t,n,e){"use strict";var o=e("3813"),a=e.n(o);a.a},"7ad1":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},f561:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{showBackButton:!1,showHomeButton:!1}},props:{hasHomeButton:{type:Boolean,default:!0},backgroundColor:{type:String,default:"#fff"},titleColor:{type:String,default:"#000"},hasBottomLine:{type:Boolean,default:!0},bottomlineColor:{type:String,default:"#00aaff"}},methods:{btnBack:function(){t.navigateBack({})},btnHome:function(){t.navigateBack({delta:999})}},mounted:function(){var n=getCurrentPages();t.getSystemInfoSync();n.length>1&&(this.showBackButton=!0),n.length>2&&(this.showHomeButton=!0)}};n.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pubnaviagtionbar-create-component',
    {
        'components/pubnaviagtionbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("51b8"))
        })
    },
    [['components/pubnaviagtionbar-create-component']]
]);
