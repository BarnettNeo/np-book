(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/pubpage"],{"27dc":function(t,n,e){"use strict";e.r(n);var a=e("56e5"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a},"34c9":function(t,n,e){"use strict";e.r(n);var a=e("ee1a"),o=e("27dc");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);var s,u=e("f0c5"),r=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);n["default"]=r.exports},"56e5":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){e.e("components/pubnaviagtionbar").then(function(){return resolve(e("6f13"))}.bind(null,e)).catch(e.oe)},o={components:{pubnaviagtionbar:a},data:function(){return{paddingTop:0,paddingBottom:0,height:"100%",statusBarHeight:22}},props:{title:{type:String,default:""},showNavigation:{type:Boolean,default:!0},navigationHasBottomLine:{type:Boolean,default:!0},statusBackground:{type:String,default:"#fff"}},computed:{},methods:{autoPaddingTop:function(){return this.showNavigation?44+this.sysInfo.statusBarHeight:this.sysInfo.statusBarHeight},autoPaddingBottom:function(){return this.$slots.tabSection?50+(this.sysInfo.safeArea?34:0):0}},mounted:function(){this.sysInfo=t.getSystemInfoSync(),this.height=this.sysInfo.screenHeight+"px",this.paddingTop=this.autoPaddingTop(),this.paddingBottom=this.autoPaddingBottom(),this.statusBarHeight=this.sysInfo.statusBarHeight}};n.default=o}).call(this,e("543d")["default"])},ee1a:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pubpage-create-component',
    {
        'components/pubpage-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("34c9"))
        })
    },
    [['components/pubpage-create-component']]
]);
